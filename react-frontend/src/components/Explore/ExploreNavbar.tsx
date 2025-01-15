import React, { useState } from 'react';

export default function ExploreNavbar() {
  const [activeButton, setActiveButton] = useState('All');

  const handleButtonClick = (buttonName : string) => {
    setActiveButton(buttonName);
  };

return (
    <div className="flex flex-col items-center py-8 mt-24 mx-2">
      <h1 className="text-4xl font-abrilFatface text-customGreen mb-6">Explore</h1>
    </div>
  );
}
