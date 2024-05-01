import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { IExpense } from '../../../interface/expense.interface';
import { TaskService } from '../../../services/task.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-expenselist',
  templateUrl: './expenselist.component.html',
  styleUrl: './expenselist.component.css'
})

export class ExpenselistComponent {

  expenses: IExpense[] = [];
  
  
  
  total6MonthsExpense: Observable<any[]> | undefined;
  constructor(private taskService: TaskService, private router: Router) { }

 
  
  ngOnInit(): void {
    this.total6MonthsExpense = this.taskService.getTotal6MonthsExpense();
    this.taskService.getLastMonthExpenses().subscribe(
      (expenses: IExpense[]) => {
        this.expenses = expenses;
      },
      (error) => {
        console.error('Error fetching last month expenses:', error);
      }
    );
  }

  addExpense(): void {
    this.router.navigate(['/expense/add']); // Navigate to the "add expense" route
  }
  
}


