import { useState, useEffect } from 'react';
import GuestForm from './components/GuestForm';
import GuestList from './components/GuestList';
import GuestSummary from './components/GuestSummary';

// Simple notification component
const SaveNotification = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded shadow-md transition-opacity duration-300 flex items-center">
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
      </svg>
      Data saved to localStorage
    </div>
  );
};

function App() {
  // Initialize guests state from localStorage or empty array if nothing saved
  const [guests, setGuests] = useState(() => {
    const savedGuests = localStorage.getItem('eventPlannerGuests');
    return savedGuests ? JSON.parse(savedGuests) : [];
  });
  
  // State for showing save notification
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  
  // For demonstration purposes in task 5 - log state after updates
  useEffect(() => {
    console.log('Current guests state:', guests);
  }, [guests]);

  // Save guests to localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem('eventPlannerGuests', JSON.stringify(guests));
    
    // Show notification when data is saved
    setShowSaveNotification(true);
    
    // Hide notification after 2 seconds
    const timer = setTimeout(() => {
      setShowSaveNotification(false);
    }, 2000);
    
    // Clear timer when component unmounts or when the effect runs again
    return () => clearTimeout(timer);
  }, [guests]);

  // Add a new guest to the list
  const addGuest = (newGuest) => {
    setGuests([...guests, newGuest]);
    console.log('Guest added, but state not updated yet:', guests);
    // We'll see the previous state here, demonstrating that state updates are asynchronous
  };

  // Toggle RSVP status for a guest
  const toggleRSVP = (id) => {
    setGuests(guests.map(guest => 
      guest.id === id ? { ...guest, rsvp: !guest.rsvp } : guest
    ));
    
    // Multiple state updates example for task 4
    // These will be batched by React
    console.log('RSVP toggled, demonstrating batched updates');
  };

  // Remove a guest from the list
  const removeGuest = (id) => {
    setGuests(guests.filter(guest => guest.id !== id));
  };

  // Edit guest information
  const editGuest = (id, updates) => {
    setGuests(guests.map(guest => 
      guest.id === id ? { ...guest, ...updates } : guest
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 py-6 sm:py-12 px-3 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Evento - Event Planner</h1>
          <p className="mt-2 sm:mt-3 text-base sm:text-xl text-gray-600">Plan your perfect event with style</p>
          <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-purple-100 text-purple-800">
              Easy to Use
            </span>
            <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-indigo-100 text-indigo-800">
              Beautiful Design
            </span>
            <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800">
              Real-time Updates
            </span>
          </div>
        </header>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-3">
            <GuestSummary guests={guests} />
          </div>
          
          <div className="md:col-span-1">
            <GuestForm addGuest={addGuest} />
          </div>
          
          <div className="md:col-span-1 lg:col-span-2">
            <GuestList 
              guests={guests} 
              toggleRSVP={toggleRSVP} 
              removeGuest={removeGuest}
              editGuest={editGuest}
            />
          </div>
        </div>
        
        <footer className="mt-8 sm:mt-16 text-center text-gray-500 text-xs sm:text-sm">
          <p>Created by Muhammad Ali Imran with ❤️ using React and Tailwind CSS</p>
        </footer>
      </div>
      
      <SaveNotification show={showSaveNotification} />
    </div>
  );
}

export default App;
