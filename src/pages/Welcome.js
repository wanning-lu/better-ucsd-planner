import { useContext } from "react";
import { SelectedInfoContext } from '../App.js'
import majorArray from '../data/majors.json'

function Welcome() {
    const { selectedInfo, changeInfo } = useContext(SelectedInfoContext)
    let years = Array.from({ length: 20 }, (value, index) => index);
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <div>select ur major!!</div>
            <select value={selectedInfo.major} onChange={(e) => (changeInfo({...selectedInfo, major: e.target.value}))}>
                <option value="none">none</option>
                {
                    majorArray.map(major => <option value={major.code}>{major.name}</option>)
                }
            </select>
            <div>select ur college!!</div>
            <select className="w-5/6 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" value={selectedInfo.college} onChange={(e) => (changeInfo({...selectedInfo, college: e.target.value}))}>
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
            <div>select ur year!!</div>
            <select value={selectedInfo.year} onChange={(e) => (changeInfo({...selectedInfo, year: e.target.value}))}>
                <option value="none">none</option>
                {
                    years.map(year => <option value={year + 2010}>{year + 2010}</option>)
                }
            </select>
            {/* css for button below taken from https://getcssscan.com/css-buttons-examples (button 2) */}
            <button className="hover:bg-gray-200 focus:bg-gray-200 bg-[rgba(51,_51,_51,_0.05)] rounded-[8px] border-[0] text-[#333333] cursor-pointer inline-block leading-[20px] [list-style:none] m-0 px-[12px] py-[10px] text-center [transition:all_200ms] align-baseline whitespace-nowrap select-none">
                <a href="/discover">go go go!!!</a>
            </button>
        </div>
    )
}

export default Welcome