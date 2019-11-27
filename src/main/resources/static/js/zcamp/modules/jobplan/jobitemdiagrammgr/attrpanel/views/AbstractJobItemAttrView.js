define([
    'i18n!zcamp/modules/jobplan/jobitemdiagrammgr/attrpanel/i18n/ProcessEditorAttrPnl.i18n',
    'zcamp/modules/jobplan/jobitemdiagrammgr/attrpanel/views/JobItemBisDomainView'
], function (i18n, JobItemBisDomainView) {

    return {
        _initCustomAccordion: function (params) {
            var me = this;
            me.bisDomainView = new JobItemBisDomainView(params);
            me.bisDomainView.on('bisDomainChange', me.onBisDomainChange, me);
            var items = [{
                title: i18n.COMMON_AUTH_TITLE,
                name: "commonAttrView",
                expand: true,
                viewObj: me.bisDomainView,
                accordionid: fish.getUUID()
            }];
            return items;
        },

        onBisDomainChange: function (predefinedTemplate) {
            var me = this;
            var isValid = me.cpTaskCommonAttrView.validState && me.bisDomainView.validState;
            me.trigger('bisDomainChange', predefinedTemplate, isValid);
        },

        onCommonAttrChange: function (cpTplTask) {
            var me = this;
            var isValid = me.cpTaskCommonAttrView.validState && me.bisDomainView.validState;
            me.trigger('taskchange', cpTplTask, isValid);
        }
    }
});