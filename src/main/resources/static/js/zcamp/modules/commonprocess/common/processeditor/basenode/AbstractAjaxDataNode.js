/**
 * @class AbstractAjaxDataNode
 * 支持ajax数据加载方式实现异步渲染的节点基类, 所有需要通过ajax方式获取数据来影响到渲染的节点都可以从此类扩展
 */
define([
    'zcamp/modules/common/ZUtils'
], function (ZUtils) {

    return ZUtils.Class.create({

        // 数据来源方式(local/ajax), local表示本地数据, ajax表示后端数据, 由afterLoadData中确定
        dataLoadMode: "ajax",

        /**
         * ajax请求地址
         */
        ajaxUrl: "",

        /**
         * ajax请求参数, 若重写函数getAjaxParams, 此属性无效
         */
        ajaxParams: {},

        /**
         * 获取ajax请求参数, 默认使用属性ajaxParams
         */
        getAjaxParams: function() {
            return ajaxParams;
        },

        /**
         * 调用ajax请求, 获取请求数据
         * @param {Function} loadDataCallback 数据加载完成后的回调函数, 用于支持流程图的异步渲染
         */
        loadData: function(loadDataCallback) {
            var me = this;

            // return fish.Ajax.post({
            //     url: me.ajaxUrl,
            //     data: me.getAjaxParams()
            // }).then(function(data) {
            //     return me.afterLoadData(data, loadDataCallback);
            // });
        },

        /**
         * 在ajax数据请求成功后调用, 同时确定是否使用原始逻辑将当前节点添加进流程图
         * @param {Object} data ajaxUrl加载后的数据
         * @param {Function} loadDataCallback 数据加载完成后的回调函数, 用于支持流程图的异步渲染
         * 
         * @returns 默认为true, 表示当前节点使用原始渲染, 否则不渲染当前节点
         */
        afterLoadData: function(data, loadDataCallback) {
            return true;
        }
    });
});