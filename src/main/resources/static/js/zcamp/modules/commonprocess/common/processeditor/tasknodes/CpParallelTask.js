
define([
    'zcamp/modules/common/ZUtils',
    'zcamp/modules/commonprocess/common/processeditor/basenode/AbstractContainerNode',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpAbstractTask',
    'text!zcamp/modules/commonprocess/common/processeditor/resource/svgpath/cpparalleltask.svgpath'
], function (ZUtils, AbstractContainerNode, CpAbstractTask, iconSvgPath) {

    return ZUtils.Class.create(AbstractContainerNode, CpAbstractTask, {

        attrPanelUrl: "zcamp/modules/commonprocess/common/processeditor/attrpanel/CpParallelTaskAttrPanel",

        cpType: "CpParallelTask",

        rectFillColor: '#eafef2',

        rectStrokeColor: '#bfd2d9',

        iconPath: iconSvgPath,

        getDefaultCpTplTask: function() {
            var me = this,
                defaultCpTplTask = CpAbstractTask.prototype.getDefaultCpTplTask.call(me);
    
            return fish.extend(defaultCpTplTask, {
                name: "并发环节",
                type: "PARALLEL",
                kind: "CONTAINER"
            });
        }
    });
});