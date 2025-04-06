import React, {useContext, useEffect, useState} from 'react';

interface ModalProps {
    meow: boolean;
    closeMeow: () => void;
    setMeow : (value:boolean)=>void;
}

function Meow({meow, closeMeow, setMeow}: ModalProps) {
    const handleOff = ()=>{
        setMeow(false);
    }
    return(
        <p className={`text-yellow-600 font-semibold transform transition-transform duration-500 ease-in-out ${meow ? 'translate-y-0 opacity-100 visible' : `translate-y-4 opacity-0 invisible`}`} onTransitionEnd={handleOff}>Meow</p>
    )
}

export default Meow;