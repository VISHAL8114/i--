import React, { useEffect, useState } from 'react';

const App = () => {
  const [isTabActive, setIsTabActive] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [switchCount, setSwitchCount] = useState(0);
  const [lastSwitchTime, setLastSwitchTime] = useState(Date.now());

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User has switched tabs or minimized the app
        setIsTabActive(false);
        setSwitchCount(prevCount => prevCount + 1);
        const currentTime = Date.now();

        // Check the time difference from the last switch
        const timeSinceLastSwitch = currentTime - lastSwitchTime;
        setLastSwitchTime(currentTime);

        // If switches are too frequent (e.g., in the last 5 seconds)
        if (switchCount >= 4 && timeSinceLastSwitch <= 5000) {
          alert('Tab switches have been very frequent. The tab will be closed.');
          window.close(); // Attempt to close the tab
        } else {
          // Show overlay if not yet reached the limit
          setShowOverlay(true);
          alert('Tab switch detected! Please stay on this page.');
        }
      } else {
        // User is back on the tab
        setIsTabActive(true);
      }
    };

    // Add event listener for visibility change
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [switchCount, lastSwitchTime]);

  // Function to handle the "OK, Continue" button click
  const handleOverlayClose = () => {
    setShowOverlay(false); // Hide the overlay
  };

  return (
    <div className="text-center mt-12 relative">
      <h1 className="text-3xl font-bold mb-8">Tab Switch Detection in React</h1>
      {isTabActive ? (
        <h2 className="text-green-600 text-xl">Tab is Active</h2>
      ) : (
        <h2 className="text-red-600 text-xl">Tab is Inactive (Switched)</h2>
      )}

      {/* Overlay when tab switch is detected */}
      {showOverlay && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h2 className="text-red-600 text-2xl font-semibold mb-4">Tab Switch Detected</h2>
            <p className="text-gray-700 mb-6">Please stay on this page.</p>
            <button
              onClick={handleOverlayClose}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              OK, Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
