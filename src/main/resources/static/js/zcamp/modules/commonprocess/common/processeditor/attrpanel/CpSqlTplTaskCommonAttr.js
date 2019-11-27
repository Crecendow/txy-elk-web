define([
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/BaseCpTaskCommonAttr',
    'hbs!zcamp/modules/commonprocess/common/processeditor/attrpanel/templates/CpSqlTplTaskCommonAttr.html',
    'i18n!zcamp/modules/commonprocess/common/processeditor/i18n/ProcessEditorAttrPnl.i18n',
    'i18n!zcamp/i18n/Common.i18n',
    'zcamp/modules/commonprocess/tplmgr/common/TplMgrConstants',
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/dialogs/TplTaskContentPopEditView',
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/dialogs/TplTaskFileGridView'
], function (BaseCpTaskCommonAttr, viewTpl, i18n, commonI18n, TplMgrConstants,
            TplTaskContentPopEditView, TplTaskFileGridView) {

    return fish.View.extend(fish.extend({}, BaseCpTaskCommonAttr, {
        el: false,

        template: viewTpl,

        i18nData: fish.extend({}, i18n, commonI18n),

        events: {
            'blur .js-task-name': 'onTaskDataChange',
            'blur .comments': 'onTaskDataChange',
            'click input[name="sqlContentType"]': 'sqlContentTypeChange',
            'click input[name="transType"]': 'transTypeChange',
            'click input[name="dsExecType"]': 'dsExecTypeChange',
            'click input[name="filterDdl"]': 'filterDdlChange',
            'click input[name="onError"]': 'onErrorChange'
        },

        serialize: function () {
            return this.i18nData;
        },

        initialize: function (options) {
            var me = this;

            me.tplTask = options.cpTplTask;
            me.buildInParamDtoList = options.buildInParamDtoList;
            if (me.tplTask) {
                me.tplTaskId = me.tplTask.id;
            }

            me.createdUserId = 4;
            me.portalId = 1;
            me.tenantId = 1;
            me.projectId = null;

            me._parseBuildInDatasourceAndRemotePath();

            me.fileGridView = me._buildTplTaskFileGridView();
            me.fileGridView.on('remotePathChange', me.onRemotePathChange, me);
            me.setViews({
                'div.js-sql-file-grid-view': me.fileGridView
            });
        },

        _buildTplTaskFileGridView: function () {
            var me = this,
                TplTaskFileGridViewRef = me._getTplTaskFileGridView();

            return new TplTaskFileGridViewRef({
                remotePath: me.remotePath,
                tplTask: me.tplTask
            });
        },

        _getTplTaskFileGridView: function () {
            return TplTaskFileGridView;
        },

        afterRender: function () {
            var me = this;

            me.$sqlDatasource = me.$('.js-sql-datasource');
            me.$execType = me.$('.execType');

            me._initExecTypeSelect();
            me._initSqlDatasourceSelect();
            me._initSqlExtralAttrSelect();
            me._initSqlContentEditPop();
            me._initSqlFileGridView();

            if (me.tplTask) {
                me.$('.js-task-name').val(me.tplTask.name);
                me.$('.comments').val(me.tplTask.comments);
                // me.$('.tpl-task-form').form('value', me.tplTask);
            }
        },

        _parseBuildInDatasourceAndRemotePath: function () {
            var me = this;

            if (fish.isEmpty(me.buildInParamDtoList)) {
                return;
            }

            fish.each(me.buildInParamDtoList, function (buildInParamDto) {
                var buildInParam = buildInParamDto.cpTplTaskParam;
                if (!buildInParam) {
                    return;
                }
                if (buildInParam.code == 'BUILD_IN_PARAM_DS') {
                    me.dsParamId = buildInParam.id;
                    me.sqlDatasource = buildInParam.value;
                }
                else if (buildInParam.code == 'BUILD_IN_PARAM_TRANSTYPE') {
                    me.transTypeParamId = buildInParam.id;
                    me.transType = buildInParam.value;
                }
                else if (buildInParam.code == 'BUILD_IN_PARAM_EXECTYPE') {
                    me.execTypeParamId = buildInParam.id;
                    me.dsExecType = buildInParam.value;
                }
                else if (buildInParam.code == 'BUILD_IN_PARAM_FILTERDDL') {
                    me.filterDdlParamId = buildInParam.id;
                    me.filterDdl = buildInParam.value;
                }
                else if (buildInParam.code == 'BUILD_IN_PARAM_ONERROR') {
                    me.onErrorParamId = buildInParam.id;
                    me.onError = buildInParam.value;
                }
                else if (buildInParam.code == 'BUILD_IN_PARAM_CONTENT') {
                    me.contentParamId = buildInParam.id;
                    me.sqlContent = buildInParam.value;
                }
                else if (buildInParam.code == 'BUILD_IN_PARAM_FILE') {
                    me.contentParamId = buildInParam.id;
                    me.remotePath = buildInParam.value;
                }
            });
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

        _initSqlDatasourceSelect: function () {
            var me = this;

            var params = {};
            params.createdUserId = me.createdUserId;
            if (me.portalId == 1) {
                // 系统管理员，查询所有的数据源信息
                params.portalId = me.portalId;
            } else if (me.portalId == 2) {
                // 租户管理员，查询租户下的所有数据源信息
                params.portalId = me.portalId;
                if (me.tenantId) {
                    params.tenantId = me.tenantId;
                }
            } else {
                if (me.tenantId) {
                    params.tenantId = me.tenantId;
                }
                if (me.projectId) {
                    params.projectId = me.projectId;
                }
            }

            me.initSqlDatasourceSelect(me.$sqlDatasource, params, function (result) {
                me.$sqlDatasource.combobox({
                    change: me.onSqlDataSourceChange.bind(me)
                });

                if (me.sqlDatasource) {
                    me.$sqlDatasource.combobox('value', me.sqlDatasource);
                }
            });
        },

        _initSqlExtralAttrSelect: function () {
            var me = this;

            if (me.transType && me.transType == '1') {
                me.$('input[name="transType"][value="1"]').prop('checked', true);
                me.$('input[name="transType"][value="0"]').prop('checked', false);
            }
            else {
                me.$('input[name="transType"][value="1"]').prop('checked', false);
                me.$('input[name="transType"][value="0"]').prop('checked', true);
            }

            if (me.dsExecType && me.dsExecType == 'S') {
                me.$('input[name="dsExecType"][value="S"]').prop('checked', true);
                me.$('input[name="dsExecType"][value="M"]').prop('checked', false);
            }
            else {
                me.$('input[name="dsExecType"][value="S"]').prop('checked', false);
                me.$('input[name="dsExecType"][value="M"]').prop('checked', true);
            }

            if (me.filterDdl && me.filterDdl == 'Y') {
                me.$('input[name="filterDdl"][value="Y"]').prop('checked', true);
                me.$('input[name="filterDdl"][value="N"]').prop('checked', false);
            }
            else {
                me.$('input[name="filterDdl"][value="Y"]').prop('checked', false);
                me.$('input[name="filterDdl"][value="N"]').prop('checked', true);
            }

            if (me.onError && me.onError == 'C') {
                me.$('input[name="onError"][value="C"]').prop('checked', true);
                me.$('input[name="onError"][value="S"]').prop('checked', false);
            }
            else {
                me.$('input[name="onError"][value="C"]').prop('checked', false);
                me.$('input[name="onError"][value="S"]').prop('checked', true);
            }
        },

        _initSqlContentEditPop: function () {
            var me = this,
                fileContent = '';

            if (me.sqlContent) {
                fileContent = me.sqlContent;
                me.$('input[name="sqlContentType"][value="I"]').prop('checked', true);
                me.$('input[name="sqlContentType"][value="U"]').prop('checked', false);
                me.$('input[name="sqlContentType"][value="I"]').trigger('click');
            }

            me.sqlContentPopView = new TplTaskContentPopEditView(me.$('.js-sql-content'), {
                dialogType: 'edit',
                fileContent: fileContent
            });
            me.sqlContentPopView.setValue(fileContent, fileContent);
            me.$('.js-sql-content').bind('valueChange', me, me.onSqlContentChange);
        },

        _initSqlFileGridView: function () {
            var me = this;

            if (me.remotePath) {
                me.$('input[name="sqlContentType"][value="U"]').prop('checked', true);
                me.$('input[name="sqlContentType"][value="I"]').prop('checked', false);
                me.$('input[name="sqlContentType"][value="U"]').trigger('click');
            }
        },

        sqlContentTypeChange: function (e) {
            var me =  this ;

            if (e.target.value == 'U') {
                me.$(".js-sql-content-div").hide();
                me.$(".js-sql-file-div").show();
            } else {
                me.$(".js-sql-content-div").show();
                me.$(".js-sql-file-div").hide();
            }
        },

        setTaskName: function (taskName) {
            var me = this;

            me.$('.js-task-name').val(taskName);
            me.$('.js-task-name').trigger('blur');
        },

        onSqlDataSourceChange: function (e) {
            var me = this,
                datasource = e.target.value;

            me.sqlDatasource = datasource;
            me.oBuildInTaskParamChange();
        },

        onSqlContentChange: function (e) {
            var me = e.data,
                content = me.sqlContentPopView.getValue();

            me.sqlContent = content.value;
            me.oBuildInTaskParamChange();
        },

        onRemotePathChange: function (remotePath) {
            var me = this;

            me.remotePath = remotePath;
            me.oBuildInTaskParamChange();
        },

        onTaskDataChange: function (e) {
            var me = this,
                formData = me.getTaskFormData();

            me.trigger('taskchange', formData);
        },

        transTypeChange: function (e) {
            var me =  this;

            me.transType = e.target.value;
            me.oBuildInTaskParamChange();
        },

        dsExecTypeChange: function (e) {
            var me =  this;

            me.dsExecType = e.target.value;
            me.oBuildInTaskParamChange();
        },

        filterDdlChange: function (e) {
            var me =  this;

            me.filterDdl = e.target.value;
            me.oBuildInTaskParamChange();
        },

        onErrorChange: function (e) {
            var me =  this;

            me.onError = e.target.value;
            me.oBuildInTaskParamChange();
        },

        oBuildInTaskParamChange: function () {
            var me = this,
                buildInParamDtoList = [],
                sqlContentType = me.$('input[name="sqlContentType"]:checked').val();

            if (me.sqlDatasource) {
                buildInParamDtoList.push({
                    cpTplTaskParam: {
                        id: me.dsParamId,
                        tplTaskId: me.tplTaskId,
                        position: TplMgrConstants.TASK_PARAM_POSITION_IN,
                        type: TplMgrConstants.TASK_PARAM_TYPE_BUILDIN,
                        code: TplMgrConstants.BUILD_IN_PARAM_DS,
                        value: me.sqlDatasource
                    }
                });
            }

            if (me.transType) {
                buildInParamDtoList.push({
                    cpTplTaskParam: {
                        id: me.transTypeParamId,
                        tplTaskId: me.tplTaskId,
                        position: TplMgrConstants.TASK_PARAM_POSITION_IN,
                        type: TplMgrConstants.TASK_PARAM_TYPE_BUILDIN,
                        code: TplMgrConstants.BUILD_IN_PARAM_TRANSTYPE,
                        value: me.transType
                    }
                });
            }

            if (me.dsExecType) {
                buildInParamDtoList.push({
                    cpTplTaskParam: {
                        id: me.execTypeParamId,
                        tplTaskId: me.tplTaskId,
                        position: TplMgrConstants.TASK_PARAM_POSITION_IN,
                        type: TplMgrConstants.TASK_PARAM_TYPE_BUILDIN,
                        code: TplMgrConstants.BUILD_IN_PARAM_EXECTYPE,
                        value: me.dsExecType
                    }
                });
            }

            if (me.filterDdl) {
                buildInParamDtoList.push({
                    cpTplTaskParam: {
                        id: me.filterDdlParamId,
                        tplTaskId: me.tplTaskId,
                        position: TplMgrConstants.TASK_PARAM_POSITION_IN,
                        type: TplMgrConstants.TASK_PARAM_TYPE_BUILDIN,
                        code: TplMgrConstants.BUILD_IN_PARAM_FILTERDDL,
                        value: me.filterDdl
                    }
                });
            }

            if (me.onError) {
                buildInParamDtoList.push({
                    cpTplTaskParam: {
                        id: me.onErrorParamId,
                        tplTaskId: me.tplTaskId,
                        position: TplMgrConstants.TASK_PARAM_POSITION_IN,
                        type: TplMgrConstants.TASK_PARAM_TYPE_BUILDIN,
                        code: TplMgrConstants.BUILD_IN_PARAM_ONERROR,
                        value: me.onError
                    }
                });
            }

            var sqlTaskParam = {
                id: me.contentParamId,
                tplTaskId: me.tplTaskId,
                position: TplMgrConstants.TASK_PARAM_POSITION_IN,
                type: TplMgrConstants.TASK_PARAM_TYPE_BUILDIN
            };

            if (sqlContentType == 'I') {
                sqlTaskParam.code = TplMgrConstants.BUILD_IN_PARAM_CONTENT;
                sqlTaskParam.value = me.sqlContent;
                buildInParamDtoList.push({
                    cpTplTaskParam: sqlTaskParam
                });
            }
            else if (sqlContentType == 'U') {
                sqlTaskParam.code = TplMgrConstants.BUILD_IN_PARAM_FILE;
                sqlTaskParam.value = me.remotePath;
                buildInParamDtoList.push({
                    cpTplTaskParam: sqlTaskParam
                });
            }

            me.trigger('oBuildInTaskParamChange', buildInParamDtoList);
        },

        getTaskFormData: function () {
            var me = this,
                formData = me.$('.tpl-task-form').form('value');

            me.calcValidState();

            return formData;
        },

        calcValidState: function() {
            var me = this,
                isValid = me.$('.tpl-task-form').isValid(true);

            me.validState = isValid;
        }
    }));
});