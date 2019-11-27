fish.View.configure({ manage: true, syncRender: true });

require(['zcamp/modules/jobplan/jobitemdiagrammgr/views/JobItemProcessEditor'], function(IndexView){
	new IndexView().render();
	fish.setLanguage('zh')
})