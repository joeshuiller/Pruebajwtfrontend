import { Component, OnInit } from '@angular/core';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
export interface PeriodicElement {
  name: string;
  id: number;
  idusers:number;
  state:number;
  description: number;
  created_at:Date;
  updated_at:Date;
}
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'decription','fecha', 'actualizacion' , 'state','Accion'];
  dataSource:any;
  constructor(
    private router: Router,
    private _http:SolicitudService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.gettareas(localStorage.getItem('id'))
  }
  gettareas(id){
    try {
      this.alert.loading();
      const resulta = this._http.getcruds(id).then((item:PeriodicElement)=>{
        if (item) {
          this.dataSource = item;
          console.log(item);
          this.alert.messagefin();
          
        } else {
          this.alert.error("Error", "En la conexión del servidor");
        }
      });
    } catch (err) {
      this.alert.error("Error", "Usuario o contraseña invalida");
    }
  }
  editar(id){
    this.router.navigate(['/home/edit/'+id]);
  }
  detele(id){
    try {
      this.alert.loading();
      const resulta = this._http.detele(id).then((item:any)=>{
        if (item) {
          console.log(item);
          this.alert.messagefin();
          this.gettareas(localStorage.getItem('id'));
        } else {
          this.alert.error("Error", "En la conexión del servidor");
        }
      });
    } catch (err) {
      this.alert.error("Error", "Error al conectar al servidor");
    }
  }
}
