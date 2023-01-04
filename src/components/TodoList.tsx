import React from 'react'
import { Todo } from '../model'
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';
import './styles.css'

interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }): JSX.Element => (
    <div className="container">
        <Droppable droppableId='TodosList'>
            {(provided, snapshot) => (
                <div 
                    className={`todos ${snapshot.isDraggingOver ? "drag_active" : ""}`}
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                >
                    <span className="todos_heading">Active Tasks</span>
                    {todos.map((todo, index) => (
                        <SingleTodo
                            index={index}
                            key={todo.id} 
                            todo={todo}
                            todos={todos}
                            setTodos={setTodos}
                        />
                    ))}
                    {/* ドラッグとドロップの余白を作れる */}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
        <Droppable droppableId='TodosRemove'>
            {(provided, snapshot) => (
                <div 
                    className={`todos remove ${snapshot.isDraggingOver ? "drag_completed" : ""}`}
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                >
                    <span className="todos_heading">Completed Tasks</span>
                {/* {todos.filter(todo => todo.isCompleted).map((todo) => ( */}
                {completedTodos.map((todo, index) => (
                    <SingleTodo
                        index={index}
                        key={todo.id} 
                        todo={todo}
                        todos={completedTodos}
                        setTodos={setCompletedTodos}
                    />
                ))}
                {provided.placeholder}
                </div>
            )}
        </Droppable>
    </div>
)

export default TodoList;