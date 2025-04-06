export interface Task {
    id: number;
    title: string;
    dueDate: string;
    completed: boolean;
    doneDate: string;
    priority: string;
    createDate: string;
}
export type TasksContextType = {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    getIds: () => number[];
    saveTask: (todo:Task) => void;
    sortPriorityUp: ()=>void;
    sortPriorityDown: ()=>void;
    sortDueDateUp: ()=>void;
    sortDueDateDown: ()=>void;
    editTask: (task:Task) => void;
    deleteTask: (id:number) => void;
    searchTask: (title:string, priority:string, state:string) => void;
    getTasks: ()=>void;
    completeTask: (id:number, completed:boolean) => void;
    checkPage: (allDone:boolean, setAllDone:(value:boolean)=>void, page:number) => void;
};