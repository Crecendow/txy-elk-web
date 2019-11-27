
define([
    'zcamp/modules/common/ZUtils',
    'zcamp/modules/commonprocess/common/processeditor/basenode/AbstractAtomicNode',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpAbstractTask',
    'text!zcamp/modules/commonprocess/common/processeditor/resource/svgpath/cpsimpletask.svgpath'
], function (ZUtils, AbstractAtomicNode, CpAbstractTask, iconSvgPath) {

    return ZUtils.Class.create(AbstractAtomicNode, CpAbstractTask, {

        attrPanelUrl: "zcamp/modules/commonprocess/common/processeditor/attrpanel/CpSimpleTaskAttrPanel",

        cpType: "CpSimpleTask",

        rectFillColor: '#e7f8ff',

        rectStrokeColor: '#bfd2d9',
        
        iconPath: iconSvgPath,

        getDefaultCpTplTask: function() {
            var me = this,
                defaultCpTplTask = CpAbstractTask.prototype.getDefaultCpTplTask.call(me);
    
            return fish.extend(defaultCpTplTask, {
                name: "简单环节",
                type: "SIMPLE"
            });
        }
    });
});