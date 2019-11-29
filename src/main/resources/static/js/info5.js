var node = fishTopoFlow.node;
var flowLink = fishTopoFlow.link;
var constants = fishTopoFlow.constants;
var graphic = fishTopoFlow.graphic;
var Tree = fishTopoFlow.layout.Tree;
var canvasDom = document.getElementById("flowIns");
var myVar;


layui.use(['layer', 'form'], function(){
    var layer = layui.layer
        ,form = layui.form;

});

/*
$(function(){

     myVar = setInterval(getHostNodeStatus,5000);
});*/

// var fishTopo = fishTopoFlow.init(canvasDom);
var fishTopo = fishTopoFlow.init(canvasDom, {
    linkModify: true,
    beforeDelete:function(event) {
        var nodeOrline = event.target;
        fishTopo.remove(nodeOrline, {trigger:false});
        return false;
    },
    beforeCreate:function(event) {
        if(event.endNode && event.connectOptions) {
            var nodeOrline = event.target;
            fishTopo.createConnectorByNodes(event.target, event.endNode, event.connectOptions);
            return false;
        }
    }
});
fishTopo.setBackground("#F9F9F9");

var hostNode;
var alarm1;

function getHostNodeStatus(){

    $.get({
        url: "/searchIPAddress",
        data: {
            hostValue: $("#hostValue").val(),
        },
        success: function (data) {
            if(data == "500"){
                alarm1.hide();
            }
            else{
                alarm1.show();


                // setInterval(function(){
                //     if (alarm1.ignore) {
                //         alarm1.show();
                //     } else {
                //         alarm1.hide();
                //     }
                // }, 600);

            }
        }
    });
}




function button1(){
     hostNode = new node.Image({
        style: {
            image: '../svg/cloud1.svg',
            width:120,
            height:120
        },
        operationIcons: [
            { name: constants.DEL},
            { name: constants.LINK} ,
            { name: constants.FOLD },
            { name: constants.CURVE }
        ],
        position:[400,43]
    });
    hostNode.on("dblclick",function(e) {
        var event = {type:"item:dblclick",data:e.target.style.text}
        fishTopo.trigger(event.type, event);
    });
    fishTopo.add(hostNode);
    alarm1 = fishTopo.createAlarm(hostNode,{
        text:"二级警告",
        textFont:"16px Microsoft YaHei",
        textFill:"#FFFFFF",
        textBackground:"rgba(255,0,0,0.6)"
    });

    alarm1.hide();
    myVar = setInterval(getHostNodeStatus,5000);

/*
    setInterval(function(){
        $.ajax({
            url: "/getStatus",
            success: function (data) {
                if(data == "normal"){
                    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                    parent.layer.close(index); //再执行关闭
                }
                else{
                    layer.msg("添加失败");
                }
            }
        });
    }, 600);*/
}



function button2() {
    var serverNode = new node.Image({
        style: {
            image: '../svg/circle.svg',
            width:120,
            height:120
        },
        operationIcons: [
            { name: constants.DEL},
            { name: constants.LINK} ,
            { name: constants.FOLD },
            { name: constants.CURVE }
        ],
        position:[150,43]
    });
    fishTopo.add(serverNode);
}

function button3() {
    var serverNode = new node.Image({
        style: {
            image: '../svg/cloud.svg',
            width:120,
            height:120
        },
        operationIcons: [
            { name: constants.DEL},
            { name: constants.LINK} ,
            { name: constants.FOLD },
            { name: constants.CURVE }
        ],
        position:[150,43]
    });

}

function button4() {
    var serverNode = new node.Image({
        style: {
            image: '../svg/cluster.svg',
            width:120,
            height:120
        },
        operationIcons: [
            { name: constants.DEL},
            { name: constants.LINK} ,
            { name: constants.FOLD },
            { name: constants.CURVE }
        ],
        position:[150,43]
    });
    fishTopo.add(serverNode);
}

function button5() {
    var serverNode = new node.Image({
        style: {
            image: '../svg/host.svg',
            width:120,
            height:120
        },
        operationIcons: [
            { name: constants.DEL},
            { name: constants.LINK} ,
            { name: constants.FOLD },
            { name: constants.CURVE }
        ],
        position:[150,43]
    });
    fishTopo.add(serverNode);
}

function button6() {
    var serverNode = new node.Image({
        style: {
            image: '../svg/net.svg',
            width:120,
            height:120
        },
        operationIcons: [
            { name: constants.DEL},
            { name: constants.LINK} ,
            { name: constants.FOLD },
            { name: constants.CURVE }
        ],
        position:[150,43]
    });
    fishTopo.add(serverNode);
}

function button7() {
    var serverNode = new node.Image({
        style: {
            image: '../svg/user.svg',
            width:120,
            height:120
        },
        operationIcons: [
            { name: constants.DEL},
            { name: constants.LINK} ,
            { name: constants.FOLD },
            { name: constants.CURVE }
        ],
        position:[150,43]
    });
    fishTopo.add(serverNode);
}



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


fishTopo.on("item:dblclick",function(e) {
    layer.msg("点击了一下哥哥");

    layer.open({
        type:2,
        title:'修改IP地址信息',
        area:["300px","200px"],
        content:"/edit",
        success:function(dom){
            $iframeDom=$(dom[0]).find("iframe").eq(0).contents();
            $iframeDom.find("#IP_address").val(11);
        }
    });

});

// toolbar
var $btnDefault = $('.js-toolbar .mutex .btn-default');
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

$('.btn-connect').click(function(e) {
    console.log(e.target.name);
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

$('.js-btnGridLine').click(function() {
    var showGridLine = this.checked;
    fishTopo.forbidGridLine(showGridLine);
});






