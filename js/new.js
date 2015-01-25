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
        useMoney = 0;


    //堆积可用金额
    dropMoney.onclick = function(e){
        var target = e.target;
        useMoney += Number(parseInt(target.value));
        leftMoney.innerHTML = Number(useMoney);
        //余额可以买的到的饮料
        compare(useMoney);
    }

    //点击退款
    backBtn.onclick = function(){
        screenClear();//液晶屏清零，退币
    }

    //商品购买
    springParent.onclick = function(e){
        var target = e.target;

        //点击购买，货物出柜
        var name = target.parentNode.getElementsByClassName('drink-name')[0].innerHTML;
        var drinkName = target.parentNode.getElementsByTagName('img')[0].src;

        var imgSrc = drinkName.substr(drinkName.length-15,15);
        console.log(imgSrc);
        out.innerHTML += name+'<br>'+'<img src=..'+imgSrc+'/>'+'<br>';

        //点击购买，计算结余
        useMoney -= Number(target.parentNode.getElementsByTagName('input')[0].value);
        leftMoney.innerHTML = useMoney;

        //如果结余不足，不足以支付的饮料不可购买
        compare(useMoney);
    }

    //3秒后无操作开始倒计时
    document.body.onmousemove=function(){

        clearTimeout(stop);
        stop=setTimeout(function(){
            screenClear();
        },20000);
    }

    //余额可以买到的饮料
    function compare(canUse){
        for(var i in spring){
            if (canUse >= spring[i].value) {
                cellButton[i].disabled = false;
            } else {
                cellButton[i].disabled = true;
            }
        }
    }

    //液晶屏清零，退币，购买区不可购买
    function screenClear(){
        pocket.innerHTML = leftMoney.innerHTML;
        leftMoney.innerHTML= '0';
        useMoney = 0;
        //购买区不可购买
        for(var i in cellButton) {
            cellButton[i].disabled = true;
        }
    }

    //面值50和100的不可投递
    dropMoneyChild[4].style.background = '#737e78';
    dropMoneyChild[5].style.background = '#737e78';
}
