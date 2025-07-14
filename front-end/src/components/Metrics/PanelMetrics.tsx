import React, {useEffect} from 'react';
import {TaskContext} from "../../context/taskContext";
import {TasksContextType} from "../../@types/task";
import { PiArrowCircleRightBold } from "react-icons/pi";
import { PiCatBold } from "react-icons/pi";
import Meow from "../EasterEggs/Meow";

interface ModalProps {
    openMetrics: boolean;
    closeMetrics: () => void;
    setOpenMetrics : (value:boolean)=>void;
}

function PanelMetrics({openMetrics, closeMetrics}: ModalProps) {
    const {tasks, fetchMetrics, averageTime, averageTimePriority} = React.useContext(TaskContext) as TasksContextType;
    const[meow, setMeow] = React.useState(false); //🐱
    const closeMeow = () => {setMeow(false);}
    useEffect(() => {
        fetchMetrics();
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
                        <p className="text-lg font-semibold pl-4 pt-4">{averageTime == "" ? ("Looks like you haven't completed a task yet"):((averageTime))}</p>
                    </div>
                    <div className="flex h-3/6 flex-col">
                        <h2 className="text-xl font-semibold">Average time to finish tasks by priority:</h2>
                        <div className="text-lg font-semibold pl-4 pt-4">{averageTime == "" ? ("Looks like you haven't completed a task yet"):(
                            <div>
                                <p className="text-green-500">Low: {averageTimePriority.low == "" ? "Looks like you haven't completed a task with Low priority yet" : averageTimePriority.low}</p>
                                <p className="text-yellow-500">Medium: {averageTimePriority.med == "" ? "Looks like you haven't completed a task with Medium priority yet" : averageTimePriority.med}</p>
                                <p className="text-red-500">High: {averageTimePriority.hi == "" ? "Looks like you haven't completed a task with High priority yet" : averageTimePriority.hi}</p>
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