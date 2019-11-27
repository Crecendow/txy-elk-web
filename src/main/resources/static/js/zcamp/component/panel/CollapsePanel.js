define([
    'hbs!zcamp/component/panel/templates/CollapsePanel.html',
    'zcamp/component/panel/SubCollapsePanel'
], function (viewTpl, SubCollapsePanel) {

    return fish.View.extend({
        // false表示不会主动包裹一层div
        el: false,
        template: viewTpl,


        // 用于模板中进行替换的数据对象
        serialize: function() {
            var me = this,
                opts = me.options;

            return {
                itemList: opts.itemList
            }
        },

        /**
        var collapsePnl = new CollapsePanel({
            itemList: [{
                isExpanded: true, // 默认展开状态
                name: "systemParamBaseInfoPnl", // 子面板名称，唯一，必填
                viewName: "zcamp/modules/systemMgr/systemParam/views/SysParamBasicInfoView", // view 全名
                title: me.i18nData.SYSTEMPARAM, // 标题名称
                // 子视图参数
                viewOpts: {
                    paramId: me.options.paramId,
                    systemParam:  me.options.systemParam
                },
                // 使用viewObj则不使用viewName与viewOpts
                viewObj: obj
            }]
        });

         */
        initialize: function() {
            var me = this,
                opts = me.options;

            me.itemViews = {};
            var itemList = opts.itemList;
            fish.each(itemList, function(item) {
                // 加载view
                me.addSubPanel(item, true);
            });
        },


        // 展开或收起子view
        toggleSubPanel: function(name) {
            var me = this;
            var subView = me.itemViews[name];
            if (subView) {
                subView.toggleSubPanel();
            }
        },

        /**
        collapsePnl.replaceSubPanelView("systemParamBaseInfoPnl", { // 已有的子view名称
            viewName: "zcamp/modules/systemMgr/systemParam/views/SysParamBasicInfoView", // view 全名
            // 子视图参数
            viewOpts: {
                paramId: me.options.paramId,
                systemParam:  me.options.systemParam
            },
            // 使用viewObj则不使用viewName与viewOpts
            viewObj: obj
        });
         * */
        replaceSubPanelView: function(name, newViewOpts) {
            var me = this;
            var subView = me.itemViews[name];
            if (subView) {
                subView.replaceSubPanelView(newViewOpts);
            }
        },

        removeSubPanel: function(name) {
            var me = this;
            var subView = me.itemViews[name];
            if (subView) {
                subView.remove();
                delete me.itemViews[name]
            }
        },

        addSubPanel: function(item, isInit) {
            var me = this;

            // 加载view
            var subView = new SubCollapsePanel(item);
            me.setView(subView, true);
            me.itemViews[item.name] = subView;
            if (!isInit) {
                me.renderViews([subView]);
            }
        },

        getSubPanel: function(name) {
            var me = this;
            return me.itemViews[name].itemView;
        },

        hideItemByStartNameList: function(startNameList) {
            var me = this;
            me.setItemVisibleByStartNameList(startNameList, false);
        },

        showItemByStartNameList: function(startNameList) {
            var me = this;
            me.setItemVisibleByStartNameList(startNameList, true);
        },

        setItemVisibleByStartNameList: function(startNameList, visible) {
            var me = this;

            if (!startNameList || startNameList.length == 0) {
                return;
            }

            fish.each(startNameList, function(startName) {
                fish.each(me.itemViews, function(view, name) {
                    if (name.startsWith(startName)) {
                        view.setVisible(visible);
                    }
                });
            });
        },

        afterRender: function () {
            var me = this;
        },

        // view被移除时候调用
        cleanup: function() {
            var me = this;
            delete me.itemViews;
        }
    });
});
