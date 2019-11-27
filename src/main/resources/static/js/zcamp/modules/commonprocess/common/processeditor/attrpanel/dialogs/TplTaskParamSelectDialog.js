define([
    'hbs!zcamp/modules/commonprocess/common/processeditor/attrpanel/dialogs/templates/TplTaskParamSelectDialog.html',
    'i18n!zcamp/i18n/Common.i18n',
    'i18n!zcamp/modules/commonprocess/tplmgr/i18n/TplTaskParamMgr.i18n',
    'zcamp/modules/common/ZUtils',
], function (viewTpl, commonI18n, i18n, ZUtils) {

    return function ($targetEl, initOptions) {

        this.getValue = function () {
            return $targetEl.popedit('getValue');
        }

        this.setValue = function (name, value) {
            $targetEl.popedit('setValue', {
                name: name,
                value: value
            });
        }

        this.enable = function () {
            $targetEl.popedit('enable');
        }

        this.disable = function () {
            $targetEl.popedit('disable');
        }

        this.view = fish.View.extend({
            el: false,

            template: viewTpl,

            // 多资源文件引入
            i18nData: fish.extend({}, i18n, commonI18n),

            initialize: function (options) {
                var opts = $.extend({}, options);

                this.paramList = opts.paramList;
            },

            // 用于模板中进行替换的数据对象
            serialize: function () {
                return this.i18nData;
            },

            events: {
                "click .buttonFinish": "onSubmitClick"
            },

            afterRender: function () {
                var me = this,
                    paramList = me.paramList;

                me._buildTreeGrid();
                me._initTreeGirdData(paramList);
            },

            _buildTreeGrid: function() {
                var me = this,
                    columns = me._buildTreeColModel();

                var options = {
                    height: '460',
                    colModel: columns,
                    treeGrid: true,
                    expandColumn: 'name',
                    treeReader: {
                        parentid: 'pId',
                        children: 'childNodeList'
                    },
                    treeIconFunction: function (rowdata) {
                        if (rowdata.type == 'formItem') {
                            return {
                                leaf: 'glyphicon glyphicon-file'
                            }
                        }
                        else if (rowdata.type == 'param') {
                            return {
                                leaf: 'glyphicon glyphicon-sort'
                            }
                        }
                        else if (rowdata.type == 'task') {
                            return {
                                folderOpen: 'glyphicon glyphicon-tasks',
                                folderClosed: 'glyphicon glyphicon-tasks'
                            }
                        }
                        else if (rowdata.type == 'form') {
                            return {
                                folderOpen: 'glyphicon glyphicon-book',
                                folderClosed: 'glyphicon glyphicon-book'
                            }
                        }
                        else {
                            return {
                                folderOpen: 'glyphicon glyphicon-folder-open',
                                folderClosed: 'glyphicon glyphicon-folder-close'
                            }
                        }
                    },
                    onDblClickRow: this.onSubmitClick.bind(this)
                };

                me.refParamTreeGrid = me.$('.js-ref-param-tree').grid(options);
            },

            _buildTreeColModel: function() {
                var me = this;

                var colModel = [{
                    name: 'id',
                    key: true,
                    hidden: true
                }, {
                    name: 'name',
                    label: '名称',
                    sortable: false
                }];

                return colModel;
            },

            _initTreeGirdData: function(paramList) {
                var me = this,
                    paramList = paramList || [];

                me.reloadData(paramList);
            },

            reloadData: function(paramList) {
                var me = this;

                me.refParamTreeGrid.grid('reloadData', paramList);
                me.refParamTreeGrid.grid("expandAll");
                var rowDatas = me.refParamTreeGrid.grid("getRowData");
                me.refParamTreeGrid.grid("setSelection", rowDatas[0], true);
            },

            onSubmitClick: function () {
                var me = this;
                var rowdata = me.refParamTreeGrid.grid('getSelection');

                if (rowdata.isParent) {
                    return;
                }

                this.popup.close({
                    refParam: rowdata
                });
            }

        });

        this.init = function () {
            this.$popWin = $targetEl.popedit({
                open: function () {
                    // 创建弹出编辑框
                    fish.popupView({
                        url: this.view,
                        width: 800,
                        height: 600,
                        viewOption: initOptions,
                        close: function (closeData) {
                            // 关闭执行传入函数
                            this.$popWin.popedit("setValue", {
                                "value": closeData.refParam.value,
                                "name": closeData.refParam.name
                            });
                        }.bind(this)
                    });
                }.bind(this)
            });

            return this;
        }.bind(this)();
    }
});