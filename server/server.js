/*
 *
 * Entry file into the server
 * @app -
 *    our express app. Exported for testing and flexibility.
 *
*/

var app           = require('./app/app.js'),
    port          = app.get('port'),
    log           = 'Listening on ' + app.get('base url') + ':' + port;

app.listen(port);
console.log(log);
