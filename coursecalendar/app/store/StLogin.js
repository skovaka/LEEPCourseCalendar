Ext.define('Regleep.store.StLogin', {
    extend: 'Ext.data.Store',
    model: 'Regleep.model.MdLogin',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
			create  : undefined,
			read    : "database/passwords_reader.php",
			update  : undefined,
			destroy : undefined
		},
        
        actionMethods: {                            
			create: 'POST',                            
			read: 'POST',                            
			update: 'POST',                            
			destroy: 'POST'                        
		},
		
		startParam: undefined,
		extraParams: {                              
			department: "",
			password: ""
		}, 
        
        reader: {
            type: 'json',
            root: 'passwords',
            successProperty: 'success'
        }
    }
});
