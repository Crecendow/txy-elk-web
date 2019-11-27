define({
    /**
     * 提取目前所有版本计划执行时的面包屑提示i18n信息
     * 暂不处理：docker/serviceListView 不处理,kurbernates 处理了一半，提取了等待状态没提取结果信息
     * ClusterOperUtil doClusterStateChangeWithProgress doClusterNodeStateChangeWithProgress待全局处理
     * */

    W_WAIT: "请稍等...",
    W_CLUSTER_INSTALL_MESSAGE: "正在创建{0}",
    // === 导入非计划，首页不需面包屑提示 ===
    W_CLUSTER_IMPORT__MESSAGE: "正在导入应用...",
    // === 导入非计划，首页不需面包屑提示 ===
    W_WAIT_APP_EXPAND_MESSAGE: "正在对应用{0}做扩容操作",
    W_WAIT_APP_UPGRADE_MESSAGE: "正在升级应用{0}到版本{1}",
    W_WAIT_APP_SHINK_MESSAGE: "正在对应用{0}做缩容操作",
    W_WAIT_APP_ROLLBACK_MESSAGE: "正在回退应用{0}到版本{1}",
    W_WAIT_BATCH_UPGRADE_MESSAGE: "正在批量升级(共{0})个应用集群",
    W_WAIT_CREATE_SERVICE_MESSAGE: "正在创建服务{0}",
    W_WAIT_CLUSTER_CONFIG_MESSAGE: "正在对应用{0}配置{1}",
    W_WAIT_CLUSTER_CONFIG_UPDATE_MESSAGE: "正在对应用{0}执行配置更新",
    W_WAIT_SERVICE_FLEX_MESSAGE: "正在伸缩应用{0}",
    W_WAIT_START_MESSAGE: "正在启动{0}",
    W_WAIT_STOP_MESSAGE: "正在停止{0}",
    W_WAIT_FORCE_STOP_MESSAGE: "正在强制停止{0}",
    W_WAIT_UNINSTALL_MESSAGE: "正在卸载{0}",
    W_WAIT_SERVICE_UPGRADE_SIMPLE_MESSAGE: "正在升级应用{0}",
    W_WAIT_SERVICE_UPGRADE_MESSAGE: "正在升级应用{0}到版本{1}",

    R_SUCCESS_TITLE: "操作成功",
    R_FAIL_TITLE: "操作失败",
    // === 导入非计划，首页不需面包屑提示 ===
    R_CLUSTER_IMPORT_SUCCESS_MESSAGE: "应用导入完毕！<br/>请查看导入详情确认导入结果！",
    R_CLUSTER_IMPORT_FAILED_MESSAGE: "应用导入失败！<br/>请查看日志确认失败原因！",
    // === 导入非计划，首页不需面包屑提示 ===
    R_APP_EXPAND_SUCCESS_MESSAGE: "应用{0}扩容成功！",
    R_APP_EXPAND_FAIL_MESSAGE: "应用{0}扩容失败！",
    R_APP_UPGRADE_SUCCESS_MESSAGE: "应用{0}升级成功！",
    R_APP_UPGRADE_FAIL_MESSAGE: "应用{0}升级失败！",
    R_APP_SHINK_SUCCESS_MESSAGE: "应用{0}缩容成功！",
    R_APP_SHINK_FAIL_MESSAGE: "应用{0}缩容失败！",
    R_APP_ROLLBACK_SUCCESS_MESSAGE: "应用{0}回退成功！",
    R_APP_ROLLBACK_FAIL_MESSAGE: "应用{0}回退失败！",
    R_APP_BATCH_UPGRADE_SUCCESS_MESSAGE: "批量升级成功！",
    R_APP_BATCH_UPGRADE_FAIL_MESSAGE: "批量升级失败！",
    R_CLUSTER_CONFIG_SUCCESS_MESSAGE: "应用{0}配置更新成功！",
    R_CLUSTER_CONFIG_FAIL_MESSAGE: "应用{0}配置更新失败！",
    R_CLUSTER_CONFIG_UPDATE_SUCCESS_MESSAGE: "应用{0}升级成功！",
    R_CLUSTER_CONFIG_UPDATE_FAIL_MESSAGE: "应用{0}升级失败！",
    R_CLUSTER_INSTALL_SUCCESS_MESSAGE: "集群{0}安装成功！",
    R_CLUSTER_INSTALL_FAIL_MESSAGE: "集群{0}安装失败！",
    R_START_SUCCESS_MESSAGE: "启动{0}成功！",
    R_START_FAIL_MESSAGE: "启动{0}失败！",
    R_STOP_SUCCESS_MESSAGE: "停止{0}成功！",
    R_STOP_FAIL_MESSAGE: "停止{0}失败！",
    R_FORCE_STOP_SUCCESS_MESSAGE: "强制停止{0}成功！",
    R_FORCE_STOP_FAIL_MESSAGE: "强制停止{0}失败！",
    R_UNINSTALL_SUCCESS_MESSAGE: "卸载{0}成功！",
    R_UNINSTALL_FAIL_MESSAGE: "卸载{0}失败！",
    R_SINGLE_START_SUCCESS_MESSAGE: "节点启动{0}成功！",
    R_SINGLE_START_FAIL_MESSAGE: "节点启动{0}失败！",
    R_SINGLE_STOP_SUCCESS_MESSAGE: "节点停止{0}成功！",
    R_SINGLE_STOP_FAIL_MESSAGE: "节点停止{0}失败！",
    R_SERVICE_UPGRADE_SUCCESS_MESSAGE: "服务{0}升级成功！",
    R_SERVICE_UPGRADE_FAIL_MESSAGE: "服务{0}升级失败！"
});