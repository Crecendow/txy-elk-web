/**
 * Created by Administrator on 2018/6/26 0026.
 */
define([], function() {
    var formConstants = {
        ROW_FORM_TYPE: {
            "TA": true,
            "J": true
        },
        FORM_FIELD_NAME: {
            "T": "zcamp/component/form/baseForm/FormFieldTextField",                         // 文本框
            "P": "zcamp/component/form/baseForm/FormFieldPasswordField",                     // 密码框
            "S": "zcamp/component/form/baseForm/FormFieldComboField",                        // 下拉框
            "M": "zcamp/component/form/baseForm/FormFieldMultiSelectField",                  // 多选下拉框
            "TA": "zcamp/component/form/baseForm/FormFieldTextArea",                         // 多行文本框
            "I": "zcamp/component/form/baseForm/FormFieldDynamicComboField",                 // 动态数据源下拉框
            "DM": "zcamp/component/form/baseForm/FormFieldDynamicMultiSelectField",          // 动态数据源多选下拉框
            //"MACHINE_USER": "createMachineUserCombbox",                           // 主机用户下拉框
            "F": "zcamp/component/form/baseForm/FormFieldFileUploadField",                   // 文件上传框
            //"MF": "createFileuploadfield",                                        // 多文件上传框
            //"FILE_ANALYSIS": "createFileuploadfield",                             // 解析文件上传框
            //"J": "createConfigGrid",                                              // 配置文件
            //"COMBINE_ATTR": "createCombine",                                      // 组合属性
            //"D": "createDataField"                                                // 日期选择框
            "POP_VIEW": "zcamp/component/form/baseForm/FormFieldPopViewField",               // 弹窗
            "COMBO_TREE": "zcamp/component/form/baseForm/FormFieldComboTreeField"            // 树下拉框
        }
    };
    return formConstants;
});