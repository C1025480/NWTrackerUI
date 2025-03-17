import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public Projects: Projects[] | null = null;
  public paginatedProjects: Projects[] = [];
  public currentPage: number = 1;
  public pageSize: number = 10;
  public totalPages: number = 0;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit() {
    this.http.get<{ value: Projects[] }>('https://localhost:7199/GetProjects').subscribe(result => {
      this.Projects = result.value;
      this.totalPages = this.Projects ? Math.ceil(this.Projects.length / this.pageSize) : 0;
      this.updatePaginatedProjects();
    }, error => console.error(error));

    sessionStorage.setItem("SelectedProjectName", "NA");
    sessionStorage.setItem("SelectedProjectPK", "0");
  }

  updatePaginatedProjects() {
    if (this.Projects) {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.paginatedProjects = this.Projects.slice(startIndex, endIndex);
    }
  }

  DeleteRecord(project: Projects) {
    const body = {
      nW_PK: project.nW_PK,
      projectName: project.projectName
    };

    console.log(JSON.stringify(body));

    this.http.post('https://localhost:7199/DeleteProject', body, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(
      response => {
        console.log('Project Deleted successfully', response);
        location.reload();
      },
      error => console.log('Error Deleting project', error)
    );
  }

  createProject(projectName: string) {
    const body = { projectName };

    this.http.post('https://localhost:7199/NewProject', body, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(
      response => {
        console.log('Project created successfully', response);
        location.reload();
      },
      error => console.log('Error creating project', error)
    );
  }

  onSubmit(projectName: string) {
    console.log(projectName);
    this.createProject(projectName);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedProjects();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProjects();
    }
  }
}

interface Projects {
  nW_PK: number;
  projectName: string;
}
