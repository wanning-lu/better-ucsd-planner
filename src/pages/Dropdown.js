import { useState } from 'react';

function Dropdown(props) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open)
    }

    return (
        <div className="w-full cursor-pointer hover:bg-stone-100" onClick={handleOpen}>
            <div>
                {/* placeholder for an icon LOL */}
                {open ? (
                   <>{'v '}</>
                ) : <>{'> '}</>}
                some requirement
            </div>
            {open ? (
                <div>heyy</div>
            ) : null}
        </div>
    )
}

export default Dropdown