/* eslint-disable no-restricted-globals */
import "./App.css";
import MapModuleContainer from "./components/map";
import { GlobalProvider } from "./context/globalState";
import {
  Header,
  Logo,
  Title
} from "./styles/"
function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Header>
          <Logo src='https://raptormaps.com/wp-content/uploads/2018/07/Raptor-Maps-logo-orange.png' />
          <Title>React Test</Title>
        </Header>
        <MapModuleContainer />
      </div>
    </GlobalProvider>
  );
}

export default App;
