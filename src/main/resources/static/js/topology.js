var node = fishTopoFlow.node;
var canvasDom = document.getElementById("flowIns");
var fishTopo = fishTopoFlow.init(canvasDom);
fishTopo.setBackground("#F9F9F9");

//---------------------------------矩形--------------------------------------------
var rect = new node.Rect({
    shape:{width:100,height:60},
    position:[20,20],
    tooltip: "矩形",
    hoverStyle: {fill: "#FF0000"}
});

var roundRect = new node.Rect({
    shape:{width:100,height:60,r:10}, //r 圆形矩形四角半径
    position:[20,120],
    selectStyle: {stroke:'#FF0000'},
    tooltip: "圆角矩形"
});

var roundRect2 = new node.Rect({
    shape:{width:100,height:60,r:[20,0,0,0]}, //r 圆形矩形四角半径 [左上、右上、右下、左下角]
    position:[20,220],
    selectStyle: {},
    tooltip: "右上圆角矩形"
});
fishTopo.add(rect);
fishTopo.add(roundRect);
fishTopo.add(roundRect2);

//---------------------------------圆与扇形与圆环与椭圆--------------------------------------------
var circle = new node.Circle({
    shape:{r:24},
    position:[200,40],
    tooltip: "圆形"
});

var sector = new node.Sector({
    shape: {r:30, startAngle:0, endAngle:Math.PI * 0.5}, // startAngle\endAngle是弧度单位
    position:[200,120],
    tooltip: "扇形"
});

var sector2 = new node.Sector({
    shape: {r:30, startAngle:0, endAngle:Math.PI , r0:10}, // r0 内半径
    position:[200,220],
    tooltip: "圆环"
});

var ring = new node.Ring({
    shape: {r:30,  r0:10},  // r0 内半径
    position:[200,320],
    tooltip: "环形"
});

var ellipse = new node.Ellipse({
    shape: {rx:70,  ry:30},  // rx:椭圆横半轴长 ry:椭圆纵半轴长
    position:[200,420],
    tooltip: "椭圆"
});

fishTopo.add(circle);
fishTopo.add(sector);
fishTopo.add(sector2);
fishTopo.add(ring);
fishTopo.add(ellipse);

//---------------------------------心形,水滴,玫瑰形--------------------------------------------
var heart = new node.Heart({
    shape: {width:40,  height:50},
    position:[330,20],
    tooltip: "心形"
});

var droplet = new node.Droplet({
    shape: {width:10,  height:30},
    position:[330,150],
    tooltip: "水滴"
});

var rose = new node.Rose({
    shape: {r:[35], k:7, n:4},
    position:[330,250],
    tooltip: "玫瑰形"
});

fishTopo.add(heart);
fishTopo.add(droplet);
fishTopo.add(rose);

//---------------------------------正多边形、多边形--------------------------------------------
var isogon = new node.Isogon({
    shape: {r:40,  n:9},  // r半径 n几个边
    position:[450,50],
    tooltip: "正多边形"
});

var polygon = new node.Polygon({
    shape: {points:[[85.275,0], [100,25.41], [85.275,50.821], [14.138,50.821], [0,25.41], [14.138,0]]},  // r半径 n几个边
    position:[400,120],
    tooltip: "多边形"
});
fishTopo.add(isogon);
fishTopo.add(polygon);


//---------------------------------直线、拆线、贝塞尔曲线--------------------------------------------
var line = new node.Line({
    shape: {x1:550,  y1:50, x2:650, y2:50},  // x 起点 y终点
    style: {lineWidth:3},
    tooltip: "直线"
});

var polyline = new node.Polyline({
    shape: {points:[[557,138],[595,184],[615,166],[651,184] ]},
    tooltip: "拆线"
});

var bezierCurve = new node.BezierCurve({
    shape: {x1:0, y1:100, cpx1:0, cpy1:0, cpx2:0, cpy2:0, x2:100, y2:0},
    position: [550, 250],
    tooltip: "贝塞尔曲线"
});

var arc = new node.Arc({
    shape: {r:50, startAngle:0, endAngle:1.2*Math.PI},  // x 起点 y终点
    position: [580, 380],
    tooltip: "圆弧"
});

fishTopo.add(line);
fishTopo.add(polyline);
fishTopo.add(bezierCurve);
fishTopo.add(arc);

//---------------------------------星形、旋轮曲线--------------------------------------------


var star = new node.Star({
    shape: {n:5, r:30},  //r半径 n几个角
    position:[750,40],
    tooltip: "5角星形"
});

var star2 = new node.Star({
    shape: {n:7, r:30},  //r半径 n几个角
    position:[750,140],
    tooltip: "7角星形"
});

var trochoid = new node.Trochoid({
    shape: {r:50, r0:35, d:30, location:null},  //r半径 n几个角
    position:[750,240],
    tooltip: "旋轮曲线"
});
fishTopo.add(star);
fishTopo.add(star2);
fishTopo.add(trochoid);

//---------------------------------文字--------------------------------------------
var text = new node.Text({
    style:{text:"文本也可以作为独立的节点进行拖拽",fill:"#ff0000", textFont:"16px Microsoft YaHei"},
    position:[337,450]
});

fishTopo.add(text);


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
