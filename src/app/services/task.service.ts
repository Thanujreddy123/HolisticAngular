import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask, ITaskTypeOption, ITypePercentage } from '../interface/task.interface';
import { map } from 'rxjs/operators';
import {IFile} from '../interface/files.interface';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpclient: HttpClient) { }

  getFiles(): Observable<IFile[]> {
    return this.httpclient.get<IFile[]>('http://localhost:8080/api/files');
  }

  getTaskList(): Observable<ITask[]> {
    return this.httpclient.get<ITask[]>('http://localhost:8080/api/v2/task');
  }

  postTask(task: ITask): Observable<ITask> {
    return this.httpclient.post<ITask>('http://localhost:8080/api/v2/post', task);
  }

  updateTask(task: ITask,id:string|undefined): Observable<ITask> {
    return this.httpclient.put<ITask>(`http://localhost:8080/api/v2/task/${id}`, task);
  }

  getTaskById(id: string | undefined):Observable<ITask> {
    return this.httpclient.get<ITask>(`http://localhost:8080/api/v2/task/${id}`);
  } 
  
  deleteTask(id: string | undefined): Observable<ITask> {
    console.log(id);
    return this.httpclient.delete<ITask>(`http://localhost:8080/api/v2/task/${id}`);
  }
  
 
  getTypePercentage():Observable<Array<ITypePercentage>>{
    return this.httpclient.get<Array<ITypePercentage>>(`http://localhost:8080/api/v2/task/vData/percentcounttype`);   
  }
  
  
  getTypeOptions():Array<ITaskTypeOption>{
    return [{type:'Todo'},{type:'done'},{type:'pending'}];
  }
}
