/**
 * Created by Administrator on 2015/1/23.
 */
$(function(){
    var DOC = $(document),
        useMoney = 0,//屏幕要显示的可用余额
        outHtml = '',//出货累加

        drinkCellParent = $("#ul"),
        drinkPrice = drinkCellParent.find("li input"),
        drinkBtn = drinkCellParent.find("li button");


    //购买
    drop();

    //退币；
    back();

    buy();//点击购买饮料

    function drop(){
        $("#drop-money").on('click',function(e){
            var target = $(e.target);
            useMoney += parseInt(target.val());
            //投币后屏幕显示余额);
            $("#left-money").html(useMoney);
            compare(useMoney)
        });
    }

    //退币，液晶屏重置
    function back(){
        $("#back").find("input").on("click",function(){
            var leftMoney = $("#left-money").html();
            $("#pocket").html(leftMoney);
            $("#left-money").html("0");
        })
    }

    //计算价格，点亮可购买的商品
    function compare(left){
        drinkPrice.each(function(i){
            if(left >= drinkPrice.eq(i).val()){
                drinkBtn.eq(i).attr("disabled",false);
            }
        })
        //for(var i in drinkPrice){
        //    if(left >= drinkPrice[i].value){
        //        drinkBtn.eq(i).attr('disabled',false);
        //        //点击商品购买按钮
        //
        //    }
        //}
    }

    //点击商品购买按钮
    function buy(){
        drinkCellParent.on("click",function(e){
            //获取事件对象；
            var target = $(e.target);

            var targetParent = target.parent();
            //获取饮料名字
            var targetName = targetParent.children(".drink-name").html();
            //获取饮料图片地址
            var targetSrc = targetParent.children("img").attr("src");

            console.log(targetName);
            console.log(targetSrc);
            outHtml += targetName+'<br>'+'<img src="'+targetSrc+'"/>'+'<br>'
            $("#out").html(outHtml);
        })
    }

})
