define([
    'zcamp/component/form/baseForm/FormFieldMultiSelectField',
    'hbs!zcamp/component/form/baseForm/templates/FormFieldMultiSelectField.html',
    'i18n!zcamp/component/form/baseForm/i18n/FormPanel.i18n',
    'zcamp/modules/common/ZUtils'
], function (FormFieldMultiSelectField, fieldTpl, i18n, ZUtils) {
    return FormFieldMultiSelectField.extend({

        childTpl: fieldTpl,

        initialize: function () {
            var me = this;
            me.isLoaded = false;
        },

        _initMultiSelect: function () {
            var me = this,
                opts = me.options;

            me.field.multiselect({
                placeholder: opts.placeholder || i18n.PLACE_HOLDER
            });
            me.field.on('multiselect:change', function () {
                var value = me._getMultiSelectValue();
                me.setValue(value, false, true);
            });
            this._doInitMultiSelect();
        },

        _doInitMultiSelect: function () {
            var me = this,
                opts = me.options,
                field = me.field;
            var selData = [], params = {};

            if (opts.ownerForm && opts.depExpression) {
                var depItemName = me._getDepItemName(opts.depExpression),
                    depParamName = me._getDepParamName(opts.depExpression),
                    depValue = opts.ownerForm.getFormFieldValue(depItemName);
                params[depParamName] = depValue;
            }

            params.attrCode = opts.code;

            ZUtils.Ajax.post({
                url: opts.url,
                data: params,
                valueback: function (list) {
                    fish.each(list, function (n, i) {
                        selData.push({
                            value: n.value,
                            name: n.valueMark
                        });
                    });
                    field.multiselect({
                        dataSource: selData
                    });
                    me.isLoaded = true;
                    if (opts.value) {
                        me.setValue(opts.value, true);
                    }
                }
            });
        },

        onDependFieldChange: function(field, oValue, nValue) {
            var me = this;

            me.isLoaded = false;
            me._doInitMultiSelect();
        },

        setValue: function(value, isDefault, isInner) {
            var me = this,
                oValue = me.getValue();

            me.innerValue = value;
            if (me.isLoaded) {
                me._doSetValue(value, isInner);
            } else {
                setTimeout(function () {
                    me.setValue.call(me, value, isInner)
                }, 100);
            }
            me.onChange(oValue, value, isDefault);
        },

        isLoaded: function () {
            return this.isLoaded;
        }
    });
});
