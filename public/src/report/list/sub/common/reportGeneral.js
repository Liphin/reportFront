/**
 * Created by Administrator on 2018/11/11.
 */
var app = angular.module('Angular.relist');

app.factory('ReportGeneral', function ($http, $window, $location, ReListDataSer, OverallGeneralSer, OverallDataSer) {

    /**
     * 查看详情
     */
    var viewReport = function (report) {

        //打开预览页面并展示基础文本数据
        ReListDataSer.navigation['report']['viewReport'] = true;
        //ReListDataSer.reportList['editData']['editIndex'] = index;
        ReListDataSer.reportList['editData']['timestamp'] = report['timestamp'];
        ReListDataSer.reportList['editData']['data']['openid'] = report['openid'];
        ReListDataSer.reportList['editData']['data']['name'] = report['name'];
        ReListDataSer.reportList['editData']['data']['contact'] = report['contact'];
        ReListDataSer.reportList['editData']['data']['timestamp'] = report['timestamp'];
        ReListDataSer.reportList['editData']['data']['create_time'] = report['create_time'];
        ReListDataSer.reportList['editData']['data']['content'] = report['content'];
        ReListDataSer.reportList['editData']['data']['realm'] = report['realm'];
        ReListDataSer.reportList['editData']['data']['status'] = report['status'];
        ReListDataSer.reportList['editData']['data']['view'] = report['view'];

        //获取资源数据
        var sendData = {
            'timestamp': report['timestamp']
        };
        var url = OverallDataSer.urlData['backEndHttp']['getReportImgAndVoiceToPc'];
        var resourceUrl = OverallDataSer.urlData['frontEndHttp']['getReportResource'];
        ReListDataSer.reportList['editData']['data']['resourceImg'].length = 0; //清空之前的图片和音频资源数据
        ReListDataSer.reportList['editData']['data']['resourceVoice'].length = 0;

        //http请求数据
        OverallGeneralSer.httpPostData(url, sendData, function (responseData) {
            var resourceList = responseData['resource'];
            for (var i in resourceList) {
                if (resourceList[i]['type'] == 1) {
                    ReListDataSer.reportList['editData']['data']['resourceImg'].push({
                        'url': resourceUrl + resourceList[i]['filename'].trim(),
                        'name': resourceList[i]['filename'].trim()
                    });
                }
                else if (resourceList[i]['type'] == 2) {
                    ReListDataSer.reportList['editData']['data']['resourceVoice'].push({
                        'play':false, //是否为播放状态
                        'url': resourceUrl + resourceList[i]['filename'].trim(),
                        'name': resourceList[i]['filename'].trim()
                    });
                }
            }
        }, false); //设置loading数据动画为false
    };


    //下载zip资源文件操作
    var downloadFile = function (name, url) {
        //用ajax异步加载url路径下的资源文件，设置processData为false才不会自动转string类型
        $.ajax({
            url: url,
            type: 'GET',
            dataType: "binary",
            processData: false,
            success: function (result) {
                //从网络流中读入数据并保存文件
                var blob = new Blob([result], {type: 'application/octet-stream'});
                saveAs(blob, name);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //打印错误消息体
                console.error('error', errorThrown)
            }
        });
    };



    return {
        viewReport: viewReport,
        downloadFile: downloadFile,
    }

});