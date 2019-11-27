define(['i18n!zcamp/modules/commonprocess/common/processeditor/i18n/ProcessEditorStencilBox.i18n'],
    function (i18n) {
        var constants = {
            STENCILBOX_ITEM: {
                BASIC_STENCIL_TOOL: "BASIC_STENCIL_TOOL",
                EXTENDED_STENCIL_TOOL: "EXTENDED_STENCIL_TOOL",
                PREDEFINED_TEMPLATE: "PREDEFINED_TEMPLATE",
                JOB_ITEM: "JOB_ITEM"
            },

            STENCIL_ITEM_TYPE: {
                START: "StartNoneEvent",
                END: "EndNoneEvent",
                STARTNODE: "CpStartNodeTask",
                ENDNODE: "CpEndNodeTask",
                SIMPLE: "CpSimpleTask",
                PARALLEL: "CpParallelTask",
                SERIAL: "CpSerialTask",
                SUB: "CpSubProcessTask",
                CLUSTER: "CpClusterTplTask",
                ANSIBLE: "CpAnsibleTplTask",
                SSH: "CpSshTplTask",
                SQL: "CpSqlTplTask",
                PREDEFINED_TEMPLATE: "CpPredefinedTemplateTask",
                JOB_ITEM: "JobItemTask",
                JP_PARALLEL: "JobPlanParallelTask",
                JP_SERIAL: "JobPlanSerialTask",
                JP_SUB: "JobPlanSubProcessTask"
            }
        };

        return fish.extend(constants, i18n);
})