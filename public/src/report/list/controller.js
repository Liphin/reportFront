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
    relist.reportList = ReListDataSer.navigation;
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

    /**
     * 搜索特定条件的列表
     */
    relist.searchReportList=function () {
        ReListSer.searchReportList()
    };

    /**
     * 诉讼列表中针对每条诉讼的操作：如删除，详情等
     * @see ReListSer.newsOpt
     */
    relist.ReListOpt = function (optType, reportId, index) {
        ReListSer.ReListOpt(optType, reportId, index);
    };

    /**
     * 多项删除诉讼操作
     * @see NewsListSer.deleteBatchNews
     */
    relist.deleteBatchReport = function () {
        ReListSer.deleteBatchReport();
    };

    /**
     * 移动查看详情
     * @see ViewReportSer.moveViewReport
     */
    relist.moveViewReport = function (optType) {
        ViewReportSer.moveViewReport(optType);
    };

    /**
     * 返回list页面
     * @see ViewReportSer.returnBackList
     */
    relist.returnBackList = function () {
        ViewReportSer.returnBackList();
    };

});