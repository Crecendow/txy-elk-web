
define([
    'zcamp/modules/common/ZUtils',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpSimpleTask',
    'text!zcamp/modules/commonprocess/common/processeditor/resource/svgpath/cpclustertpltask.svgpath'
], function (ZUtils, CpSimpleTask, iconSvgPath) {

    return ZUtils.Class.create(CpSimpleTask, {

        attrPanelUrl: "zcamp/modules/commonprocess/common/processeditor/attrpanel/CpClusterTplTaskAttrPanel",
        
        cpType: "CpClusterTplTask",

        rectFillColor: '#ffffff',

        rectStrokeColor: '#ededed',

        iconPath: iconSvgPath,

        getDefaultCpTplTask: function() {
            var me = this,
                defaultCpTplTask = CpSimpleTask.prototype.getDefaultCpTplTask.call(me);
    
            return fish.extend(defaultCpTplTask, {
                name: "集群模板环节",
                type: "TPLFUNC"
            });
        }
    });
});