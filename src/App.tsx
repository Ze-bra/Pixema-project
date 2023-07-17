import "./App.module.scss";
import { Route, Routes } from "react-router-dom";
import Layout from "./Pages/Layout";
import SingIn from "./Pages/signIn";
import { RoutesConstants } from "./Constants/RouteConstants";
import SingUp from "./Pages/singUpPage";
import { ActivatePage } from "./Pages/activate";
import SignUpConfirmation from "./Pages/singUpConfirmation";
import ActivationSuccess from "./Pages/activationSuccess";
import Films from "./Pages/films";
import LayoutAuthorization from "./Pages/LayoutAuthorization";
import { Film } from "./Pages/film";

function App() {
  return (
    <Routes>
      <Route path={RoutesConstants.Home} element={<Layout />}>
        <Route path={RoutesConstants.Home} element={<Films />} />
        <Route path={RoutesConstants.Home + ":listType"} element={<Films />} />
        <Route path={RoutesConstants.Film + "/:id"} element={<Film />} />
      </Route>
      <Route path={RoutesConstants.Home} element={<LayoutAuthorization />}>
        <Route path={RoutesConstants.SignIn} element={<SingIn />} />
        <Route path={RoutesConstants.SignUp} element={<SingUp />} />
        <Route path={RoutesConstants.SignUpConfirmation} element={<SignUpConfirmation />} />
        <Route path={RoutesConstants.Activation} element={<ActivatePage />} />
        <Route path={RoutesConstants.ActivationSuccess} element={<ActivationSuccess />} />
      </Route>
    </Routes>
  );
}

export default App;
