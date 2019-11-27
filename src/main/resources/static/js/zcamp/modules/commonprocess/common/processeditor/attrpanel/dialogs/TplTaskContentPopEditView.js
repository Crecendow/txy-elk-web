define([
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/dialogs/TplTaskContentEditorDialog'
], function (TplTaskContentEditorDialog) {

    return function ($targetEl, initOptions) {

        this.options = fish.extend({}, initOptions);

        this.getValue = function () {
            return $targetEl.popedit('getValue');
        }

        this.setValue = function (name, value) {
            $targetEl.popedit('setValue', {
                name: name,
                value: value
            });
        }

        this.init = function () {
            this.$popWin = $targetEl.popedit({
                open: function () {
                    // 创建弹出编辑框
                    fish.popupView({
                        url: TplTaskContentEditorDialog,
                        width: 800,
                        height: 600,
                        viewOption: this.options,
                        close: function (closeData) {
                            // 关闭执行传入函数
                            this.$popWin.popedit("setValue", {
                                "value": closeData.fileContent,
                                "name": closeData.fileContent
                            });

                            $targetEl.trigger('valueChange', closeData.fileContent);

                            fish.extend(this.options, {
                                fileContent: closeData.fileContent
                            });
                        }.bind(this)
                    });
                }.bind(this)
            });

            return this;
        }.bind(this)();
    }
});