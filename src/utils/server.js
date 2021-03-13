const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

export async function* loadTodosFromServer() {
	let pageIndex = 0;
	let data, hasNextPage;

	do {
		({ data, hasNextPage, nextPage: pageIndex } = await loadPage(pageIndex));
		yield data;
	} while (hasNextPage);
}

// Simulate an API which doesn't returns all the results with
// a single request, but that splits them in multiple pages.
async function loadPage(index) {
	await wait(300); // The server is slow

	if (Math.random() < 0.02) {
		// Server error
		throw new Error("Error while loading the ToDo list");
	}

	if (index === 0) {
		return {
			data: [
				{ id: 0, description: "Setup Webpack", done: false },
				{ id: 1, description: "Setup Babel", done: true },
			],
			hasNextPage: true,
			nextPage: 1,
		};
	} else if (index === 1) {
		return {
			data: [
				{ id: 2, description: "Update Babel", done: false },
				{ id: 3, description: "Update other dependencies", done: true },
				{ id: 4, description: "Donate to your dependencies", done: false },
			],
			hasNextPage: false,
		};
	} else {
		return { data: [], hasNextPage: false };
	}
}
