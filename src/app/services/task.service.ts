import { ITaskDetail } from '../Helpers/task';
import { EventEmitter, Output } from '@angular/core';

export class TaskService{
  tasktoEdit = {} as ITaskDetail;
    @Output()
    taskAdded = new EventEmitter<ITaskDetail[]>();
    TasksArray: ITaskDetail[] = [
        { taskId: 1,
            taskTitle: 'UI Design',
          taskDescription: 'Design the UI',
          taskStatus: 1
        },
        { taskId: 2,
            taskTitle: 'UI style',
          taskDescription: 'UI styling',
          taskStatus: 2
        },
        { taskId: 3,
            taskTitle: 'API',
          taskDescription: 'Api Development',
          taskStatus: 3
        }
      ];
    GetTasks()
    {
        return this.TasksArray;
    }
    AddTask(newTask: ITaskDetail)
    {
        newTask.taskId = Math.max(...this.TasksArray.map(t => t.taskId)) + 1 ;
        this.TasksArray.push(newTask);
        // console.log(this.TasksArray);
        this.taskAdded.emit(this.TasksArray);
    }
   GetTaskById(TaskId: number): ITaskDetail
    {
        // console.log(TaskId);
        // console.log(this.TasksArray.filter(task => task.taskId === TaskId));
        return this.TasksArray.filter(task => task.taskId === TaskId)[0];
    }
    SaveTask(editTask: ITaskDetail)
    {
        this.TasksArray.filter(task => task.taskId === editTask.taskId)[0].taskStatus = editTask.taskStatus;
        this.TasksArray.filter(task => task.taskId === editTask.taskId)[0].taskDescription = editTask.taskDescription;
        this.TasksArray.filter(task => task.taskId === editTask.taskId)[0].taskTitle = editTask.taskTitle;
        this.taskAdded.emit(this.TasksArray);
    }
}