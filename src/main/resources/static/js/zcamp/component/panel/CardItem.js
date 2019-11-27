define([
    'hbs!zcamp/component/panel/templates/CardItem.html',
    'zcamp/component/button/DropDownButton',
    'zcamp/component/button/Button',
    'css!zcamp/styles/cardView.css'
], function (viewTpl, DropDownButton, Button) {
    return fish.View.extend({
        el: false,
        template: viewTpl,

        serialize: function(){
            return this.options;
        },

        afterRender: function(){
            var me = this,
                btnCfgs = me.options.btns;
            if (btnCfgs && btnCfgs.length > 0) {
                var btns = [], btn;

                fish.each(btnCfgs, function(buttonOpt) {
                    buttonOpt.buttonSize = "middle";
                    buttonOpt.handlerArgs = [me.options.rowData];
                    if (buttonOpt.type === 'dropDownButton') {
                        btn = new DropDownButton(buttonOpt);
                    } else {
                        btn = new Button(buttonOpt);
                    }
                    btns.push(btn);
                });


                me.setViews({
                    '.service-panel-card .btnList': btns
                });
                me.renderViews(btns);
            }
        }
    });
});
