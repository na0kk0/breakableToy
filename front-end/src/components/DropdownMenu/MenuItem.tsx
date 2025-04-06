import React from "react";

function MenuItem({ value, setPriority, setIsOpen }: { value: string; setPriority:(value:string)=>void; setIsOpen:(value:boolean)=>void }) {
    return(
        <li className="text-xl pl-2 pt-1 hover:bg-gray-200 rounded-b-md" onClick={()=> {
            setPriority(value);
            setIsOpen(false);
        }}>{value}</li>
    )
}

export default MenuItem;