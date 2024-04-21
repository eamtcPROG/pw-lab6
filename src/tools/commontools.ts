import { Types } from "./types";

export class CommonTools {
  public static isEmpty = (obj: object) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  public static arraysAreEqual = (arr1: any, arr2: any) => {
    if (arr1 == undefined && arr2 == undefined) return true;
    if (arr1 == undefined || arr2 == undefined) return false;

    if (arr1.length !== arr2.length) return false;

    const sortedArr1 = arr1.map(JSON.stringify).sort();
    const sortedArr2 = arr2.map(JSON.stringify).sort();

    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) return false;
    }

    return true;
  };

  public static atLeastOneFieldDefined = (obj: any) => {
    for (const key in obj) {
      if (obj[key] !== undefined) {
        return true;
      }
    }
    return false;
  };

  public static getIdFromPath = (currentRoute: any, mainObject: string) => {
    if (!currentRoute) return "";
    if (!currentRoute.hasOwnProperty("_paths")) return "";
    if (!Array.isArray(currentRoute._paths)) return "";
    if (currentRoute._paths.length === 0) return "";
    const paths = currentRoute._paths;
    const mainObj = paths[0];
    if (mainObj !== mainObject) return "";
    return paths[1];
  };

  public static isExternalUrl = (url: string | undefined): boolean => {
    if (url == undefined) return false;

    try {
      const parsedUrl = new URL(url, window.location.href);
      // Compare the hostname of the URL with the current page's hostname
      return parsedUrl.hostname !== window.location.hostname;
    } catch (error) {
      // Handle invalid URLs or URLs without a hostname
      console.error("Invalid URL:", url);
      return false;
    }
  };
  public static calculateNumberOfElementsShowOnCarousel = (
    defaultValue: number,
    totalCount: number
  ): number => {
    let result = 0;
    if (totalCount === 1) return 1;
    if (totalCount <= defaultValue) {
      result = totalCount - 1;
    } else {
      result = defaultValue;
    }
    return result;
  };

  public static roundToTenth(number: number) {
    return (Math.round(number * 10) / 10).toFixed(1);
  }

  public static generateRandomString(length: number) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  public static processObjectField(
    obj: any,
    fields: string[],
    type?: number,
    numberAfterPoint?: number
  ): string {
    if (numberAfterPoint === undefined || numberAfterPoint === null)
      numberAfterPoint = 2;
    if (!type) type = Types.FIELD_TYPE_STRING;

    let currentObj = obj;

    for (const field of fields) {
      if (
        !currentObj ||
        typeof currentObj !== "object" ||
        !currentObj.hasOwnProperty(field)
      ) {
        return "";
      }
      currentObj = currentObj[field];
    }

    if (typeof currentObj === "object" && currentObj !== null) return "";

    if (currentObj == null || currentObj == undefined) return "";
    if (type == Types.FIELD_TYPE_NUMBER && typeof currentObj === "number") {
      return currentObj.toFixed(numberAfterPoint);
    }

    return currentObj;
  }
}
