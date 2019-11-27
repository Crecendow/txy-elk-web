define([
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/BaseCpTaskAttrPanel',
    'i18n!zcamp/modules/commonprocess/common/processeditor/i18n/ProcessEditorAttrPnl.i18n',
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/CpSshTplTaskCommonAttr'
], function (BaseCpTaskAttrPanel, i18n, CpSshTplTaskCommonAttr) {

    return BaseCpTaskAttrPanel.extend({

        initCpCommonAttrView: function() {
            var me = this,
                options = me.options,
                cpTplTask = options.cpTplTask,
                buildInParamDtoList = options.tplTaskBuildInParamDtoList;

            me.taskCommonAttr = new CpSshTplTaskCommonAttr({
                cpTplTask: cpTplTask,
                buildInParamDtoList: buildInParamDtoList
            });
            me.taskCommonAttr.on('taskchange', me.onCommonAttrChange, me);
            me.taskCommonAttr.on('buildInTaskParamChange', me.oBuildInTaskParamChange, me);

            return me.taskCommonAttr;
        },

        oBuildInTaskParamChange: function (buildInParamDtoList) {
            var me = this;

            me.trigger('buildInTaskParamChange', buildInParamDtoList);
        },

        onParamAttrChange: function (notBuildInParamDtoList) {
            var me = this;

            me.trigger('notBuildInTaskParamChange', notBuildInParamDtoList);
        }
    });
});