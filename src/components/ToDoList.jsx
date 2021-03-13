import { Component } from "preact";

import { FilterList } from "./FilterList.jsx";
import { ToDoItem } from "./ToDoItem.jsx";

export class ToDoList extends Component {
	#includesText(item, text) {
		return item.description.includes(text);
	}

	#renderItem = (item) => {
		const { onDoneChange } = this.props;

		return (
			<li key={item.id} style={{ marginBottom: "1em" }}>
				<ToDoItem
					item={item}
					onDoneChange={(done) => onDoneChange(item.id, done)}
				/>
			</li>
		);
	};

	render() {
		const { items } = this.props;

		return (
			<FilterList
				items={items}
				filter={this.#includesText}
				render={this.#renderItem}
			>
				{(children) => <ul>{children}</ul>}
			</FilterList>
		);
	}
}
