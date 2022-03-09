import logo from "./logo.svg";
import Form from "./Form";
import NavBar from "./NavBar";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import ViewAll from "./ViewAll";
import BLE from "./BLE";
import Login from "./Login";
import EditBle from "./EditBle";
import Canvas from "./Canvas";
import AddContainer from "./AddContainer";
import {isExpired} from "./util";

function App() {
  const RequireAuth = ({ children }) => {
    let auth = isExpired();
    let location = useLocation();
    if (auth) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    } else {
      return children;
    }
  };
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <div className="p-4">
                <Form />
              </div>
            </RequireAuth>
          }
        />
        <Route
          path="/view"
          element={
            <RequireAuth>
              <ViewAll />
            </RequireAuth>
          }
        />
        <Route
          path="/view/:id"
          element={
            <RequireAuth>
              <BLE />
            </RequireAuth>
          }
        />
        <Route
          path="/view/edit/:id"
          element={
            <RequireAuth>
              <EditBle />
            </RequireAuth>
          }
        />
        <Route
          path="/asset"
          element={
            <RequireAuth>
              <AddContainer />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
