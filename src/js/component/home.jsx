import React from "react";
import { useState,useEffect } from "react";

import Swal from 'sweetalert2';

	


const Home = () => {

	const [newTask,setNewTask] = useState("");
	const [tasksList,setTasksList] = useState([]);

	//Funcion para crear un usuario si no existe
	const createUser = async () => {

		try {

			const response = await fetch("https://playground.4geeks.com/todo/users/Miguel",{method:"POST"});
			
		} catch (error) {
			
			alert("Error al crear el User");
		}


	} 

	//Funcion para Obtener los datos de la API
	const getData = async () => {

		
		try {
			//Creamos la promesa 
			const response = await fetch("https://playground.4geeks.com/todo/users/Miguel");

			if (!response.ok) {
				createUser();
			}
			else{

				const data = await response.json();

				console.log("Esto es la respuesta transformado por el json del getData");
				console.log(data);
				
				//Inicializo el useState de tasks a el array de la API
				setTasksList(data.todos);

			}	
		} catch (error) {
			
			alert("Ha habido un error al hacer el getData");

			console.log('error: ', response.status, response.statusText);
        	/* Realiza el tratamiento del error que devolvió el request HTTP */
        	return {error: {status: response.status, statusText: response.statusText}};
		}
	}

	//Creamos una funcion para agregar nuevas tareas 
	const postData = async () => {
		try {

			let nuevaTarea = {label: newTask,is_done: false};
			const response = await fetch("https://playground.4geeks.com/todo/todos/Miguel",{

				method: "POST",
				body: JSON.stringify(nuevaTarea),
				headers: {

					'Content-Type': 'application/json'
				}

			});

			if (response.ok) {

				const data = await response.json();

				console.log("Esto es la respuesta transformado por el json del postData");
				console.log(data);

				getData();
			}
			
			
		} catch (error) {

			alert("no funciona el POST");

			console.log("error: ", response.status,response.statusText);
        
            return {error: {status: response.status, statusText: response.statusText}};
			
		}
	} 
	//Creamos un metodo para actualizar los valores de la API 
	const putData = async (id) => {

		try {

			let putTarea = {label: newTask,is_done: false}
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`,{

				method: "PUT",
				body: JSON.stringify(putTarea),
				headers:{
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				
				const data = await response.json();

				console.log("Esto es la respuesta transformado por el json del putData");
				console.log(data);

				getData();
			}
			
		} catch (error) {

			alert("no funciona el PUT");

			console.log("error: ", response.status,response.statusText);
        
            return {error: {status: response.status, statusText: response.statusText}};
			
		}
	}

	//Creamos una funcion nueva borrar 
	const deleteData = async (id) => {

		try {

			
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`,{method: "DELETE"});

			console.log("Esto es la respuesta transformado por el json del deleteData");
			console.log(response);

			if (response.ok) {
				
				const data = await response.text();

				console.log(data);
			}

			getData();
			
		} catch (error) {

			alert("no funciona el DELETE");

			console.log("error: ", response.status,response.statusText);
        
            return {error: {status: response.status, statusText: response.statusText}};
			
		}

	}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//Creamos una funcion para recoger el evento del boton enter
	const controlEnter = (event) => {

		if (event.keyCode == "13") {

			createNewTask();

		}
		
	}

	//Creamos una funcion para crear un nuevo task
	const createNewTask = () => {

		if (newTask.trim()) {

			postData();

			setNewTask("");
			
		}
		else{
			alert("AVISO AL CREAR : Tienes que introducir algo para podder crear la tarea");
		}
	}

	//Creo una funcion que actualice las tareas 
	const updateTask = (id) => {

		if (newTask.trim()) {
			
			putData(id);

			setNewTask("");
		}
		else{

			alert("AVISO AL ACTUALIZAR : Debes introducir algun valor");
		}

	}

	//Funcion para borrar un elemento 
	const deleteTheTask = (id) => {

		deleteData(id);

	}

	useEffect(()=>{

		getData();

		
	},[]);


	return(

		<div className="container">
            <h1>ToDos</h1>
            <div>
                
                <ul className="list-group">
                    <li className="list-group-item"><input className="w-50" type="text" placeholder={tasksList.length == 0 ? "No hay tareas, añadir tareas" : "Introduce otra tarea"}
                     value={newTask} 
                     onChange={(e) => setNewTask(e.target.value)} 
                     onKeyDown={event => controlEnter(event)}/></li>
					 
					{
                      tasksList.map((todos) =>(
                          <li className="list-group-item d-flex justify-content-between task" key={todos.id}>{todos.label}
							<div>
								<button type="button" id="update" className="btn btn-primary" aria-label="Update" onClick={() => updateTask(todos.id)}>Actualizar</button>
								<button type="button" id="close" className="btn btn-danger close" aria-label="Close" onClick={() => deleteTheTask(todos.id)}>Borrar</button>
							</div>
						  </li>
                 		 ))
                    }
                   
                    <li className="list-group-item">{tasksList.length} Item left</li>
                </ul>
            </div>
        </div>


	);
};




export default Home;