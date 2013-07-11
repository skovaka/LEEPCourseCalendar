Ext.define('Regleep.view.VwList' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.courselist',
	store: 'StCourses',
	height: 625,
    initComponent: function() {

        this.columns = [
            {header: 'Subject',  dataIndex: 'subject',  flex: 1},
            {header: 'Course Number', dataIndex: 'number', flex: 1},
            {header: 'Title', dataIndex: 'title', flex: 1},
            {header: 'Days', dataIndex: 'days', flex: 1},
            {header: 'Last Name', dataIndex: 'fac_last', flex: 1},
            {header: 'Semester', dataIndex: 'term', flex: 1}
        ];
        
        

        this.callParent(arguments);
    }
});
