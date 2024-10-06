import { useState } from 'react';

function Dropdown(props) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open)
    }

    return (
        <div className="w-5/6 mx-auto p-2 rounded-md cursor-pointer hover:bg-stone-100" onClick={handleOpen}>
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
            {/* rendering for core classes */}
            {open && !props.electiveName ? (
                <div>core</div>
            ) : null}
            {/* rendering for elective classes */}
            {open && props.electiveName ? (
                <div>elective</div>
            ) : null}
        </div>
    )
}

export default Dropdown