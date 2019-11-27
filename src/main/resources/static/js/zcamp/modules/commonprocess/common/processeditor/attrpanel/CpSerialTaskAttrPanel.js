define([
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/BaseCpTaskAttrPanel',
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/CpContainerTaskCommonAttr'
], function (BaseCpTaskAttrPanel, CpParallelTaskCommonAttr) {

    return BaseCpTaskAttrPanel.extend({

        initCpCommonAttrView: function () {
            var me = this,
                options = me.options,
                cpTplTask = options.cpTplTask;

            me.taskCommonAttr = new CpParallelTaskCommonAttr({
                cpTplTask: cpTplTask
            });
            me.taskCommonAttr.on('taskchange', me.onCommonAttrChange, me);

            return me.taskCommonAttr;
        }
    });
});