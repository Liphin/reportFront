/**
 * Created by Administrator on 2018/2/28.
 */
var loginModule = angular.module('Angular.login');

loginModule.factory('LoginDataSer', function (OverallDataSer) {

    //登录信息
    var loginInfo = {
        'account': '',
        'password': '',
    };

    return {
        loginInfo: loginInfo,
    }
});
