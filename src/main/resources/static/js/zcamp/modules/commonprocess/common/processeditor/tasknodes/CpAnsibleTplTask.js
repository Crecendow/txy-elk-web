
define([
    'zcamp/modules/common/ZUtils',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpSimpleTask',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpAbstractBuildInParamsTask',
    'text!zcamp/modules/commonprocess/common/processeditor/resource/svgpath/cpansibletpltask.svgpath'
], function (ZUtils, CpSimpleTask, CpAbstractBuildInParamsTask, iconSvgPath) {

    return ZUtils.Class.create(CpSimpleTask, CpAbstractBuildInParamsTask, {

        attrPanelUrl: "zcamp/modules/commonprocess/common/processeditor/attrpanel/CpAnsibleTplTaskAttrPanel",

        cpType: "CpAnsibleTplTask",

        rectFillColor: '#ffffff',

        rectStrokeColor: '#ededed',

        iconPath: iconSvgPath,

        getDefaultCpTplTask: function() {
            var me = this,
                defaultCpTplTask = CpAbstractBuildInParamsTask.prototype.getDefaultCpTplTask.call(me);

            return fish.extend(defaultCpTplTask, {
                name: "ANSIBLE环节",
                action: "jobPlanAnsibleAction"
            });
        }
    });
});