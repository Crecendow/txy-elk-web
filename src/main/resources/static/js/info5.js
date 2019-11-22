var node = fishTopoFlow.node;
var constants = fishTopoFlow.constants;
var canvasDom = document.getElementById("flowIns");
var fishTopo = fishTopoFlow.init(canvasDom);
fishTopo.setBackground("#F9F9F9");

var serverNode = new node.Image({
    style: {
        image: 'img/statistics/server.png',
        width:21,
        height:51
    },
    position:[150,43]
});
fishTopo.add(serverNode);
fishTopo.createAlarm(serverNode,{
    text:"2 W",
    textFont:"16px Microsoft YaHei",
    textFill:"#FFFFFF",
    textBackground:"rgba(255,0,0,0.6)"
});//创建小图片和节点绑定


var hostNode = new node.Image({
    style: {
        image: 'img/statistics/host.png',
        width:30,
        height:26
    },
    position:[300,43]
});
fishTopo.add(hostNode);
var alarm1 = fishTopo.createAlarm(hostNode,{
    text:"二级警告",
    textFont:"16px Microsoft YaHei",
    textFill:"#FFFFFF",
    textBackground:"rgba(255,0,0,0.6)"
});
setInterval(function(){
    if (alarm1.ignore) {
        alarm1.show();
    } else {
        alarm1.hide();
    }
}, 600);

// toolbar
var $btnDefault = $('.js-toolbar .mutex .btn-default');
$btnDefault.click(function() {
    $(this).addClass('active').siblings().removeClass('active');
});
$('.js-default').click(function() {
    fishTopo.option("mouseMode", 'default');
});
$('.js-selection').click(function() {
    fishTopo.option("mouseMode", 'drag-select');
});
$('.js-translation').click(function() {
    fishTopo.option("mouseMode", 'drag-move');
});
$('.js-enlarge').click(function() {
    fishTopo.zrScale("enlarge");
});
$('.js-narrowing').click(function() {
    fishTopo.zrScale("narrowing");
});
$('.js-zoomreset').click(function() {
    fishTopo.zrScale(1);
});
$('.js-export-json').click(function() {
    fish.popupView({
        url: "views/import-export/export-json-dialog.js",
        viewOption:{json:JSON.stringify(fishTopo.toJson(), null, 4)}
    })
    console.log(JSON.stringify(fishTopo.toJson(), null, 4));
});
$('.js-export-png').click(function() {
    var url = fishTopo.toDataURL();
    var w = window.open('about:blank', 'image from canvas');
    w.document.write("<img src='" + url + "' alt='from canvas'/>");
});
