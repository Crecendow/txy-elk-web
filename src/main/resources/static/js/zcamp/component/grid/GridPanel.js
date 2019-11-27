define([
    'hbs!zcamp/component/grid/templates/GridPanel.html',
    'zcamp/component/grid/AbstractGrid'
], function(viewTpl, AbstractGrid) {

    return fish.View.extend(fish.extend({}, AbstractGrid, {
        // false表示不会主动包裹一层div
        el: false,
        template: viewTpl,

        initialize: function() {
            var me = this;

            AbstractGrid.initialize.apply(me, arguments);
        },

        afterRender: function() {
            var me = this;

            AbstractGrid.afterRender.apply(me, arguments);
        }
    }));
});