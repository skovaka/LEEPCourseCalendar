Ext.define('Regleep.data.DaTimeblockMappings', {
	mappings: {
		CalendarId:  {name: 'CalID', mapping: 'block', type: 'int'},
		Title:       {name: 'EvtTitle', mapping: 'name'},
		StartDate:   {name: 'StartDt', mapping: 'cal_start', type: 'date', dateFormat: 'c'},
		EndDate:     {name: 'EndDt', mapping: 'cal_end', type: 'date', dateFormat: 'c'},
		Notes:       {name: 'Desc', mapping: 'notes'},
		
		EventId:     {name: 'ID', mapping:'id', type:'int'},
		Term:		 {name: 'Term', mapping: 'term'},
		TermPart:	 {name: 'TermPart', mapping: 'term_part'},
		CRN:		 {name: 'CRN', mapping: 'crn'},
		Subject:	 {name: 'Subject', mapping: 'name'},
		Section:	 {name: 'Section', mapping: 'section'},
		Max:		 {name: 'Max', mapping: 'max'},
		Enroll:		 {name: 'Enroll', mapping: 'enroll'},
		FacFirst:	 {name: 'FacFirst', mapping: 'fac_first'},
		FacLast:	 {name: 'FacLast', mapping: 'fac_last'},
		CourseNumber:{name: 'Number', mapping: 'number'},
		Days:		 {name: 'Days', mapping: 'days'},
		StartTime:	 {name: 'StartTime', mapping: 'start'},
		EndTime:	 {name: 'EndTime', mapping: 'end'},
		Deparment:	 {name: 'Deparment', mapping: 'deparment'},
		
		RRule:       {name: 'RecurRule', mapping: 'recur_rule'},
		Location:    {name: 'Location', mapping: 'location'},
		Url:         {name: 'LinkUrl', mapping: 'link_url'},
		IsAllDay:    {name: 'AllDay', mapping: 'all_day', type: 'boolean'},
		Reminder:    {name: 'Reminder', mapping: 'reminder'},
	}
});
