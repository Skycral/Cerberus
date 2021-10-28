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
    const query = "SELECT city FROM cities ORDER BY city ASC;";
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
  const query = "SELECT category FROM categories GROUP BY category ORDER BY category ASC";
  return await dbCon.all(query);
};

const getActivities = async (category) => {
  console.log(category)
  try {
    const dbCon = await openDb();
    // const query = "SELECT cities.cityName, categories.category FROM cityactivities INNER JOIN cities ON cities.cityName = cityactivities.city INNER JOIN activities ON activities.activityId = cityactivities.actId WHERE categories.category=? GROUP BY cities.cityName;"
    const query = "SELECT cities.cityName, activities.activity FROM cityactivities INNER JOIN cities ON cities.cityCode = cityactivities.city INNER JOIN activities ON activities.activityId = cityactivities.actId INNER JOIN categories ON categories.categoryId = cityactivities.catId WHERE categories.category=? GROUP BY cities.cityName;"
    const result = await dbCon.all(query, [category]);
    return result;
  } catch (error){
    console.log(error)
  }  
};

const getResult = async (company, category, start, end) => {
  try {
    const dbCon = await openDb();
    const secondStartYear = start.replace('1970', '1971');
    const secondEndYear = end.replace('1970', '1971');
    let query;

    if (company === 'Familjeresa') company = 'family';
    if (company === 'Parresa') company = 'couple';
    if (company === 'Soloresa') company = 'solo';
    if (company === 'Kompisresa') company = 'friends';
  
    if(start.substring(0, 4) === end.substring(0, 4)) {
     query = 
     `SELECT cities.cityName, activities.activity
      FROM cityactivities
      INNER JOIN cities ON cities.cityCode = cityactivities.city 
      INNER JOIN activities ON activities.activityId = cityactivities.actId 
      INNER JOIN categories ON categories.categoryId = cityactivities.catId
      WHERE categories.category = ?
      AND activities.${company} = 1
      AND ((? >= fromDate
      AND ? <= toDate)
      OR(? >= fromDate
      AND ? <= toDate))
      GROUP BY cities.cityName;`
      const result = await dbCon.all(query, [category, start, end, secondStartYear, secondEndYear]);
      return result;

    } else {
    query = 
      `SELECT cities.cityName, activities.activity
      FROM cityactivities 
      INNER JOIN cities ON cities.cityCode = cityactivities.city 
      INNER JOIN activities ON activities.activityId = cityactivities.actId 
      INNER JOIN categories ON categories.categoryId = cityactivities.catId
      WHERE categories.category = ?
      AND activities.${company} = 1
      AND ? >= fromDate
      AND ? <= toDate
      GROUP BY cities.cityName;`
      const result = await dbCon.all(query, [category, start, end]);
      return result;

    }
  } catch (error){
    console.log(error)
  }  
};

module.exports = {
  getCities,
  searchCity,
  getCategories,
  getActivities,
  getResult
};
