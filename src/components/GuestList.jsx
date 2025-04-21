import { useState } from 'react';

const GuestList = ({ guests, toggleRSVP, removeGuest, editGuest }) => {
  const [editMode, setEditMode] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [expandedGuest, setExpandedGuest] = useState(null);

  const handleEditStart = (guest) => {
    setEditMode(guest.id);
    setEditName(guest.name);
    setEditEmail(guest.email);
  };

  const handleEditSave = (id) => {
    editGuest(id, { name: editName, email: editEmail });
    setEditMode(null);
  };

  const handleEditCancel = () => {
    setEditMode(null);
  };

  const toggleExpand = (id) => {
    setExpandedGuest(expandedGuest === id ? null : id);
  };

  return (
    <div className="h-full p-4 sm:p-6 bg-white rounded-xl shadow-xl border border-indigo-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800 flex items-center">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
        Guest List
      </h2>
      
      {guests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 sm:py-10 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-2 sm:mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <p className="text-gray-500 text-base sm:text-lg">No guests added yet.</p>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">Add your first guest using the form!</p>
        </div>
      ) : (
        <div className="overflow-hidden">
          <ul className="divide-y divide-gray-200 -mx-4 sm:-mx-6">
            {guests.map((guest) => (
              <li key={guest.id} className={`px-4 sm:px-6 transition-colors ${guest.rsvp ? 'bg-green-50' : ''}`}>
                {editMode === guest.id ? (
                  <div className="py-3 sm:py-4 space-y-3">
                    <div>
                      <label htmlFor={`edit-name-${guest.id}`} className="block text-xs sm:text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        id={`edit-name-${guest.id}`}
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label htmlFor={`edit-email-${guest.id}`} className="block text-xs sm:text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        id={`edit-email-${guest.id}`}
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col xs:flex-row gap-2">
                      <button
                        onClick={() => handleEditSave(guest.id)}
                        className="inline-flex justify-center py-1.5 sm:py-2 px-3 sm:px-4 border border-transparent shadow-sm text-xs sm:text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="inline-flex justify-center py-1.5 sm:py-2 px-3 sm:px-4 border border-gray-300 shadow-sm text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-3 sm:py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="flex items-start sm:items-center space-x-3">
                        <div className={`flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center font-medium text-white ${
                          guest.rsvp ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-yellow-500 to-yellow-600'
                        }`}>
                          {guest.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-medium text-gray-900 flex items-center">
                            {guest.name}
                            {guest.rsvp && (
                              <svg className="ml-1.5 h-4 w-4 sm:h-5 sm:w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            )}
                          </h3>
                          <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                            <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <span className="truncate max-w-[160px] sm:max-w-full">{guest.email}</span>
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                            guest.rsvp ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {guest.rsvp ? 'Attending' : 'Not Confirmed'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                        <button
                          onClick={() => toggleRSVP(guest.id)}
                          className={`flex items-center px-2 sm:px-3 py-1 sm:py-1.5 border text-xs sm:text-sm rounded-md transition-colors ${
                            guest.rsvp
                              ? 'text-red-700 bg-red-50 border-red-200 hover:bg-red-100'
                              : 'text-green-700 bg-green-50 border-green-200 hover:bg-green-100'
                          }`}
                        >
                          {guest.rsvp ? (
                            <>
                              <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                              <span className="hidden xs:inline">Cancel</span>
                            </>
                          ) : (
                            <>
                              <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              <span className="hidden xs:inline">Confirm</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => toggleExpand(guest.id)}
                          className="p-1 sm:p-1.5 text-gray-500 hover:bg-gray-100 rounded-md"
                        >
                          <svg className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform ${expandedGuest === guest.id ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {expandedGuest === guest.id && (
                      <div className="mt-3 pl-8 sm:pl-12 space-y-2 border-t pt-3">
                        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2">
                          <div className="text-gray-600 text-xs sm:text-sm">RSVP Status: <span className="font-medium">{guest.rsvp ? 'Attending' : 'Not Confirmed'}</span></div>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => handleEditStart(guest)}
                              className="p-1 sm:p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-md flex items-center text-xs sm:text-sm"
                            >
                              <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={() => removeGuest(guest.id)}
                              className="p-1 sm:p-1.5 text-red-600 hover:bg-red-50 rounded-md flex items-center text-xs sm:text-sm"
                            >
                              <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="text-gray-500 text-xs italic">
                          Added on {new Date(guest.id).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {guests.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center text-xs sm:text-sm text-gray-500">
          <div>
            {guests.length} {guests.length === 1 ? 'guest' : 'guests'} total
          </div>
          <div className="flex space-x-1">
            <svg className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{guests.filter(g => g.rsvp).length} confirmed</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestList;