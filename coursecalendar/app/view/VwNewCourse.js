Ext.define('Regleep.view.VwNewCourse' ,{
    extend: 'Ext.window.Window',
    alias: 'widget.newcourse',
	modal: true,
	title: 'Create a New Course',
    initComponent: function() {
        
        this.items = [{
        xtype: 'form',
    bodyPadding: 5,
   // width: 350,

    // The form will submit an AJAX request to this URL when submitted
    url: 'save-form.php',

    // Fields will be arranged vertically, stretched to full width
    layout: 'column',
    defaults: {
        anchor: '100%'
    },
    // The fields
    defaultType: 'textfield',
    items: [{
        fieldLabel: 'Course Term',
        name: 'term',
        allowBlank: false
    },{
        fieldLabel: 'Part of Term',
        name: 'term_part',
        allowBlank: false
    },{
        fieldLabel: 'Course CRN',
        name: 'crn',
        allowBlank: false
    },{
        fieldLabel: 'Subject',
        name: 'subject',
        allowBlank: false
    },{
        fieldLabel: 'Sect',
        name: 'section',
        allowBlank: false
    },{
        fieldLabel: 'Max Enroll',
        name: 'max',
        allowBlank: false
    },{
        fieldLabel: 'Actual Enroll',
        name: 'enroll',
        allowBlank: false
    },{
        fieldLabel: 'Link Identifier',
        name: 'link',
        allowBlank: false
    },{
        fieldLabel: 'MC Code',
        name: 'master',
        allowBlank: false
    },{
        fieldLabel: 'Course Title',
        name: 'title',
        allowBlank: false
    },{
        fieldLabel: 'Cross List Code',
        name: 'cross_list',
        allowBlank: false
    },{
        fieldLabel: 'Fac First Name',
        name: 'fac_first',
        allowBlank: false
    },{
        fieldLabel: 'Fac Last Name',
        name: 'fac_last',
        allowBlank: false
    },{
        fieldLabel: 'Crse Numb',
        name: 'number',
        allowBlank: false
    },{
        fieldLabel: 'Days',
        name: 'days',
        allowBlank: false
    },{
        fieldLabel: 'Meet Begin Time',
        name: 'start',
        allowBlank: false
    },{
        fieldLabel: 'Meet End Time',
        name: 'end',
        allowBlank: false
    },{
        fieldLabel: 'Catalog Dept Code',
        name: 'department',
        allowBlank: false
    }],

    // Reset and Submit buttons
    buttons: [{
        text: 'Cancel',
        handler: function() {
            this.up('window').close();
        }
    },{
        text: 'Reset',
        handler: function() {
            this.up('form').getForm().reset();
        }
    }, {
    text: 'Submit',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                       Ext.Msg.alert('Success', action.result.msg);
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result.msg);
                    }
                });
            }
        }
    }]
        }];
        
        this.callParent(arguments);
        
    }
});
