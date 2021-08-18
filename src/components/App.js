import React from "react";
import { useState } from "react";
import "./../styles/App.css";

function ListItem(props){
	const {task, onDelete, onEdit} = props;

	const [tempTask, setTempTask] = useState(task);

	const [isEdit, setIsEdit] = useState(true);
	
	return isEdit ?  (
		<>
			<li className="list">{tempTask}</li>
			<button 
				className="edit" 
				type="button"
				onClick={()=>{
					setIsEdit(false);
				}}
			> Edit </button>

			<button 
				className="delete" 
				type="button"
				onClick={onDelete}
			> Delete </button>
		</>
	) : (
		<>
			<textarea 
			className="editTask" 
			value={tempTask}
			onChange={(event)=>{
				setTempTask(event.target.value);
			}}
			></textarea>
			<button 
				className="saveTask" 
				type="button"
				onClick={()=>{
					if(tempTask!==""){
						onEdit(tempTask);
						setIsEdit(true);
					}
				}}
			> Save </button>
		</>
	)
}

function App() 
{
	const [task, setTask] = useState('');
	const [todoList, setTodoList] = useState([]);

	///
	function onEdit(etask, ei){
		const newList = todoList.map((task,i)=>{
			if(ei === i){
				return etask;
			}
			return task;
		})
		
		// setTodoList([...task,newList]);
		setTodoList(newList);
	}

	///
	function onDelete(ei){
		const newList = todoList.filter((task,i)=>{
			return i !== ei;
		})

		setTodoList(newList);
	}

	return (
	<div id="main">
		<textarea 
			id="task" 
			value={task}
			onChange={(event)=>{
				setTask(event.target.value);
			}}
		></textarea>
		<button id="btn" 
			type="button"
			onClick={()=>{
				if(todoList!=="" && task !== ""){			// new change todoList!==""
					setTodoList([...todoList,task]);	///
					setTask("");
				}
			}}
		>
			Add
		</button>

		<h3>Todo Lists</h3>

		<ul>
			{todoList.map((task,i)=>{
				return (
					// <ListItem onEdit={onEdit} onDelete={onDelete}> {task} </ListItem>
					<ListItem 
						i={i}
						key={task}
						onEdit={(newTask)=>{
							onEdit(newTask,i);
						}} 
						onDelete={()=>onDelete(i)}
						task={task}/>
				)
			})}
		</ul>
	</div>
	);
}


export default App;
