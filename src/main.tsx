import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { store } from "./stores";

const container = document.getElementById("root");
const root = createRoot(container as HTMLDivElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
