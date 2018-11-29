function handlerErrors(res, error, code = 400) {
  return res.status(code)
    .json({
      ok: false,
      error
    });
};

module.exports = {
  handlerErrors
};