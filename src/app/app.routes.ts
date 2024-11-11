import { Routes } from '@angular/router';
import { InicioComponent } from './Views/inicio/inicio.component';
import { ContactoComponent } from './Views/contacto/contacto.component';

export const routes: Routes = [
    {path:'', component:InicioComponent},
    {path:'inicio', component:InicioComponent},
    {path:'contacto/:id', component:ContactoComponent},
    {path:'**', component:InicioComponent},
];
