import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) { }
  postEmployee(data:any){
    return this.http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res=>{
      return res;
    })))
  }

  getEmployee(){
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res=>{
      return res;
    })))
  }

  updateEmployee(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res=>{
      return res;
    })))
  }

  deleteEmployee(id:number): Observable<any>{
    return this.http.delete("http://localhost:3000/posts/"+id)
    .pipe(map((res=>{
      return res;
    })))
  }
  // deleteEmployee(id:number): Observable<any>{
  //   return this.http.delete(`${this.baseUrl}/${id}`)
  //   .pipe(map((res=>{
  //     return res;
  //   })))
  // }
}
