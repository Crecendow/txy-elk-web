define([
        'hbs!zcamp/modules/commonprocess/common/processeditor/attrpanel/dialogs/templates/CpSimpleTaskFormEditorDialog.html',
        'i18n!zcamp/modules/commonprocess/common/processeditor/i18n/ProcessEditorAttrPnl.i18n',
        'i18n!zcamp/i18n/Common.i18n'
    ],
function (viewTpl, i18n, commonI18n) {
    return fish.View.extend({
        el: false,

        template: viewTpl,

        events: {
            "click .buttonCancle": "buttonCancle",
            "click .buttonFinish": "buttonFinish",
            "keydown .name": "ignoreAction"
        },

        i18nData: fish.extend({}, i18n, commonI18n),

        serialize: function () {
            return this.i18nData;
        },

        initialize: function (param) {
            var me = this;
            me.dialogType = param.dialogType;
            me.cpTplForm = param.cpTplForm;
            me.tplTaskId = param.tplTaskId;
            me.seq = param.seq;
        },

        afterRender: function () {
            var me = this;
            var meEl = me.$el;

            if (me.dialogType == 'edit') {
                meEl.find('.modal-title').html(me.i18nData.EDIT_FORM);
                meEl.find('.name').val(me.cpTplForm.name);
            }
        },

        // 禁止按回车键刷新
        ignoreAction: function () {
            if(window.event.keyCode==13) {
                return false;
            }
        },

        /*取消按钮操作*/
        buttonCancle: function (e) {
            var me = this;
            me.popup.close(false);
        },

        /*确认按钮操作*/
        buttonFinish: function () {
            var me = this;
            var meEl = me.$el;
            var i18n = me.i18nData;
            // 完成前必校验表单
            if (!me.$('.tpl-form').isValid()) {
                return false;
            }

            var cpTplForm = {
                seq: me.seq || me.cpTplForm.seq,
                name: meEl.find('.name').val(),
                tplTaskId: me.tplTaskId
            };
            if (me.dialogType == 'edit') {
                cpTplForm = fish.extend({}, me.cpTplForm, cpTplForm);
            }

            me.popup.close(cpTplForm);
        },

        // 视图被删除时候做的事情
        cleanup: function () {
            var me = this;
        }

    })
});