import { useState, ChangeEvent, FC } from 'react';
import CourseViewer from './CourseViewer';
import { Link } from "react-router-dom";

const majors: string[] = ["major 1", "major 2"];

interface State {
  type: string;
  value: string;
}

const Home: FC = () => {
  const [state, setValue] = useState<State>({ type: 'major', value: 'none' });

  const setMajor = (e: ChangeEvent<HTMLSelectElement>): void => {
    setValue({ type: 'major', value: e.target.value });
  };

  return (
    <>
      <div className="flex justify-center">
        <CourseViewer selection={state} />
      </div>
    </>
  );
}

export default Home;