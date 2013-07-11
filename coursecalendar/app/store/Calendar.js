Ext.define('Regleep.store.Calendar', {
    extend: 'Extensible.calendar.data.MemoryCalendarStore',
    
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api: {
			create  : undefined,
			read    : "database/calendarstore.php",
		},
		
		reader: {
			type: 'json',
			root: 'calendars'
		}
	}
});
