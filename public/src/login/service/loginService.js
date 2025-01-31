/**
 * Created by Administrator on 2018/2/28.
 */
var loginModule = angular.module('Angular.login');

loginModule.factory('LoginSer', function ($http, $location,$cookies, LoginDataSer, OverallSer, OverallGeneralSer, OverallDataSer) {

    /**
     * 管理员登录验证前操作
     * 1、检查信息填写是否正确
     * 2、检查信息填写是否有sql注入
     */
    var managerLoginVerifyCheck = function () {
        var status = false;
        var account = LoginDataSer.loginInfo['account'];
        var password = LoginDataSer.loginInfo['password'];

        if (!OverallGeneralSer.checkDataNotEmpty(account)) {
            alert("请先输入账号信息");

        } else if (!OverallGeneralSer.checkDataNotEmpty(password)) {
            alert("请先输入密码信息");

        } else {
            status = true;
        }
        return status
    };


    /**
     * 管理员登录操作
     */
    var managerLoginOpt = function () {
        var account = LoginDataSer.loginInfo['account'];
        var password = LoginDataSer.loginInfo['password'];
        console.log('md5 encode', md5(password));

        //账号密码登录验证请求
        var fd = new FormData();
        fd.append("account", account);
        fd.append("password", md5(password));
        var url = OverallDataSer.urlData['backEndHttp']['managerLogin'];
        $http.post(url, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
        }).success(function (response) {
            //根据回传信息进行相应逻辑处理
            managerLoginOptHandler(response);

        }).error(function (error) {
            //提示系统出错
            alert("很抱歉，系统发生错误，请稍后重试.");
            //OverallGeneralSer.alertHttpRequestError("managerLoginOpt", 500, "system error");
        })
    };


    /**
     * 管理员账号密码登录后信息返回处理逻辑
     * @param response
     */
    var managerLoginOptHandler = function (response) {
        if (response['status_code'] == 200) {

            //设置cookie信息和全部变量信息
            OverallDataSer.overallData['loginStatus']=true;
            $cookies.put('loginStatus', 'success', {'expires': OverallGeneralSer.getNewCookiesExpireDate()});

            //返回状态为200则登录成功，
            $location.path(OverallDataSer.redirect['reportList']);

        } else {
            //根据出错码进行相应信息反馈
            var exception_code = response['exception_code'];
            switch (exception_code) {
                case 401: {
                    //告知用户账号密码不对信息
                    alert("很抱歉，账号或密码信息不正确");
                    break;
                }
                default: {
                    //提示系统出错
                    alert("很抱歉，系统发生错误，请稍后重试,");
                    // OverallGeneralSer.alertHttpRequestError("managerLoginOpt", exception_code, response['exception']);
                    break;
                }
            }
        }
    };



    return {
        //管理者登录操作
        managerLoginVerifyCheck: managerLoginVerifyCheck,
        managerLoginOpt: managerLoginOpt,

        //
    }
});
