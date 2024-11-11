import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appsettings } from '../appsettings';
import { Contacto } from '../Models/Contacto';
import { Success } from '../Models/Success';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private apiUrlString = appsettings.apiUrl;

  constructor(private http : HttpClient) { }

  getContactos(){
    return this.http.get<Contacto[]>(this.apiUrlString);
  }

  getContacto(id:number){
    return this.http.get<Contacto>(`${this.apiUrlString}/${id}`);
  }

  addContacto(contacto:Contacto){
    return this.http.post<Contacto>(this.apiUrlString, contacto);
  }

  updateContacto(contacto:Contacto){
    return this.http.put<Success>(`${this.apiUrlString}/${contacto.id}`, contacto);
  }

  deleteContacto(id:number){
    return this.http.delete<Success>(`${this.apiUrlString}/${id}`);
  }
}
