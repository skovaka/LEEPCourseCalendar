Ext.require([
    'Ext.window.MessageBox'
]);

Ext.define('Regleep.controller.CtNewCourse', {
    extend: 'Ext.app.Controller',

    views: ['VwNewCourse'],
    
   // stores: ['Courses'],
    
   // models: ['AM.model.Course'],

    init: function() {
        this.control({
            'viewport > login': {
                afterrender: this.onRender
            }
        });
    },
    onRender: function (button){
 
   
   
   
    

    }
   
});
