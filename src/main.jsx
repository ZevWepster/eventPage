import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { EventsPage } from "./pages/EventsPage";
import { EventPage } from "./pages/EventPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider
        future={{
          v7_startTransition: true,
          v7_skipActionErrorRevalidation: true,
          v7_partialHydration: true,
          v7_normalizeFormMethod: true,
          v7_fetcherPersist: true,
          v7_relativeSplatPath: true,
        }} // https://reactrouter.com/en/6.28.1/upgrading/future#v7_fetcherpersist
        router={router}
      />
    </ChakraProvider>
  </React.StrictMode>
);
