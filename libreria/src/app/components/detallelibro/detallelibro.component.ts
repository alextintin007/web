import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../models/libro';
import { Global } from '../../services/global';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detallelibro',
  templateUrl: './detallelibro.component.html',
  styleUrls: ['./detallelibro.component.css'],
  providers:[LibroService]
})
export class DetallelibroComponent implements OnInit {
  public url:string;
  public libro:Libro;
  public confirm:boolean;

  constructor(
    private _libroService:LibroService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 
    this.url=Global.url;
    this.libro=new Libro("","","","",2023,200,"");
    this.confirm=false;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id=params['id'];
      //console.log(id);
      this.getLibro(id);
    })
  }
  getLibro(id:String){
    this._libroService.getLibro(id).subscribe(
      response=>{
        this.libro=response.libro;
        //console.log(this.libro);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
  setConfirm(confirm:boolean){
    this.confirm=confirm;
  }
  borrarLibro(id:String){
    this._libroService.deleteLibro(id).subscribe(
      response=>{
        if(response.libro){
          this._router.navigate(['/libros']);
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
