var express = require('express'),
    app = express();
var path = require('path');
var bodyParser = require('body-parser');

var homeRouter = require('./routes/home');
var testingRouter = require('./routes/testing');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use('/static/', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', homeRouter);
app.use('/', testingRouter);

app.listen(3000, function(){
    console.log('Server is running at 3000!');
})