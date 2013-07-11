Ext.define('Regleep.controller.CourseCalendar', {
    extend: 'Ext.app.Controller',

    views: ['CourseCalendar'],
    
    stores: ['Event', 'Calendar'],

    init: function() {
        this.control({
            'coursecalendar': {
                afterrender: this.calRender
            },
            
            'coursecalendar > eventStore': {
                'write': this.calChanged
            },
            
        });
    },
    
    calRender: function(calendar) {
		calendar.setStartDate(new Date("2013-07-01T18:30:00-04:00"));
		console.log("Calendar Rendered");
	},
	
	calChanged: function(store, operation) {
		console.log("Calendar Changed");
	}
});
