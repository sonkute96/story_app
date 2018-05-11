const modules = require('./modules/init-modules');
var app = modules.express();
var bodyParser = modules.bodyParser;
var path = require('path');
var loginRouter = require('./router/login-router');
var uploadFileRouter = require('./router/upload-file-router');
var storyRouter = require('./router/story-router');
var conn = require('./database/connect-db');
const PORT = 3000 | process.env.port;
// run application
app.listen(PORT, () => {
    console.log("Running application with port " + PORT);
});
/**
 * Configure body-parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
/**
 * Configure EJS view engine
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(modules.express.static(path.join(__dirname, 'public')));
/**
 * Configure Cors
*/
app.use(modules.cors());
/**
 * Connect database
*/
conn.connect(err => {
    if (err) {
        console.log("Connected unsuccessfully");
    } else {
        console.log("Connected database");
    }
});

/**
 * Configure router
 */
app.use('/v1', loginRouter);
app.use('/v2', uploadFileRouter);
app.use('/v3', storyRouter);
//
app.get('/', (req, res) => {
    res.render('index.ejs');
});
