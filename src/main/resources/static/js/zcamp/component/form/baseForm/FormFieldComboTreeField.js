define([
    'zcamp/component/form/baseForm/BaseFormFieldPanel',
    'hbs!zcamp/component/form/baseForm/templates/FormFieldComboField.html',
    "i18n!zcamp/component/form/baseForm/i18n/FormPanel.i18n"
], function (BaseFormFieldPanel, fieldTpl, i18n) {
    return BaseFormFieldPanel.extend({

        childTpl: fieldTpl,

        parentIdPrfix: "_parent:",

        afterRender: function() {
            var me = this,
                opts = me.options;

            BaseFormFieldPanel.prototype.afterRender.apply(me, arguments);
        },

        _initField: function () {
            var me = this;
            me.field = me.$("input");
            me.field.parent().addClass("zcampformitem-tooltip");

            me._initCombo();
        },

        /**
         * options = {
         *     dataSource: [],
         *     textFieldName: "displayName",
         *     valueFieldName: "actionName",
         *     fullPathFieldName: "fullClassName",
         *     separator: ".",
         *     rootPathName: "com.ztesoft.appmgr.web",
         *     searchFilter: true,
         *     dropdownWidth: 300,
         *
         *     // 通用属性
         *     width: attr.width,
         *     labelWd: attr.labelWd,
         *     fieldWd: attr.fieldWd || (12 - attr.labelWd),
         *     labelLen: attr.labelLen,
         *     allowBlank: allowBlank,
         *     validType: validType,
         *     reg: regExp,
         *     regText: i18nData.DEFAULT_REG_STR,

         *     labelText: labelText,
         *     name: name,
         *     value: "commonManualPauseAction",
         *     desc: attr.remarks,
         *     disable: attr.disable,
         *     visible: attr.visible
         * }
         * @private
         */
        _initCombo: function() {
            var me = this,
                opts = me.options;

            var nodeList = me.formatTreeNodes(opts.dataSource, opts.textFieldName, opts.valueFieldName, opts.fullPathFieldName,
                opts.separator, opts.rootPathName);

            var options = {
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                searchFilter: opts.searchFilter,
                fNodes: nodeList,
                dropdownWidth: opts.dropdownWidth,
                dataValueField: "value",
                placeholder: opts.placeholder || i18n.PLACE_HOLDER
            };

            me.field.combotree(options);

            me.field.on('combotree:change', function () {
                var value = me.field.combotree("value");
                if (value) {
                    value = value.value;
                }
                if (value && value.indexOf(me.parentIdPrfix) == 0) {
                    // 不允许选中父节点
                    me.field.combotree("clear");
                } else {
                    me.setValue(value, false, true);
                }
            });
        },

        formatTreeNodes: function (dataList, textFieldName, valueFieldName, fullPathFieldName, separator, rootPathName) {
            var me = this,
                nodeMap = {};

            fish.each(dataList, function (data) {
                var nodeId = data[fullPathFieldName];
                if (!nodeId) {
                    return;
                }

                if (rootPathName) {
                    var strList = nodeId.split(rootPathName + separator);
                    if (strList.length == 2) {
                        nodeId = strList[1];
                    } else {
                        return;
                    }
                }

                var node = {
                    name: me._getNodeName(data, textFieldName, fullPathFieldName, separator),
                    value: data[valueFieldName],
                    id: nodeId
                };

                me._buildTreeParent(node, separator, nodeMap);
                nodeMap[node.id] = node;
            });

            var nodeList = [];
            fish.each(nodeMap, function (node) {
                nodeList.push(node);
            });
            return nodeList;
        },

        _getNodeName: function (data, textFieldName, fullPathFieldName, separator) {
            var name;
            if (textFieldName) {
                name = data[textFieldName];
                return name;
            } else {
                name = data[fullPathFieldName];
                name = name.substr(name.lastIndexOf(separator) + 1);
                return name;
            }
        },

        _buildTreeParent: function (node, separator, nodeMap) {
            var me = this,
                nodeId = node.id;

            if (nodeId.lastIndexOf(separator) > 0) {
                var pId = nodeId.substr(0, nodeId.lastIndexOf(separator));
                var name = pId.substr(pId.lastIndexOf(separator) + 1);
                node.pId = pId;
                if (nodeMap[pId]) {
                    return;
                }
                var pNode = {
                    id: pId,
                    name: name,
                    value: me.parentIdPrfix + pId,
                    open: true
                };
                nodeMap[pId] = pNode;
                me._buildTreeParent(pNode, separator, nodeMap);
            }
        },

        getDisplayValue: function() {
            var me = this;
            var value = me.getValue(),
                displayValue;
            fish.each(opts.dataSource, function (data) {
                if (value == data.value) {
                    displayValue = data.name;
                }
            });
            return  displayValue || me.field.combobox("text");
        },

        setValue: function(value, isDefault, isInner) {
            var me = this,
                oValue = me.getValue();
            me.innerValue = value;
            me._doSetValue(value, isInner);

            me.onChange(oValue, value, isDefault);
        },

        _doSetValue: function (value, isInner) {
            var me = this;
            if (isInner) {
                return;
            }
            if (value) {
                me.field.combotree("value", value);
            } else {
                me.field.combotree("clear");
            }
        },

        disable: function() {
            var me = this;
            me.field.combotree("disable");
        },

        enable: function() {
            var me = this;
            me.field.combotree("enable");
        },

        cleanup: function(){
            var me = this;
            me.field.off("combotree:change");
            BaseFormFieldPanel.prototype.cleanup.apply(me, arguments);
        }
    });
});
