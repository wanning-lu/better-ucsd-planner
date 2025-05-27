import React from "react";
import { useContext } from "react";
import { SelectedInfoContext } from '../App.js'
import { Link } from "react-router-dom";
import majorArray from '../data/majors.json'

function Welcome() {
    const { selectedInfo, changeInfo } = useContext(SelectedInfoContext)
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <div>select ur major!!</div>
            <select value={selectedInfo.major} onChange={(e) => (changeInfo("major", e.target.value))}>
                <option value="none">none</option>
                {
                    majorArray.map(major => <option value={major.code}>{major.name}</option>)
                }
            </select>
            <div>select ur college!!</div>
            <select value={selectedInfo.college} onChange={(e) => (changeInfo("college", e.target.value))}>
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
                <a href="/discover">go go go!!!</a>
            </button>
        </div>
    )
}

export default Welcome