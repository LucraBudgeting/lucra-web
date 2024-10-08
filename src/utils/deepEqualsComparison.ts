export function deepEquals(obj1: any, obj2: any): boolean {
  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  if (typeof obj1 !== 'object' || obj1 === null || obj2 === null) {
    return obj1 === obj2;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }

    if (!deepEquals(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

export function isObjEmpty(obj: any): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
