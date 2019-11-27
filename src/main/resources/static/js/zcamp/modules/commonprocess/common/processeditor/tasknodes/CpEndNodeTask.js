
define([
    'zcamp/modules/common/ZUtils',
    'zcamp/modules/commonprocess/common/processeditor/basenode/AbstractCircleNode',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpAbstractTask',
    'text!zcamp/modules/commonprocess/common/processeditor/resource/svgpath/cpendnodetask.svgpath'
], function (ZUtils, AbstractCircleNode, CpAbstractTask, iconSvgPath) {

    return ZUtils.Class.create(AbstractCircleNode, CpAbstractTask, {

        attrPanelUrl: "zcamp/modules/commonprocess/common/processeditor/attrpanel/EmptyAttrPanel",

        cpType: "CpEndNodeTask",

        rectFillColor: '#fef3ed',

        rectStrokeColor: '#f2e8de',
        
        iconPath: iconSvgPath,

        getDefaultCpTplTask: function() {
            var me = this,
                defaultCpTplTask = CpAbstractTask.prototype.getDefaultCpTplTask.call(me);
    
            return fish.extend(defaultCpTplTask, {
                name: "结束环节",
                type: "ENDNODE"
            });
        }
    });
});