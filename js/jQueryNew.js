/**
 * Created by Administrator on 2015/1/23.
 */
$(function(){
    //$("#ul li #one").attr('disabled',false);
    var useMoney = 0,//屏幕要显示的可用余额
        leftMoney;
    var drinkCell = $("#ul li");
    var drinkPrice = drinkCell.find("input");
    var drinkBtn = drinkCell.find("button");

    $("#drop-money").on('click',function(e){
        var target = e.target;
        useMoney += parseInt(target.value);
        //投币后屏幕显示余额);
        $("#left-money").html(useMoney);
        compare(useMoney)
    });

    function compare(left){
        for(var i in drinkPrice){
            if(left >= drinkPrice[i].value){
                var index = i;
                console.log(drinkPrice[i]);
                //console.log(i);
                console.log(drinkBtn[i]);
                console.log(drinkPrice[i].parentNode)
                drinkBtn[index].attr('disabled',false);
            }
        }
    }

})
