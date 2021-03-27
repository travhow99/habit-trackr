// import logo from './logo.svg';
// import './App.css';
import React, { useState, useEffect } from "react";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";
import DATA from './data';
import HabitDataService from './services/habit.service';

import { nanoid } from "nanoid";

const FILTERS = ['all', 'completed', 'active'];

function App() {
	const [tasks, setTasks] = useState([]);
	const [filter, setFilter] = useState('all');
	const [filteredTasks, setFilteredTasks] = useState([]);

	useEffect(() => {
		const fetchTasks = async () => {
			HabitDataService.getAll()
				// .then((res) => res.json())
				.then((res) => {
					console.log('data', res.data);
					setTasks(res.data)
					handleFilter(filter, res.data);
				})
				.catch((err) => console.log(err))
		}

		fetchTasks();
	}, [setTasks]);

	function addTask(name) {
		// Create action
		const newTask = {
			name,
			completed: false,
		};

		HabitDataService.create(newTask)
			.then((res) => {
				console.log('data', res.data);

				const updatedTasks = [...tasks, newTask];

				setTasks(updatedTasks);
				handleFilter(filter, updatedTasks);
			})
			.catch((err) => console.log(err))
	}

	const toggleComplete = (id) => {
		// Update action

		const updatedTasks = tasks.map((task) => {
			if (id === task._id) {
				return { ...task, completed: !task.completed };
			}

			return task;
		})

		setTasks(updatedTasks);
		handleFilter(filter, updatedTasks);
	}

	const editTask = (id, name, value) => {
		const updatedTasks = tasks.map((task) => {
			if (id === task._id) {
				return { ...task, [name]: value };
			}

			return task;
		});

		setTasks(updatedTasks);
		handleFilter(filter, updatedTasks);
	}

	const deleteTask = (id) => {
		// Delete action
		const updatedTasks = tasks.filter((task) => id !== task._id);

		setTasks(updatedTasks);
		handleFilter(filter, updatedTasks);
	}

	const handleFilter = (new_filter, updated_tasks = null) => {
		let filtered;
		let target_tasks = updated_tasks ?? tasks;

		switch (new_filter) {
			case 'completed':
				filtered = target_tasks.filter((task) => task.completed);
				break;
			case 'active':
				filtered = target_tasks.filter((task) => !task.completed);
				break;
			case 'all':
			default:
				filtered = target_tasks;
				break;
		}

		if (filter !== new_filter) {
			setFilter(new_filter);
		}

		setFilteredTasks(filtered);
	}

	console.log('tasks', tasks);
	console.log('filtered:', filteredTasks);

	return (
		<div className="todoapp stack-large">
			<h1>Habit Trackr</h1>
			<Form addTask={addTask} />
			<div className="filters btn-group stack-exception">
				{/* Map filters, set filter state to name */}
				{FILTERS.map((filter, index) => <FilterButton key={index} name={filter} callback={handleFilter} />)}
			</div>
			<h2 id="list-heading">
				{tasks.length === 1 ? '1 task' : `${tasks.length} tasks`} remaining
			</h2>
			<ul
				className="todo-list stack-large stack-exception"
				aria-labelledby="list-heading"
			>
				{filteredTasks.map((task, index) => (
					<Todo
						key={index}
						name={task.name}
						completed={task.completed}
						id={task._id}
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
