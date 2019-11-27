define([
    'hbs!zcamp/modules/commonprocess/common/processeditor/attrpanel/dialogs/templates/TplTaskFileGridView.html',
    'i18n!zcamp/modules/commonprocess/tplmgr/i18n/TplTaskParamMgr.i18n',
    'i18n!zcamp/i18n/Common.i18n',
    'zcamp/modules/common/ZUtils',
    'zcamp/component/grid/GridPanel',
    'zcamp/modules/commonprocess/tplmgr/common/TplMgrConstants',
    'https://fish.iwhalecloud.com/fish-desktop/dist/fish-desktop/third-party/fileupload/fish.fileupload.js',
    'css!https://fish.iwhalecloud.com/fish-desktop/dist/fish-desktop/third-party/fileupload/fileupload.css'
], function (TplTaskFileGridView, i18n, commonI18n, ZUtils, GridPanel,
             TplMgrConstants) {

    return fish.View.extend({
        el: false,

        template: TplTaskFileGridView,

        i18nData: fish.extend({}, i18n, commonI18n),

        events: {
            "click .js-up-file-seq": "onUpGridFile"
        },

        serialize: function () {
            return this.i18nData;
        },

        initialize: function (param) {
            var me = this;
            var i18n = me.i18nData;

            me.dialogType = param.dialogType;
            me.remotePath = param.remotePath;
            me.tplTask = param.tplTask;

            me.taskFileGrid = me._buildGrid();
            me.setViews({
                'div.js-task-file-grid': me.taskFileGrid
            });
        },

        afterRender: function () {
            var me = this;

            me.initFileUpload();
            me.reloadFileDescsData();
        },

        initFileUpload: function () {
            var me = this;
            me.fileList = [];
            me.fileData = {};

            this.$('.js-fileupload').fileupload({
                dataType: 'json',
                autoUpload: false,
                singleFileUploads: false,
                add: function(e, data) {
                    var files = data.files;
                    me.uploadFile(data, {
                        remotePath: me.remotePath
                    }, function (result) {
                        fish.each(files, function (item) {
                            me.onAddGridFile(item.name);
                        });

                        if (!me.remotePath) {
                            me.remotePath = result;
                            me.trigger('remotePathChange', me.remotePath);
                        }

                        me.parseFileParams();
                        me.onFileDescsChange();
                    });
                }.bind(this)
            });
        },

        getTaskFileRequest: function () {
            var me = this;

            me.fileData.files = me.fileList;

            return me.fileData;
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
                    width: '308'
                }
            };

            return new GridPanel(options);
        },

        _buildColModel: function () {
            var me = this,
                i18n = me.i18nData;

            return [{
                name: 'id',
                label: "",
                key: true,
                width: 40,
                sortable: false,
                formatter: function (cellval, opts, rwdat, _act) {
                    return '<span class="iconfont icon-arrow-up js-up-file-seq" title="' + i18n.UP_PARAM_SEQ
                        + '" style="font-size: xx-small"></span>';
                }
            }, {
                name: 'seq',
                sortable: false,
                hidden: true
            }, {
                name: 'name',
                label: i18n.T_PARAM_POSITION,
                sortable: false,
                formatter: function (cellval, opts, rwData) {
                    return cellval;
                }
            }, {
                name: '',
                label: i18n.COMMON_OPERATION,
                sortable: false,
                width: 120,
                btns: me._buildButtons()
            }];
        },

        _buildButtons: function() {
            var me = this;

            return [{
                name: "viewGridFile",
                text: me.i18nData.COMMON_SHOW_DETAIL,
                scope: me,
                handler: me.onViewGridFile
            }, {
                name: "delGridFile",
                text: me.i18nData.COMMON_DELETE,
                scope: me,
                handler: me.onDelGridFile
            }];
        },

        reloadFileDescsData: function () {
            var me = this,
                meEl = me.$el,
                i18n = me.i18nData;
            if (!me.remotePath) {
                return;
            }
        },
        
        reloadFileGrid: function (data) {
            var me = this;
            data = data || [];

            me.taskFileGrid.loadData(data);
            if (data.length > 0) {
                me.taskFileGrid.setSelectionByData(data[0]);
            }
        },

        uploadFile: function (fileObj, params, callback) {
            var me = this,
                meEl = me.$el,
                i18n = me.i18nData;

            ZUtils.Msg.block(meEl, i18n.LOADING);

            if (me.remotePath) {
                if (me.dialogType == 'ansible') {
                    fileObj.url = portal.appGlobal.get("webroot") + '/common/fileSftp/importPlaybookToRemotePath.do';
                }
                else {
                    fileObj.url = portal.appGlobal.get("webroot") + '/common/fileSftp/uploadFilesToRemotePath.do';
                }
            }
            else {
                if (me.dialogType == 'ansible') {
                    fileObj.url = portal.appGlobal.get("webroot") + '/common/fileSftp/importPlaybook.do';
                }
                else {
                    fileObj.url = portal.appGlobal.get("webroot") + '/common/fileSftp/uploadFiles.do';
                }
            }
            if (params) {
                fileObj.url = fileObj.url + '?' + $.param(params);
            }

            fileObj.submit().done(function (result) {
                ZUtils.Msg.unblock(me.$el);
                ZUtils.Msg.showSuccess('文件上传成功！');

                if (fish.isFunction(callback)) {
                    callback(result);
                }
            });
        },

        parseFileParams: function () {
            var me = this,
                meEl = me.$el,
                i18n = me.i18nData;

            if (!me.remotePath) {
                return;
            }
        },

        onFileDescsChange: function () {
            var me = this;

            if (!me.remotePath) {
                return;
            }

            var rowdata = me.taskFileGrid.getData();
            var fileDescs = [];
            if (!fish.isEmpty(rowdata)) {
                fish.each(rowdata, function (item, index) {
                    fileDescs.push({
                        seq: index,
                        name: item.name
                    });
                });
            }

            var fileContent = JSON.stringify(fileDescs);
            var requestParams = {
                fileContent: fileContent,
                fileName: 'FileDescs.json',
                remotePath: me.remotePath
            }
        },

        onAddGridFile: function (name) {
            var me = this,
                id = $.jgrid.randId();

            var records = me.taskFileGrid.execGridFunc("option", "records");

            var rowData = {
                id: id,
                seq: records + 1,
                name: name
            };

            me.taskFileGrid.execGridFunc("addRowData", rowData);
            me.taskFileGrid.setSelectionByData(rowData);
        },

        onViewGridFile: function (rowId) {
            var me = this,
                meEl = me.$el,
                i18n = me.i18nData;
            var fileItem = me.taskFileGrid.getSelection();

            ZUtils.Msg.block(meEl, i18n.LOADING);
            if (me.dialogType == 'ansible') {
                var playbookName = fileItem.name.slice(0, -('.zip'.length));
                portal.openMenu('auto', ZUtils.formatResourceUrl("modules/systemMgr/playbook/views/PlaybookInfoMainView"), 'S', playbookName, {
                    playbook: {
                        parentPath: me.remotePath,
                        playbookName: playbookName
                    }
                });

                ZUtils.Msg.unblock(meEl);
            }
        },

        onDelGridFile: function (rowId) {
            var me = this,
                i18n = me.i18nData;
            var fileItem = me.taskFileGrid.getSelection();

            ZUtils.confirm({
                message: ZUtils.format(i18n.M_DEL_CONFIRM, fileItem.name),
                ok: i18n.COMMON_CONFIRM,
                cancel: i18n.COMMON_CANCEL
            }, function () {
                var requestParam = {
                    fileName: fileItem.name,
                    remotePath: me.remotePath
                }
            });
        },

        onUpGridFile: function () {
            var me = this,
                i18n = me.i18nData;

            var fileItem = me.taskFileGrid.getSelection();
            var prevFileItem = me.taskFileGrid.execGridFunc("getPrevSelection", fileItem);
            if (!prevFileItem) {
                return;
            }

            me.taskFileGrid.execGridFunc("moveUpRow", fileItem.id);
            me.onFileDescsChange();
        },

        // 视图被删除时候做的事情
        cleanup: function () {
            var me = this;

            // 手工删除对dom元素和复杂对象的引用
            delete me.taskFileGrid;
        }
    });
});