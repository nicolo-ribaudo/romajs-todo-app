import { useState } from "preact/hooks";

export const FilterList = ({
	items,
	filter,
	render,
	children: renderContent,
}) => {
	const [filterText, setFilterText] = useState("");

	const input = (
		<label>
			Filter:{" "}
			<input
				type="text"
				value={filterText}
				onInput={(e) => {
					setFilterText(e.target.value);
				}}
			/>
		</label>
	);

	const filteredItems = [];
	for (const item of items) {
		if (filter(item, filterText)) {
			filteredItems.push(render(item));
		}
	}

	return (
		<>
			{input}
			{renderContent(filteredItems)}
		</>
	);
};
