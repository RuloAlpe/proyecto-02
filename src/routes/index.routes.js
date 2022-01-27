import express from 'express';
import middleware from '../middlewares/index.middleware';
import geonamesController from '../controllers/geoname.controller';

const router = express.Router();

router.get('/search', [
  middleware.validateParam,
  middleware.validateLatLon
], async (req, res) => {
  try {
    const { q, latitude, longitude } = req.query;
    console.log(latitude)
    const user = {
      latitud: parseFloat(latitude, 10),
      longitud: parseFloat(longitude, 10),
    };

    const cities = await geonamesController.searchCities(q);
    const citiesDistance = geonamesController.distanceFromCity(cities.geonames, user);
    const citiesSort = geonamesController.sortCitiesByDistance(citiesDistance);
    const response = geonamesController.responseObject(citiesSort);

    return res.status(200).json({
      search: response
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

export default router;
