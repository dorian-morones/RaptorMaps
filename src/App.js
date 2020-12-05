/* eslint-disable no-restricted-globals */
import "./App.css";
import MapModuleContainer from "./components/map";
import { GlobalProvider } from "./context/globalState";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <button onClick={() => location.reload()} type="button">
          Reload Page
        </button>
        <MapModuleContainer />
      </div>
    </GlobalProvider>
  );
}

export default App;
