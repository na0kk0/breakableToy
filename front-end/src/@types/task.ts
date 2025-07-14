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
    totalPages: number;
    averageTime: string;
    averageTimePriority: {low:string, med:string, hi:string};
    setTasks: (tasks: Task[]) => void;
    getIds: () => number[];
    saveTask: (todo:Task) => void;
    sortPriorityUp: (page:number)=>void;
    sortPriorityDown: (page:number)=>void;
    sortDueDateUp: (page:number)=>void;
    sortDueDateDown: (page:number)=>void;
    editTask: (task:Task, page:number) => void;
    deleteTask: (id:number, page:number) => void;
    searchTask: (title:string, priority:string, state:string) => void;
    completeTask: (id:number, completed:boolean) => Promise<void>;
    checkPage: (allDone:boolean, setAllDone:(value:boolean)=>void, page:number) => void;
    fetchTasks: (page:number, size?:number) => void;
    fetchMetrics: () => void;
};