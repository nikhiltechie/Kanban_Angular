import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TaskService} from '../services/task.service';
import { ITaskDetail } from '../Helpers/task';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  addTaskForm: FormGroup;

taskStatusOptions: any[] = ['1', '2', '3'];
newTask = {} as ITaskDetail;
taskToEdit = {} as ITaskDetail;
changedTask = {} as ITaskDetail;
paramtaskId: string;
  constructor(
      private taskService: TaskService
    , private router: Router
    , private activatedRoute: ActivatedRoute
    , private formBuilder: FormBuilder ) {}

  ngOnInit() {
    this.addTaskForm = this.formBuilder.group({
      taskTitle : ['', Validators.required],
      taskDescription : ['', Validators.required],
      taskStatus : ['', Validators.required],
      taskId: ''
    });
    this.paramtaskId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.paramtaskId) {
      this.taskToEdit = this.taskService.GetTaskById(Number(this.paramtaskId));
      this.addTaskForm.patchValue({
        taskTitle : this.taskToEdit.taskTitle,
      taskDescription : this.taskToEdit.taskDescription,
      taskStatus : String (this.taskToEdit.taskStatus),
      taskId: this.paramtaskId
      });
      // console.log(this.taskToEdit);
    }
  }
  AddTask() {
    this.newTask.taskTitle = this.addTaskForm.get('taskTitle').value;
    this.newTask.taskDescription = this.addTaskForm.get('taskDescription').value;
    this.newTask.taskStatus = Number(this.addTaskForm.get('taskStatus').value);
    this.taskService.AddTask(this.newTask);
    this.router.navigate(['']);
    console.log(this.taskService.GetTasks());
  }
  SaveTask() {
    this.changedTask.taskTitle = this.addTaskForm.get('taskTitle').value;
    this.changedTask.taskDescription = this.addTaskForm.get('taskDescription').value;
    this.changedTask.taskStatus = Number(this.addTaskForm.get('taskStatus').value);
    this.changedTask.taskId = Number(this.paramtaskId);
    this.taskService.SaveTask(this.changedTask);
    this.router.navigate(['']);
  }

}
