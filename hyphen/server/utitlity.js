const logErrors = (err, req, res, next) => {
  // console.error(err.stack);
  next(err);
}

const clientErrorHandler = (err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

const errorHandler = (err, req, res, next) => {
  res.status(500);
  next(err);
}

module.exports = {
  logErrors,
  clientErrorHandler,
  errorHandler
}