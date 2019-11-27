
define([
    'zcamp/modules/common/ZUtils',
    'zcamp/modules/commonprocess/common/processeditor/basenode/AbstractAtomicNode',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpAbstractTask',
    'text!zcamp/modules/commonprocess/common/processeditor/resource/svgpath/cpsubprocesstask.svgpath'
], function (ZUtils, AbstractAtomicNode, CpAbstractTask, iconSvgPath) {

    return ZUtils.Class.create(AbstractAtomicNode, CpAbstractTask, {

        attrPanelUrl: "zcamp/modules/commonprocess/common/processeditor/attrpanel/CpSubProcessTaskAttrPanel",

        cpType: "CpSubProcessTask",

        rectFillColor: '#f6eacb',

        rectStrokeColor: '#bfd2d9',

        iconPath: iconSvgPath,

        getDefaultCpTplTask: function() {
            var me = this,
                defaultCpTplTask = CpAbstractTask.prototype.getDefaultCpTplTask.call(me);

            return fish.extend(defaultCpTplTask, {
                name: "子计划环节",
                type: "SUBPROC"
            });
        }
    });
});