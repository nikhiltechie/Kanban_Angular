import { Component, OnInit, Input } from '@angular/core';
import {ITaskDetail} from '../Helpers/task';

@Component({
  selector: 'app-taskcard',
  templateUrl: './taskcard.component.html',
  styleUrls: ['./taskcard.component.css']
})
export class TaskcardComponent implements OnInit {
 
  @Input()
  taskCardInfo: ITaskDetail;

  constructor() {
 }

ngOnInit() {
  
}

}
