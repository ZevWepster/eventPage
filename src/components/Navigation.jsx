import React, { useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Input,
  ListItem,
  Select,
  useDisclosure,
  Box,
  List,
  ButtonGroup,
} from "@chakra-ui/react";
import { AddEventModal } from "./AddEvent";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export const Navigation = ({
  onAddEvent,
  onSearch,
  onFilter,
  categories,
  events,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);

    if (query.trim() !== "") {
      const filteredSuggestions = events
        .filter((event) => event.title)
        .filter((event) =>
          event.title.toLowerCase().includes(query.toLowerCase())
        );
      setSuggestions(filteredSuggestions.slice(0, 5)); // Limit to top 5 suggestions
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    onSearch(suggestion.title);
    setSuggestions([]);
    navigate(`/event/${suggestion.id}`);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onFilter(category);
  };

  const handleHomeButtonClick = () => {
    setSearchQuery("");
    setSelectedCategory("");
    onSearch("");
    onFilter("");
    setSuggestions([]);

    navigate("/");
  };

  return (
    <>
      <Flex
        as="nav"
        bg="blue.500"
        color="white"
        padding={4}
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <ButtonGroup gap="4">
          <Heading
            as="button"
            size="md"
            bg="blue.500"
            color="white"
            px={4}
            py={2}
            borderRadius="md"
            _hover={{ bg: "blue.600", textDecoration: "none" }}
            _active={{ bg: "blue.700" }}
            aria-label="Go to Event Dashboard"
            onClick={handleHomeButtonClick}
            display="flex"
            alignItems="center"
          >
            <FaHome style={{ marginRight: "8px" }} />
            Event Dashboard
          </Heading>

          <Button colorScheme="green" onClick={onOpen} w="25%">
            Add Event
          </Button>
        </ButtonGroup>
        <Flex gap={4} alignItems="center" flexWrap="wrap" position="relative">
          <Input
            id="search-input"
            name="searchQuery"
            placeholder="Search events..."
            value={searchQuery}
            onChange={handleSearchChange}
            width="200px"
            bg="white"
            color="black"
          />

          {suggestions.length > 0 && (
            <Box
              position="absolute"
              top="100%"
              left="0"
              bg="white"
              color="black"
              width="200px"
              border="1px solid #ccc"
              borderRadius="md"
              mt={1}
              zIndex={10}
            >
              <List spacing={1}>
                {suggestions.map((suggestion) => (
                  <ListItem
                    key={suggestion.id}
                    padding={2}
                    _hover={{ bg: "gray.100", cursor: "pointer" }}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.title}
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          <Select
            id="category-filter"
            name="category"
            placeholder="Filter by Category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            bg="white"
            color="black"
            width="200px"
          >
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>

      <AddEventModal
        isOpen={isOpen}
        onClose={onClose}
        onAddEvent={onAddEvent}
      />
    </>
  );
};
