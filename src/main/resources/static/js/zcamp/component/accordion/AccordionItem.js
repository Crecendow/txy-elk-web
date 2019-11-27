define([
    'hbs!zcamp/component/accordion/templates/AccordionItem.html'
], function(viewTpl) {

    return fish.View.extend({
        el: false,
        template: viewTpl,

        /**
         var subCollapsePnl = new SubCollapsePanel({
             data: {
                expand: true, // 默认折叠状态
                name: "systemParamBaseInfoPnl", //名称-没啥用
                title: "属性面板", //标题

                // 指定一个现成的view对象
                viewObj: new PortletPanel(),

                // 通过require方式动态加载子view
                viewName: "zcamp/modules/systemMgr/systemParam/views/SysParamBasicInfoView", // view 全名
                // 子视图参数
                viewOpts: {
                    paramId: me.options.paramId,
                    systemParam:  me.options.systemParam
                },

                // 通过afterRender手动初始化
                afterRender: function($bodyDom) {
                }, // 渲染结束后操作
                scope: this // 作用域
            },
            accordionid: fish.getUUID() // 全局唯一ID
        });

         */
        initialize: function(params) {
            var me = this,
                opts = me.options,
                item = opts.data,
                accordionid = opts.accordionid;

            me.item = item;
            me.accordionid = accordionid;

            if (item.viewObj) {
                var viewPanelObj = item.viewObj;
                viewPanelObj.eventTrigger = me.eventTrigger;
                me.insertView('div.panel-body', viewPanelObj);
                me.itemView = viewPanelObj;
            }
            if (item.viewName) {
                require([item.viewName], function(viewPanel) {
                    var viewOpts = item.viewOpts;
                    if (!viewOpts) {
                        viewOpts = {};
                    }
                    viewOpts.eventTrigger = me.eventTrigger;
                    var viewPanelObj = new viewPanel(viewOpts);
                    me.insertView('.div.panel-body', viewPanelObj);
                    me.itemView = viewPanelObj;
                });
            }

            if (me.itemView) {
                me.itemView.on("closePanel", me._destroyPanel, me);
            }
        },

        // render: function () {
        //     fish.View.prototype.render.apply(this, arguments);
        // },

        _destroyPanel: function (itemView) {
            var me = this;

            me.trigger("closePanel", me);
        },

        execFunc: function (funcName) {
            var me = this;

            if (!me.itemView || !me.itemView[funcName]) {
                return;
            }
            var args = [];
            fish.each(arguments, function (arg, index) {
                if (index > 0) {
                    args.push(arg);
                }
            });
            return me.itemView[funcName].apply(itemView, args);
        },

        // 用于模板中进行替换的数据对象
        serialize: function() {
            var me = this,
                opts = me.options;

            opts.buttons = opts.data.buttons || me._buildButtons();

            return me.options;
        },

        //这里用来进行dom操作
        afterRender: function () {
            var me = this;

            me._initAccordionItem(me.options);
            me._initButtons();
        },

        changeTitle: function (newTitle) {
            var me = this;
            me.options.data.title = newTitle;
            me.$(".accordion-item-title").html(newTitle);
        },

        _buildButtons: function() {
            return [];
        },

        _initAccordionItem: function(accordionItem) {
            var me = this,
                data = accordionItem.data,
                accordionId = "#" + accordionItem.accordionid,
                accordionBodySelector = accordionId + " .panel-body",
                toggleLink = me.$("a[href=" + accordionId + "]");

            toggleLink.on("click", me._toggleAccordionArrow);

            if (data.afterRender) {
                data.afterRender.call(data.scope || me, me.$(accordionBodySelector));
            }

            if (data.expand == false) {
                toggleLink.click();
            }
        },

        _toggleAccordionArrow: function() {
            var arrow = $(this).parents(".panel-heading").find(".glyphicon");
            if (arrow.hasClass("glyphicon-triangle-bottom")) {
                arrow.removeClass("glyphicon-triangle-bottom");
                arrow.addClass("glyphicon-triangle-right");
            } else if (arrow.hasClass("glyphicon-triangle-right")) {
                arrow.removeClass("glyphicon-triangle-right");
                arrow.addClass("glyphicon-triangle-bottom");
            }
        },

        _initButtons: function () {
            var me = this,
                buttons = me.options.buttons,
                selectorPrefix = ".panel-heading .button.";

            fish.each(buttons, function (button) {
                var btnHandler = button.handler,
                    scope = button.scope;
                scope = scope ? scope : me;
                if (!btnHandler) {
                    return;
                }

                var $button = me.$(selectorPrefix + button.name);
                if (button.isDisabled) {
                    $button.addClass('button-disabled');
                }
                $button.off('click').on('click', function (e) {
                    e.stopPropagation();

                    if ($button.hasClass('button-disabled')) {
                        return;
                    }

                    if (button.handlerArgs) {
                        btnHandler.apply(scope, button.handlerArgs);
                    } else {
                        btnHandler.call(scope, e);
                    }
                });
            });

        }
    });
});