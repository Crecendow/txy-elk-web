define([
    'zcamp/component/form/baseForm/BaseFormFieldPanel',
    'hbs!zcamp/component/form/baseForm/templates/FormFieldPopViewField.html',
    'i18n!zcamp/i18n/Common.i18n',
    "i18n!zcamp/component/form/baseForm/i18n/FormPanel.i18n",
    'zcamp/modules/common/ZUtils'
], function (BaseFormFieldPanel, fieldTpl, commoni18n, i18n, ZUtils) {

    return BaseFormFieldPanel.extend({

        childTpl: fieldTpl,

        i18nData: fish.extend({}, commoni18n, i18n),

        initialize: function () {
            var me = this;
        },

        afterRender: function() {
            var me = this;

            BaseFormFieldPanel.prototype.afterRender.apply(me, arguments);
        },

        _initField: function () {
            var me = this;
            me.displayField = me.$(".disField");
            me.btnPopView = me.$(".btnPopView");

            me._initDisplayField();
            me._initPopViewBtn();
        },

        _initDisplayField: function () {
            var me = this,
                opts = me.options;
            var inputField = me.displayField;

            inputField.clearinput();
            if (opts.value) {
                me.setValue(opts.value);
            }

            // 阻止手工输入
            inputField.on("keydown", function (e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }
            });
            inputField.on("keyup", function (e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }
            });

            ZUtils.on(inputField, 'change', this, function (obj) {
                var value = $(obj).val();
                me._doWithTextChange(value);
            });
        },

        _doWithTextChange: function (value) {
            var me = this;

            // 清空etxtfield意味着清空值
            if (!value) {
                delete me.innerValue;
            }
        },

        _initPopViewBtn: function() {
            var me = this,
                opts = me.options;

            ZUtils.on(me.btnPopView, 'click', this, me._onPopViewBtnClick);
        },

        _onPopViewBtnClick: function(obj) {
            var me = this,
                opt = me.options;
            var viewOptions = me._buildViewOptions();
            if (!viewOptions) {
                return;
            }
            var options = {
                url: ZUtils.formatResourceUrl(opt.url),
                viewOption: viewOptions,
                modal: true,
                width: "1000",
                height: '500',
                close: function (value) {
                    if (value) {
                        me.setValue(value);
                    }
                }
            };
            fish.popupView(options);
        },

        _buildViewOptions: function() {
            var me = this,
                opts = me.options;
            var viewOptions = {
                title: opts.labelText,
                value: me.getValue(),
                validType: opts.validType
            };
            if (opts.ownerForm && opts.depExpression) {
                var depItemName = me._getDepItemName(opts.depExpression),
                    depParamName = me._getDepParamName(opts.depExpression),
                    depValue = opts.ownerForm.getFormFieldValue(depItemName);
                viewOptions[depParamName] = depValue;
            }
            return viewOptions;
        },

        _formatDisplayValueByValue: function (value, callback) {
            var me = this,
                opt = me.options;
            var displayValue = value;
            callback(displayValue);
            var viewOptions = me._buildViewOptions();
            if (opt.ownerForm && opt.depExpression) {
                delete viewOptions.value;
            }
            if (!viewOptions) {
                return;
            }
            require([ZUtils.formatResourceUrl(opt.url)], function(viewPanel) {
                var viewPanelObj = new viewPanel(viewOptions);
                if (viewPanelObj.getDisplayValue) {
                    displayValue = viewPanelObj.getDisplayValue(value);
                    callback(displayValue);
                }
            });
        },

        formatValidHtml: function() {
            var me = this,
                opts = me.options,
                dataRule = "";

            if (!opts.allowBlank) {
                dataRule = "data-rule=" + opts.labelText + ":required"
            }

            return dataRule;
        },

        getValue: function() {
            var me = this;
            return me.innerValue;
        },

        getDisplayValue: function() {
            var me = this;
            return me.displayField.val();
        },

        setValue: function(value, isDefault) {
            var me = this,
                oValue = me.getValue();

            me.innerValue = value;
            me._formatDisplayValueByValue(value, function(displayVal) {
                me.displayField.val(displayVal)
            });

            me.onChange(oValue, value, isDefault);
        },

        isValid: function(isHideMsg) {
            var me = this;

            return me.displayField.isValid(isHideMsg);
        },

        disable: function() {
            var me = this;
            me.displayField.attr("disable", true);
            me.btnPopView.attr("disable", true);
        },
        enable: function() {
            var me = this;
            me.displayField.removeAttr("disable");
            me.btnPopView.removeAttr("disable");
        },

        cleanup: function(){
            var me = this;
            var inpuField = me.displayField,
                btnPopView = me.btnPopView;

            inpuField.off("keydown");
            inpuField.off("keyup");
            inpuField.off("change");
            btnPopView.off("click");

            delete me.displayField;
            delete me.btnPopView;
            delete me.innerValue;
        }

    });
});
