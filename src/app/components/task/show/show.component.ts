import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask, ITaskTypeOption } from '../../../interface/task.interface';
import { TaskService } from '../../../services/task.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { error } from 'console';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
}) 
export class ShowComponent {
  taskForm: FormGroup = new FormGroup({}); 
  typeOptions:Array<ITaskTypeOption>=[];
constructor(
  public dialogRef: MatDialogRef<ShowComponent>,
  @Inject(MAT_DIALOG_DATA) public data: ITask
,private fb:FormBuilder,private taskService:TaskService){

}
ngOnInit(): void {
  this.taskForm=this.fb.group(
    {
      title:['',Validators.required],
      dueDate:['',Validators.required],
      type:['',Validators.required],
      description:['',Validators.required],
    }
  )
 this.typeOptions= this.taskService.getTypeOptions();
 this.showtask();
}
showtask(){
  this.taskService.getTaskById(this.data.id).subscribe(
    (d:ITask)=>{
    this.taskForm.controls['title'].setValue(d.title);
    this.taskForm.controls['type'].setValue(d.type);
    this.taskForm.controls['dueDate'].setValue(new Date(d.dueDate).toISOString());
    this.taskForm.controls['description'].setValue(d.description);
  },
  (error)=>console.error(error)
  );
}
updateTask(){
  this.taskService.updateTask(this.taskForm.value,this.data.id).subscribe(
    (d)=>{
      try {
        this.dialogRef.close();
      } catch (error) {
        console.error('Error closing dialog:', error);
      }
    },error=>console.error(error));
  
}
onDeleteTask(){
  this.taskService.deleteTask(this.data.id).subscribe(
    (d)=>{
      try {
        this.dialogRef.close();
      } catch (error) {
        console.error('Error closing dialog:', error);
      }
    },error=>console.error(error));
}
}

