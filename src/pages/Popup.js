import { useState, useEffect, useRef, useContext } from 'react';
import { SelectedCoursesContext } from '../App.js'
import CourseViewer from './CourseViewer';

/**
 * Popup that displays remaining course + course graph information on planner page
 */
function Popup() {
    const { selectedCourses } = useContext(SelectedCoursesContext)
    const [isOpened, setOpenPopup] = useState(false);

    const [courseViewed, changeCourseView] = useState("none")

    // using React state to change max height, allows for smooth transition
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

    return (
        <div className="fixed bottom-0 left-0 flex flex-col items-center w-screen">
            <div className="w-20 text-center bg-gray-300 rounded-t-md hover:cursor-pointer" onClick={() => setOpenPopup(!isOpened)}>^</div>
            <div ref={arrowRef} style={{ maxHeight: height }} className="flex w-full transition-all duration-300 ease-out">
                <div className="w-[20vw]">part 1</div>
                <div className="w-[80vw] relative">
                    <select onChange={(e) => {changeCourseView(e.target.value)}}className="absolute top-5 left-5 z-10 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                        {selectedCourses.map((course) => {
                            return (<option value={course}>{course}</option>)
                        })}
                    </select>
                    <CourseViewer selectedClass={courseViewed}/>
                </div>
            </div>
        </div>
    )
}

export default Popup