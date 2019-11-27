
define([
    'zcamp/modules/common/ZUtils'
], function (ZUtils) {

    return ZUtils.Class.create({

        attrPanelUrl: "",

        requireAttrPanel: function(parentCt, pnlSelector) {
            var me = this,
                attrPanelOptions = fish.extend({
                    ownerTask: me,
                    parentView: parentCt
                }, me.getAttrPanelOptions());

            // 右侧选择属性视图
            parentCt.requireView({
                url: me.attrPanelUrl,
                selector: pnlSelector,
                viewOption: attrPanelOptions,
                callback: function (viewInstance) {
                    me.initAttrPanelEvent(viewInstance);
                }
            });
        },

        getAttrPanelOptions: function() { },

        initAttrPanelEvent: function(attrPanel) { }
    });
});