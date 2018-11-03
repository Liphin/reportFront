/**
 * Created by Administrator on 2018/11/3.
 */
var url = require('url');
var util = require('util');
var request = require('request');
var serverSerData = require('../serverSerData');

function MiniSer() {

    //发送动态信息数据的url
    var getUserOpenIdUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code';

    /**
     * 微信小程序获取用户登录时的openId
     */
    this.getMiniUserOpenId = function (req, res) {
        var arg = url.parse(request.url, true).query;
        var js_code = arg['js_code'];

        var uri = util.format(getUserOpenIdUrl, serverSerData.appConfig['appid'], serverSerData.appConfig['secret'], js_code);
        request.get(uri, function (err, resData, body) {
            if (!err && resData['statusCode'] == 200) {
                console.log(body);
                console.log(JSON.parse(body));
                res.send(body['openid'])

            } else {
                res.send('fail')
            }
        });
    }

}

module.exports = MiniSer;