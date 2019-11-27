define([
    'hbs!zcamp/modules/commonprocess/common/processeditor/templates/ProcessEditorErrorMsgsPnl.html',
    'i18n!zcamp/modules/commonprocess/common/processeditor/i18n/ProcessEditor.i18n',
    'i18n!zcamp/i18n/Common.i18n',
    'zcamp/component/grid/GridPanel'
], function (viewTpl, i18n, commonI18n, GridPanel) {

    return fish.View.extend({
        //视图Dom元素，设为false,则直接采用模板内容作为Dom元素
        el: false,
        //模板函数
        template: viewTpl,

        i18nData: fish.extend({}, commonI18n, i18n),

        //提供模板数据
        serialize: function () {
            return this.i18nData;
        },
        
        //视图事件低定义
        events:{

        },

        initialize: function (param) {
            var me = this;
            var i18n = me.i18nData;

            me.errorMsgGrid = me._buildGrid();
            me.setViews({
                'div.grid': me.errorMsgGrid
            });
        },

        _buildGrid: function () {
            var me = this,
                columns = me._buildColModel();

            var options = {
                columns: columns,
                gridConfig: {
                    pager: false,
                    onSelectRow: me.onSelectedRow,
                    onSelectRowFuncScope: me,
                    height: 'auto',
                    onDblClickRow: function (e, rowid, iRow, iCol) {
                        me._focusErrorNode(rowid);
                    }
                }
            };

            return new GridPanel(options);
        },

        _buildColModel: function () {
            var me = this,
                i18n = me.i18nData;

            return [{
                name: 'resourceId',
                label: "",
                key: true,
                hidden: true
            }, {
                name: 'msg',
                label: "",
                formatter: function (cellval, opts, rwdat, _act) {
                    return '<span class="label label-danger">' + i18n.ERROR + '</span> ' + cellval;
                }
            }];
        },

        _focusErrorNode: function (resourceId) {
            var me = this;

            me.trigger("focusErrorNode", resourceId);
        },

        loadErrorMsgs: function (errorMsgs) {
            var me = this;
            me.errorMsgGrid.loadData(errorMsgs);
        },

        // 视图被删除时候做的事情
        cleanup: function () {
            var me = this;
        }

    })
});