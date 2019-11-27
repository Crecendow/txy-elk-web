define([
    'zcamp/component/form/baseForm/FormPanel',
    "zcamp/component/form/attrForm/AttrFormConstants",
    "zcamp/component/form/utils/AttrFormUtils"
], function (FormPanel, AttrFormConstants, AttrFormUtils) {

    return FormPanel.extend({
        /**
        var testForm = new AttrFormPanel({
                defaults: {
                    width: 4,
                    labelWd: 4
                },
                items: [{
                    "entryId": null,
                    "attrId": 336,
                    "defaultValue": "hntuxhot",
                    "attrCode": "TUXEDO_PASSWORD",
                    "attrName": "中间件密码",
                    "nullable": "N",
                    "inputType": "P",
                    "attrValueList": null,
                    "validType": "alphanum",
                    "remarks": "Tuxedo密码",
                    "comboUrl": null,
                    "visible": true
                }, {
                    "entryId": null,
                    "attrId": 344,
                    "defaultValue": "tux136",
                    "attrCode": "TUXEDO_DOMAIN",
                    "attrName": "域",
                    "nullable": "N",
                    "inputType": "T",
                    "attrValueList": null,
                    "validType": "",
                    "remarks": "",
                    "comboUrl": null,
                    "visible": true
                }, {
                    "entryId": null,
                    "attrId": 334,
                    "defaultValue": "111130_64_Linux_01_x86",
                    "attrCode": "TUXEDO_MIDDLEWARE_VERSION",
                    "attrName": "中间件版本",
                    "nullable": "N",
                    "inputType": "S",
                    "attrValueList": [{
                        "attrId": 334,
                        "seq": 1,
                        "value": "111130_64_Linux_01_x86",
                        "valueMark": "111130_64_Linux_01_x86"
                    }, {
                        "attrId": 334,
                        "seq": 2,
                        "value": "v2",
                        "valueMark": "v2"
                    }],
                    "validType": "",
                    "remarks": "Tuxedo中间件版本",
                    "comboUrl": null,
                    "visible": true
                }, {
                    "entryId": null,
                    "attrId": 373,
                    "defaultValue": "filebeat-5.2.2-linux-x86_64",
                    "attrCode": "BSS_FILEBEAT_VERSION",
                    "attrName": "FileBeat版本",
                    "nullable": "N",
                    "inputType": "M",
                    "attrValueList": [{
                        "attrId": 373,
                        "seq": 1,
                        "value": "filebeat-C-V1",
                        "valueMark": "filebeat-C-V1"
                    }, {
                        "attrId": 373,
                        "seq": 2,
                        "value": "filebeat-java-V1",
                        "valueMark": "filebeat-java-V1"
                    }],
                    "validType": null,
                    "remarks": "BSS3.0FileBeat版本",
                    "comboUrl": null,
                    "visible": true
                },{
                    "entryId": null,
                    "attrId": 16,
                    "defaultValue": "1.7.0_80-x64",
                    "attrCode": "JDK_VERSION",
                    "attrName": "JDK版本号",
                    "nullable": "N",
                    "inputType": "I",
                    "attrValueList": null,
                    "validType": null,
                    "remarks": "版本号",
                    "comboUrl": "/amattr/qryJdkVersion.do",
                    "visible": true
                }],
                valueList: [{attrId:111,value:2222},{attrId:3333,value:444}]
            });


            event: formValueChange
         */
        initialize: function() {
            var me = this,
                opts = me.options;

            opts.fieldList = opts.items;
            me.attrCodeToNameMap = {};
            FormPanel.prototype.initialize.apply(me, arguments);
        },

        _getFormConstants: function () {
            return AttrFormConstants;
        },

        _formatFieldOpts: function (attr) {
            var me = this;
            me.attrCodeToNameMap[attr.attrCode] = attr.attrId;
            
            var fieldOpts = FormPanel.prototype._formatFieldOpts.apply(me, arguments);
            fieldOpts.name = attr.attrId;
            fieldOpts.itemId = attr.attrCode;

            return fieldOpts;
        },

        // 表单值缓存上下文：添加所有field的初始值
        _initFormValueContextByDefaultValue: function (attr) {
            var me = this;
            var value = me._getAttrValue(attr);
            me.valueContext[attr.attrId] = value;
            me.value = value;
        },

        _getAttrValue: function(attr) {
            var me = this,
                attrId = attr.attrId,
                valueList = me.options.valueList,
                value = null;
            fish.each(valueList, function(attrDto, i) {
                if (attrDto && attrDto.attrId == attrId) {
                    value = attrDto.value || attrDto.defaultValue;
                    return false;
                }
            });
            if (value === null) {
                value = attr.defaultValue;
            }
            return value;
        },

        getAttrIdByAttrCode: function (attrCode) {
            var me = this;
            return me.attrCodeToNameMap[attrCode];
        },

        getFormFieldValue: function (attrId) {
            var me = this;
            return this.valueContext[attrId];
        }
    });
});
