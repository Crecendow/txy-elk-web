define([
    'zcamp/modules/commonprocess/common/processeditor/views/ProcessEditorStencilBox'
], function (ProcessEditorStencilBox) {
    return ProcessEditorStencilBox.extend({
        _initQryStencilBoxFunc: function () {
            var me = this;

            // me.qryStencilBoxFunc = ProcessEditorStencilAction.qryJobItemStencilBoxGroupList;
        },

        getQryParam: function() {
            var me = this;

            return {jobItemType: me.options.jobItemType};
        },

        _buildTreeNodeData: function (value) {
            var fileNodeList = [];

            fish.each(value.items, function (item) {
                var treeNodeType = item.name;

                if (0 == item.name.indexOf("JobItem")) {
                    item.name = item.name.substr(7);
                }
                var basicItem = ProcessEditorStencilBox.prototype._buildSingleTreeNodeData(value, item);
                basicItem.type = treeNodeType;

                if ("CpSubProcessTask" == item.name) {
                    basicItem.name = "子计划环节";
                }

                fileNodeList.push(basicItem);
            });

            return fileNodeList;
        },
    });
})