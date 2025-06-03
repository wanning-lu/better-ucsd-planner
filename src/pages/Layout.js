import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { SelectedInfoContext } from "../App";
import majorArray from "../data/majors.json"

/**
 * General template for each page, mainly the navbar
 */
function Layout() {
  const [ infoPopup, openInfoPopup ] = useState(false)
  const { selectedInfo, changeInfo } = useContext(SelectedInfoContext)

  const [ newInfo, changeNewInfo ]= useState({"major": selectedInfo.major, "college": selectedInfo.college})

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
          <div className="space-x-4 underline cursor-pointer hover:text-blue-800" onClick={e => openInfoPopup(true)}>
            edit my info
          </div>
        </div>
        
        <div className="flex-1 text-right">
          <NavLink to="/discover" className={({ isActive }) =>
            (isActive ? "text-light-blue-500 " : "text-black ")
          }>discover</NavLink>
        </div>
      </div> : <></> }
      { infoPopup ?
        <div className="fixed bottom-0 left-0 flex flex-col items-center justify-center w-screen h-screen bg-gray-900/40">
          <div className="relative flex flex-col items-center justify-center gap-4 bg-white rounded-md h-96 w-80">
            <div className="absolute top-0 left-0" onClick={e => openInfoPopup(false)}>X</div>
            <div>select ur major!!</div>
            <select value={newInfo.major} onChange={(e) => (changeNewInfo({...newInfo, major: e.target.value}))}>
                <option value="none">none</option>
                {
                  majorArray.map(major => <option value={major.code}>{major.name}</option>)
                }
            </select>
            <div>select ur college!!</div>
            <select value={newInfo.college} onChange={(e) => (changeNewInfo({...newInfo, college: e.target.value}))}>
                <option value="none">none</option>
                <option value="revelle">Revelle</option>
                <option value="erc">ERC</option>
                <option value="warren">Warren</option>
                <option value="marshall">Marshall</option>
                <option value="muir">Muir</option>
                <option value="Sixth">Sixth</option>
                <option value="seventh">Seventh</option>
                <option value="eighth">Eighth</option>
            </select>
            {/* css for button below taken from https://getcssscan.com/css-buttons-examples (button 2) */}
            <button className="hover:bg-gray-200 focus:bg-gray-200 bg-[rgba(51,_51,_51,_0.05)] rounded-[8px] border-[0] text-[#333333] cursor-pointer inline-block leading-[20px] [list-style:none] m-0 px-[12px] py-[10px] text-center [transition:all_200ms] align-baseline whitespace-nowrap select-none">
                <a onClick={(e) => {
                  changeInfo(newInfo)
                  localStorage.clear()
		              localStorage.setItem("selectedInfo", JSON.stringify(newInfo))
                  window.location.href="/discover"
                }}>
                  save
                </a>
            </button>
          </div>
        </div> 
        : <></>
      }
      {/* viewer for courses */}
      <Outlet />
    </>
  );
}

export default Layout;