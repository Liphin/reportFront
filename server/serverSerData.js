/**
 * Created by Administrator on 2018/5/15.
 */

//根据环境变量加载特定的config文件信息
var targetSetting = require('./config/' + global.env + "/setting.js");
var basePath = targetSetting['basePath']; //项目根文件目录
var port = targetSetting['frontPort']; //本地port
var isProd = targetSetting['isProd']; //是否为生产环境

//其他配置信息
var httpDataLimit = '25mb';
var appConfig = targetSetting.appConfig;


module.exports = {
    targetSetting: targetSetting,
    httpDataLimit: httpDataLimit,
    appConfig: appConfig,
    basePath: basePath,
    isProd: isProd,
    port: port
};