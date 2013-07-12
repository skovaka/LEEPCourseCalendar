Ext.define('Regleep.store.StTermbox', {
    extend: 'Ext.data.Store',
    
    
    fields: ['term', 'term_format'],
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
			fields: "term"
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
