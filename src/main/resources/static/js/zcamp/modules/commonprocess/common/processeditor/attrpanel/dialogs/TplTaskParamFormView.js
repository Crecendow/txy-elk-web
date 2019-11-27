define([
    'hbs!zcamp/modules/commonprocess/common/processeditor/attrpanel/dialogs/templates/TplTaskParamFormView.html',
    'i18n!zcamp/modules/commonprocess/common/processeditor/attrpanel/dialogs/i18n/TplTaskParamMgr.i18n',
    'i18n!zcamp/i18n/Common.i18n',
    'zcamp/modules/common/ZUtils',
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/dialogs/TplTaskParamSelectDialog'
], function (viewTpl, i18n, commonI18n, ZUtils, TplTaskParamSelectDialog) {

    return fish.View.extend({

        el: false,

        template: viewTpl,

        events: {
            "click .js-btn-confirm": "onButtonFinish"
        },

        i18nData: fish.extend({}, i18n, commonI18n),

        serialize: function () {
            return this.i18nData;
        },

        initialize: function (options) {
            var me = this;
            me.dialogType = options.dialogType;
            me.refParamList = options.refParamList;
            me.editPosition = options.editPosition;
            me.autoBindParams = options.autoBindParams;

            if (me.dialogType == 'edit') {
                me.tplTaskParamDto = options.tplTaskParamDto;
                me.cpTplTaskParam = me.tplTaskParamDto.cpTplTaskParam;
                me.tplTaskParamId = me.cpTplTaskParam.id;
            }
        },

        afterRender: function () {
            var me = this;

            me.paramDetailForm = me.$('.js-param-detail-form');

            me._initPositionSelect();
            me._initTypeSelect();
            me._initInParamSelectPop();
            me._initCheckAutoBindParams();

            if (me.dialogType == 'edit') {
                me.paramDetailForm.form('value', me.cpTplTaskParam);

                if (me.cpTplTaskParam.type == 'REF') {
                    me.$('.js-pop-ref-param').show();
                    me.$('.js-text-param-value').hide();
                }
            }
        },

        _initCheckAutoBindParams: function () {
            var me = this;

            if (me.autoBindParams == true) {
                me.$('.js-auto-bind-params').show();
                me.$('input[name="autoBind"]').on('click', function (e) {
                    me.onAutoBindParamsChecked();
                });

                me.$('.js-param-code').on('keyup', function (e) {
                    me.enableAutoBindParams();
                });

                me.$('.js-param-position').on('combobox:change', function (e) {
                    me.enableAutoBindParams();
                });
            }
            else {
                me.$('.js-auto-bind-params').hide();
            }
        },

        enableAutoBindParams: function () {
            var me = this,
                formData = me.paramDetailForm.form('value');

            if (!fish.isEmpty(formData.code) && !fish.isEmpty(formData.position)) {
                me.$('input[name="autoBind"]').prop('disabled', false);
            }
            else {
                me.$('input[name="autoBind"]').prop('disabled', true);
            }
        },

        onAutoBindParamsChecked: function () {
            var me = this,
                formData = me.paramDetailForm.form('value');

            if (me.$('input[name="autoBind"]').prop('checked')) {
                if (formData.position == 'I') {
                    me.$('.js-param-type').combobox('value', 'REF');
                    me.$('.js-param-type').combobox('disable');
                    me.inParamPopView.setValue(formData.code, formData.code);
                    me.inParamPopView.disable();
                }
            }
            else {
                me.$('.js-param-type').combobox('enable');
                me.inParamPopView.enable();
            }
        },

        _initPositionSelect: function () {
            var me = this;
            var meEl = me.$el;

            meEl.find('.js-param-position').combobox({
                placeholder: me.i18nData.T_PLACEHOLDER_PARAM_POSITION,
                dataTextField: 'text',
                dataValueField: 'value',
                dataSource: [{
                    text: me.i18nData.T_PARAM_POSITION_IN,
                    value: 'I'
                }, {
                    text: me.i18nData.T_PARAM_POSITION_OUT,
                    value: 'O'
                }]
            });

            if (!me.editPosition) {
                meEl.find('.js-param-position').combobox('disable');
                meEl.find('.js-param-code').attr('disabled', 'disabled');
            }
        },

        _initTypeSelect: function () {
            var me = this;
            var meEl = me.$el;

            meEl.find('.js-param-type').combobox({
                placeholder: me.i18nData.T_PLACEHOLDER_PARAM_TYPE,
                dataTextField: 'text',
                dataValueField: 'value',
                dataSource: [{
                    text: me.i18nData.T_PARAM_TYPE_VALUE,
                    value: 'VALUE'
                }, {
                    text: me.i18nData.T_PARAM_TYPE_REF,
                    value: 'REF'
                }],
                change: function (e) {
                    me._onParamTypeChange(e);
                }
            });
        },

        _onParamTypeChange: function (e) {
            var me = this;
            if (e.target.value == 'REF') {
                me.$('.js-pop-ref-param').show();
                me.$('.js-text-param-value').hide();
            } else {
                me.$('.js-pop-ref-param').hide();
                me.$('.js-text-param-value').show();
            }
        },

        _initInParamSelectPop: function () {
            var me = this;

            me.inParamPopView = new TplTaskParamSelectDialog(me.$('.js-ref-param'), {
                paramList: me.refParamList
            });

            if (me.dialogType == 'edit' && me.cpTplTaskParam.type == 'REF') {
                me.inParamPopView.setValue(me.cpTplTaskParam.value, me.cpTplTaskParam.value);
            }
        },

        paramDetailFormCheck: function() {
            var me = this;

            var formData = me.paramDetailForm.form('value');
            if (formData.type == 'REF') {
                formData.value = formData.refParamValue;
            }

            if (me.$('input[name="autoBind"]').prop('checked')) {
                formData.autoBind = true;
            }

            var paramReq = fish.extend(me.cpTplTaskParam || {}, formData);

            if (me.dialogType == 'edit') {
                paramReq.id = me.tplTaskParamId;
            }
            return paramReq;
        },

        /*确认按钮操作*/
        onButtonFinish: function () {
            var me = this;

            // 完成前必校验表单
            if (!me.isValid()) {
                return false;
            }

            var paramReq = this.paramDetailFormCheck(me);
            me.popup.close(fish.extend(me.tplTaskParamDto || {}, {
                cpTplTaskParam: paramReq
            }));
        },

        isValid: function () {
            var me = this;

            if (!me.paramDetailForm.isValid()) {
                return false;
            }

            if(!me.options.inParamMap || !me.options.outParamMap){
                return true;
            }

            var formData = me.paramDetailForm.form('value');
            if (me.cpTplTaskParam) {
                if (me.cpTplTaskParam.code == formData.code && me.cpTplTaskParam.position == formData.position) {
                    return true;
                }
            }
            if (formData.position == "I") {
                if (me.options.inParamMap[formData.code]) {
                    ZUtils.Msg.showError(i18n.IN_PARAM_DUMPLICATE);
                    return false;
                } else {
                    me.options.inParamMap[formData.code] = true;
                    return true;
                }
            } else if (formData.position == "O") {
                if (me.options.outParamMap[formData.code]) {
                    ZUtils.Msg.showError(i18n.OUT_PARAM_DUMPLICATE);
                    return false;
                } else {
                    me.options.outParamMap[formData.code] = true;
                    return true;
                }
            }
        },

        // 视图被删除时候做的事情
        cleanup: function () {
            var me = this;
        }
    });
});