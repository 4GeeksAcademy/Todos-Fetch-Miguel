import React from "react";
import { useState,useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { element } from "prop-types";

//create your first component
const Home = () => {

	//Declaramos las variables que vamos a usar para el useState
	const [newTask,setNewTask] = useState("");
	const [tasks,setTasks] = useState([]);

	//Creo una funcion para controlar la entrada del ENTER
	const controlEnter = (event) => {

		if (event.keyCode === 13) {
			
			createNewTask();
	
		}

	}

	//Creo una funcion para crear nuevas tareas
	const  createNewTask = () => {

		if(newTask.trim()){
			setTasks([...tasks,newTask]);

			setNewTask("");
		}
	
	}

	//Funcion para borrar el elemento de la lista
	const deleteTask = (e) => {

		 const auxArr = tasks.filter((elemento,index)=> index !== e);

		setTasks(auxArr);
			

	}



	return (
		<div className="container">
			<h1>ToDos</h1>
			<div>
				
				<ul className="list-group">
					<li className="list-group-item"><input className="w-50" type="text" placeholder={tasks.length == 0 ? "No hay tareas, añadir tareas" : "Introduce otra tarea"}
					 value={newTask} 
					 onChange={(e) => setNewTask(e.target.value)} 
					 onKeyDown={event => controlEnter(event)}/></li>
					 {
						tasks.map((element, index) =>(
							<li className="list-group-item d-flex justify-content-between task" key={index}>{element}<button type="button" id="close" className="btn-close close" aria-label="Close" onClick={() => deleteTask(index)}></button></li>
						))
					 }
					<li className="list-group-item">{tasks.length} Item left</li>
				</ul>
			</div>
		</div>
	);
};

export default Home;

