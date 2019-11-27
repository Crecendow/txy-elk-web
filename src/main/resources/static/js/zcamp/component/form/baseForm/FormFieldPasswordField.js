define([
    'zcamp/component/form/baseForm/BaseFormFieldPanel',
    'hbs!zcamp/component/form/baseForm/templates/FormFieldPasswordField.html'
], function (BaseFormFieldPanel, textFieldTpl) {
    return BaseFormFieldPanel.extend({

        childTpl: textFieldTpl,

        _initField: function () {
            var me = this;
            BaseFormFieldPanel.prototype._initField.apply(me, arguments);

            me.field.on('change', function () {
                me.setValue(me.field.val(), false, true);
            });
        },

        // 用于模板中进行替换的数据对象
        getDisplayValue: function() {
            return "******";
        },

        cleanup: function(){
            var me = this;
            me.field.off("change");
            BaseFormFieldPanel.prototype.cleanup.apply(me, arguments);
        }
        
    });
});
