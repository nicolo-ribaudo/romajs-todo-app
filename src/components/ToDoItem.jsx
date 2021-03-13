const style = {
	fontSize: "1.2em",
	cursor: "pointer",
};

const styleDone = {
	...style,
	textDecoration: "line-through",
	color: "gray",
};

export const ToDoItem = ({ item, onDoneChange }) => {
	const { done, description } = item;

	const handleChange = () => onDoneChange(!done);

	return (
		<label style={done ? styleDone : style}>
			<input type="checkbox" checked={done} onChange={handleChange} />
			{description}
		</label>
	);
};
