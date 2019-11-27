define([
    'hbs!zcamp/component/toobar/templates/Toolbar.html',
    'zcamp/component/button/Button',
    'zcamp/component/button/DropDownButton',
    'css!zcamp/component/toobar/resource/toolbar.css'
], function (viewTpl, Button, DropDownButton) {

    return fish.View.extend({

        template: viewTpl,

        events: {
            "click .btn-addForm": "onAddFormBtnClick"
        },

        serialize: function () {
            var me = this,
                opts = me.options;

            opts.buttons = opts.buttons || me._buildButtons();
            if (opts.border) {
                if (opts.border == "none") {
                    opts.borderStyle = "border: none;";
                } else {
                    opts.borderStyle = opts.border;
                }
            } else {
                opts.borderStyle = "border-bottom-style: solid;"
            }
            if (opts.margin) {
                opts.marginStyle = opts.margin;
            } else {
                opts.marginStyle = "margin-top: -10px;"
            }
            if ("large" == opts.size) {
                opts.toolbarHeight = "height:41px;";
            } else if ("middle" == opts.size) {
                opts.toolbarHeight = "height:34px;";
            } else {
                // 默认就是小按钮
                opts.toolbarHeight = "height:31px;";
            }

            return opts;
        },

        initialize: function (params) {
            var me = this,
                opts = me.options;

            if (opts.buttons && opts.buttons.length > 0) {
                fish.each(opts.buttons, function(buttonOpt) {
                    me._buildButton(buttonOpt);
                });
            }
        },

        // render: function () {
        //     this.$el.html(this.template(this.serialize()));
        //     return this;
        // },

        _buildButton: function (buttonOpt) {
            var me = this,
                opts = me.options,
                btn;

            if ("large" == opts.size) {

            } else if ("middle" == opts.size) {
                buttonOpt.buttonSize = "middle";
            } else {
                // 默认就是小按钮
                buttonOpt.buttonSize = "small";
            }

            if (buttonOpt.type === 'dropDownButton') {
                btn = new DropDownButton(buttonOpt);
            } else {
                btn = new Button(buttonOpt);
            }

            me.insertView(".toolbarRootDiv", btn);
            // me.renderViews([btn]);
        },

        afterRender: function () {
            var me = this;

        },

        addButton: function (buttonOpt) {
            var me = this;

            me._buildButton(buttonOpt);
        },

        _buildButtons: function () {
            return [];
        },

        cleanup: function () {
            var me = this;
        }
    });
});