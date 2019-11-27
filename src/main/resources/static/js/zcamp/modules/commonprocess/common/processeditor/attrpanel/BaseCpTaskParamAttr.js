define([
    'hbs!zcamp/modules/commonprocess/common/processeditor/attrpanel/templates/BaseCpTaskParamAttr.html',
    'i18n!zcamp/modules/commonprocess/tplmgr/i18n/TplTaskParamMgr.i18n',
    'i18n!zcamp/i18n/Common.i18n',
    'zcamp/modules/common/ZUtils',
    'zcamp/component/grid/GridPanel',
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/dialogs/TplTaskParamEditorDialog',
    'zcamp/modules/commonprocess/tplmgr/common/TplMgrConstants',
    'zcamp/component/toobar/Toolbar'
], function (viewTpl, i18n, commonI18n, ZUtils, GridPanel,
            TplTaskParamEditorDialog, TplMgrConstants, Toolbar) {

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

            me.tplTaskParamDtoList = options.tplTaskParamDtoList;
            me.isParamsButtonDisabled = options.isParamsButtonDisabled;
            me.autoBindParams = options.autoBindParams;

            me.PARAM_TYPE_ARR = TplMgrConstants.PARAM_TYPE_ARR;
            me.PARAM_POSITION_ARR = TplMgrConstants.PARAM_POSITION_ARR;

            me.tplTaskParamGrid = me._buildGrid();
            me.setViews({
                'div.js-task-param-grid': me.tplTaskParamGrid
            });

            me.inParamMap = {};
            me.outParamMap = {};
        },

        _prepareGridData: function() {

        },

        afterRender: function () {
            var me = this;
        },

        _buildGrid: function () {
            var me = this,
                data = [],
                columns = me._buildColModel();

            if (!fish.isEmpty(me.tplTaskParamDtoList)) {
                data = me.tplTaskParamDtoList;
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
                label: "",
                key: true,
                width: 40,
                hidden: true
            }, {
                name: 'cpTplTaskParam.position',
                label: "",
                width: 40,
                formatter: function (cellval, opts, rwData) {
                    var title = me.PARAM_POSITION_ARR[cellval];

                    if (cellval == 'I') {
                        return '<span class="iconfont icon-download" title="' + title
                            + '" style="font-size: xx-small"></span>';
                    }
                    else {
                        return '<span class="iconfont icon-upload" title="' + title
                            + '" style="font-size: xx-small"></span>';
                    }
                }
            }, {
                name: 'cpTplTaskParam.code',
                label: '编码',
                width: 70
            }, {
                name: 'cpTplTaskParam.value',
                label: i18n.T_PARAM_VALUE,
                classes: 'text-ellipsis no-blank-ellipsis',
                width: 70
            }, {
                name: '',
                label: i18n.COMMON_OPERATION,
                width: 80,
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
            }];

            if (!me.isParamsButtonDisabled) {
                buttons.push({
                    name: "delTaskParam",
                    text: me.i18nData.COMMON_DELETE,
                    scope: me,
                    handler: me.delParamItem
                });
            }

            return buttons;
        },

        reloadTaskParamData: function (tplTaskParamDtoList) {
            var me = this;

            if (fish.isEmpty(tplTaskParamDtoList)) {
                me.tplTaskParamGrid.loadData([]);
            }
            else {
                me.tplTaskParamGrid.loadData(tplTaskParamDtoList);
                me.tplTaskParamGrid.setSelectionByData(tplTaskParamDtoList[0]);
            }
        },

        onAddParamItem: function () {
            var me = this;

            me.trigger('buildRefParamList');
        },

        onEditParamItem: function () {
            var me = this,
                tplTaskParamDto = me.tplTaskParamGrid.getSelection();

            me.trigger('buildRefParamList', tplTaskParamDto);
        },

        addParamItemPop: function (refParamList) {
            var me = this;

            fish.popupView({
                url: TplTaskParamEditorDialog,
                viewOption: {
                    inParamMap: me.inParamMap,
                    outParamMap: me.outParamMap,
                    editPosition: true,
                    autoBindParams: me.autoBindParams,
                    refParamList: refParamList
                },
                height: '500',
                width: '40%',
                draggable: true,
                close: function (result) {
                    if (result) {
                        result.key = $.jgrid.randId();
                        me.tplTaskParamGrid.execGridFunc("addRowData", result);
                        me.tplTaskParamGrid.setSelectionByData(result);
                        me.onTaskParamDataChange();

                        if (result.autoBind == true) {
                            me.trigger('paramAutoBindJobItem', result);
                        }
                    }
                }
            });
        },

        editParamItemPop: function (refParamList, tplTaskParamDto) {
            var me = this;

            var viewOption = {
                inParamMap: me.inParamMap,
                outParamMap: me.outParamMap,
                dialogType: 'edit',
                editPosition: true,
                tplTaskParamDto: tplTaskParamDto,
                refParamList: refParamList
            };

            if (me.isParamsButtonDisabled) {
                viewOption.editPosition = false;
            }

            fish.popupView({
                url: TplTaskParamEditorDialog,
                viewOption: viewOption,
                height: '400',
                width: '40%',
                draggable: true,
                close: function (result) {
                    if (result) {
                        me.tplTaskParamGrid.execGridFunc("setRowData", result);
                        me.tplTaskParamGrid.setSelectionByData(result);
                        me.onTaskParamDataChange();

                        if (result.autoBind == true) {
                            me.trigger('paramAutoBindJobItem', result);
                        }
                    }
                }
            });
        },

        delParamItem: function (rowId) {
            var me = this,
                i18n = me.i18nData;
            var taskParamItem = me.tplTaskParamGrid.getSelection();

            ZUtils.confirm({
                message: ZUtils.format(i18n.M_DEL_CONFIRM, taskParamItem.code),
                ok: i18n.COMMON_CONFIRM,
                cancel: i18n.COMMON_CANCEL
            }, function () {
                var prev = me.tplTaskParamGrid.execGridFunc("getPrevSelection", taskParamItem);
                var next = me.tplTaskParamGrid.execGridFunc("getNextSelection", taskParamItem);
                var data = null;
                if (prev) {
                    data = prev;
                } else if (next) {
                    data = next;
                }

                if (data) {
                    me.tplTaskParamGrid.setSelectionByData(data);
                }
                if (taskParamItem.position == "I") {
                    delete me.inParamMap[taskParamItem.code];
                } else if (formData.position == "O") {
                    delete me.outParamMap[taskParamItem.code];
                }
                me.tplTaskParamGrid.execGridFunc("delRowData", rowId);
                me.onTaskParamDataChange();
            });
        },

        onUpParamItem: function () {
            var me = this,
                i18n = me.i18nData;

            var taskParamItem = me.tplTaskParamGrid.getSelection();
            var prevTaskParamItem = me.tplTaskParamGrid.execGridFunc("getPrevSelection", taskParamItem);
            if (!prevTaskParamItem) {
                return;
            }

            me.tplTaskParamGrid.execGridFunc("moveUpRow", taskParamItem.id);
            me.onTaskParamDataChange();
        },

        onTaskParamDataChange: function () {
            var me = this;

            var rowDatas = me.tplTaskParamGrid.getData();
            /*fish.each(rowDatas, function (item) {
                delete item.key;
            });*/

            me.trigger('taskParamChange', rowDatas);
        },

        // 视图被删除时候做的事情
        cleanup: function () {
            var me = this;

            // 手工删除对dom元素和复杂对象的引用
            delete me.tplTaskParamGrid;
            delete me.toolbar;
        }
    });
});