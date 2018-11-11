/**
 * Created by Administrator on 2018/11/7.
 */
var app = angular.module('Angular.relist');

app.factory('ReListDataSer', function () {

    var MAX_CREATE_TIME =  '2088-01-01 00:00:00';
    var audioObject = new Audio();
    var reportList={
        'list': [],
        'editData': {
            'editIndex': '', //预览list数据时的index
            'timestamp': '', //预览list数据的timestamp
            'data': {
                'openid': '',
                'name': '',
                'contact': '',
                'timestamp': '',
                'create_time': '',
                'content': '',
                'realm': '',
                'resourceImg': [],
                'resourceVoice': []
            },

            'target_img_index':0, //选择的目标图片的index
            'view_picture':false, //查看图片开关
            'target_voice_index':0 //选择的目标音频的index
        },
        'audio' : audioObject //音频播放object
    };

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
        'mapData': {
            'newsType': {
                0: '生态环境和资源保护',
                1: '食品药品安全',
                2: '国有土地使用权出让',
                3: '国有财产保护',
                4: '英烈权益保护',
                5: '所有类型'
            }

        },
        'search': {
            'type': 5,
            'startDate': '',
            'endDate': '',
        },
    };

    //内部页面跳转展示
    var navigation = {
        'report': {
            'reportList': false,
            'viewReport': false,
        },
    };

    return{
        MAX_CREATE_TIME:MAX_CREATE_TIME,
        reportList: reportList,
        overallData:overallData,
        navigation: navigation,
    }
});