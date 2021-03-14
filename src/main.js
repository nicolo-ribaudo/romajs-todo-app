// Polyfills
import "regenerator-runtime/runtime.js";

import { render } from "preact";
import { App } from "./components/App.jsx";

render(<App />, document.querySelector("#main"));
