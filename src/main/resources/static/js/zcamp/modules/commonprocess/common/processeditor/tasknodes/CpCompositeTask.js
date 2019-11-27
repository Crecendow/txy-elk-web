
define([
    'zcamp/modules/common/ZUtils',
    'zcamp/modules/commonprocess/common/processeditor/basenode/AbstractAtomicNode',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpAbstractAttrTask',
    'text!zcamp/modules/commonprocess/common/processeditor/resource/svgpath/cpcompositetask.svgpath'
], function (ZUtils, AbstractAtomicNode, CpAbstractAttrTask, iconSvgPath) {

    return ZUtils.Class.create(AbstractAtomicNode, CpAbstractAttrTask, {

        attrPanelUrl: "zcamp/modules/commonprocess/common/processeditor/attrpanel/CpSimpleTaskAttrPanel",

        cpType: "CpCompositeTask",
        
        iconPath: iconSvgPath,

        getDefaultCpTplTask: function() {
            var me = this,
                defaultCpTplTask = CpAbstractAttrTask.prototype.getDefaultCpTplTask.call(me);
    
            return fish.extend(defaultCpTplTask, {
                name: "混合环节",
                type: "SIMPLE"
            });
        },

        getCompositeData: function() {
            return this.model.get("compositeData");
        },

        setCompositeData: function(compositeData) {
            this.model.set("compositeData", compositeData || {});
        }
    });
});