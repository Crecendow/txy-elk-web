define(function() {

    $.ui.validator.addRule("age", "请输入正确的年龄！介于18~100之间.", function (element, param, field) {
        var val = element.value;
        try {
            if (parseInt(val) >= 18 && parseInt(val) <= 100)
                return true;
            return false;
        } catch (err) {
            return false;
        }
    });

    $.ui.validator.addRule("pinteger", "请输入正确的正整数！", function (element, param, field) {
        var val = element.value;
        try {
            if (/^[0-9]*[1-9][0-9]*$/.test(val))
                return true;
            return false;
        } catch (e) {
            return false;
        }
    });

    $.ui.validator.addRule("ip", "请输入正确的IP地址！", function(element, param, field) {
        var val = element.value;
        try {
            if ((/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(val)))
                return true;
            return false;
        } catch (e) {
            return false;
        }
    });

    $.ui.validator.addRule("phone", "请输入正确的电话号码，如:0920-29392929！", function(element, param, field) {
        var val = element.value;
        
        try {
            if (/^((0[1-9]{3})?(0[12][0-9])?[-])?\d{6,8}$/.test(val))
                return true;
            return false;
        } catch (e) {
            return false;
        }
    });

    $.ui.validator.addRule("mobilephone", "请输入正确的手机号码！", function(element, param, field) {
        var val = element.value;
        try {
            if (/(^0?[1][385][0-9]{9}$)/.test(val))
                return true;
            return false;
        } catch (e) {
            return false;
        }
    });

    $.ui.validator.addRule("notallnum", "不能全部为数字！", function(element, param, field) {
        var val = element.value;
        try {
            if (/^[0-9]*$/.test(val))
                return false;
            return true;
        } catch (e) {
            return false;
        }
    });

    $.ui.validator.addRule("port", "请输入正确的端口号，端口号范围为0-65535", function(element, param, field) {
        var val = element.value;
        try {
            if (/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(val)) {
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    });
});