define([
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/BaseCpTaskCommonAttr',
    'hbs!zcamp/modules/commonprocess/common/processeditor/attrpanel/templates/CpAnsibleTplTaskCommonAttr.html',
    'i18n!zcamp/modules/commonprocess/common/processeditor/i18n/ProcessEditorAttrPnl.i18n',
    'i18n!zcamp/i18n/Common.i18n',
    'zcamp/modules/commonprocess/tplmgr/common/TplMgrConstants',
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/dialogs/TplTaskFileGridView'
], function (BaseCpTaskCommonAttr, viewTpl, i18n, commonI18n, TplMgrConstants, TplTaskFileGridView) {

    return fish.View.extend(fish.extend({}, BaseCpTaskCommonAttr, {
        el: false,

        template: viewTpl,

        i18nData: fish.extend({}, i18n, commonI18n),

        events: {
            'blur .js-task-name': 'onTaskDataChange',
            'blur .comments': 'onTaskDataChange',
            'click input[name="ansibleContentType"]': 'ansibleContentTypeChange'
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

            me._parseBuildInContentAndRemotePath();

            me.fileGridView = me._buildTplTaskFileGridView();
            me.fileGridView.on('remotePathChange', me.onRemotePathChange, me);
            me.fileGridView.on('parsedParamsChange', me.onParsedParamsChange, me);
            me.setViews({
                'div.js-ansible-file-grid-view': me.fileGridView
            });
        },

        _buildTplTaskFileGridView: function () {
            var me = this,
                TplTaskFileGridViewRef = me._getTplTaskFileGridView();

            return new TplTaskFileGridViewRef({
                dialogType: 'ansible',
                remotePath: me.remotePath,
                tplTask: me.tplTask
            });
        },

        _getTplTaskFileGridView: function () {
            return TplTaskFileGridView;
        },

        afterRender: function () {
            var me = this;

            me.$playbook = me.$('.ansiblePlaybook');
            me.$execType = me.$('.execType');

            me._initExecTypeSelect();
            me._initPlaybookSelect();
            me._initAnsibleFileGridView();

            if (me.tplTask) {
                me.$('.js-task-name').val(me.tplTask.name);
                me.$('.comments').val(me.tplTask.comments);
                // me.$('.tpl-task-form').form('value', me.tplTask);
            }
        },

        _parseBuildInContentAndRemotePath: function () {
            var me = this;

            if (fish.isEmpty(me.buildInParamDtoList)) {
                return;
            }

            fish.each(me.buildInParamDtoList, function (buildInParamDto) {
                var buildInParam = buildInParamDto.cpTplTaskParam;
                if (!buildInParam) {
                    return;
                }

                if (buildInParam.code == 'BUILD_IN_PARAM_CONTENT') {
                    me.contentParamId = buildInParam.id;
                    me.playbook = buildInParam.value;
                    me.playbookName = me.playbook.slice(me.playbook.lastIndexOf("/") + 1);
                    me.playbookPath = me.playbook.slice(0, -(me.playbookName.length));
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

        _initPlaybookSelect: function () {
            var me = this;

            me.initPlaybookSelect(me.$playbook, function (result) {
                if (me.playbook) {
                    me.$playbook.combobox('value', me.playbookName);
                }

                me.$playbook.combobox({
                    change: me.onPlaybookChange.bind(me)
                });
            });
        },

        _initAnsibleFileGridView: function () {
            var me = this;

            if (me.remotePath) {
                me.$('input[name="ansibleContentType"][value="U"]').attr('checked', true);
                me.$('input[name="ansibleContentType"][value="I"]').attr('checked', false);
                me.$('input[name="ansibleContentType"][value="U"]').trigger('click');
            }
        },

        ansibleContentTypeChange: function (e) {
            var me =  this ;

            if (e.target.value == 'U') {
                me.$('.ansible-playbook-select').hide();
                me.$('.js-ansible-file-div').show();
            } else {
                me.$('.ansible-playbook-select').show();
                me.$('.js-ansible-file-div').hide();
            }
        },

        setTaskName: function (taskName) {
            var me = this;

            me.$('.js-task-name').val(taskName);
            me.$('.js-task-name').trigger('blur');
        },

        onPlaybookChange: function (e) {
            var me = this,
                playbookName = e.target.value;
            me.trigger('needBlock');
            me.copyPlaybook(playbookName, function (playbook) {
                me.trigger('needBlock');
                me.playbook = playbook;
                me.playbookName = playbookName;
                me.playbookPath = me.playbook.slice(0, -(me.playbookName.length));
                me.parseFileParams(me.playbookPath, function (paramList) {
                    me.onParsedParamsChange(paramList);
                }, function () {
                    me.trigger('needUnBlock');
                });
                me.oBuildInTaskParamChange();
            }, function () {
                me.trigger('needUnBlock');
            });
        },

        onRemotePathChange: function (remotePath) {
            var me = this;

            me.remotePath = remotePath;
            me.oBuildInTaskParamChange();
        },

        onParsedParamsChange: function (parsedParams) {
            var me = this,
                parsedParamDtoList = [];

            fish.each(parsedParams, function(parsedParam) {
                if (!parsedParam) {
                    return;
                }
                parsedParamDtoList.push({
                    cpTplTaskParam: fish.extend({
                        "type": "VALUE"
                    }, parsedParam)
                });
            });

            me.trigger('parsedParamsChange', parsedParamDtoList);
        },

        onTaskDataChange: function (e) {
            var me = this,
                formData = me.getTaskFormData();

            me.trigger('taskchange', formData);
        },

        oBuildInTaskParamChange: function () {
            var me = this,
                buildInParamDtoList = [],
                ansibleContentType = me.$('input[name="ansibleContentType"]:checked').val();

            var ansibleTaskParam = {
                id: me.contentParamId,
                tplTaskId: me.tplTaskId,
                position: TplMgrConstants.TASK_PARAM_POSITION_IN,
                type: TplMgrConstants.TASK_PARAM_TYPE_BUILDIN
            };

            if (ansibleContentType == 'I') {
                ansibleTaskParam.code = TplMgrConstants.BUILD_IN_PARAM_CONTENT;
                ansibleTaskParam.value = me.playbook;
                buildInParamDtoList.push({
                    cpTplTaskParam: ansibleTaskParam
                });
            }
            else if (ansibleContentType == 'U') {
                ansibleTaskParam.code = TplMgrConstants.BUILD_IN_PARAM_FILE;
                ansibleTaskParam.value = me.remotePath;
                buildInParamDtoList.push({
                    cpTplTaskParam: ansibleTaskParam
                });
            }

            me.trigger('buildInTaskParamChange', buildInParamDtoList);
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