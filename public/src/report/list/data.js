/**
 * Created by Administrator on 2018/11/7.
 */
var app = angular.module('Angular.relist');

app.factory('ReListDataSer', function () {

    var MAX_CREATE_TIME =  '2088-01-01 00:00:00';
    var reportList=[]; //诉讼数据
    var overallData =  {
        'totalNum':0, //消息总数
        'totalPage':0, //页面总数
        'screenNum': 12, //每一页展示12条数据
        'maxShowPage': 10, //一次性最多展示10页数据
        'pagination': {
            'loadedMaxPageNum': 0,//已加载过的最大page number
            'beginPageNum': 1,//页面开始的下标号
            'activeIndex': 0, //激活状态的分页index
            'beginListIndex': 0, //诉讼list列表，开始展示数据的下标条目
            'num': [], //所有装填分页数据
            'pre': false, //是否可选择上一批次
            'next': true //是否可选择下一批次
        }
    };

    return{
        MAX_CREATE_TIME:MAX_CREATE_TIME,
        reportList: reportList,
        overallData:overallData
    }
});