import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos.map((todo, index) => (
        <React.Fragment key={todo._id || index}>
          <Todo
            todo={todo}
            onDelete={() => deleteTodo(todo)}
            onComplete={() => completeTodo(todo)}
          />
          <hr />
        </React.Fragment>
      ))}
    </>
  );
};

export default TodoList;