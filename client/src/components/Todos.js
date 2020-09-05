import React, { useState, useContext, useEffect } from "react";
import TodoItem from "./TodoItem";
import TodoService from "../services/TodoService";
import Message from "./Message";
import { AuthContext } from "../context/AuthContext";

const Todos = (props) => {
  const [todo, setTodo] = useState({ name: "" });
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  // similar to componentDidMount
  useEffect(() => {
    TodoService.getTodos().then((data) => {
      setTodos(data.todos);
    });
  }, []);

  const onSubmit = (e) => {
    console.log("yo");
    e.preventDefault();
    TodoService.postTodo(todo).then((data) => {
      const { message } = data;
      resetForm();
      if (!message.msgError) {
        // if we successfully created a todo
        TodoService.getTodos().then((getData) => {
          setTodos(getData.todos);
          setMessage(message);
        });
      } else if (message.msgBody === "Unauthorized") {
        // if the jwt token has expired
        setMessage(message);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        // most likely be an error message
        // like if the client is trying to send an empty string to the backend it will throw this error
        setMessage(message);
      }
    });
  };

  const onChange = (e) => {
    setTodo({ name: e.target.value });
  };

  const resetForm = () => {
    setTodo({ name: "" });
  };

  return (
    <div>
      <ul className="list-group">
        {todos.map((todo) => {
          return <TodoItem key={todo._id} todo={todo} />;
        })}
      </ul>
      <br />
      <form onSubmit={onSubmit}>
        <label htmlFor="todo">Enter Todo</label>
        <input
          type="text"
          name="todo"
          onChange={onChange}
          value={todo.name}
          className="form-control"
          placeholder="Please Enter Todo"
        />
        <button type="submit" className="btn btn-lg btn-primary btn-block">
          Submit
        </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};
export default Todos;
