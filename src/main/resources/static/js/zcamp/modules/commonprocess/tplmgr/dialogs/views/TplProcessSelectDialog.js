define([
    'zcamp/component/panel/PortletPanel',
    'hbs!zcamp/modules/commonprocess/tplmgr/dialogs/templates/TplProcessSelectDialog.html',
    'i18n!zcamp/modules/commonprocess/tplmgr/i18n/TplProcessList.i18n',
    'i18n!zcamp/i18n/Common.i18n',
    'zcamp/modules/common/ZUtils',
    'zcamp/component/grid/GridPanel'
], function (PortletPanel, TplProcessSelectDialog, i18n, commonI18n, ZUtils, GridPanel) {
    // 继承我们自己的基类
    return fish.View.extend({
        el: false,

        template: TplProcessSelectDialog,

        // 多资源文件引入
        i18nData: fish.extend({}, i18n, commonI18n),

        serialize: function () {
            return this.i18nData;
        },

        events: {
            "click .buttonCancle": "buttonCancle",
            "click .buttonFinish": "buttonFinish"
        },

        initialize: function (param) {
            var me = this;
            me.tplProcessId = param.tplProcessId;
            me.tplProcessListGrid = me._buildGrid();
            me.setViews({
                'div.tpl-process-list': me.tplProcessListGrid
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
                    height: 400
                }
            };
            return new GridPanel(options);
        },

        _buildColModel: function () {
            var me = this,
                i18n = me.i18nData;
            return [{
                name: 'id',
                hidden: true,
                key: true,
                sortable: false
            }, {
                name: 'name',
                label: i18n.T_PROCESS_NAME,
                sortable: false
            }, {
                name: 'code',
                label: i18n.T_PROCESS_CODE,
                sortable: false
            }, {
                name: 'category',
                label: i18n.T_PROCESS_CATEGORY,
                sortable: false
            }];
        },

        afterRender: function () {
            var me = this;
            me.reloadGridData();
        },

        reloadGridData: function () {
            var me = this,
                meEl = me.$el,
                i18n = me.i18nData;

            ZUtils.Msg.block(meEl, i18n.LOADING);
            this.qrySubTplProcessList(me, meEl);
        },

        qrySubTplProcessList: function(me, meEl) {
                    setTimeout(function () {
                        var result = [{
                            "id": 2,
                            "name": "中间件部署",
                            "code": "SERVICE_COMPONENT",
                            "category": "OKDEPLOY",
                            "bisDomain": "ALL",
                            "createdUser": "4",
                            "createdDate": "2019-05-20 18:10:39",
                            "state": "R",
                            "comments": ""
                        }, {
                            "id": 3,
                            "name": "一键部署-环境确认",
                            "code": "CONFIRM_PARAM",
                            "category": "OKDEPLOY",
                            "bisDomain": "ALL",
                            "createdUser": "4",
                            "createdDate": "2019-05-20 18:14:39",
                            "state": "R",
                            "comments": ""
                        }, {
                            "id": 4,
                            "name": "一键部署PAAS",
                            "code": "OK_DEPLOY_PAAS",
                            "category": "OKDEPLOY",
                            "bisDomain": "ALL",
                            "createdUser": "4",
                            "createdDate": "2019-05-20 18:19:23",
                            "state": "R",
                            "comments": ""
                        }, {
                            "id": 5,
                            "name": "一键部署SAAS",
                            "code": "OK_DEPLOY_SAAS",
                            "category": "OKDEPLOY",
                            "bisDomain": "ALL",
                            "createdUser": "4",
                            "createdDate": "2019-05-20 18:39:12",
                            "state": "R",
                            "comments": ""
                        }, {
                            "id": 6,
                            "name": "CMO版本生成",
                            "code": "CREATE_VERSION",
                            "category": "OKDEPLOY",
                            "bisDomain": "ALL",
                            "createdUser": "4",
                            "createdDate": "2019-05-21 10:57:29",
                            "state": "R",
                            "comments": ""
                        }, {
                            "id": 12,
                            "name": "OCS_QMDB从单节点升级到双机节点-回退",
                            "code": "QMDB_UPGRADE_1_TO_2_ROLLBACK",
                            "category": "OKDEPLOY",
                            "bisDomain": "ALL",
                            "createdUser": "4",
                            "createdDate": "2019-05-27 10:12:47",
                            "state": "R",
                            "comments": ""
                        }, {
                            "id": 14,
                            "name": "B_OCS_QMDB从单节点升级到双机节点",
                            "code": "QMDB_UPGRADE_1_TO_2",
                            "category": "OKDEPLOY",
                            "bisDomain": "ALL",
                            "createdUser": "4",
                            "createdDate": "2019-05-28 13:16:57",
                            "state": "R",
                            "comments": ""
                        }, {
                            "id": 15,
                            "name": "B_OCS_QMDB从单节点升级到双机节点-回退",
                            "code": "QMDB_UPGRADE_1_TO_2_ROLLBACK",
                            "category": "OKDEPLOY",
                            "bisDomain": "ALL",
                            "createdUser": "4",
                            "createdDate": "2019-05-28 13:17:02",
                            "state": "R",
                            "comments": ""
                        }, {
                            "id": 16,
                            "name": "子流程：预定义一键部署环境信息",
                            "code": "QUICK_DEPLOY_ENV_PARAM",
                            "category": "OKDEPLOY",
                            "bisDomain": "ALL",
                            "createdUser": "2",
                            "createdDate": "2019-05-28 22:50:20",
                            "state": "R",
                            "comments": ""
                        }, {
                            "id": 17,
                            "name": "预定义一键部署服务技术组件",
                            "code": "OCD_QUICK_MIDWARE",
                            "category": "OKDEPLOY",
                            "bisDomain": "ALL",
                            "createdUser": "2",
                            "createdDate": "2019-05-28 22:52:07",
                            "state": "R",
                            "comments": ""
                        }, {
                            "id": 27,
                            "name": "qmdb双节点升级-回退",
                            "code": "QMDB_DOUBLE_NODE_MGR",
                            "category": "OKDEPLOY",
                            "bisDomain": "ALL",
                            "createdUser": "4",
                            "createdDate": "2019-06-03 19:12:20",
                            "state": "R",
                            "comments": ""
                        }, {
                            "id": 52,
                            "name": "子流程：预定义一键部署环境信息",
                            "code": "QUICK_DEPLOY_ENV_PARAM_TOPO",
                            "category": "OKDEPLOY",
                            "bisDomain": "ALL",
                            "createdUser": "4",
                            "createdDate": "2019-06-17 19:33:24",
                            "state": "R",
                            "comments": ""
                        }, {
                            "id": 53,
                            "name": "预定义一键部署服务技术组件",
                            "code": "OCD_QUICK_MIDWARE_TOPO",
                            "category": "OKDEPLOY",
                            "bisDomain": "ALL",
                            "createdUser": "4",
                            "createdDate": "2019-06-17 19:38:53",
                            "state": "R",
                            "comments": ""
                        }, {
                            "id": 56,
                            "name": "ces",
                            "code": "IAAS_EXCEL",
                            "category": "OKDEPLOY",
                            "bisDomain": "ALL",
                            "createdUser": "4",
                            "createdDate": "2019-07-01 18:35:21",
                            "state": "R",
                            "comments": ""
                        }, {
                            "id": 57,
                            "name": "zk",
                            "code": "IAAS_EXCEL",
                            "category": "OKDEPLOY",
                            "bisDomain": "ALL",
                            "createdUser": "4",
                            "createdDate": "2019-07-02 17:06:39",
                            "state": "R",
                            "comments": ""
                        }];
                        ZUtils.Msg.unblock(meEl);
                        me.tplProcessListGrid.loadData(result);
                    },0);
        },

        buttonCancle: function (e) {
            var me = this;
            me.popup.close(false);
        },

        buttonFinish: function () {
            var me = this,
                i18n = me.i18nData;

            var data = me.tplProcessListGrid.getSelection();
            if ($.isEmptyObject(data)) {
                ZUtils.Msg.showError(i18n.D_SELECT_SUB_PROCESS, i18n.D_SELECT_CONFIRM);
                return;
            } else {
                var param = {
                    id: data.id,
                    name: data.name
                }
                me.popup.close(param);
            }
        },

        // 视图被删除时候做的事情
        cleanup: function () {
            var me = this;
            // 手工删除对dom元素和复杂对象的引用
            delete me.tplProcessListGrid;
        }
    });
});