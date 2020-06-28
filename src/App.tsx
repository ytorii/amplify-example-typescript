import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listTodos } from "./graphql/queries";
import { withAuthenticator } from "aws-amplify-react";

function App() {
  const [todoList, setTodoList] = useState<any[]>([]);

  const fetchTodoList = async () => {
    const response: any = await API.graphql(graphqlOperation(listTodos));
    setTodoList(response.data.listTodos.items);
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  function signOut() {
    Auth.signOut().then().catch();
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={signOut}>Sign out</button>
      </header>
      <ul>
        {todoList.map((todo) => (
          <Fragment key={todo.id}>
            <li>{todo.description}</li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}

export default withAuthenticator(App);
