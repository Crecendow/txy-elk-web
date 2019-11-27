define([
    'i18n!zcamp/modules/commonprocess/tplmgr/common/i18n/TplMgrConstants.i18n'
], function(i18n) {

    var constants = {
        TASK_PATTERN_ANSIBLE: 'ANSIBLE',
        TASK_PATTERN_SQL: 'SQL',
        TASK_PATTERN_SSH: 'SSH',
        TASK_PATTERN_TELNET: 'TELNET',
        TASK_PATTERN_DEFAULT: 'CUSTOM',

        TASK_ACTION_ANSIBLE: 'jobPlanAnsibleAction',
        TASK_ACTION_SQL: 'jobPlanSqlAction',
        TASK_ACTION_SSH: 'jobPlanSshAction',

        TASK_PARAM_POSITION_IN: 'I',
        TASK_PARAM_POSITION_OUT: 'O',
        TASK_PARAM_TYPE_VALUE: 'VALUE',
        TASK_PARAM_TYPE_REF: 'REF',
        TASK_PARAM_TYPE_BUILDIN: 'BUILDIN',

        BUILD_IN_PARAM_CONTENT: 'BUILD_IN_PARAM_CONTENT',
        BUILD_IN_PARAM_FILE: 'BUILD_IN_PARAM_FILE',
        BUILD_IN_PARAM_DS: 'BUILD_IN_PARAM_DS',
        BUILD_IN_PARAM_TRANSTYPE: 'BUILD_IN_PARAM_TRANSTYPE',
        BUILD_IN_PARAM_EXECTYPE: 'BUILD_IN_PARAM_EXECTYPE',
        BUILD_IN_PARAM_FILTERDDL: 'BUILD_IN_PARAM_FILTERDDL',
        BUILD_IN_PARAM_ONERROR: 'BUILD_IN_PARAM_ONERROR',
        BUILD_IN_PARAM_SEQ: 0
    };

    return fish.extend(constants, i18n);
});