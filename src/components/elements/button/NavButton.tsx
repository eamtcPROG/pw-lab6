import React from "react";
import Link from "@mui/material/Link";
import { useEffect, useState } from "react";
import { RouteTools } from "tools/routetools";
import { CommonTools } from "tools/commontools";


interface NavButtonProps {
  [key : string] : any;
  children?: any;
  href?: string;
  _mainurl?: string;
  _hstate?: any;
  additionalOnClick?: any;
}

const NavButton: React.FC<NavButtonProps> = ({
  children,
  href,
  _hstate,
  _mainurl,
  additionalOnClick,
  ...props
}) => {
  
  const [hstate, setHstate] = useState({});
  const [mainurl, setMainUrl] = useState("");
  const [isExternal, setIsExternal] = useState(false);

  useEffect(() => {
    const h = _hstate != undefined ? _hstate : {};
    setHstate(h);
  }, [_hstate]);

  useEffect(() => {
    const _isExternal = CommonTools.isExternalUrl(href);
    setIsExternal(_isExternal);
  }, [href]);

  useEffect(() => {
    const m:any = _mainurl != undefined ? _mainurl : href;
    setMainUrl(m);
  }, [_mainurl]);

  const handleClick = (e: any) => {
    if (isExternal) return;

    e.stopPropagation();
    e.preventDefault();

    const h:any = hstate ? hstate : {};
    h._mainurl = mainurl;

    RouteTools.setHistory(href, h);
    if(additionalOnClick)additionalOnClick()
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export { NavButton };
