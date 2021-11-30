import { useEffect, useLayoutEffect, useState } from "react";

import { BsFillTrashFill } from "react-icons/bs";

function App() {
    const [todos, setTodos] = useState();

    const [newTodo, setNewTodo] = useState();

    function handleAddTodo(todo) {
        setTodos((prev) => {
            return [...prev, todo];
        });
    }

    function handleFormChange(e) {
        setNewTodo((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        fetch("https://jsonplaceholder.typicode.com/todos", {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                handleAddTodo(json);
            });
    }

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                setTodos(json);
            });
    }, []);

    console.log(todos);
    return (
        <div>
            <article>
                <form
                    onSubmit={handleFormSubmit}
                    onChange={handleFormChange}
                    action=''
                >
                    <input name='title' type='text' />

                    <button type='submit'>Add new todo</button>
                </form>
                <ul>
                    {todos
                        ?.sort((a, b) => {
                            return a.id > b.id ? -1 : 1;
                        })
                        .map((todo, i) => {
                            return (
                                <li key={i}>
                                    {todo.id} {todo.title} <BsFillTrashFill />
                                </li>
                            );
                        })}
                </ul>
            </article>
        </div>
    );
}

export default App;
