define([
    'zcamp/component/form/baseForm/FormFieldComboTreeField'
], function (FormFieldComboTreeField) {

    return {
        initTypeSelect: function ($el, callback) {
            var me = this,
                i18n = me.i18nData;

            $el.combobox({
                placeholder: i18n.I_TASK_TYPE,
                dataTextField: 'lookupName',
                dataValueField: 'value'
            });

            
            result = [];

            $el.combobox({
                dataSource: result
            });

            if (fish.isFunction(callback)) {
                callback(result);
            }
        },

        initExecTypeSelect: function ($el, callback) {
            var me = this,
                i18n = me.i18nData;

            $el.combobox({
                placeholder: i18n.I_TASK_EXECTYPE,
                dataTextField: 'lookupName',
                dataValueField: 'value'
            });

            setTimeout(function () {
                var result = [{"tableName":"CP_TPL_TASK","columnName":"EXEC_TYPE","value":"AUTO","lookupName":"自动","comments":"自动"},{"tableName":"CP_TPL_TASK","columnName":"EXEC_TYPE","value":"MANUAL","lookupName":"手动","comments":"手动"}];
                result = result || [];

                $el.combobox({
                    dataSource: result
                });

                $el.combobox("enable");

                if (fish.isFunction(callback)) {
                    callback(result);
                }
            },0);
        },

        initActionSelect: function (cfgs) {
            var me = this,
                selector = cfgs.selector,
                onDataChangeFunc = cfgs.onDataChangeFunc,
                value = cfgs.value;

            setTimeout(function () {
                var result = [{
                    "actionName": "oneClickExecuteRemotePlaybook",
                    "displayName": "Execute Remote Playbook",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "commonClusterManagerAction",
                    "displayName": "通用集群管理",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "commonManualPauseAction",
                    "displayName": "人工暂停环节",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "commonPlaybookExecuteCommandAction",
                    "displayName": "通用配方命令执行",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "errorAction",
                    "displayName": "一定错误的Action",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "successAction",
                    "displayName": "一定成功的Action",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "importOracleSqlAction",
                    "displayName": "导入Oracle脚本通过Shell",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "showEnvParamAction",
                    "displayName": "显示环境参数信息",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "iaasKeepalivedAction",
                    "displayName": "IaaS.安装keepalive",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "iaasQmdbAction",
                    "displayName": "IaaS.安装qmdb",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "iaasSpoolAction",
                    "displayName": "IaaS.安装spool",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "importPlanningDataAction",
                    "displayName": "IaaS.导入IaaS规划数据",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "installHostAction",
                    "displayName": "IaaS.安装主机操作系统",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "installNewstartHAAction",
                    "displayName": "IaaS.安装newStart HA",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "installOracleAction",
                    "displayName": "IaaS.安装oracle",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "paresIaasExcelToJsonAction",
                    "displayName": "IaaS.从excel解析成json",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "waitforHostAction",
                    "displayName": "IaaS.等待主机配置",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickCheckJarAction",
                    "displayName": "检测Jar状态",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickCheckMysqlConnectAction",
                    "displayName": "检测Mysql连接状态",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickCheckWebAction",
                    "displayName": "检测web状态",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickCheckZcacheAction",
                    "displayName": "检测zcache状态",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickCheckZmqAction",
                    "displayName": "检测zmq状态",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickCheckZookeeperAction",
                    "displayName": "检测zookeeper状态",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickSendMailAction",
                    "displayName": "发送邮件",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickShowCheckResultAction",
                    "displayName": "一键诊断结果展示",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickBuildAllImageAction",
                    "displayName": "ZCM.获取ZCM应用导出包的镜像",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickDeployMidwareCluster",
                    "displayName": "部署中间件集群",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickImportImageAction",
                    "displayName": "ZCM.导入镜像到仓库",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickQmdbScriptImportAction",
                    "displayName": "导入qmdb脚本",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickQmdbUpgradeAction",
                    "displayName": "PaaS.QMDB集群升级",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickUosflowInstallAction",
                    "displayName": "PaaS Install Uosflow",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickZcacheInstallAction",
                    "displayName": "PaaS.部署zcache集群",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickZcmInitHostsFileAction",
                    "displayName": "Init Hosts file",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickZcmShowHostAction",
                    "displayName": "Show ZCM Planning Data",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickZdaasInstallAction",
                    "displayName": "PaaS Install ZDaaS",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickZmdbScriptImportAction",
                    "displayName": "Import ZMDB Script",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickZmqInstallAction",
                    "displayName": "PaaS.部署zmq集群",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickZookeeperInstallAction",
                    "displayName": "PaaS.部署zookeeper集群",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "zcmCheckImageExistAction",
                    "displayName": "ZCM.检测镜像是否存在",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "showQuickDeployEnvParamAction",
                    "displayName": "Show Quick-deploy Environment Param",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "oneClickVersionPretreatment",
                    "displayName": "工具.从cmo提供的原始版本初始化版本",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "deploySaaSAppAction",
                    "displayName": "SaaS.导入无状态应用",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "deploySaaSStatefulAppAction",
                    "displayName": "SaaS.导入有状态应用",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "importProjectEvnAction",
                    "displayName": "SaaS.导入项目环境变量",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "zcmSyncImageAction",
                    "displayName": "ZCM.镜像同步",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "sccImportScriptAction",
                    "displayName": "SSC导入数据库脚本",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "createBasicClusterAction",
                    "displayName": "ZCM.创建ZCM基础集群",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "createCloudDiskAction",
                    "displayName": "ZCM.创建云盘",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "createGatewayClusterAction",
                    "displayName": "ZCM.导入网关集群",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "createProjectAction",
                    "displayName": "ZCM.导入项目",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "createZoneAction",
                    "displayName": "ZCM.导入zone",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "zcmInstallAction",
                    "displayName": "PaaS.zcm安装",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "jobPlanAnsibleAction",
                    "displayName": "作业计划.作业项子项.ANSIBLE",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "jobPlanSqlAction",
                    "displayName": "作业计划.作业项子项.SQL",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "jobPlanSshAction",
                    "displayName": "作业计划.作业项子项.SSH",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "commonProcessParamRuleTestAction",
                    "displayName": "Example for Param Rule Test Action",
                    "inParams": null,
                    "outParams": null
                }, {
                    "actionName": "commonProcessBlankAction",
                    "displayName": "样例.通用流程.空白动作(总是成功)",
                    "inParams": ["JDK_VERSION", "IP"],
                    "outParams": ["TOMCAT_IP"]
                }, {
                    "actionName": "commonProcessFailureAction",
                    "displayName": "样例.通用流程.空白动作(总是失败)",
                    "inParams": null,
                    "outParams": null
                }];
                var cfgs = {
                    dataSource: result,
                    valueFieldName: "actionName",
                    fullPathFieldName: "displayName",
                    separator: ".",
                    searchFilter: true,
                    dropdownWidth: 250,
                    value: value,

                    width: 12,
                    labelWd: 4,
                    allowBlank: false,
                    labelText: me.i18nData.I_TASK_ACTION,
                    name: "action"
                };
                var taskActionView = new FormFieldComboTreeField(cfgs);
                taskActionView.on("change", onDataChangeFunc);
                me.taskActionView = taskActionView;

                me.insertView(selector, taskActionView);
                me.renderViews([taskActionView]);
            },0);
        },

        initPlaybookSelect: function ($el, callback) {
            var me = this,
                i18n = me.i18nData;

            $el.combobox({
                placeholder : '',
                dataTextField: "fileName",
                dataValueField: "fileName"
            });

            setTimeout(function() {
             
                var result = [{
                    "fileName": "yqc",
                    "filePath": "/lvdata/appserver/application/playbook/4/",
                    "fileSize": 47,
                    "modifyDate": "2018-12-13 11:01:38",
                    "dirFlag": true,
                    "seq": null,
                    "contentType": null
                }, {
                    "fileName": "xxlxx",
                    "filePath": "/lvdata/appserver/application/playbook/4/",
                    "fileSize": 57,
                    "modifyDate": "2019-01-26 09:44:16",
                    "dirFlag": true,
                    "seq": null,
                    "contentType": null
                }, {
                    "fileName": "巡检-内存",
                    "filePath": "/lvdata/appserver/application/playbook/4/",
                    "fileSize": 60,
                    "modifyDate": "2019-01-26 15:17:22",
                    "dirFlag": true,
                    "seq": null,
                    "contentType": null
                }, {
                    "fileName": "巡检-cpu",
                    "filePath": "/lvdata/appserver/application/playbook/4/",
                    "fileSize": 60,
                    "modifyDate": "2019-05-30 14:22:20",
                    "dirFlag": true,
                    "seq": null,
                    "contentType": null
                }, {
                    "fileName": "yqc-2",
                    "filePath": "/lvdata/appserver/application/playbook/4/",
                    "fileSize": 60,
                    "modifyDate": "2019-02-19 09:55:38",
                    "dirFlag": true,
                    "seq": null,
                    "contentType": null
                }, {
                    "fileName": "ZCM-iMonitor",
                    "filePath": "/lvdata/appserver/application/playbook/4/",
                    "fileSize": 103,
                    "modifyDate": "2019-04-01 17:37:29",
                    "dirFlag": true,
                    "seq": null,
                    "contentType": null
                }, {
                    "fileName": "ZCM-iBase",
                    "filePath": "/lvdata/appserver/application/playbook/4/",
                    "fileSize": 103,
                    "modifyDate": "2019-04-01 17:37:29",
                    "dirFlag": true,
                    "seq": null,
                    "contentType": null
                }, {
                    "fileName": "ZCM-k8s",
                    "filePath": "/lvdata/appserver/application/playbook/4/",
                    "fileSize": 103,
                    "modifyDate": "2019-04-01 17:37:29",
                    "dirFlag": true,
                    "seq": null,
                    "contentType": null
                }, {
                    "fileName": "ZCM-iPlatform",
                    "filePath": "/lvdata/appserver/application/playbook/4/",
                    "fileSize": 122,
                    "modifyDate": "2019-04-01 17:37:29",
                    "dirFlag": true,
                    "seq": null,
                    "contentType": null
                }, {
                    "fileName": "ZCM-init",
                    "filePath": "/lvdata/appserver/application/playbook/4/",
                    "fileSize": 124,
                    "modifyDate": "2019-04-01 17:37:29",
                    "dirFlag": true,
                    "seq": null,
                    "contentType": null
                }, {
                    "fileName": "ZCM-iTracing-bak",
                    "filePath": "/lvdata/appserver/application/playbook/4/",
                    "fileSize": 4096,
                    "modifyDate": "2019-04-01 17:37:29",
                    "dirFlag": true,
                    "seq": null,
                    "contentType": null
                }, {
                    "fileName": "ZCM-iTracing-bak1",
                    "filePath": "/lvdata/appserver/application/playbook/4/",
                    "fileSize": 4096,
                    "modifyDate": "2019-04-01 23:17:57",
                    "dirFlag": true,
                    "seq": null,
                    "contentType": null
                }, {
                    "fileName": "ZCM-iTracing",
                    "filePath": "/lvdata/appserver/application/playbook/4/",
                    "fileSize": 4096,
                    "modifyDate": "2019-04-01 23:31:41",
                    "dirFlag": true,
                    "seq": null,
                    "contentType": null
                }, {
                    "fileName": "ZCM-env-check",
                    "filePath": "/lvdata/appserver/application/playbook/4/",
                    "fileSize": 112,
                    "modifyDate": "2019-04-02 00:34:46",
                    "dirFlag": true,
                    "seq": null,
                    "contentType": null
                }, {
                    "fileName": "ZCM-init-harbor",
                    "filePath": "/lvdata/appserver/application/playbook/4/",
                    "fileSize": 152,
                    "modifyDate": "2019-04-02 11:56:43",
                    "dirFlag": true,
                    "seq": null,
                    "contentType": null
                }, {
                    "fileName": "巡检-cpu_1",
                    "filePath": "/lvdata/appserver/application/playbook/4/",
                    "fileSize": 60,
                    "modifyDate": "2019-05-30 14:23:17",
                    "dirFlag": true,
                    "seq": null,
                    "contentType": null
                }, {
                    "fileName": "qmdb升级到双节点",
                    "filePath": "/lvdata/appserver/application/playbook/4/",
                    "fileSize": 112,
                    "modifyDate": "2019-05-23 14:59:30",
                    "dirFlag": true,
                    "seq": null,
                    "contentType": null
                }, {
                    "fileName": "qmdb-mamage",
                    "filePath": "/lvdata/appserver/application/playbook/4/",
                    "fileSize": 81,
                    "modifyDate": "2019-06-04 11:58:35",
                    "dirFlag": true,
                    "seq": null,
                    "contentType": null
                }, {
                    "fileName": "xj-disk",
                    "filePath": "/lvdata/appserver/application/playbook/4/",
                    "fileSize": 73,
                    "modifyDate": "2019-07-01 18:40:54",
                    "dirFlag": true,
                    "seq": null,
                    "contentType": null
                }, {
                    "fileName": "jxtest",
                    "filePath": "/lvdata/appserver/application/playbook/4/",
                    "fileSize": 33,
                    "modifyDate": "2019-06-05 16:14:33",
                    "dirFlag": true,
                    "seq": null,
                    "contentType": null
                }, {
                    "fileName": "巡检-磁盘",
                    "filePath": "/lvdata/appserver/application/playbook/4/",
                    "fileSize": 60,
                    "modifyDate": "2019-06-17 20:15:57",
                    "dirFlag": true,
                    "seq": null,
                    "contentType": null
                }];

                $el.combobox({
                    dataSource: result
                });

                if (fish.isFunction(callback)) {
                    callback(result);
                }
            },0); 
        },

        initSqlDatasourceSelect: function ($el, params, callback) {
            var me = this,
                i18n = me.i18nData;

            $el.combobox({
                placeholder : '',
                dataTextField: "dsName",
                dataValueField: "dsId"
            });

           setTimeout(function () {
                var result = [];

                $el.combobox({
                    dataSource: result
                });

                if (fish.isFunction(callback)) {
                    callback(result);
                }
            }, 0);
        },
        setTaskName: function (taskName) {
            var me = this;

            me.$('.js-task-name').val(taskName);
            me.$('.js-task-name').trigger('blur');
        }
    }
});