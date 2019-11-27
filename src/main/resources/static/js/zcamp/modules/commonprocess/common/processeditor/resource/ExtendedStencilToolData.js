define(function() {

    return [{
        name: "集群模板环节",
        icon: "zcamp/modules/commonprocess/common/processeditor/resource/img/cpclustertpltask.png",
        type: "CpClusterTplTask",
        data: {
            type: "CpClusterTplTask"
        },
        isParent: false
    }, {
        name: "ANSIBLE环节",
        icon: "zcamp/modules/commonprocess/common/processeditor/resource/img/cpansibletpltask.png",
        type: "CpAnsibleTplTask",
        data: {
            type: "CpAnsibleTplTask"
        },
        isParent: false
    }, {
        name: "SSH环节",
        icon: "zcamp/modules/commonprocess/common/processeditor/resource/img/cpsshtpltask.png",
        type: "CpSshTplTask",
        data: {
            type: "CpSshTplTask"
        },
        isParent: false
    }, {
        name: "SQL环节",
        icon: "zcamp/modules/commonprocess/common/processeditor/resource/img/cpsqltpltask.png",
        type: "CpSqlTplTask",
        data: {
            type: "CpSqlTplTask"
        },
        isParent: false
    }, {
        name: "混合环节",
        icon: "zcamp/modules/commonprocess/common/processeditor/resource/img/cpcompositetask.png",
        type: "CpCompositeTask",
        data: {
            type: "CpCompositeTask"
        },
        isParent: false
    }, {
        name: "作业项一",
        icon: "zcamp/modules/jobplan/jobplandiagrammgr/resource/img/jobitemtask.png",
        type: "JobItemTask",
        data: {
            type: "JobItemTask"
        },
        isParent: false
    }, {
        name: "预定义模板",
        icon: "zcamp/modules/commonprocess/common/processeditor/resource/img/cppredefinedtemplatetask.png",
        type: "CpPredefinedTemplateTask",
        data: {
            type: "CpPredefinedTemplateTask"
        },
        isParent: false
    }];
});