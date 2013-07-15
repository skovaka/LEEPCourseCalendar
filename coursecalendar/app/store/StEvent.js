Ext.define('Regleep.store.StEvent', {
    extend: 'Extensible.calendar.data.EventStore',
    
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api: {
			create  : "database/coursereader.php",
			read    : "database/coursereader.php",
			update  : "database/coursereader.php",
			destroy  : "database/coursereader.php"
		},
		
		actionMethods: {                            
			create: 'POST',                            
			read: 'POST',                            
			update: 'POST',                            
			destroy: 'POST'                        
		},
		
		startParam: undefined,
		extraParams: {                              
			department: "NULL",     
			term: "201309",                
			subject: "",
			fac_name: "",
			title: "",
		}, 
		
		reader: {
			type: 'json',
			root: 'courses',
			successProperty: 'success'
		},
		
		writer: {
			type: 'json',
			nameProperty: 'mapping'
		},
	},
	
	
	listeners: {
		'write': function(store, operation){
			var title = Ext.value(operation.records[0].data[Extensible.calendar.data.EventMappings.Title.name], '(No title)');
			switch(operation.action){
				case 'create': 
					console.log('Added "' + title + '"');
					break;
				case 'update':
					console.log('Updated "' + title + '"');
					break;
				case 'destroy':
					console.log('Deleted "' + title + '"');
					break;
			}
		}
	}
	
});
