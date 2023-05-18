import { Navigate, Route, Routes } from "react-router-dom";

import { SingleElementInfo } from "./screens/SingleElementInfo";
import { MainList } from "./screens/MainList";
import AppLoader from "./components/AppLoader";
import NotFound from "./screens/NotFound";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/list" Component={MainList} />
        <Route path="/list/:id" Component={SingleElementInfo} />
        <Route path="/not-found" Component={NotFound} />
        <Route path="*" element={<Navigate replace to="/list" />} />
      </Routes>
      <AppLoader />
    </>
  );
}
