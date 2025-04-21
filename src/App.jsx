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

// Guest list modal component
const GuestListModal = ({ show, onClose, title, guests, category }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!show) return null;

  // Filter guests based on category
  let filteredGuests = guests;
  if (category === 'confirmed') {
    filteredGuests = guests.filter(guest => guest.rsvp);
  } else if (category === 'pending') {
    filteredGuests = guests.filter(guest => !guest.rsvp);
  }
  
  // Filter guests based on search term
  if (searchTerm.trim() !== '') {
    filteredGuests = filteredGuests.filter(guest => 
      guest.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="p-4 border-b border-gray-200">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search guests by name..."
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
            {searchTerm && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {filteredGuests.length === 0 ? (
            <div className="text-center text-gray-500 py-8 flex flex-col items-center">
              <svg className="h-12 w-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 13.5V15m-6 4h12a2 2 0 002-2v-12a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              {searchTerm ? (
                <p>No guests matching "<span className="font-medium">{searchTerm}</span>"</p>
              ) : (
                <p>No guests in this category.</p>
              )}
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredGuests.map(guest => (
                <li key={guest.id} className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className={`flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center font-medium text-white ${
                      guest.rsvp ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-yellow-500 to-yellow-600'
                    }`}>
                      {guest.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                        {guest.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {guest.email}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-xs sm:text-sm font-medium">
                      <span className={`px-2 py-0.5 rounded-full ${
                        guest.rsvp ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {guest.rsvp ? 'Confirmed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-xs sm:text-sm text-gray-500">
              {filteredGuests.length} {filteredGuests.length === 1 ? 'guest' : 'guests'} {searchTerm ? 'found' : 'total'}
            </p>
            <button
              onClick={onClose}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
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
  
  // State for controlling modals
  const [modalState, setModalState] = useState({
    show: false,
    title: '',
    category: null
  });
  
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

  // Open modal with specific category
  const openModal = (title, category) => {
    setModalState({
      show: true,
      title,
      category
    });
  };

  // Close modal
  const closeModal = () => {
    setModalState({
      ...modalState,
      show: false
    });
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
            <GuestSummary 
              guests={guests} 
              onTotalClick={() => openModal('All Guests', 'all')}
              onConfirmedClick={() => openModal('Confirmed Guests', 'confirmed')}
              onPendingClick={() => openModal('Pending Guests', 'pending')}
            />
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
          <p>Created by Muhammad Ali Imran, and vibes ✨ with ❤️ using React and Tailwind CSS</p>
        </footer>
      </div>
      
      <SaveNotification show={showSaveNotification} />
      <GuestListModal 
        show={modalState.show} 
        onClose={closeModal} 
        title={modalState.title}
        guests={guests}
        category={modalState.category}
      />
    </div>
  );
}

export default App;
