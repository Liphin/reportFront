/**
 * Created by Administrator on 2018/11/7.
 */
var app = angular.module('Angular.relist');

app.controller('ReportListCtrl', function ($scope, ReListDataSer, ReportSer, ReListSer, OverallDataSer, $cookies,
                                           $location, OverallGeneralSer, ViewReportSer, ReportGeneral) {

    //检查是否有cookie或在本session里
    if (!OverallDataSer.overallData['loginStatus'] && $cookies.get('loginStatus') != 'success') {
        $location.path(OverallDataSer.redirect['loginHome']);
        return;

    } else {
        OverallDataSer.overallData['loginStatus'] = true;
        $cookies.put('loginStatus', 'success', {'expires': OverallGeneralSer.getNewCookiesExpireDate()});
    }

    //数据初始化操作
    var relist = this;
    relist.overallData = ReListDataSer.overallData;
    relist.reportList = ReListDataSer.reportList;
    relist.navigation = ReListDataSer.navigation;
    ReportSer.dataInit();


    //音频onended事件注册
    ReListDataSer.reportList.audio.onended = function () {
        //前端显示该音频为停止状态
        $scope.$apply(function () {
            var targetVoiceIndex = ReListDataSer.reportList['editData']['target_voice_index'];
            ReListDataSer.reportList['editData']['data']['resourceVoice'][targetVoiceIndex]['play'] = false;
        });
    };

    /**
     * 展示目标诉讼数据
     */
    relist.getBatchRangeReportInfo = function (opt) {
        ReListSer.getBatchRangeReportInfo(opt);
    };

    /**
     * 跳转到目标页面数据
     */
    relist.showTargetNumReportList = function ($index, num) {
        ReListSer.showTargetNumReportList($index, num)
    };

    /**
     * 搜索特定条件的列表
     */
    relist.searchReportList = function () {
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


    /************************************ 查看详情 *************************************/
    /**
     * 预览大图操作
     */
    relist.viewLargeImg = function (index) {
        relist.reportList['editData']['view_picture'] = true;
        relist.reportList['editData']['target_img_index'] = index;
    };

    /**
     * 播放音频操作
     * @param index
     */
    relist.playPauseVoice = function (index) {
        ViewReportSer.playPauseVoice(index);
    };


    /**
     * 下载所有图片和音频数据
     */
    relist.downloadZipResourceFile = function () {
        var name = "files.zip";
        var fileName = ReListDataSer.reportList['editData']['data']['openid'] +
            ReListDataSer.reportList['editData']['data']['timestamp'] + ".zip";
        var fileUrl = OverallDataSer.urlData['frontEndHttp']['getReportResource'] + fileName;
        ReportGeneral.downloadFile(name, fileUrl);
    }

});