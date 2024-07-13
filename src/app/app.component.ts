import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Transaction {
  id?: number; // Adiciona o id como opcional
  description: string;
  value: number;
  type: 'entrada' | 'saida';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  transactions: Transaction[] = [];
  totalEntries: number = 0;
  totalExits: number = 0;
  description: string = '';
  value: number = 0;
  transactionType: 'entrada' | 'saida' = 'entrada';
  currentMonth: string = 'Julho'; 
  months: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  currentMonthIndex: number = 6; 

  constructor(private http: HttpClient) {
    this.loadTransactions();
  }

  previousMonth() {
    this.currentMonthIndex = (this.currentMonthIndex - 1 + 12) % 12;
    this.currentMonth = this.months[this.currentMonthIndex];
  }

  nextMonth() {
    this.currentMonthIndex = (this.currentMonthIndex + 1) % 12;
    this.currentMonth = this.months[this.currentMonthIndex];
  }

  addTransaction() {
    const newTransaction: Transaction = { description: this.description, value: this.value, type: this.transactionType };

    this.http.post<Transaction>('http://localhost:3000/transactions', newTransaction)
      .subscribe(() => {
        this.loadTransactions();
        this.clearForm();
      });
  }

  loadTransactions() {
    this.http.get<Transaction[]>('http://localhost:3000/transactions')
      .subscribe(transactions => {
        this.transactions = transactions;
        this.updateTotals();
      });
  }

  updateTotals() {
    this.totalEntries = this.transactions
      .filter(t => t.type === 'entrada')
      .reduce((sum, t) => sum + t.value, 0);
      
    this.totalExits = this.transactions
      .filter(t => t.type === 'saida')
      .reduce((sum, t) => sum + t.value, 0);
  }

  deleteTransaction(transaction: Transaction) {
    this.http.delete(`http://localhost:3000/transactions/${transaction.id}`).subscribe(() => {
      this.loadTransactions();
    });
  }

  editTransaction(transaction: Transaction) {
    this.description = transaction.description;
    this.value = transaction.value;
    this.transactionType = transaction.type;
    this.deleteTransaction(transaction); 
  }

  clearForm() {
    this.description = '';
    this.value = 0;
    this.transactionType = 'entrada'; 
  }
}
