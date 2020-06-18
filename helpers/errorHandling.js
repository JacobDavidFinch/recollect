exports.logErrors = (err, req, res, next) => {
    console.error(err.stack)
    console.error(err.config)
    next(err)
  }
  
exports.clientErrorHandler = (err, req, res, next) => {
if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
} else {
    next(err)
}
}

exports.errorHandler = (err, req, res, next) => {
res.status(500)
res.render('error', { error: err })
}