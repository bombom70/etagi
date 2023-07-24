const Router = require('express');
const router = new Router();
const flatRouter = require('./flat.routes');

router.use("/flats", flatRouter);

module.exports = router;