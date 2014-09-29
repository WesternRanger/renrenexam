/**
 * Created by 陈奇 on 14-9-29.
 */
$(function(){
    $(".rawIn1").bind("blur",blurFunc);
//    $(".rawIn1").bind("blur",compare);
})
function blurFunc(){
    var inVal = this.value;
    var scr = $(".screen");
    switch (inVal){
        case "1":
            scr.html("您投了1元硬币");
            compare();
            break;
        case "5":
            scr.html("您投了5元硬币");
            break;
        case "10":
            scr.html("您投了10元硬币");
            break;
        case "20":
            scr.html("您投了20元硬币");
            break;
        default :
            scr.html("我太渣了,不认识这个面值的钱。。");
    }
}
function compare(){
    var pro = $(".pro");
//    var val = $(".rawIn1").value;
    for(var i=0;i<pro.length;i++){
        if(this >= pro[i].value){
            pro[i].css("background","red");
        }
    }
}
