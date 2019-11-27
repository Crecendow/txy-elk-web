define([
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/BaseCpTaskAttrPanel',
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/CpSubProcessTaskCommonAttr'
], function (BaseCpTaskAttrPanel, CpSubProcessTaskCommonAttr) {

    return BaseCpTaskAttrPanel.extend({

        initCpCommonAttrView: function () {
            var me = this,
                options = me.options,
                cpTplTask = options.cpTplTask;

            me.taskCommonAttr = new CpSubProcessTaskCommonAttr({
                cpTplTask: cpTplTask
            });
            me.taskCommonAttr.on('taskchange', me.onCommonAttrChange, me);

            return me.taskCommonAttr;
        }
    });
});