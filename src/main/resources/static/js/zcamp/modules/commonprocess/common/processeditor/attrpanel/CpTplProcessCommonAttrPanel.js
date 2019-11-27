define([
    'hbs!zcamp/modules/commonprocess/common/processeditor/attrpanel/templates/CpTplProcessCommonAttrPanel.html',
    'i18n!zcamp/modules/commonprocess/common/processeditor/i18n/ProcessEditorAttrPnl.i18n',
], function (viewTpl, i18n) {

    return fish.View.extend({
        el: false,

        template: viewTpl,

        i18nData: fish.extend({}, i18n),

        events: {
            'blur .name': 'onProcessDataChange',
            'blur .code': 'onProcessDataChange',
            'blur .comments': 'onProcessDataChange'
        },

        serialize: function () {
            return this.i18nData;
        },

        initialize: function (params) {
            var me = this;

            me.type = params.type;
            me.cpTplProcess = params.cpTplProcess;
        },

        afterRender: function () {
            var me = this;

            me._initBisDomain();
            me._initCategoryFields();

            if (me.cpTplProcess) {
                me.$('.tpl-process-form').form('value', me.cpTplProcess);
            }
        },

        _initBisDomain: function() {
            var me = this,
                i18n = me.i18nData;

            me.$('.bisDomain').combobox({
                placeholder: i18n.I_PROCESS_DOMAIN,
                dataTextField: 'value',
                dataValueField: 'key',
                change: me.onProcessDataChange.bind(me)
            });
        },

        _initCategoryFields: function () {
            var me = this,
                i18n = me.i18nData;

            me.$('.category').combobox({
                placeholder: i18n.C_CATEGORY_PLACEHOLDER,
                forceSelection: false,
                change: me.onProcessDataChange.bind(me)
            });
        },

        onProcessDataChange: function (e) {
            var me = this;

            var formData = me.getProcessFormData();

            me.trigger('processChange', formData, me.validState);
        },

        getProcessFormData: function () {
            var me = this;

            var formData = me.$('.tpl-process-form').form('value');

            me.calcValidState();

            return formData;
        },

        calcValidState: function() {
            var me = this,
                isValid = me.$('.tpl-process-form').isValid(true);

            me.validState = isValid;
        }
    });
});