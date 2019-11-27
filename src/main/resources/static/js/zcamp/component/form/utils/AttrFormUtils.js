define([
    "zcamp/component/form/attrForm/AttrFormConstants",
    "i18n!zcamp/component/form/baseForm/i18n/FormPanel.i18n",
], function(AttrFormConstants, i18nData) {
    return {
        // _formatfieldList: function (items, defaults) {
        //     // form中表单项默认属性
        //     defaults = fish.extend({}, {
        //         width: 6,               // 整体宽度，1-12
        //         labelWd: 4,             // 标签宽度 (1-12)
        //         labelLen: undefined     // 标签内容长度, 超长会变成...
        //     }, defaults);
        //
        //     // 计算所有表单项label及field宽度属性，其中占据整行的行属性特殊处理
        //     var fieldList = [];
        //     var rowFieldList = [], attrCodeMap = {};
        //     fish.each(items, function (item) {
        //         var itemObj = fish.extend({}, defaults, item);
        //         itemObj.name = item.attrId;
        //         if (AttrFormConstants.ROW_FORM_ATTR[item.inputType]) {
        //             itemObj.width = 12;
        //             itemObj.labelWd = Math.ceil(defaults.labelWd / 12 * defaults.width);
        //             rowFieldList.push(itemObj);
        //         } else {
        //             fieldList.push(itemObj);
        //         }
        //
        //         attrCodeMap[item.attrCode] = itemObj;
        //     });
        //     // 行属性置尾
        //     fish.each(rowFieldList, function (rowField) {
        //         fieldList.push(rowField);
        //     });
        //
        //     // // 处理依赖
        //     // fish.each(fieldList, function(field) {
        //     //     if (field.depExpression) {
        //     //         // 暂时只支持一个参数
        //     //         var depExpArr = field.depExpression.split(':');
        //     //
        //     //         var depField = attrCodeMap[depExpArr[1]];
        //     //         if (depField) {
        //     //             // 被依赖field持有所有依赖它的field的name, 便于其在值变化时触发相关field刷新
        //     //             depField.cascadeFieldNameList = depField.cascadeFieldNameList || [];
        //     //
        //     //             depField.cascadeFieldNameList.push(field.name);
        //     //         }
        //     //     }
        //     // });
        //
        //     return fieldList;
        // },

        // _getAttrValue: function(valueList, attrId) {
        //     var value = null;
        //     fish.each(valueList, function(attr, i) {
        //         if (attr && attr.attrId == attrId) {
        //             value = attr.value || attr.defaultValue;
        //             return false;
        //         }
        //     });
        //     return value;
        // },

        // formatFieldOpt: function(attr, valueList){
        //     var me = this,
        //         viewOpts;
        //     var attrFormatFunc = me[AttrFormConstants.fieldFormatFunctionMap[attr.inputType]];
        //     if (attrFormatFunc && fish.isFunction(attrFormatFunc)) {
        //         viewOpts = attrFormatFunc.call(me, attr, valueList);
        //     }
        //     return viewOpts;
        // },


        // 广泛使用
        createAttrFormField: function (attr, value, depValueMap, callback) {
            var me = this;
            attr.value = value;

            // var viewOpts = me.formatFieldOpt(attr, valueList);
            if (depValueMap) {
                var virtualForm = {
                    valueContext: depValueMap,
                    getFormFieldValueContext: function () {
                        return this.valueContext;
                    },
                    getFormFieldValue: function (key) {
                        return this.valueContext[key];
                    },
                    addCascadeParentDepField: function () {

                    }
                };
                attr.ownerForm = virtualForm;
            }

            require([AttrFormConstants.FORM_FIELD_NAME[attr.inputType]], function (viewPanel) {
                var viewPanelObj = new viewPanel(attr);
                callback(viewPanelObj);
            });

        },
    //     // ====================AttrFormField->NormalFormFild==================== \\
    //     formatCommonFieldAttr: function(attr, valueList) {
    //         var me = this;
    //         var allowBlank = true, validType, regExp, value;
    //         if (attr.nullable == "N") {
    //             allowBlank = false;
    //         }
    //         if (attr.validType) {
    //             if (attr.validType == 'integer') {
    //                 validType = 'pinteger';
    //             } else if (attr.validType.charAt(0) == "/") {
    //                 // 正则
    //                 regExp = attr.validType;
    //             } else {
    //                 validType = attr.validType;
    //             }
    //         }
    //         value =  me._getAttrValue(valueList, attr.attrId);
    //         if (value === null) {
    //             value = attr.defaultValue;
    //         }
    //         var viewOpts = {
    //             //labelWd: attr.labelWd,
    //             width: attr.width, // 重构中。。。保障页面正常的临时属性
    //             inputType: attr.inputType,
    //             fieldWd: attr.fieldWd || (12 - attr.labelWd),
    //             labelLen: attr.labelLen,
    //             allowBlank: allowBlank,
    //             validType: validType,
    //             reg: regExp,
    //             regText: i18nData.DEFAULT_REG_STR,
    //
    //             labelText: attr.attrName,
    //             name: attr.attrId,
    //             itemId: attr.attrCode,
    //             //code: attr.attrCode,
    //             value: value,
    //             desc: attr.remarks,
    //             disable: attr.disable,
    //             visible: attr.visible,
    //             depExpression: attr.depExpression,
    //             attr: attr
    //         };
    //         if (attr.labelWd == 0) {
    //             viewOpts.hideLabel = true;
    //         } else {
    //             viewOpts.labelWd = attr.labelWd;
    //         }
    //         return viewOpts;
    //     },
    //
    //     formatTextfieldAttr: function(attr, valueList) {
    //         var me = this;
    //         return me.formatCommonFieldAttr(attr, valueList);
    //     },
    //
    //     formatPasswordfieldAttr: function(attr, valueList) {
    //         var me = this;
    //         return me.formatCommonFieldAttr(attr, valueList);
    //     },
    //
    //     formatComboboxAttr: function(attr, valueList) {
    //         var me = this;
    //         var viewOpts = me.formatCommonFieldAttr(attr, valueList);
    //         var selData = [];
    //         fish.each(attr.attrValueList, function(n, i) {
    //             selData.push({
    //                 value: n.value,
    //                 name: n.valueMark
    //             });
    //         });
    //         viewOpts.dataSource = selData;
    //         return viewOpts;
    //     },
    //
    //     formatMultiSelectAttr: function(attr, valueList) {
    //         var me = this;
    //         var viewOpts = me.formatCommonFieldAttr(attr, valueList);
    //         var selData = [];
    //         fish.each(attr.attrValueList, function(n, i) {
    //             selData.push({
    //                 value: n.value,
    //                 name: n.valueMark
    //             });
    //         });
    //         viewOpts.dataSource = selData;
    //         return viewOpts;
    //     },
    //
    //     formatDynamicDataSourceCombboxAttr: function(attr, valueList) {
    //         var me = this;
    //         var viewOpts = me.formatCommonFieldAttr(attr, valueList);
    //         viewOpts.url = attr.comboUrl;
    //         return viewOpts;
    //     },
    //
    //     formatDynamicMultiSelectCombboxAttr: function(attr, valueList) {
    //         var me = this;
    //         var viewOpts = me.formatCommonFieldAttr(attr, valueList);
    //         viewOpts.url = attr.comboUrl;
    //         return viewOpts;
    //     },
    //
    //     formatFileuploadfieldAttr: function(attr, valueList) {
    //         var me = this;
    //         var viewOpts = me.formatCommonFieldAttr(attr, valueList);
    //         return viewOpts;
    //     },
    //
    //     formatPopViewAttr: function(attr) {
    //         var me = this;
    //         var viewOpts = me.formatCommonFieldAttr(attr);
    //         viewOpts.url = attr.comboUrl;
    //         return viewOpts;
    //     },
    //
    //     formatTextAreaAttr: function(attr, valueList) {
    //         var me = this;
    //         var viewOpts = me.formatCommonFieldAttr(attr, valueList);
    //         viewOpts.url = attr.comboUrl;
    //         return viewOpts;
    //     }
    //     // ====================AttrFormField->NormalFormFild==================== \\
    }
});