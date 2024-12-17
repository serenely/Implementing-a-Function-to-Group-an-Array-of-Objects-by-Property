
const data = [
  { name: "Alice", age: 30, country: "USA", city: "New York" },
  { name: "Bob", age: 25, country: "USA", city: "Los Angeles" },
  { name: "Charlie", age: 35, country: "UK", city: "London" },
  { name: "Diana", age: 40, country: "UK", city: "London" },
  { name: "Eve", age: 22, country: "USA", city: "New York" },
];


function groupBy(array, groupBy, filterFn) {
  const filteredArray = filterFn ? array.filter(filterFn) : array;

  const groupRecursive = (data, keys) => {
    if (keys.length === 0) return data;

    const [currentKey, ...remainingKeys] = keys;
    const keyFn = typeof currentKey === "function" ? currentKey : (item) => item[currentKey];

    return data.reduce((acc, item) => {
      const key = keyFn(item) ?? "undefined";
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
  };

  const recursiveGroup = (data, keys) => {
    const groupedData = groupRecursive(data, [keys[0]]);

    if (keys.length > 1) {
      for (const key in groupedData) {
        groupedData[key] = recursiveGroup(groupedData[key], keys.slice(1));
      }
    }

    return groupedData;
  };

  const groupKeys = Array.isArray(groupBy) ? groupBy : [groupBy];

  return recursiveGroup(filteredArray, groupKeys);
}
