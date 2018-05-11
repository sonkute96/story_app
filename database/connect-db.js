const modules = require('../modules/init-modules');
var conn = modules.mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'cryptic_story'
});
module.exports = conn;