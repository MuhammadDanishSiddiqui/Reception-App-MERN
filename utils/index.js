const fs = require("fs");

const loadData = () => {
  try {
    const dataBuffer = fs.readFileSync("/tmp/db.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveData = (data) => {
  const dataJSON = JSON.stringify(data);
  fs.writeFileSync("/tmp/db.json", dataJSON);
};

module.exports = { loadData, saveData };
