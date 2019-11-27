var BPMNNode = require('../bpmn-node.js');
BPMNNode.registerClass(CustomNode, "CustomNode");

var type = "CustomNode";
var x = 100;
var y = 100;
fishTopo.addNode(type, x, y, {
    name: type,   //节点的名称
    operationIcons:[{name:'DEL'},{ name: 'STRAIGHT' },{name:'JAGGED'},{ name: 'CURVE' }],
    // 增加节点操作图标 上面分别是默认的"删除、直线、折线、曲线"，
    // 也可以增加自定图标 如{name: "custom1", iconPath: "img/host.png", callback: function(e) { alert(e.data.name + " clicked") }} //e.node是当前的节点
    userData:{businessData:'我是业务数据,通过Bpmn.getUserData可获取'}
    // 增加节点的自定义业务，可以通过Bpmn.getUserData(node)获取
});

fishTopo.addNode(type, x, y, {
    name: type,   //节点的名称
    operationIcons:[{name:'DEL'},{ name: 'STRAIGHT' },{name:'JAGGED'},{ name: 'CURVE' }],
    // 增加节点操作图标 上面分别是默认的"删除、直线、折线、曲线"，
    // 也可以增加自定图标 如{name: "custom1", iconPath: "img/host.png", callback: function(e) { alert(e.data.name + " clicked") }} //e.node是当前的节点
    userData:{businessData:'我是业务数据,通过Bpmn.getUserData可获取'}
    // 增加节点的自定义业务，可以通过Bpmn.getUserData(node)获取
});
