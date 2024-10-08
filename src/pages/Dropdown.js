import { useState } from 'react';
import ClassInfo from './ClassInfo';
import CourseViewer from './CourseViewer';

function Dropdown(props) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open)
    }

    // const [popupContent, setPopupContent] = useState(null);

    // const openPopup = (content) => {
    //     if (popupContent !== null) {
    //         return
    //     }

    //     setPopupContent(content)
    // }

    // const closePopup = () => {
    //     setPopupContent(null)
    // }

    return (
        <>
        <div className="w-5/6 mx-auto">
        <div className="p-2 rounded-md cursor-pointer hover:bg-stone-100" onClick={handleOpen}>
            <div>
                {/* placeholder for an icon LOL */}
                {open ? (
                    <>{'v '}</>
                ) : <>{'> '}</>}
                {/* title of the dropdown and num classes for the requirement */}
                {props.electiveName ? (
                    <>{props.electiveName} ({props.numRequired})</>
                ) : <>Core Requirements ({props.classes.length})</>}
            </div>
        </div>
        
        {/* rendering for core classes */}
  
        <div className={open && !props.electiveName ? "" : "hidden"}>
        {props.classes.map((classInfo) => (
            <label for={classInfo} className="block">
            <input type="checkbox" name={classInfo} value={classInfo}/>
            {" " + classInfo}
            </label>
        ))}
        </div>
        {/* rendering for elective classes */}
        <div className={open && props.electiveName ? "" : "hidden"}>
        {props.classes.map((classInfo) => (
            <ClassInfo classCode={classInfo} onOpenPopup={props.openPopup}/>
        ))}
        </div>
        </div>
        </>
    )
}

export default Dropdown