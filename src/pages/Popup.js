import { useState } from 'react';

function Popup() {
    const [isOpened, setOpenPopup] = useState(false);

    return (
        <div className="w-screen flex flex-col items-center fixed bottom-0 left-0">
            <div className="w-20 bg-gray-300 text-center rounded-t-md hover:cursor-pointer" onClick={() => setOpenPopup(!isOpened)}>^</div>
            <div className={ (isOpened ? "hidden " : "") + "transition duration-150"}>hewwo</div>
        </div>
    )
}

export default Popup