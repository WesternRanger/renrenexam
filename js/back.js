/**
 * Created by Administrator on 2015/1/26.
 */
define(['jquery'],function($) {
    var back = function(){
        var leftMoney = $("#left-money").html(),
            drinkCellParent = $("#ul"),
            drinkPrice = drinkCellParent.find("li input"),
            drinkBtn = drinkCellParent.find("li button");
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
    return{
        back:back
    }
})