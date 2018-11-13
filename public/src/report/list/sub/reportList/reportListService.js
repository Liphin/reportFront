/**
 * Created by Administrator on 2018/11/7.
 */
var app = angular.module('Angular.relist');

app.factory('ReListSer', function ($http, $window, $location, ReListDataSer, OverallGeneralSer, OverallDataSer, ReportGeneral) {


    /**
     * 获取指定范围内的诉讼数据
     */
    var getRangeReportInfo = function () {
        //发送请求获取指定范围和数目的新闻数据
        var data = {};
        if (ReListDataSer.reportList['list'].length <= 0) {
            data['create_time'] = ReListDataSer.MAX_CREATE_TIME;

        } else {
            data['create_time'] = ReListDataSer.reportList[ReListDataSer.reportList.length - 1]['create_time'];
        }

        //http请求数据
        OverallGeneralSer.httpPostData(OverallDataSer.urlData['backEndHttp']['getRangeReport'], data, function (responseData) {
            var totalNum = responseData['totalNum'];
            var reportList = responseData['reportList'];

            //设置全部新闻条目数目
            ReListDataSer.overallData['totalNum'] = totalNum;
            //设置所有页面数目
            ReListDataSer.overallData['totalPage'] = Math.ceil(parseFloat(totalNum) / ReListDataSer.overallData['screenNum']);

            //重置数据顺序：1、根据诉讼条目的处理状态进行排序
            var reportListSortedData = reportList.sort(sortStickNum);
            //循环填充新闻list数据
            for (var i in reportListSortedData) {
                ReListDataSer.reportList['list'].push(reportListSortedData[i]);
            }
            //装填分页展示信息
            loadPageInfo();
            //设置是否允许获取上一批次和下一批次数据
            setPreNextLoadBatchData();
        });
    };


    /**
     * 重置数据顺序：
     * 1、根据诉讼条目的处理状态进行排序
     */
    var sortStickNum = function (a, b) {
        if (a['status'] == b['status']) {
            return new Date(b['create_time']) - new Date(a['create_time']);

        } else {
            return a['status'] - b['status']
        }
    };


    /**
     * 装填分页展示信息
     */
    var loadPageInfo = function () {
        //清空之前分页number数据
        ReListDataSer.overallData['pagination']['num'].length = 0;
        //装填分页展示信息
        for (var j = ReListDataSer.overallData['pagination']['beginPageNum'], i = 1;
             j <= ReListDataSer.overallData['totalPage'] &&
             i <= ReListDataSer.overallData['maxShowPage']; j++, i++) {
            ReListDataSer.overallData['pagination']['num'].push(j);
        }

        //记录当前最大的已获取分页数
        var paginationNum = ReListDataSer.overallData['pagination']['num'];
        var lastPaginationNum = paginationNum[paginationNum.length - 1];
        if (ReListDataSer.overallData['pagination']['loadedMaxPageNum'] < lastPaginationNum) {
            ReListDataSer.overallData['pagination']['loadedMaxPageNum'] = lastPaginationNum;
        }
    };

    /**
     *  设置是否允许获取上一批次和下一批次数据
     */
    var setPreNextLoadBatchData = function () {
        //分别获取当前最大和最小页面page数值
        var paginationNum = ReListDataSer.overallData['pagination']['num'];
        var lastPaginationNum = paginationNum[paginationNum.length - 1];
        var firstPaginationNum = paginationNum[0];

        //如果展示区已有最后一页，则设置允许获取下一批次数据为false
        if (ReListDataSer.overallData['totalPage'] <= lastPaginationNum) {
            ReListDataSer.overallData['pagination']['next'] = false;

        } else {
            ReListDataSer.overallData['pagination']['next'] = true;
        }
        //如果展示区已有第一页数据，则设置允许获取上一批次数据为false
        if (firstPaginationNum == 1) {
            ReListDataSer.overallData['pagination']['pre'] = false;

        } else {
            ReListDataSer.overallData['pagination']['pre'] = true;
        }
    };


    /**
     * 获取上一批次或下一批次诉讼数据
     * @param changeBatch
     */
    var getBatchRangeReportInfo = function (changeBatch) {

        //对不允许获取下一批次或上一批次的数据时直接返回
        var paginationNum = ReListDataSer.overallData['pagination']['num'];
        var lastPaginationNum = paginationNum[paginationNum.length - 1];
        var firstPaginationNum = paginationNum[0];

        //往后读取数据
        //如果选择获取下一批数据，且已是最后一页，则直接返回不处理
        if ((changeBatch == 1) && (ReListDataSer.overallData['totalPage'] <= lastPaginationNum)) {
            return;
        }

        //往前读取数据
        //如果选择获取上一批数据，且已是第一页，则直接返回不处理
        if ((changeBatch == -1) && firstPaginationNum == 1) {
            return;
        }

        //设置页面开始下标号
        ReListDataSer.overallData['pagination']['beginPageNum'] +=
            changeBatch * ReListDataSer.overallData['maxShowPage'];
        //设置active装态的数据
        ContentGeneralSer.showTargetNumNewsList(0, ReListDataSer.overallData['pagination']['beginPageNum']);

        //两个判断条件
        // A： 如果之前获取过的分页数据最大页数大于当前页面最大页数则说明下一批数据之前已经获取过，
        // B： 进行下一批数据获取操作
        // 此时改变数据显示指针即可。
        // 否则获取新数据
        if (ReListDataSer.overallData['pagination']['loadedMaxPageNum'] <= lastPaginationNum && changeBatch == 1) {
            getRangeReportInfo();

        } else {
            //装填分页展示信息
            ContentGeneralSer.loadPageInfo();
            //设置是否允许获取上一批次和下一批次数据
            ContentGeneralSer.setPreNextLoadBatchData();
        }
    };


    /**
     * 鼠标点击选择展示某目标页面的新闻列表数据
     */
    var showTargetNumReportList = function (index, pageNum) {
        //设置该页的选择状态为active
        ReListDataSer.overallData['pagination']['activeIndex'] = index;
        //设置该页的起始展示index是，页面(pageNum-1) * 每页展示数目
        ReListDataSer.overallData['pagination']['beginListIndex'] =
            (pageNum - 1) * ReListDataSer.overallData['screenNum'];
    };

    /**
     * 鼠标点击选择展示某目标页面的新闻列表数据
     */
    var searchReportList = function () {
        var inputStartDate = $("input[name='startDate']").val();
        var inputEndDate = $("input[name='endDate']").val();

        if (!OverallGeneralSer.checkDataNotEmpty(inputStartDate) || !OverallGeneralSer.checkDataNotEmpty(inputEndDate)) {
            alert("请输入指定搜素日期");
        }
        else if (inputStartDate > inputEndDate) {
            alert("结束日期小于开始日期，请重新输入");
        }
        else {
            //提交表单数据
            var url = OverallDataSer.urlData['backEndHttp']['searchReportList'];
            var startDate = OverallGeneralSer.generateSearchTime(inputStartDate, 1);
            var endDate = OverallGeneralSer.generateSearchTime(inputEndDate, 2);
            console.log(startDate, endDate)
            var sendData = {
                'startDate': startDate,
                'endDate': endDate,
                'type': ReListDataSer.overallData['search']['type'],
            };

            //获取搜索的内容
            OverallGeneralSer.httpPostData(url, sendData, function (data) {
                //清空当前数据集
                ReListDataSer.reportList['list'].length = 0;

                //重置数据顺序：1、根据置顶标签排在前面，2、置顶的数据中根据置顶时间戳进行排序
                var friendCircleListSortedData = data.sort(sortStickNum);
                //循环填充新闻list数据
                for (var i in friendCircleListSortedData) {
                    //装载朋友圈list数据
                    ReListDataSer.reportList['list'].push(friendCircleListSortedData[i]);
                }
                //设置total_num为0，取消分页
                ReListDataSer.overallData['totalNum'] = 0;
                //获取新数据后页面滚动到列表顶部
                angular.element("60newsList").scrollTop = 0;
            })
        }
    };

    /**
     * 新闻操作
     * @param optType
     * @param newsId
     * @param index
     */
    var ReListOpt = function (optType, reportId, index) {
        //关闭编辑操作菜单
        ReListDataSer.reportList['list'][index]['menu'] = false;
        //根据不同操作类型相应操作
        switch (optType) {
            case 'view': {
                viewReport(index);
                break;
            }
            case 'delete': {
                deleteReport(reportId, index);
                break;
            }
            default: {
                break;
            }
        }
    };

    /**
     * 删除指定新闻数据
     */
    var deleteReport = function (reportId, index) {
        var fd = new FormData();
        var url = OverallDataSer.urlData['backEndHttp']['deleteReport'];
        fd.append('timestamp', ReListDataSer.reportList['list'][index]['timestamp']);

        //提交表单数据
        $http.post(url, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},

        }).success(function (response) {
            if (response['status_code'] == 200) {
                //重新清空列表并获取数据操作
                // ReListDataSer.reportList['list'][index].length = 0;
                // ReListDataSer.overallData['pagination']['loadedMaxPageNum'] = 0;
                // getRangeReportInfo();
                //刷新当前页面，所有数据重置
                $window.location.reload();

            } else {
                OverallGeneralSer.alertHttpRequestError("deleteReport", response['exception_code'], response['exception']);
            }
        }).error(function (err) {
            OverallGeneralSer.alertHttpRequestError("deleteReport", 600, err)
        });
    };


    /**
     * 查看详情
     */
    var viewReport = function (index) {
        //传递index，预览指定下标的诉讼数据
        ReportGeneral.viewReport(index);
    };


    /**
     * 批量删除特定新闻数据
     */
    var deleteBatchReport = function () {
        //装载需要删除的新闻列表数据
        var toDeleteIdArrays = [];
        for (var i in  ReListDataSer.reportList['list']) {
            if (ReListDataSer.reportList['list'][i]['toDelete']) {
                toDeleteIdArrays.push({
                    'timestamp': ReListDataSer.reportList['list'][i]['timestamp'],
                })
            }
        }

        var fd = new FormData();
        fd.append('deleteList', JSON.stringify(toDeleteIdArrays));
        //提交表单数据
        $http.post(OverallDataSer.urlData['backEndHttp']['deleteBranchReport'], fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},

        }).success(function (response) {
            if (response['status_code'] == 200) {
                //重新清空列表并获取数据操作
                // ReListDataSer.reportList['list'].length = 0;
                // ReListDataSer.overallData['pagination']['loadedMaxPageNum'] = 0;
                // getRangeReportInfo();
                //刷新当前页面，所有数据重置
                $window.location.reload();

            } else {
                OverallGeneralSer.alertHttpRequestError("deleteBranchReport", response['exception_code'], response['exception']);
            }
        }).error(function (err) {
            OverallGeneralSer.alertHttpRequestError("deleteBranchReport", 600, err)
        });
    };


    return {
        getRangeReportInfo: getRangeReportInfo,
        getBatchRangeReportInfo: getBatchRangeReportInfo,
        showTargetNumReportList: showTargetNumReportList,
        searchReportList: searchReportList,
        ReListOpt: ReListOpt,
        deleteBatchReport: deleteBatchReport,
    }

});