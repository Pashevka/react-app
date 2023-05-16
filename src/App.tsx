import { Navigate, Route, Routes } from "react-router-dom";

import { SingleElementInfo } from "./screens/SingleElementInfo";
import { MainList } from "./screens/MainList";

export default function App() {
  return (
    <Routes>
      <Route path="/list" Component={MainList} />
      <Route path="/list/:id" Component={SingleElementInfo} />
      <Route path="*" element={<Navigate replace to="/list" />} />
    </Routes>
  );
}
