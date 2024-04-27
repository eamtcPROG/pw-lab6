import { createContext, useEffect, useState } from "react";

import { Md5 } from "ts-md5";
import { IProvider } from "interfaces/iprovider.interface";
import { Types } from "tools/types";

type Props = {
  currentRoute: any;
  setCurrentRoute: (value: any) => void;
  saveCache: (data: any, key: string) => void;
  getCache: (key: string) => any;
  toggleTheme: () => void;
  mode: string;
};

export const ResourceContext = createContext<Props>({
  currentRoute: false,
  setCurrentRoute: () => {},
  saveCache: () => {},
  getCache: () => {},
  toggleTheme: () => {},
  mode: Types.LIGHT_MODE,
});
var cacheData: any = {};

type ProviderProps = {
  toggleTheme: () => void;
  mode: string;
} & IProvider;

export const ResourceProvider: React.FC<ProviderProps> = ({
  toggleTheme,
  mode,
  children,
}) => {
  const [currentRoute, setCurrentRoute] = useState(false);

  const getCacheIdentifier = (key: string) => {
    let k = "RO";

    k += "_" + JSON.stringify(key);

    return Md5.hashStr(k);
  };

  const saveCache = (data: any, key: string) => {
    const identifier = getCacheIdentifier(key);

    cacheData[identifier] = data;
  };

  const getCache = (key: string) => {
    const identifier = getCacheIdentifier(key);

    if (cacheData[identifier] !== undefined || cacheData[identifier] !== null)
      return cacheData[identifier];

    return false;
  };

  const value = {
    currentRoute,
    setCurrentRoute,
    saveCache,
    getCache,
    toggleTheme,
    mode,
  };

  return (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  );
};
