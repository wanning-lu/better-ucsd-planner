import { useState } from 'react';
import Schedule from './Schedule.js';

const majors = ["cs major", "ece major"];

function Home() {
  const [state, setValue] = useState({ type: 'major', value: 'none' });

  const setMajor = (e) => {
    setValue({ type: 'major', value: e.target.value });
  };

  return (
    <>
      <div className="flex justify-center">
        <Schedule/>
      </div>
    </>
  );
}

export default Home;