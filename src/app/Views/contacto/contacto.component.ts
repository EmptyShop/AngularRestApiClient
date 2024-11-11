import { Component, inject, Input, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import { ContactoService } from '../../Services/contacto.service';
import { Router } from '@angular/router';
import { Contacto } from '../../Models/Contacto';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent implements OnInit{
  @Input('id') idContacto!: number;
  private contactoService = inject(ContactoService);
  public formBuilder = inject(FormBuilder);

  constructor(private router:Router){}
  
  formContacto = this.formBuilder.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required]
  });

  ngOnInit(): void {
    if (this.idContacto!=0){
      this.contactoService.getContacto(this.idContacto).subscribe({
        next: (data) => {
          this.formContacto.patchValue({
            fullname: data.fullname,
            email: data.email,
            phone: data.phone
          })
        },
        error: (e) => { console.log(e.message) }
      })
    }
  }

  guardarContacto(){
    const contacto: Contacto = {
      id: this.idContacto,
      fullname: this.formContacto.value.fullname,
      email: this.formContacto.value.email,
      phone: this.formContacto.value.phone
    }

    if(this.idContacto == 0){
      this.contactoService.addContacto(contacto).subscribe({
        next: (data) => {
          this.router.navigate(["/"]);
        },
        error: (e) => { 
          alert("No se pudo agregar el contacto.");
          console.log(e.error);
        }
      })
    }
    else{
      this.contactoService.updateContacto(contacto).subscribe({
        next: (data) => {
          this.router.navigate(["/"]);
        },
        error: (e) => { 
          alert("No se pudo actualizar el contacto.");
          console.log(e.error);
        }
      })
    }
  }

  volver(){
    this.router.navigate(["/"]);
  }
}
