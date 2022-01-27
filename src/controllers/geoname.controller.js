import config from '../config/config.dev';
import Geonames from 'geonames.js';

const controller = {};

const geonames = Geonames({
  username: config.username,
  lan: 'en',
  encoding: 'JSON'
});

controller.searchCities = (query) => {
  return new Promise(async (resolve,reject) => {
    try {
      const cities = await geonames.search({
        name_startsWith: query,
        country: 'US, CA',
        maxRows: 10,
      });
      return resolve(cities);
    } catch (error) {
      return reject(error);
    }
  });
};

controller.distanceFromCity = (data, user) => {
  const response = data.map((city) => {
    const cityLatitude = parseFloat(city.lat, 10);
    const cityLongitude = parseFloat(city.lng, 10);

    const deg2rad = (degree) => (Math.PI * degree) / 180;
		const rad2deg = (rad) => (rad * 180.0) / Math.PI;

		const theta = user.longitud - cityLongitude;
		let distancia = Math.sin(deg2rad(user.latitud)) * Math.sin(deg2rad(cityLatitude))
      + Math.cos(deg2rad(user.latitud)) * Math.cos(deg2rad(cityLatitude)) * Math.cos(deg2rad(theta));

		distancia = Math.acos(distancia);
		distancia = rad2deg(distancia);
		distancia = distancia * 60 * 1.1515;
    city.dist = distancia * 1.609344;

    return city;
  });

  return response;
};

controller.sortCitiesByDistance = (cities) => {
  return cities.sort((a, b) => a.dist - b.dist);
};

controller.responseObject = (cities) => {
	return cities.map((city) => ({
    name: `${city.name}, ${city.adminCodes1.ISO3166_2}, ${city.countryName}`,
    latitude: city.lat,
    longitude: city.lng,
    score: city.dist,
  }));
};

export default controller;
