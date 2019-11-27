define([
    'hbs!zcamp/component/form/baseForm/templates/BaseFormFieldPanel.html',
    'i18n!zcamp/component/form/baseForm/i18n/FormPanel.i18n',
    'zcamp/modules/common/ZUtils'
], function (viewTpl, i18nData, ZUtils) {

    return fish.View.extend({
        // false表示不会主动包裹一层div
        el: false,
        baseTpl: viewTpl,

        events: {
        },

        render: function() {
            var me = this;
            var childDom = me.childTpl(me.serialize(me.options));
            me.setElement(me._doRenderBase(childDom));
            return this;
        },

        _doRenderBase: function(childViewDom) {
            var me = this;
            return me.baseTpl(fish.extend({
                childViewDom: childViewDom
            }, me.serialize(me.options)));
        },

        // 用于模板中进行替换的数据对象
        serialize: function() {
            var me = this,
                opts = me.options;

            // 处理最大标签长度
            opts.labelTextDis = opts.labelLen ? ZUtils.ellipsisString(opts.labelText, opts.labelLen) : opts.labelText;
            // 处理校验
            opts.validHtmlAttr = me.formatValidHtml();

            // 计算是否依赖了别的属性，若依赖了则通知form表单
            if (opts.ownerForm && opts.depExpression) {
                // 暂时只支持一个参数
                var depItemName = me._getDepItemName(opts.depExpression);

                opts.ownerForm.addCascadeParentDepField(depItemName, opts.name);
            }

            // 内部值对象，初始化为存储默认值
            me.innerValue = opts.value;

            if (me._doSerializeChild) {
                var data = me._doSerializeChild();
                if (data) {
                    opts = fish.extend({}, opts, data);
                }
            }

            return opts;
        },

        _getDepItemName: function (depExpression) {


            var depExpArr = depExpression.split(':'),
                depItemName = depExpArr[1];
            return depItemName;
        },

        _getDepParamName: function (depExpression) {
            var depExpArr = depExpression.split(':'),
                depParamName = depExpArr[0];
            return depParamName;
        },

        afterRender: function() {
            var me = this,
                opts = me.options;

            me._initField();

            me.$('.zcampformitem-tooltip').tooltip({
                title: opts.desc,
                placement: 'top'
            });

            if (opts.disable) {
                me.disable();
            }

            if (opts.value) {
                me.setValue(opts.value, true);
            }

            // 存储attr以便和field建立关系
            me.attr = opts.attr;

            if (opts.visible === false) {
                me.$el.hide();
            }
        },

        _initField: function () {
            var me = this;
            me.field = me.$('input');
        },

        formatValidHtml: function() {
            var me = this,
                opts = me.options;

            var dataRules = [],
                domValildType = '',
                inputRequireCls = '';

            if (!opts.allowBlank) {
                dataRules.push(ZUtils.format('{0}:required', opts.labelText));
            }

            if (opts.validType) {
                dataRules.push(opts.validType);
            } else if (opts.reg) {
                opts.regText = opts.regText || i18nData.DEFAULT_REG_STR;
                opts.code = opts.itemId || opts.name;
                dataRules.push(opts.code + '_regExp');

                domValildType = ZUtils.format('data-rule-{0}_regExp="[{1}, \'{2}\']"', opts.code, opts.reg, opts.regText);
            }

            if (dataRules.length) {
                inputRequireCls = ZUtils.format('data-rule="{0}"', dataRules.join(";"));
            }

            return inputRequireCls + " " + domValildType;
        },

        /**
         * 通过模板文本创建el对象
         *
         * @param {String} htmlText 符合handlerbars规范的模板文本字符串
         * @param {Object} context 用来提供给handlerbars模板编译的上下文对象
         * @returns $()产生的jquery对象
         */
        $compile: function(htmlText, context) {
            return $(fish.compile(htmlText)(context));
        },

        /**
         * 当表单组件值发生变化时调用
         * @protected
         * @param {Object} oValue 旧值
         * @param {Object} nValue 新值
         */
        onChange: function(oValue, nValue, isDefault) {
            var me = this;

            me.trigger("change", me, oValue, nValue, isDefault);
        },

        getValue: function() {
            var me = this;

            return me.innerValue;
        },

        getDisplayValue: function(){
            var me = this;
            return me.getValue();
        },

        setValue: function(value, isDefault, isInner) {
            var me = this,
                oValue = me.getValue();
            me.innerValue = value;

            if (!isInner) {
                me.field.val(value);
            }
            me.onChange(oValue, value, isDefault);
        },

        // getCascadeFieldNameList: function() {
        //     return this.options.attr && this.options.attr.cascadeFieldItemIdList;
        // },
        //
        // getAttrCode: function() {
        //     var me = this;
        //
        //     return me.options.attr && me.options.attr.attrCode;
        // },

        getFieldName: function () {
            var me = this;
            return me.options.name;
        },

        onDependFieldChange: function(field, oValue, nValue) {},

        isValid: function(isHideMsg) {
            var me = this;

            return me.field.isValid(isHideMsg);
        },

        disable: function() {
            var me = this;
            me.field.attr("disabled", true);
        },
        enable: function() {
            var me = this;
            me.field.removeAttr("disabled");
        },

        // isLoaded: function () {
        //     return true;
        // },

        // view被移除时候调用
        cleanup: function() {
            var me = this;
            delete me.field;
        }
    });
});