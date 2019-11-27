define([
    'hbs!zcamp/modules/commonprocess/tplmgr/dialogs/templates/TplTaskContentEditorDialog.html',
    'i18n!zcamp/i18n/Common.i18n',
    'i18n!zcamp/modules/commonprocess/tplmgr/i18n/TplTaskParamMgr.i18n',
    'zcamp/modules/common/ZUtils',
    'https://fish.iwhalecloud.com/fish-desktop/dist/fish-desktop/third-party/codemirror/lib/codemirror.js'
], function (viewTpl, commonI18n, i18n, ZUtils, CodeMirror) {

    return fish.View.extend({
        el: false,

        template: viewTpl,

        // 多资源文件引入
        i18nData: fish.extend({}, i18n, commonI18n),

        events: {
            "click .js-code-edit": "doConfigUpdate",
            "click .js-code-confirm": "doConfigSave",
            "click .js-code-cancel": "doCancel"
        },

        initialize: function (options) {
            var me = this;

            me.opts = $.extend({}, options);
        },

        // 用于模板中进行替换的数据对象
        serialize: function () {
            return this.i18nData;
        },

        afterRender: function () {
            var me = this;

            CodeMirror.modeURL = "https://fish.iwhalecloud.com/fish-desktop/dist/fish-desktop/third-party/codemirror/mode/%N/%N.js";
            me._doInit();

            if (me.opts.dialogType != 'edit') {
                me.$('.operation-box').hide();
            }
        },

        _doInit: function () {
            var me = this,
                suffix = 'sh',
                mode = ZUtils.getCodeMirrorMode(suffix);

            me.editor = CodeMirror(me.$(".js-code-editor")[0], {
                value: me.opts.fileContent,
                mode: mode,
                readOnly: "nocursor",
                lineWrapping: true,
                lineNumbers: true
            });
            me.editor.setSize('auto', 'auto');
            me.$(".CodeMirror-lines").addClass("readOnly-bg");
        },

        doConfigUpdate: function() {
            var me = this;

            // 暂存一下用来取消回滚
            me.orFileContent = me.editor.getValue();

            me.editor.setOption("readOnly", false);
            me.$(".CodeMirror-lines").removeClass("readOnly-bg");

            me.$(".js-code-edit").hide();
            me.$(".js-code-confirm").show();
            me.$(".js-code-cancel").show();

        },

        doConfigSave: function() {
            var me = this,
                fileContent = me.editor.getValue(),
                confirmMsg = me.i18nData.CONFIRM_CONFIG_SAVE;

            fish.confirm(confirmMsg, function() {
                me.popup.close({
                    fileContent: fileContent
                });
            });
        },

        doCancel: function() {
            var me = this;

            me.toWatchMode();

            me.editor.setValue(me.orFileContent);
        },

        toWatchMode: function() {
            var me = this;

            me.editor.setOption("readOnly", "nocursor");
            me.$(".CodeMirror-lines").addClass("readOnly-bg");

            me.$(".js-code-confirm").hide();
            me.$(".js-code-cancel").hide();
            me.$(".js-code-edit").show();
        }

    });
});