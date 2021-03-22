// import logo from './logo.svg';
// import './App.css';
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";

import DATA from './data';

const tasks = DATA;

console.log('ts', tasks);

function addTask(name) {
  alert(name);
}

function App() {
  return (
    <div className="todoapp stack-large">
      <h1>Habit Trackr</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">
        3 tasks remaining
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {/* 
          @todo loop through todos
        */}
        {tasks.map((task, index) => (
          <Todo key={index} name={task.name} completed={task.completed} id={task.id} />
        ))}
      </ul>
    </div>
  );
}

export default App;
