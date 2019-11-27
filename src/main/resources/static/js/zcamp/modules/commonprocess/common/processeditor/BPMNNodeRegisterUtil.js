
define([
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpStartNodeTask',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpEndNodeTask',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpSimpleTask',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpParallelTask',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpSerialTask',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpSubProcessTask',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpClusterTplTask',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpAnsibleTplTask',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpSqlTplTask',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpSshTplTask',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpCompositeTask',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpPredefinedTemplateTask',
    'zcamp/modules/commonprocess/common/processeditor/tasknodes/CpTestTask'
], function (CpStartNodeTask, CpEndNodeTask, CpSimpleTask, CpParallelTask, CpSerialTask, CpSubProcessTask, CpClusterTplTask, CpAnsibleTplTask, CpSqlTplTask, CpSshTplTask, CpCompositeTask, CpPredefinedTemplateTask, CpTestTask) {
    
    return {
        /**
         * 注册所有的默认节点
         * @param {BPMN} BPMN 
         */
        registerDefaultNodes: function(BPMN) {
            var me = this;

            me.registerNode(BPMN, CpStartNodeTask);
            me.registerNode(BPMN, CpEndNodeTask);
            me.registerNode(BPMN, CpSimpleTask);
            me.registerNode(BPMN, CpParallelTask);
            me.registerNode(BPMN, CpSerialTask);
            me.registerNode(BPMN, CpSubProcessTask);
            me.registerNode(BPMN, CpTestTask);
            me.registerNode(BPMN, CpAnsibleTplTask);
            me.registerNode(BPMN, CpClusterTplTask);
            me.registerNode(BPMN, CpSqlTplTask);
            me.registerNode(BPMN, CpSshTplTask);
            me.registerNode(BPMN, CpCompositeTask);
            me.registerNode(BPMN, CpPredefinedTemplateTask);
        },

        registerNode: function(BPMN, NodeClass) {
            var me = this;

            if (NodeClass.prototype.bpmnGraphicType === "atomic") {
                me.registerAtomicNode(BPMN, NodeClass);
            }
            else if (NodeClass.prototype.bpmnGraphicType === "container") {
                me.registerContainerNode(BPMN, NodeClass);
            }
        },

        registerAtomicNode: function(BPMN, NodeClass) {
            BPMN.util.inherits(NodeClass, BPMN.BPMNNode);
            BPMN.BPMNNode.registerClass(NodeClass, NodeClass.prototype.cpType);
        },

        registerContainerNode: function(BPMN, NodeClass) {
            var SubProcessNode = BPMN.BPMNNode.getClass("SubProcess");
            
            BPMN.util.inherits(NodeClass, SubProcessNode);
            BPMN.BPMNNode.registerClass(NodeClass, NodeClass.prototype.cpType);
        }
    };
});