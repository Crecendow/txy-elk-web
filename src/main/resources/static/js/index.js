$(function(){
    $(".main_top a").on("click",function(){
        var address =$(this).attr("data-src");
        $("iframe").attr("src",address);
    });

    //设置frame的高度
    var frame = $("#content-frame");
    var frameHeight = $(window).height();
    frame.height(frameHeight);
});
