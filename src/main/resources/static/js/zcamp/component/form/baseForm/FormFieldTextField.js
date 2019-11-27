define([
    'zcamp/component/form/baseForm/BaseFormFieldPanel',
    'hbs!zcamp/component/form/baseForm/templates/FormFieldTextField.html'
], function (BaseFormFieldPanel, fieldTpl) {
    
    return BaseFormFieldPanel.extend({

        childTpl: fieldTpl,

        // 用于模板中进行替换的数据对象
        afterRender: function() {
            var me = this;

            BaseFormFieldPanel.prototype.afterRender.apply(me, arguments);
        },

        _initField: function () {
            var me = this;
            BaseFormFieldPanel.prototype._initField.apply(me, arguments);

            me.field.clearinput();
            me.field.on('change', function () {
                me.setValue(me.field.val(), false, true);
            });
        },

        cleanup: function(){
            var me = this;
            me.field.off("change");
            BaseFormFieldPanel.prototype.cleanup.apply(me, arguments);
        }

    });
});
