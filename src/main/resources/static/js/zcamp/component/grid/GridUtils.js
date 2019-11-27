define([], function() {

    var processI18nColumns = function(columnI18ns, columns) {
        if (!columns || !columns.length || !columnI18ns || !columnI18ns.length) {
            return columns;
        }

        for (var i = 0; i < columns.length; i++) {
            var column = columns[i];
            
            column.label = columnI18ns[i];
        }

        return columns;
    }

    return {
        processI18nColumns: processI18nColumns
    };
});