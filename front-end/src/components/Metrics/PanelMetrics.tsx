import React, {useContext, useEffect, useState} from 'react';
import {TaskContext} from "../../context/taskContext";
import {TasksContextType, Task} from "../../@types/task";
import { PiArrowCircleRightBold } from "react-icons/pi";
import { PiCatBold } from "react-icons/pi";
import Meow from "../EasterEggs/Meow";



interface ModalProps {
    openMetrics: boolean;
    closeMetrics: () => void;
    setOpenMetrics : (value:boolean)=>void;
}

function PanelMetrics({openMetrics, closeMetrics, setOpenMetrics}: ModalProps) {
    const {tasks, sortPriorityUp, sortPriorityDown, sortDueDateUp, sortDueDateDown, checkPage} = React.useContext(TaskContext) as TasksContextType;
    const[averageTime, setAverageTime] = useState<number>(0);
    const[averageTimePriority, setAverageTimePriority] = useState<{low:number, med:number, hi:number}>({low:0, med:0, hi:0}); //It stands for low, medium and high priorities
    const[meow, setMeow] = React.useState(false); //🐱
    const closeMeow = () => {setMeow(false);}
    useEffect(()=>{
        const tasksCompleted:Task[] = tasks.filter((task: Task) => task.completed);
        if(tasksCompleted.length > 0)
        {
            let totalTime:number = 0;
            tasksCompleted.forEach((task:Task)=>{
                totalTime = ((Date.parse(task.doneDate) - Date.parse(task.createDate))/(1000)) + totalTime;
            })
            setAverageTime(Math.floor(totalTime/tasksCompleted.length));
        }else{
            setAverageTime(0);
        }
    })
    useEffect(() => {
        let lowTime:number = 0;
        let lowTasks:number = 0;
        let medTime:number = 0;
        let medTasks:number = 0;
        let hiTime:number = 0;
        let hiTasks:number = 0;
        const tasksCompleted:Task[] = tasks.filter((task: Task) => task.completed);
        if(tasksCompleted.length > 0){
            tasksCompleted.forEach((task:Task)=>{
                switch(task.priority){
                    case "Low":
                        lowTime = ((Date.parse(task.doneDate) - Date.parse(task.createDate))/(1000)) + lowTime;
                        lowTasks++
                        break;
                    case "Medium":
                        medTime = ((Date.parse(task.doneDate) - Date.parse(task.createDate))/(1000)) + medTime;
                        medTasks++
                        break;
                    case "High":
                        hiTime = ((Date.parse(task.doneDate) - Date.parse(task.createDate))/(1000)) + hiTime;
                        hiTasks++
                        break;
                }
            })
            const lowTimeFinal = lowTasks > 0 ? Math.floor(lowTime/lowTasks) : 0;
            const medTimeFinal = medTasks > 0 ? Math.floor(medTime/medTasks) : 0;
            const hiTimeFinal = hiTasks > 0 ? Math.floor(hiTime/hiTasks) : 0;

            setAverageTimePriority({ low: lowTimeFinal, med: medTimeFinal, hi: hiTimeFinal });
        }

    }, [tasks]);
    return (
        <div className="flex w-full">
        <div className={`fixed top-0 left-0 h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center transform transition-all duration-500 ${openMetrics ? ' w-2/3': 'w-0'}`}>
        </div>
            <div className={`flex flex-col fixed z-50 top-0 right-0 bg-white p-6 rounded-l-lg shadow-lg w-1/3 h-full overflow-auto transform transition-transform duration-500 ease-in-out ${openMetrics ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold pt-4">Metrics</h2>
                    <button onClick={()=>{closeMetrics()}} className="text-red-500 rounded-full text-5xl flex justify-center items-center hover:text-red-700 transition duration-200">{PiArrowCircleRightBold({})}</button>
                </div>
                <div className="flex flex-col h-screen mt-2 px-4 py-2 border-2 border-gray-200 rounded-md">
                    <div className="flex flex-col h-1/6">
                        <h2 className="text-xl font-semibold">Average time to finish tasks:</h2>
                        <p className="text-lg font-semibold pl-4 pt-4">{averageTime == 0 ? ("Looks like you haven't completed a task yet"):(`${Math.floor(averageTime/60)} minutes`)}</p>
                    </div>
                    <div className="flex h-3/6 flex-col">
                        <h2 className="text-xl font-semibold">Average time to finish tasks by priority:</h2>
                        <div className="text-lg font-semibold pl-4 pt-4">{averageTime == 0 ? ("Looks like you haven't completed a task yet"):(
                            <div>
                                <p className="text-green-500">Low: {Math.floor(averageTimePriority.low/60)} minutes</p>
                                <p className="text-yellow-500">Medium: {Math.floor(averageTimePriority.med/60)} minutes</p>
                                <p className="text-red-500">High: {Math.floor(averageTimePriority.hi/60)} minutes</p>
                            </div>
                        )}</div>
                    </div>
                    <div className="flex flex-col justify-end h-full ">
                        <div className="w-full flex justify-end"><Meow meow={meow} setMeow={setMeow} closeMeow={closeMeow} /></div>
                        <p className="flex justify-end items-center text-sm text-right">Designed by Naokko <button onClick={()=>{setMeow(true)}}>{PiCatBold({})}</button></p>
                    </div>
                </div>
            </div>
            <div className={`fixed top-0 right-0 h-full w-1/3 bg-black bg-opacity-50 z-40 transform transition-transform duration-500 ease-in-out ${openMetrics ? 'translate-x-0' : 'translate-x-full'}`}></div>
        </div>
    );
}

export default PanelMetrics;