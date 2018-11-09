/**
 * Created by Administrator on 2018/11/7.
 */
var app = angular.module('Angular.relist');

app.factory('ReportSer', function ($http, $window, $location, ReListDataSer, OverallGeneralSer,) {



    /**
     * 页面数据初始化
     */
    var dataInit= function () {
        var targetSubPage = $location.search()['subPage'];
        alert(JSON.stringify(targetSubPage));
        if (OverallGeneralSer.checkDataNotEmpty(targetSubPage)) {
            $location.search({'subPage': 'reportList'});
            $location.path(OverallDataSer.redirect['report']);
            return;
        }
        else if (targetSubPage=="reportList") {
            ReListSer.getRangeReportInfo();
            ReListDataSer.navigation['report']['reportList'] = true;
            ReListDataSer.navigation['report']['viewReport'] = false;
        }
        else if(targetSubPage=="viewReport") {
            ReListDataSer.navigation['report']['reportList'] = false;
            ReListDataSer.navigation['report']['viewReport'] = true;
        }
    };

    return {
        dataInit: dataInit,
    }

});