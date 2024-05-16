import { IProvider } from "interfaces/iprovider.interface";
import { Loading } from "components/elements/loading/Loading";

import ResultObjectDTO from "dto/app/resultobject.dto";

import { jwtDecode } from "jwt-decode";
import DateTools from "tools/date.tools";

import { LocalStorageTools } from "tools/localstorage.tools";
import GeneralAxiosRepository from "repositories/general.repository";
import React, { createContext, useCallback, useEffect, useState } from "react";
import AuthService from "services/auth.service";
import { JWTDto, ResultLoginDto } from "dto/jwt.dto";
import { UserDto } from "dto/user.dto";
import { RouteTools } from "tools/routetools";
import { LoginDto } from "dto/login.dto";
type Props = {
  token: string;
  user: UserDto | null;
  login: (data: LoginDto) => void;
};
export const AuthContext = createContext<Props>({
  token: "",
  user: null,
  login: (data: LoginDto) => {},
});

const service = new AuthService();

var isRefreshing = false;
export const AuthProvider: React.FC<IProvider> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string>(processLocalToken());
  const [user, setUser] = useState<UserDto | null>(processUserLocal());

  const generate = () => {
    if (isRefreshing) return;
    isRefreshing = true;
    service.token(handleProcessToken, {});
  };

  const handleProcessToken = (result: ResultObjectDTO) => {
    if (!result) return;
    if (result.err) return;
    if (!result.obj) return;
    const obj = result.obj as JWTDto;
    const token = obj.accesstoken ?? "";
    processToken(token);
    isRefreshing = false;
  };

  const processToken = (token: string) => {
    LocalStorageTools.saveValue("token", token);
    setToken(token);
  };

  const checkLoading = useCallback(() => {
    let loading = false;
    if (!token) loading = true;
    setLoading(loading);
  }, [token]);

  const getToken = useCallback(() => {
    if (!token) generate();
    if (isTokenExpired(token)) {
      setUser(null);
      generate();
    }
  }, []);

  const verifyToken = () => {
    if (!token) return;
    if (isTokenExpired(token)) {
      setUser(null);
      generate();
    }
  };

  const returnToken = () => {
    verifyToken();
    return token;
  };

  useEffect(() => {
    getToken();
    GeneralAxiosRepository.setToken(returnToken);
  }, [getToken]);

  useEffect(() => {
    checkLoading();
  }, [checkLoading]);

  useEffect(() => {
    if (!user) {
      RouteTools.setHistory("/login", {});
    } else {
      RouteTools.setHistory("/", {});
    }
  }, [user]);

  const login = (data: LoginDto) => {
    service.login(handleLogin, {}, data);
  };
  const handleLogin = (result: ResultObjectDTO) => {
    if (!result) return;
    if (result.err) return;
    const obj: ResultLoginDto | null = result.obj ? result.obj : null;
    if (!obj) return;
    const token = obj.accesstoken?.accesstoken ?? "";
    processToken(token);
    const user = obj.obj ?? null;
    setUser(user);

    console.log("result", result);
  };
  const value = {
    token,
    user,
    login,
  };

  return loading ? (
    <Loading />
  ) : (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

const isTokenExpired = (token: string) => {
  if (!token) return true;
  const payload = jwtDecode(token);
  if (!payload) return true;
  const exp = payload.exp ?? 0;
  const now = DateTools.getTimeStamp();
  return exp < now;
};

const processLocalToken = () => {
  const token = LocalStorageTools.getValue("token");
  if (!token) return "";
  if (isTokenExpired(token)) return "";
  return token;
};

const processUserLocal = (): UserDto | null => {
  const token = processLocalToken();
  if (!token) return null;
  const payload = jwtDecode(token);
  if (!payload) return null;
  return UserDto.parseFromToken(payload);
};
