import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import data from "../events.json";

export const Root = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      setCategories(data.categories);
      setEvents(data.events);
      setFilteredEvents(data.events);
    } catch (error) {
      console.error("Error loading events from JSON:", error);
    }
  }, []);

  const handleSearch = (query) => {
    const lowerCaseQuery = typeof query === "string" ? query.toLowerCase() : "";

    if (!lowerCaseQuery) {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        event.title.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredEvents(filtered);
    }
  };

  const handleFilter = (selectedCategoryId) => {
    if (!selectedCategoryId) {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        event.categoryIds.includes(Number(selectedCategoryId))
      );
      setFilteredEvents(filtered);
    }
  };

  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
    setFilteredEvents((prev) => [...prev, newEvent]);
  };

  return (
    <Box>
      <Navigation
        onAddEvent={handleAddEvent}
        onSearch={handleSearch}
        onFilter={handleFilter}
        categories={categories}
        events={events}
      />
      <Outlet context={{ events, filteredEvents, categories }} />
    </Box>
  );
};
