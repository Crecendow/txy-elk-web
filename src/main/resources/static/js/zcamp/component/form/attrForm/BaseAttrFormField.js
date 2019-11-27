define([
    "i18n!zcamp/component/form/baseForm/i18n/FormPanel.i18n"
], function (i18nData) {

    return {
        getAttrCode: function () {
            var me = this;

            return me.options.attr && me.options.attr.attrCode;
        },

        _getDepItemName: function (depExpression) {
            var me = this,
                depExpArr = depExpression.split(':'),
                depItemCode = depExpArr[1];

            var depItemName = me.options.ownerForm.getAttrIdByAttrCode(depItemCode);
            return depItemName;
        },

        formatCommonFieldAttr: function(attr) {
            var allowBlank = true, validType, regExp, value;
            if (attr.nullable == "N") {
                allowBlank = false;
            }
            if (attr.validType) {
                if (attr.validType == 'integer') {
                    validType = 'pinteger';
                } else if (attr.validType.charAt(0) == "/") {
                    // 正则
                    regExp = attr.validType;
                } else {
                    validType = attr.validType;
                }
            }
            value =  attr.value;
            if (value === null || value === undefined) {
                value = attr.defaultValue;
            }
            var viewOpts = {
                width: attr.width, // 重构中。。。保障页面正常的临时属性
                inputType: attr.inputType,
                fieldWd: attr.fieldWd || (12 - attr.labelWd),
                labelLen: attr.labelLen,
                allowBlank: allowBlank,
                validType: validType,
                reg: regExp,
                regText: i18nData.DEFAULT_REG_STR,

                labelText: attr.attrName,
                name: attr.attrId,
                itemId: attr.attrCode,
                value: value,
                desc: attr.remarks,
                disable: attr.disable,
                visible: attr.visible,
                depExpression: attr.depExpression,
                attr: attr,

                ownerForm: attr.ownerForm
            };
            if (attr.labelWd == 0) {
                viewOpts.hideLabel = true;
            } else {
                viewOpts.labelWd = attr.labelWd;
            }
            return viewOpts;
        },
    };
});
