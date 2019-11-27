define([
    'hbs!zcamp/component/accordion/templates/Accordion.html',
    'zcamp/component/accordion/AccordionItem',
    'css!zcamp/component/accordion/resource/css/accordion.css'
], function(viewTpl, accordionItem) {
    var ACCOR_SEL_TPL = "#accordion-{0}-{1}";

    return fish.View.extend({
        el: false,
        template: viewTpl,

        initialize: function() {
            var me = this,
                optItems = this.options.items;

            me.accordionItems = {};

            fish.each(optItems, function(item, index) {
                me._addItem(true, item);
            });
        },
        
        // 用于模板中进行替换的数据对象
        serialize: function() {
            var me = this;

            return me.options;
        },

        //这里用来进行dom操作
        afterRender: function () {
            var me = this;

        },

        addItem: function(item) {
            var me = this;

            return me._addItem(false, item);
        },

        _addItem: function(isInit, item) {
            var me = this,
                accordionItemCfg = me._createAccordionItemCfg(item);

            var accordionItemView  = new accordionItem(accordionItemCfg);
            me.setView(accordionItemView, true);
            if(!isInit) {
                me.renderViews([accordionItemView]);
            }

            me.accordionItems[accordionItemView.accordionid] = accordionItemView;
            accordionItemView.on("closePanel", me._removeItem, accordionItemView);

            return accordionItemView.accordionid;
        },

        changeItemTitleByAccordionId: function (accordionid, newTitle) {
            var me = this;
            var accordionItem = me.accordionItems[accordionid];
            accordionItem.changeTitle(newTitle);
        },

        _removeItem: function (view) {
            view.remove();
        },

        execItemFunc: function (accordionid, funcName) {
            var me = this;
            var accordionItem = me.accordionItems[accordionid];
            if (!accordionItem) {
                return;
            }
            var args = [];
            fish.each(arguments, function (arg, index) {
                if (index > 0) {
                    args.push(arg);
                }
            });
            return accordionItem.execFunc.apply(accordionItem, args);
        },

        // view被移除时候调用
        cleanup: function() {},

        _createAccordionItemCfg: function(item, index) {
            return {
                data: item,
                // 用作accordion的唯一标识, 必须全页面唯一
                accordionid: item.accordionid || fish.getUUID()
            };
        }
    });
});