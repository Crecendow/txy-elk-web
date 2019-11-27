var node = fishTopoFlow.node;
var flowLink = fishTopoFlow.link;
var constants = fishTopoFlow.constants;
var each = fishTopoFlow.util.each;
var canvasDom = document.getElementById("flowIns");
var fishTopo = fishTopoFlow.init(canvasDom, {
    linkModify: true,
    beforeDelete:function(event) {
        var nodeOrline = event.target;
        fish.confirm("are you sure delete?").result.then(function() {
            fishTopo.remove(nodeOrline, {trigger:false});
        });
        return false;
    },
    beforeCreate:function(event) {
        if(event.endNode && event.connectOptions) {
            fish.confirm("are you sure connection?").result.then(function() {
                //成功则创建一个新的连线
                fishTopo.createConnectorByNodes(event.target, event.endNode, event.connectOptions);
            }, function () {
                //失败情况
                var origin = event.origin;   //包含初始连线的起始节点信息和线段配置项
                if (origin.startNode) {
                    //如果有初始连线则还原初始的连线
                    fishTopo.createConnectorByNodes(origin.startNode, origin.endNode, origin.options);
                }
            }).always(function () {
                //无论画线成功失败都要清空所有的连接点
                fishTopo.hideConnectorPoint();
            });
            return false;
        }
    }
});
fishTopo.setBackground("#F9F9F9");

var lineCircle = new node.Circle({
    shape:{r:50},
    position:[300, 100],
    style: {
        text: "操作:线段",
        fill: "#167CFF",
        stroke: "rgb(255,255,255)",
        textFont: '14px Microsoft YaHei'
    },
    operationIcons: [
        { name: constants.DEL},
        { name: constants.LINK} ,
        { name: constants.FOLD },
        { name: constants.CURVE }
    ],
    name:"circle1"
});

fishTopo.add(lineCircle);

var customeRect = new node.Rect({
    shape:{ width: 100, height: 60},
    position:[500, 100],
    style: {
        text: "自定义操作",
        fill: "#167CFF"
    },
    operationIcons: [
        { name: constants.LINK} ,
        { name: constants.FOLD },
        { name: constants.CURVE },
        {
            name: "loop",
            iconPath: "path://M23.715,14.546c-0.104,0.172-0.051,0.392,0.115,0.492c0.008,0.004,0.014,0.009,0.018,0.011l5.969,3.622l4.158-6.165c0.078-0.125,0.068-0.286-0.021-0.401c-0.078-0.115-0.229-0.169-0.367-0.133l-2.969,0.744l-0.152,0.038C28.193,8.849,24.047,6.443,19.5,6.443c-7,0-12.695,5.695-12.695,12.694S12.5,31.832,19.5,31.832c5.273,0,10.053-3.319,11.896-8.258c0.354-0.952-0.129-2.012-1.082-2.367c-0.953-0.356-2.012,0.129-2.367,1.081c-1.307,3.508-4.703,5.865-8.447,5.865c-4.973,0-9.016-4.044-9.016-9.015s4.043-9.015,9.016-9.015c2.863,0,5.502,1.345,7.189,3.582l-2.662,0.669C23.902,14.372,23.783,14.434,23.715,14.546z"
        }
    ],
    name:"rect1"
});
fishTopo.add(customeRect);

var imageNode = fishTopo.createNode("Image", {
    style: {
        isAllowEdit: false,
        x: 0,
        y: 0,
        image: 'img/img-cic/icon-send-sms.svg',
        width: 110,
        height: 60,
        textFont: "14px Microsoft YaHei",
        textPosition:"insideBottom",
        textFill:"white",
        fill: "#FFFFFF",
        text:"Create..."
    },
    tooltip:"Create a node name test",
    position: [400,300],
    operationIcons: [
        {name: 'DEL'},
        {name: 'STRAIGHT', options: {
                symbol: {
                    type: "arrow",
                    // 箭头颜色
                    color: "#BBBBBB"
                },
                style: {
                    // 线条颜色
                    stroke: "#BBBBBB",
                    lineType: 'straight'
                }
            }
        },
        {name: 'JAGGED'},
        {name: 'CURVE'}]
});
fishTopo.add(imageNode);
imageNode.tooltip = "可以更新提示";
fishTopo.on('click',function(event) {
    var model = event.target.model;
    if(fishTopo.Flow.isLink(model)) {
        var lineNode = event.target;
        fishTopo.addLineChangeIcon(lineNode); //更改线类型图标
        fishTopo.addLineDeleteIcon(lineNode); //删除图标
        //自定义节点
        if(lineNode.startNode === lineCircle && lineNode.endNode === imageNode) {
            fishTopo.addIcon("icon2", {
                iconPath: "path://M8.2,13.6V3.9H6.3v9.7H3.1v14.9h3.3v9.7h1.8v-9.7h3.3V13.6H8.2z M9.7,24.4H4.8v-1.4h4.9V24.4z M9.7,19.1H4.8v-1.4h4.9V19.1z",
                lineNode: lineNode,
                callback: function(lineNode) {
                    alert("连线自定义图标被点击")
                }
            })
        }
    }
});

// 双击事件  线段双击 弹出对话框输入线上文字
fishTopo.on('dblclick', function(e) {
    var nodeModel = e.target.model;
    if (fishTopo.Flow.isLink(nodeModel)) {
        var link = e.target;
        fish.prompt('请要设置的线上文字', 'test').result.then(function(data) {
            link.setStyle({text:{
                    'text':data
                }});
        });
    }
});

fishTopo.on("OperationNode:loopClick", function(e){
    var clink = new flowLink.Curve(e.event.node, e.event.node, {
        style: {
            lineDash: [2]
        },
        text: {
            text: 'loop'
        },
        pos: 'bottom-20,bottom+20'
    })
    fishTopo.add(clink);
})

$('.btn-connect').click(function(e) {
    fishTopo.showConnectorPoint(e.currentTarget.name, {
        symbol: {
            // 箭头颜色
            color: "#BBBBBB"
        },
        style: {
            // 线条颜色
            stroke: "#BBBBBB",
        }
    });
});

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
