import { Navigate, Route, Routes } from "react-router-dom";

import AppLoader from "./components/AppLoader";
import { MainList } from "./screens/MainList";
import NotFound from "./screens/NotFound";
import { SingleElementInfo } from "./screens/SingleElementInfo";

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
