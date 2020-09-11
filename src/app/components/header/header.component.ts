import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LangService } from 'src/app/services/lang.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() id: string;
  countries1:any;
  title = 'PrimeStone';
  isAuthenticated: boolean;
  constructor(
    private router: Router,
    private _http:LangService
  ) { }

  ngOnInit(): void {
    this.getusers(this.id);
  }
  cerrar(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }
  async getusers(id){
    
  }
  logout(){
    this._http.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }
}
