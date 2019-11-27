define([
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/BaseCpTaskCommonAttr',
    'hbs!zcamp/modules/commonprocess/common/processeditor/attrpanel/templates/CpSubProcessTaskCommonAttr.html',
    'i18n!zcamp/modules/commonprocess/common/processeditor/i18n/ProcessEditorAttrPnl.i18n',
    'i18n!zcamp/i18n/Common.i18n',
    'zcamp/modules/commonprocess/tplmgr/dialogs/views/TplProcessSelectDialog'
], function (BaseCpTaskCommonAttr, viewTpl, i18n, commonI18n, TplProcessSelectDialog) {

    return fish.View.extend(fish.extend({}, BaseCpTaskCommonAttr, {
        el: false,

        template: viewTpl,

        i18nData: fish.extend({}, i18n, commonI18n),

        events: {
            'click .selectSubProcess': 'onSelectSubProcess',
            'blur .js-task-name': 'onTaskDataChange',
            'blur .comments': 'onTaskDataChange'
        },

        serialize: function () {
            return this.i18nData;
        },

        initialize: function (params) {
            var me = this;

            me.tplTask = params.cpTplTask;
            me.tplProcessId = me.tplTask ? me.tplTask.tplProcessId : undefined;
        },

        afterRender: function () {
            var me = this;

            me.$execType = me.$('.execType');

            me._initExecTypeSelect();

            if (me.tplTask) {
                me.subTplProcessId = me.tplTask.subTplProcessId;
                me.$('.tpl-task-form').form('value', me.tplTask);

                me._initSubProc();
            }
        },

        _initSubProc: function () {
            var me = this;

            var subProcessMap = {};
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
                fish.each(result, function (value) {
                    subProcessMap[value.id] = value.name;
                });

                me.$("input[name='subProcess']").val(subProcessMap[me.tplTask.subTplProcessId]);
                me.onTaskDataChange();
            },0);
        },

        _initExecTypeSelect: function () {
            var me = this;

            me.initExecTypeSelect(me.$execType, function (result) {
                me.$execType.combobox({
                    change: me.onTaskDataChange.bind(me)
                });

                if (me.tplTask) {
                    me.$execType.combobox('value', me.tplTask.execType);
                }
            });
        },

        onSelectSubProcess: function (e) {
            var me = this;

            fish.popupView({
                url: TplProcessSelectDialog,
                viewOption: {
                    tplProcessId: me.tplProcessId
                },
                height: '555',
                draggable: true,
                close: function (data) {
                    if (data) {
                        me.subTplProcessId = data.id;
                        me.$('.subProcess').val(data.name);

                        me.onTaskDataChange();
                    }
                }
            });
        },

        onTaskDataChange: function (e) {
            var me = this,
                formData = me.getTaskFormData();

            formData.subTplProcessId = me.subTplProcessId;

            me.trigger('taskchange', formData);
        },

        getTaskFormData: function () {
            var me = this,
                formData = me.$('.tpl-task-form').form('value');
            if (me.tplTask) {
                formData = fish.extend({}, me.tplTask, formData);
            }

            me.calcValidState();

            return formData;
        },

        calcValidState: function() {
            var me = this,
                isValid = me.$('.tpl-task-form').isValid(true);

            me.validState = isValid;
        },

        focus: function() {
            var me = this;

            me.$('.js-task-name').focus();
        }
    }));
});