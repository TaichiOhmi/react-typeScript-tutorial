import React, { useState, useRef, useEffect } from 'react'
import { Todo } from '../model'
import { MdEdit, MdDelete, MdDone} from 'react-icons/md'
import './styles.css'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({index, todo, todos, setTodos}: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
        // todosの中からidが一致するものを探し、それのisCompletedのbooleanを反転させる。
        todos.map((todo) => 
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        ) 
    );
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  };
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault()
    setTodos(todos.map((todo) => (
        todo.id === id ? {...todo, todo:editTodo} : todo
    )));
    setEdit(!edit);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable 
        draggableId={todo.id.toString()} 
        index={index}
    >
        {(provided, snapshot) => (
            <form 
                className={`todos_single ${snapshot.isDragging ? "drag" : ""}`} 
                onSubmit={(e) => handleEdit(e, todo.id)}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
                {/* 
                    editがtrueならinputを表示、falseならtodoのタスクを表示。 
                    todoはisCompletedがtrueなら打ち消し、falseならそのまま。
                */}
                {
                edit ? (
                    <input 
                        ref={inputRef}
                        type="text" 
                        className='edit_box' 
                        value={editTodo}
                        onChange={(e) => setEditTodo(e.target.value)}
                    />
                ) : todo.isCompleted ? (
                    <s className="todos_single_text">{todo.todo}</s>
                ) : 
                (
                    <span className="todos_single_text">{todo.todo}</span>
                )}
                
                <div>
                    {!edit ? (
                        <span 
                            className="icon" 
                            onClick={() => {
                                if(!edit && !todo.isCompleted){
                                    setEdit(!edit)
                                }
                            }}
                        >
                            <MdEdit />
                        </span>
                    ) : (
                        <button type="submit" className='iconbtn'>
                            <MdEdit />
                        </button>
                    )
                    }
                    <span className="icon" onClick={() => handleDelete(todo.id)}>
                        <MdDelete />
                    </span>
                    <span className="icon" onClick={() => handleDone(todo.id)}>
                        <MdDone />
                    </span>
                </div>
            </form>
        )}
    </Draggable>
  )
}

export default SingleTodo