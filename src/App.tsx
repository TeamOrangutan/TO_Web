import { AppRoutes } from "./routers/routes";
import { NavBar } from "./components/NavBar";
import './styles/App.css'
const App = () => (
  <>
    <NavBar />
    <div className="app-container">
      <AppRoutes />
    </div>
  </>
);
export default App;
