Ext.require([
    'Ext.window.MessageBox'
]);

Ext.define('Regleep.controller.CtLogin', {
    extend: 'Ext.app.Controller',

    views: ['VwLogin'],

    init: function() {
        this.control({
            'viewport > login': {
                afterrender: this.onRender
            },
            'panel[name="logPanel"] button[name="loginButton"]': {
            
            click: this.onLogin
            }
        });
    },
    
    onLogin: function (button){
		var vwPanel = button.up('panel[name="logPanel"]');
		var viewport = button.up('viewport');
		var dept = vwPanel.down('combobox[name="departmentCombobox"]');
		var passw = vwPanel.down('textfield[name="passwordTextfield"]');
		var coursepanel = viewport.down('courselistpanel');
		var deptVal = dept.getValue();
		var passwVal = passw.getValue();
		
		dept.store.proxy.extraParams.department = deptVal;
		dept.store.proxy.extraParams.password = passwVal;
		
	   dept.store.load();
	   
	   
	   
		dept.store.load({
			scope: this,
			callback: function(records, operation, success) {
				count = dept.store.getCount();
				total = dept.store.getTotalCount();
				console.log(count + " " + total);

				if (count == 1) {
					vwPanel.hide();
					coursepanel.show();

					var calendar = coursepanel.down('coursecalendar');
					calendar.store.proxy.extraParams.department = deptVal;
					calendar.store.load();


				} else {
					alert ('Password incorrect!');
					dept.store.proxy.extraParams.department = "";
					dept.store.proxy.extraParams.password = "";
					dept.store.load();
				}
			}
		});
    }
   
});
