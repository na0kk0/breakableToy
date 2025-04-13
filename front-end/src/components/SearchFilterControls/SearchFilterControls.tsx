import React, {useContext, useState} from 'react';
import { IoSearch } from "react-icons/io5";
import { IoList } from "react-icons/io5";

import {TasksContextType, Task} from "../../@types/task";


import DropdownMenu from "../DropdownMenu/DropdownMenu";
import {TaskContext} from "../../context/taskContext";
function SearchFilterControls() {
    const {tasks, searchTask, getTasks} = React.useContext(TaskContext) as TasksContextType;
    const [priority, setPriority] = useState<string>("");
    const[state, setState] = useState<string>("");
    const[name, setName] = useState<string>("");
    const searchButton = "flex items-center gap-1 text-xl font-bold bg-blue-400 py-1 px-2 hover:bg-blue-600 rounded-md border-2 border-white hover:border-white hover:text-white transition duration-200"
    const noSearch = "flex items-center gap-1 text-xl font-bold py-1 px-2 rounded-md border-2 border-white hover:border-white hover:black-white transition duration-200 bg-red-500"
    const [animationClass, setAnimationClass] = React.useState(searchButton);
    const animationSearch = ()=>{
        setAnimationClass(noSearch)
        setTimeout(() => { setAnimationClass("flex items-center gap-1 text-xl font-bold bg-blue-400 py-1 px-2 hover:bg-blue-600 rounded-md border-2 border-white hover:border-white hover:text-white transition duration-200") }, 500);
    }
    return(
        <div className="flex flex-col bg-gray-300 w-full py-6 px-5 my-5 mx-6 border-4 rounded-lg border-white shadow-lg" id="search-filter" data-testid="SearchFilter">
            <div className="flex flex-row justify-between w-full pb-2">
                <span className="text-4xl">Name</span>
                <input value={name} onChange={(e)=>{setName(e.target.value)}} autoComplete="off" id="name" type="text" placeholder="Text" maxLength={120} className="rounded-md text-2xl w-11/12 px-1" />
            </div>
            <div className="flex py-2">
                <span className="justify-self-center text-4xl">Priority</span>
                <div className="px-6 content-center z-30">
                    <DropdownMenu type={"priority"} onChange={setPriority} />
                </div>
            </div>
            <div className="flex py-2">
                <span className="justify-self-center text-4xl pl-1">State</span>
                <div className="px-12 content-center z-20">
                    <DropdownMenu type={"state"} onChange={setState} />
                </div>
                <button onClick={()=>{getTasks()
                    setName("")
                    }} className="flex items-center gap-1 ml-auto text-xl font-bold bg-yellow-200 py-1 px-2 hover:bg-yellow-400 rounded-md border-2 border-white hover:border-white hover:text-white mr-4 transition duration-200">List all {IoList({})}</button>
                <button onClick={()=>{name !== "" || priority !== "" || state !== "" ? searchTask(name, priority, state): animationSearch()}} className={animationClass}>Search {IoSearch({})}</button>
            </div>
        </div>
    )
}
export default SearchFilterControls;
