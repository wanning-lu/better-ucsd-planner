import { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

const majors = ["cs major :(", "ece major"];

/**
 * General template for each page, mainly the navbar
 */
function Layout() {
  const [major, setMajor] = useState('none');

  return (
    <>
      {/* navbar */}
      <div className="flex justify-between p-8 font-semibold">
        <Link to="/" className="flex-1">better ucsd planner</Link>
        <div className="flex justify-center flex-1 space-x-4">
          <select id="major" name="major" autoComplete="major-name" onChange={(e) => {setMajor(e.target.value)}} className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
            {majors.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 text-right">
          <Link to="/discover">discover</Link>
        </div>
      </div>
      {/* viewer for courses */}
      <Outlet />
    </>
  );
}

export default Layout;