define([
    'zcamp/component/form/baseForm/FormFieldDynamicMultiSelectField',
    'zcamp/component/form/attrForm/BaseAttrFormField'
], function (FormFieldDynamicMultiSelectField, BaseAttrFormField) {

    return FormFieldDynamicMultiSelectField.extend(fish.extend({}, BaseAttrFormField, {

        // 传入attr对象，参数格式化
        initialize: function (attr) {
            var me = this;

            var viewOpts = me.formatCommonFieldAttr(attr);
            viewOpts.url = attr.comboUrl;
            me.options = viewOpts;
            FormFieldDynamicMultiSelectField.prototype.initialize.apply(me, viewOpts);
        }
    }));
});
