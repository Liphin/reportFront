/**
 * Created by Administrator on 2018/11/7.
 */
var app = angular.module('Angular.relist');

app.factory('ReListDataSer', function () {

    var MAX_CREATE_TIME =  '2088-01-01 00:00:00';
    var reportList={
        'list': [],
    }; //诉讼数据

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
        },
        //生成的页面手机版本预览
        'phoneView': {
            'status': false,
            'title': '', //标题, TODO
            'coverImage': '', //封面图片对象 TODO
            'coverImageSrc': '', //预览的HTML文件的src TODO
            'defaultTitle': '__TITLE__', //框架拼装默认的title，用来替换处理
            'defaultName': '__NAME__', //框架拼装默认的消息发送人，用来替换处理
            'defaultDate': '__DATE__', //框架拼装默认的消息发送时间，用来替换处理
            'viewHeadHtml': '', //预览时前端
            'phoneHeadHtml': '', //手机端拼凑的头部数据
            'phoneEndHtml': '', //手机端拼凑的尾部数据
            'html': '',//生成的网页html数据
            'height': '',//手机展示区的高度
            'maxHeight': '700',//手机展示区的最大高度为700px

            'editHtml': '<p><br></p>',
        },
        'mapData': {
            'newsType': {
                0: '生态环境和资源保护',
                1: '食品药品安全',
                2: '国有土地使用权出让',
                3: '国有财产保护',
                4: '英烈权益保护',
                5: '所有类型',
            },

        },
        'search': {
            'type': 5,
            'startDate': '',
            'endDate': '',
        }
    };

    return{
        MAX_CREATE_TIME:MAX_CREATE_TIME,
        reportList: reportList,
        overallData:overallData
    }
});