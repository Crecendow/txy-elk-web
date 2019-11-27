define(function() {

    return [{
        name: "Event",
        isParent: true,
        children: [{
            name: "开始节点",
            icon: "bpmn2.0/icons/startevent/none.png",
            type: "StartNoneEvent",
            data: {
                type: "StartNoneEvent"
            },
            isParent: false
        }, {
            name: "结束节点",
            icon: "bpmn2.0/icons/endevent/none.png",
            type: "EndNoneEvent",
            data: {
                type: "EndNoneEvent"
            },
            isParent: false
        }, {
            name: "CatchMessageEvent",
            icon: "bpmn2.0/icons/catching/message.png",
            type: "CatchMessageEvent",
            data: {
                type: "CatchMessageEvent"
            },
            isParent: false
        }]
    }, {
        name: "Boundary Event",
        isParent: true,
        children: [{
            name: "CatchTimerEvent",
            icon: "bpmn2.0/icons/catching/timer.png",
            type: "CatchTimerEvent",
            data: {
                type: "CatchTimerEvent"
            },
            isParent: false
        }, {
            name: "CatchSignalEvent",
            icon: "bpmn2.0/icons/catching/signal.png",
            type: "CatchSignalEvent",
            data: {
                type: "CatchSignalEvent"
            },
            isParent: false
        }, {
            name: "ThrowSignalEvent",
            icon: "bpmn2.0/icons/throwing/signal.png",
            type: "ThrowSignalEvent",
            data: {
                type: "ThrowSignalEvent"
            },
            isParent: false
        }]
    }, {
        name: "Task",
        isParent: true,
        children: [{
            name: "UserTask",
            icon: "bpmn2.0/icons/activity/list/user.png",
            type: "UserTask",
            data: {
                type: "UserTask"
            },
            isParent: false
        }, {
            name: "ManualTask",
            icon: "bpmn2.0/icons/activity/list/manual.png",
            type: "ManualTask",
            data: {
                type: "ManualTask"
            },
            isParent: false
        }, {
            name: "ScriptTask",
            icon: "bpmn2.0/icons/activity/list/script.png",
            type: "ScriptTask",
            data: {
                type: "ScriptTask"
            },
            isParent: false
        }, {
            name: "MailTask",
            icon: "bpmn2.0/icons/activity/list/mail.send.png",
            type: "MailTask",
            data: {
                type: "MailTask"
            },
            isParent: false
        }, {
            name: "SmsTask",
            icon: "bpmn2.0/icons/activity/list/sms.png",
            type: "SmsTask",
            data: {
                type: "SmsTask"
            },
            isParent: false
        }, {
            name: "ServiceTask",
            icon: "bpmn2.0/icons/activity/list/service.png",
            type: "ServiceTask",
            data: {
                type: "ServiceTask"
            },
            isParent: false
        }]
    }, {
        name: "Gateway",
        isParent: true,
        children: [{
            name: "InclusiveGateway",
            icon: "bpmn2.0/icons/gateway/inclusive.png",
            type: "InclusiveGateway",
            data: {
                type: "InclusiveGateway"
            },
            isParent: false
        }, {
            name: "ExclusiveGateway",
            icon: "bpmn2.0/icons/gateway/exclusive.databased.png",
            type: "ExclusiveGateway",
            data: {
                type: "ExclusiveGateway"
            },
            isParent: false
        }, {
            name: "ParallelGateway",
            icon: "bpmn2.0/icons/gateway/parallel.png",
            type: "ParallelGateway",
            data: {
                type: "ParallelGateway"
            },
            isParent: false
        }]
    }, {
        name: "Other",
        isParent: true,
        children: [{
            name: "SubProcess",
            icon: "bpmn2.0/icons/activity/subprocess.png",
            type: "SubProcess",
            data: {
                type: "SubProcess"
            },
            isParent: false
        }, {
            name: "CustomNode",
            icon: "bpmn2.0/icons/startevent/none.png",
            type: "CustomNode",
            data: {
                type: "CustomNode"
            },
            isParent: false
        }]
    }];
});