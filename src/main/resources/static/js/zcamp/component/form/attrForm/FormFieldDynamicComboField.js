define([
    'zcamp/component/form/baseForm/FormFieldDynamicComboField',
    'zcamp/component/form/attrForm/BaseAttrFormField'
], function (FormFieldDynamicComboField, BaseAttrFormField) {

    return FormFieldDynamicComboField.extend(fish.extend({}, BaseAttrFormField, {

        // 传入attr对象，参数格式化
        initialize: function (attr) {
            var me = this;

            var viewOpts = me.formatCommonFieldAttr(attr);
            viewOpts.url = attr.comboUrl;
            me.options = viewOpts;
            FormFieldDynamicComboField.prototype.initialize.apply(me, viewOpts);
        }
    }));
});
