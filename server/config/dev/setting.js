/**
 * Created by Administrator on 2018/11/3.
 */
var settingData = {
    basePath: "G:/SoftwareOutSourcing/report_prod/front/reportFront", //基础路径
    domainName: "http://report.test.liphin.com", //域名设置
    isProd: false, //是否为生产环境
    frontPort: 3032, //前端port
    backPort: 8082 //后台port
};

//应用配置
var appConfig = {
    appid: 'wxf4676e44a9519526',
    secret: '1a3f4856b36d6e96e83cb43862b39287',
};

module.exports = {
    settingData: settingData,
    appConfig:appConfig,
};
