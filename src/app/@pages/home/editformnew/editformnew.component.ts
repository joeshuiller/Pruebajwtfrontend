import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
@Component({
  selector: 'app-editformnew',
  templateUrl: './editformnew.component.html',
  styleUrls: ['./editformnew.component.scss']
})
export class EditformnewComponent implements OnInit {

  
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
    private alert: AlertService,
    private rutaActiva: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.inicial();
    this. gettareas(this.rutaActiva.snapshot.params.id);
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
      select: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
    
   }
   gettareas(id){
    try {
      this.alert.loading();
      this._http.editar(id).then((item: any)=>{
        if (item) {
          this.form.controls.tarea.setValue(item.name);
          this.form.controls.description.setValue(item.description);
          this.form.controls.select.setValue(item.state);
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
    onSubmit(item){
        if (item.tarea === '') {
          this.alert.error("Error", "El nombre de la tarea no puede estar vacio");
        } else if (item.decripcion === '') {
          this.alert.error("Error", "La decripcion no puede estar vacio");
        }else if (item.select === '0') {
          this.alert.error("Error", "Debes actualizar el estado de la taera");
        } else {
          try {
            this.alert.loading();
            const resulta =  this._http.edituser(item, this.rutaActiva.snapshot.params.id);
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
