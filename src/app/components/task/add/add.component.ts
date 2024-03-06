import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { ITaskTypeOption } from '../../../interface/task.interface';
import { error } from 'console';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit{
  taskForm: FormGroup = new FormGroup({}); 
  typeOptions:Array<ITaskTypeOption>=[];
constructor(private fb:FormBuilder,private taskService:TaskService,private router:Router){

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
}
addTask(){
  this.taskService.postTask(this.taskForm.value).subscribe(
    (d)=>{
      console.log(d);
    this.router.navigateByUrl("/");
    },
    (error)=>{
      console.error(error);
    }
    );
}
}
