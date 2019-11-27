define([
    'zcamp/component/form/baseForm/FormFieldComboField',
    'hbs!zcamp/component/form/baseForm/templates/FormFieldComboField.html',
    'i18n!zcamp/component/form/baseForm/i18n/FormPanel.i18n',
    'zcamp/modules/common/ZUtils'
], function (FormFieldComboField, fieldTpl, i18n, ZUtils) {
    return FormFieldComboField.extend({

        childTpl: fieldTpl,

        initialize: function () {
            var me = this;
            me.isLoaded = false;
        },
        
        _initCombo: function () {
            var me = this,
                opts = me.options;

            me.field.combobox({
                placeholder: opts.placeholder || i18n.PLACE_HOLDER
            });
            me.field.on('combobox:change', function () {
                me.setValue(me.field.combobox("value"), false, true);
            });
            this._doInitCombo();
        },

        _doInitCombo: function () {
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
                callback: function (list) {
                    fish.each(list, function (n, i) {
                        selData.push({
                            value: n.value,
                            name: n.valueMark
                        });
                    });
                    field.combobox({
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
            me._doInitCombo();
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
