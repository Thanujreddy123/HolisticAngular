 interface ITask{
    id?:string,
    title:string,
    type:string,
    dueDate:Date,
    description:string;

}

interface ITypePercentage{
    type:string;
    count:string;
}

interface ITaskTypeOption{
    type:string;
}

export {ITask,ITaskTypeOption,ITypePercentage}