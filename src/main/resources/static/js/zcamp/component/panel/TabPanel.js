define([
    'hbs!zcamp/component/panel/templates/TabPanel.html'
], function (viewTpl) {

    return fish.View.extend({
        // false表示不会主动包裹一层div
        el: false,
        template: viewTpl,

        events: {
        },

        // 用于模板中进行替换的数据对象
        serialize: function() {
            var me = this,
                opts = me.options;

            return {
                itemList: opts.itemList
            }
        },

        /**
         var tabPnl = new TabPanel({
            active: 0, // 默认活动页签，默认0
            itemList: [{
                name: "systemParamBaseInfoPnl", // 子面板名称，唯一
                viewName: "zcamp/modules/systemMgr/systemParam/views/SysParamBasicInfoView", // view 全名
                title: me.i18nData.SYSTEMPARAM, // 标题名称
                content: "", // 可选，html格式的内容，会被view覆盖
                // 子视图参数
                viewOpts: {
                    paramId: me.options.paramId,
                    systemParam:  me.options.systemParam
                }
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
                if (!item.viewName) {
                    return;
                }
                require([item.viewName], function(viewPanel) {
                    var viewOpts = item.viewOpts;
                    if (!viewOpts) {
                        viewOpts = {};
                    }
                    var viewPanelObj = new viewPanel(viewOpts);
                    me.insertView('.ui-tabs-panel.' + item.name, viewPanelObj);
                    me.renderViews([viewPanelObj]);
                    me.itemViews[item.name] = viewPanelObj;
                });
            });
        },

        getSubPanel: function(name) {
            var me = this;
            return me.itemViews[name];
        },

        /**
         tabPnl.replaceSubPanelView("systemParamBaseInfoPnl", { // 已有的子view名称
            viewName: "zcamp/modules/systemMgr/systemParam/views/SysParamBasicInfoView", // view 全名
            // 子视图参数
            viewOpts: {
                paramId: me.options.paramId,
                systemParam:  me.options.systemParam
            }
         });
         * */
        replaceSubPanelView: function(name, newViewOpts) {
            var me = this;
            // 加载view
            if (!newViewOpts.viewName) {
                return;
            }
            require([newViewOpts.viewName], function(viewPanel) {
                var viewOpts = newViewOpts.viewOpts;
                if (!viewOpts) {
                    viewOpts = {};
                }
                var viewPanelObj = new viewPanel(viewOpts);
                me.insertView('.ui-tabs-panel.' + name, viewPanelObj);
                me.renderViews([viewPanelObj]);
                me.itemViews[name] = viewPanelObj;
            });
        },

        // 不推荐
        /**
         {
            index: 2, // 可选，从0开始的计数
            content: "", // 可选，html格式的内容，会被view覆盖
            title: "Tab3", // Tab标题
            viewName: "zcamp/modules/systemMgr/systemParam/views/SysParamBasicInfoView"，
            name: "tabName",
            viewOpts: {
                paramId: me.options.paramId,
                systemParam:  me.options.systemParam
            }
         }
         */
        addTabPanel: function(config) {
            var me = this;
            if(!config.index){
                var index = me.$el.tabs("getAllTabs", true, true).length;
                config.index = index;
            }
            me.$el.tabs('add', {
                index: config.index,
                //id: config.id,
                content: config.content,
                label: config.title
            });
            // 加载view
            if (!config.viewName) {
                return;
            }
            var tabList = me.$(".ui-tabs-panel");
            $(tabList[config.index]).addClass(config.name);
            require([config.viewName], function(viewPanel) {
                var viewOpts = config.viewOpts;
                if (!viewOpts) {
                    viewOpts = {};
                }
                var viewPanelObj = new viewPanel(viewOpts);
                me.insertView('.ui-tabs-panel.' + config.name, viewPanelObj);
                me.renderViews([viewPanelObj]);
                me.itemViews[config.name] = viewPanelObj;
            });
        },

        // 执行方法，与api参数一致
        execusteTabsFunc: function(){
            var me = this;
            me.$el.tabs.apply(this,arguments);
        },

        afterRender: function () {
            var me = this;
            var config = fish.extend({
                canClose: false,
                paging: true,
                autoResizable: true
            }, me.options);
            delete config.itemList;
            me.$el.tabs(config);
        },

        // view被移除时候调用
        cleanup: function() {
            var me = this;
            delete me.itemViews;
        }
    });
});
/**
 * Created by Administrator on 2018/6/10 0010.
 */
