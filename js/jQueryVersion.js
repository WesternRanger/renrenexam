/**
 * Created by Administrator on 2015/1/23.
 */
$(function(){
    var DOC = $(document),
        useMoney = 0,//屏幕要显示的可用余额
        outHtml = '',//出货累加
        clearId,//与无操作20秒有关
        clearTime,//20秒倒计时
        t,//20秒

        drinkCellParent = $("#ul"),
        drinkPrice = drinkCellParent.find("li input"),
        drinkBtn = drinkCellParent.find("li button");

    //购买
    $("#drop-money").on('click',function(e){
        var target = $(e.target);
        //投币后开始倒计时
        timeOver();

        useMoney += parseInt(target.val());
        //投币后屏幕显示余额);
        $("#left-money").html(useMoney);
        compare(useMoney)

    });

    //点击退币；
    $("#back").find("input").on("click",function(){
        back();
    })

    //点击购买饮料
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
        compare(left);
    })

    //20秒无操作退款
    DOC.mouseover(function(){
        clearTimeout(clearId);
        clearId = setTimeout(function(){
            back();
        },20000);
    })

    //计算价格，点亮可购买的商品
    function compare(left){
        drinkPrice.each(function(i){
            if(left < drinkPrice.eq(i).val()){
                drinkBtn.eq(i).attr("disabled",true);
            }
            else{
                drinkBtn.eq(i).attr("disabled",false);
            }
        })
    }

    //退款
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

    //20秒倒计时
    function timeOver(){
        DOC.mousemove(function(){
            clearInterval(clearTime);
            t = 20;
            $("#time").html(t);
            clearTime = setInterval(function(){
                if(t>0){
                    t--;
                }else{
                    t = 0;
                }
                console.log(t);
                $("#time").html(t);
            },1000);
        })
    }

    //设置50,100面值的背景灰色
    $("#drop-money input[disabled]").css("background","#737e78");

})
