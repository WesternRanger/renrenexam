/**
 * Created by 陈奇 on 2015/1/8.
 */
window.onload = function(){
    var leftMoney = document.getElementById("left-money");//可用余额；
    var dropMoney = document.getElementById("drop-money");//投币面值父节点
    var dropMoneyChild = dropMoney.getElementsByTagName('input');//各种面值的人民币
    var useMoney = 0;

    var springParent = document.getElementById("ul");//所有商品的父节点
    var spring = springParent.getElementsByTagName("input");//获取商品的价格

    var cellButton = springParent.getElementsByTagName('button');//商品购买按钮

    var back = document.getElementById('back');//退款按钮父节点
    var backBtn = back.getElementsByTagName('input')[0];//退款按钮

    var pocket = document.getElementById('pocket');//找零

    var out = document.getElementById('out');//出货

    var secBuyLeft;//购物后，结算剩余
    var X;//获取当前横坐标
    var Y;//获取当前纵坐标
    var imgSrc;

    //可用余额
    canUseMoney();
    //退款
    backMoney();

    //堆积可用金额
    function canUseMoney(){
        dropMoney.onclick = function(e){
            var target = e.target;
            useMoney += Number(parseInt(target.value));
            leftMoney.innerHTML = Number(useMoney);
            //余额可以买的到的饮料
            canBuy();
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

    //退款按钮
    function backMoney(){
        backBtn.onclick = function(){
            pocket.innerHTML = leftMoney.innerHTML;
            leftMoney.innerHTML= '0';
            for(var i in cellButton) {
                cellButton[i].disabled = true;
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

            imgSrc = drinkName.substr(drinkName.length-10,10);
            out.innerHTML += name+'<br>'+'<img src='+imgSrc+'/>'+'<br>';

            //点击购买，计算结余
            secBuyLeft = Number(leftMoney.innerHTML) - Number(target.parentNode.getElementsByTagName('input')[0].value);
            leftMoney.innerHTML = secBuyLeft;

            //如果结余不足，不足以支付的饮料不可购买
            for(var i in spring) {
                if (secBuyLeft < spring[i].value) {
                    cellButton[i].disabled = true;
                }
            }

            //一旦购买商品后，不可再投币
            for(var i in dropMoneyChild) {
                dropMoneyChild[i].disabled = true;
            }

        }
    }

    var aaa;
    document.body.onmousemove=function(){
        clearTimeout(aaa);
        aaa=setTimeout(function(){
            autoBackMoney();
        },20000);

    }

    //自动退币
    function autoBackMoney(){
        pocket.innerHTML = leftMoney.innerHTML;
        leftMoney.innerHTML= '0';
        for(var i in cellButton) {
            cellButton[i].disabled = true;
        }
    }
}
