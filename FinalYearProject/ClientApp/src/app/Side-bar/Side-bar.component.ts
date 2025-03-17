import { Component } from '@angular/core';

@Component({
  selector: 'Side-bar',
  templateUrl: './Side-bar.component.html',
  styleUrls: ['./Side-bar.component.css']
})
export class Sidebar {
  public ProjectName: string = "Not Selected";
  public ProjectPK: string = "0";

  ngOnInit() {
    const ProjectName = sessionStorage.getItem("SelectedProjectName");
    this.ProjectName = ProjectName ? ProjectName : "Not Selected";
    const ProjectPK = sessionStorage.getItem("SelectedProjectPK");
    this.ProjectPK = ProjectPK ? ProjectPK : "0";
  }
}

interface Projects {
  nW_PK: number;
  projectName: string;
}
