import React from 'react';
import {TaskContext} from "../../context/taskContext";
import {TasksContextType, Task} from "../../@types/task";
import TaskTableRow from "./TaskTableRow";
import PanelMetrics from "../Metrics/PanelMetrics";
import { IoIosArrowUp } from "react-icons/io/index.js";
import { IoIosArrowDown } from "react-icons/io/index.js";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";


function TaskTable(){

    const {tasks,
        fetchTasks,
        totalPages,
        sortPriorityUp,
        sortPriorityDown,
        sortDueDateUp,
        sortDueDateDown,
        checkPage,
    } = React.useContext(TaskContext) as TasksContextType;

    const[openMetrics, setOpenMetrics] = React.useState<boolean>(false);
    const closeMetrics = () => setOpenMetrics(false);
    const[priorityFilter, setPriorityFilter] = React.useState("");
    const[dueDateFilter, setDueDateFilter] = React.useState("");
    const [sortMode, setSortMode] = React.useState<"none" | "priorityUp" | "priorityDown" | "dueDateUp" | "dueDateDown">("none");
    const[page, setPage] = React.useState(1);
    const[allDone, setAllDone] = React.useState(false);

    React.useEffect(() => {
        switch (sortMode){
            case "priorityUp":
                sortPriorityUp(page-1);
                break;
            case "priorityDown":
                sortPriorityDown(page-1);
                break;
            case "dueDateUp":
                sortDueDateUp(page-1);
                break;
            case "dueDateDown":
                sortDueDateDown(page-1);
                break;
            default:
                fetchTasks(page-1, 10);
                break;

        }
    }, [page, sortMode]);

    React.useEffect(()=>{
        if(tasks.length > 0){
            const allCompleted = tasks.every((task) => task.completed);
            setAllDone(allCompleted);
        }
    }, [tasks]);

    return(
        <div data-testid="TaskTable">
        <div className="shadow-lg rounded-md overflow-hidden mx-2 md:mx-10 mt-4">
            <div className="max-h-[450px] overflow-y-auto">
            <table className="w-full table-fixed">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold uppercase text-center">
                            <input
                                onChange={()=>checkPage(allDone, setAllDone, page)}
                               checked={allDone}
                               className="transform scale-150"
                               type="checkbox"
                            />
                        </th>
                        <th className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">Name</th>
                        <th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold uppercase">Priority
                            {priorityFilter === "" || priorityFilter === "Low" ? (
                                <button className="ml-2" onClick={()=> {
                                    setPriorityFilter("High")
                                    setSortMode("priorityUp");
                                }}>{IoIosArrowUp({})}</button>
                            ) : (
                                <button className="ml-2" onClick={()=>{

                                    setPriorityFilter("Low")
                                    setSortMode("priorityDown");
                                }}>{IoIosArrowDown({})}</button>
                            )}
                        </th>
                        <th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                            Due Date
                            {dueDateFilter === "" || dueDateFilter === "Low" ? (
                                <button className="ml-2" onClick={()=> {
                                    setDueDateFilter("High")
                                    setSortMode("dueDateUp");
                                }}>{IoIosArrowUp({})}</button>
                            ) : (
                                <button className="ml-2" onClick={()=>{
                                    setDueDateFilter("Low")
                                    setSortMode("dueDateDown");
                                }}>{IoIosArrowDown({})}</button>
                            )}
                        </th>
                        <th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold uppercase">Actions</th>
                    </tr>
            </thead>

                <tbody className="bg-white">
                    {tasks.length === 0 || tasks === null ? (
                        <tr>
                            <td colSpan={5} className="text-center py-4">No tasks</td>
                        </tr>
                    ) : (
                        tasks.map((task: Task) => (
                            <TaskTableRow key={task.id} task={task} page={page}/>
                        )
                    ))}
                </tbody>

            </table>
            </div>
        </div>
        <div className="flex justify-center w-full pt-8 relative">
            <div className="flex justify-center bg-gray-100 w-auto text-xl px-4 rounded-md gap-4">
                <button onClick={()=>setPage(p=> Math.max(1, p-1))} className="text-balck hover:text-gray-400 transition duration-200">
                    {FaAngleLeft({})}
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button key={num} onClick={()=>{setPage(num)}} className={page === num ? "mx-1 px-2 py-1 rounded-md bg-gray-200":"mx-1 px-2 py-1 rounded-md hover:text-gray-400 transition duration-200"}>
                        {num}
                    </button>
                ))}
                <button onClick={()=>setPage(p => Math.min(totalPages, p+1))} className="text-balck hover:text-gray-400 transition duration-200">{FaAngleRight({})}</button>
            </div>
            {totalPages !== 0 ? (<div className="flex absolute right-10">
                <button onClick={()=>{setOpenMetrics(true)}} className="whitespace-nowrap bg-violet-400 px-2 py-1 rounded-md border-white border-2 font-semibold hover:text-white transition duration-200">
                    Show metrics
                </button>
                <PanelMetrics openMetrics={openMetrics} closeMetrics={closeMetrics} setOpenMetrics={setOpenMetrics} />
            </div>):(<div></div>)}
        </div>
        </div>
    )
}

export default TaskTable;
