export function findObjById(objArray, targetObjKey, targetValue, callback) {
  let newArray = [];
  for (const item of objArray) {
    if (item[targetObjKey] === targetValue) {
      newArray.push(callback(item));
    } else {
      newArray.push(item);
    }
  }
  return newArray;
}
