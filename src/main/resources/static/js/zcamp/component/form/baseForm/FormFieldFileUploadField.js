define([
    'zcamp/component/form/baseForm/BaseFormFieldPanel',
    'hbs!zcamp/component/form/baseForm/templates/FormFieldFileUploadField.html',
    'i18n!zcamp/i18n/Common.i18n',
    "i18n!zcamp/component/form/baseForm/i18n/FormPanel.i18n",
    'zcamp/modules/common/ZUtils',
    'https://fish.iwhalecloud.com/fish-desktop/dist/fish-desktop/third-party/fileupload/fish.fileupload.js',
    'css!https://fish.iwhalecloud.com/fish-desktop/dist/fish-desktop/third-party/fileupload/fileupload.css'
], function (BaseFormFieldPanel, fieldTpl, commoni18n, i18n, ZUtils) {
    return BaseFormFieldPanel.extend({

        childTpl: fieldTpl,

        i18nData: fish.extend({}, commoni18n, i18n),
        
        // 用于模板中进行替换的数据对象
        _doSerializeChild: function () {
            var me = this,
                opts = me.options,
                fileAccept = "";
            if (opts.validType) {
                fileAccept = opts.validType;
            }

            return {
                fileAccept: fileAccept
            };
        },

        afterRender: function() {
            var me = this,
                opts = me.options;

            BaseFormFieldPanel.prototype.afterRender.apply(me, arguments);
        },

        _initField: function () {
            var me = this;
            me.displayField = me.$(".disField");
            me.fileupload = me.$(".fileupload");

            me._initDisplayField();

            var config = me._buildUploadConfig();
            me.fileupload.fileupload(config);
        },

        _initDisplayField: function () {
            var me = this,
                opts = me.options;
            var inpuField = me.displayField;

            inpuField.clearinput();
            if (opts.value) {
                me.setValue(opts.value);
            }

            // 阻止手工输入
            inpuField.on("keydown", function(e){
                if (e.preventDefault) {
                    e.preventDefault();
                }
            });
            inpuField.on("keyup", function(e){
                if (e.preventDefault) {
                    e.preventDefault();
                }
            });

            ZUtils.on(inpuField, 'change', this, function (obj) {
                var value = $(obj).val();
                me._doWithTextChange(value);
            });
        },

        _doWithTextChange: function (value) {
            var me = this;
            var inputField = me.displayField;
            if (!value) {
                delete me.innerValue;
            }
        },

        _buildUploadConfig: function () {
            var me = this,
                opts = me.options;
            var inpuField = me.displayField;

            var config = {
                url: ZUtils.formatRequestUrl('/common/uploadFilesByFish.do?category=TEMP'),
                dataType: 'json',
                maxNumberOfFiles: 1,
                singleFileUploads: false,
                traditional: true,
                done: function (e, data) {
                    var result = data.result;
                    if (ZUtils.Ajax.isBizError(result)) {
                        ZUtils.Msg.showError(me.i18nData.R_FAIL_TITLE, "File upload failded!");
                    } else {
                        var successMsg = "",
                            savedFilePathes = "",
                            fileNames = "";
                        if (data.result && data.result.length > 0) {
                            $.each(data.result, function(index, file) {
                                var fileName = decodeURIComponent(file.name);
                                successMsg = successMsg + fileName + '   upload succeess, file.size:' + ZUtils.fileCount(file.size)  + '<br/>';
                                savedFilePathes = savedFilePathes + file.savedFilePath + ",";
                                // fileNames = fileNames + file.name + ",";
                            });
                            savedFilePathes = savedFilePathes.substr(0, savedFilePathes.length-1);
                            // fileNames = fileNames.substr(0, fileNames.length-1);
                            // inpuField.attr("defaultValue", savedFilePathes);
                            // inpuField.val(fileNames);
                            me.setValue(savedFilePathes);
                            ZUtils.Msg.showSuccess(me.i18nData.R_SUCCESS_TITLE, successMsg);
                        }
                    }
                },
                processalways: function(e, data) {
                    var index = data.index, file = data.files[index];
                    if (file.error && file.error === "File type not allowed") {
                        ZUtils.Msg.showError(me.i18nData.R_FAIL_TITLE,  me.i18nData.FILE_TPYE_MSG_ERROR + opts.validType + me.i18nData.FILE_TPYE_ERROR);
                    }
                },
                fail: function(e, data) {
                    ZUtils.Msg.showError(me.i18nData.R_FAIL_TITLE, "File upload failded!");
                }
            };

            if (opts.validType) {
                // /(\.|\/)(gif|jpe|jpeg|png)$/i
                var validType = opts.funcAttr.validType.replace(/,/g, "|").replace(/\./g, "");
                //需要转义
                validType = "/(\\.|\\/)(" + validType + ")$/i";
                config.acceptFileTypes = eval(validType);
            }
            return config;
        },

        _formatDisplayValueByValue: function (value) {
            var displayValue = value,
                filePathes = value.split(","),
                realNames = [];
            fish.each(filePathes, function (filePath, i) {
                if (filePath) {
                    var index,
                        index1 = filePath.lastIndexOf("\\"),
                        index2 = filePath.lastIndexOf("/");
                    index = index1 > index2 ? index1 : index2;
                    var fileName = filePath.substring(index + 1, filePath.length);
                    index = fileName.indexOf("_");
                    realNames.push(fileName.substring(index + 1, fileName.length));
                }
            });
            if (realNames && realNames.length > 0) {
                displayValue = realNames.join(",");
            }
            return displayValue;
        },

        formatValidHtml: function() {
            var me = this,
                opts = me.options,
                dataRule = "";

            if (!opts.allowBlank) {
                dataRule = "data-rule=" + opts.labelText + ":required"
            }

            return dataRule;
        },

        // getValue: function() {
        //     var me = this;
        //     return me.displayField.attr("defaultValue");
        // },

        getDisplayValue: function() {
            return me.displayField.val();
        },

        setValue: function(value, isDefault) {
            var me = this,
                oValue = me.getValue();

            me.innerValue = value;
            var displayValue = me._formatDisplayValueByValue(value);
            me.displayField.val(displayValue);

            me.onChange(oValue, value, isDefault);
        },

        isValid: function(isHideMsg) {
            var me = this;

            return me.displayField.isValid(isHideMsg);
        },

        disable: function() {
            var me = this;
            me.displayField.attr("disable", true);
            me.fileupload.fileupload("disable");
        },
        enable: function() {
            var me = this;
            me.displayField.removeAttr("disable");
            me.fileupload.fileupload("enable");
        },

        cleanup: function(){
            var me = this;
            var inpuField = me.displayField;

            delete me.displayField;
            delete me.fileupload;

            inpuField.off("keydown");
            inpuField.off("keyup");
            inpuField.off("change");
        }

    });
});
