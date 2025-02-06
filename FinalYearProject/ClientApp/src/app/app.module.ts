import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProjectRecordsPageComponent } from './project-records-page/project-records-page.component';
import { RecordEditPageComponent } from './record-edit-page/record-edit-page.component';
import { Sidebar } from './Side-bar/Side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ProjectRecordsPageComponent,
    RecordEditPageComponent,
    Sidebar
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'project-records-page', component: ProjectRecordsPageComponent },
      { path: 'record-edit-page', component: RecordEditPageComponent },
      { path: 'Side-bar', component: Sidebar },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
