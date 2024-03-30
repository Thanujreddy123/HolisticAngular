import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expenselist',
  templateUrl: './expenselist.component.html',
  styleUrl: './expenselist.component.css'
})

export class ExpenselistComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  expensesData = [
    { month: 'Jan', amount: 500 },
    { month: 'Feb', amount: 600 },
    { month: 'Mar', amount: 700 },
    // Add data for other months
  ];

  calculateHeight(expense: any): number {
    // Calculate height based on expense amount
    // You can adjust this calculation based on your preference
    return (expense.amount / this.getMaxExpense()) * 100;
  }

  getMaxExpense(): number {
    // Get the maximum expense amount to scale the bars
    return Math.max(...this.expensesData.map(expense => expense.amount));
  }
}