define([
    'hbs!zcamp/modules/commonprocess/common/processeditor/attrpanel/dialogs/templates/TplTaskParamRuleView.html',
    'i18n!zcamp/modules/commonprocess/tplmgr/i18n/TplTaskParamMgr.i18n',
    'i18n!zcamp/i18n/Common.i18n',
    'zcamp/modules/common/ZUtils',
    'zcamp/component/grid/GridPanel',
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/dialogs/TplTaskParamRuleEditorDialog',
    'zcamp/modules/commonprocess/tplmgr/common/TplMgrConstants',
    'zcamp/component/toobar/Toolbar'
], function (viewTpl, i18n, commonI18n, ZUtils, GridPanel,
             TplTaskParamRuleEditorDialog, TplMgrConstants, Toolbar) {

    return fish.View.extend({
        el: false,

        template: viewTpl,

        i18nData: fish.extend({}, i18n, commonI18n),

        events: {
        },

        serialize: function () {
            return this.i18nData;
        },

        initialize: function (options) {
            var me = this;

            if (options.tplTaskParamDto) {
                me.cpTplTaskParamRuleList = options.tplTaskParamDto.cpTplTaskParamRuleList;
            }

            me.tplParamRuleGrid = me._buildGrid();
            me.setViews({
                'div.js-param-rule-grid': me.tplParamRuleGrid
            });
        },

        afterRender: function () {
            var me = this;
        },

        _buildGrid: function () {
            var me = this,
                data = [],
                columns = me._buildColModel();

            if (!fish.isEmpty(me.cpTplTaskParamRuleList)) {
                data = me.cpTplTaskParamRuleList;
            }

            var options = {
                columns: columns,
                gridConfig: {
                    pager: false,
                    data: data,
                    onSelectRow: me.onSelectedRow,
                    onSelectRowFuncScope: me,
                    height: 'auto'
                }
            };

            return new GridPanel(options);
        },

        _buildColModel: function () {
            var me = this,
                i18n = me.i18nData;

            return [{
                name: 'key',
                label: '',
                key: true,
                hidden: true
            }, {
                name: 'ruleCode',
                label: '规则编码'
            }, {
                name: 'threshold',
                label: '阈值'
            }, {
                name: 'processor',
                label: '处理器'
            }, {
                name: '',
                label: i18n.COMMON_OPERATION,
                width: 120,
                btns: me._buildBtns()
            }];
        },

        _buildBtns: function () {
            var me = this;

            var buttons = [{
                name: "editTaskParam",
                text: me.i18nData.COMMON_EDIT,
                scope: me,
                handler: me.onEditParamItem
            }, {
                name: "delTaskParam",
                text: me.i18nData.COMMON_DELETE,
                scope: me,
                handler: me.delParamItem
            }];

            return buttons;
        },

        onAddParamItem: function () {
            var me = this;

            me.addParamItemPop();
        },

        onEditParamItem: function () {
            var me = this,
                cpTplTaskParamRule = me.tplParamRuleGrid.getSelection();

            me.editParamItemPop(cpTplTaskParamRule);
        },

        addParamItemPop: function () {
            var me = this;

            fish.popupView({
                url: TplTaskParamRuleEditorDialog,
                viewOption: {
                },
                height: '300',
                width: '30%',
                draggable: true,
                close: function (result) {
                    if (result) {
                        result.key = $.jgrid.randId();
                        me.tplParamRuleGrid.execGridFunc("addRowData", result);
                        me.tplParamRuleGrid.setSelectionByData(result);
                    }
                }
            });
        },

        editParamItemPop: function (cpTplTaskParamRule) {
            var me = this;

            var viewOption = {
                dialogType: 'edit',
                cpTplTaskParamRule: cpTplTaskParamRule
            };

            fish.popupView({
                url: TplTaskParamRuleEditorDialog,
                viewOption: viewOption,
                height: '300',
                width: '30%',
                draggable: true,
                close: function (result) {
                    if (result) {
                        me.tplParamRuleGrid.execGridFunc("setRowData", result);
                        me.tplParamRuleGrid.setSelectionByData(result);
                    }
                }
            });
        },

        delParamItem: function (rowId) {
            var me = this,
                i18n = me.i18nData;
            var cpTplTaskParamRule = me.tplParamRuleGrid.getSelection();

            ZUtils.confirm({
                message: ZUtils.format(i18n.M_DEL_CONFIRM, cpTplTaskParamRule.ruleCode),
                ok: i18n.COMMON_CONFIRM,
                cancel: i18n.COMMON_CANCEL
            }, function () {
                var prev = me.tplParamRuleGrid.execGridFunc("getPrevSelection", cpTplTaskParamRule);
                var next = me.tplParamRuleGrid.execGridFunc("getNextSelection", cpTplTaskParamRule);
                var data = null;
                if (prev) {
                    data = prev;
                } else if (next) {
                    data = next;
                }

                if (data) {
                    me.tplParamRuleGrid.setSelectionByData(data);
                }
                me.tplParamRuleGrid.execGridFunc("delRowData", rowId);
            });
        },

        getParamRuleGridData: function () {
            var me = this;

            return me.tplParamRuleGrid.getData();
        },

        // 视图被删除时候做的事情
        cleanup: function () {
            var me = this;

            // 手工删除对dom元素和复杂对象的引用
            delete me.tplParamRuleGrid;
        }
    });
});