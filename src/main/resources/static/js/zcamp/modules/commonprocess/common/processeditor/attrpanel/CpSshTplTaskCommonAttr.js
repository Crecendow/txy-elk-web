define([
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/BaseCpTaskCommonAttr',
    'hbs!zcamp/modules/commonprocess/common/processeditor/attrpanel/templates/CpSshTplTaskCommonAttr.html',
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
            'click input[name="sshContentType"]': 'sshContentTypeChange'
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
            me.setViews({
                'div.js-ssh-file-grid-view': me.fileGridView
            });
        },

        _buildTplTaskFileGridView: function(){
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

            me.$execType = me.$('.execType');

            me._initExecTypeSelect();
            me._initSshContentEditPop();
            me._initSshFileGridView();

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
                    me.sshContent = buildInParam.value;
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

        _initSshContentEditPop: function () {
            var me = this,
                fileContent = '';

            if (me.sshContent) {
                fileContent = me.sshContent;
                me.$('input[name="sshContentType"][value="I"]').attr('checked', true);
                me.$('input[name="sshContentType"][value="U"]').attr('checked', false);
                me.$('input[name="sshContentType"][value="I"]').trigger('click');
            }

            me.sshContentPopView = new TplTaskContentPopEditView(me.$('.js-ssh-content'), {
                dialogType: 'edit',
                fileContent: fileContent
            });
            me.sshContentPopView.setValue(fileContent, fileContent);
            me.$('.js-ssh-content').bind('valueChange', me, me.onSshContentChange);
        },



        _initSshFileGridView: function () {
            var me = this;

            if (me.remotePath) {
                me.$('input[name="sshContentType"][value="U"]').attr('checked', true);
                me.$('input[name="sshContentType"][value="I"]').attr('checked', false);
                me.$('input[name="sshContentType"][value="U"]').trigger('click');
            }
        },

        sshContentTypeChange: function (e) {
            var me =  this ;

            if (e.target.value == 'U') {
                me.$(".js-ssh-content-div").hide();
                me.$(".js-ssh-file-div").show();
            } else {
                me.$(".js-ssh-content-div").show();
                me.$(".js-ssh-file-div").hide();
            }
        },

        setTaskName: function (taskName) {
            var me = this;

            me.$('.js-task-name').val(taskName);
            me.$('.js-task-name').trigger('blur');
        },

        onSshContentChange: function (e) {
            var me = e.data,
                content = me.sshContentPopView.getValue();

            me.sshContent = content.value;
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

        oBuildInTaskParamChange: function (e) {
            var me = this,
                buildInParamDtoList = [],
                sshContentType = me.$('input[name="sshContentType"]:checked').val();

            var sshTaskParam = {
                id: me.contentParamId,
                tplTaskId: me.tplTaskId,
                position: TplMgrConstants.TASK_PARAM_POSITION_IN,
                type: TplMgrConstants.TASK_PARAM_TYPE_BUILDIN
            };

            if (sshContentType == 'I') {
                sshTaskParam.code = TplMgrConstants.BUILD_IN_PARAM_CONTENT;
                sshTaskParam.value = me.sshContent;
                buildInParamDtoList.push({
                    cpTplTaskParam: sshTaskParam
                });
            }
            else if (sshContentType == 'U') {
                sshTaskParam.code = TplMgrConstants.BUILD_IN_PARAM_FILE;
                sshTaskParam.value = me.remotePath;
                buildInParamDtoList.push({
                    cpTplTaskParam: sshTaskParam
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