
define([
    'zcamp/modules/common/ZUtils',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpAbstractAttrTask',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpTaskUtils'
], function (ZUtils, CpAbstractAttrTask, CpTaskUtils) {

    return ZUtils.Class.create(CpAbstractAttrTask, {

        getDefaultCpTplTask: function() {

            return {
                id: null,
                tplProcessId: null,
                name: null,
                type: null,
                subTplProcessId: null,
                supTplTaskId: null,
                execType: null,
                action: null,
                createdUser: null,
                createdDate: null,
                state: 'A',
                comments: null,
                kind: 'ATOMIC'

            };
        },

        mergeCpTplTask: function(cpTplTask, validState) {
            var me = this,
                cpTplTask = fish.extend({}, me.model.get('cpTplTask') || me.getDefaultCpTplTask(), cpTplTask);

            me.setModel({
                cpTplTask: cpTplTask,
                properties: { name: cpTplTask.name }
            });
            me.mergeValidState(validState);

            me.mergeCustomData.apply(me, arguments);
        },

        mergeValidState: function (validState) {
            var me = this;
            me.model.set('properties.validState', validState);
        },

        mergeCustomData: function () {

        },

        mergeTplFormDtoList: function(tplFormDtoList) {
            var me = this;

            me.model.set('tplFormDtoList', tplFormDtoList || []);
        },

        mergeTplTaskParamDtoList: function(tplTaskParamDtoList) {
            var me = this;

            me.model.set("tplTaskParamDtoList", tplTaskParamDtoList || []);
        },

        triggerBuildRefParamList: function (attrPanel, tplTaskParamDto) {
            var me = this;

            me.trigger('buildRefParamList', {
                attrPanel: attrPanel,
                tplTaskParamDto: tplTaskParamDto
            });
        },

        convertJsonToTreeNode: function (json) {
            var me = this,
                currTaskData = me.model.option;

            var cpProcessData = CpTaskUtils.convertToCpProcess(json);

            return CpTaskUtils.buildTaskRefParamTree(cpProcessData, currTaskData);
        },

        buildRefParamTree: function (options, json) {
            var me = this,
                attrPanel = options.attrPanel,
                tplTaskParamDto = options.tplTaskParamDto,
                refParamList = me.convertJsonToTreeNode(json);

            attrPanel.buildRefParamTree(refParamList, tplTaskParamDto);
        },

        getAttrPanelOptions: function() {
            var me = this;

            return {
                cpTplTask: me.model.option.cpTplTask || me.getDefaultCpTplTask(),
                tplTaskParamDtoList: me.model.option.tplTaskParamDtoList,
                tplFormDtoList: me.model.option.tplFormDtoList
            };
        },

        initAttrPanelEvent: function(attrPanel) {
            var me = this;

            attrPanel.on("taskchange", me.mergeCpTplTask, me);
            attrPanel.on("taskParamChange", me.mergeTplTaskParamDtoList, me);
            attrPanel.on("tplFormListChange", me.mergeTplFormDtoList, me);

            attrPanel.on("buildRefParamList", function (tplTaskParamDto) {
                me.triggerBuildRefParamList(attrPanel, tplTaskParamDto);
            }, me);
        }
    });
});