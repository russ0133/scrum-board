import React from 'react';
import { getCities } from './server/firebase';

function App() {
  // hello
  const handleClick = async () => {
    const cities = await getCities();
    console.log(cities);
  };
  return (
    <div className="bg-red-500">
      <button type="button" onClick={handleClick}>
        Hello
      </button>
      <div>Hey</div>
    </div>
  );
}

export default App;
