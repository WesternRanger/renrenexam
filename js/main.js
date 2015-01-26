/**
 * Created by Administrator on 2015/1/26.
 */
require.config({
    paths: {
        'jquery': 'jquery-2.1.3.min'
    }
});

require(['compare','timeOver','jquery'], function(Compare,TimeOver,$) {
    var DOC = $(document),
        useMoney = 0,//屏幕要显示的可用余额
        outHtml = '',//出货累加
        clearId,//与无操作20秒有关

        drinkCellParent = $("#ul"),
        drinkPrice = drinkCellParent.find("li input"),
        drinkBtn = drinkCellParent.find("li button");

    //设置50,100面值的背景灰色
    $("#drop-money input[disabled]").css("background","#737e78");

    //投币区
    $('#drop-money').on('click',function(e){
        var target = $(e.target);
        //投币后开始倒计时
        TimeOver.timeOver();

        useMoney += parseInt(target.val());
        //投币后屏幕显示余额);
        $("#left-money").html(useMoney);
        Compare.compare(useMoney)

    });

    //退币区；
    $("#back").find("input").on("click",function(){
        back();
    })

    //购买区
    drinkCellParent.on("click",function(e){
        //获取事件对象；
        var target = $(e.target);
        //获取点击父元素li
        var targetParent = target.parent();
        //获取饮料名字
        var targetName = targetParent.children(".drink-name").html();
        //获取饮料图片地址
        var targetSrc = targetParent.children("img").attr("src");
        //累加购买到的商品
        outHtml += targetName+'<br>'+'<img src="'+targetSrc+'"/>'+'<br>'
        $("#out").html(outHtml);

        //获取点击的li内的input的value
        var targetVal = targetParent.children("input").val();
        //计算购买商品之后的结余
        useMoney -= targetVal;
        var left = useMoney;
        $("#left-money").html(left);

        //重新计算点亮的按钮
        Compare.compare(left);
    })

    //20秒无操作退款
    DOC.mouseover(function(){
        clearTimeout(clearId);
        clearId = setTimeout(function(){
            back();
        },20000);
    })

    function back(){
        var leftMoney = $("#left-money").html();
        //退币口
        $("#pocket").html(leftMoney);
        //液晶屏清零
        $("#left-money").html("0");
        //屏幕计价重新开始
        useMoney = 0;
        //购买区不可购买
        drinkPrice.each(function(i) {
            drinkBtn.eq(i).attr("disabled",true);
        });
    }

});