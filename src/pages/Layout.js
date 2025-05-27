import { NavLink, Outlet, useLocation } from "react-router-dom";

/**
 * General template for each page, mainly the navbar
 */
function Layout() {

  return (
    <>
      {/* navbar */}
      { useLocation().pathname !== '/' ?
      <div className="flex justify-between p-8 font-semibold">
        <div className="flex-1">
          <NavLink to="/planner" className={({ isActive }) =>
            (isActive ? "text-light-blue-500 " : "text-black ")
          }>better ucsd planner</NavLink>
        </div>
        
        <div className='flex justify-center flex-1'>
          <div className="space-x-4 underline cursor-pointer hover:text-blue-800">
            edit my info
          </div>
        </div>
        
        <div className="flex-1 text-right">
          <NavLink to="/discover" className={({ isActive }) =>
            (isActive ? "text-light-blue-500 " : "text-black ")
          }>discover</NavLink>
        </div>
      </div> : <></> }
      {/* viewer for courses */}
      <Outlet />
    </>
  );
}

export default Layout;