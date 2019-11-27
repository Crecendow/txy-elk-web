define([
    'hbs!zcamp/modules/commonprocess/common/processeditor/attrpanel/templates/BaseCpTaskAttrPanel.html',
    'i18n!zcamp/modules/commonprocess/common/processeditor/attrpanel/i18n/CpTaskAttrView.i18n',
    'i18n!zcamp/i18n/Common.i18n',
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/BaseCpTaskParamAttr',
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/dialogs/CpSimpleTaskFormEditorDialog',
    'zcamp/component/toobar/Toolbar',
    'zcamp/component/accordion/Accordion'
], function (viewTpl, i18n, commonI18n, BaseCpTaskParamAttr, CpSimpleTaskFormEditorDialog, Toolbar, Accordion) {

    return fish.View.extend({
        el: false,

        template: viewTpl,

        i18nData: fish.extend({}, i18n, commonI18n),


        serialize: function () {
            return this.i18nData;
        },

        initialize: function () {
            var me = this;
            me.validState = false;

            me.toolbar = me._initToolbar();
            me.accordion = me._initAccordion();

            me.setViews({
                'div.accordion-panel': me.accordion
            });
            if (me.toolbar) {
                me.setViews({
                    'div.toolbar': me.toolbar
                });
            }

            fish.on('changeNode', me._onChangeNode, me);
        },

        afterRender: function () {
            var me = this,
                params = me.options;

            me.initCpFormInfoViews(params);
        },

        _initToolbar: function () {
            var me = this,
                hideForm = me.options.hideForm;

            if (hideForm) {
                return null;
            }

            var toolbar = new Toolbar({
                buttons: [{
                    name: 'btnAddForm',
                    icon: 'fa-plus',
                    btnCls: 'btn-primary',
                    text: me.i18nData.ADD_FORM,
                    handler: me.onAddFormBtnClick,
                    scope: me
                }]
            });

            return toolbar;
        },

        _initAccordion: function () {
            var me = this,
                options = me.options;

            me.cpTaskCommonAttrView = me.initCpCommonAttrView();
            me.cpTaskParamAttrView = me.initCpParamAttrView();
            var items = [{
                title: me.i18nData.COMMON_TITLE,
                name: 'commonAttrView',
                expand: true,
                viewObj: me.cpTaskCommonAttrView,
                accordionid: fish.getUUID()
            }];
            var customAccordion = me._initCustomAccordion(options);
            if (customAccordion) {
                items.push.apply(items, customAccordion);
            }
            var isParamsButtonDisabled = options.isParamsButtonDisabled;
            items.push({
                title: me.i18nData.PARAM_TITLE,
                name: 'paramAttrView',
                expand: true,
                viewObj: me.cpTaskParamAttrView,
                accordionid: fish.getUUID(),
                buttons: [{
                    name: 'btnAddParam',
                    icon: 'fa-plus',
                    isDisabled: isParamsButtonDisabled,
                    handler: function() {
                        me.cpTaskParamAttrView.onAddParamItem();
                    }
                }]
            });
            return new Accordion({
                items: items
            });
        },

        _initCustomAccordion: function (params) {
            return null;
        },

        _onChangeNode: function (node) {
            var me = this;

            me.changeTaskName(node.properties['name']);
        },

        changeTaskName: function (taskName) {
            var me = this;

            me.cpTaskCommonAttrView.setTaskName(taskName);
        },

        initCpCommonAttrView: function () {
            return null;
        },

        initCpParamAttrView: function () {
            var me = this;

            var cpTaskParamAttrView = new BaseCpTaskParamAttr(me.options);
            cpTaskParamAttrView.on('taskParamChange', me.onParamAttrChange, me);
            cpTaskParamAttrView.on('buildRefParamList', me.onBuildRefParamList, me);
            cpTaskParamAttrView.on('paramAutoBindJobItem', me.onParamAutoBindJobItem, me);

            return cpTaskParamAttrView;
        },

        onParamAttrChange: function (cpTaskParams) {
            var me = this;

            me.trigger('taskParamChange', cpTaskParams);
        },

        onBuildRefParamList: function (tplTaskParamDto) {
            var me = this;

            me.trigger('buildRefParamList', tplTaskParamDto);
        },

        onParamAutoBindJobItem: function (tplTaskParam) {
            var me = this;

            me.trigger('paramAutoBindJobItem', tplTaskParam);
        },

        buildRefParamTree: function (refParamList, tplTaskParamDto) {
            var me = this;

            if (tplTaskParamDto) {
                me.cpTaskParamAttrView.editParamItemPop(refParamList, tplTaskParamDto);
            }
            else {
                me.cpTaskParamAttrView.addParamItemPop(refParamList);
            }
        },

        onCommonAttrChange: function (cpTplTask) {
            var me = this;

            me.calcValidState();
            me.trigger('taskchange', cpTplTask, me.validState);
        },

        calcValidState: function() {
            var me = this;
            me.validState = me.taskCommonAttr.validState ? true : false;
        },


        // ===========================以下表单相关================================
        initCpFormInfoViews: function (params) {
            var me = this;

            me.formViewMap = {};
            var tplFormDtoList = params.tplFormDtoList;
            fish.each(tplFormDtoList, function (tplFormDto) {
                me._addForm(tplFormDto, true);
            });
        },

        cleanup: function () {
            var me = this;

            delete me.cpTaskCommonAttrView;
            delete me.cpTaskParamAttrView;
            delete me.toolbar;

            fish.off('changeNode', me._onChangeNode, me);
        }
    });
});