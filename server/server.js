/**
 * Created by Administrator on 2017/2/21.
 */
//获取目标environment，若无则默认赋值global变量为dev
global.env = process.env.TARGET_ENV;
if (env == undefined || env == '' || env == null) {
    global.env = 'dev';
}
var fs = require('fs');
var http = require('http');
var https = require('https');
var request = require('request');
var multer = require('multer');
var express = require('express');
var bodyParser = require('body-parser');
var device = require('express-device');
var ServerSer = require('./serverSer');
var MiniSer = require('./mini/MiniSer');
var serverSerData = require('./serverSerData');

/*对象数据实例化*/
var app = express();
var serverSer = new ServerSer();
var miniSer = new MiniSer();
var PORT = serverSerData.port;

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

/**
 * 返回基础配置文件
 */
app.get('/targetSetting', function (req, res) {
    res.send(serverSerData.targetSetting)
});

/**
 * 小程序获取用户openId数据
 */
app.get('/getMiniUserOpenId', function (req, res) {
    miniSer.getMiniUserOpenId(req, res)
});


/**
 * 用户上传资源文件数据
 */
var storage = multer.diskStorage({
    //指定保存的文件夹
    destination: function (req, file, cb) {
        cb(null, serverSerData.resourcePath)
    },
    //指定保存的文件名
    filename: function (req, file, cb) {
        cb(null, req.body['fileName'])
    }
});
var upload = multer({storage: storage});
app.post('/uploadResource', upload.single('file'), function (req, res) {
    res.send(true);
});


//资源文件获取
app.use("/resource", express.static(serverSerData.resourcePath));
app.use("/", express.static(serverSerData.projectPath + "/public"));


//----------------------------- 开启http和https服务 ----------------------------------------
var privateKey = fs.readFileSync(serverSerData.targetSetting.serverConfig.key);
var certificate = fs.readFileSync(serverSerData.targetSetting.serverConfig.cert);
var credentials = {key: privateKey, cert: certificate};
https.createServer(credentials, app).listen(PORT); //开启http设置s配置
//http.createServer(app).listen(PORT); //开启http设置配置
//app.listen(PORT);

console.log("Server is running at port: " + PORT + " , and at environment: " + global.env);

