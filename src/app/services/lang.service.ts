import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class LangService {

  constructor(private registeresquest: ApiService) { }
  create(inform){
    const data = {
      name: inform.name,
      surnames: inform.surnames,
      telephone: inform.telephono,
      direction:inform.direction,
      email:inform.correo,
      password:inform.password,
    };
    return  this.registeresquest.POST('register', data);
  }
  edituser(inform, id){
    const data = {
      name: inform.name,
      surnames: inform.surnames,
      telephone: inform.telephono,
      direction:inform.direction,
      email:inform.correo,
    };
    return this.registeresquest.PUT(`edit/${id}`, data)
  }
  getcruds(id){
    return this.registeresquest.GET(`users/${id}`)
  }
  delete(id){
    return this.registeresquest.DELETE(`delete/${id}`)
  }
  login(email, password){
    let data = {
      email:email,
      password:password
    }
    return  this.registeresquest.POST(`login`, data)
  }
  logout(){
    return  this.registeresquest.GET(`logout`)
  }
  
}
