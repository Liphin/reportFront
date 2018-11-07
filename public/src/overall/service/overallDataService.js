/**
 * Created by Administrator on 2018/2/28.
 */
var overallModule = angular.module('Angular');

overallModule.factory('OverallDataSer', function ($rootScope) {

    var overallData = {
        'loginStatus': false,
        'loadingData': false, //
        'requestDataErrorMsg':'尊敬的客户，服务出错，请稍后重试'
    };

    /* Url 系统各种文件获取的URL设置 */
    var baseUrlData = {
        'backEndHttp': "http://127.0.0.1:8082/",
        'frontEndHttp': "http://127.0.0.1:3032/",
        'ossHttp': "",
        'resource_http_request': '',
    };

    // http请求的具体路径
    var urlData = {
        'backEndHttp': {
            'managerLogin': baseUrlData['backEndHttp'] + 'managerLogin', //管理员登录操作
            'getAllCompany': baseUrlData['backEndHttp'] + 'getAllCompany',
            'getRangeReport': baseUrlData['backEndHttp'] + 'getRangeReport',
        },
        'frontEndHttp': {
            'getSqlKeyWord': baseUrlData['frontEndHttp'] + 'helper/sqlKeyWord.txt',
        }
    };

    //用于sql注入filter
    var sqlVerify=[];


    //location.path的重定向
    var redirect = {
        'loginHome': '/login/home',
        'reportList': '/report/list',
    };


    var zIndexHelper = {
        'loading': 500000,
    };


    return {
        urlData: urlData,
        redirect:redirect,
        sqlVerify:sqlVerify,
        overallData: overallData,
        baseUrlData: baseUrlData,
        zIndexHelper: zIndexHelper,
    }
});
