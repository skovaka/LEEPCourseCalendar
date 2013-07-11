Ext.define('Regleep.view.CourseCalendar' ,{
	//requires: ['Extensible.calendar.CalendarPanel'],
	
	extend: 'Extensible.calendar.CalendarPanel',
	alias: 'widget.coursecalendar',
	
	//Only show the week view
	showDayView: false,
	showMonthView: false,
	showMultiWeekView: false,
	showWeekView: false,
	showMultiDayView: true,
	
	//Set what days and times to view
	viewConfig: {
		startDay: 1,
		startDayIsStatic: true,
		dayCount: 5,
		viewStartHour: 8,
		viewEndHour: 22
	},
	
	//Hide the navigation, today text, and time
	showNavBar: false,
	showTodayText: false,
	showTime: false,
	
	//Set the stores
	eventStore: Ext.create('Regleep.store.Event'),
    calendarStore: Ext.create('Regleep.store.Calendar'),
	
	initComponent: function() {
		
		//Load the custom event mapping
		Extensible.calendar.data.EventMappings = Ext.create('Regleep.data.CalendarMappings').mappings;
		Extensible.calendar.data.EventModel.reconfigure();
		
		//Make the top bar only display the day of the week
		Extensible.calendar.view.DayHeader.override({
			getTemplateParams: function() {
				var params = this.callParent(arguments);
				params.firstWeekDateFormat = 'l';
				params.multiDayFirstDayFormat = 'l';
				params.multiDayMonthStartFormat = 'l';
				return params;
			}
		});
		
		Extensible.calendar.view.DayBody.override({
			getTemplateEventData : function(evt){
				var data = this.callParent(arguments);
				
				var mappings = Extensible.calendar.data.EventMappings;
				
				data.Title = evt[mappings.Subject.name] 
							 + ' ' + evt[mappings.CourseNumber.name] 
							 + '-' + evt[mappings.Section.name];
				
				return data;
			}
		});
        
        this.callParent(arguments);
    },
});
