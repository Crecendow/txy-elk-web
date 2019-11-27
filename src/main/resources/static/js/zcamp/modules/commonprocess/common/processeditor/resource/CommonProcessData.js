define(function() {

    return [{
        name: "流程环节",
        isParent: true,
        children: [{
            name: "简单环节",
            icon: "bpmn2.0/icons/activity/list/user.png",
            type: "CpSimpleTask",
            data: {
                type: "CpSimpleTask"
            },
            isParent: false
        }, {
            name: "并发环节",
            icon: "bpmn2.0/icons/activity/list/script.png",
            type: "CpParallelTask",
            data: {
                type: "CpParallelTask"
            },
            isParent: false
        }, {
            name: "子流程环节",
            icon: "bpmn2.0/icons/activity/list/manual.png",
            type: "CpSubProcessTask",
            data: {
                type: "CpSubProcessTask"
            },
            isParent: false
        }, {
            name: "集群模板环节",
            icon: "bpmn2.0/icons/activity/list/script.png",
            type: "CpClusterTplTask",
            data: {
                type: "CpClusterTplTask"
            },
            isParent: false
        }]
    }];
});