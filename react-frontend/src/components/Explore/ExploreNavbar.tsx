import React, { useState } from 'react';

export default function ExploreNavbar() {
  const [activeButton, setActiveButton] = useState('All');

  const handleButtonClick = (buttonName : string) => {
    setActiveButton(buttonName);
  };

return (
    <div className="flex flex-col items-center py-8 mt-24 mx-2">
      <h1 className="text-4xl font-abrilFatface text-customGreen mb-6">Explore</h1>
      <div className="flex space-x-4 mb-4">
        <button
          className={`text-customGreen font-medium pb-1 ${
            activeButton === 'All' ? 'border-b-2 border-customGreen' : ''
          }`}
          onClick={() => handleButtonClick('All')}
        >
          All
        </button>
        <button
          className={`text-customGreen font-medium pb-1 ${
            activeButton === 'Plums' ? 'border-b-2 border-customGreen' : ''
          }`}
          onClick={() => handleButtonClick('Plums')}
        >
          Plums
        </button>
        <button
          className={`text-customGreen font-medium pb-1 ${
            activeButton === 'Services' ? 'border-b-2 border-customGreen' : ''
          }`}
          onClick={() => handleButtonClick('Services')}
        >
          Services
        </button>
      </div>
      <input
        type="search"
        placeholder="Search Plums or services"
        className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-customGreen"
      />
    </div>
  );
}
