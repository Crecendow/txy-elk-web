define([
    'hbs!zcamp/component/panel/templates/SubCollapsePanel.html'
], function (viewTpl) {

    return fish.View.extend({
        // false表示不会主动包裹一层div
        el: false,
        template: viewTpl,

        events: {
            "click .simple-collapse-header": 'toggleContent'
        },

        // 用于模板中进行替换的数据对象
        serialize: function() {
            var me = this,
                opts = me.options;

            return opts;
        },

        /**
        var subCollapsePnl = new SubCollapsePanel({
            isExpanded: true, // 默认展开状态
            name: "systemParamBaseInfoPnl", // 子面板名称，唯一
            viewName: "zcamp/modules/systemMgr/systemParam/views/SysParamBasicInfoView", // view 全名
            title: me.i18nData.SYSTEMPARAM, // 标题名称
            // 子视图参数
            viewOpts: {
                paramId: me.options.paramId,
                systemParam:  me.options.systemParam
            }
        });

         */
        initialize: function() {
            var me = this,
                opts = me.options;

            if (!opts.name) {
                return;
            }

            me.visible = opts.visible;
            if (me.visible == undefined) {
                me.visible = true;
            }

            // 加载view
            me._loadCustomView(opts);
        },

        _loadCustomView: function(opts) {
            var me = this;
            if (opts.viewName) {
                require([opts.viewName], function(viewPanel) {
                    var viewOpts = opts.viewOpts;
                    if (!viewOpts) {
                        viewOpts = {};
                    }
                    viewOpts.ownerCtr = me;
                    var viewPanelObj = new viewPanel(viewOpts);
                    me.insertView('.simple-collapse-content-box', viewPanelObj);
                    me.renderViews([viewPanelObj]);
                    me.itemView = viewPanelObj;
                });
            } else if (opts.viewObj) {
                var viewPanelObj = opts.viewObj;
                me.insertView('.simple-collapse-content-box', viewPanelObj);
                // me.renderViews([viewPanelObj]);
                me.itemView = viewPanelObj;
            }
        },

        toggleContent: function(e) {
            var me = this;
            var $header = $(e.target).parents(".simple-collapse-header");
            // 组件支持标题中待按钮
            if ($(e.target)[0].className.indexOf("btn") < 0) {
                me._doCollapse($header);
            }
        },

        _doCollapse: function($header){
            if ($header.attr("aria-expanded") == "true") {
                $header.attr("aria-expanded", "false");
                $header.next().removeClass("simple-collapse-content-active").addClass("simple-collapse-content-inactive");
            } else {
                $header.attr("aria-expanded", "true");
                $header.next().removeClass("simple-collapse-content-inactive").addClass("simple-collapse-content-active");
            }
        },

        // 展开或收起子view
        toggleSubPanel: function(){
            var me = this;
            var $header = me.$(".simple-collapse-header");
            me._doCollapse($header);
        },

        /**
        collapsePnl.replaceSubPanelView("systemParamBaseInfoPnl", { // 已有的子view名称
            viewName: "zcamp/modules/systemMgr/systemParam/views/SysParamBasicInfoView", // view 全名
            // 子视图参数
            viewOpts: {
                paramId: me.options.paramId,
                systemParam:  me.options.systemParam
            }
        });
         * */
        replaceSubPanelView: function(newViewOpts) {
            var me = this;
            me.itemView.remove();
            delete me.itemView;
            me._loadCustomView(newViewOpts);
        },

        setVisible: function(visible) {
            var me = this;

            if (me.visible === visible) {
                return;
            }

            if (visible === true) {
                if (me.$el.hasClass("hidden")) {
                    me.$el.removeClass("hidden");
                }
            } else {
                if (!me.$el.hasClass("hidden")) {
                    me.$el.addClass("hidden");
                }
            }

            me.visible = visible;
        },

        // view被移除时候调用
        cleanup: function() {
            var me = this;
            delete me.itemView;
        }
    });
});
