import { ITaskDetail } from '../Helpers/task';
import { EventEmitter, Output } from '@angular/core';

export class TaskService{
    @Output()
    taskAdded = new EventEmitter<ITaskDetail[]>();
    TasksArray: ITaskDetail[] = [
        { taskId: '1',
            taskTitle: 'Dog',
          taskDescription: 'Bulldog',
          taskStatus: 1
        },
        { taskId: '2',
            taskTitle: 'Goat',
          taskDescription: 'Mountain Goat',
          taskStatus: 2
        },
        { taskId: '3',
            taskTitle: 'Bird',
          taskDescription: 'Humming Bird',
          taskStatus: 3
        }
      ];
    GetTasks()
    {
        return this.TasksArray;
    }
    AddTask(newTask: ITaskDetail)
    {
        this.TasksArray.push(newTask);
        this.taskAdded.emit(this.TasksArray);
    }
   GetTaskById(TaskId: string): ITaskDetail
    {
        // console.log(TaskId);
        // console.log(this.TasksArray.filter(task => task.taskId === TaskId));
        return this.TasksArray.filter(task => task.taskId === TaskId)[0];
    }
}