Ext.define('Regleep.data.DaEditForm', {
	formData: {
		titleTextEdit: 'Edit Course',
		subjectLabelText: 'Subject:',
		numberLabelText: 'Number:',
		sectionLabelText: 'Section:',
		facFirstText: 'Fac. First Name:',
		facLastText: 'Last:',
		maxText: 'Max Enroll',
		notesText: 'Notes',
		detailsLinkText: '',
		
        bodyStyle: 'padding:0px 0px 0',

        layout: 'fit',
        
		constrain: false,
		resizable:true,
		editDetailsLinkClass: undefined,
		enableEditDetails: false,
				
		getFormItemConfigs: function() {
			
			var items = [{
				layout:'hbox',
				border: false,
				bodyStyle: 'padding:0px 0px 0',
				items: [{
						xtype: 'combobox',
						itemId: this.id + '-subject',
						name: Extensible.calendar.data.EventMappings.Subject.name,
						editable: false,
						store: Ext.create('Regleep.store.StSubjectbox'),
						displayField: 'subject',
						padding: 3,
						width: '12%',
						
					},{
						xtype: 'textfield',
						itemId: this.id + '-number',
						name: Extensible.calendar.data.EventMappings.CourseNumber.name,
						fieldLabel: this.numberLabelText,
						labelWidth: 45,
						maxLength: 4,
						enforceMaxLength: true,
						padding: 3,
						width: '16%',
					},{
						xtype: 'textfield',
						itemId: this.id + '-section',
						name: Extensible.calendar.data.EventMappings.Section.name,
						fieldLabel: this.sectionLabelText,
						labelWidth: 45,
						maxLength: 3,
						enforceMaxLength: true,
						padding: 3,
						width: '15%',
					},{
						xtype: 'textfield',
						itemId: this.id + '-title',
						name: Extensible.calendar.data.EventMappings.Title.name,
						fieldLabel: this.titleLabelText,
						labelWidth: '10%',
						padding: 3,
						width: '57%',
					}],
					
			},{
				layout:'hbox',
				border: false,
				bodyStyle: 'padding:0px 0px 0',
				items: [{
						xtype: 'textfield',
						itemId: this.id + '-fac_first',
						name: Extensible.calendar.data.EventMappings.FacFirst.name,
						fieldLabel: this.facFirstText,
						padding: 3,
						labelWidth: '50%',
						width: '50%',
					},{
						xtype: 'textfield',
						itemId: this.id + '-fac_last',
						name: Extensible.calendar.data.EventMappings.FacLast.name,
						fieldLabel: this.facLastText,
						padding: 3,
						labelWidth: '11%',
						width: '50%',
					}],
					
			},{
				layout:'hbox',
				border: false,
				bodyStyle: 'padding:0px 0px 0',
				items: [{
						xtype: 'numberfield',
						itemId: this.id + '-max',
						name: Extensible.calendar.data.EventMappings.Max.name,
						fieldLabel: this.maxText,
						padding: 3,
						labelWidth: '100%',
						width: '24%',
						minValue: 0
					}],
			},{
				xtype: 'textareafield',
				itemId: this.id + '-notes',
				name: Extensible.calendar.data.EventMappings.Notes.name,
				fieldLabel: this.notesText,
				padding: 3,
				labelWidth: '2%',
				width: '100%',
			}
					
			//These last two fields must be here for the extensible calendar to work
			,{
				xtype: 'extensible.daterangefield',
				itemId: this.id + '-dates',
				hidden: true
			},{
				xtype: 'extensible.calendarcombo',
				itemId: this.id + '-calendar',
				store: this.calendarStore,
				hidden: true
			}]
			
			
			return items;
		},
	}
});
