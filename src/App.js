import routes from "./routes/index";
import { useSelector } from "react-redux";

function App() {
  const loginStatus = useSelector((state) => state.auth.loginStatus);

  if (loginStatus) {
    return <routes.ProtectedRoutes />;
  } else {
    return <routes.LoginRoutes />;
  }
}

export default App;
