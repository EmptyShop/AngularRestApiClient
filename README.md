# AngularRestApiClient

Cliente de API Rest (Angular)

Este proyecto lo hice como parte de un conjunto de aplicaciones que consumen una API que programé en Python para las operaciones básicas (CRUD) de una lista de contactos: [Contact List App](https://github.com/EmptyShop/FlaskSqlAlchemyApp). Este proyecto (AngularRestApiClient) es un cliente para Web, codificado en Angular. La UI contiene una tabla con la lista de contactos registrados. Una segunda página de la UI se accede desde los botones Agregar y Actualizar; esta página contiene 3 campos de texto correspondientes a nombre, email y teléfono para editar sus valores.

# Cómo lo Hice

## En este proyecto utilicé:

  * Angular 18.1.2
  * Angular Material UI 18.1.2

## Lo implementé así:

  * En el template del componente de inicio `inicio.component.html` agregué un elemento raíz `<mat-card>` de Material. Anidé una tabla (`<table mat-table>`). La fuente de datos de esta tabla (dataSource) es la propiedad `listaContactos` de la clase `InicioComponente`. Esta propiedad es un arreglo de tipo `Contacto`. `Contacto` es la interfaz de datos que establece los campos que obtendremos del servicio REST del [Servicio de Lista de Contactos](https://github.com/EmptyShop/FlaskSqlAlchemyApp).
  * Las columnas de la tabla son Nombre, eMail, Teléfono y los botones para Editar y Eliminar cada elemento de la lista.
  * Creé una clase de tipo servicio (`ContactoService`) para declarar los métodos de acceso a la API Rest. Usé inyección de dependencias para usar esta clase en el componente principal. Esta es la implementación de los métodos:

    ```sh
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
    ```

  * Las rutas que usa la aplicación las definí así en el archivo `app.routes.ts`:

    ```sh
    export const routes: Routes = [
    {path:'', component:InicioComponent},
    {path:'inicio', component:InicioComponent},
    {path:'contacto/:id', component:ContactoComponent},
    {path:'**', component:InicioComponent},
    ];
    ```

  * La clase `ContactoComponent` es la encargada de la edición y validación de los campos para agregar y editar contactos. Esta clase usa una página adicional a la de inicio. Utilicé ReactiveForms para estas operaciones. Añadí la funcionalidad REST con inyección de dependencias:

    ```sh
    private contactoService = inject(ContactoService);
    ```

## La ayuda que utilicé:

Para este proyecto me basé en tres videos que muestran cómo consumir servicios Restfull con Angular. Yo lo adapté a mi propia API y además me apoyé en información complementaria:

  * [Cómo consumir una API RESTFul con Angular](https://www.youtube.com/watch?v=mTTVJcr0D_I)
  * [Angular CRUD Simple](https://www.youtube.com/watch?v=arGRTVdG--c)
  * [CRUD con Angular 17 y .NET 8 WEB API](https://www.youtube.com/watch?v=3hheY1qSZ5U)
  * [Angular 16 CRUD example with Web API](https://www.bezkoder.com/angular-16-crud-example/)
  * [Angular Material Data Table: A Complete Example](https://blog.angular-university.io/angular-material-data-table/)
  * [Angular 18 REST API By Example with HttpClient](https://www.techiediaries.com/angular-by-example-httpclient-get/)
  * [HTTP Client • Overview](https://angular.dev/guide/http)
  * [Angular Material UI component library](https://material.angular.io/)

# Lo que sigue

El alcance de este proyecto es comparar el desempeño y las implementaciones de cada versión de app cliente para consumo de servicios Restfull que tengo en este repositorio (Angular, [React](https://github.com/EmptyShop/ReactRestApiClient), [Vue](https://github.com/EmptyShop/VueRestApiClient) y [Kotlin](https://github.com/EmptyShop/KotlinRestApiClient)). Por lo que no tengo planeado agregar o modificar funcionalidades.

Siéntete libre de comentar y sugerir cosas para esta app.

# Documentación Autogenerada por Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
