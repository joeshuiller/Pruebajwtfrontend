import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LangService } from '../../services/lang.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
    private _http:LangService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.inicial();
  }
  inicial(){
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/home']);
    }
    this.form = this.formBuilder.group({
      correo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        Validators.minLength(5)
      ])),
      password: new FormControl('', Validators.compose([
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
        } else {
          try {
            this.alert.loading();
            const username = item.correo;
            const password = item.password;
            this._http.login(username, password).then((resulta: any)=>{
              if (resulta) {
                console.log(resulta);
                localStorage.setItem('id',resulta.user.id);
                localStorage.setItem('token',resulta.token);
                this.alert.messagefin();
                this.router.navigate(['/home']);
              } else {
                this.alert.error("Error", "En la conexión del servidor");
              }
            });
          } catch (err) {
            this.alert.error("Error", "Usuario o contraseña invalida");
          }
          
        }
   }
}
