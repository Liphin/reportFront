/**
 * Created by Administrator on 2018/11/7.
 */
var app = angular.module('Angular.relist');

app.factory('ReportSer', function ($http, $window, $location, ReListDataSer, OverallGeneralSer,ReListSer) {


    /**
     * 页面数据初始化
     */
    var dataInit= function () {
        //获取指定范围内的诉讼信息
        ReListSer.getRangeReportInfo();

        /**
         * 初始化时间选择器
         */
        setTimeout(function () {
            triggerDatePicker();
        }, 500);

        //不进行页面subPage跳转
        // var targetSubPage = $location.search()['subPage'];
        // if (!(OverallGeneralSer.checkDataNotEmpty(targetSubPage))) {
        //     $location.search({'subPage': 'reportList'});
        //     $location.path(OverallDataSer.redirect['report']);
        //     return;
        // }
        // else if (targetSubPage=="reportList") {
        //     ReListSer.getRangeReportInfo();
        //     ReListDataSer.navigation['report']['reportList'] = true;
        //     ReListDataSer.navigation['report']['viewReport'] = false;
        // }
        // else if(targetSubPage=="viewReport") {
        //     ReListDataSer.navigation['report']['reportList'] = false;
        //     ReListDataSer.navigation['report']['viewReport'] = true;
        // }
    };

    return {
        dataInit: dataInit,
    }

});