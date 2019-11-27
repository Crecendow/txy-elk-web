define([
    'zcamp/component/form/baseForm/FormFieldComboField',
    'zcamp/component/form/attrForm/BaseAttrFormField'
], function (FormFieldComboField, BaseAttrFormField) {

    return FormFieldComboField.extend(fish.extend({}, BaseAttrFormField, {

        // 传入attr对象，参数格式化
        initialize: function (attr) {
            var me = this;

            var viewOpts = me.formatCommonFieldAttr(attr);
            var selData = [];
            fish.each(attr.attrValueList, function(n, i) {
                selData.push({
                    value: n.value,
                    name: n.valueMark
                });
            });
            viewOpts.dataSource = selData;
            me.options = viewOpts;
            FormFieldComboField.prototype.initialize.apply(me, viewOpts);
        }
    }));
});
