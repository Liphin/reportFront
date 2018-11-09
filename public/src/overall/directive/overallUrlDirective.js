/**
 * Created by Administrator on 2018/2/28.
 */
var overallModule = angular.module('Angular');

/**
 * 退出登录页面
 */
overallModule.directive('signOut', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/overall/tmpl/signOut.html'
    };
}]);

/**
 * 数据列表
 */
overallModule.directive('reportList', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/report/list/sub/reportList/reportList.html'
    };
}]);

/**
 * 详情页面
 */
overallModule.directive('viewReport', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/report/list/sub/viewReport/viewReport.html'
    };
}]);







