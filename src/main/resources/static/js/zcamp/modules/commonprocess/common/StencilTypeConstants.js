define([
    'i18n!zcamp/modules/commonprocess/common/i18n/StencilTypeConstants.i18n'
], function(i18n) {

    var constants = {
        CpStartNodeTask: {
            name: '开始环节',
            "kind":"atomic"
        },
        CpEndNodeTask: {
            name: '结束环节',
            "kind":"atomic"
        },
        CpSimpleTask: {
            name: '简单环节',
            "kind":"atomic"
        },
        CpTestTask: {
            name: '测试环节',
            "kind":"atomic"
        },
        CpClusterTplTask: {
            name: '集群模板环节',
            kind: 'atomic'
        },
        CpAnsibleTplTask: {
            name: 'ANSIBLE环节',
            kind: 'atomic'
        },
        CpSshTplTask: {
            name: 'SSH环节',
            kind: 'atomic'
        },
        CpSqlTplTask: {
            name: 'SQL环节',
            kind: 'atomic'
        },
        CpSubProcessTask: {
            name: '子计划环节',
            kind: 'atomic'
        },
        CpParallelTask: {
            name: '并发环节',
            kind: 'container'
        },
        CpSerialTask: {
            name: '串行环节',
            kind: 'container'
        }
    };

    fish.each(constants, function(v, k) {
        v.name = i18n[k];
        v.stencilType = k;
    });

    return constants;
});