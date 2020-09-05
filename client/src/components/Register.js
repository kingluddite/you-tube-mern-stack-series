import React, { useState, useRef, useEffect } from "react";
import AuthService from "../services/AuthService";
import Message from "../components/Message";

const Register = (props) => {
  const [user, setUser] = useState({ username: "", password: "", role: "" });
  const [message, setMessage] = useState(null);
  let timerId = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const resetForm = () => {
    setUser({ username: "", password: "", role: "" });
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        // if there is no error we will show a message for 2 seconds
        // them we'll redirect to the login page
        timerId = setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Register</h3>
        <label htmlFor="username" className="sr-only">
          Username:
        </label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Username"
        />
        <label htmlFor="password" className="sr-only">
          Password:
        </label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Password"
        />
        <label htmlFor="role" className="sr-only">
          Role:
        </label>
        <input
          type="text"
          name="role"
          value={user.role}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Role (admin/user)"
        />
        <button type="submit" className="btn btn-lg btn-primary btn-block">
          Register
        </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Register;
