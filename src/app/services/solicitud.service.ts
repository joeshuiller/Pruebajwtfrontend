import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private registeresquest: ApiService) { }
  create(inform, id){
    const data = {
      idusers: parseInt(id),
      name: inform.tarea,
      description: inform.description,
    };
    return  this.registeresquest.POST('solicitud', data)
  }
  edituser(inform, id){
    const data = {
      name: inform.tarea,
      description: inform.description,
      state: inform.select,
    };
    return  this.registeresquest.PUT(`solicitud/${id}`, data)
  }
  getcruds(id){
    return  this.registeresquest.GET(`solicitud/${id}`)
  }
  editar(id){
    return  this.registeresquest.GET(`solicitud/edit/${id}`)
  }
  detele(id){
    return  this.registeresquest.DELETE(`solicitud/${id}`)
  }
}
