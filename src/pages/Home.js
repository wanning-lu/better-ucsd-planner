import Schedule from './Schedule.js';
import Popup from './Popup.js';

/**
 * Overall planner page
 */
function Home() {

  return (
    <>
      <div className="flex justify-center m-4">
        <Popup/>
        <Schedule/> 
      </div>
    </>
  );
}

export default Home;