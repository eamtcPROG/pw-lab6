class LocalStorageTools {
  // -----------------------------------------
  static getObject(key: string): any {
    const value = localStorage.getItem(key);
    if (value == null) return false;

    var obj = JSON.parse(value);

    return obj;
  }

  // -----------------------------------------
  static getValue(key: string): any {
    const value = localStorage.getItem(key);

    if (value == null) return "";
    return value;
  }

  // -----------------------------------------
  static saveObject(key: string, obj: any): any {
    const value = JSON.stringify(obj);

    return LocalStorageTools.saveValue(key, value);
  }

  // -----------------------------------------
  static saveValue(key: string, value: string): any {
    localStorage.setItem(key, value);

    return true;
  }

  // -----------------------------------------
}

export { LocalStorageTools };
