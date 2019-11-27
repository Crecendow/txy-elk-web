define([
    'zcamp/component/form/baseForm/FormFieldFileUploadField',
    'zcamp/component/form/attrForm/BaseAttrFormField'
], function (FormFieldFileUploadField, BaseAttrFormField) {

    return FormFieldFileUploadField.extend(fish.extend({}, BaseAttrFormField, {

        // 传入attr对象，参数格式化
        initialize: function (attr) {
            var me = this;

            var opts = me.formatCommonFieldAttr(attr);
            me.options = opts;
            FormFieldFileUploadField.prototype.initialize.apply(me, opts);
        }
    }));
});
