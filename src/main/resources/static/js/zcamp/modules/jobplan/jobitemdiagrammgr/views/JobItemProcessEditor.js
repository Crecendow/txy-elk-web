define([
    'zcamp/modules/commonprocess/common/processeditor/views/ProcessEditor',
    'zcamp/modules/jobplan/jobitemdiagrammgr/views/JobItemProcessEditorStencilBox',
    'zcamp/modules/jobplan/jobitemdiagrammgr/views/JobItemProcessEditorContentPnl',
    'i18n!zcamp/modules/jobplan/jobitemdiagrammgr/i18n/JobItemMgrView.i18n'
], function (ProcessEditor, JobItemProcessEditorStencilBox, JobItemProcessEditorContentPnl, i18n) {

    return ProcessEditor.extend({
        i18nData: fish.extend({}, ProcessEditor.prototype.i18nData, i18n),

        initialize: function() {
            var me = this;
            this.options = {
                buttons: [],
                category: "1",
                footBtns: null,
                jobItemType: {name: "并发环节", stencilType: "CpParallelTask", kind: "container"},
                noHeader: true,
                privCode: undefined,
                simplePanel: true,
                stringKey: true
            };

            // 原子类型, 隐藏工具箱
            if (me.options.jobItemType.kind === "atomic") {
                me.hideStencilBox = true;
            }
            ProcessEditor.prototype.initialize.apply(me, arguments);
        },

        _initProcessData: function() {
            var me = this;

            var jobItem = me.options.jobItem;

            if (!jobItem) {
                // 新增时自动生成根节点
                me.contentPnl.addNode({
                    x: 200,
                    y: 200
                }, {
                    name: me.options.jobItemType.name,
                    type: "JobItem" + me.options.jobItemType.stencilType,
                    hideOperation: true
                });
                return;
            }
        },

        _initStencilBox: function() {
            var me = this;

            var jobItemType = me.options.jobItemType;

            me.stencilBox = new JobItemProcessEditorStencilBox({jobItemType: jobItemType.stencilType});
        },

        _initContentPnl: function() {
            var me = this;

            me.contentPnl = new JobItemProcessEditorContentPnl(me.options);
        },
        
        _requireAttrPanel: function(sharp) {
            var me = this;

            if (sharp === me.contentPnl) {
                me.contentPnl.selectFirstNode();
                return;
            }

            ProcessEditor.prototype._requireAttrPanel.apply(me, arguments);
        },

        _formatMergeDiagramData: function (json) {
            var me = this;
            var rootNode = json.childShapes[0];

            if (!json.predefinedTemplate) {
                json.predefinedTemplate = me.getDefaultPredefinedTemplate();
            }
            json.predefinedTemplate.name = rootNode.cpTplTask.name;
            json.predefinedTemplate.comments = rootNode.cpTplTask.comments;
            json.predefinedTemplate.bisDomain = rootNode.predefinedTemplate.bisDomain;

            delete rootNode.predefinedTemplate;

            return {"jobItemDiagramJson": JSON.stringify(json)};
        },

        getDefaultPredefinedTemplate: function() {
            var me = this;

            return {
                id: null,
                name: null,
                bisDomain: null,
                module: "JOBITEM",
                category: me.options.category,
                type: me.options.jobItemType.stencilType,
                createdUser: null,
                createdDate: null,
                state: "A",
                comments: null
            };
        },

        _triggerAfterSaveEvent: function (resJson) {
            var me = this;

            fish.trigger("btnAfterSaveJobItemClick", {});
        },

        _validProcessData: function (json) {
            var me = this;

            var errorMsgs = [];
            // 只能有一个根节点
            if (!json.childShapes || json.childShapes.length != 1) {
                errorMsgs.push(me._buildErrorMsg(json, me.i18nData.JOB_ITEM_NODE_NUM_ERROR));
                me.showErrMsg(errorMsgs);
                return false;
            }
            // 结构合法性
            var valid = me._recurseNodeList(json, errorMsgs);
            if (!valid) {
                me.showErrMsg(errorMsgs);
                return false;
            }
            // 检查每个节点基础属性面板值的合法性
            var isValid;
            isValid = me.recurseNodeValidation(json.childShapes, errorMsgs);
            if (!isValid) {
                me.showErrMsg(errorMsgs);
            }

            return isValid;
        },

        hasProcess: function (nodeType) {
            return "CpSerialTask" == nodeType;
        }
    });
});