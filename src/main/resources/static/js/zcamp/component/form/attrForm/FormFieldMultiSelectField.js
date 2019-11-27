define([
    'zcamp/component/form/baseForm/FormFieldMultiSelectField',
    'zcamp/component/form/attrForm/BaseAttrFormField'
], function (FormFieldMultiSelectField, BaseAttrFormField) {

    return FormFieldMultiSelectField.extend(fish.extend({}, BaseAttrFormField, {

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
            FormFieldMultiSelectField.prototype.initialize.apply(me, viewOpts);
        }
    }));
});
