define([
    'hbs!zcamp/component/form/baseForm/templates/FormPanel.html',
    "zcamp/component/form/baseForm/FormConstants",
    "i18n!zcamp/component/form/baseForm/i18n/FormPanel.i18n",
    "zcamp/component/form/baseForm/Validation"
], function (viewTpl, FormConstants, i18nData) {

    return fish.View.extend({
        // false表示不会主动包裹一层div
        el: false,
        template: viewTpl,

        events: {
        },

        /**
        var testForm = new AttrFormPanel({
                defaults: {
                    width: 4,
                    labelWd: 4,
                    fieldWd: 8,
                    allowBlank: true
                },
                fieldList: [{
                    width: 4,
                    labelWd: 4,
                    fieldWd: 8,
                    allowBlank: true,
                    validType: "integer",
                    "inputType": "T",

                    labelText: "文本框",
                    name: "textField", // 通常为ID，表单取值时key：name，value：fieldValue
                    itemId: "TEXT_FIELD",
                    desc: "这是一个文本框"
                }, {
                    allowBlank: false,
                    "inputType": "P",

                    labelText: "密码框",
                    name: "pwdField",
                    itemId: "TUXEDO_DOMAIN",
                    desc: "这是一个密码框"
                }, {
                    allowBlank: false,
                    "inputType": "S",

                    labelText: "版本",
                    name: "combobox",
                    itemId: "TUXEDO_MIDDLEWARE_VERSION",
                    desc: "这是一个下拉框",
                    dataSource: [{
                        "value": "111130_64_Linux_01_x86",
                        "name": "111130_64_Linux_01_x86"
                    }, {
                        "value": "v2",
                        "name": "v2"
                    }],
                    value: "111130_64_Linux_01_x86"
                }, {
                    allowBlank: false,
                    "inputType": "M",

                    labelText: "版本",
                    name: "multiselect",
                    itemId: "BSS_FILEBEAT_VERSION",
                    desc: "这是一个多选下拉框",
                    dataSource: [{
                        "value": "filebeat-C-V1",
                        "name": "filebeat-C-V1"
                    }, {
                        "value": "filebeat-java-V1",
                        "name": "filebeat-java-V1"
                    }]
                },{
                    allowBlank: false,
                    "inputType": "I",

                    labelText: "JDK版本",
                    name: "dynamicCombo",
                    itemId: "JDK_VERSION",
                    desc: "这是一个动态数据源下拉框",
                    url: "/amattr/qryJdkVersion.do"
                }]
            });

         */
        // 用于模板中进行替换的数据对象
        initialize: function() {
            var me = this,
                opts = me.options;

            // 表单值缓存上下文（数据总线） key:name,value:value
            me.valueContext = {};
            // 表单项依赖关系name映射
            me.cascadeFieldNameMap = {};

            me._formatfieldList();

            me.itemViews = {};

        },

        afterRender: function () {
            var me = this,
                opts = me.options;

            var fieldList = opts.fieldList;
            fish.each(fieldList, function (field) {
                // 加载view
                var viewName = me._getFormConstants().FORM_FIELD_NAME[field.inputType];
                if (!viewName) {
                    return;
                }
                require([viewName], function (viewPanel) {
                    var viewPanelObj = new viewPanel(field);
                    // field依赖关系相关，当值改变则触发检查
                    viewPanelObj.on("change", me._onFieldChange, me);
                    // 这里需要做到统一加载view， 然后统一渲染
                    me.itemViews[field.name] = viewPanelObj;
                    me.insertView('.field.' + field.name, viewPanelObj);
                    me.renderViews([viewPanelObj]);
                });
            });
        },

        serialize: function() {
            var me = this;
            return {
                fieldList: me.options.fieldList
            };
        },

        // 对表单项进行格式化：应用表单默认选项、行属性排序、选项初始化、以及对表单值缓存进行初始化
        _formatfieldList: function () {
            var me = this,
                opts = me.options,
                defaults = opts.defaults ? opts.defaults : {},
                fieldList = opts.fieldList;

            // form中表单项默认属性，占据一行的属性计算时必须有表单默认label宽度值
            defaults = fish.extend({}, {
                width: 6,               // 整体宽度，1-12
                labelWd: 4,             // 标签宽度 (1-12)
                labelLen: undefined     // 标签内容长度, 超长会变成...
            }, defaults);
            me.options.defaults = defaults;

            // 对表单项进行排序，行属性置于末尾，并特殊处理行属性的label宽度等属性
            var formattedfieldList = [];
            var rowFieldList = [];
            fish.each(fieldList, function (field) {
                // 应用表单级默认值
                var fieldOpts = fish.extend({}, defaults, field);

                if (!fieldOpts.fieldWd) {
                    fieldOpts.fieldWd = 12 - fieldOpts.labelWd;
                }
                // 表单值缓存上下文：添加所有field的初始值
                me._initFormValueContextByDefaultValue(fieldOpts);
                // 添加一些表单相关的属性（目前用于依赖项）
                var fieldOpts = me._formatFieldOpts(fieldOpts);

                // 判断是否为行属性
                if (me._getFormConstants().ROW_FORM_TYPE[field.inputType]) {
                    fieldOpts = me._formatRowFieldOpts(fieldOpts, defaults);
                    rowFieldList.push(fieldOpts);
                } else {
                    formattedfieldList.push(fieldOpts);
                }
            });
            // 行属性置尾
            fish.each(rowFieldList, function (rowField) {
                formattedfieldList.push(rowField);
            });

            opts.fieldList = formattedfieldList;
        },

        // 表单值缓存上下文：添加所有field的初始值
        _initFormValueContextByDefaultValue: function (fieldOpts) {
            var me = this;
            me.valueContext[fieldOpts.name] = fieldOpts.value;
        },

        _formatRowFieldOpts: function (fieldOpts, defaults) {
            fieldOpts.width = 12;
            fieldOpts.labelWd = Math.ceil(defaults.labelWd / 12 * defaults.width);
            return fieldOpts;
        },

        _getFormConstants: function () {
            return FormConstants;
        },


        // ======================field依赖关系相关开始======================
        _formatFieldOpts: function (field) {
            var me = this;
            // 设置表单对象，便于依赖项处理
            field.ownerForm = me;
            return field;
        },

        _onFieldChange: function(field, oValue, nValue, isDefaultValue) {
            var me = this,
                fieldName = field.getFieldName(),
                cascadeFieldNameList = me.cascadeFieldNameMap[fieldName];

            // 默认值赋值时，既不改变表单值缓存上下文中值也不触发依赖值change处理;其他值改变才会进入代码片段
            if (!isDefaultValue) {
                // 改变表单值缓存上下文中值
                me.valueContext[fieldName] = nValue;
                // 触发依赖值change处理
                fish.each(cascadeFieldNameList, function (cascadeFieldName) {
                    var cascadeField = me.itemViews[cascadeFieldName];
                    cascadeField && cascadeField.onDependFieldChange(field, oValue, nValue);
                });
            }

            me.trigger("formValueChange");
        },

        // 依赖关系维护，在被依赖元素中添加记录其被哪些field所依赖
        addCascadeParentDepField: function (parentName, childName) {
            var me = this;
            if (!me.cascadeFieldNameMap[parentName]) {
                me.cascadeFieldNameMap[parentName] = [];
            }
            me.cascadeFieldNameMap[parentName].push(childName);
        },

        // 获取表单值缓存上下文中，某个field的值。未完全初始化时也可正确获得到默认值
        getFormFieldValue: function (fieldName) {
            var me = this;
            return me.valueContext[fieldName];
        },

        getFormFieldValueContext: function () {
            var me = this;
            return me.valueContext;
        },

        // ======================field依赖关系相关结束======================



        // name: item.itemId = attrCode
        getFieldView: function(name) {
            var me = this;
            return me.itemViews[name];
        },

        getValue: function() {
            var me = this;
            var formObj = {};
            fish.each(me.itemViews, function(view, id) {
                formObj[id] = view.getValue();
            });
            return formObj;
        },

        setValue: function(value) {
            var me = this;

            fish.each(me.itemViews, function(view, id) {
                view.setValue(value[id]);
            });
        },

        isValid: function(isHideMsg) {
            var me = this;

            var valid = true;
            // 表单级，一次性展示invalid状态
            me.$("form").isValid(isHideMsg);
            fish.each(me.itemViews, function(view, id) {
                valid = view.isValid(isHideMsg) && valid ;
            });
            me.$(".n-invalid").first().focus();
            return valid;
        },

        disable: function() {
            var me = this;
            // 表单级，一次性展示状态
            me.$(".form-horizontal").form("disable");
            fish.each(me.itemViews, function(view) {
                view.disable();
            });
        },
        enable: function() {
            var me = this;
            // 表单级，一次性展示状态
            me.$(".form-horizontal").form("enable");
            fish.each(me.itemViews, function(view) {
                view.enable();
            });
        },

        // view被移除时候调用
        cleanup: function() {
            var me = this;
            delete me.itemViews;
        }
    });
});
