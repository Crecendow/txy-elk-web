define([
    'zcamp/modules/commonprocess/common/processeditor/attrpanel/BaseCpTaskCommonAttr',
    'hbs!zcamp/modules/commonprocess/common/processeditor/attrpanel/templates/CpContainerTaskCommonAttr.html',
    'i18n!zcamp/modules/commonprocess/common/processeditor/i18n/ProcessEditorAttrPnl.i18n',
    'i18n!zcamp/i18n/Common.i18n'
], function (BaseCpTaskCommonAttr, viewTpl, i18n, commonI18n) {

    return fish.View.extend(fish.extend({}, BaseCpTaskCommonAttr, {
        el: false,

        template: viewTpl,

        i18nData: fish.extend({}, i18n, commonI18n),

        events: {
            'blur .js-task-name': 'onTaskDataChange',
            'blur .comments': 'onTaskDataChange'
        },

        serialize: function () {
            return this.i18nData;
        },

        initialize: function (params) {
            var me = this;

            me.tplTask = params.cpTplTask;
        },

        afterRender: function () {
            var me = this;

            me.$taskAction = me.$('.js-task-action');
            // me.$taskType = me.$('.js-task-type');
            me.$execType = me.$('.execType');

            // me._initTypeSelect();
            me._initExecTypeSelect();

            if (me.tplTask) {
                me.$('.tpl-task-form').form('value', me.tplTask);
            }
        },

        _initExecTypeSelect: function () {
            var me = this;

            me.initExecTypeSelect(me.$execType, function (result) {
                me.$execType.combobox({
                    change: me.onTaskDataChange.bind(me)
                });

                if (me.tplTask) {
                    me.$execType.combobox('value', me.tplTask.execType);
                }
            });
        },

        onTaskDataChange: function (e) {
            var me = this,
                formData = me.getTaskFormData();

            me.trigger('taskchange', formData);
        },

        getTaskFormData: function () {
            var me = this,
                formData = me.$('.tpl-task-form').form('value');
            if (me.tplTask) {
                formData = fish.extend({}, me.tplTask, formData);
            }

            me.calcValidState();

            return formData;
        },

        calcValidState: function() {
            var me = this,
                isValid = me.$('.tpl-task-form').isValid(true);

            me.validState = isValid;
        },

        focus: function () {
            var me = this;

            me.$('.js-task-name').focus();
        }
    }));
});