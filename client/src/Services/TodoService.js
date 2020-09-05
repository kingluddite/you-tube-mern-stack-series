export default {
  getTodos: () => {
    return fetch("/users/todos").then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "UnAuthorized" }, msgError: true };
      }
    });
  },
  postTodo: (todo) => {
    return fetch("/users/todo", {
      method: "post",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "UnAuthorized" }, msgError: true };
      }
    });
  },
};
