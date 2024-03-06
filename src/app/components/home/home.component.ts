import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { ApexNonAxisChartSeries } from 'ngx-apexcharts';
import { ITask, ITypePercentage} from '../../interface/task.interface';
import { TaskService } from '../../services/task.service';
import { error } from 'console';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
/*export class HomeComponent implements OnInit{
  

// your-component.component.ts

chartOptions: any = {
  series: [30, 40, 35, 50, 49, 60, 70, 91, 125],
  chart: { type: 'pie', height: 350 }
};*/

export class HomeComponent implements OnInit {
  tasks: ITask[] | undefined;
  chartOptions: any = {
    series: [],
    chart: { type: 'pie', height: 350 },
    Labels:[]
  };
public typeData:Array<ITypePercentage>=[];
n: any;
  constructor(private taskservice: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
    this.getTypePercentage(); 
  }

  getTasks() {
    this.taskservice.getTaskList().subscribe(
      (data: ITask[]) => {
        this.tasks = data;
        console.log(data);
      },
      error => {
        console.error(error);
      }
    );
  }
  getTypePercentage() {
    this.chartOptions.series=[];
    this.taskservice.getTypePercentage().subscribe(
      (data) => {
        console.log(data);
        this.typeData=data;
        

        // Update chartOptions.series with the flattened data
        this.chartOptions.series = data.flatMap((type: ITypePercentage) => type.count);
        this.chartOptions.Labels = data.flatMap((type: ITypePercentage) => type.type);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  refreshEmitter(){
    this.getTypePercentage();
  }
}



  
