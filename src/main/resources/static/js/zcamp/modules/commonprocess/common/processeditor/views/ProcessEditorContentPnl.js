define([
    'hbs!zcamp/modules/commonprocess/common/processeditor/templates/ProcessEditorContentPnl.html',
    'i18n!zcamp/modules/commonprocess/common/processeditor/i18n/ProcessEditorContentPnl.i18n',
    'i18n!zcamp/i18n/Common.i18n',
    'frm/fish-topo-bpmn/fish-topo-bpmn',
    'zcamp/modules/common/ZUtils',
    'zcamp/modules/commonprocess/common/processeditor/BPMNNodeRegisterUtil'
], function (viewTpl, i18n, commonI18n, BPMN, ZUtils, BPMNNodeRegisterUtil) {

    return fish.View.extend({
        //视图Dom元素，设为false,则直接采用模板内容作为Dom元素
        el: false,
        //模板函数
        template: viewTpl,

        i18nData: fish.extend({}, commonI18n, i18n),

        //提供模板数据
        serialize: function () {
            return this.i18nData;
        },

        initialize: function() {
            var me = this;

            // 注册默认节点节点
            BPMNNodeRegisterUtil.registerDefaultNodes(BPMN);

            me.registerCustomNodes(BPMN);
        },

        registerCustomNodes: function() {},

        registerCustomNode: function(CustomNodeClass) {
            BPMNNodeRegisterUtil.registerNode(BPMN, CustomNodeClass);
        },

        afterRender: function() {
            var me = this;

            me.fishTopoBpmn = me._buildBpmn();

            me._initBpmnEvents();

            me.trigger("afterBpmnRender", me);
        },

        _buildBpmn: function() {
            var me = this,
                canvasDom = me.$el[0];

            var fishTopoBpmn = BPMN.init(canvasDom, {
                showGridLine: false,  //默认为true，显示网格线
                forbidEdit: false,    //默认为false，可以编辑
                rotatable: true,
                scaleable: true,
                beforeAddNode: ZUtils.bind(me.onBeforeAddNode, me)
            });

            fishTopoBpmn.setShapeModel(fishTopoBpmn, {properties: {width: 2000, height:2000}}, 2000, 2000);

            return fishTopoBpmn;
        },

        _initBpmnEvents: function() {
            var me = this;

            me.initAfterCreateNodeEvent();
            me.initAfterRemoveNodeEvent();
            me.initNodeEditEvent();
            me.initBpmnClickEvent();
            me.initOperationIconEvent();
            me.initCustomEvent();
        },

        initAfterCreateNodeEvent: function () {
            var me = this;

            me.fishTopoBpmn.on("afterCreateNode", function(e) {
                me.initAutoSelectNodeEvent(e.target);
                me.customInitAfterCreateNodeEvent(e);
            });
        },

        initAutoSelectNodeEvent: function (node) {
            var me = this;

            if (!me.isLoadingJson) {
                me.fishTopoBpmn.selectNode(node);
                me.trigger("bpmnClick", node);
            }
        },

        customInitAfterCreateNodeEvent: function (e) {

        },

        initAfterRemoveNodeEvent: function () {
            var me = this;

            me.fishTopoBpmn.on("afterDeleteNode", function(e) {
                me.customInitAfterDeleteNodeEvent(e);
            });
        },

        customInitAfterDeleteNodeEvent: function () {

        },

        initNodeEditEvent: function() {
            var me = this;

            // 双击修改名称
            me.fishTopoBpmn.on("dblclick", function (e) {
                var target = e.target;
                if (me.fishTopoBpmn) {
                    me.fishTopoBpmn.nodeEdit(target);
                    e.event.cancelBubble = true;
                }
            });

            // 在流程图上双击修改节点名称后触发
            me.fishTopoBpmn.on("afterEditNode", function(e) {
                var node = e.target;

                fish.trigger("changeNode", node.model.option);
            });
        },

        initBpmnClickEvent: function() {
            var me = this;

            me.fishTopoBpmn.on("click", function (e) {
                var target = e.target;
                e.cancelBubble = true;

                // 点击流程图
                if (BPMN.Bpmn.isTemplate(target)) {
                    target = me;
                    me.trigger("diagramClick", target);
                }
                // 点击线 允许删除
                else if (BPMN.Bpmn.isFlow(target)) {
                    var lineNode = e.target;
                    me.fishTopoBpmn.bindLineDelete(lineNode);

                    me.trigger("lineClick", target);
                }
                // 点击节点
                else if (BPMN.Bpmn.isActivity(target)) {
                    me.trigger("taskNodeClick", target);

                }
                me.trigger("bpmnClick", target);
            });
        },

        initOperationIconEvent: function() {
            var me = this;

            // 处理选中快捷按钮的弹出
            me.fishTopoBpmn.on("editOperationIcons", function (e) {
                var node = e.target,
                    //拿到当前节点拥有的操作按钮
                    icons = e.data,
                    //节点连接线的个数
                    lineCnt = node.model.option.outgoing.length,

                    // 只能发出一条连接线
                    hasOutgoingLine = (lineCnt >= 1),
                    // 结束节点不能作为连接线的起点
                    isEndNode = (node.bpmnInfo.name == "EndNoneEvent");
                    // 并发节点的子节点之间不能连线
                    // parentIsParllelTask = (node.parent && node.parent.bpmnInfo.name == "CpParallelTask");

                icons.forEach(function (item) {
                    if (item.name === 'JAGGED') {
                        if (hasOutgoingLine || isEndNode) {
                            item.hidden = true;
                        } else {
                            delete item.hidden;
                        }
                    }
                });
            });
        },

        initCustomEvent: function () {
            var me = this;

            me.trigger("bpmnClick", me);
        },

        /** 属性定义开始 */
        attrPanelUrl: "zcamp/modules/commonprocess/common/processeditor/attrpanel/CpTplProcessAttrPanel",

        requireAttrPanel: function(parentCt, pnlSelector) {
            var me = this,
                attrPanelOptions = me.getAttrPanelOptions();

            // 右侧选择属性视图
            parentCt.requireView({
                url: me.attrPanelUrl,
                selector: pnlSelector,
                viewOption: attrPanelOptions,
                callback: function (viewInstance) {
                    me.initAttrPanelEvent(viewInstance);
                }
            });
        },

        getAttrPanelOptions: function() {
            var me = this;

            return {
                cpTplProcess: me.fishTopoBpmn.model.get("cpTplProcess")
            };
        },

        initAttrPanelEvent: function(attrPanel) {
            var me = this;

            attrPanel.on("processChange", me.mergeProcessData, me);
        },

        /** 属性定义结束 */

        getDefaultCpTplProcess: function() {

            return {
                id: null,
                bisDomain: null,
                category: null,
                code: null,
                comments: null,
                createdDate: null,
                createdUser: null,
                name: null,
                state: "A"
            };
        },

        mergeProcessData: function (cpTplProcess, validState) {
            var me = this,
                cpTplProcess = fish.extend({}, me.fishTopoBpmn.model.get("cpTplProcess") || me.getDefaultCpTplProcess(), cpTplProcess);

            me.fishTopoBpmn.model.set("cpTplProcess", cpTplProcess);
            me.fishTopoBpmn.model.set("properties.name", cpTplProcess.name);
            me.mergeValidState(validState);
        },

        mergeValidState: function (validState) {
            var me = this;
            me.fishTopoBpmn.model.set("properties.validState", validState);
        },

        onBeforeAddNode: function(e) {
            var me = this,
                node = e.data;

            return me._loadNodeBySharpMode(node);
        },

        _loadNodeBySharpMode: function(node) {
            var me = this, loadSharpCallback;

            if (node.sharpMode === "proxy") {
                loadSharpCallback = function(shapes) {
                    return me._addShapesFromProxyNode(node, shapes);
                };
            }

            return me._loadNodeByMode(node, loadSharpCallback);
        },

        _loadNodeByMode: function(node, loadDataCallback) {
            var me = this;

            if (node.dataLoadMode === "ajax" && node.loadData) {
                return node.loadData(loadDataCallback);
            }
            else {
                // 非ajax异步数据, 以loadDataCallback的返回值为准
                if (loadDataCallback) {
                    return loadDataCallback(node.getProxySharps());
                }
                // 默认return true, 表示正常添加node
                else {
                    return true;
                }
            }
        },

        _addShapesFromProxyNode: function(proxyNode, shapes) {
            var me = this,
                position = proxyNode.model.get("bounds.upperLeft");

            me.fishTopoBpmn.addShapes(shapes, position.x, position.y);

            return false;
        },

        calcNewNodePositionOnDrop: function(event) {
            var me = this,
                point = { x: event.pageX, y: event.pageY },
                offset = $(me.fishTopoBpmn.getDom()).offset();


            var x = point.x - offset.left;
            var y = point.y - offset.top;
            x = parseInt(x / 10) * 10;
            y = parseInt(y / 10) * 10;

            return { x: x, y: y};
        },

        addNodeOnDrop: function(event, stencil) {
            var me = this,
                position = me.calcNewNodePositionOnDrop(event);

            me.addNode(position, stencil);
        },

        /**
         * 选中异常节点
         */
        focusErrorNode: function (resourceId) {
            var me = this;
            var nodeList = me.fishTopoBpmn.findElements(function (e) {
                return e.resourceId == resourceId;
            });
            if (nodeList && nodeList.length > 0) {
                me.fishTopoBpmn.selectNode(nodeList[0]);
                me.trigger("bpmnClick", nodeList[0]);
            } else {
                me.trigger("bpmnClick", me);
            }
        },

        /**
         * 在流程图上添加图形, 添加位置为鼠标当前位置
         *
         * @param {} stencil 图形
         */
        addNode: function(position, opts) {
            var me = this, operationIcons = [], rotatable, scaleable;

            if (!opts.hideOperation) {
                operationIcons.push({
                    name: 'DEL'
                });
                operationIcons.push({
                    name:'JAGGED',
                    options: {
                        symbol: {
                            type: "arrow",
                            // 箭头颜色
                            color: "#aaaaac"
                        },
                        style: {
                            // 线条颜色
                            lineType: 'jagged',
                            stroke: "#BBBBBB",
                            lineWidth: 2
                        }
                    }
                });
            }

            if(opts.type === 'CpParallelTask' || opts.type === 'CpSerialTask') {
                rotatable = true;
                scaleable = true;
            }

            me.fishTopoBpmn.addNode(opts.type, position.x, position.y, {
                //节点的名称
                name: opts.name,
                // 增加节点操作图标
                operationIcons: operationIcons,
                userData: opts.data,
                rotatable: rotatable,
                scaleable: rotatable,
                selectStyle: {}
            });
        },

        selectFirstNode: function() {
            var me = this;

            if (me.fishTopoBpmn.allNodes && me.fishTopoBpmn.allNodes.length > 0) {
                var firstNode = me.fishTopoBpmn.allNodes[0];

                me.fishTopoBpmn.selectNode(firstNode);
                me.trigger("bpmnClick", firstNode);
            }
        },

        /**
         * 导出流程图的json格式的数据
         *
         * @returns 流程图json格式的数据
         */
        exportJson: function() {
            var me = this;

            return me.fishTopoBpmn.toJson();
        },

        loadJson: function(json) {
            var me = this;

            me.isLoadingJson = true;
            me.fishTopoBpmn.fromJson(json);
            me.isLoadingJson = false;

            me.trigger('bpmnClick', me);
        },

        /**
         * 根据步骤信息重新加载流程图（undo redo）
         * @param json
         */
        reloadFromStepJson: function (json) {
            var me = this;

            me.fishTopoBpmn.fromJson(json);
        },

        undo: function() {
            var me = this;

            if (me.fishTopoBpmn.step > 0) {
                me.fishTopoBpmn.clear(true);
                me.fishTopoBpmn.step -= 1;
                if (me.fishTopoBpmn.step - 1 >= 0) {
                    var json = JSON.parse(me.fishTopoBpmn.stepJson[me.fishTopoBpmn.step - 1]);
                    me.reloadFromStepJson(json);
                } else {
                    var json = JSON.parse(this.fishTopoBpmn.stepJson[0]);
                    json.childShapes = [];
                    me.reloadFromStepJson(json);
                }
            }  
        },

        redo: function() {
            var me = this;

            if (me.fishTopoBpmn.step < me.fishTopoBpmn.stepJson.length) {
                me.fishTopoBpmn.clear(true);
                me.fishTopoBpmn.step += 1;
                var json = JSON.parse(me.fishTopoBpmn.stepJson[me.fishTopoBpmn.step - 1]);
                me.reloadFromStepJson(json);
            }
        },
        btnConnect: function(e) {
            var me = this;
            me.fishTopoBpmn.showConnectorPoint(e.currentTarget.name, {
                symbol: {
                    type: "arrow",
                    // 箭头颜色
                    color: "#aaaaac"
                },
                style: {
                    // 线条颜色
                    stroke: "#BBBBBB",
                    lineWidth: 2
                }
            });
            $(e.currentTarget).parent().find('.active').removeClass('active');
            $(e.currentTarget).addClass('active');
        },
        btnInit: function() {
            var me = this;
            me.fishTopoBpmn.mouseMode = 'default';
            $('.btn-dragselect').removeClass('active');
            $('.btn-init').addClass('active');
        },
        btnDragSelect: function() {
            var me = this;
            me.fishTopoBpmn.mouseMode = 'drag-select';
            $('.btn-init').removeClass('active');
            $('.btn-dragselect').addClass('active');
        },
        onGridLine: function () {
            if (this.fishTopoBpmn) {
                this.fishTopoBpmn.forbidGridLine($(".btn-gridline").is(":checked"));
            }
        },
        btnDelSelected: function () {
            var me = this;

            me.fishTopoBpmn.removeSelectedNodes();
        },
        
        // 视图被删除时候做的事情
        cleanup: function () {
            var me = this;

            delete me.fishTopoBpmn;
        }
    })
});