const sqlite3 = require("sqlite3");
const {open} = require("sqlite");

const openDb = async () => {
  return await open({
    filename: "cerberus.db",
    driver: sqlite3.Database,
  });
};

const getCities = async () => {
  const dbCon = await openDb();
  const query = "SELECT cities.city, activities.activity, activities.category FROM cityactivities JOIN cities ON cities.cityCode = cityactivities.codeCity JOIN activities ON activities.activityId = cityactivities.idActivity ORDER BY cities.city ASC;";
  const result = await dbCon.all(query);
  return result;
};

const searchCity = async (search) => {
  const dbCon = await openDb();
  const query = "SELECT cities.city, activities.activity, activities.category FROM cityactivities JOIN cities ON cities.cityCode = cityactivities.codeCity JOIN activities ON activities.activityId = cityactivities.idActivity WHERE cities.city LIKE ? ORDER BY activities.category ASC, activities.activity ASC;"
  const result = await dbCon.all(query, [`%${search}%`]);
  return result;
};


module.exports = {
  getCities,
  searchCity,
};
