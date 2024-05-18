import { useState } from 'react';
import CourseViewer from './CourseViewer';

let majors = ["major 1", "major 2"];
let major_codes = ["MA1", "MA2"];

function Main() {

    const [state, setValue] = useState({type: 'major', value: 'none'});

    const setMajor = (e) => {
        setValue({ type: 'major', value: e.target.value });
    };

    const setMajorCode = (e) => {
        setValue({ type: 'major_code', value: e.target.value });
    };

    return (
        <>
        <div class="flex justify-between p-8 font-semibold">
            <div class="border-2">better ucsd planner</div>
            <div class="flex border-2 justify-center space-x-4">
                <select id="major" name="major" autocomplete="major-name" onChange={setMajor} class="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                {majors.map((name) => (
                    <option>{name}</option>
                ))}
                </select>
                <div>or</div>
                <select id="major-code" name="major-code" autocomplete="major-code" onChange={setMajorCode} class="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                {major_codes.map((name) => (
                    <option>{name}</option>
                ))}
                </select>
            </div>
            <div class="border-2">about</div>
        </div>
        <div class="flex justify-center border-2">
            <CourseViewer selection={state}/>
        </div>
       
        </>
    );
}

export default Main;