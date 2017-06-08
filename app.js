var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var qlikauth = require('./qlik-auth');

var configName = path.join(process.cwd(), 'config.js');
var configDetails = require(configName);
var profile = configDetails.Profile;

const certificateDir = configDetails.certificateDir;
const qlikProxyName = configDetails.QlikConfig.prefix;
const qlikServerName = configDetails.QlikConfig.host;
const qlikProtocol =  "https://";

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/javascripts/qlikConfigure.js',function(req, res) {
    var configString = "var config = {host: '" + configDetails.QlikConfig.host + "',prefix: '" + configDetails.QlikConfig.prefix +"',port: "+ (configDetails.QlikConfig.secure ? 443 : 80 ) + ", isSecure: " +(configDetails.QlikConfig.secure ? "true" : "false" ) +"};";
    configString += "var AppId = '" + configDetails.appUID + "';";
    configString += "var VisId = '" + configDetails.VisualisationUID + "';";
    // res.send("var config = {host: 'nzwel-extadn1',prefix: '/tick/',port: 443, isSecure: true};");
    res.send(configString);
});

app.get('/getTicket', function(req, res) {
    //Call Ticket API here
      var options={
        ProxyRestUri:(configDetails.QlikConfig.secure ? "https://" : "http://" ) + qlikServerName + ':4243/qps' + qlikProxyName,
        TargetId:'',//http://' + configDetails.EngineConnectHost + ':' + configDetails.EngineConnectPort,
        Certificate: certificateDir + '\\client.pfx',
        PassPhrase: ''
      };
      //Make call for ticket request
      var ticketResult = qlikauth.requestTicket(req, res, profile,options);
});

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
