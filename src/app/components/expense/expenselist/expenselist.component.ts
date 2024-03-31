import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { IExpense } from '../../../interface/expense.interface';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-expenselist',
  templateUrl: './expenselist.component.html',
  styleUrl: './expenselist.component.css'
})

export class ExpenselistComponent {
  expenses: IExpense[] = [];
  
  total6MonthsExpense$: any;
  constructor(private taskService: TaskService) { }

 
  
  ngOnInit(): void {
    this.total6MonthsExpense$ = this.taskService.getTotal6MonthsExpense();
    this.taskService.getLastMonthExpenses().subscribe(
      (expenses: IExpense[]) => {
        this.expenses = expenses;
      },
      (error) => {
        console.error('Error fetching last month expenses:', error);
      }
    );
  }
}


