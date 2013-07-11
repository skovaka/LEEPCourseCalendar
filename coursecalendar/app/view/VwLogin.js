Ext.define('Regleep.view.VwLogin' ,{
    extend: 'Ext.panel.Panel',
    alias: 'widget.loginpage',
    title: 'Course Planning Software - Clark University',
	
    initComponent: function() {
        this.items = [{
	title: 'Login',
	name: 'logPanel',
	xtype: 'panel',
	modal: true,
	layout: {
        type: 'vbox',       // Arrange child items vertically
        align: 'stretch',    // Each takes up full width
        padding: 50
    },
	items: [{
	xtype: 'form',
	name: 'loginForm',
	items: [{
			//itemId: 'termTxt',
			name: 'departmentCombobox',
			xtype: 'combobox',
			fieldLabel: 'Department',
			store: Ext.create("Regleep.store.StLogin"),
			editable: false,
			displayField: 'department',
            valueField: 'password',
		},{
			//itemId: 'facLastTxt',
			name: 'passwordTextfield',
			xtype: 'textfield',
			inputType: 'password',
			allowBlank: false,
			fieldLabel: 'Password'
		},
	
		{
		
		xtype: 'button',
                    text: 'Login',
                    width: 100,
                    name: 'loginButton'
		}],
	
	}]
		}];
        this.callParent(arguments);
    }
});
