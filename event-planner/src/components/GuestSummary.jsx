const GuestSummary = ({ guests }) => {
  const totalGuests = guests.length;
  const confirmedGuests = guests.filter(guest => guest.rsvp).length;
  const unconfirmedGuests = totalGuests - confirmedGuests;
  
  const attendanceRate = totalGuests ? Math.round((confirmedGuests / totalGuests) * 100) : 0;

  return (
    <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-white rounded-xl shadow-xl border border-indigo-100 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-50"></div>
      <div className="relative">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800 flex items-center">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          Event Summary
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 bg-white rounded-xl shadow-md border-l-4 border-indigo-500 transform transition-transform hover:scale-105">
            <div className="flex justify-between items-center">
              <p className="text-3xl sm:text-4xl font-bold text-indigo-600">{totalGuests}</p>
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-500">Total Guests</p>
          </div>
          
          <div className="p-3 sm:p-4 bg-white rounded-xl shadow-md border-l-4 border-green-500 transform transition-transform hover:scale-105">
            <div className="flex justify-between items-center">
              <p className="text-3xl sm:text-4xl font-bold text-green-600">{confirmedGuests}</p>
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-500">Confirmed</p>
          </div>
          
          <div className="p-3 sm:p-4 bg-white rounded-xl shadow-md border-l-4 border-yellow-500 transform transition-transform hover:scale-105">
            <div className="flex justify-between items-center">
              <p className="text-3xl sm:text-4xl font-bold text-yellow-600">{unconfirmedGuests}</p>
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-500">Pending</p>
          </div>
        </div>
        
        {totalGuests > 0 && (
          <div className="mt-4 sm:mt-6">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Attendance Rate</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full" 
                style={{ width: `${attendanceRate}%` }}
              ></div>
            </div>
            <p className="text-xs text-right mt-1 text-gray-500">{attendanceRate}% confirmed</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestSummary;