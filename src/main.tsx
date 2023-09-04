import { createRoot } from "react-dom/client";
import { App } from "./dev/App";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
