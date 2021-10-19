const sqlite3 = require("sqlite3");
const {open} = require("sqlite");

const openDb = async () => {
  return await open({
    filename: "cerberus.db",
    driver: sqlite3.Database,
  });
};

const getCities = async () => {
  try {
    const dbCon = await openDb();
    // const query = "SELECT cities.city, activities.activity, activities.category FROM cityactivities JOIN cities ON cities.cityCode = cityactivities.codeCity JOIN activities ON activities.activityId = cityactivities.idActivity ORDER BY cities.city ASC;";
    const query = "SELECT city FROM cities;";
    const result = await dbCon.all(query);
    return result;
  } catch(error) {
    console.log(error)
  }
};

const searchCity = async (search) => {
  try {
    const dbCon = await openDb();
    // const query = "SELECT cities.city, activities.activity, activities.category FROM cityactivities JOIN cities ON cities.cityCode = cityactivities.codeCity JOIN activities ON activities.activityId = cityactivities.idActivity WHERE cities.city LIKE ? ORDER BY activities.category ASC, activities.activity ASC;"
    const query = "SELECT city FROM cities WHERE city LIKE ?"
    const result = await dbCon.all(query, [`%${search}%`]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getCategories = async () => {
  const dbCon = await openDb();
  const query = "SELECT category FROM activities GROUP BY category ORDER BY category ASC";
  return await dbCon.all(query);
};

const getActivites = async () => {
  const dbCon = await openDb();
  const query = "";
  return await dbCon.all(query);
};

module.exports = {
  getCities,
  searchCity,
  getCategories,
  getActivites
};
