var node = fishTopoFlow.node;
var flowLink = fishTopoFlow.link;
var constants = fishTopoFlow.constants;
var canvasDom = document.getElementById("flowIns");




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



function button1(){
    var hostNode = new node.Image({
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
    alert(hostNode);
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
    fishTopo.createAlarm(serverNode,{
        text:"2 W",
        textFont:"16px Microsoft YaHei",
        textFill:"#FFFFFF",
        textBackground:"rgba(255,0,0,0.6)"
    });//创建小图片和节点绑定
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
    fishTopo.add(serverNode);
    fishTopo.createAlarm(serverNode,{
        text:"2 W",
        textFont:"16px Microsoft YaHei",
        textFill:"#FFFFFF",
        textBackground:"rgba(255,0,0,0.6)"
    });//创建小图片和节点绑定

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
    fishTopo.createAlarm(serverNode,{
        text:"2 W",
        textFont:"16px Microsoft YaHei",
        textFill:"#FFFFFF",
        textBackground:"rgba(255,0,0,0.6)"
    });//创建小图片和节点绑定

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
    fishTopo.createAlarm(serverNode,{
        text:"2 W",
        textFont:"16px Microsoft YaHei",
        textFill:"#FFFFFF",
        textBackground:"rgba(255,0,0,0.6)"
    });//创建小图片和节点绑定

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
    fishTopo.createAlarm(serverNode,{
        text:"2 W",
        textFont:"16px Microsoft YaHei",
        textFill:"#FFFFFF",
        textBackground:"rgba(255,0,0,0.6)"
    });//创建小图片和节点绑定

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
    fishTopo.createAlarm(serverNode,{
        text:"2 W",
        textFont:"16px Microsoft YaHei",
        textFill:"#FFFFFF",
        textBackground:"rgba(255,0,0,0.6)"
    });//创建小图片和节点绑定

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


