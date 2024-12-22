import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-record-edit-page',
  templateUrl: './record-edit-page.component.html',
  styleUrls: ['./record-edit-page.component.css']
})
export class RecordEditPageComponent implements OnInit {
  RecordPK: string | null = '';
  Project_PK: string | null = '';
  Project_Name: string | null = '';
  public Tracker: TT_TRACKER | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.RecordPK = params['RecordPK'];
      this.Project_PK = params['Project_PK'];
      this.Project_Name = params['project_Name'];
    });

    this.http.get<TT_TRACKER>(`https://localhost:7199/GetTrackerRecord?TrackerRecordPK=${this.RecordPK}`)
      .subscribe(
        result => {
          console.log("API Response:", result);
          this.Tracker = result;
          console.log("Tracker assigned:", this.Tracker);
          console.log("Tracker assigned:", this.Tracker.tT_PK);
        },
        error => {
          console.error("Error fetching tracker record:", error);
        }
      );

  }

}

interface TT_TRACKER {
  tT_PK: number;
  tT_NW_FK: number;
  tT_DPIRFC: string;
  tT_UPRN: string;
  tT_PRIORITY_ORDER: string;
  tT_STATUS: number;
  tT_NOTES: string;
  tT_HOUSE_NUMBER: string;
  tT_STREET: string;
  tT_COMMENTS: string;
  tT_LINTEL_WORKS_REQUIRED: boolean;
  tT_ACCESS_EQUIPMENT_REQUIRED: number;
  tT_PROPERTY_CONSTRUCTION_TYPE: number;
  tT_SURVEY_IDENTIFIED_COMMENTS: string;
  tT_CALL_OFF_NUMBER: string;
  tT_CALLED_OFF_DATE: Date;
  tT_DELIVERY_DATE: Date;
  tT_DELIVERY_POINT: number;
  tT_DELIVERY_NOTE_RECEIVED: boolean;
  tT_SCHEDULED_FITTING_DATE: Date;
  tT_AMORPMAPPOINTMENT: number;
  tT_ROUTE_MARCH_ORDER: string;
  tT_INSTALL_ACCESS_ATTEMPTS: number;
  tT_PRIMARY_INSTALLER: number;
  tT_SECONDARY_INSTALLER: number;
  tT_INSTALLATION_RELATED_COMMENTS: string;
  tT_INSTALLATION_SHEET_RECEIVED: boolean;
  tT_VARIATION_DETAILS: string;
  tT_VARIATION_ORDER_NUMBER: string;
  tT_DATE_HANDED_OVER: Date;
  tT_INSPECTED_BY: string;
  tT_INSTALL_WAGES_APPLIED_FOR: string;
  tT_LEASE_HOLDER_HOUSE_NUMBER: string;
  tT_LEASE_HOLDER_STREET: string;
  leasE_HOLDER_TOWN: string;
  leasE_HOLDER_COUNTRY: string;
  leasE_HOLDER_POSTCODE: string;
  leasE_HOLDER_NAME: string;
  leasE_HOLDER_PRIMARY_PHONE: string;
  leasE_HOLDER_SECONDARY_PHONE: string;
  leasE_HOLDER_EMAIL: string;
}
