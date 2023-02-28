import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LibroService } from '../../services/libro.service';
import { CargarService } from '../../services/cargar.service';
import { Libro } from '../../models/libro';
import { Global } from '../../services/global';
@Component({
  selector: 'app-crearlibro',
  templateUrl: './crearlibro.component.html',
  styleUrls: ['./crearlibro.component.css'],
  providers:[LibroService,CargarService]
})
export class CrearlibroComponent implements OnInit {
  public titulo:string;
  public libro:Libro;
  public libroGuardar:Libro;
  public url:string;
  public status:string;
  public idGuardardo:string;
  public archivosParaCargar:Array<File>;
@ViewChild('archivoImagen') fileInput:any;



  constructor(
    private _libroService:LibroService,
    private _cargarService:CargarService
  ) {
    this.titulo="GUARDAR LIBRO";
    this.url=Global.url;
    this.libro=new Libro('','','','',2023,100,'');
    this.libroGuardar=new Libro('','','','',2023,100,'');
    this.status="";
    this.idGuardardo="";
    this.archivosParaCargar=[];
   }

  ngOnInit(): void {
  }

  guardarLibro(form:NgForm){
    this._libroService.guardarLibro(this.libro).subscribe(
      response=>{
        if(response.libro){
          if(this.archivosParaCargar){
            this._cargarService.peticionRequest(Global.url+"subir-imagen/"+response.libro._id,[],this.archivosParaCargar,'imagen')
            .then((result:any)=>{
              this.libroGuardar=result.response;
              this.status='success';
              console.log(response.libro._id);
              this.idGuardardo=result.libro._id;
              form.reset();
              this.fileInput.nativeElement.value='';
            });
          }else{
            this.status='failed';
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
