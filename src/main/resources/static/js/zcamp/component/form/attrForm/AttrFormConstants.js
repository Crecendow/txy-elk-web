/**
 * Created by Administrator on 2018/6/26 0026.
 */
define([
    "zcamp/component/form/baseForm/FormConstants"
], function(FormConstants) {
    var attrFormConstants = {
        fieldFormatFunctionMap: {
            "T": "formatTextfieldAttr",                             // 文本框
            "P": "formatPasswordfieldAttr",                         // 密码框
            "S": "formatComboboxAttr",                              // 下拉框
            "M": "formatMultiSelectAttr",                           // 多选下拉框
            "TA": "formatTextAreaAttr",                             // 多行文本框
            "I": "formatDynamicDataSourceCombboxAttr",              // 动态数据源下拉框
            "DM": "formatDynamicMultiSelectCombboxAttr",            // 动态数据源多选下拉框
            //"MACHINE_USER": "formatMachineUserCombboxAttr",       // 主机用户下拉框
            "F": "formatFileuploadfieldAttr",                       // 文件上传框
            //"MF": "formatFileuploadfieldAttr",                    // 多文件上传框
            //"FILE_ANALYSIS": "formatFileuploadfieldAttr",         // 解析文件上传框
            //"J": "formatConfigGridAttr",                          // 配置文件
            //"COMBINE_ATTR": "formatCombineAttr",                  // 组合属性
            //"D": "formatDataFieldAttr"                            // 日期选择框
            "POP_VIEW": "formatPopViewAttr",                        // 弹窗
        },
        FORM_FIELD_NAME: {
            "T": "zcamp/component/form/attrForm/FormFieldTextField",                         // 文本框
            "P": "zcamp/component/form/attrForm/FormFieldPasswordField",                     // 密码框
            "S": "zcamp/component/form/attrForm/FormFieldComboField",                        // 下拉框
            "M": "zcamp/component/form/attrForm/FormFieldMultiSelectField",                  // 多选下拉框
            "TA": "zcamp/component/form/attrForm/FormFieldTextArea",                         // 多行文本框
            "I": "zcamp/component/form/attrForm/FormFieldDynamicComboField",                 // 动态数据源下拉框
            "DM": "zcamp/component/form/attrForm/FormFieldDynamicMultiSelectField",          // 动态数据源多选下拉框
            //"MACHINE_USER": "createMachineUserCombbox",                           // 主机用户下拉框
            "F": "zcamp/component/form/attrForm/FormFieldFileUploadField",                   // 文件上传框
            //"MF": "createFileuploadfield",                                        // 多文件上传框
            //"FILE_ANALYSIS": "createFileuploadfield",                             // 解析文件上传框
            //"J": "createConfigGrid",                                              // 配置文件
            //"COMBINE_ATTR": "createCombine",                                      // 组合属性
            //"D": "createDataField"                                                // 日期选择框
            "POP_VIEW": "zcamp/component/form/attrForm/FormFieldPopViewField",               // 弹窗
        }
    }
    return fish.extend({}, FormConstants, attrFormConstants);
});