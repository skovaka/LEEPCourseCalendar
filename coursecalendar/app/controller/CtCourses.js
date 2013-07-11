Ext.require([
    'Ext.window.MessageBox'
]);

Ext.define('Regleep.controller.CtCourses', {
    extend: 'Ext.app.Controller',

    views: ['VwList', 'VwEdit'],
    
    stores: ['StCourses'],
    
    models: ['Regleep.model.MdCourse'],

    init: function() {
        this.control({
            'viewport > courselist': {
                afterrender: this.onRender
            },
            
            'courselist button[action=update]': {
                click: this.updateCourses
            },
            
            'courselist button[action=create]': {
                click: this.createCourse
            },
            
            'courselist button[action=reset]': {
                click: this.resetCourses
            },
        });
    },
    
    changeDept: function(grid, record) {
		 this.getStCoursesStore().proxy.extraParams.subject = "BIOL";
		 this.getStCoursesStore().load();
	},

	updateCourse: function(button) {
        var win    = button.up('window'),
			form   = win.down('form'),
			record = form.getRecord(),
			values = form.getValues();

		record.set(values);
		win.close();
    },

	//Set the text box values
    onRender: function(grid, record) {
    //grid.hide();
		var toolbar = grid.down('toolbar');
		toolbar.getComponent('subjectTxt').setValue(this.getStCoursesStore().proxy.extraParams.subject);
		toolbar.getComponent('facLastTxt').setValue(this.getStCoursesStore().proxy.extraParams.fac_last);
		toolbar.getComponent('termTxt').setValue(this.getStCoursesStore().proxy.extraParams.term);
    },
    
    //Load courses based on what's in the text boxes
    updateCourses: function(button) {
		var toolbar = button.up('toolbar');
		this.getStCoursesStore().proxy.extraParams.subject = toolbar.getComponent('subjectTxt').getValue();
		this.getStCoursesStore().proxy.extraParams.fac_last = toolbar.getComponent('facLastTxt').getValue();
		this.getStCoursesStore().proxy.extraParams.term = toolbar.getComponent('termTxt').getValue();
		this.getStCoursesStore().load();
    },
    
    //Adds a course to the databse
    createCourse: function(button) {
		var toolbar = button.up('toolbar'),
			subjectStr = toolbar.getComponent('subjectWriteTxt').getValue(),
			numberStr = toolbar.getComponent('numberWriteTxt').getValue(),
			titleStr = toolbar.getComponent('titleWriteTxt').getValue(),
			firstStr = toolbar.getComponent('facFirstWriteTxt').getValue(),
			lastStr = toolbar.getComponent('facLastWriteTxt').getValue();
		
		Ext.Ajax.request({
			url: 'coursewriter.php',
			params: {
				subject: subjectStr,
				number: numberStr,
				title: titleStr,
				fac_first: firstStr,
				fac_last: lastStr,
				term: "201309"
			},
			success: function(response) {
				Ext.Msg.alert('Course Created', response.responseText);
			},
			failure: function(response) {
				Ext.Msg.alert('Error', 'Failed to create course.');
			}
		});
    },
    
    resetCourses: function(button) {
		
		
		Ext.Ajax.request({
			url: 'coursecleaner.php',
			success: function(response) {
				Ext.Msg.alert('Database Reset', 'The course database was successfully reset.');
			},
			failure: function(response) {
				Ext.Msg.alert('Error', 'Failed to reset the course database.');
			}
		});

    }
});
