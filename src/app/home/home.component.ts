import { Component, OnInit } from '@angular/core';
import { ITaskDetail } from '../Helpers/task';
import {TaskService} from '../services/task.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  TasksArray: ITaskDetail[];
  stage1TasksArray: ITaskDetail[];
  stage2TasksArray: ITaskDetail[] ;
  stage3TasksArray: ITaskDetail[];
  constructor(private taskService: TaskService) { }

  drop(event: CdkDragDrop<ITaskDetail[]>) {
    // console.log('Hi');
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const key = 'taskStatus';
      event.item.data[key] = Number(event.container.element.nativeElement.attributes.getNamedItem('data-stage').value) ;
      console.log(event.item.data);
      console.log(event.container.element.nativeElement.attributes.getNamedItem('data-stage').value);
      // console.log(event.previousContainer.data);
      // console.log(event.container.data);
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      console.log(this.stage1TasksArray);
      console.log(this.stage2TasksArray);
      console.log(this.stage3TasksArray);
    }
  }

  ngOnInit() {
    this.TasksArray = this.taskService.GetTasks();
    this.stage1TasksArray = this.TasksArray.filter(task => task.taskStatus === 1);
    this.stage2TasksArray = this.TasksArray.filter(task => task.taskStatus === 2);
    this.stage3TasksArray = this.TasksArray.filter(task => task.taskStatus === 3);
    this.taskService.taskAdded.subscribe((updatedTasks: ITaskDetail[]) =>
    {
      this.TasksArray = updatedTasks;
    })
  }

}
