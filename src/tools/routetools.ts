
import queryString from "query-string";
class RouteTools {
  
  // -----------------------------------------
  static processSpecial(paths: any): any {
    
    if (!paths || !paths.length) {
      // home Page
      return { mobj: "homepage", permissionhash: "/" };
    }

    const m = paths[0];


    // if (m == "resetpassword") {
    //   return {
    //     mobj: "resetpassword",
    //     permissionhash: "post-user-reset-password",
    //   };
    // }

    
  }

  //---------------------------------------

  
  static async processRoute(
    paths: any,
    parsed: any,
    fullUrl: any
  ): Promise<any> {
    var mo: any = false;

    mo = RouteTools.processSpecial(paths);
    if (mo)
      return RouteTools.processRouteVars(
        mo.mobj,
        paths,
        parsed,
        fullUrl,
        mo.permissionhash,
        mo
      );

    

    return RouteTools.processRouteVars("notfound", paths, parsed, fullUrl, "/");
  }

  

  static processRouteVars(
    mainObj: any,
    paths: any,
    parsed: any,
    fullUrl: any,
    permissionhash: any,
    processedData?: any
  ): any {
    
  
    
    return {
      _mainobject: mainObj,
      _paths: paths,
      _getVars: parsed,
      url: fullUrl,
      processedData: processedData,
    };
  }

  // -----------------------------------------
  // -----------------------------------------
  // -----------------------------------------

  // -----------------------------------------
  // static prepareListRequest(currentRoute: any, cookies: any): RequestListDTO {
   
  //   const cOnPage = 1;
    
  //   const obj = new RequestListDTO();
  //   const _getVars =
  //     currentRoute && currentRoute._getVars ? currentRoute._getVars : {};

  //   obj.page = _getVars.page ? Number(_getVars.page) : 1;
  //   obj.onpage = _getVars.onpage ? Number(_getVars.onpage) : cOnPage;

  //   obj.filters = [];
  //   if (_getVars.filters != null && _getVars.filters != undefined) {
  //     const filters = _getVars.filters.split("|");

  //     for (let i in filters) {
  //       const t = filters[i].split(",");

  //       const _o = new RequestFilterDTO();
  //       _o.field = t[0].trim();
  //       t.shift();
  //       _o.values = t;

  //       if (!_o.field) continue;
  //       if (_o.values == undefined || !_o.values.length) continue;

  //       obj.filters.push(_o);
  //     }
  //   }

  //   obj.criteria = [];
  //   if (_getVars.criteria != null && _getVars.criteria != undefined) {
  //     const criteria = _getVars.criteria.split("|");

  //     for (let i in criteria) {
  //       const t = criteria[i].split(",");

  //       const _o = new RequestCriteriaDTO();
  //       _o.id = t[0].trim();
  //       t.shift();
  //       _o.values = t;

  //       if (!_o.id) continue;
  //       if (_o.values == undefined || !_o.values.length) continue;

  //       obj.criteria.push(_o);
  //     }
  //   }

  //   obj.range = [];
  //   if (_getVars.range != null && _getVars.range != undefined) {
  //     const range = _getVars.range.split("|");

  //     for (let i in range) {
  //       const t = range[i].split(",");

  //       const _o = new RequestCriteriaDTO();
  //       _o.id = t[0].trim();
  //       t.shift();
  //       _o.values = t;

  //       if (!_o.id) continue;
  //       if (_o.values == undefined || !_o.values.length) continue;

  //       obj.range.push(_o);
  //     }
  //   }

  //   if (_getVars.populates != null && _getVars.populates != undefined) {
  //     const _o = new RequestPopulateDTO();
  //     _o.populates = _getVars.populates.split(",");
  //     obj.populate = _o;
  //   }

  //   obj.sortcriteria = [];
  //   if (_getVars.order != null && _getVars.order != undefined) {
  //     const order = _getVars.order.split("|");

  //     for (let i in order) {
  //       const t = order[i].split(",");

  //       const _o = new RequestSortCriteriaDTO();
  //       _o.field = t[0].trim();
  //       _o.asc = t.length > 1 && t[1] == "asc" ? true : false;

  //       if (!_o.field) continue;

  //       obj.sortcriteria.push(_o);
  //     }
  //   }

  //   return obj;
  // }

  // // -----------------------------------------
  // static prepareListLocation(obj: RequestListDTO): string {
  //   let str = "";

  //   if (obj.page) {
  //     str += str ? "&" : "?";
  //     str += "page=" + obj.page.toString();
  //   }

  //   if (obj.onpage) {
  //     str += str ? "&" : "?";
  //     str += "onpage=" + obj.onpage.toString();
  //   }

  //   if (obj.filters) {
  //     let fstr = "";

  //     for (let i in obj.filters) {
  //       if (!obj.filters[i].values) continue;
  //       if (!Array.isArray(obj.filters[i].values)) continue;
  //       if (!obj.filters[i].values?.length) continue;

  //       fstr += fstr ? "|" : "";
  //       fstr += obj.filters[i]?.field;
  //       fstr += ",";
  //       fstr += obj.filters[i].values?.join(",");
  //     }

  //     if (fstr) {
  //       str += str ? "&" : "?";
  //       str += "filters=" + fstr;
  //     }
  //   }

  //   if (obj.range) {
  //     let fstr = "";

  //     for (let i in obj.range) {
  //       if (!obj.range[i].values) continue;
  //       if (!Array.isArray(obj.range[i].values)) continue;
  //       if (!obj.range[i].values?.length) continue;

  //       fstr += fstr ? "|" : "";
  //       fstr += obj.range[i]?.id;
  //       fstr += ",";
  //       fstr += obj.range[i].values?.join(",");
  //     }

  //     if (fstr) {
  //       str += str ? "&" : "?";
  //       str += "range=" + fstr;
  //     }
  //   }

  //   if (obj.criteria) {
  //     let fstr = "";

  //     for (let i in obj.criteria) {
  //       if (!obj.criteria[i].values) continue;
  //       if (!Array.isArray(obj.criteria[i].values)) continue;
  //       if (!obj.criteria[i].values?.length) continue;

  //       fstr += fstr ? "|" : "";
  //       fstr += obj.criteria[i]?.id;
  //       fstr += ",";
  //       fstr += obj.criteria[i].values?.join(",");
  //     }

  //     if (fstr) {
  //       str += str ? "&" : "?";
  //       str += "criteria=" + fstr;
  //     }
  //   }

  //   if (obj.sortcriteria) {
  //     let fstr = "";

  //     for (let i in obj.sortcriteria) {
  //       fstr += fstr ? "|" : "";
  //       fstr += obj.sortcriteria[i]?.field;
  //       fstr += ",";
  //       fstr += obj.sortcriteria[i]?.asc ? "asc" : "desc";
  //     }

  //     if (fstr) {
  //       str += str ? "&" : "?";
  //       str += "order=" + fstr;
  //     }
  //   }

  //   if (
  //     obj.populate &&
  //     obj.populate.populates &&
  //     obj.populate.populates.length
  //   ) {
  //     str += str ? "&" : "?";
  //     str += "populates=" + obj.populate.populates.join(",");
  //   }

  //   return str;
  // }

  // -----------------------------------------
  static async parseLocation(location: any): Promise<any> {
  
    const parsed = queryString.parse(location.search);

    const fullUrl = location.pathname + location.search;

    var tpaths = location.pathname.split("/");
    tpaths = tpaths.filter(Boolean);

    return await RouteTools.processRoute(tpaths, parsed, fullUrl);
  }

  // -----------------------------------------
  static setHistory(location: any, state: any): any {
    state = state ? state : {};

    window.history.pushState(state, "", location);

    var popStateEvent = new PopStateEvent("popstate", state);
    dispatchEvent(popStateEvent);
  }

  // -----------------------------------------
}

export { RouteTools };
