import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Image,
  Text,
  Spinner,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Checkbox,
  CheckboxGroup,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  ButtonGroup,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";

export const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editData, setEditData] = useState({ categoryIds: [] });
  const cancelRef = React.useRef();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, categoriesRes, usersRes] = await Promise.all([
          fetch("http://localhost:3001/events"),
          fetch("http://localhost:3001/categories"),
          fetch("http://localhost:3001/users"),
        ]);

        if (!eventsRes.ok || !categoriesRes.ok || !usersRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const eventsData = await eventsRes.json();
        const categoriesData = await categoriesRes.json();
        const usersData = await usersRes.json();

        const event = eventsData.find(
          (event) => event.id.toString() === eventId
        );
        if (!event) {
          setError(true);
          setLoading(false);
          return;
        }

        setEvent(event);
        setCategories(categoriesData);
        setUsers(usersData);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  const getCategoryNames = (categoryIds) => {
    const categoryNames = categories
      .filter((category) => categoryIds.includes(parseInt(category.id)))
      .map((category) => category.name)
      .join(", ");
    return categoryNames;
  };

  const handleEdit = () => {
    setEditData({
      ...event,
      categoryIds: Array.isArray(event.categoryIds)
        ? [...event.categoryIds]
        : [], // Altijd een array
    });
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      const updatedData = {
        ...editData,
        categoryIds: Array.from(new Set(editData.categoryIds)).map((id) =>
          parseInt(id, 10)
        ), // Zorg voor unieke integers
      };

      const response = await fetch(`http://localhost:3001/events/${event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      const updatedEvent = await response.json();
      setEvent(updatedEvent);
      setIsEditing(false);
      toast({
        title: "Event updated.",
        description: "The event details have been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error.",
        description: "There was an error updating the event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/events/${event.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      toast({
        title: "Event deleted.",
        description: "The event has been successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (err) {
      toast({
        title: "Error.",
        description: "There was an error deleting the event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const creator = users.find((user) => user.id === String(event?.createdBy));

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error || !event) {
    return <Heading as="h2">Event not found!</Heading>;
  }

  return (
    <Box padding={5}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minH="50vh"
        p={6}
        boxShadow="dark-lg"
        rounded="md"
        bg="white"
      >
        <Image
          src={event.image}
          alt={event.title}
          boxSize="200px"
          objectFit="cover"
          mb={5}
        />
        <Heading as="h2" size="lg" mb={3}>
          {event.title}
        </Heading>
        <Text fontSize="lg" mb={3}>
          <strong>Description:</strong> {event.description}
        </Text>
        <Text fontSize="lg" mb={3}>
          <strong>Location:</strong> {event.location}
        </Text>
        <Text fontSize="lg" mb={3}>
          <strong>Start:</strong> {new Date(event.startTime).toLocaleString()}
        </Text>
        <Text fontSize="lg" mb={3}>
          <strong>End:</strong> {new Date(event.endTime).toLocaleString()}
        </Text>
        <Text fontSize="lg" mb={3}>
          <strong>Categories:</strong> {getCategoryNames(event.categoryIds)}
        </Text>
        {creator && (
          <>
            <Text fontSize="lg" mb={3}>
              <strong>Created by:</strong> {creator.name}
            </Text>
            <Image
              src={creator.image}
              alt={creator.name}
              boxSize="100px"
              objectFit="cover"
              mb={3}
            />
          </>
        )}
        <ButtonGroup gap="4">
          <Button colorScheme="blue" onClick={handleEdit} mr={3}>
            Edit Event
          </Button>
          <Button colorScheme="red" onClick={() => setIsDeleting(true)}>
            Delete Event
          </Button>
        </ButtonGroup>
      </Box>

      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={editData.title || ""}
                onChange={handleEditChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={editData.description || ""}
                onChange={handleEditChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input
                name="location"
                value={editData.location || ""}
                onChange={handleEditChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Start Time</FormLabel>
              <Input
                type="datetime-local"
                name="startTime"
                value={editData.startTime || ""}
                onChange={handleEditChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>End Time</FormLabel>
              <Input
                type="datetime-local"
                name="endTime"
                value={editData.endTime || ""}
                onChange={handleEditChange}
              />
            </FormControl>
            <FormControl as="fieldset">
              <FormLabel as="legend">Categories</FormLabel>
              <CheckboxGroup
                value={editData.categoryIds.map((id) => id.toString())}
                onChange={(newCategoryIds) => {
                  setEditData((prevData) => ({
                    ...prevData,
                    categoryIds: newCategoryIds.map((id) => parseInt(id, 10)),
                  }));
                }}
              >
                <Stack spacing={2}>
                  {categories.map((category) => {
                    const isChecked = editData.categoryIds.includes(
                      category.id
                    );
                    return (
                      <Checkbox
                        key={category.id}
                        value={category.id.toString()}
                        isChecked={isChecked}
                        id={`category-${category.id}`}
                      >
                        {category.name}
                      </Checkbox>
                    );
                  })}
                </Stack>
              </CheckboxGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>

            <Button colorScheme="blue" onClick={handleEditSubmit} mr={3}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isDeleting}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleting(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Event
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can’t undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDeleting(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};
