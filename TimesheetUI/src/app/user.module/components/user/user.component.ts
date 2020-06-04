import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  dataSaved = false;
  userForm: any;
  allUsers: Observable<User[]>;
  userIdUpdate = null;
  public massage = null;

  constructor(private formbulider: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.userForm = this.formbulider.group({
      Name: ['', [Validators.required]],
      MobileNo: ['', [Validators.required]],
      EmailID: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      DateOfJoining: ['', [Validators.required]],
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]],
    });
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.allUsers = this.userService.getAllUser();
  }

  submitForm() {
    this.dataSaved = false;
    console.log(this.userForm);
    const user = this.userForm.value;

    this.CreateUser(user);
    this.userForm.reset();
  }

  loadUserToEdit(userId: string) {
    this.userService.getUserById(userId).subscribe(user => {
      this.massage = null;
      this.dataSaved = false;
      this.userIdUpdate = user.UserId;
      this.userForm.controls['Name'].setValue(user.Name);
      this.userForm.controls['MobileNo'].setValue(user.MobileNo);
      this.userForm.controls['DateOfJoining'].setValue(user.DateOfJoining);
      this.userForm.controls['EmailID'].setValue(user.EmailID);
      this.userForm.controls['Gender'].setValue(user.Gender);
      this.userForm.controls['Username'].setValue(user.UserName);
      this.userForm.controls['Password'].setValue(user.Password);  
      this.userForm.controls['ConfirmPassword'].setValue(user.ConfirmPassword);  
    });

  }

  CreateUser(user: User) {
    if (this.userIdUpdate == null) {
      this.userService.createUser(user).subscribe(
        () => {
          this.dataSaved = true;
          this.massage = 'Record saved Successfully';
          this.loadAllUsers();
          this.userIdUpdate = null;
          this.userForm.reset();
        }
      );
    } else {
      user.UserId = this.userIdUpdate;
      this.userService.updateUser(user).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Updated Successfully';
        this.loadAllUsers();
        this.userIdUpdate = null;
        this.userForm.reset();
      });
    }
  }

  deleteUser(userId: string) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.userService.deleteUserById(userId).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Deleted Succefully';
        this.loadAllUsers();
        this.userIdUpdate = null;
        this.userForm.reset();

      });
    }
  }

  resetForm() {
    this.userForm.reset();
    this.massage = null;
    this.dataSaved = false;
  }


}
