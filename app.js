var express = require('express'),
    app = express();
var path = require('path');
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: 'nexta5558100270@gmail.com',
        clientId: '1007345854678-dc4b0icld67cq9svuv01rem7ccl74bid.apps.googleusercontent.com',
        clientSecret: '9QReOAfG1gY9of9Vw0hjTVDL',
        refreshToken: '1/_8lDhCgyKIKAtz-ugQNizDYPCI15xf1tEllSSmd40yvqdVdR-zwwRpsiBs3gzpP_',
        accessToken: 'ya29.Glu9BOTohnwnkp6dF7Co--1e7ILuq8pjrL0EpQvbqjeZCF7kThPTiptxvp2W1gHCGUSfJItehAAuaBZnl4XXukf_zjO3yFLT2s5EFF733QLiH7_vOyM8cO9_uQKO',
        expires: 3600
    }
});

var homeRouter = require('./routes/home');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/static/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', homeRouter);
app.get('/email', function(req, res, next){
    res.render('email');
})
app.post('/email/', function(req, res, next){
    let mailOptions = {
        from: {
            name: '넥스트에이',
            address: 'nexta5558100270@gmail.com'
        },
        to: {
            address: 'sandwood09@gmail.com'
        },
        subject: "서브젝트", 
        html: "html바디"
    };
    transporter.sendMail(mailOptions, (error, info) => {
        console.log(error, info)
    });
    return res.redirect('/');
})

app.listen(3000, function(){
    console.log('Server is running at 3000!');
})