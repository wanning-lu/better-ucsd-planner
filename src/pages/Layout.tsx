import { useState, ChangeEvent, FC } from 'react';
import CourseViewer from './CourseViewer';
import { Link, Outlet } from "react-router-dom";

const majors: string[] = ["major 1", "major 2"];

interface State {
  type: string;
  value: string;
}

const Layout: FC = () => {
  const [state, setValue] = useState<State>({ type: 'major', value: 'none' });

  const setMajor = (e: ChangeEvent<HTMLSelectElement>): void => {
    setValue({ type: 'major', value: e.target.value });
  };

  return (
    <>
      {/* navbar */}
      <div className="flex justify-between p-8 font-semibold">
        <Link to="/" className="flex-1">better ucsd planner</Link>
        <div className="flex-1 flex justify-center space-x-4">
          <select id="major" name="major" autoComplete="major-name" onChange={setMajor} className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
            {majors.map((name: string) => (
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