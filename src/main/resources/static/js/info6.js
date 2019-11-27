
var node = fishTopoFlow.node;
var constants = fishTopoFlow.constants;
var canvasDom = document.getElementById("flowIns");
var fishTopo = fishTopoFlow.init(canvasDom);
fishTopo.setBackground("#F9F9F9");

//告警信息提示
/*var hostNode = new node.Image({
    style: {
        image: "../svg/cloud.svg",
        width: 80,
        height: 86
    },
    position: [300, 43]
});
fishTopo.add(hostNode);
var alarm1 = fishTopo.createAlarm(hostNode, {
    text: "二级警告",
    textFont: "16px Microsoft YaHei",
    textFill: "#FFFFFF",
    textBackground: "rgba(255,0,0,0.6)"
});
setInterval(function() {
    if (alarm1.ignore) {
        alarm1.show();
    } else {
        alarm1.hide();
    }
}, 600);*/




