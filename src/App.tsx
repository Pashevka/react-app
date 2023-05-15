import { Navigate, Route, Routes } from "react-router-dom";

import { DogInfo } from "./screens/DogInfo";
import { MainList } from "./screens/MainList";

export default function App() {
  return (
    <Routes>
      <Route path="/list" Component={MainList} />
      <Route path="/list/:id" Component={DogInfo} />
      <Route path="*" element={<Navigate replace to="/list" />} />
    </Routes>
  );
}
