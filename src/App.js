/* eslint-disable no-restricted-globals */
import "./App.css";
import MapboxGLMap from "./components/map";
import { GlobalProvider } from "./context/globalState";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <button onClick={() => location.reload()} type="button">
          Reload Page
        </button>
        <MapboxGLMap />
      </div>
    </GlobalProvider>
  );
}

export default App;
