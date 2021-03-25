import React, { useState } from "react";

const Todo = (props) => {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState('');

    const handleChange = (e) => setName(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        props.edit(props.id, 'name', name);

        setEditing(false);
        setName('');
    }

    console.log('complete?', props.completed);

    const viewTemplate = (
        <div className="todo stack-small">
            <div className="c-cb">
                <input
                    id={props.id}
                    key={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleComplete(props.id)}
                />
                <label className="todo-label" htmlFor={props.id}>
                    {props.name}
                </label>
            </div>
            <div className="btn-group">
                <button 
                    type="button" 
                    className="btn"
                    onClick={() => setEditing(true)}
                >
                    Edit <span className="visually-hidden">{props.name}</span>
                </button>
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => props.delete(props.id)}
                >
                    Delete <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </div>
    );

    const editTemplate = (
        <form className="stack-small">
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                <input 
                    id={props.id} 
                    className="todo-text" 
                    type="text" 
                    value={name}
                    onChange={handleChange}
                />
            </div>
            <div className="btn-group">
                <button 
                    type="button" 
                    className="btn todo-cancel"
                    onClick={() => setEditing(false)}
                >
                    Cancel
                    <span className="visually-hidden">renaming {props.name}</span>
                </button>
                <button 
                    type="submit" 
                    className="btn btn__primary todo-edit"
                    onClick={handleSubmit}
                >
                    Save
                    <span className="visually-hidden">new name for {props.name}</span>
                </button>
            </div>
        </form>
    );

    return (
        <li className="task">
            {editing ? editTemplate : viewTemplate}
        </li>
    );
}

export default Todo;