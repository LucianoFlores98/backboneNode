const fs = require("fs");

export const createHashMap = (
  objectToMap: { [key: string]: any },
  defaultValue?: any
) => {
  const handler = {
    get: function (target: { [key: string]: any }, name: string) {
      return target.hasOwnProperty(name) ? target[name] : defaultValue;
    },
  };
  const map = Object.keys(objectToMap).reduce((map, property) => {
    const mapPart = property.split(",").reduce((map, splitedProperty) => {
      return { ...map, [splitedProperty]: objectToMap[property] };
    }, {});
    return { ...map, ...mapPart };
  }, {});
  return new Proxy(map, handler);
};
