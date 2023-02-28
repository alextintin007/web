import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../services/libro.service';
import { CargarService } from '../../services/cargar.service';
import { Libro } from '../../models/libro';
import { Global } from '../../services/global';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editarlibro',
  templateUrl: '../crearlibro/crearlibro.component.html',
  styleUrls: ['./editarlibro.component.css'],
  providers:[LibroService,CargarService]
})
export class EditarlibroComponent implements OnInit {
  public titulo:string;
  public libro:Libro;
  public libroGuardar:Libro;
  public url:string;
  public archivosParaCargar:Array<File>;
  public status:string;
  public idGuardado:string;

  constructor(
    private _libroService:LibroService,
    private _cargarService:CargarService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 
    this.titulo="EDITAR LIBRO";
    this.url=Global.url;
    this.libro=new Libro("","","","",2023,200,"");
    this.libroGuardar=new Libro("","","","",2023,200,"");
    this.archivosParaCargar=[];
    this.status='';
    this.idGuardado='';
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
  guardarLibro(form:NgForm){
    this._libroService.updateLibro(this.libro).subscribe(
      response=>{
        if(response.libro){
          if(this.archivosParaCargar){
            this._cargarService.peticionRequest(Global.url+"subir-imagen/"+response.libro._id,[],this.archivosParaCargar,'imagen')
            .then((result:any)=>{
              this.libroGuardar=result.response;
              this.status='success';
              console.log(response.libro._id);
              //this.idGuardardo=result.libro._id;
              form.reset();
             //this.fileInput.nativeElement.value='';
            });
          }else{
            this.libroGuardar=response.libro;
            this.status='success';
            form.reset();
          }
        }else{
          this.status='failed';
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
  imagenChangeEvent(archivoSeleccionado:any){
    this.archivosParaCargar=<Array<File>>archivoSeleccionado.target.files;
  }

}
