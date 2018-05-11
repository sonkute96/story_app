const modules = require('../modules/init-modules');
var loginRouter = modules.express.Router();

/** 
 * APIs */
loginRouter.post('/login', (req, res) => {
    var body = req.body;
    if (body.username === "admin" && body.password == "admin") {
        res.send({redirect: '/v2/upload-file'});
    } else {
        res.status(400);
    }
});

module.exports = loginRouter;