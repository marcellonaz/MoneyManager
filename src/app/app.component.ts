import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface Transaction {
  id?: number;
  description: string;
  value: number;
  type: 'entrada' | 'saida';
}

interface ExchangeRate {
  buy: number;
  sell: number;
  variation: number;
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

  exchangeRate: ExchangeRate = {
    buy: 0,
    sell: 0,
    variation: 0
  };

  previousRate: number = 5.40; 
  currentRate: number = 0; 
  variation: number = 0; 
  constructor(private http: HttpClient) {
    this.fetchExchangeRate(); 
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
    this.transactions.push(newTransaction);
    
    if (this.transactionType === 'entrada') {
      this.totalEntries += this.value;
    } else {
      this.totalExits += this.value;
    }
    
    this.updateTotals();
    this.clearForm();
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
    this.transactions = this.transactions.filter(t => t !== transaction);
    this.updateTotals();
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

  fetchExchangeRate() {
    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';
    this.http.get<any>(apiUrl)
      .subscribe(data => {
        this.currentRate = data.rates.BRL; 
        this.exchangeRate.buy = this.currentRate; 
        this.exchangeRate.sell = this.currentRate; 
        if (this.previousRate > 0) {
          this.variation = ((this.currentRate - this.previousRate) / this.previousRate) * 100;
          this.exchangeRate.variation = this.variation; 
        } else {
          this.exchangeRate.variation = 0; 
        }

        console.log('Taxa Atual:', this.currentRate);
        console.log('Variação Percentual:', this.variation);
        
        
        this.previousRate = this.currentRate;
      }, error => {
        console.error('Erro ao buscar a cotação:', error);
      });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }
}
