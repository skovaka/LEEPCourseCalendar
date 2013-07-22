Ext.define('Regleep.view.VwCourseCalendar' ,{
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
	eventStore: Ext.create('Regleep.store.StEvent'),
    calendarStore: Ext.create('Regleep.store.StCalendar'),
    
    timeblockView: true,
	
	initComponent: function() {
		
		
		this.setTimeblockView(false);
		
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
		
		Extensible.calendar.data.EventMappings = Ext.create('Regleep.data.DaCalendarMappings').mappings;
		
		Extensible.calendar.form.EventWindow.override(Ext.create('Regleep.data.DaEditForm').formData);
        
        this.callParent(arguments);
    },
    
    setTimeblockView: function(tbView) {
		
		if (tbView != this.timeblockView) {
			//Load the custom event mappings
			if (tbView) {
				Extensible.calendar.data.EventMappings = Ext.create('Regleep.data.DaTimeblockMappings').mappings;
				this.eventStore.proxy.api.read = "database/timeblockreader.php";
			} else {
				Extensible.calendar.data.EventMappings = Ext.create('Regleep.data.DaCalendarMappings').mappings;
				this.eventStore.proxy.api.read = "database/coursereader.php";
			}
			
			Extensible.calendar.data.EventModel.reconfigure();
				
			Extensible.calendar.view.DayBody.override({
				getTemplateEventData : function(evt){
					var data = this.callParent(arguments);
					
					var mappings = Extensible.calendar.data.EventMappings;
					
					if (tbView) {
						data.Title = "Block " + evt[mappings.Title.name] + " - " + evt[mappings.Days.name];
					} else {
						data.Title = evt[mappings.Subject.name] 
									 + ' ' + evt[mappings.CourseNumber.name] 
									 + '-' + evt[mappings.Section.name];
					}
					
					return data;
				}
			});
			
			this.eventStore.load();
			
			this.timeblockView = tbView;
		}
	},
});
