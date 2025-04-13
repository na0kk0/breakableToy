import React, {useContext} from 'react';
import {TaskContext} from "../../context/taskContext";
import {TasksContextType, Task} from "../../@types/task";
import TaskTableRow from "./TaskTableRow";
import PanelMetrics from "../Metrics/PanelMetrics";
import { IoIosArrowUp } from "react-icons/io/index.js";
import { IoIosArrowDown } from "react-icons/io/index.js";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";


function TaskTable(){
    const {tasks, sortPriorityUp, sortPriorityDown, sortDueDateUp, sortDueDateDown, checkPage} = React.useContext(TaskContext) as TasksContextType;
    const[openMetrics, setOpenMetrics] = React.useState<boolean>(false);
    const closeMetrics = () => setOpenMetrics(false);
    const[priorityFilter, setPriorityFilter] = React.useState("");
    const[dueDateFilter, setDueDateFilter] = React.useState("");
    const[pages, setPages] = React.useState(0);
    const[page, setPage] = React.useState(1);
    const[allDone, setAllDone] = React.useState(false);
    React.useEffect(() => {
        setPages(Math.ceil(tasks.length / 10));
    }, [tasks]);
    React.useEffect(()=>{
        setAllDone(false);
        if(tasks.length > 0){
            let flag:boolean=true;
            tasks.slice((page*10)-10, (page*10)).forEach((task: Task) => {
                if(!task.completed)
                {
                    flag = false;
                }
            })
            if(flag){
                setAllDone(true);
            }
        }
    })

    return(
        <div data-testid="TaskTable">
        <div className="shadow-lg rounded-md overflow-hidden mx-2 md:mx-10 mt-4">
            <div className="max-h-[450px] overflow-y-auto">
            <table className="w-full table-fixed">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold uppercase text-center"><input onChange={()=>{checkPage(allDone,setAllDone, page)}} checked={allDone} className="transform scale-150" type="checkbox"/></th>
                        <th className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">Name</th>
                        <th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold uppercase">Priority
                            {priorityFilter === "" || priorityFilter === "Low" ? (
                                <button className="ml-2" onClick={()=> {

                                    setPriorityFilter("High")
                                    sortPriorityUp()
                                }}>{IoIosArrowUp({})}</button>
                            ) : (
                                <button className="ml-2" onClick={()=>{

                                    setPriorityFilter("Low")
                                    sortPriorityDown()
                                }}>{IoIosArrowDown({})}</button>
                            )}
                        </th>
                        <th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold uppercase">Due Date
                            {dueDateFilter === "" || dueDateFilter === "Low" ? (
                                <button className="ml-2" onClick={()=> {
                                    sortDueDateUp()
                                    setDueDateFilter("High")
                                }}>{IoIosArrowUp({})}</button>
                            ) : (
                                <button className="ml-2" onClick={()=>{
                                    sortDueDateDown()
                                    setDueDateFilter("Low")
                                }}>{IoIosArrowDown({})}</button>
                            )}
                        </th>
                        <th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold uppercase">Actions</th>
                    </tr>
            </thead>

                <tbody className="bg-white">
                    {tasks.length === 0 || !tasks ? (
                        <tr></tr>
                    ) : (
                        tasks.slice((page*10)-10, (page*10)).map((task: Task) => (<TaskTableRow key={task.id} task={task} />)
                    ))}
                </tbody>

            </table>
            </div>
        </div>
        <div className="flex justify-center w-full pt-8 relative">
            <div className="flex justify-center bg-gray-100 w-auto text-xl px-4 rounded-md gap-4">
                <button onClick={()=>{if(page > 1) setPage(page-1)}} className="text-balck hover:text-gray-400 transition duration-200">{FaAngleLeft({})}</button>
                {Array.from({ length: pages }, (_, i) => i + 1).map((num) => (
                    <button key={num} onClick={()=>{setPage(num)}} className={page === num ? "mx-1 px-2 py-1 rounded-md bg-gray-200":"mx-1 px-2 py-1 rounded-md hover:text-gray-400 transition duration-200"}>{num}</button>
                ))}
                <button onClick={()=>{if(page<(pages)) setPage(page+1)}} className="text-balck hover:text-gray-400 transition duration-200">{FaAngleRight({})}</button>
            </div>
            {pages !== 0 ? (<div className="flex absolute right-10">
                <button onClick={()=>{setOpenMetrics(true)}} className="whitespace-nowrap bg-violet-400 px-2 py-1 rounded-md border-white border-2 font-semibold hover:text-white transition duration-200">Show metrics</button>
                <PanelMetrics openMetrics={openMetrics} closeMetrics={closeMetrics} setOpenMetrics={setOpenMetrics} />
            </div>):(<div></div>)}
        </div>
        </div>
    )
}

export default TaskTable;
