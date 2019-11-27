define([
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/BaseCpTaskAttrPanel',
    'i18n!zcamp/modules/commonprocess/common/processeditor/i18n/ProcessEditorAttrPnl.i18n',
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/CpSimpleTaskCommonAttr'
], function (BaseCpTaskAttrPanel, i18n, CpSimpleTaskCommonAttr) {

    return BaseCpTaskAttrPanel.extend({

        initCpCommonAttrView: function () {
            var me = this,
                options = me.options,
                cpTplTask = options.cpTplTask;

            me.taskCommonAttr = new CpSimpleTaskCommonAttr({
                cpTplTask: cpTplTask
            });
            me.taskCommonAttr.on('taskchange', me.onCommonAttrChange, me);

            return me.taskCommonAttr;
        }
    });
});