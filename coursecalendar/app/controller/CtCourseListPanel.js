Ext.require([
    'Ext.window.MessageBox'
]);

Ext.define('Regleep.controller.CtCourseListPanel', {
    extend: 'Ext.app.Controller',

    views: ['VwCourseListPanel'],
    
    //stores: ['StCourses'],
    
    //models: ['AM.model.MdCourse'],

    init: function() {
        this.control({
            'courselistpanel': {
                beforerender: this.onRender
            },
            
            'courselistpanel button[action=update]': {
                click: this.updateCourses
            },
            'courselistpanel button[action=create]': {
                click: this.createNewCourse
            }
        });
    },
    onRender: function (panel){
    panel.hide();
    
    
    
    
    
    console.log("Rendering");
    },
    updateCourses: function (button){
       var vw = button.up('courselistpanel');
       var facultyFilter = vw.down('textfield[itemId="facLastTxt"]');
       var subjectFilter = vw.down('textfield[itemId="subjectTxt"]');
       var termFilter = vw.down('textfield[itemId="termTxt"]');
       var courselist = vw.down('coursecalendar');
       courselist.store.proxy.extraParams.fac_last = facultyFilter.getValue();
       courselist.store.proxy.extraParams.subject = subjectFilter.getValue();
       courselist.store.proxy.extraParams.term = termFilter.getValue();
       courselist.store.load();
    },
    createNewCourse: function (button){
    var window = Ext.create('widget.newcourse', { width: 500});
    window.show();
    }
});
