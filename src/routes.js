//import  Router from 'koa-router';
var Router = require('koa-router');
var koaBody = require('koa-body')();

//import playList from './player'

var playList = require('./player');

var router = new Router();
var uid = 0;

router.post('/login',koaBody,
    function *(next) {
        console.log("get url:/login")
        var req = JSON.parse(this.request.body);
        var userName = req.userName || "未命名";

        var player = {
            uid: ++uid,
            name: userName
        }
        playList.push(player);

        this.cookies.set('userName',new Buffer(userName).toString('base64'));
        this.cookies.set('uid',uid);

        var data = {
            player
        }
        var code = 200;
        this.body = {
            data,
            code
        }
    }
);

router.get('/logup',koaBody,
    function *(next) {
        console.log("get url:/logup")

        var userStr =  this.cookies.get('userName');

        var data = {};
        var code =200;

        if(userStr) {
            var userName =  new Buffer(userStr,'base64').toString();
            var uid = this.cookies.get('uid');
            var flag = false;
            playList.forEach(function(item){
                if(item.uid == uid){
                    data = item;
                    flag = true;
                }
            })
            if(flag){
                code = 200;
            }else{
                code = 0;
                this.cookies.set('userName',null);
                this.cookies.set('uid',null);
            }
        }else {
            code = 0;
        }

        this.body = {
            data,
            code
        }
    }
);

router.get('/menus', function *(next) {
    console.log("get url:/menus")
    var data = [
            {
                id: 100001,
                title: '菜单1',
                url: '/demo1'
            },{
                id: 100002,
                title: '菜单2',
                url: '/demo2'
            }
        ]
    var code = 200;
    this.body = {
        data,
        code
    }
});

//export default router;
module.exports = router;