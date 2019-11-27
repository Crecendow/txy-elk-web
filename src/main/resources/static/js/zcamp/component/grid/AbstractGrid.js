define([
    'hbs!zcamp/component/grid/templates/GridOperation.html',
    'zcamp/modules/common/ZUtils',
    'i18n!zcamp/i18n/Common.i18n'
], function(gridOperationTpl, ZUtils, commonI18n) {
    return {
        // 初始化默认配置
        _initDefaultConfig: function() {
            var me = this;

            me.gridConfig = {
                datatype: "json",
                //scroll: true,// 冲突，暂不支持
                rowNum: 20,
                page: 1,
                rowList: [20, 50, 100],
                pager: true,
                height: "500",
                multiselect: false
            };

        },

        // #region 子类需要手动调用或者覆盖
        /**
         * 初始化, 需要手动调用, 例如: AbstractDataTable.initialize.call(me);
         */
        /*var options = {
            // 可选：分页时获取数据的配置
            ajaxCfg: {
               ajaxFunc: xxAction.qryXXPageList, // action函数的第一个参数为js object，含有所有查询条件组成的参数对象，第二个为回调函数 eg: qrySystemParamPageList: function (param, callbackFunction) {...}
               data: qryXXCondFunc, // 获取ajaxFunc所需参数值，即动态获取查询条件的值对象的方法;返回的查询参数对象可不添加分页参数，grid将会加上默认计算出的分页参数  eg: getQryConditions: function() {return this.form.getValue();}
               scope: me, // 使用grid的view的this，必填，否则影响data方法获取查询条件
               // 可选：处理页面返回值，默认不配置将会仅格式化为通用分页所需格式
               formatter: function (result) { rows: result.resultList,page: page,records: result.totalRecords;}
            },
            columns: [{
                 name: 'modifyDate',
                 label: me.i18nData.MODIFY_DATE,
                 sortable: false, // 列默认为false
                 width: '40%',
                 dynamicBtns: function(cellval, opts, rwdat, _act) { // 动态按钮，为函数，参数列表同formatter，根据条件不同返回不同按钮列表
                     return [{
                         name: "playbookDetail",
                         text: me.i18nData.COMMON_SHOW_DETAIL,
                         scope: me, //必填， 参考ajaxCfg.scope
                         handler: me.playbookDetail
                     }];
                 }
            }，{
                 name: 'fileName',
                 label: me.i18nData.COMMON_OPERATION,
                 width: "20%",
                 btns: [{
                     name: "playbookDetail",
                     text: me.i18nData.COMMON_SHOW_DETAIL,
                     scope: me, //必填， 参考ajaxCfg.scope
                     handler: me.playbookDetail
                 }]
            }],
            gridConfig: {
                // 可选：滚动分页
                //scroll: true,// 冲突，暂不支持
                //pager: true, // 分页配置，默认为true，不需要分页时设为false
                ....所有fish grid配置信息都可以放在这里

                // 下面两配置项可配合使用，若不指定onSelectRowFuncScope则为默认作用域
                onSelectRow: function() {},
                onSelectRowFuncScope: me,
                noScroll: true // 不指定高度，默认不出现滚动条
            }
            // 不分页的配置: pager: false,不配ajaxCfg 使用loadData来加载数据 参考PlaybookListView
        };*/
        initialize: function() {
            var me = this;

            me._initDefaultConfig();

            me.gridConfig = me._buildGridConfig();

            me.getPageData = me._buildGetPageDataFunc(me.options.ajaxCfg);
            me.columns = me._getTableColumns();
            me.onSelectRow = me._buildOnSelectRowFunc();
        },

        /**
         * 渲染DataTable
         */
        afterRender: function() {
            var me = this;

            me.tableOriginEl = me._getGridOriginRootEl();

            me.grid = me._buildGrid();

            if (me.getPageData) {
                me.getPageData(1);
            }
        },

        loadData: function(pageData) {
            var me = this;
            if (!me.tableOriginEl) {
                me.tableOriginEl = me._getGridOriginRootEl();
            }
            me.tableOriginEl.grid("reloadData", pageData);
        },

        // ========================仅分页表格可用！========================
        // 有参数刷新指定页，无参数刷新当前页
        reloadPage: function(page, isHideMsg) {
            var me = this;
            page = page ? page : me.tableOriginEl.grid("getGridParam", "page");
            me.getPageData(page, undefined, undefined, undefined, isHideMsg);
        },

        reloadCurrentPage: function(isHideMsg){
            var me = this;
            me.reloadPage(undefined, isHideMsg);
        },

        reloadFirstPage: function(isHideMsg) {
            var me = this;
            me.reloadPage(1, isHideMsg);
        },
        // ========================仅分页表格可用！========================

        getRowById: function(rowId) {
            var me = this;
            return me.tableOriginEl.grid("getRowData", rowId);
        },

        getData: function() {
            var me = this;

            return me.tableOriginEl.grid("getRowData");
        },

        getSelection: function(){
            var me = this;
            return me.tableOriginEl.grid("getSelection");
        },

        setData: function(rowId, newData) {
            var me = this;
            return me.tableOriginEl.grid("setRowData", rowId,
                fish.extend(me.getRowById(rowId), newData));
        },

        setSelectionByData: function(data) {
            var me = this;
            return me.tableOriginEl.grid("setSelection", data);
        },
        /**
         * 执行grid函数，第一个参数为函数名，余下为函数参数
         * gridPnl.execGridFunc("funcName", arg0, arg1);
         *
         * */
        execGridFunc: function(funcName) {
            var me = this;
            return me.tableOriginEl.grid.apply(me.tableOriginEl, arguments);
        },

        _buildGridConfig: function() {
            var me = this;
            var config = fish.extend(me.gridConfig, me.options.gridConfig);
            if (!config.pager && !config.scroll) {
                delete config.datatype;
                delete config.scroll;
                delete config.rowNum;
                delete config.page;
                delete config.rowList;
                delete config.pager;
            }
            if(config.noScroll) {
                config.height = "auto";
            }
            return config;
        },

        _buildGetPageDataFunc: function(ajaxCfg) {
            var me = this;
            if (ajaxCfg) {
                return function(page, rowNum, sortname, sortorder, isHideLoading, isScrollRefresh) {
                    var scope = ajaxCfg.scope ? ajaxCfg.scope : me;
                    // 处理未传入rowNum情况
                    var currentRowNum = me.tableOriginEl.grid("getGridParam", "rowNum");
                    rowNum = rowNum || currentRowNum;
                    // 处理ajax参数
                    var data = {};
                    if (ajaxCfg.data) {
                        data = ajaxCfg.data.call(scope);
                    }
                    data = fish.extend({
                        page: page,
                        start: (page - 1) * rowNum,
                        limit: rowNum
                    }, data);

                    var def = $.Deferred();
                    if (!isHideLoading) {
                        me.doBlockUI();
                    }
                    ajaxCfg.ajaxFunc.call(scope, data, function(result) {
                        var pageData;
                        me.doUnblockUI();
                        if(ajaxCfg.formatter){
                            pageData = ajaxCfg.formatter.call(scope,result);
                        } else {
                            if (typeof result.resultList !== "undefined") {
                                pageData = {
                                    rows: result.resultList,
                                    page: page,
                                    records: result.totalRecords
                                };
                            } else {
                                pageData = {
                                    rows: result,
                                    page: page,
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
                }
            } else {
            }
        },

        doBlockUI: function (message) {
            var me = this;
            if (me.blockEl) {
                me.blockEl.find(".blockUI-content").text(message || commonI18n.COMMON_LOADING);
            } else {
                me.blockEl = ZUtils.Msg.block(me.tableOriginEl, message || commonI18n.COMMON_LOADING);
            }
        },

        doUnblockUI: function () {
            var me = this;
            if (me.blockEl) {
                me.blockEl = null;
                ZUtils.Msg.unblock(me.tableOriginEl);
            }
        },

        _getTableColumns: function() {
            var me = this,
                columns = me.options.columns
                    || me._buildTableColumns();

            me._processColumns(columns);
            return columns;
        },

        _processColumns: function(columns) {
            var me = this;
            fish.each(columns, function(column) {
                if (!column.sortable) {
                    column.sortable = false;
                }
                // 处理action列,需包含btns列表
                if (column.btns) {
                    me._processActionColumn(column);
                } else if (column.dynamicBtns) {
                    me._processDynamicActionColumn(column);
                }
                //// 处理缩略列内容
                //else if (column.ellipsisLength) {
                //    column.render = function(data, type, row) {
                //        return ZUtils.ellipsisString(data, column.ellipsisLength);
                //    }
                //}
            });
        },

        _processDynamicActionColumn: function(column) {
            var me = this;

            // 设置标志，为事件绑定做准备
            me.hasActionColumn = true;

            column.formatter = function() {
                var btns = column.dynamicBtns.apply(this, arguments);
                var serilizeData = me._processBtns(btns);
                var dom = gridOperationTpl(fish.extend({}, serilizeData));
                return dom;
            };
            column.cellattr = function () {
                return 'style="overflow: visible;';
            }
        },

        _processActionColumn: function(column) {
            var me = this;

            // 设置标志，为事件绑定做准备
            me.hasActionColumn = true;

            var serilizeData = me._processBtns(column.btns);

            column.formatter = function() {
                var dom = gridOperationTpl(fish.extend({}, serilizeData));
                return dom;
            };
            column.cellattr = function () {
                return 'style="overflow: visible;';
            }

        },

        _processBtns: function(btns){
            var me = this;

            // 处理列
            var btns = btns;

            //if (btns.length == 0) {
            //    column.formatter = function() {
            //        return ""
            //    };
            //    return;
            //}

            // 存储事件处理函数
            me.actionHandlers = me.actionHandlers || {};
            var btnList = new Array();
            fish.each(btns, function(btn, i) {
                if (btn === '-') {
                    btnList.push({
                        divider: true
                    });
                } else {
                    me.actionHandlers[btn.name] = {
                        handler: btn.handler,
                        scope: btn.scope
                    };
                    btnList.push({
                        name: btn.name,
                        text: btn.text
                    });
                }
            });

            // 产生Dom
            var serilizeData = {},
                isSingleBtn = btnList.length == 1 ? true : false;
            if (isSingleBtn) {
                serilizeData.isSingleBtn = isSingleBtn;
                serilizeData.singleBtn = btnList[0];
            } else if (btnList.length == 0) {
                return {
                    isEmpty: true
                };
            } else {
                serilizeData.firstBtn = btnList.shift();
                serilizeData.btnsOpt = btnList;
            }
            return serilizeData;
        },

        _buildOnSelectRowFunc: function () {
            var me = this,
                onSelectRowFunc = me.options.gridConfig.onSelectRow,
                onSelectRowFuncScope = me.options.gridConfig.onSelectRowFuncScope;
            if (me.hasActionColumn) {
                return function (e, rowid, state, checked) {
                    if (onSelectRowFunc) {
                        onSelectRowFunc.apply(onSelectRowFuncScope || this, arguments);
                    }
                    // 处理操作列事件
                    var orginalEvent = e.originalEvent;
                    if (orginalEvent) {
                        if ($(orginalEvent.target).data("action")) {
                            var action = $(orginalEvent.target).data("action"),
                                btnHandler = me.actionHandlers[action].handler,
                                scope = me.actionHandlers[action].scope;
                            scope = scope ? scope : me;
                            btnHandler.call(scope, rowid, $(orginalEvent.target));
                        } else if ($(orginalEvent.target).attr("data-attach-to") || $(orginalEvent.target).attr("class") == "caret") {
                            setTimeout(function () {
                                $(orginalEvent.target).click();
                            }, 1);
                        }
                    }
                }
            } else {
                return function () {
                    if (onSelectRowFunc) {
                        onSelectRowFunc.apply(onSelectRowFuncScope || this, arguments);
                    }
                }
            }
        },

        _buildTableColumns: function() {},

        _getGridOriginRootEl: function(){
            var me = this;
            return me.$el;
        },

        _buildGrid: function() {
            var me = this;
            var grid = me.tableOriginEl.grid(fish.extend({}, me.gridConfig, {
                colModel: me.columns,
                pageData: me.getPageData,
                onSelectRow: me.onSelectRow
            }));

            // grid Bug,不能正确识别reloadGrid事件监听
            if (me.gridConfig.reloadGrid) {
                me.tableOriginEl.on("reloadGrid", me.gridConfig.reloadGrid);
            }

            return grid;
        },

        cleanup: function() {
            var me = this;

            delete me.table;

            delete me.gridConfig;
            delete me.getPageData;
            delete me.columns;
            delete me.onSelectRow;

            delete me.tableOriginEl;
            delete me.actionHandlers;
            //delete me.gridRootEl;
        }

    }
});