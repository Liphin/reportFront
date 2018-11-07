/**
 * Created by Administrator on 2018/11/7.
 */
var app = angular.module('Angular.relist');

app.controller('ReportListCtrl', function (ReListDataSer, ReListSer, OverallDataSer, $cookies, $location, OverallGeneralSer) {

    if(!OverallDataSer.overallData['loginStatus']&&$cookies.get('loginStatus')!='success'){
        $location.path(OverallDataSer.redirect['loginHome']);
        return;

    }else {
        OverallDataSer.overallData['loginStatus']=true;
        $cookies.put('loginStatus', 'success', {'expires': OverallGeneralSer.getNewCookiesExpireDate()});
    }


    //数据初始化操作
    var relist = this;
    relist.overallData = ReListDataSer.overallData;
    relist.reportList = ReListDataSer.reportList;
    ReListSer.dataInit();

    /**
     * 展示目标诉讼数据
     */
    relist.getBatchRangeReportInfo=function (opt) {
        ReListSer.getBatchRangeReportInfo(opt);
    };

    /**
     * 跳转到目标页面数据
     */
    relist.showTargetNumReportList=function ($index, num) {
        ReListSer.showTargetNumReportList($index, num)
    };

});