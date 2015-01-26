/**
 * Created by Administrator on 2015/1/26.
 */
define(['jquery'],function($){
    //计算价格，点亮可购买的商品
    var compare = function(left){

        var drinkCellParent = $("#ul"),
            drinkPrice = drinkCellParent.find("li input"),
            drinkBtn = drinkCellParent.find("li button");

        drinkPrice.each(function(i){
            if(left < drinkPrice.eq(i).val()){
                drinkBtn.eq(i).attr("disabled",true);
            }
            else{
                drinkBtn.eq(i).attr("disabled",false);
            }
        })
    }
    return{
        compare:compare
    }

})