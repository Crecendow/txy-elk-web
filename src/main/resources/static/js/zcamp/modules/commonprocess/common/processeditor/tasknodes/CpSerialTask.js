
define([
    'zcamp/modules/common/ZUtils',
    'zcamp/modules/commonprocess/common/processeditor/basenode/AbstractContainerNode',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpAbstractTask',
    'text!zcamp/modules/commonprocess/common/processeditor/resource/svgpath/cpserialtask.svgpath'
], function (ZUtils, AbstractContainerNode, CpAbstractTask, iconSvgPath) {

    return ZUtils.Class.create(AbstractContainerNode, CpAbstractTask, {

        attrPanelUrl: "zcamp/modules/commonprocess/common/processeditor/attrpanel/CpSerialTaskAttrPanel",

        cpType: "CpSerialTask",

        rectFillColor: '#efeaf1',

        rectStrokeColor: '#bfd2d9',

        iconPath: iconSvgPath,

        getDefaultCpTplTask: function() {
            var me = this,
                defaultCpTplTask = CpAbstractTask.prototype.getDefaultCpTplTask.call(me);
    
            return fish.extend(defaultCpTplTask, {
                name: "串行环节",
                type: "SERIAL",
                kind: "CONTAINER"
            });
        }
    });
});