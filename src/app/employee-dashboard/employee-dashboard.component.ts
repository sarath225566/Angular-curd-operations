import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee_model } from '../employee_model.ts';
import { ApiService } from '../serice/api.service';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {

  empData:Employee_model=new Employee_model();
  employeeForm!:FormGroup;
  emplyoeeDetails:any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formBuilder:FormBuilder,
    public api:ApiService){

  }
  ngOnInit(){
    this.employeeForm=this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobileNumber:[''],
      salary:['']
    })
    this.getEmployeeDetails()
  }
  addDetails(){
    this.empData.firstName=this.employeeForm.value.firstName;
    this.empData.lastName=this.employeeForm.value.lastName;
    this.empData.email=this.employeeForm.value.email;
    this.empData.mobileNumber=this.employeeForm.value.mobileNumber;
    this.empData.salary=this.employeeForm.value.salary;
    this.api.postEmployee(this.empData).subscribe(res=>{
      console.log(res);
      alert("Employee Added Successflly");
      let ref=document.getElementById("cancel");
      ref?.click();
      this.employeeForm.reset();
      this.getEmployeeDetails();
    },
    err=>{
      alert("Something Went To Wrong");
    }
    )
  }
  getEmployeeDetails(){
    this.api.getEmployee().subscribe(res=>{
      this.emplyoeeDetails=res;
    })
  }

  deleteEmployeeDetails(id:number){
    this.api.deleteEmployee(id).subscribe(res=>{
      alert("Employee Deleted Successfully");
      this.getEmployeeDetails();
    })

  }
  reset(){
    this.employeeForm.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  onEdit(row:any){
    this.empData.id=row.id;
    this.showAdd=false;
    this.showUpdate=true;
    this.employeeForm.controls['firstName'].setValue(row.firstName);
    this.employeeForm.controls['lastName'].setValue(row.lastName);
    this.employeeForm.controls['email'].setValue(row.email);
    this.employeeForm.controls['mobileNumber'].setValue(row.mobileNumber);
    this.employeeForm.controls['salary'].setValue(row.salary);
  }
  updateEmployeeDetails(){
    this.empData.firstName=this.employeeForm.value.firstName;
    this.empData.lastName=this.employeeForm.value.lastName;
    this.empData.email=this.employeeForm.value.email;
    this.empData.mobileNumber=this.employeeForm.value.mobileNumber;
    this.empData.salary=this.employeeForm.value.salary;

    this.api.updateEmployee(this.empData,this.empData.id).subscribe(res=>{
      alert("Employee updated Successfully");
      let ref=document.getElementById("cancel");
      ref?.click();
      this.employeeForm.reset();
      this.getEmployeeDetails();
    })
  }

}
