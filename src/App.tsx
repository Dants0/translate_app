import { Analytics } from "@vercel/analytics/react";
import { Home } from "./page/Home";

function App() {
  return (
    <div>
      <Home/>
      <Analytics />
    </div>
  );
}

export default App;
