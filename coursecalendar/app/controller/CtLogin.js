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

					var calendar = coursepanel.down('coursecalendar');
					var subjectbox = coursepanel.down('textfield[itemId="subjectTxt"]');
					var termbox = coursepanel.down('textfield[itemId="termTxt"]');
					
					var currentTerm = termbox.store.last().get('term');
					termbox.setValue(currentTerm);
					
					calendar.store.proxy.extraParams.department = deptVal;
					calendar.store.proxy.extraParams.term = currentTerm;
					
					subjectbox.store.proxy.extraParams.department = deptVal;
					subjectbox.store.proxy.extraParams.term = currentTerm;
					
					calendar.store.load();
					
					subjectbox.store.load({
						scope: this,
						callback: function(records, operation, success) {
							var vals = [];
							for (var i = 0; i < records.length; i++) {
								vals.push(records[i].get('subject'));
							}
							subjectbox.setValue(vals);
						}
					});
					
					
					vwPanel.hide();
					coursepanel.show();
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
