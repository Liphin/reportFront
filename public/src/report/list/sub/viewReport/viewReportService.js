var app = angular.module('Angular.relist');

app.factory('ViewReportSer', function ($http, $window, $timeout, $location, ReListDataSer, OverallGeneralSer, OverallDataSer, ReportGeneral) {

    /**
     * 查看详情
     */
    var moveViewReport = function (optType) {
        var index = 0;
        if (optType == 0) {
            index = ReListDataSer.reportList['editData']['editIndex'] - 1;
        }
        else if (optType == 1) {
            index = ReListDataSer.reportList['editData']['editIndex'] + 1;
        }

        //提醒客户数据已超出范围
        if (optType == 0 && index < 0) {
            alert("已是第一条记录，请查看下一条");
        }
        else if (optType == 1 && !OverallGeneralSer.checkDataNotEmpty(ReListDataSer.reportList['list'][index])) {
            alert("已是最后一条记录，请查看上一条");
        }
        else {
            //传递index，预览指定下标的诉讼数据
            ReportGeneral.viewReport(index);
        }
    };

    /**
     * 返回list页面
     * @see ViewReportSer.returnBackList
     */
    var returnBackList = function () {

        //跳转到list页面
        $location.search({});
        $location.path(OverallDataSer.redirect['reportList']);

        //刷新当前页面，所有数据重置
        $window.location.reload();
    };


    /**
     * 播放或暂停音频按键
     */
    var playPauseVoice = function (index) {
        //前端显示暂停播放其他音频
        for (var i in ReListDataSer.reportList['editData']['data']['resourceVoice']) {
            if (i != index) {
                ReListDataSer.reportList['editData']['data']['resourceVoice'][i]['play'] = false;
            }
        }

        //如果目标音频是播放状态则停止播放，否则播放该音频
        if (ReListDataSer.reportList['editData']['data']['resourceVoice'][index]['play']) {
            ReListDataSer.reportList.audio.pause();

        } else {
            console.log(ReListDataSer.reportList['editData']['data']['resourceVoice'][index]['url'])
            ReListDataSer.reportList.audio.src = ReListDataSer.reportList['editData']['data']['resourceVoice'][index]['url'];
            ReListDataSer.reportList.audio.play();
            ReListDataSer.reportList['editData']['target_voice_index'] = index; //设置目标播放音频数组的下标
        }

        //改变前端目标音频的播放状态
        ReListDataSer.reportList['editData']['data']['resourceVoice'][index]['play'] = !ReListDataSer.reportList['editData']['data']['resourceVoice'][index]['play'];
    };




    return {
        moveViewReport: moveViewReport,
        returnBackList: returnBackList,
        playPauseVoice: playPauseVoice
    }

});





