import Schedule from './Schedule.js';
import Popup from './Popup.js';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

/**
 * Overall planner page
 */
function Home() {

  return (
    <>
      <div className="flex justify-center m-4 ">
        <PanelGroup autoSave='home_panel' direction='horizontal'>
          <Panel>
            <Popup />
          </Panel>
          <PanelResizeHandle style={{ backgroundColor: 'gainsboro', width: '5px' }} />
          <Panel>
            <Schedule/> 
          </Panel>
        </PanelGroup>
      </div>
    </>
  );
}

export default Home;