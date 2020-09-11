import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
@Component({
  selector: 'app-formnew',
  templateUrl: './formnew.component.html',
  styleUrls: ['./formnew.component.scss']
})
export class FormnewComponent implements OnInit {

  form: FormGroup;
  valdation_messages = {
    correo: [
      {type: 'requerid', message: 'El Correo es requerido'},
      {type: 'pattern', message: 'ojo! este no es un Correo válido'}
    ],
    password: [
      {type: 'requerid', message: 'El Nombre es requerido'},
      {type: 'minLength', message: 'el Nombre debe contener minimo 5 caracteres'}
    ],
  };
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private _http:SolicitudService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.inicial();
  }
  inicial(){
    this.form = this.formBuilder.group({
      tarea: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
    });
    
   }
   async onSubmit(item){
        if (item.tarea === '') {
          this.alert.error("Error", "El nombre de la tarea no puede estar vacio");
        } else if (item.decripcion === '') {
          this.alert.error("Error", "La decripcion no puede estar vacio");
        } else {
          try {
            this.alert.loading();
            const resulta = await this._http.create(item, localStorage.getItem('id'));
            if (resulta) {
              console.log(resulta);
              this.alert.messagefin();
              this.router.navigate(['/home']);
            } else {
              this.alert.error("Error", "En la conexión del servidor");
            }
          } catch (err) {
            this.alert.error("Error", "Usuario o contraseña invalida");
          }
          
        }
   }

}
