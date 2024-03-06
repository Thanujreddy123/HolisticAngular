import { Component, OnInit, Output } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ITask } from '../../../interface/task.interface';
import { MatDialog } from '@angular/material/dialog';
import { ShowComponent } from '../show/show.component';
//import { EventEmitter } from 'stream';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Output() refreshEmitter = new EventEmitter<boolean>();

  tasks: ITask[] | undefined;
  


 
  constructor(private taskservice: TaskService,public dialog:MatDialog) {

  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskservice.getTaskList().subscribe(
      (data: ITask[]) => {
        this.tasks = data;
        //console.log(data);
      },
      error => {
        console.error(error);
      }
    );
  }
  onOpenDialog(task:ITask){
    console.log(task);
    const dialogRef = this.dialog.open(ShowComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getTasks();
     this.refreshEmitter.emit(true);
    });
  }
  
}
