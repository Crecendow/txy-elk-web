define([
    'hbs!zcamp/modules/jobplan/jobitemdiagrammgr/attrpanel/templates/JobItemBisDomainView.html',
    'i18n!zcamp/modules/commonprocess/common/processeditor/i18n/ProcessEditorAttrPnl.i18n',
], function (viewTpl, i18n) {

    return fish.View.extend({
        el: false,

        template: viewTpl,

        i18nData: fish.extend({}, i18n),

        serialize: function () {
            return this.i18nData;
        },

        initialize: function (params) {
            var me = this;

        },

        afterRender: function () {
            var me = this;
            me.bisDomain = me.$('.bisDomain');

            me._initBisDomain();

        },

        _initBisDomain: function() {
            var me = this,
                i18n = me.i18nData;

            me.bisDomain.combobox({
                placeholder: i18n.I_PROCESS_DOMAIN,
                dataTextField: 'value',
                dataValueField: 'key',
                change: me.onProcessDataChange.bind(me)
            });
            setTimeout(function () {
                var result = [{"key":"ALL","value":"所有业务域"}];
                var cfg = {
                    dataSource: result
                };
                if (me.options.predefinedTemplate) {
                    cfg.value = me.options.predefinedTemplate.bisDomain;
                }
                me.$('.bisDomain').combobox(cfg);
            },1000);
            
        },

        onProcessDataChange: function (e) {
            var me = this;

            var predefinedTemplate = me.getValue();

            me.trigger('bisDomainChange', predefinedTemplate);
        },

        getValue: function () {
            var me = this,
                predefinedTemplate = me.options.predefinedTemplate || {};

            var bisDomain = me.bisDomain.combobox("value");
            predefinedTemplate.bisDomain = bisDomain;

            me.validState = me.$('.bis-domain-form').isValid(true);

            return predefinedTemplate;
        }
    });
});