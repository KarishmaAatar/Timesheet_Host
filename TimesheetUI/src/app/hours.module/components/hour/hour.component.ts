import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hour } from '../../models/hour';
import { FormBuilder, Validators } from '@angular/forms';
import { HourService } from '../../services/hour.service';

@Component({
  selector: 'app-hour',
  templateUrl: './hour.component.html',
  styleUrls: ['./hour.component.css']
})
export class HourComponent implements OnInit {
  dataSaved = false;
  loginForm: any;
  allLogins: Observable<Hour[]>;
  loginIdUpdate = null;
  public massage = null;

  constructor(private formbulider: FormBuilder, private hourService: HourService) { }

  ngOnInit() {
    this.loginForm = this.formbulider.group({
      UserId: ['', [Validators.required]],
      SessionId: ['', [Validators.required]],
      IPAddress: ['', [Validators.required]],
      LoginAt: ['', [Validators.required]],
      LogoutAt: ['', [Validators.required]],
      LoginStatus: ['', [Validators.required]],
    });
    this.loadAllLogins();
  }

  loadAllLogins() {
    this.allLogins = this.hourService.getAllLoginDetails();
  }

  submitForm() {
    this.dataSaved = false;
    console.log(this.loginForm);
    const user = this.loginForm.value;

    this.CreateLogin(user);
    this.loginForm.reset();
  }

  loadLoginToEdit(userId: string) {
    this.hourService.getLoginDetailsById(userId).subscribe(user => {
      this.massage = null;
      this.dataSaved = false;
      this.loginIdUpdate = user.AuditId;
      this.loginForm.controls['UserId'].setValue(user.UserId);
      this.loginForm.controls['SessionId'].setValue(user.SessionId);
      this.loginForm.controls['IPAddress'].setValue(user.IPAddress);
      this.loginForm.controls['LoginAt'].setValue(user.LoginAt);
      this.loginForm.controls['LogoutAt'].setValue(user.LogoutAt);
      this.loginForm.controls['LoginStatus'].setValue(user.LoginStatus);
    });

  }

  CreateLogin(user: Hour) {
    if (this.loginIdUpdate == null) {
      this.hourService.createLogin(user).subscribe(
        () => {
          this.dataSaved = true;
          this.massage = 'Record saved Successfully';
          this.loadAllLogins();
          this.loginIdUpdate = null;
          this.loginForm.reset();
        }
      );
    } else {
      user.AuditId = this.loginIdUpdate;
      this.hourService.updateLogin(user).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Updated Successfully';
        this.loadAllLogins();
        this.loginIdUpdate = null;
        this.loginForm.reset();
      });
    }
  }

  deleteLog(userId: string) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.hourService.deleteLoginById(userId).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Deleted Succefully';
        this.loadAllLogins();
        this.loginIdUpdate = null;
        this.loginForm.reset();

      });
    }
  }

  resetForm() {
    this.loginForm.reset();
    this.massage = null;
    this.dataSaved = false;
  }

}
