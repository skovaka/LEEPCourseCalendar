Ext.require([
    'Ext.window.MessageBox'
]);

Ext.define('Regleep.controller.CtCourseListPanel', {
    extend: 'Ext.app.Controller',

    views: ['VwCourseListPanel'],
    
    //stores: ['StCourses'],
    
    //models: ['AM.model.MdCourse'],

    init: function() {
        this.control({
            'courselistpanel': {
                beforerender: this.onRender,
                show: this.onShow
            },
            
            'courselistpanel button[action=update]': {
                click: this.updateCourses
            },
            
            'courselistpanel button[action=create]': {
                click: this.createNewCourse
            }
        });
    },
    
    onShow: function (panel) {
		
		
		console.log("Showing");
	},
    
    onRender: function (panel) {
		panel.hide();
		
		
    },
    
    updateCourses: function (button){
       var vw = button.up('courselistpanel');
       var facultyFilter = vw.down('textfield[itemId="facLastTxt"]');
       var subjectFilter = vw.down('combobox[itemId="subjectTxt"]');
       var termFilter = vw.down('combobox[itemId="termTxt"]');
       var courselist = vw.down('coursecalendar');
       courselist.store.proxy.extraParams.fac_last = facultyFilter.getValue();
       courselist.store.proxy.extraParams.subject = subjectFilter.getValue().join();
       courselist.store.proxy.extraParams.term = termFilter.getValue();
       courselist.store.load();
       
       console.log(subjectFilter.store.getGroups());
    },
    
    createNewCourse: function (button){
		var window = Ext.create('widget.newcourse', { width: 500});
		window.show();
    }
});
