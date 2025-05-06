import { useState, useEffect, useRef } from 'react';

function Popup() {
    const [isOpened, setOpenPopup] = useState(false);

    const arrowRef = useRef(null);
    const [height, setHeight] = useState("0px");
    useEffect(() => {
        if (arrowRef.current) {
          if (isOpened) {
            setHeight(`${arrowRef.current.scrollHeight}px`);
          } else {
            setHeight("0px");
          }
        }
      }, [isOpened]);

      // (isOpened ? "max-h-screen " : "max-h-0 ") + 

    return (
        <div className="w-screen flex flex-col items-center fixed bottom-0 left-0">
            <div className="w-20 bg-gray-300 text-center rounded-t-md hover:cursor-pointer" onClick={() => setOpenPopup(!isOpened)}>^</div>
            <div ref={arrowRef} style={{ maxHeight: height }} className={"transition-all duration-300 ease-out"}>hewwo<br></br>hewwo<br></br>hewwo</div>
        </div>
    )
}

export default Popup