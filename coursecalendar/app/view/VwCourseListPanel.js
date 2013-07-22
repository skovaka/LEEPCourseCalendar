Ext.define('Regleep.view.VwCourseListPanel' ,{
    extend: 'Ext.panel.Panel',
    alias: 'widget.courselistpanel',
    layout:'border',
    
    name: 'courselistPanel',
	defaults: {
		collapsible: true,
		split: true
	},
	height: 615,
	
	initComponent: function() {
        this.items = [
			{
				xtype: 'coursecalendar',
				collapsible: false,
				region:'center'
            },{
				title: 'Filters',
				region: 'north',
				xtype: 'panel',
				layout: {
					type: 'hbox',
				},
					
				items: [{
					itemId: 'subjectField',
					xtype: 'combobox',
					fieldLabel: 'Subject',
					store: Ext.create('Regleep.store.StSubjectbox'),
					displayField: 'subject',
					multiSelect: true,
					editable: false,
					value: [],
					padding: 5,
					labelWidth: 45,
				},{
					itemId: 'titleField',
					xtype: 'textfield',
					fieldLabel: 'Title',
					padding: 5,
					labelWidth: 0,
				},{
					itemId: 'facNameField',
					xtype: 'textfield',
					fieldLabel: 'Faculty Name',
					padding: 5,
					labelWidth: 80,
				},{
					itemId: 'termField',
					xtype: 'combobox',
					padding: 5,
					labelWidth: 55,
					fieldLabel: 'Semester',
					store: Ext.create('Regleep.store.StTermbox'),
					displayField: 'term_format',
					valueField: 'term',
					editable: false,
					value: []
				}]
			},{
				region: 'south',
				title: 'Information and Add New Course',
				xtype: 'panel',
				layout: {
					type: 'hbox',
					pack: 'left',
					padding: 5
				},
				dock: 'bottom',
				items: [
				
				Ext.create('Regleep.view.VwDistribution').display,
				
				{
					action: 'create',
					xtype: 'button',
					text:'Create New Course',
					margin: "0 0 0 10"
				}]
		}];


        this.callParent(arguments);
    }
});
