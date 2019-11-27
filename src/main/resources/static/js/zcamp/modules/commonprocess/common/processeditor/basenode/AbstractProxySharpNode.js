
define([
    'zcamp/modules/common/ZUtils'
], function (ZUtils) {

    return ZUtils.Class.create({

        // 取值范围(self/proxy), 定义此节点最终的渲染模型来源, self表示自身, proxy表示代理, 由getProxySharps计算得出
        sharpMode: "proxy",

        getProxySharps: function() {}
    });
});