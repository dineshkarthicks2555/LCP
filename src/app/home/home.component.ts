import { OnInit, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Accounts } from '../accounts';
import { AccountsService } from '../accounts.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'type', 'balance', 'action'];

  dataSource = new MatTableDataSource<Accounts>();

  accounts: Accounts = {
    id: 0,
    name: '',
    type: '',
    balance: 0
  };
  isEditMode = false;
  editId = 0;
  totalBalance = 0;

  constructor(private accountService: AccountsService) {}

  ngOnInit(): void {
    this.getAccounts();
  }

  // GET ALL
  getAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.calculateTotal(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // TOTAL BALANCE
  calculateTotal(data: Accounts[]) {
    this.totalBalance = data.reduce(
      (sum, item) => sum + Number(item.balance),
      0,
    );
  }

  // ADD ACCOUNT
  addAccount() {
    this.accountService.addAccount(this.accounts).subscribe({
      next: () => {
        this.getAccounts();

        this.clearForm();
      },
    });
  }

  // EDIT
  editAccount(data: Accounts) {
    this.isEditMode = true;

    this.editId = data.id;

    this.accounts = { ...data };
  }

  // UPDATE
  updateAccount() {
    this.accountService.updateAccount(this.editId, this.accounts).subscribe({
      next: () => {
        this.getAccounts();

        this.clearForm();
      },
    });
  }

  // DELETE
  deleteAccount(id: number) {
    if (confirm('Delete account?')) {
      this.accountService.deleteAccount(id).subscribe({
        next: () => {
          this.getAccounts();
        },
      });
    }
  }

  // SEARCH
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // CLEAR
  clearForm() {
    this.accounts = {
      id: 0,
      name: '',
      type: '',
      balance: 0,
    };

    this.isEditMode = false;
  }
}
