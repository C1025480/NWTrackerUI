import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-records-page',
  templateUrl: './project-records-page.component.html',
  styleUrls: ['./project-records-page.component.css']
})
export class ProjectRecordsPageComponent implements OnInit {
  projectName: string | null = '';
  projectPK: string | null = '';
  public Records: Record[] = [];
  public paginatedRecords: Record[] = [];
  public currentPage: number = 1;
  public pageSize: number = 20;
  public totalPages: number = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.projectName = params['projectName'];
      this.projectPK = params['nW_PK'];
    });

    this.http.get<{ value: Record[] }>(`https://localhost:7199/GetTrackerRecords?ProjectPk=${this.projectPK}`)
      .subscribe(result => {
        this.Records = result.value;
      this.totalPages = this.Records ? Math.ceil(this.Records.length / this.pageSize) : 0;
      this.updatePaginatedTrackerRecords();
    }, error => console.error(error));
  }

  updatePaginatedTrackerRecords() {
    if (this.Records) {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.paginatedRecords = this.Records.slice(startIndex, endIndex);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedTrackerRecords();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedTrackerRecords();
    }
  }

  DeleteRecord(TrackerRecordPK: number) {
    const url = `https://localhost:7199/DeleteTrackerRecord?TrackerRecordPK=${TrackerRecordPK}`;

    this.http.post(url, null).subscribe(
      (response) => {
        console.log('Record Deleted successfully', response);
        location.reload()
      },
      (error) => {
        console.error('Error Deleting Record', error);
      }
    );
  }

}

interface Record {
  tT_PK: number,
  tT_NW_FK: number,
  tT_UPRN: string;
  tT_STATUS: string;
  tT_HOUSE_NUMBER: string;
  tT_STREET: string;
}
