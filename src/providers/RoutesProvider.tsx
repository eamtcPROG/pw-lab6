import React,{ useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loading } from "components/elements/loading/Loading";
import { MainLayout } from "components/general/MainLayout";
import { LoginPage } from "pages/LoginPage";


const RoutesProvider:React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<LoginPage />} />
        <Route path="/">
          <Route index element={<MainLayout />} />
          <Route path="*" element={<MainLayout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { RoutesProvider };
