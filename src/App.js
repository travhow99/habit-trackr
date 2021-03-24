// import logo from './logo.svg';
// import './App.css';
import React, { useState } from "react";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";
import DATA from './data';
import { nanoid } from "nanoid";

const FILTERS = ['all', 'completed', 'incomplete'];

function App() {
	const [tasks, setTasks] = useState(DATA);
	const [filter, setFilter] = useState('all');

	function addTask(name) {
		// Create action
		const newTask = {
			id: 'todo-' + nanoid(),
			name,
			completed: false,
		};
	
		setTasks([...tasks, newTask]);
	}

	const toggleComplete = (id) => {
		// Update action

		const updatedTasks = tasks.map((task) => {
			if (id === task.id) {
				return {...task, completed: !task.completed};
			}

			return task;
		})

		setTasks(updatedTasks);
	}

	const editTask = (id, name, value) => {
		const updatedTasks = tasks.map((task) => {
			if (id === task.id) {
				return {...task, [name]: value};
			}

			return task;
		});

		setTasks(updatedTasks);
	}

	const deleteTask = (id) => {
		// Delete action
		const updatedTasks = tasks.filter((task) => id !== task.id);

		setTasks(updatedTasks);
	}
	
	const handleFilters = (filter) => {
		setFilter(filter);

		switch (filter) {
			case 'all':
			default:

		}
	}

	return (
		<div className="todoapp stack-large">
			<h1>Habit Trackr</h1>
			<Form addTask={addTask} />
			<div className="filters btn-group stack-exception">
				{/* Map filters, set filter state to name */}
				{FILTERS.map((filter) => <FilterButton name={filter} callback={}  />)}
			</div>
			<h2 id="list-heading">
				{tasks.length === 1 ? '1 task' : `${tasks.length} tasks`} remaining
			</h2>
			<ul
				role="list"
				className="todo-list stack-large stack-exception"
				aria-labelledby="list-heading"
			>
				{tasks.map((task, index) => (
					<Todo 
						key={index} 
						name={task.name} 
						completed={task.completed} 
						id={task.id} 
						toggleComplete={toggleComplete}
						delete={deleteTask}
						edit={editTask}
					/>
				))}
			</ul>
		</div>
	);
}

export default App;
