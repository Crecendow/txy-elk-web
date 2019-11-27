define(function() {

    return [{
        name: "开始环节",
        icon: "zcamp/modules/commonprocess/common/processeditor/resource/img/cpstartnodeTask.png",
        type: "CpStartNodeTask",
        data: {
            type: "CpStartNodeTask"
        },
        isParent: false
    }, {
        name: "结束环节",
        icon: "zcamp/modules/commonprocess/common/processeditor/resource/img/cpendnodeTask.png",
        type: "CpEndNodeTask",
        data: {
            type: "CpEndNodeTask"
        },
        isParent: false
    }, {
        name: "简单环节",
        icon: "zcamp/modules/commonprocess/common/processeditor/resource/img/cpsimpletask.png",
        type: "CpSimpleTask",
        data: {
            type: "CpSimpleTask"
        },
        isParent: false
    }, {
        name: "并发环节",
        icon: "zcamp/modules/commonprocess/common/processeditor/resource/img/cpparalleltask.png",
        type: "CpParallelTask",
        data: {
            type: "CpParallelTask"
        },
        isParent: false
    }, {
        name: "子流程环节",
        icon: "zcamp/modules/commonprocess/common/processeditor/resource/img/cpsubprocesstask.png",
        type: "CpSubProcessTask",
        data: {
            type: "CpSubProcessTask"
        },
        isParent: false
    },
    {
        name: "测试环节",
        icon: "zcamp/modules/commonprocess/common/processeditor/resource/img/cptesttask.png",
        type: "CpTestTask",
        data: {
            type: "CpTestTask"
        },
        isParent: false
    }];
});