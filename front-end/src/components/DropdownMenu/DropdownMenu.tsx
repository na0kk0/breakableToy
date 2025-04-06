import React, {useState} from "react";
import MenuItem from "./MenuItem";


const priorityOptions:string[] = ["All", "High", "Medium", "Low"];
const stateOptions:string[] = ["All", "Done", "Undone"];


function DropdownMenu({type, onChange}: {type: string, onChange: Function}) {
    const [isOpen, setIsOpen] = useState(false);
    const [priority, setPriority] = useState<string | null>(null);
    const [state, setState] = useState<string | null>(null);

    return (
        <div className={`flex bg-white ${isOpen ? "rounded-t-md": "rounded-md"} w-full h-full items-center relative`}>
            <div className="min-w-[155px]">
                {type === "priority" ? (
                    priority === null ? (
                        <p className="px-2 py-1 text-xl text-zinc-500">Select a priority</p>
                    ) : (
                        <p className="px-2 py-1 text-xl">{priority}</p>
                    )
                ):
                    (
                        state === null ? (
                            <p className="px-2 py-1 text-xl text-zinc-500">Select a state</p>
                        ) : (
                            <p className="px-2 py-1 text-xl">{state}</p>
                        )
                    )}
            </div>
            <button
                className={`px-2 hover:bg-gray-200 cursor-pointer h-full flex items-center justify-center ${isOpen ? "rounded-tr-md": "rounded-r-md"}`}
                onClick={() => setIsOpen(!isOpen)}>
                <p>⬇</p>
            </button>
            <div className={`${isOpen ? "top-full" : "top-1/2 opacity-0 pointer-events-none"} w-full min-h-[100px] bg-white absolute left-0 rounded-b-md duration-300`}>
                <ul className="flex flex-col h-full justify-between">
                    {type === "priority" ? (
                            priorityOptions.map((option:string, index:number) => (
                                <MenuItem key={index} value={option} setPriority={(val)=>{
                                    if(type === "priority"){
                                        setPriority(val);
                                    }
                                    onChange(val);
                                }} setIsOpen={setIsOpen} />
                            ))
                    ):
                        (
                            stateOptions.map((option:string, index:number) => (
                                <MenuItem key={index} value={option} setPriority={(val)=>{
                                    if(type === "state"){
                                        setState(val);
                                    }
                                    onChange(val);
                                }} setIsOpen={setIsOpen} />
                            ))
                        )}
                </ul>
            </div>
        </div>
    )
}
export default DropdownMenu;