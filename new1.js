/**
 * Created by 陈奇 on 2015/1/8.
 */
function Machine(p){
    var self = this;

    self.useMoney = 0;
    self.secBuyLeft;//购物后，结算剩余
    self.X;//获取当前横坐标
    self.Y;//获取当前纵坐标

    self.leftMoney = document.getElementById(p.leftMoney);//可用余额；
    self.dropMoney = document.getElementById(p.dropMoney);//投币面值父节点
    self.dropMoneyChild = self.dropMoney.getElementsByTagName(p.input);//各种面值的人民币
    self.springParent = document.getElementById(p.ul);//所有商品的父节点
    self.spring = self.springParent.getElementsByTagName(p.input);//获取商品的价格
    self.cellButton = self.springParent.getElementsByTagName(p.button);//商品购买按钮
    self.back = document.getElementById(p.back);//退款按钮父节点
    self.backBtn = self.back.getElementsByTagName(p.input)[0];//退款按钮
    self.pocket = document.getElementById(self.pocket);//找零
    self.out = document.getElementById(p.out);//出货

    //余额可以买到的饮料
    self.canBuy = function(){

        var canUse = Number(self.leftMoney.innerHTML);
        for(var i in self.spring){
            if (canUse >= self.spring[i].value) {
                self.cellButton[i].disabled = false;
                //点击投入金钱可以买到的饮料出柜。
                self.buy();
            } else {}
        }
    }



    //商品购买
    self.buy = function(){
        //给商品父节点绑定click事件；
        self.springParent.onclick = function(e){
            var target = e.target;

            //点击购买，货物出柜
            var name = target.parentNode.getElementsByTagName('h3')[0].innerHTML;
            self.out.innerHTML += name+'<br>';

            //点击购买，计算结余
            self.secBuyLeft = Number(self.leftMoney.innerHTML) - Number(target.parentNode.getElementsByTagName('input')[0].value);
            self.leftMoney.innerHTML = self.secBuyLeft;

            //如果结余不足，不足以支付的饮料不可购买
            for(var i in self.spring) {
                if (self.secBuyLeft < self.spring[i].value) {
                    self.cellButton[i].disabled = true;
                }
            }

            //一旦购买商品后，不可再投币
            for(var i in self.dropMoneyChild) {
                self.dropMoneyChild[i].disabled = true;
            }

        }
    }

    //堆积可用金额
    Machine.prototype.canUseMoney = function(){
        var self = this;

        self.dropMoney.onclick = function(e){
            var target = e.target;
            self.useMoney += Number(parseInt(target.value));
            self.leftMoney.innerHTML = Number(self.useMoney);
            //余额可以买的到的饮料
            self.canBuy();
        }
    }

    //退款按钮
    Machine.prototype.backMoney = function(){
        var self = this;

        self.backBtn.onclick = function(){
            self.pocket.innerHTML = self.leftMoney.innerHTML;
            self.leftMoney.innerHTML= '0';
            for(var i in self.cellButton) {
                self.cellButton[i].disabled = true;
            }
        }
    }
}
