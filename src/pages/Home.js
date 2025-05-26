import Schedule from './Schedule.js';
import Popup from './Popup.js';

/**
 * Overall planner page
 */
function Home() {

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