
define([
], function () {
    
    return {

        // 将流程图json数据转换为process数据对象
        convertToCpProcess: function (json) {
            var me = this,
                cpProcessObj = {};

            cpProcessObj.cpTplProcess = json.cpTplProcess;

            var taskSharps = me.taskSharpFilter(json.childShapes);
            var cpTplTaskList = me.buildCpProcessTasks(taskSharps);
            cpProcessObj.cpTplTaskList = cpTplTaskList;

            return cpProcessObj;
        },

        // 根据连接线生成task列表
        buildCpProcessTasks: function (taskSharps) {
            var me = this,
                startNode = taskSharps.startNode,
                endNode = taskSharps.endNode,
                flowMap = taskSharps.flowMap,
                invertFlowMap = fish.invert(flowMap),
                taskMap = taskSharps.taskMap,
                cpTplTaskList = [];

            if (fish.isEmpty(taskMap)) {
                return cpTplTaskList;
            }

            // 没有连接线，返回所有节点
            if (fish.isEmpty(flowMap)) {
                cpTplTaskList = fish.map(taskMap, function (value, key) {
                    return me.convertToCpTask(value);
                });
                return cpTplTaskList;
            }

            var startFlow = startNode.outgoing ? startNode.outgoing[0] : null;
            var sortedTaskList = me.sortTaskByFlowMap(null, startFlow, flowMap, taskMap);
            fish.each(sortedTaskList, function (item) {
                cpTplTaskList.push(me.convertToCpTask(item));
            });

            return cpTplTaskList;
        },

        // 根据连线排序任务节点
        sortTaskByFlowMap: function (preTask, startFlow, flowMap, taskMap) {
            var me = this,
                startResourceId = startFlow ? flowMap[startFlow] : null,
                sortedTaskList = [],
                outgoing = null,
                nextNode = null;

            // 从开始节点开始联结
            while (startResourceId) {
                nextNode = taskMap[startResourceId];

                if (nextNode) {
                    if (preTask) {
                        nextNode.preResourceId = preTask.resourceId;
                    }
                    preTask = nextNode;
                    sortedTaskList.push(nextNode);
                    delete taskMap[startResourceId];

                    outgoing = nextNode.outgoing;
                    if (fish.isEmpty(outgoing)) {
                        startResourceId = null;
                    }
                    else {
                        startResourceId = flowMap[outgoing[0]];
                    }
                }
                else {
                    startResourceId = null;
                }
            }

            // 新起开头，联结下一段
            if (!fish.isEmpty(taskMap)) {
                startResourceId = fish.keys(taskMap)[0];
                var startNode = taskMap[startResourceId];
                sortedTaskList.push(startNode);
                delete taskMap[startResourceId];

                outgoing = startNode.outgoing;
                if (!fish.isEmpty(outgoing)) {
                    $.merge(sortedTaskList, me.sortTaskByFlowMap(startNode, outgoing[0], flowMap, taskMap));
                }
            }

            return sortedTaskList;
        },

        // 组织基本数据
        convertToCpTask: function (taskSharp) {
            var me = this,
                childShapes = taskSharp.childShapes,
                cpTaskObj = {};

            cpTaskObj.resourceId = taskSharp.resourceId;
            cpTaskObj.preResourceId = taskSharp.preResourceId;
            cpTaskObj.cpTplTask = taskSharp.cpTplTask;
            cpTaskObj.tplTaskParamDtoList = taskSharp.tplTaskParamDtoList;
            cpTaskObj.tplFormDtoList = taskSharp.tplFormDtoList;
            if (!fish.isEmpty(childShapes)) {
                var taskSharps = me.taskSharpFilter(childShapes);
                var subTplTaskDtoList = me.buildCpProcessTasks(taskSharps);

                cpTaskObj.subTplTaskDtoList = subTplTaskDtoList;
            }

            return cpTaskObj;
        },

        // 分类各节点类型
        taskSharpFilter: function(sharps) {
            var me = this,
                filterResult = {};

            filterResult.flowMap = {};
            filterResult.taskMap = {};

            fish.each(sharps, function (sharp) {
                var stencilType = sharp.stencil.type;

                if (stencilType == 'StartNoneEvent') {
                    filterResult.startNode = sharp;
                }
                else if (stencilType == 'EndNoneEvent') {
                    filterResult.endNode = sharp;
                }
                else if (stencilType == 'SequenceFlow') {
                    var firstOutgoing = me.getFirstOutgoing(sharp.outgoing);

                    if (firstOutgoing) {
                        filterResult.flowMap[sharp.resourceId] = firstOutgoing;
                    }
                }
                else {
                    var compositeData = sharp.compositeData;

                    if (compositeData) {
                        compositeData.resourceId = sharp.resourceId;
                        compositeData.outgoing = sharp.outgoing;

                        filterResult.taskMap[sharp.resourceId] = compositeData;
                    }
                    else {
                        filterResult.taskMap[sharp.resourceId] = sharp;
                    }
                }
            });

            return filterResult;
        },

        getFirstOutgoing: function (outgoings) {
            if (fish.isEmpty(outgoings)) {
                return null;
            }

            return outgoings[0];
        },

        // 根据整个流程数据，以当前节点为基准，组织树形结构
        buildTaskRefParamTree: function (cpProcessData, currTaskData) {
            var me = this,
                currResourceId = currTaskData.resourceId,
                cpTplTaskList = cpProcessData.cpTplTaskList,
                cpTplProcess = cpProcessData.cpTplProcess;

            var currTaskTreeDatas = me.recurseSeekTaskData(cpTplTaskList, currResourceId);

            return me.buildProcessTreeData(cpTplProcess, currTaskTreeDatas);
        },

        buildProcessTreeData: function (cpTplProcess, currTaskTreeDatas) {
            var me = this,
                processTreeNodes = [];

            var rootNode = {};
            rootNode.id = fish.getUUID();
            rootNode.pId = null;
            if (cpTplProcess) {
                rootNode.name = cpTplProcess.name;
            }
            else {
                rootNode.name = 'root';
            }
            rootNode.type = 'process';
            rootNode.isLeaf = false;
            rootNode.childNodeList = [];
            processTreeNodes.push(rootNode);

            var treeNodes = me.recurseBuildTreeData(rootNode.id, currTaskTreeDatas);
            $.merge(rootNode.childNodeList, treeNodes);

            return processTreeNodes;
        },

        buildFormTreeNode: function (pId, tplFormDtoList) {
            var me = this,
                nodeDatas = [];

            if (!fish.isEmpty(tplFormDtoList)) {
                fish.each(tplFormDtoList, function (formDto) {
                    var childNode = {};
                    childNode.id = fish.getUUID();
                    childNode.pId = pId;
                    childNode.name = formDto.cpTplForm.name;
                    childNode.type = 'form';
                    childNode.isLeaf = false;
                    childNode.childNodeList = [];
                    nodeDatas.push(childNode);

                    var tplFormItemDtoList = formDto.tplFormItemDtoList;
                    if (!fish.isEmpty(tplFormItemDtoList)) {
                        fish.each(tplFormItemDtoList, function (formItemDto) {
                            var grandsonNode = {};
                            grandsonNode.id = fish.getUUID();
                            grandsonNode.pId = childNode.id;
                            grandsonNode.name = formItemDto.attrQueryDto.attrName;
                            grandsonNode.value = formItemDto.attrQueryDto.attrCode;
                            grandsonNode.type = 'formItem';
                            grandsonNode.isLeaf = true;
                            grandsonNode.childNodeList = [];
                            childNode.childNodeList.push(grandsonNode);
                        });
                    }
                });
            }

            return nodeDatas;
        },

        buildParamTreeNode: function (pId, tplTaskParamDtoList, position) {
            var me = this,
                nodeDatas = [];

            if (!fish.isEmpty(tplTaskParamDtoList)) {
                fish.each(tplTaskParamDtoList, function (tplTaskParamDto) {
                    var cpTplTaskParam = tplTaskParamDto.cpTplTaskParam;
                    if (!cpTplTaskParam) {
                        return
                    }

                    if (cpTplTaskParam.type != 'BUILDIN') {
                        if (cpTplTaskParam.position == position) {
                            var childNode = {};
                            childNode.id = fish.getUUID();
                            childNode.pId = pId;
                            childNode.name = cpTplTaskParam.code;
                            childNode.value = cpTplTaskParam.code;
                            childNode.type = 'param';
                            childNode.isLeaf = true;
                            childNode.childNodeList = [];
                            nodeDatas.push(childNode);
                        }
                    }
                });
            }

            return nodeDatas;
        },

        recurseBuildTreeData: function (pId, taskDataList) {
            var me = this,
                treeDatas = [];

            if (fish.isEmpty(taskDataList)) {
                return treeDatas;
            }

            fish.each(taskDataList, function (item) {
                var treeNode = {};
                treeNode.id = fish.getUUID();
                treeNode.pId = pId;
                if (item.cpTplTask) {
                    treeNode.name = item.cpTplTask.name;
                }
                else {
                    treeNode.name = treeNode.id;
                }
                treeNode.treeCatg = item.treeCatg;
                treeNode.type = 'task';
                treeNode.isLeaf = false;
                treeNode.childNodeList = [];
                treeDatas.push(treeNode);

                var tplFormDtoList = item.tplFormDtoList;
                var tplTaskParamDtoList = item.tplTaskParamDtoList;
                var subTplTaskDtoList = item.subTplTaskDtoList;
                if (item.treeCatg == 'parent') {
                    var formNodes = me.buildFormTreeNode(treeNode.id, tplFormDtoList);
                    $.merge(treeNode.childNodeList, formNodes);

                    var paramNodes = me.buildParamTreeNode(treeNode.id, tplTaskParamDtoList, 'I');
                    $.merge(treeNode.childNodeList, paramNodes);

                    var subNodes = me.recurseBuildTreeData(treeNode.id, subTplTaskDtoList);
                    $.merge(treeNode.childNodeList, subNodes);
                }
                else if (item.treeCatg == 'sibling') {
                    var paramNodes = me.buildParamTreeNode(treeNode.id, tplTaskParamDtoList, 'O');
                    $.merge(treeNode.childNodeList, paramNodes);
                }
                else if (item.treeCatg == 'self') {
                    var formNodes = me.buildFormTreeNode(treeNode.id, tplFormDtoList);
                    $.merge(treeNode.childNodeList, formNodes);

                    var subNodes = me.recurseBuildTreeData(treeNode.id, subTplTaskDtoList);
                    $.merge(treeNode.childNodeList, subNodes);
                }
                else if (item.treeCatg == 'child') {
                    var paramNodes = me.buildParamTreeNode(treeNode.id, tplTaskParamDtoList, 'O');
                    $.merge(treeNode.childNodeList, paramNodes);
                }
            });

            return treeDatas;
        },

        // 从所有节点中，上溯当前节点的所有直系祖先
        recurseSeekTaskData: function (cpTplTaskList, currResourceId) {
            var me = this,
                currTaskSiblings = [],
                currTaskData = null;

            if (fish.isEmpty(cpTplTaskList)) {
                return currTaskSiblings;
            }

            for (var i = 0; i < cpTplTaskList.length; i++) {
                var cpTplTaskData = cpTplTaskList[i];

                if (currResourceId == cpTplTaskData.resourceId) {
                    currTaskData = cpTplTaskData;
                    currTaskData.treeCatg = 'self';

                    var subTaskData = currTaskData.subTplTaskDtoList;
                    if (!fish.isEmpty(subTaskData)) {
                        fish.each(subTaskData, function (item) {
                            item.treeCatg = 'child';
                        });
                    }

                    currTaskSiblings.push(currTaskData);
                    me.recurseBuildLinkedSiblings(cpTplTaskList, currTaskData, currTaskSiblings);
                    currTaskSiblings.reverse();

                    break;
                }

                var subTplTaskDtoList = cpTplTaskData.subTplTaskDtoList;
                var subTaskSiblings = me.recurseSeekTaskData(subTplTaskDtoList, currResourceId);
                if (!fish.isEmpty(subTaskSiblings)) {
                    cpTplTaskData.subTplTaskDtoList = subTaskSiblings;
                    cpTplTaskData.treeCatg = 'parent';
                    currTaskSiblings.push(cpTplTaskData);

                    break;
                }
            }

            return currTaskSiblings;
        },

        // 获取当前节点的同级前置节点
        recurseBuildLinkedSiblings: function (cpTplTaskList, currTaskData, currTaskSiblings) {
            var me = this,
                preResourceId = currTaskData.preResourceId;

            if (!preResourceId) {
                return;
            }

            for (var i = 0; i < cpTplTaskList.length; i++) {
                var cpTplTaskData = cpTplTaskList[i];

                if (preResourceId == cpTplTaskData.resourceId) {
                    cpTplTaskData.treeCatg = 'sibling';
                    currTaskSiblings.push(cpTplTaskData);
                    me.recurseBuildLinkedSiblings(cpTplTaskList, cpTplTaskData, currTaskSiblings);

                    break;
                }
            }
        }
    };
});