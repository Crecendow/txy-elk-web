define([
    'hbs!zcamp/component/panel/templates/PortletPanel.html',
    'zcamp/component/button/DropDownButton',
    'zcamp/component/button/Button',
    'zcamp/modules/common/ZUtils'
], function(viewTpl, DropDownButton, Button, ZUtils) {
    
    return fish.View.extend({
        el: '#zcampBaseViewDiv',
        baseTpl: viewTpl,

        // 用于模板中进行替换的数据对象
        baseSerialize: function() {
            var me = this,
                opts = me.options;
            opts.footBtns = opts.footBtns || me._buildFootButtons();
            opts.buttons = opts.buttons || me._buildButtons();

            return fish.extend({
                noHeader: false
            }, this.options);
        },

        render: function(){
            var me = this,
                bodyViewDom = "";
            if (me.childTpl) {
                bodyViewDom = me.childTpl((me.childSerialize && me.childSerialize()) || {});
            }
            me.$el.html(me._doRenderBase(bodyViewDom));
            return this;
        },

        _doRenderBase: function(bodyViewDom){
            var me = this;
            return me.baseTpl(fish.extend({
                bodyViewDom: bodyViewDom
            }, me.baseSerialize()));
        },

        // 初始化参数, 在这里处理渲染之前的操作
        /**
         * 属性：
         * bodyView: 主页面，View实例化对象 -不建议优先使用
         * searchBarView: 搜索栏实例化对象
         * buttons: 按钮配置列表，非实例
         * footBtns: 下方按钮列表
         * bodyHeight: 指定内容高度（固定值,单位px）,将会出现滚动条
         * percentHeight: 整个panel百分比高度,将会出现滚动条
         * childTpl: 子类模板
         *
         * 子类可覆盖方法：
         * _buildButtons: 覆盖后返回按钮配置列表
         * _buildFootButtons: 覆盖后返回下方按钮列表
         * childSerialize: 子类序列化
         * childInitialize: 取代原本initialize
         * childAfterRender: 取代原本afterRender
         *
         * 注意：实现如initialize cleanup之类父类已有的fish view原有接口时，需手工调用父类方法：PortletPanel.prototype.【接口名】.apply(me, arguments);
         *
         * 方法：
         * doBlockUI
         * doUnblockUI
         **/
        initialize: function() {
            var me = this,
                opts = me.options;

            if (me.childInitialize) {
                me.childInitialize();
            }
            
            if (opts.bodyView) {
                me.setViews({
                    '.panel-content': opts.bodyView
                });

                me.bodyView = opts.bodyView;
            }

            if (opts.searchBarView) {
                me.setViews({
                    '.search-box': opts.searchBarView
                });

                me.searchBarView = opts.bodyView;
            }

            if (opts.buttons && opts.buttons.length > 0) {
                var btns = [], btn;

                fish.each(opts.buttons, function(buttonOpt) {
                    if (buttonOpt.type === 'dropDownButton') {
                        btn = new DropDownButton(buttonOpt);
                    } else {
                        btn = new Button(buttonOpt);
                    }
                    btns.push(btn);
                });

                me.setViews({
                    '.panel-body .left-box': btns
                });
            }

            if (opts.footBtns && opts.footBtns.length > 0) {
                var btns = [], btn;

                fish.each(opts.footBtns, function(buttonOpt) {
                    if (buttonOpt.type === 'buttongroup') {
                        btn = new DropDownButton(buttonOpt);
                    } else {
                        btn = new Button(buttonOpt);
                    }
                    btns.push(btn);
                });

                me.setViews({
                    '.panel-footer': btns
                });
            }

        },

        _buildButtons: function() {
            return [];
        },

        _buildFootButtons: function() {
            return null;
        },

        //这里用来进行dom操作
        afterRender: function () {
            var me = this,
                opts = me.options;
            
            if (opts.title) {
                me.setTitle(opts.title);
            }

            if (opts.styles && opts.styles.length > 0) {
                fish.each(opts.styles, function(styleObj) {
                    me.$el.css(styleObj.key, styleObj.val);
                })
            }

            if (me.childAfterRender) {
                me.childAfterRender();
            }

            me.resize();
        },

        replaceBodyView: function(viewName, viewOpts, callback){
            var me = this,
                opts = me.options;
            require([viewName], function(viewPanel) {
                var viewPanelObj = new viewPanel(viewOpts);
                me.setViews({
                    '.panel-content': viewPanelObj
                });
                if (callback) {
                    callback(viewPanelObj);
                }
                me.renderViews([viewPanelObj]);
                me.bodyView = viewPanelObj;

                me.resize();
            });
        },

        setTitle: function(title) {
            var me = this;
            me.$(".panel-title.portletPanelTitle").text(title);
        },

        _initScroll: function (height) {
            var me = this,
                opts = me.options;

            me.$(".panel-content").slimscroll({
                height: height ? height : 'auto',  	    //取其父元素高度作为滚动高度；默认为250px
                width: 'auto',	  	                    //取其父元素宽度作为滚动宽度；默认为'auto'
                axis: 'both',                           //'x'只有横向滚动轴；'y'只有纵向滚动轴；'both'横向、纵向都有；默认为'y'
                alwaysVisible: false,
                hideBarAfterInit: false
            });
        },

        appendToBody: function(el) {
            var me = this;

            me.$('.panel-content').append(el);
        },

        getButton: function(name) {
            var me = this;

            return me.getView(function(v) {
                if (v.options.name === name) {
                    return v;
                }
            });
        },

        getButtonByTag: function(tag) {
            var me = this;

            return me.getViews(function(v) {
                if (v.options.tag === tag) {
                    return v;
                }
            });
        },

        hideButton: function() {
            var me = this;
            
            for (var i = 0; i < arguments.length; i++) {
                var btnName = arguments[i],
                    btn = me.getButton(btnName);
                if (btn && btn.hide) {
                    btn.hide();
                }
            }
        },

        showButton: function() {
            var me = this;
            
            for (var i = 0; i < arguments.length; i++) {
                var btnName = arguments[i],
                    btn = me.getButton(btnName);
                if (btn && btn.show) {
                    btn.show();
                }
            }
        },
        
        doBlockUI: function (message) {
            var me = this;
            if (me.blockEl) {
                me.blockEl.find(".blockUI-content").text(message);
            } else {
                me.blockEl = ZUtils.Msg.block(me.$el, message);
            }
        },

        doUnblockUI: function () {
            var me = this;
            if (me.blockEl) {
                me.blockEl = null;
                ZUtils.Msg.unblock(me.$el);
            }
        },

        resize: function () {
            var me = this,
                opts = me.options;

            if (opts.bodyHeight) {
                me.$(".panel-content").height(opts.bodyHeight);
                me._initScroll(opts.bodyHeight);
            }

            if (opts.percentHeight) {
                var height = ZUtils.getTabHeight();
                height = height * opts.percentHeight / 100;
                me.$el.css("height", height + "px");
                me._initHeightAndScroll();
            }
        },

        _initHeightAndScroll: function() {
            var me = this,
                totalHeight = me.$el.outerHeight(),
                headerHeight = 0,
                buttonHeight = me.$(".operation-box").outerHeight(),
                footBtnsHeight = 20;

            if (!me.options.noHeader) {
                headerHeight = me.$(".panel-heading").outerHeight();
            }
            if (me.options.footBtns){
                footBtnsHeight = me.$(".panel-footer").outerHeight();
            }

            var height = totalHeight - headerHeight - buttonHeight - footBtnsHeight - 10;

            me.$(".panel-content").slimscroll({
                height: height ? height : 'auto',  	    //取其父元素高度作为滚动高度；默认为250px
                width: 'auto',	  	                    //取其父元素宽度作为滚动宽度；默认为'auto'
                axis: 'y',                              //'x'只有横向滚动轴；'y'只有纵向滚动轴；'both'横向、纵向都有；默认为'y'
                alwaysVisible: false,
                hideBarAfterInit: false
            });

        },

        // view被移除时候调用
        cleanup: function() {
            var me = this;

            delete me.bodyView;
        }
    });
});