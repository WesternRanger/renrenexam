/**
 * Created by Administrator on 2015/1/26.
 */
//20秒倒计时
define(['jquery'],function($) {

    var timeOver = function() {

        var clearTime,//20秒倒计时
            t,//20秒
            DOC = $(document);

        DOC.mousemove(function () {
            clearInterval(clearTime);
            t = 20;
            $("#time").html(t);
            clearTime = setInterval(function () {
                if (t > 0) {
                    t--;
                } else {
                    t = 0;
                }
                //console.log(t);
                $("#time").html(t);
            }, 1000);
        })
    }
    return{
        timeOver:timeOver
    }
})