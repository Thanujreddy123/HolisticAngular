import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask, ITaskTypeOption, ITypePercentage } from '../interface/task.interface';
import { map, tap } from 'rxjs/operators';
import {IFile} from '../interface/files.interface';
import { IExpense } from '../interface/expense.interface';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  http: any;
 

  constructor(private httpclient: HttpClient) { }
  getTotal6MonthsExpense(): Observable<any[]> {
    return this.httpclient.get<any[]>('http://localhost:8080/expense/getTotal6months');
  }


  downloadFile(id: number): Observable<Blob> {
    const headers = new HttpHeaders().set('Accept', 'application/octet-stream');
    return this.httpclient.get(`http://localhost:8080/api/files/download/${id}`, {
      responseType: 'blob',
      headers: headers
    });
  }
  getFileContent(fileId: number): Observable<Blob> {
    return this.httpclient.get(`http://localhost:8080/api/files/download/${fileId}`, { responseType: 'blob' });
  }

  //getFileContent(fileId: number): Observable<any> {
    //return this.httpclient.get(`http://localhost:8080/api/files/download/${fileId}`, { responseType: 'text' });
//}
deleteFile(fileId: number): Observable<any> {
  return this.httpclient.delete(`http://localhost:8080/api/files/delete/${fileId}`);
}


  getFiles(): Observable<IFile[]> {
    return this.httpclient.get<IFile[]>('http://localhost:8080/api/files/list');
  }

  uploadFile(formData: FormData): Observable<any> {
    return this.httpclient.post('http://localhost:8080/api/files/upload', formData);
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

  getLastMonthExpenses(): Observable<IExpense[]> {
    // Call your backend API to retrieve last month's expenses
    // You may need to adjust the API endpoint based on your backend implementation
    return this.httpclient.get<IExpense[]>('http://localhost:8080/expense/last-month');
  }

  
}
