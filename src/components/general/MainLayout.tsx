import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useReactPath } from "hooks/useReactPath";

import { RouteTools } from "tools/routetools";
import { useResource } from "hooks/useResource";
import { Loading } from "components/elements/loading/Loading";
import { HomePage } from "pages/HomePage";
import { Header } from "./Header";
import { Footer } from "./Footer";

import { NotFoundPage } from "pages/NotFoundPage";


const MainLayout: React.FC = () => {
  const { currentRoute, setCurrentRoute } = useResource();
  const location = useLocation();
  const pathObject = useReactPath();

  const [_currentpath, setCurrentPath] = useState("");
  const [_mainobject, setMainObject] = useState("");

  const processPathObject = async () => {
    let routeobj = await RouteTools.parseLocation(location);

    routeobj.historystate = pathObject.historystate;

    if (routeobj.url === _currentpath) return;
    setCurrentPath(routeobj.url);

    setCurrentRoute(routeobj);
  };

  useEffect(() => {
    processPathObject();
  }, [pathObject]);

  useEffect(() => {
    if (currentRoute && currentRoute._mainobject) {
      setMainObject(currentRoute._mainobject);
    }
  }, [currentRoute]);

  // ----------------------------------

  const processStandard = () => {
    if (!_mainobject) return false;

    if (_mainobject === "homepage")
      return <HomePage currentRoute={currentRoute} />;

    
    // if (_mainobject == "forgotpassword")
    //   return <ForgotPassword currentRoute={currentRoute} />;

    // if (_mainobject == "resetpassword")
    //   return <ResetPassword currentRoute={currentRoute} />;

    // if (_mainobject == "forbidden")
    //   return <Forbidden currentRoute={currentRoute} />;

    if (_mainobject === "notfound")
      return <NotFoundPage currentRoute={currentRoute} />;

    return false;
  };

  const processMainObject = () => {
    let t: any = false;

    t = processStandard();
    if (t) return t;

    return <Loading />;
  };

  return (
    <div className="container">
      <header>
        <Header currentRoute={currentRoute} />
      </header>
      <main>{processMainObject()}</main>
      <footer>
        <Footer currentRoute={currentRoute} />
      </footer>
    </div>
  );
};

export { MainLayout };
