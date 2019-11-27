define([
    'hbs!zcamp/component/panel/templates/CardPanel.html',
    'zcamp/component/panel/CardItem'
], function (viewTpl, CardItemView) {

    return fish.View.extend({
        //el: false,
        template: viewTpl,

        // 初始化默认配置
        _initDefaultConfig: function() {
            var me = this;

            me.cardConfig = {
                colWidth: 3,
                rowList: [12, 24, 36]
            };

        },

        /* 不支持分页!
         var options = {
             // 可选：分页时获取数据的配置
             ajaxCfg: {
                 ajaxFunc: xxAction.qryXXList, // action函数的第一个参数为js object，含有所有查询条件组成的参数对象，第二个为回调函数 eg: qrySystemParamPageList: function (param, callbackFunction) {...}
                 data: qryXXCondFunc, // 获取ajaxFunc所需参数值，即动态获取查询条件的值对象的方法  eg: getQryConditions: function() {return this.form.getValue();}
                 scope: me, // 使用grid的view的this，必填，否则影响data方法获取查询条件
                 // 可选：处理页面返回值，默认不配置将会直接返回
                 formatter: function (resultList) { return resultList;}
             },
             columns: [{
                 name: 'modifyDate',// 必选，数据字段名
                 dataType: 'TITLE',
                 imageUrl: '',
                 imageUrlFormatter: function(cellval, rwdat) {
                 },
                 formatter: function(cellval, rwdat) {
                     return "";
                 },
                 subTitle:[{
                    name: '',
                    formatter: function(cellval, rwdat) {
                        return "";
                    }
                 }]
             }, {
                dataType: 'SEP'
             }, {
                dataType: 'ROW',
                name: '',
                label: me.i18nData.MODIFY_DATE,
                formatter: function(cellval, rwdat) {
                    return "";
                }
             }, {
                 dataType: 'BTNS', // 此类型唯一
                 dataList: [{
                    name: '',
                    formatter: function(cellval, rwdat) {
                        return ""
                    }
                 }],
                 // 以下按钮配置二选一
                 btns: [{
                     name: "playbookDetail",
                     text: me.i18nData.COMMON_SHOW_DETAIL,
                     scope: me, //必填， 参考ajaxCfg.scope
                     handler: me.playbookDetail
                 }],
                 dynamicBtns: function(cellval, rwdat) { // 动态按钮，为函数，参数列表同formatter，根据条件不同返回不同按钮列表
                     return [{
                         name: "playbookDetail",
                         text: me.i18nData.COMMON_SHOW_DETAIL,
                         scope: me, //必填， 参考ajaxCfg.scope
                         handler: me.playbookDetail
                     }];
                 }
             }],
             cardConfig: {
                 colWidth: 3, // 卡片宽度，默认为3
                 rowList: [12, 24, 68, 48, 96] // 分页时，每页数量列表
             }
             // 不分页的配置: 不配ajaxCfg 使用loadData来加载数据
         };*/
        afterRender: function() {
            var me = this;

            me._initDefaultConfig();
            me.cardConfig = me._buildGridConfig();

            if (me.options.ajaxCfg) {
                me._initPagination(0, 1); // 初始化分页组件
                me.getPageData = me._buildGetPageDataFunc(me.options.ajaxCfg);
                me.getPageData(1);
            }
        },

        _buildGridConfig: function() {
            var me = this;
            var config = fish.extend(me.cardConfig, me.options.cardConfig);
            return config;
        },

        _initPagination: function(totalCount, page, curRowNum) {
            var me = this;
            me.paginationEl = me.$('.card-pagination');
            var rowList = me.cardConfig.rowList;
            me.paginationEl.pagination({
                records: totalCount,
                rowList: rowList,
                rowNum: curRowNum ? curRowNum : rowList[0],
                page: page,
                pgInput: false,
                pgNumber: true,
                onPageClick: function(e, eventData) {
                    if (eventData.eventType === "select" || eventData.eventType === "page") {
                        me.getPageData(eventData.page, eventData.rowNum);
                    }
                }
            });
        },

        _buildGetPageDataFunc: function(ajaxCfg) {
            var me = this;
            if (ajaxCfg) {
                return function(page, rowNum){
                    var scope = ajaxCfg.scope ? ajaxCfg.scope : me;
                    // 处理未传入rowNum情况
                    var currentRowNum = me.paginationEl.pagination("option", "rowNum");
                    rowNum = rowNum || currentRowNum;
                    var data = ajaxCfg.data.call(scope);
                    data = fish.extend({
                        page: page,
                        start: (page - 1) * rowNum,
                        limit: rowNum
                    }, data);

                    var def = $.Deferred();
                    ajaxCfg.ajaxFunc.call(scope, data, function(result) {
                        var pageData;
                        if(ajaxCfg.formatter){
                            pageData = ajaxCfg.formatter.call(scope,result);
                        } else {
                            if (typeof result.resultList !== "undefined") {
                                pageData = {
                                    rows: result.resultList,
                                    page: page,
                                    rowNum: rowNum,
                                    records: result.totalRecords
                                };
                            } else {
                                pageData = {
                                    rows: result,
                                    page: page,
                                    rowNum: rowNum,
                                    records: result.length
                                };
                            }
                        }
                        if (me.options.gridConfig.scroll && !isScrollRefresh) {
                            def.resolve(pageData);
                        } else {
                            me.loadData(pageData);
                        }
                    });
                    return def.promise();
                };

            } else {
                return;
            }
        },

        loadData: function(resultList) {
            var me = this;
            me.$(".card-list").empty();
            if (resultList instanceof Array) {
                me._doRenderCardItems(resultList);
            } else {
                var reusltObj = resultList;
                me.paginationEl.pagination("update", {
                    records: reusltObj.records,
                    rowNum: reusltObj.rowNum,
                    start: reusltObj.page
                });
                me._doRenderCardItems(reusltObj.rows);
            }
        },

        _doRenderCardItems: function(resultList) {
            var me = this;
            var cardViewList = [];
            fish.each(resultList, function(item, index) {
                var rowData = me._formateRowData(item, me.options.columns, me.options.colWidth, index);
                cardViewList.push(new CardItemView(rowData));
            });
            me.setViews({
                '.card-list ': cardViewList
            });
            me.renderViews(cardViewList);
            me.resultList = resultList;
            me.cardViewList = cardViewList;
        },

        _formateRowData: function(item, columns, colWidth, itemIndex) {
            var me = this;
            var rowData = {
                cardId: itemIndex, // 序号作为cardId
                colWidth: colWidth,
                rowData: item,
                dataList: []
            };
            fish.each(columns, function(column) {
                var data = {
                    dataType: column.dataType
                };
                if (column.dataType == "TITLE") {
                    data.imageUrl = column.imageUrl;
                    if (column.imageUrlFormatter) {
                        data.imageUrl = column.imageUrlFormatter.call(column, item[column.name], item);
                    }
                    data.text = me._formateText(item, column);
                    if (column.subTitle) {
                        data.subTitleList = [];
                        fish.each(column.subTitle, function(subTitleCfg) {
                            data.subTitleList.push(me._formateText(item, subTitleCfg));
                        });
                    }
                } else if (column.dataType == "SEP") {

                } else if (column.dataType == "ROW") {
                    data.text = me._formateText(item, column);
                    data.label = column.label;
                } else if (column.dataType == "BTNS") {
                    if (column.dataList) {
                        data.dataList = [];
                        fish.each(column.dataList, function(dataCfg) {
                            data.dataList.push(me._formateText(item, dataCfg));
                        });
                    }
                    // 处理按钮配置，待渲染card后setView
                    var btns = column.btns;
                    if (column.dynamicBtns) {
                        btns = column.dynamicBtns.call(column, item[column.name], item);
                    }
                    rowData.btns = btns;
                }
                rowData.dataList.push(data);
            });
            return rowData;
        },

        _formateText: function(item, column){
            var text = item[column.name];
            if (column.formatter) {
                text = column.formatter.call(column, item[column.name], item);
            }
            return text;
        },


        // view被移除时候调用
        cleanup: function() {
            var me = this;
            delete me.resultList;
            delete me.cardViewList;

            delete me.cardConfig;
            delete me.paginationEl;
            delete me.getPageData;
        }
    });
});
