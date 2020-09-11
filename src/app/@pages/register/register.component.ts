import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LangService } from '../../services/lang.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  valdation_messages = {
    name: [
      {type: 'requerid', message: 'El Nombre es requerido'},
    ],
    telephono: [
      {type: 'requerid', message: 'El Teléfono es requerido'},
    ],
    direction: [
      {type: 'requerid', message: 'La dirección es requerido'},
    ],
    correo: [
      {type: 'requerid', message: 'El Correo es requerido'},
      {type: 'pattern', message: 'ojo! este no es un Correo válido'}
    ],
    password: [
      {type: 'requerid', message: 'El Nombre es requerido'},
      {type: 'minLength', message: 'el Nombre debe contener minimo 5 caracteres'}
    ],
  };
  resulta:any;
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private _http:LangService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.inicial();
  }
  inicial(){
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      surnames: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      direction: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      telephono: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      correo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        Validators.minLength(5)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      passwordrepeat: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
    });
   }
   onSubmit(item){
        if (item.correo === '') {
          this.alert.error("Error", "El correo no puede estar vacio");
        } else if (item.password === '') {
          this.alert.error("Error", "El password no puede estar vacio");
        } else if (item.password !== item.passwordrepeat) {
          this.alert.error("Error", "Los password no son iguales");
        } else {
          try {
            this.alert.loading();
            const resulta = this._http.create(item).then((item: any)=>{
              if (item) {
                console.log(item);
                this.resulta =item;
                this.alert.messagefin();
                localStorage.setItem('id',item.user.id);
                localStorage.setItem('token',item.token);
                this.router.navigate(['/home']);
              } else {
                this.alert.error("Error", "En la conexión del servidor");
              }
            });
          } catch (err) {
            this.alert.error("Error", "En la conexión del servidor");
          }
          
        }
   }

}
