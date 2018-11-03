/**
 * Created by Administrator on 2017/2/21.
 */
//获取目标environment，若无则默认赋值global变量为dev
global.env = process.env.TARGET_ENV;
if (env == undefined || env == '' || env == null) {
    global.env = 'dev';
}
var http = require('http');
var request = require('request');
var multer = require('multer');
var express = require('express');
var bodyParser = require('body-parser');
var device = require('express-device');
var ServerSer = require('./serverSer');
var MiniSer = require('./mini/MiniSer');
var serverSerData = require('./serverSerData');
var PORT = serverSerData.port;

/*对象数据实例化*/
var app = express();
var serverSer = new ServerSer();
var miniSer = new MiniSer();

//设置http请求接收数据配置和最大限额等
app.use(device.capture());
app.use(bodyParser.json({limit: serverSerData.httpDataLimit}));
app.use(bodyParser.urlencoded({limit: serverSerData.httpDataLimit, extended: true}));

/**
 * 设置跨域通信
 * @see serHelper.setCrossOrigin
 */
// app.use(function (req, res, next) {
//     serHelper.setCrossOrigin(req, res, next);
// });

miniSer.getMiniUserOpenId();

app.get('/getMiniUserOpenId', function () {
    //var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code';

});

/**
 * 返回基础配置文件
 */
app.get('/targetSetting', function (req, res) {
    res.send(serverSerData.targetSetting)
});


//资源文件获取
app.use("/", express.static(serverSerData.basePath + "/project"));
app.listen(PORT);
console.log("Server is running at port: " + PORT + " , and at environment: " + global.env);

