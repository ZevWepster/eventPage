import React, { useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Input,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { AddEventModal } from "./AddEvent";
import { useNavigate } from "react-router-dom";

export const Navigation = ({ onAddEvent, onSearch, onFilter, categories }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
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
        >
          Event Dashboard
        </Heading>

        <Button colorScheme="green" onClick={onOpen} w="25%">
          Add Event
        </Button>

        <Flex gap={4} alignItems="center" flexWrap="wrap">
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={handleSearchChange}
            width="200px"
            bg="white"
            color="black"
          />

          <Select
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
