# Event Dashboard

## Description

Event Dashboard is a project that showcases my take on an assignment to build an event page where users can search for, add, edit, and delete events. The primary focus of this project is the "Add Event" modal, designed for an intuitive and efficient user experience.

---

## Features

- View event details by clicking on an event.
- Edit or delete existing events from the event overview.
- Add new events via the "Add Event" modal.
- Real-time updates powered by a JSON server.

---

## Installation Instructions

To get started, follow these steps:

1. Open two terminals.
2. In **Terminal 1**, navigate to the main project folder:
   ```bash
   cd /eventPage
   npm run dev
   ```
3. In **Terminal 2**, navigate to the `src` folder:
   ```bash
   cd /eventPage/src
   json-server --watch events.json --port 3001
   ```
4. Once both commands are running, open the localhost link provided by **Terminal 1** in your browser.

---

## Usage Instructions

1. **View Event Details**: Click on an event to see an overview where you can edit or delete the event.
2. **Add a New Event**: Use the "Add Event" button to open the modal and fill in the event details.
3. **Edit or Delete Events**: Access these options via the event overview page.

---

## Contributing

If you'd like to contribute to the Event Dashboard, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to your forked repository.
4. Submit a pull request with a detailed description of your changes.

---

## License

This project is licensed under the [MIT License](LICENSE.md).

---

## Technologies/Dependencies

This project is built using:

- **Vite**: A fast build tool for modern web projects.
- **JavaScript**: The core language for functionality.
- **JSON Server**: A simple backend to simulate an API.

---
