import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages";
import "@/styles/index.css";

import { Provider } from "react-redux";
import store from "./utils/redux/store/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
