define([
    'zcamp/modules/common/ZUtils',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpAbstractTask',
], function (ZUtils, CpAbstractTask) {

    return ZUtils.Class.create(CpAbstractTask, {

        /**
         * 过滤内置参数类型的环节模板参数DTO列表
         * @param {Array} tplTaskParamDtoList 环节模板参数DTO列表
         */
        filterTplTaskBuildInParamDtoList: function (tplTaskParamDtoList) {
            var tplTaskBuildInParamDtoList = [];

            if (fish.isEmpty(tplTaskParamDtoList)) {
                return tplTaskBuildInParamDtoList;
            }

            fish.each(tplTaskParamDtoList, function (tplTaskParamDto) {
                if (tplTaskParamDto.cpTplTaskParam.type == 'BUILDIN') {
                    tplTaskBuildInParamDtoList.push(tplTaskParamDto);
                }
            });

            return tplTaskBuildInParamDtoList;
        },

        /**
         * 过滤非内置参数类型的环节模板参数DTO列表
         * @param {Array} tplTaskParamDtoList 环节模板参数DTO列表
         */
        filterTplTaskNotBuildInParamDtoList: function (tplTaskParamDtoList) {
            var tplTaskNotBuildInParamDtoList = [];

            if (fish.isEmpty(tplTaskParamDtoList)) {
                return tplTaskNotBuildInParamDtoList;
            }

            fish.each(tplTaskParamDtoList, function (tplTaskParamDto) {
                if (tplTaskParamDto.cpTplTaskParam.type != 'BUILDIN') {
                    tplTaskNotBuildInParamDtoList.push(tplTaskParamDto);
                }
            });

            return tplTaskNotBuildInParamDtoList;
        },

        /**
         * 更新非内置参数类型的环节模板参数DTO列表到流程图中
         * @param {Array} tplTaskNotBuildInParamDtoList 非内置参数类型的环节模板参数DTO列表
         */
        mergeTplTaskNotBuildInParamList: function(tplTaskNotBuildInParamDtoList) {
            var me = this,
                tplTaskParamDtoList = me.model.get("tplTaskParamDtoList"),
                tplTaskBuildInParamDtoList = me.filterTplTaskBuildInParamDtoList(tplTaskParamDtoList);

            me.model.set("tplTaskParamDtoList", tplTaskBuildInParamDtoList.concat(tplTaskNotBuildInParamDtoList || []));
        },

        /**
         * 更新内置参数类型的环节模板参数DTO列表到流程图中
         * @param {Array} tplTaskNotBuildInParamDtoList 内置参数类型的环节模板参数DTO列表
         */
        mergeTplTaskBuildInParamList: function(tplTaskBuildInParamDtoList) {
            var me = this,
                tplTaskParamDtoList = me.model.get("tplTaskParamDtoList"),
                tplTaskNotBuildInParamDtoList = me.filterTplTaskNotBuildInParamDtoList(tplTaskParamDtoList);

            me.model.set("tplTaskParamDtoList", tplTaskNotBuildInParamDtoList.concat(tplTaskBuildInParamDtoList || []));
        },

        /**
         * 重新实现初始化属性面板初始化数据, 区分内置参数和非内置参数
         * @override
         */
        getAttrPanelOptions: function() {
            var me = this,
                tplTaskParamDtoList = me.model.option.tplTaskParamDtoList,
                tplTaskBuildInParamDtoList = me.filterTplTaskBuildInParamDtoList(tplTaskParamDtoList),
                tplTaskNotBuildInParamDtoList = me.filterTplTaskNotBuildInParamDtoList(tplTaskParamDtoList);

            return {
                cpTplTask: me.model.option.cpTplTask || me.getDefaultCpTplTask(),
                tplTaskBuildInParamDtoList: tplTaskBuildInParamDtoList,
                tplTaskNotBuildInParamDtoList: tplTaskNotBuildInParamDtoList,
                tplFormDtoList: me.model.option.tplFormDtoList,
                isParamsButtonDisabled: true
            };
        },

        /**
         * 重新实现初始化属性面板绑定事件, 分别提供内置参数和非内置参数的监听
         * @param {AttrPanel} attrPanel
         * @override
         */
        initAttrPanelEvent: function(attrPanel) {
            var me = this;

            attrPanel.on("taskchange", me.mergeCpTplTask, me);

            attrPanel.on("notBuildInTaskParamChange", me.mergeTplTaskNotBuildInParamList, me);
            attrPanel.on("buildInTaskParamChange", me.mergeTplTaskBuildInParamList, me);

            attrPanel.on("tplFormListChange", me.mergeTplFormDtoList, me);

            attrPanel.on("buildRefParamList", function (tplTaskParamDto) {
                me.triggerBuildRefParamList(attrPanel, tplTaskParamDto);
            }, me);
        },

        getDefaultCpTplTask: function() {
            var me = this,
                defaultCpTplTask = CpAbstractTask.prototype.getDefaultCpTplTask.call(me);

            return fish.extend(defaultCpTplTask, {
                name: "内置参数环节",
                type: "SIMPLE"
            });
        }
    });
});
