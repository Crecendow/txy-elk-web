define([
    'hbs!zcamp/modules/commonprocess/common/processeditor/templates/ProcessEditorStencilBox.html',
    'i18n!zcamp/modules/commonprocess/common/processeditor/i18n/ProcessEditorStencilBox.i18n',
    'i18n!zcamp/i18n/Common.i18n',
    'zcamp/component/accordion/Accordion',
    'zcamp/modules/commonprocess/common/processeditor/resource/BasicStencilToolData',
    'zcamp/modules/commonprocess/common/processeditor/resource/ExtendedStencilToolData',
    'zcamp/modules/commonprocess/common/processeditor/ProcessEditorConstants',
    'zcamp/modules/common/ZUtils'
], function (viewTpl, i18n, commonI18n, Accordion, basicStencilToolData, extendedStencilToolData, ProcessEditorConstants, ZUtils) {

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

        afterRender: function () {
            var me = this;

            me.accordion = new Accordion();
            me.addAccordionItems();
            me.addView(".stencilbox-ctr", me.accordion);
        },

        addAccordionItems: function () {
            var me = this;

            var param = me.getQryParam();
            setTimeout(function () {
                var data = [{"name":"BASIC_STENCIL_TOOL","items":[{"id":"0","name":"CpStartNodeTask","pId":"-1","isParent":false,"data":null,"childNodeList":null},{"id":"1","name":"CpEndNodeTask","pId":"-1","isParent":false,"data":null,"childNodeList":null},{"id":"2","name":"CpSimpleTask","pId":"-1","isParent":false,"data":null,"childNodeList":null},{"id":"3","name":"CpParallelTask","pId":"-1","isParent":false,"data":null,"childNodeList":null},{"id":"4","name":"CpSerialTask","pId":"-1","isParent":false,"data":null,"childNodeList":null},{"id":"5","name":"CpSubProcessTask","pId":"-1","isParent":false,"data":null,"childNodeList":null}]},{"name":"EXTENDED_STENCIL_TOOL","items":[{"id":"0","name":"CpAnsibleTplTask","pId":"-1","isParent":false,"data":null,"childNodeList":null},{"id":"1","name":"CpClusterTplTask","pId":"-1","isParent":false,"data":null,"childNodeList":null},{"id":"2","name":"CpSqlTplTask","pId":"-1","isParent":false,"data":null,"childNodeList":null},{"id":"3","name":"CpSshTplTask","pId":"-1","isParent":false,"data":null,"childNodeList":null}]}]

                fish.each(data, function (value) {
                    // 组装工具箱树节点
                    var fileNodeList = me._buildTreeNodeData(value);

                    var stencilBoxItem = {
                        title: ProcessEditorConstants.STENCILBOX_NAME[value.name],
                        name: value.name,
                        expand: true,
                        scope: me,
                        afterRender: function (ctr) {
                            me._initTreePanel(fileNodeList, ctr);
                        }
                    };

                    me.accordion.addItem(stencilBoxItem);
                });
            }, 0);
            
        },

        _buildTreeNodeData: function (value) {
            var me = this;

            var fileNodeList = [];

            fish.each(value.items, function (item) {
                var basicItem = me._buildSingleTreeNodeData(value, item);
                fileNodeList.push(basicItem);
            });

            return fileNodeList;
        },

        _buildSingleTreeNodeData: function (value, item) {
            var treeNodeIconName = item.name.toLowerCase();
            var treeNodeType = item.name;

            if (value.name === ProcessEditorConstants.STENCILBOX_ITEM.PREDEFINED_TEMPLATE) {
                treeNodeIconName = ProcessEditorConstants.STENCIL_ITEM_TYPE.PREDEFINED_TEMPLATE.toLowerCase();
                treeNodeType = ProcessEditorConstants.STENCIL_ITEM_TYPE.PREDEFINED_TEMPLATE;
            }

            var treeNodeName = ProcessEditorConstants.STENCIL_ITEM_NAME[item.name] || item.name;


            var basicItem = {
                name: treeNodeName,
                icon: "zcamp/modules/commonprocess/common/processeditor/resource/img/" + treeNodeIconName + ".png",
                type: treeNodeType,
                data: item.data,
                isParent: item.isParent
            };
            return basicItem;
        },

        getQryParam: function() {
            return {};
        },

        _initTreePanel: function (fileNodeList, ctr) {
            var me = this;

            var options = {
                fNodes: fileNodeList,
                edit: {
                    enable: true,
                    showRemoveBtn: false,
                    showRenameBtn: false,
                    drag: {
                        forbidOwnTree: true    // 自定义扩展属性, 关闭自身拖拽, 只允许拖到外面
                    }
                },
                data: {
                    key: {
                        children: "childNodeList",
                        iconFontEnable: false
                    },
                    keep: {
                        parent: true,
                        leaf: true
                    }
                },
                callback: {
                    // beforeDrag: ZUtils.bind(me._startDragCallback, me),
                    onDrag: ZUtils.bind(me._onDrag, me),
                    onDrop: ZUtils.bind(me._onDrop, me),
                    // onDragMove: ZUtils.bind(me._dragCallback, me)
                }
            };

            ctr.tree(options);
            ctr.find(".ztree").css("overflow", "hidden");
        },

        _onDrag: function (e, treeId, treeNodes) {
            var me = this;

            // 由于拖拽的节点处于全局状态, 没法单独通过css设置, 为了防止和其他tree冲突, 采用此种方法来解决
            $(".zTreeDragUL").addClass("stencilbox-drag-ui");
        },

        _onDrop: function (event, treeId, treeNodes) {
            var me = this;

            me.trigger("dropStencil", event, treeNodes[0]);
        },

        // 视图被删除时候做的事情
        cleanup: function () {
            var me = this;
        }
    })
});