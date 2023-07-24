const validate = ({ schema, source = 'body' }) => async (req, res, next) => {
  try {
     const normalized = await schema.validateAsync(req[source]);
     req[source] = normalized;
     next();
  } catch(e) {
    next(e);
  }
}

module.exports = {
  validate
}