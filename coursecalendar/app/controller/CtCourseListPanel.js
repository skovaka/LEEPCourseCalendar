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
            
            'courselistpanel button[action=create]': {
                click: this.createNewCourse
            },
            
            'courselistpanel combobox': {
				collapse: this.combochanged
			},
            
            'courselistpanel textfield': {
				change: this.textchanged
			},
        });
    },
    
    onRender: function (panel) {
		panel.hide();
    },
    
    onShow: function(panel) {
		console.log("showing");
		this.updateCourses(panel);
	},
    
    combochanged: function(field) {
		this.updateCourses(field.up('courselistpanel'));
	},
    
    textchanged: function(field, oldVal, newVal) {
		this.updateCourses(field.up('courselistpanel'));
	},
    
    updateCourses: function (courseListPanel) {
       var subjectFilter = courseListPanel.down('combobox[itemId="subjectField"]');
       var termFilter = courseListPanel.down('combobox[itemId="termField"]');
       var titleFilter = courseListPanel.down('textfield[itemId="titleField"]');
       var facultyFilter = courseListPanel.down('textfield[itemId="facNameField"]');
       var courselist = courseListPanel.down('coursecalendar');
       courselist.store.proxy.extraParams.fac_name = facultyFilter.getValue();
       courselist.store.proxy.extraParams.title = titleFilter.getValue();
       courselist.store.proxy.extraParams.subject = subjectFilter.getValue().join();
       courselist.store.proxy.extraParams.term = termFilter.getValue();
       courselist.store.load();
    },
    
    createNewCourse: function (button){
		var window = Ext.create('widget.newcourse', { width: 500});
		window.show();
    }
});
