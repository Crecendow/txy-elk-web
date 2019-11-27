define([
    'zcamp/component/panel/SimplePanel',
    'hbs!zcamp/modules/commonprocess/common/processeditor/templates/ProcessEditor.html',
    'i18n!zcamp/modules/commonprocess/common/processeditor/i18n/ProcessEditor.i18n',
    'i18n!zcamp/i18n/Common.i18n',
    'zcamp/modules/commonprocess/common/processeditor/views/ProcessEditorToolBar',
    'zcamp/modules/commonprocess/common/processeditor/views/ProcessEditorStencilBox',
    'zcamp/modules/commonprocess/common/processeditor/views/ProcessEditorContentPnl',
    'zcamp/modules/commonprocess/common/processeditor/views/ProcessEditorErrorMsgsPnl',
    'css!zcamp/modules/commonprocess/common/processeditor/resource/css/ProcessEditor.css',
    'https://fish.iwhalecloud.com/fish-desktop/dist/fish-desktop/third-party/splitter/fish.splitter.js',
    'css!https://fish.iwhalecloud.com/fish-desktop/dist/fish-desktop/third-party/splitter/splitter.css'
], function (PortletPanel, viewTpl, i18n, commonI18n, ProcessEditorToolBar, ProcessEditorStencilBox,
             ProcessEditorContentPnl, ProcessEditorErrorMsgsPnl) {

    return PortletPanel.extend({
        //模板函数
        childTpl: viewTpl,
        //多模板源
        i18nData: fish.extend({}, commonI18n, i18n),
        //提供模板数据
        childSerialize: function () {
            return this.i18nData;
        },

        initialize: function () {
            var me = this;

            me._initToolBar();

            if (!me.hideStencilBox) {
                me._initStencilBox();
            }
            me._initContentPnl();
            me._initErrorMsgsPnl();

            me._initViews();

            me.attrPnl = me._initAttrPnl();
            if (me.attrPnl) {
                me.setViews({
                    '.process-editor-attrpnl': me.attrPnl
                });
            }

            // 设置为无标题
            me.options.noHeader = true;

            PortletPanel.prototype.initialize.apply(me, arguments);

            me._initEvents();
        },

        _initViews: function() {
            var me = this,
                viewConfig = {
                    '.process-editor-toolbar': me.toolBar,
                    '.process-editor-contentpnl': me.contentPnl,
                    '.process-editor-errorMsgs': me.errMsgsPnl
                };

            if (!me.hideStencilBox) {
                viewConfig['.process-editor-stencilbox'] = me.stencilBox;
            }

            me.setViews(viewConfig);
        },

        _initAttrPnl: function () {
            return null;
        },

        _initToolBar: function() {
            var me = this;

            me.toolBar = new ProcessEditorToolBar();
        },

        _initStencilBox: function() {
            var me = this;

            me.stencilBox = new ProcessEditorStencilBox();
        },

        _initContentPnl: function() {
            var me = this;

            me.contentPnl = new ProcessEditorContentPnl(me.options);
        },

        _initErrorMsgsPnl: function () {
            var me = this;

            me.errMsgsPnl = new ProcessEditorErrorMsgsPnl();
        },

        _initEvents: function() {
            var me = this;

            if (!me.hideStencilBox) {
                me._initStencilBoxEvents();
            }
            me._initToolBarEvents();
            me._initContentPnlEvents();
            me._initErrMsgsPnlEvents();

            me._initCustomEvent();
        },

        _initStencilBoxEvents: function() {
            var me = this;
            me.stencilBox.on("dropStencil", me.contentPnl.addNodeOnDrop, me.contentPnl);
        },

        _initToolBarEvents: function() {
            var me = this;
            me.toolBar.on("btnSaveClick", me._onBtnSaveClick, me);
            me.toolBar.on("btnUndoClick", me._onBtnUndoClick, me);
            me.toolBar.on("btnRedoClick", me._onBtnRedoClick, me);
            me.toolBar.on("btnConnectClick", me._onBtnConnectClick, me);
            me.toolBar.on("btnInitClick", me._onBtnInitClick, me);
            me.toolBar.on("btnDragSelectClick", me._onBtnDragSelectClick, me);
            me.toolBar.on("btnGridLineClick", me._onBtnGridLineClick, me);
            me.toolBar.on("btnDelSelectedClick", me._onBtnDelSelectedClick, me);
        },
        _onBtnConnectClick:function(e) {
            var me = this;

            me.contentPnl.btnConnect(e);
        },
        _onBtnInitClick:function() {
            var me = this;

            me.contentPnl.btnInit();
        },
        _onBtnDragSelectClick:function() {
            var me = this;

            me.contentPnl.btnDragSelect();
        },
        _onBtnGridLineClick:function() {
            var me = this;

            me.contentPnl.onGridLine();
        },
        _onBtnDelSelectedClick: function () {
            var me = this;

            me.contentPnl.btnDelSelected();
        },
        _initContentPnlEvents: function() {
            var me = this;
            me.contentPnl.on("afterBpmnRender", me._initProcessData, me);
            me.contentPnl.on("bpmnClick", me._requireAttrPanel, me);
        },

        _initErrMsgsPnlEvents: function() {
            var me = this;
            me.errMsgsPnl.on("focusErrorNode", me.contentPnl.focusErrorNode, me.contentPnl);
        },

        _initCustomEvent: function () {

        },

        childAfterRender: function() {
            var me = this;

            var height = 600;
            me.splitterPnl = me.$(".process-editor-splitter");
            me.splitterPnl.height(height);
            me._initSplitter();
        },

        _initSplitter: function() {
            var me = this,
                outPanes = [],
                inPanes = [];

            outPanes.push({
                collapsible: false
            });
            outPanes.push({
                collapsible: true,
                size: "200px",
                resizable: false,
                collapsed: true
            });

            me.splitterPnl.splitter({
                orientation: "vertical",
                panes: outPanes
            });

            if (!me.hideStencilBox) {
                inPanes.push({
                    collapsible: true,
                    size: "220px",
                    resizable: false
                });
            } else {
                me.$(".process-editor-stencilbox").remove();
            }

            inPanes.push({
                collapsible: false
            });
            inPanes.push({
                collapsible: true,
                size: "320px",
                resizable: false
            });

            me.splitterPnl.find(".process-editor-horizon-splitter").splitter({
                panes: inPanes
            });
        },

        _initProcessData: function() {
            var me = this,
                tplProcess = me.options.tplProcess;

            if (!tplProcess) {
                // 默认打开流程图属性面板
                me._requireAttrPanel(me.contentPnl);
                return;
            }
        },

        _requireAttrPanel: function(sharp) {
            var me = this,
                attrSelector = ".process-editor-attrpnl";

            if (sharp.requireAttrPanel) {
                sharp.requireAttrPanel(me, attrSelector);
                sharp.off('buildRefParamList', null, me).on('buildRefParamList', function (options) {
                    var me = this,
                        json = me.contentPnl.exportJson();

                    sharp.buildRefParamTree(options, json);
                }, me);
            } else {
                me._requireEmptyPanel();
            }
        },

        _requireEmptyPanel: function () {
            var me = this,
                attrSelector = '.process-editor-attrpnl';

            me.requireView({
                url: 'zcamp/modules/commonprocess/common/processeditor/attrpanel/EmptyAttrPanel',
                selector: attrSelector,
                callback: function () {
                }
            });
        },

        _onBtnUndoClick: function() {
            var me = this;

            me.contentPnl.undo();
        },

        _onBtnRedoClick: function() {
            var me = this;

            me.contentPnl.redo();
        },

        _onBtnSaveClick: function() {
            var me = this,
                json = me.contentPnl.exportJson();
            fish.popupView({
                url: "zcamp/modules/commonprocess/common/processeditor/views/ExportJsonDlg.js",
                viewOption: {
                    bpmnJson: JSON.stringify(json, null, 4)
                },
                callback: function (popup, view) {
                    console.log("OK");
                },
                close: function (msg) {
                    console.log("return value: " + msg);
                }
            });
        },

        _onBtnSaveCloseClick: function() {
            var me = this;
            me._onBtnSaveClick();
        },


        _formatMergeDiagramData: function (json) {
            return {'tplProcessDiagramJson': JSON.stringify(json)};
        },

        _triggerAfterSaveEvent: function (resJson) {
            var me = this;

            fish.trigger('btnAfterSaveProcessClick', {});
        },

        _validProcessData: function (json) {
            var me = this;

            // 使用序列化后再反序列化json方式深复制，校验使用新的对象防止数据污染
            var json = JSON.parse(JSON.stringify(json));

            // 流程图整体校验
            var errorMsgs = [];
            var isValid = me._recurseNodeList(json, errorMsgs);
            if (!isValid) {
                me.showErrMsg(errorMsgs);
                return isValid;
            }
            // 流程图数据校验
            var isValid = me.recurseNodeValidation([json], errorMsgs);
            if (!isValid) {
                me.showErrMsg(errorMsgs);
                return isValid;
            }
            return isValid;
        },

        _recurseNodeList: function (node, errorMsgs) {
            var me = this,
                nodeType = node.taskType || node.stencil.type;

            var startNodeCount = 0,
                endNodeCount = 0,
                incomingNodeCountMap = {},
                resourceNodeMap = {},
                isValid = true;
            fish.each(node.childShapes, function (childNode) {
                // 父节点为并发节点：并发节点内子环节不允许出现连接线
                if ('CpParallelTask' == nodeType) {
                    // 并发环节子节点
                    if (childNode.outgoing && childNode.outgoing.length > 0) {
                        // 并发节点内子环节不允许出现连接线
                        isValid = false;
                        // errorMsgs.push(me._buildErrorMsg(node, ZUtils.format(me.i18nData.PARALLEL_LINE_INNER_NODE_INFO,
                        //     childNode.properties.name, node.properties.name)));
                    }
                    // 始末节点不能是并发子环节节点
                    if ('StartNoneEvent' == childNode.stencil.type) {
                        isValid = false;
                        errorMsgs.push(me._buildErrorMsg(node, me.i18nData.START_NODE_NOT_IN_PARALLEL));
                    } else if ('EndNoneEvent' == childNode.stencil.type) {
                        isValid = false;
                        errorMsgs.push(me._buildErrorMsg(node, me.i18nData.END_NODE_NOT_IN_PARALLEL));
                    }
                } else if (me.hasProcess(nodeType)) {
                    // 串行环节子节点与流程图子节点：同类处理

                    // 需要始末节点，且各一个-始末节点统计
                    if ('StartNoneEvent' == childNode.stencil.type) {
                        startNodeCount ++;
                    } else if ('EndNoneEvent' == childNode.stencil.type) {
                        endNodeCount ++;
                    }
                }
                // 进行基本节点校验
                // 连入线统计
                if ('SequenceFlow' == childNode.stencil.type) {
                    fish.each(childNode.outgoing, function (outTarget) {
                        if (!incomingNodeCountMap[outTarget]) {
                            incomingNodeCountMap[outTarget] = 0;
                        }
                        incomingNodeCountMap[outTarget]++;
                    });
                } else {
                    // 出发线
                    if (childNode.outgoing && childNode.outgoing.length > 0) {
                        // 记录节点已接入图中
                        childNode.isLinkedOutTask = true;
                        // 出发线不应超过一条
                        if (childNode.outgoing.length > 1) {
                            isValid = false;
                            // errorMsgs.push(me._buildErrorMsg(node, ZUtils.format(me.i18nData.ILLEGAL_OUTGOING_NODE, childNode.properties.name)));
                        }
                    }
                    // 保存资源与环节节点称对应关系
                    resourceNodeMap[childNode.resourceId] = childNode;
                }

                isValid = me._recurseNodeList(childNode, errorMsgs) && isValid;
            });

            // 连入线不应超过一条
            fish.each(incomingNodeCountMap, function (incomingNodeCount, resourceId) {
                if (incomingNodeCount > 1) {
                    isValid = false;
                    // errorMsgs.push(me._buildErrorMsg(resourceNodeMap[resourceId], ZUtils.format(me.i18nData.ILLEGAL_INCOMING_NODE, resourceNodeMap[resourceId].properties.name)));
                }
                // 记录节点已接入图中
                resourceNodeMap[resourceId].isLinkedInTask = true;
            });
            if (me.hasProcess(nodeType)) {
                // 需要始末节点，且各一个
                if (1 != startNodeCount || 1 != endNodeCount) {
                    isValid = false;
                    var name = me.i18nData.BPMN_DIAGRAM;
                    if ("BPMNDiagram" != nodeType) {
                        name = me.i18nData.SERIAL_NODE + node.properties.name;
                    }
                    // errorMsgs.push(me._buildErrorMsg(node, ZUtils.format(me.i18nData.NEED_ONLY_ONE_START_END_NODE, name)));
                }

                // 需要将所有环节连入流程图中，且以开始环节开始，结束环节结束;统计环节数量
                var taskCount = 0;
                fish.each(node.childShapes, function (childShape) {
                    if (!isValid) {
                        return;
                    }
                    var nodeType = childShape.stencil.type;
                    // 统计环节数量
                    if (nodeType.indexOf("Task") > 0) {
                        taskCount++;
                    }
                    switch (nodeType) {
                        case "SequenceFlow":
                            // 跳过连接线节点
                            return;
                        case "StartNoneEvent" :
                            if (childShape.isLinkedInTask || !childShape.isLinkedOutTask) {
                                // 开始节点有连入或者没有连出，异常
                                isValid = false;
                                errorMsgs.push(me._buildErrorMsg(childShape, me.i18nData.GRAPH_CONNECT_VALIDATE));
                            }
                            break;
                        case "EndNoneEvent":
                            if (childShape.isLinkedOutTask || !childShape.isLinkedInTask) {
                                // 结束节点没有连入或者有连出，异常
                                isValid = false;
                                errorMsgs.push(me._buildErrorMsg(childShape, me.i18nData.GRAPH_CONNECT_VALIDATE));
                            }
                            break;
                        default:
                            if (!childShape.isLinkedOutTask || !childShape.isLinkedInTask) {
                                // 环节节点没有连入或者没有连出，异常
                                isValid = false;
                                errorMsgs.push(me._buildErrorMsg(childShape, me.i18nData.GRAPH_CONNECT_VALIDATE));
                            }
                    }
                });
                if (isValid && taskCount == 0) {
                    // 没有环节 报错
                    isValid = false;
                    var name = me.i18nData.BPMN_DIAGRAM;
                    if ("BPMNDiagram" != nodeType) {
                        name = me.i18nData.SERIAL_NODE + node.properties.name;
                    }
                    // errorMsgs.push(me._buildErrorMsg(node, ZUtils.format(me.i18nData.NO_VALID_TASK_NODE, name)));
                }
            }
            return isValid;
        },

        hasProcess: function (nodeType) {
            return "CpSerialTask" == nodeType || "BPMNDiagram" == nodeType;
        },

        recurseNodeValidation: function (nodeList, errorMsgs) {
            var me = this,
                isValid = true;
            fish.each(nodeList, function (node) {
                var nodeType = node.stencil.type;
                if ("BPMNDiagram" == nodeType || nodeType.indexOf("Task") > 0) {
                    if (!node.properties.validState) {
                        isValid = false;
                        if ("BPMNDiagram" == nodeType) {
                            // errorMsgs.push(me._buildErrorMsg(node, ZUtils.format(me.i18nData.DIAGRAM_ATTR_NOT_VALID)));
                        } else {
                            var name = "";
                            if (node.properties.name) {
                                name = node.properties.name;
                            }
                            // errorMsgs.push(me._buildErrorMsg(node, ZUtils.format(me.i18nData.NODE_ATTR_NOT_VALID, name)));
                        }

                    }
                    if (node.childShapes) {
                        isValid = me.recurseNodeValidation(node.childShapes, errorMsgs) && isValid;
                    }
                }
            });
            return isValid;
        },

        _buildErrorMsg: function (node, msg) {
            var msgObj = {
                resourceId: node.resourceId,
                msg: msg
            };
            return msgObj;
        },

        showErrMsg: function (errorMsgs) {
            var me = this;
            if (errorMsgs && errorMsgs.length > 0) {
                // ZUtils.Msg.showError(me.i18nData.DIAGRAM_VALID_FAIL);

                me.errMsgsPnl.loadErrorMsgs(errorMsgs);
                me.splitterPnl.splitter("expand", ".process-editor-errorMsgs");
            }
        },

        clearErrMsg: function () {
            var me = this;
            me.errMsgsPnl.loadErrorMsgs([]);
            me.splitterPnl.splitter("collapse", ".process-editor-errorMsgs");
        },

        // 视图被删除时候做的事情
        cleanup: function () {
            var me = this;

            // 手工删除对dom元素和复杂对象的引用
            delete me.splitter;

        }
    });
});