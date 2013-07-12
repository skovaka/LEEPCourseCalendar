Ext.define('Regleep.store.StSubjectbox', {
    extend: 'Ext.data.Store',
    
    
    fields: ['subject'],
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
			read    : "database/optionreader.php",
		},
        
        actionMethods: {                                
			read: 'GET',                   
		},
		
		startParam: undefined,
		extraParams: {                              
			department: "",
			fields: "subject"
		}, 
        
        reader: {
            type: 'json',
            root: 'options',
            successProperty: 'success'
        }
    },
    
    setFields: function(fields) {
		this.proxy.extraParams.fields = fields;
	}
});
