define([
    'hbs!zcamp/modules/commonprocess/common/processeditor/attrpanel/dialogs/templates/TplTaskParamEditorDialog.html',
    'i18n!zcamp/modules/commonprocess/common/processeditor/attrpanel/dialogs/i18n/TplTaskParamMgr.i18n',
    'i18n!zcamp/i18n/Common.i18n',
    'zcamp/component/accordion/Accordion',
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/dialogs/TplTaskParamFormView',
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/dialogs/TplTaskParamRuleView'
], function (viewTpl, i18n, commonI18n, Accordion, TplTaskParamFormView, TplTaskParamRuleView) {

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

        initialize: function () {
            var me = this;

            me.tplTaskParamDto = me.options.tplTaskParamDto;
            me.accordion = me._initAccordion();

            me.setViews({
                'div.accordion-panel': me.accordion
            });
        },

        afterRender: function () {
        },

        _initAccordion: function () {
            var me = this,
                options = me.options;

            me.tplTaskParamFormView = me.initTplTaskParamFormView();
            me.tplTaskParamRuleView = me.initTplTaskParamRuleView();

            var items = [{
                title: '通用属性',
                name: 'commonAttrView',
                expand: true,
                viewObj: me.tplTaskParamFormView,
                accordionid: fish.getUUID()
            }, {
                title: '参数规则',
                name: 'paramAttrView',
                expand: true,
                viewObj: me.tplTaskParamRuleView,
                accordionid: fish.getUUID(),
                buttons: [{
                    name: 'btnAddParam',
                    icon: 'fa-plus',
                    handler: function() {
                        me.tplTaskParamRuleView.onAddParamItem();
                    }
                }]
            }];

            return new Accordion({
                items: items
            });
        },

        initTplTaskParamFormView: function () {
            var me = this;

            var tplTaskParamFormView = new TplTaskParamFormView(me.options);

            return tplTaskParamFormView;
        },

        initTplTaskParamRuleView: function () {
            var me = this;

            var tplTaskParamRuleView = new TplTaskParamRuleView(me.options);

            return tplTaskParamRuleView;
        },

        /*确认按钮操作*/
        onButtonFinish: function () {
            var me = this;

            // 完成前必校验表单
            if (!me.tplTaskParamFormView.isValid()) {
                return false;
            }

            var paramReq = me.tplTaskParamFormView.paramDetailFormCheck();
            var cpTplTaskParamRuleList = me.tplTaskParamRuleView.getParamRuleGridData();
            me.popup.close(fish.extend(me.tplTaskParamDto || {}, {
                cpTplTaskParam: paramReq,
                cpTplTaskParamRuleList: cpTplTaskParamRuleList
            }));
        },

        // 视图被删除时候做的事情
        cleanup: function () {
            var me = this;

            delete me.tplTaskParamFormView;
            delete me.tplTaskParamRuleView;
        }
    });
});