import React, {useState, useEffect} from 'react';
import './App.css';
import SearchFilterControls from "./components/SearchFilterControls/SearchFilterControls";
import NewToDo from "./components/ModalNewToDo/NewToDo";
import TaskTable from "./components/TaskTable/TaskTable";
import TaskProvider from "./context/taskContext";

type Task = {
    id: number;
    title: string;
    dueDate: string;
    completed: boolean;
    doneDate: string;
    priority: string;
    createDate: string;
}

function App() {

  return (
        <div className="flex flex-col justify-start items-center px-5 h-screen bg-zinc-300">
            <TaskProvider>
                <SearchFilterControls />
                <NewToDo />
                <TaskTable />
            </TaskProvider>
        </div>
  );
}

export default App;
