/**
 * Created by 陈奇 on 14-9-29.
 */
<!--投币函数-->
window.onload = function drop(){
    var input = document.getElementsByClassName("rawIn1")[0];
    input.onblur=function(){
        setTimeout(autoOut,20000);
        var screen = document.getElementsByClassName("screen")[0];
        switch(this.value){
            case "1":
                screen.innerHTML = "您投入的金额是"+this.value+"元";
                compare(1);
                outPrice(1);

                break;
            case "5":
                screen.innerHTML = "您投入的金额是"+this.value+"元";
                compare(5);
                outPrice(5);
                break;
            case "10":
                screen.innerHTML = "您投入的金额是"+this.value+"元";
                compare(10);
                outPrice(10);
                break;
            case "20":
                screen.innerHTML = "您投入的金额是"+this.value+"元";
                compare(20);
                outPrice(20);
                break;
            default:
                screen.innerHTML = "我水平有限，只认识1、5、10、20的钱币，真是抱歉啊。。。";
        }
    }
}
<!--比较函数-->
function compare(a){//a代表输入的金额
    var td = document.getElementsByTagName("td");
    for(var i=0;i<td.length;i++){
        var price = td[i].childNodes[1];
        if(price.value<=a){
            price.style.background='darkgreen';
            price.onclick=function(){
                <!--点击后出货框显示-->
                var outBox = document.getElementsByClassName("outBox")[0];
                outBox.innerHTML = this.previousSibling.innerHTML;
                <!--投币显示屏重新结算-->
                var screen = document.getElementsByClassName("screen")[0];
                var input = document.getElementsByClassName("rawIn1")[0];
                var clickValue = this.value;
                var left = input.value-clickValue;
                screen.innerHTML="剩余金额为"+left+"元";
                <!--清除金额不够购买商品的高亮-->
//                         alert(this.previousSibling.value);
            }
        }
    }
}
function outPrice(tui,chu,xian,table_price,input_price){
    tui.onclick=function(){
        <!--点击后出货框显示-->
        chu.innerHTML = this.previousSibling.innerHTML;
        <!--投币显示屏重新结算-->
        var clickValue = this.value;
        var left = input_price.value-table_price.value;
        xian.innerHTML="剩余金额为"+left+"元";
    }
}
<!--退款函数-->
function outPrice(o){
    var out = document.getElementsByClassName("rawIn2")[0];
    out.onclick = function(){
        <!--退款款显示金额-->
        var outPrice = document.getElementsByClassName("rawIn3")[0];
        outPrice.value=o;
        <!--显示屏提示-->
        var screen = document.getElementsByClassName("screen")[0];
        screen.innerHTML="您已经取消了购物，退款请收好";
        <!--购买区域高亮取消-->
        var td = document.getElementsByTagName("td");
        for(var i=0;i<td.length;i++){
            var price = td[i].childNodes[1];
            price.style.background='';
        }
        <!--投币区域数字清零-->
        var input = document.getElementsByClassName("rawIn1")[0];
        input.value='';
    }
}
<!--20秒后自动退款函数-->
function autoOut(){
    <!--退款款显示金额-->
    var outPrice = document.getElementsByClassName("rawIn3")[0];
    var input = document.getElementsByClassName("rawIn1")[0];
    outPrice.value=input.value;
    <!--显示屏提示-->
    var screen = document.getElementsByClassName("screen")[0];
    screen.innerHTML="您已经取消了购物，退款请收好";
    <!--购买区域高亮取消-->
    var td = document.getElementsByTagName("td");
    for(var i=0;i<td.length;i++){
        var price = td[i].childNodes[1];
        price.style.background='';
    }
    <!--投币区域数字清零-->
    var input = document.getElementsByClassName("rawIn1")[0];
    input.value='';
}



