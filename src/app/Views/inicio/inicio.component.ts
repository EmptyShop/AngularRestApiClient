import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ContactoService } from '../../Services/contacto.service';
import { Contacto } from '../../Models/Contacto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  private contactoService = inject(ContactoService);
  public listaContactos: Contacto[] = [];
  displayedColumns: string[] =['fullname', 'email', 'phone', 'accion'];

  constructor(private router:Router){
    this.getContactos();
  }

  getContactos(){
    this.contactoService.getContactos().subscribe({
      next: (data) => {
        if (data.length>0)
          this.listaContactos = data
      },
      error: (e) => console.log(e.message)
    })
  }

  nuevoContacto(){
    this.router.navigate(['/contacto',0]);
  }

  editarContacto(contacto: Contacto){
    this.router.navigate(['/contacto',contacto.id]);
  }

  eliminarContacto(contacto: Contacto){
    if (confirm("¿Eliminar el contacto -> " + contacto.fullname + "?")){
      this.contactoService.deleteContacto(contacto.id).subscribe({
        next: (data) => {
          this.getContactos();
        },
        error: (e) => {
          alert("No se pudo eliminar el contacto.");
          console.log(e.error);
        }
      })
    }
  }
}
