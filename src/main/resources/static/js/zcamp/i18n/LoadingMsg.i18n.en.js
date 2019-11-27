define({
    /**
     * 提取目前所有版本计划执行时的面包屑提示i18n信息
     * 暂不处理：docker/serviceListView 不处理,kurbernates 处理了一半，提取了等待状态没提取结果信息
     * ClusterOperUtil doClusterStateChangeWithProgress 待全局处理
     * */

    W_WAIT: "Please wait...",
    W_CLUSTER_INSTALL_MESSAGE: "Creating {0}",
    // === 导入非计划，首页不需面包屑提示 ===
    W_CLUSTER_IMPORT__MESSAGE: "Importing Application...",
    // === 导入非计划，首页不需面包屑提示 ===
    W_WAIT_APP_EXPAND_MESSAGE: "Doing expansion on {0}",
    W_WAIT_APP_UPGRADE_MESSAGE: "Upgrading application {0} to version {1}",
    W_WAIT_APP_SHINK_MESSAGE: "Shinking {0}",
    W_WAIT_APP_ROLLBACK_MESSAGE: "Rollback application {0} to version {1}",
    W_WAIT_BATCH_UPGRADE_MESSAGE: "Upgrading (total {0}) app cluster(s)",
    W_WAIT_CREATE_SERVICE_MESSAGE: "Creating service {0}",
    W_WAIT_CLUSTER_CONFIG_MESSAGE: "Configuration cluster {1} for {0}",
    W_WAIT_CLUSTER_CONFIG_UPDATE_MESSAGE: "Updating configuration for cluster {0} ",
    W_WAIT_SERVICE_FLEX_MESSAGE: "Flexing application {0}",
    W_WAIT_START_MESSAGE: "Starting {0}",
    W_WAIT_STOP_MESSAGE: "Stopping {0}",
    W_WAIT_FORCE_STOP_MESSAGE: "Force stopping{0}",
    W_WAIT_UNINSTALL_MESSAGE: "Uninstall {0}",
    W_WAIT_SERVICE_UPGRADE_SIMPLE_MESSAGE: "Upgrading service {0}",
    W_WAIT_SERVICE_UPGRADE_MESSAGE: "Upgrading service {0} to version {1}",


    R_SUCCESS_TITLE: "Operation Success",
    R_FAIL_TITLE: "Operation Fail",
    // === 导入非计划，首页不需面包屑提示 ===
    R_CLUSTER_IMPORT_SUCCESS_MESSAGE: "Application import completed!<br/>Please see the detail log to confirm the import result!",
    R_CLUSTER_IMPORT_FAILED_MESSAGE: "Application import failed!<br/>Please see the detail log to confirm the reason!",
    // === 导入非计划，首页不需面包屑提示 ===
    R_APP_EXPAND_SUCCESS_MESSAGE: "Application {0} expansion success!",
    R_APP_EXPAND_FAIL_MESSAGE: "Application {0} expansion failed!",
    R_APP_UPGRADE_SUCCESS_MESSAGE: "Application {0} upgrade success!",
    R_APP_UPGRADE_FAIL_MESSAGE: "Application {0} upgrade failed!",
    R_APP_SHINK_SUCCESS_MESSAGE: "Application {0}  shrink success!",
    R_APP_SHINK_FAIL_MESSAGE: "Application {0} shrink failed!",
    R_APP_ROLLBACK_SUCCESS_MESSAGE: "Application {0}  rollback success!",
    R_APP_ROLLBACK_FAIL_MESSAGE: "Application {0}  rollback failed!",
    R_APP_BATCH_UPGRADE_SUCCESS_MESSAGE: "Batch Upgrade Success!",
    R_APP_BATCH_UPGRADE_FAIL_MESSAGE: "Batch Upgrade Failed!",
    R_CLUSTER_CONFIG_SUCCESS_MESSAGE: "Application {0} config update success!",
    R_CLUSTER_CONFIG_FAIL_MESSAGE: "Application {0} config update failed!",
    R_CLUSTER_CONFIG_UPDATE_SUCCESS_MESSAGE: "Application {0}  upgrade success!",
    R_CLUSTER_CONFIG_UPDATE_FAIL_MESSAGE: "Application {0}  upgrade fail!",
    R_CLUSTER_INSTALL_SUCCESS_MESSAGE: "Cluster {0} install success!",
    R_CLUSTER_INSTALL_FAIL_MESSAGE: "Cluster {0} install failed!",
    R_START_SUCCESS_MESSAGE: "Start {0} success!",
    R_START_FAIL_MESSAGE: "Start {0} failed!",
    R_STOP_SUCCESS_MESSAGE: "Stop {0} success!",
    R_STOP_FAIL_MESSAGE: "Stop {0} failed!",
    R_FORCE_STOP_SUCCESS_MESSAGE: "Force stop {0} success!",
    R_FORCE_STOP_FAIL_MESSAGE: "Force stop {0} failed!",
    R_UNINSTALL_SUCCESS_MESSAGE: "Uninstall {0} success!",
    R_UNINSTALL_FAIL_MESSAGE: "Uninstall {0} failed!",
    R_SINGLE_START_SUCCESS_MESSAGE: "Node start {0} success!",
    R_SINGLE_START_FAIL_MESSAGE: "Node start {0} failed!",
    R_SINGLE_STOP_SUCCESS_MESSAGE: "Node start {0} success!",
    R_SINGLE_STOP_FAIL_MESSAGE: "Node start {0} failed!",
    R_SERVICE_UPGRADE_SUCCESS_MESSAGE: "Service {0} upgrade success!",
    R_SERVICE_UPGRADE_FAIL_MESSAGE: "Service {0} upgrade failed!"
});