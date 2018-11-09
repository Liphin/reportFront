var app = angular.module('Angular.relist');

app.factory('ViewReportSer', function ($http, $window, $timeout, $location, ReListDataSer, OverallGeneralSer,OverallDataSer) {

    /**
     * 查看详情
     */
    var moveViewReport = function (optType) {
        var index = 0;
        if (optType==0) {
            index = ReListDataSer.reportList['editData']['editIndex']-1;
        }
        else if(optType==1) {
            index = ReListDataSer.reportList['editData']['editIndex']+1;
        }

        if(optType==0&&ReListDataSer.reportList['list'][index]['timestamp'].length<=0) {
            alert("已是第一条记录，请查看下一条");
        }
        else if(optType==1&&ReListDataSer.reportList['list'][index]['timestamp'].length<=0) {
            alert("已是最后一条记录，请查看上一条");
        }
        else {
            var fd = new FormData();
            var url = OverallDataSer.urlData['backEndHttp']['getReportImgAndVoice'];
            var resourceUrl = OverallDataSer.urlData['frontEndHttp']['getDynamicResource'];
            fd.append('timestamp', ReListDataSer.reportList['list'][index]['timestamp']);

            ReListDataSer.reportList['editData']['data'].length=0;

            //http请求数据
            OverallGeneralSer.httpPostData(url, fd, function (responseData) {
                ReListDataSer.reportList['editData']['editIndex'] = index;
                ReListDataSer.reportList['editData']['timestamp'] = ReListDataSer.reportList['list'][index]['timestamp'];
                ReListDataSer.reportList['editData']['data']['name'] = ReListDataSer.reportList['list'][index]['name'];
                ReListDataSer.reportList['editData']['data']['contact'] = "     "+ReListDataSer.reportList['list'][index]['contact'];
                ReListDataSer.reportList['editData']['data']['create_time'] = ReListDataSer.reportList['list'][index]['create_time'];
                ReListDataSer.reportList['editData']['data']['content'] = ReListDataSer.reportList['list'][index]['content'];

                var resourceList= responseData['resource'];
                for (var i in resourceList) {
                    if (resourceList[i]['type']==1) {
                        ReListDataSer.reportList['editData']['data']['resourceImg'].push({
                            'url': resourceUrl + resourceList[i]['filename'].trim(),
                            'name': resourceList[i]['filename'].trim()
                        });
                    }
                    else if (resourceList[i]['type']==2) {
                        ReListDataSer.reportList['editData']['data']['resourceVoice'].push({
                            'url': resourceUrl + resourceList[i]['filename'].trim(),
                            'name': resourceList[i]['filename'].trim()
                        });
                    }
                }
                alert(JSON.stringify(ReListDataSer.reportList['editData']['data']));

            });
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

    return {
        moveViewReport: moveViewReport,
        returnBackList: returnBackList,
    }

});