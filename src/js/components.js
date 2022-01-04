
import { Todo } from '../class'
import { todoList } from '../index'


// REFERENCIAS EN HTML 
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFilters     = document.querySelector('.filters');
const achorFilters  = document.querySelectorAll('.filtro');


export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
        <li class="${ (todo.completado)? 'completed': '' }" data-id="${ todo.id }">.
            <div class="view">
                <input class="toggle" type="checkbox" ${ (todo.completado)? 'checked': '' }>
                <label>${ todo.tarea }</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    //firstElementChild Retorna el primer hijo, asi no imprime el div
    divTodoList.append( div.firstElementChild );
    
    return div;
}

export const listarTodos = () => {

    //Elimina los compontenes que tiene el input
    while(divTodoList.firstChild) {
        divTodoList.removeChild(divTodoList.firstChild);
    }

    //Imprime todos los todo del array
    todoList.todos.forEach(todo => crearTodoHtml( todo ));
    // todoList.todos.forEach( crearTodoHtml )  Esto es exactamente lo mismo que la linea de arriba

}

//EVENTOS
txtInput.addEventListener('keyup', ( event ) => {
    if(event.keyCode === 13 && txtInput.value.length > 0){
        const newTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( newTodo );
        listarTodos();
        txtInput.value = '';
    }

});

divTodoList.addEventListener('click', ( event ) => {

    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    
    if( nombreElemento.includes('input') ){ //Click en el check

        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');

    }else if( nombreElemento.includes('button') ){ //Borrar tarea
        todoList.eliminarTodo( todoId );
        listarTodos();
    }

});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();
    listarTodos();
});

ulFilters.addEventListener('click', ( event ) => {

    const filtro = event.target.text;
    
    if(!filtro){ return; }

    
    achorFilters.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected')

    for (const elemento of divTodoList.children) {

        elemento.classList.remove('hidden');
        
        const completado = elemento.classList.contains('completed');

        switch ( filtro ) {
            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden');
                }
                
                break;
            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }                
                break;
        
            default:
                break;
        }

    }

});