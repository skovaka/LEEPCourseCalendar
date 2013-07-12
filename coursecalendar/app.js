Ext.application({
    requires: ['Ext.container.Viewport', 
    'Extensible.calendar.CalendarPanel' 
    ],
    name: 'Regleep',

    appFolder: 'app',
    
    controllers: [
        'CtCourseCalendar',
        'CtCourses',
        'CtLogin',
        'CtCourseListPanel',
        'CtNewCourse',
    ],
    
	launch: function() {
        var login = Ext.create('Ext.container.Viewport', {
           items: [{
                xtype: 'loginpage'
            },{
				xtype: 'courselistpanel'
			}]
        });
        
        
        
    }
});
