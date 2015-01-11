/**
 * Created by 陈奇 on 2015/1/8.
 */
window.onload = function(){
    //通过id访问dom元素
    function gid(a){return document.getElementById(a);}

    var leftMoney = gid('left-money'),//可用余额；
        dropMoney = gid('drop-money'),//投币面值父节点
        dropMoneyChild = dropMoney.getElementsByTagName('input'),//各种面值的人民币
        springParent = gid('ul'),//所有商品的父节点
        spring = springParent.getElementsByTagName("input"),//获取商品的价格
        cellButton = springParent.getElementsByTagName('button'),//商品购买按钮
        back = gid('back'),//退款按钮父节点
        backBtn = back.getElementsByTagName('input')[0],//退款按钮
        pocket = gid('pocket'),//找零
        out = gid('out'),//出货
        time = gid('time'),//倒计时
        stop = 0,//20秒无操作退款参数
        sec = 20;//倒计时秒数


    canUseMoney();//堆积可用金额
    backMoney();//退款

    //3秒后无操作开始倒计时
    document.body.onmousemove=function(){

        clearTimeout(stop);
        stop=setTimeout(function(){
            //showTime();
            pocket.innerHTML = leftMoney.innerHTML;
            drinkNotBuy();//商品选取不可购买
            dropNotMoney();//投币按钮不可点击
            backBtn.disabled = true;
            leftMoney.innerHTML= '0';
        },4000);
    }
    ////倒计时
    //function showTime(){
    //    time.innerHTML= sec;
    //    if(sec>0){
    //        sec--;
    //    } else{
    //        pocket.innerHTML = leftMoney.innerHTML;
    //        drinkNotBuy();//商品选取不可购买
    //        dropNotMoney();//投币按钮不可点击
    //        backBtn.disabled = true;
    //        //leftMoney.innerHTML= '0';
    //    }
    //    setTimeout(showTime,1000);
    //}


    //堆积可用金额
    function canUseMoney(){
        var useMoney = 0;
        dropMoney.onclick = function(e){
            var target = e.target;
            useMoney += Number(parseInt(target.value));
            leftMoney.innerHTML = Number(useMoney);
            //余额可以买的到的饮料
            canBuy();
        }
    }
    //退款
    function backMoney(){
        backBtn.onclick = function(){
            pocket.innerHTML = leftMoney.innerHTML;
            leftMoney.innerHTML= '0';
            drinkNotBuy();//商品选取不可购买
            dropNotMoney();//投币按钮不可点击
        }
    }


    //余额可以买到的饮料
    function canBuy(){
        var canUse = Number(leftMoney.innerHTML);
        for(var i in spring){
            if (canUse >= spring[i].value) {
                cellButton[i].disabled = false;
                //点击投入金钱可以买到的饮料出柜。
                buy();
            } else {
            }
        }
    }



    //商品购买
    function buy(){
        //给商品父节点绑定click事件；
        springParent.onclick = function(e){
            var target = e.target;

            //点击购买，货物出柜
            var name = target.parentNode.getElementsByClassName('drink-name')[0].innerHTML;
            var drinkName = target.parentNode.getElementsByTagName('img')[0].src;

            var imgSrc = drinkName.substr(drinkName.length-15,15);
            console.log(imgSrc);
            out.innerHTML += name+'<br>'+'<img src=..'+imgSrc+'/>'+'<br>';

            //点击购买，计算结余
            var secBuyLeft = Number(leftMoney.innerHTML) - Number(target.parentNode.getElementsByTagName('input')[0].value);
            leftMoney.innerHTML = secBuyLeft;

            //如果结余不足，不足以支付的饮料不可购买
            for(var i in spring) {
                if (secBuyLeft < spring[i].value) {
                    cellButton[i].disabled = true;
                }
            }

            //一旦购买商品后，不可再投币
            dropNotMoney();

        }
    }

    //商品选取不可购买
    function drinkNotBuy(){
        for(var i in cellButton) {
            cellButton[i].disabled = true;
        }
    }

    //投币按钮不可点击
    function dropNotMoney(){
        for(var i in dropMoneyChild) {
            dropMoneyChild[i].disabled = true;
            dropMoneyChild[i].style.background = '#737e78';
        }
    }
    dropMoneyChild[4].style.background = '#737e78';
    dropMoneyChild[5].style.background = '#737e78';
}
