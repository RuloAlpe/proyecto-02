const middleware = {};

middleware.validateParam = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
        throw new Error();
    }

    return next();
  } catch (err) {
    return res.status(401).json({
      message: 'Query parameter is required.',
    });
  }
};

middleware.validateLatLon = async (req, res, next) => {
  const { latitude, longitude } = req.query;
  if (!latitude && !longitude) {
    return res.status(400).json({
      search: [],
    });
  }

  return next();
};

export default middleware;
