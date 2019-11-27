define([
    'zcamp/modules/common/ZUtils',
    'zcamp/modules/commonprocess/common/processeditor/BPMNUtils',
    'zcamp/modules/commonprocess/common/processeditor/basenode/AbstractAtomicNode',
    'zcamp/modules/commonprocess/common/processeditor/basenode/AbstractAjaxDataNode',
    'zcamp/modules/commonprocess/common/processeditor/basenode/AbstractProxySharpNode',
    'text!zcamp/modules/commonprocess/common/processeditor/resource/svgpath/cppredefinedtemplatetask.svgpath'
], function(ZUtils, BPMNUtils, AbstractAtomicNode, AbstractAjaxDataNode, AbstractProxySharpNode, iconSvgPath) {

    return ZUtils.Class.create(AbstractAtomicNode, AbstractAjaxDataNode, AbstractProxySharpNode, {

        cpType: "CpPredefinedTemplateTask",
        
        iconPath: iconSvgPath,
        
        iconColor: '#de5e0c',
        
        ajaxUrl: "commonprocess/predefinedTemplate/qryPredefinedTemplateDiagram.do",

        getAjaxParams: function() {
            var me = this,
                predefinedTemplateTask =  me.getUserData();
            
            return {
                predefinedId: predefinedTemplateTask.id
            };
        },

        afterLoadData: function(data, loadSharpCallback) {
            var proxySharps = BPMNUtils.regenerateResourceIdForSharps(data.childShapes);
            return loadSharpCallback(proxySharps);
        }
    });
});