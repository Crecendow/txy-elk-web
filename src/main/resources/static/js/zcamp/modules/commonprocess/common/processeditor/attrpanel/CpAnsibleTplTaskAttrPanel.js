define([
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/BaseCpTaskAttrPanel',
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/BaseCpTaskParamAttr',
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/CpAnsibleTplTaskCommonAttr',
    'zcamp/modules/common/ZUtils',
    'i18n!zcamp/i18n/Common.i18n'
], function (BaseCpTaskAttrPanel, BaseCpTaskParamAttr, CpAnsibleTplTaskCommonAttr, ZUtils, commonI18n) {

    return BaseCpTaskAttrPanel.extend({

        initCpCommonAttrView: function() {
            var me = this,
                options = me.options,
                cpTplTask = options.cpTplTask,
                buildInParamDtoList = options.tplTaskBuildInParamDtoList;

            me.taskCommonAttr = new CpAnsibleTplTaskCommonAttr({
                cpTplTask: cpTplTask,
                buildInParamDtoList: buildInParamDtoList
            });
            me.taskCommonAttr.on('taskchange', me.onCommonAttrChange, me);
            me.taskCommonAttr.on('buildInTaskParamChange', me.oBuildInTaskParamChange, me);
            me.taskCommonAttr.on('parsedParamsChange', me.onParsedParamsChange, me);
            me.taskCommonAttr.on('needBlock', me.doBlockUI, me);
            me.taskCommonAttr.on('needUnBlock', me.doUnblockUI, me);

            return me.taskCommonAttr;
        },

        oBuildInTaskParamChange: function (buildInParamDtoList) {
            var me = this;

            me.trigger('buildInTaskParamChange', buildInParamDtoList);
        },
        
        initCpParamAttrView: function () {
            var me = this,
                options = me.options,
                cpTplTask = options.cpTplTask,
                notBuildInParamDtoList = options.tplTaskNotBuildInParamDtoList;

            var cpTaskParamAttrView = new BaseCpTaskParamAttr({
                cpTplTask: cpTplTask,
                tplTaskParamDtoList: notBuildInParamDtoList,
                isParamsButtonDisabled: options.isParamsButtonDisabled
            });
            cpTaskParamAttrView.on('taskParamChange', me.onParamAttrChange, me);
            cpTaskParamAttrView.on('buildRefParamList', me.onBuildRefParamList, me);
            cpTaskParamAttrView.on('paramAutoBindJobItem', me.onParamAutoBindJobItem, me);

            return cpTaskParamAttrView;
        },

        onParamAttrChange: function (notBuildInParamDtoList) {
            var me = this;

            me.trigger('notBuildInTaskParamChange', notBuildInParamDtoList);
        },

        onParsedParamsChange: function (parsedParams) {
            var me = this;

            if (me.cpTaskParamAttrView && me.cpTaskParamAttrView.reloadTaskParamData) {
                me.cpTaskParamAttrView.reloadTaskParamData(parsedParams);
            }

            me.onParamAttrChange(parsedParams);
        },

        doBlockUI: function (message) {
            var me = this;
            if (me.blockEl) {
                me.blockEl.find(".blockUI-content").text(message || commonI18n.COMMON_LOADING);
            } else {
                me.blockEl = ZUtils.Msg.block(me.$el, message || commonI18n.COMMON_LOADING);
            }
        },

        doUnblockUI: function () {
            var me = this;
            if (me.blockEl) {
                me.blockEl = null;
                ZUtils.Msg.unblock(me.$el);
            }
        }
    });
});