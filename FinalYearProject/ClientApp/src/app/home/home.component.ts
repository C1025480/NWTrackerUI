import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public Projects: Projects[] | null = null;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit() {
    this.http.get<{ value: Projects[] }>('https://localhost:7199/GetProjects').subscribe(result => {
      this.Projects = result.value;
    }, error => console.error(error));
  }

  createProject(projectName: string) {
    const body = { ProjectName: projectName };

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
}

interface Projects {
  nW_PK: number;
  projectName: string;
}
