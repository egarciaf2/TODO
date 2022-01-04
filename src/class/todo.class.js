export class Todo{

    //Convierte los objetos obtenidos del localStorage en instancias de la clase
    static fromJson ( { id, tarea, completado, creado } ){

        const tempTodo = new Todo( tarea );

        tempTodo.id =  id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }

    constructor( tarea ){

        this.tarea = tarea;
        this.id =  new Date().getTime() + Math.random();
        this.completado = false;
        this.creado = new Date();

    }

}