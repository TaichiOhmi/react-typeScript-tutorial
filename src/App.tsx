import React, { useState } from 'react'
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

// React.FCは　React Function Component.
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    
    if(todo){
      setTodos([...todos, {id:Date.now(), todo: todo, isCompleted: false}])
    }

    setTodo("");
  };

  const onDragEnd = (result: DropResult) => {
    // result の中から、source(ドラッグ元)とdestination(ドラッグ先)を取り出す
    const { source, destination } = result;

    // destinationが無ければ(ドラッグ可能なエリア外にドラッグされたら)何もしない。
    if(!destination)return;

    // ドラッグ前後のエリアが同じで、ドラッグ前後のindexも同じ時もそのまま何もしない。
    if(
      // droppableIdは[TodosList, TodosRemove]
      destination.droppableId === source.droppableId 
      && 
      destination.index === source.index
      ) return;

    // add(変更を入れる空の変数), active(完了してないtodosのコピー), completed(完了したtodosのコピー)を宣言
    let add, 
        active = todos, 
        completed = completedTodos;

    // splice()はarrayの組み込みで第一引数に位置をとり、第二引数に消す個数、第三引数には置き換える値を取る。

    // ドラッグ元のエリアがTodosListの時、
    if(source.droppableId === 'TodosList'){
      // ドラッグ元のindexから選んだtodoを完了済みの中から選んで add に代入
      add = active[source.index];
      //  activeから,ドラッグ元のindexを用いて1つ取り除く。
      active.splice(source.index, 1);

    // ドラッグ元のエリアがTodosRemoveの時、
    }else{
      // ドラッグ元のindexから選んだtodoを完了済みの中から選んで add に代入
      add = completed[source.index];
      // completedからドラッグ元のindexを用いて1つ取り除く
      completed.splice(source.index, 1);
    }

    // ドラッグ先がTodosListの時、
    if(destination.droppableId === 'TodosList'){
      // ドラッグ元がTodosRemoveなら、
      if(source.droppableId === 'TodosRemove'){
        // isCompletedをfalseにする。
        add.isCompleted = !add.isCompleted;
      }
      // activeにドラッグ先のindexの位置に、0個減らして, addを加える。
      active.splice(destination.index, 0, add);

    // ドラッグ先がTodosRemoveの時、
    }else{
      // ドラッグ元がTodosListなら、
      if(source.droppableId === 'TodosList'){
        // isCompletedをtrueにする。
        add.isCompleted = !add.isCompleted;
      }

      // completedにドラッグ先のindexの位置に、0個減らして, addを加える。
      completed.splice(destination.index, 0, add)
    }

    // 変更されたactiveとcompletedから、todosとcompletedTodosを更新。
    setTodos(active);
    setCompletedTodos(completed);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Task Manager with typescript</span>
        <InputField 
          todo={todo} 
          setTodo={setTodo} 
          handleAdd={handleAdd}
        />
        <TodoList 
          todos={todos} 
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
