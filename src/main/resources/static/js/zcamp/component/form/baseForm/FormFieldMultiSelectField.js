define([
    'zcamp/component/form/baseForm/BaseFormFieldPanel',
    'hbs!zcamp/component/form/baseForm/templates/FormFieldMultiSelectField.html',
    'i18n!zcamp/component/form/baseForm/i18n/FormPanel.i18n'
], function (BaseFormFieldPanel, fieldTpl, i18n) {
    return BaseFormFieldPanel.extend({

        childTpl: fieldTpl,

        // 用于模板中进行替换的数据对象
        afterRender: function() {
            var me = this,
                opts = me.options;

            BaseFormFieldPanel.prototype.afterRender.apply(me, arguments);
        },

        _initField: function () {
            var me = this;
            me.field = me.$("select");
            me.field.parent().addClass("zcampformitem-tooltip");

            me._initMultiSelect();
        },

        _initMultiSelect: function () {
            var me = this,
                opts = me.options;
            me.field.multiselect({
                placeholder: opts.placeholder || i18n.PLACE_HOLDER,
                dataSource: opts.dataSource
            });

            me.field.on('multiselect:change', function () {
                var value = me._getMultiSelectValue();
                me.setValue(value, false, true);
            });
        },

        _getMultiSelectValue: function () {
            var me = this;
            var value = "";
            var valueList = me.field.multiselect("value");
            if (valueList && valueList.length > 0){
                value = valueList.join(',');
            }
            return value;
        },

        getDisplayValue: function() {
            var me = this,
                value = me.getValue(),
                displayValueArr = [];
            if (fish.isString(value)) {
                value = value.split(",");
            }
            fish.each(value, function (aValue) {
                fish.each(opts.dataSource, function (data) {
                    if (aValue == data.value) {
                        displayValueArr.push(data.name);
                    }
                });
            });
            var displayValue = "";
            if (displayValueArr && displayValueArr.length > 0){
                displayValue = displayValueArr.join(',');
            }
            return displayValue;
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
            if (fish.isString(value)) {
                value = value.split(",");
            }

            me.field.multiselect("value", value);
        },

        disable: function() {
            var me = this;
            me.field.multiselect("disable");
        },

        enable: function() {
            var me = this;
            me.field.multiselect("enable");
        },

        cleanup: function(){
            var me = this;
            me.field.off("multiselect:change");
            BaseFormFieldPanel.prototype.cleanup.apply(me, arguments);
        }

    });
});
