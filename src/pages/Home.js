import { useState } from 'react';
import Schedule from './Schedule.js';
import Popup from './Popup.js';

const majors = ["cs major", "ece major"];

/**
 * Overall planner page
 */
function Home() {
  const [major, setMajor] = useState('none');

  return (
    <>
      <div className="flex justify-center">
        <Schedule/>
        <Popup/>
      </div>
    </>
  );
}

export default Home;