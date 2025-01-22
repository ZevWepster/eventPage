import React from "react";
import { Box, Heading, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { Link, useOutletContext } from "react-router-dom";

export const EventsPage = () => {
  const { filteredEvents, categories = [] } = useOutletContext();

  const formatDateTime = (dateTime) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return new Date(dateTime).toLocaleString(undefined, options);
  };

  const getCategoryNames = (categoryIds) => {
    const categoryIdsStr = categoryIds.map((id) => String(id));

    if (!categories.length) return "Uncategorized";

    return categoryIdsStr
      .map((id) => {
        const category = categories.find((category) => category.id === id);
        return category ? category.name : null;
      })
      .filter((name) => name !== null)
      .join(", ");
  };

  return (
    <Box padding={5}>
      <Heading mb={5} textAlign="center">
        Event Dashboard
      </Heading>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <GridItem
              key={event.id}
              border="1px solid #ccc"
              padding={3}
              borderRadius="md"
              boxShadow="lg"
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            >
              <Link to={`/event/${event.id}`}>
                <Heading size="md" padding={2} mb={2} textAlign="center">
                  {event.title}
                </Heading>
                <Image
                  src={event.image}
                  alt={event.title}
                  boxSize={{ base: "150px", md: "200px" }}
                  objectFit="cover"
                  mb={3}
                  borderRadius="md"
                  mx="auto"
                />
                <Text fontSize={{ base: "sm", md: "md" }} mb={1}>
                  <strong>Description:</strong> {event.description}
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }} mb={1}>
                  <strong>Location:</strong> {event.location}
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }} mb={1}>
                  <strong>Start:</strong> {formatDateTime(event.startTime)}
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }} mb={1}>
                  <strong>End:</strong> {formatDateTime(event.endTime)}
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }}>
                  <strong>Categories:</strong>{" "}
                  {getCategoryNames(event.categoryIds)}
                </Text>
              </Link>
            </GridItem>
          ))
        ) : (
          <Text fontSize="3xl" color="gray.500" mt={10}>
            Sorry, no events match your search.
          </Text>
        )}
      </Grid>
    </Box>
  );
};
