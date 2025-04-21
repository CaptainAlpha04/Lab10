# Evento - Event Planner

A modern, responsive web application for managing event guest lists and RSVPs, built with React and Tailwind CSS.

![Evento Event Planner](https://www.i-eventplanner.com/wp-content/uploads/revslider/Avada_Full_Width/Corporate-Event-planner.jpg)

## Features

- **Guest Management**: Add, edit, and remove guests from your event
- **RSVP Tracking**: Monitor which guests have confirmed their attendance
- **Real-time Updates**: See live statistics about event attendance
- **Persistent Storage**: Data is saved to localStorage, so your guest list persists between sessions
- **Responsive Design**: Works beautifully on devices of all sizes

## Technology Stack

- **React 19**: Utilizes the latest React features and hooks
- **Tailwind CSS 4**: For modern, responsive design with minimal CSS
- **Vite**: Fast, modern frontend build tool
- **localStorage API**: For client-side data persistence

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd event-planner
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Adding Guests

1. Fill in the guest's name and email in the form
2. Click "Add Guest"
3. The guest will be added to your list with a "Not Confirmed" status

### Managing RSVPs

1. Click "Confirm" next to a guest's name to mark them as attending
2. Click "Cancel" to change their status back to "Not Confirmed"

### Editing Guest Information

1. Click the down arrow to expand a guest's details
2. Click "Edit" to modify their information
3. Update the fields and click "Save Changes"

### Removing Guests

1. Click the down arrow to expand a guest's details
2. Click "Remove" to delete the guest from your list

## Build for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Project Structure

```
event-planner/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and other assets
│   ├── components/      # React components
│   │   ├── GuestForm.jsx    # Form for adding new guests
│   │   ├── GuestList.jsx    # List of all guests with RSVP status
│   │   └── GuestSummary.jsx # Statistical overview of attendance
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── index.css        # Global styles
│   └── main.jsx         # Application entry point
├── package.json         # Project dependencies and scripts
└── vite.config.js       # Vite configuration
```

## Data Model

Each guest is represented by an object with the following properties:

```javascript
{
  id: Number,      // Timestamp used as unique identifier
  name: String,    // Guest's name
  email: String,   // Guest's email address
  rsvp: Boolean    // Attendance status (true = attending, false = not confirmed)
}
```

## Future Enhancements

- Email notifications to guests
- Event details management
- Multiple event support
- Authentication system
- Backend integration for data persistence

## License

[MIT License](LICENSE)

## Author

Created by Muhammad Ali Imran with ❤️ using React and Tailwind CSS
