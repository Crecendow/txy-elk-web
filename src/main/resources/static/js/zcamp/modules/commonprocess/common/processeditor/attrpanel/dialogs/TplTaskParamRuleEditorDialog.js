define([
    'hbs!zcamp/modules/commonprocess/common/processeditor/attrpanel/dialogs/templates/TplTaskParamRuleEditorDialog.html',
    'i18n!zcamp/modules/commonprocess/common/processeditor/attrpanel/dialogs/i18n/TplTaskParamMgr.i18n',
    'i18n!zcamp/i18n/Common.i18n',
    'zcamp/modules/common/ZUtils',
], function (viewTpl, i18n, commonI18n, ZUtils) {

    return fish.View.extend({

        el: false,

        template: viewTpl,

        events: {
            "click .js-rule-btn-confirm": "onRuleButtonFinish"
        },

        i18nData: fish.extend({}, i18n, commonI18n),

        serialize: function () {
            return this.i18nData;
        },

        initialize: function (options) {
            var me = this;
            me.dialogType = options.dialogType;

            if (me.dialogType == 'edit') {
                me.cpTplTaskParamRule = options.cpTplTaskParamRule;
            }
        },

        afterRender: function () {
            var me = this;

            me._initRuleProcessorSelect();
            me._initParamRuleSelect();
        },

        _initRuleProcessorSelect: function () {
            var me = this;
        },

        _initParamRuleSelect: function () {
            var me = this;
            var meEl = me.$el;
        },

        isValid: function () {
            return true;
        },

        /*确认按钮操作*/
        onRuleButtonFinish: function () {
            var me = this;

            // 完成前必校验表单
            if (!me.isValid()) {
                return false;
            }

            var paramReq = me.$('.js-rule-detail-form').form('value');
            me.popup.close(fish.extend(me.cpTplTaskParamRule || {}, paramReq));
        },

        // 视图被删除时候做的事情
        cleanup: function () {
            var me = this;
        }
    });
});