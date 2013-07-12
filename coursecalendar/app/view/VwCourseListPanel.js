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
					padding: 5
				},
				items: [{
					xtype: 'combobox',
					fieldLabel: 'Subject',
					store: Ext.create('Regleep.store.StSubjectbox'),
					displayField: 'subject',
					itemId: 'subjectTxt',
					multiSelect: true,
					editable: false,
					value: []
				},{
					itemId: 'facLastTxt',
					xtype: 'textfield',
					fieldLabel: 'Last Name',
				},{
					xtype: 'combobox',
					fieldLabel: 'Semester',
					itemId: 'termTxt',
					store: Ext.create('Regleep.store.StTermbox'),
					displayField: 'term_format',
					valueField: 'term',
					editable: false,
					value: []
				},{
					action: 'update',
					xtype: 'button',
					text:'Update',
				}]
			},{
				region: 'south',
				title: 'Information and Add New Course',
				xtype: 'panel',
				layout: {
					type: 'hbox',
					pack: 'center',
					padding: 5
				},
				dock: 'bottom',
				items: [{
					itemId: 'percentage',
					xtype: 'button',
					text: 'Percentage Completion',
					margin: "0 0 0 10"
				},{
					itemId: 'warnings',
					xtype: 'button',
					text: 'Warnings',
					margin: "0 0 0 10"
				},{
					action: 'create',
					xtype: 'button',
					text:'Create New Course',
					margin: "0 0 0 10"
				}]
		}];


        this.callParent(arguments);
    }
});
