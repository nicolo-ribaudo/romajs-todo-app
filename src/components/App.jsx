import { Component } from "preact";

import { loadTodosFromServer } from "../utils/server.js";
import { ToDoList } from "./ToDoList.jsx";

export class App extends Component {
	state = {
		status: "loading",
		todos: [],
	};

	async componentDidMount() {
		try {
			const todos = [];
			for await (const chunk of loadTodosFromServer()) {
				todos.push(...chunk);
			}
			this.setState({ todos, status: "ready" });
		} catch {
			this.setState({ status: "error" });
		}
	}

	#handleDoneChange = (todoId, done) => {
		const maybeUpdate = (todo) => {
			if (todo.id === todoId) {
				return { ...todo, done };
			} else {
				return todo;
			}
		};

		this.setState((oldState) => {
			return {
				todos: oldState.todos.map(maybeUpdate),
			};
		});
	};

	render() {
		const { todos, status } = this.state;

		if (status === "loading") {
			return <p>Loading...</p>;
		}

		if (status === "error") {
			return (
				<p>
					There was an error while fetching the list. Try reloading the page.
				</p>
			);
		}

		return <ToDoList items={todos} onDoneChange={this.#handleDoneChange} />;
	}
}
