define([
    'hbs!zcamp/modules/commonprocess/common/processeditor/attrpanel/templates/CpTplProcessAttrPanel.html',
    'i18n!zcamp/modules/commonprocess/common/processeditor/attrpanel/i18n/CpTaskAttrView.i18n',
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/CpTplProcessCommonAttrPanel',
    'zcamp/component/accordion/Accordion',
    'zcamp/component/toobar/Toolbar'
], function (viewTpl, i18n, CpTplProcessCommonAttrPanel, Accordion, Toolbar) {

    return fish.View.extend({
        el: false,

        template: viewTpl,

        i18nData: fish.extend({}, i18n),

        events: {
        },

        serialize: function () {
            return this.i18nData;
        },

        initialize: function (params) {
            var me = this;

            me.toolbar = me._initToolbar();
            me.accordion = me._initAccordion();

            me.setViews({
                'div.toolbar': me.toolbar,
                'div.accordion-panel': me.accordion
            });
        },

        afterRender: function () {
            var me = this;


        },

        _initToolbar: function () {
            var me = this;

            var toolbar = new Toolbar({

            });

            return toolbar;
        },

        _initAccordion: function () {
            var me = this,
                params = me.options;

            me.cpTaskCommonAttrView = me.initCpTplProcessCommonAttrPanel(params);
            var items = [{
                title: me.i18nData.COMMON_TITLE,
                name: "commonAttrView",
                expand: true,
                viewObj: me.cpTaskCommonAttrView,
                accordionid: fish.getUUID()
            }];
            return new Accordion({
                items: items
            });
        },

        initCpTplProcessCommonAttrPanel: function (params) {
            var me = this;

            var cpTaskCommonAttrView = new CpTplProcessCommonAttrPanel(params);
            cpTaskCommonAttrView.on('processChange', me.onProcessDataChange, me);

            return cpTaskCommonAttrView;
        },

        onProcessDataChange: function (formData, validState) {
            var me = this;

            me.trigger('processChange', formData, validState);
        }
    });
});