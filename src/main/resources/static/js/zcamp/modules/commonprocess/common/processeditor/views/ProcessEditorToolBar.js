define([
    'hbs!zcamp/modules/commonprocess/common/processeditor/templates/ProcessEditorToolBar.html',
    'i18n!zcamp/modules/commonprocess/common/processeditor/i18n/ProcessEditorToolBar.i18n',
    'i18n!zcamp/i18n/Common.i18n'
], function (viewTpl, i18n, commonI18n) {

    return fish.View.extend({
        //视图Dom元素，设为false,则直接采用模板内容作为Dom元素
        el: false,
        //模板函数
        template: viewTpl,

        i18nData: fish.extend({}, commonI18n, i18n),

        //提供模板数据
        serialize: function () {
            return this.i18nData;
        },
        
        //视图事件低定义
        events:{
            "click .btn-undo": "_onBtnUndoClick",
            "click .btn-redo": "_onBtnRedoClick",
            "click .btn-save": "_onBtnSaveClick",
            "click .btn-connect": "_onBtnConnectClick",
            "click .btn-init": "_onBtnInitClick",
            "click .btn-dragselect": "_onBtnDragSelectClick",
            "click .btn-gridline": "_onBtnGridLineClick",
            "click .btn-delselected": "_onBtnDelSelectedClick"
        },
        
        _onBtnUndoClick: function() {
            var me = this;
        
            me.trigger("btnUndoClick");
        },
        
        _onBtnRedoClick: function() {
            var me = this;
        
            me.trigger("btnRedoClick");
        },
        
        _onBtnPreviewClick: function() {
            var me = this;
        
            me.trigger("btnPreviewClick");
        },
        
        _onBtnSaveClick: function() {
            var me = this;
        
            me.trigger("btnSaveClick");
        },
        _onBtnConnectClick: function(e) {
            var me = this;
        
            me.trigger("btnConnectClick",e);
        },
        _onBtnInitClick: function() {
            var me = this;
        
            me.trigger("btnInitClick");
        },
        _onBtnDragSelectClick: function() {
            var me = this;
        
            me.trigger("btnDragSelectClick");
        },
        _onBtnGridLineClick: function() {
            var me = this;
        
            me.trigger("btnGridLineClick");
        },
        _onBtnDelSelectedClick: function() {
            var me = this;
        
            me.trigger("btnDelSelectedClick");
        },
        // 视图被删除时候做的事情
        cleanup: function () {
            var me = this;
        }

    })
});