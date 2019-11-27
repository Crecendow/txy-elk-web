define([
    'zcamp/component/form/baseForm/BaseFormFieldPanel',
    'hbs!zcamp/component/form/baseForm/templates/FormFieldComboField.html',
    "i18n!zcamp/component/form/baseForm/i18n/FormPanel.i18n"
], function (BaseFormFieldPanel, fieldTpl, i18n) {
    return BaseFormFieldPanel.extend({

        childTpl: fieldTpl,

        afterRender: function() {
            var me = this,
                opts = me.options;

            BaseFormFieldPanel.prototype.afterRender.apply(me, arguments);
        },

        _initField: function () {
            var me = this;
            me.field = me.$("input");
            me.field.parent().addClass("zcampformitem-tooltip");

            me._initCombo();
        },

        _initCombo: function() {
            var me = this,
                opts = me.options;
            me.field.combobox({
                placeholder: opts.placeholder || i18n.PLACE_HOLDER,
                dataSource: opts.dataSource
            });

            me.field.on('combobox:change', function () {
                me.setValue(me.field.combobox("value"), false, true);
            });
        },

        getDisplayValue: function() {
            var me = this;
            var value = me.getValue(),
                displayValue;
            fish.each(opts.dataSource, function (data) {
                if (value == data.value) {
                    displayValue = data.name;
                }
            });
            return  displayValue || me.field.combobox("text");
        },

        setValue: function(value, isDefault, isInner) {
            var me = this,
                oValue = me.getValue();
            me.innerValue = value;
            me._doSetValue(value, isInner);
            me.onChange(oValue, value, isDefault);
        },

        _doSetValue: function (value, isInner) {
            var me = this;
            if (isInner) {
                return;
            }
            if (value) {
                me.field.combobox("value", value);
            } else {
                me.field.combobox("clear");
            }
        },

        disable: function() {
            var me = this;
            me.field.combobox("disable");
        },

        enable: function() {
            var me = this;
            me.field.combobox("enable");
        },

        cleanup: function(){
            var me = this;
            me.field.off("combobox:change");
            BaseFormFieldPanel.prototype.cleanup.apply(me, arguments);
        }
    });
});
