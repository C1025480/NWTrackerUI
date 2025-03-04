import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'Record-Import',
  templateUrl: './Record-Import.component.html',
  styleUrls: ['./Record-Import.component.css']
})
export class RecordImport {

  // Pagination variables
  currentPage: number = 1;
  recordsPerPage: number = 10;
  totalPages: number = 1;
  allData: any[] = [];

  downloadExcel(): void {
    const link = document.createElement('a');
    link.href = 'assets/Record-Import-Template.xlsx';
    link.download = 'Record-Import-Template.xlsx';
    link.click();
  }

  handleFile(): void {
    const fileInput = document.getElementById('excel-file') as HTMLInputElement;

    if (fileInput && fileInput.files) {
      const file = fileInput.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target && event.target.result) {
            const data = new Uint8Array(event.target.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            this.allData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            this.totalPages = Math.ceil(this.allData.length / this.recordsPerPage);

            this.showPage(this.currentPage);
          }
        };

        reader.readAsArrayBuffer(file);
      }
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('excel-file') as HTMLInputElement;
    fileInput?.click();
  }

  showPage(page: number): void {
    const startIndex = (page - 1) * this.recordsPerPage;
    const endIndex = startIndex + this.recordsPerPage;
    const pageData = this.allData.slice(startIndex, endIndex);

    this.showFirst4Columns(pageData);
  }

  showFirst4Columns(data: any[]): void {
    const tableContainer = document.getElementById('table-container');

    if (tableContainer) {
      tableContainer.innerHTML = '';

      const table = document.createElement('table');

      const headerRow = document.createElement('tr');
      if (data.length > 0) {
        data[0].slice(0, 4).forEach((cell: any) => {
          const th = document.createElement('th');
          th.textContent = cell;
          headerRow.appendChild(th);
        });
        table.appendChild(headerRow);
      }

      data.forEach(row => {
        const tr = document.createElement('tr');
        row.slice(0, 4).forEach((cell: any) => {
          const td = document.createElement('td');
          td.textContent = cell;
          tr.appendChild(td);
        });
        table.appendChild(tr);
      });

      tableContainer.appendChild(table);
    }
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.showPage(page);
  }
}
