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
        id="search"
        placeholder="Search Plums or services"
        className="mt-1 block w-full max-w-md px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-customGreen focus:border-customGreen"
      />
    </div>
  );
}
