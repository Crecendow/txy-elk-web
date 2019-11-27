
define([
    'zcamp/modules/commonprocess/common/processeditor/basenode/AbstractAtomicNode',
    'zcamp/modules/common/ZUtils'
], function (AbstractAtomicNode, ZUtils) {
    
    return ZUtils.Class.create(AbstractAtomicNode, {
        
        bpmnGraphicType: "container",
        bodyRectName: "subprocess-rect",
        bodyZIndex: 0,
        width: 160,
        height: 100
    });
});