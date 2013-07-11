Ext.define('Regleep.store.StCourses', {
    extend: 'Ext.data.Store',
    model: 'Regleep.model.MdCourse',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
			create  : undefined,
			read    : "database/coursereader.php",
			update  : "database/coursewriter.php",
			destroy : "database/coursecleaner.php"
		},
        
        actionMethods: {                            
			create: 'POST',                            
			read: 'POST',                            
			update: 'POST',                            
			destroy: 'POST'                        
		},
		
		startParam: undefined,
		extraParams: {                              
			subject: "",
			fac_last: "han",
			term: "",
		}, 
        
        reader: {
            type: 'json',
            root: 'courses',
            successProperty: 'success'
        }
    }
});
