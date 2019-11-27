/**
 * @class AbstractAtomicNode
 * 
 */
define([
    'frm/fish-topo-bpmn/fish-topo-bpmn',
    'zcamp/modules/common/ZUtils'
], function (BPMN, ZUtils) {
    
    return ZUtils.Class.create({

        width: 100,
        height: 60,

        // atomic/container
        bpmnGraphicType: "atomic",

        iconColor: '#a6b1b5',

        bodyZIndex: 2,

        /**
         * 构造方法
         */
        initialize: function(model, api) {
            var me = this;
    
            BPMN.BPMNNode.call(me, model, api);
            me.model = model;
            me.model.set("taskType", me.taskType || me.cpType);
    
            fish.extend(me, me._getDefaultInitOptions(), me.getInitOptions());
            me.render();
        },

        _getDefaultInitOptions: function() {
            var me = this,
                width = me.model.get("bounds.lowerRight.x") - me.model.get("bounds.upperLeft.x"),
                height = me.model.get("bounds.lowerRight.y") - me.model.get("bounds.upperLeft.y");

            if (!width || width <= 0) {
                width = me.width;
            }
            if (!height || height <= 0) {
                height = me.height;
            }

            return {
                slot: [],
                slotEvent: [],
                isCanSlot: true,
                rectSize: { width: width, height: height }
            };
        },

        getInitOptions: function() { 
            var me = this;

            return {
                bpmnInfo: { type: -1, name: me.cpType }
            }
        },

        bodyCircleName: "Circle",
        setOrCancelSelectStyle:function(isSetOrCancel) {
            if(isSetOrCancel) {
                this.bodyCircle.attr("style", {
                    stroke: "#95C2E3",
                    shadowBlur: 2
                });
            } else {
                this.bodyCircle.attr("style", {
                    stroke: this.rectStrokeColor,
                    shadowBlur: 0
                });
            }
            
        },

        render: function() {
            var me = this;

            // 画主体圆形图
            var bodyCircle = new BPMN.graphic.Circle({
                shape: {
                    cx: 0,
                    cy: 0,
                    r: 17.5
                },
                style: {
                    fill: me.rectFillColor,
                    stroke: me.rectStrokeColor
                },
                z: me.bodyZIndex
            });
            bodyCircle.name = me.bodyCircleName;
            me.bodyCircle = bodyCircle;
            me.add(bodyCircle);
            me.selectStyle = {
                // shadowBlur: 5,
                // shadowColor: '#000'
            };
            // 画左上角图标
            var iconRect = {x:-7, y: -8, width: 15, height:15},
                pathIcon = BPMN.graphic.makePath(me.iconPath, { style: { fill: me.iconColor }, z: 2 }, iconRect)
            me.add(pathIcon);
            
            // 画文本框
            var title = me.drawText(me.model.get("properties.name"));
            title.text.name = "Title";
            me.add(title.text);

            // 设置坐标
            me.position = [me.model.get("bounds.upperLeft.x") + 0.5, me.model.get("bounds.upperLeft.y") + 0.5];
        },

        getRect: function() {
            var me = this,
                boundingRect = me.getBoundingRect();

            //创建最小包围盒虚线
            var points = [];
            points[0] = [-boundingRect.width / 2, -boundingRect.height / 2];
            points[1] = [boundingRect.width / 2, -boundingRect.height / 2];
            points[2] = [boundingRect.width / 2, boundingRect.height / 2];
            points[3] = [-boundingRect.width / 2, boundingRect.height / 2];
            points[4] = [-boundingRect.width / 2, -boundingRect.height / 2];

            var boundRect = new BPMN.BoundingRect(this.position[0] - boundingRect.width/2 ,
                                                this.position[1] - boundingRect.height/2,
                                                boundingRect.width, boundingRect.height);
            return {
                x: this.position[0],
                y: this.position[1],
                width: boundingRect.width/2,
                height: boundingRect.height/2,
                points: points,
                boundingRect: boundRect
            };
        },


        setPosition: function(pX, pY) {
            var me = this;

            me.attr('position', [pX, pY]);
        },

        getBoundingRect: function() {
            var bodyCircle = this.childOfName(this.bodyCircleName);
            return bodyCircle.getBoundingRect();
        },

        getPropertiesData: function(dataKey) {
            var me = this,
                properties = me.model.get("properties");

            return properties[dataKey];
        },

        getUserData: function() {
            var me = this;

            return me.getPropertiesData("userData");
        },

        showInvalid: function() {
            var me = this;

            me.bodyRect.attr("style", {
                stroke: "rgba(255, 0, 0, 1)"
            });
        },

        clearInvalid: function() {
            var me = this;
            
            me.bodyRect.attr("style", {
                stroke: "#bbbbbb"
            });
        }
    });
});