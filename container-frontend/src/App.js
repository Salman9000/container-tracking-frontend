import logo from "./logo.svg";
import Form from "./Form";
import NavBar from "./NavBar";
import { Routes, Route, Link } from "react-router-dom";
import ViewAll from "./ViewAll";
import BLE from "./BLE";
import EditBle from "./EditBle";
import Canvas from "./Canvas";
import AddContainer from "./AddContainer";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="p-4">
              <Form />
            </div>
          }
        />
        <Route path="/view" element={<ViewAll />} />
        <Route path="/view/:id" element={<BLE />} />
        <Route path="/view/edit/:id" element={<EditBle />} />
        <Route path="/asset" element={<AddContainer />} />
      </Routes>
    </div>
  );
}

export default App;
