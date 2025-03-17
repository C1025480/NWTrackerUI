import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProjectRecordsPageComponent } from './project-records-page/project-records-page.component';
import { RecordEditPageComponent } from './record-edit-page/record-edit-page.component';
import { Sidebar } from './Side-bar/Side-bar.component';
import { ProjectManagement } from './Project-Management/Project-Management.component';
import { Settings } from './Settings/Settings.component';
import { Inbox } from './Inbox/Inbox.component';
import { FinancialSummary } from './Financial-Summary/Financial-Summary.component';
import { DataCollection } from './Data-Collection/Data-Collection.component';
import { Installs } from './Installs/Installs.component';
import { ProjectGantt } from './Project-Gantt/Project-Gantt.component';
import { RecordImport } from './Record-Import/Record-Import.component';
import { Report } from './Report/Report.component';
import { Surveys } from './Surveys/Surveys.component';
import { Login } from './Login/Login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchDataComponent,
    ProjectRecordsPageComponent,
    RecordEditPageComponent,
    Sidebar,
    ProjectManagement,
    Settings,
    Inbox,
    FinancialSummary,
    DataCollection,
    Installs,
    ProjectGantt,
    RecordImport,
    Report,
    Surveys,
    Login
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: Login, pathMatch: 'full' },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'project-records-page', component: ProjectRecordsPageComponent },
      { path: 'record-edit-page', component: RecordEditPageComponent },
      { path: 'Side-bar', component: Sidebar },
      { path: 'Project-Management', component: ProjectManagement },
      { path: 'Settings', component: Settings },
      { path: 'Inbox', component: Inbox },
      { path: 'Financial-Summary', component: FinancialSummary },
      { path: 'Data-Collection', component: DataCollection },
      { path: 'Installs', component: Installs },
      { path: 'Project-Gantt', component: ProjectGantt },
      { path: 'Record-Import', component: RecordImport },
      { path: 'Report', component: Report },
      { path: 'Surveys', component: Surveys },
      { path: 'Login', component: Login },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
