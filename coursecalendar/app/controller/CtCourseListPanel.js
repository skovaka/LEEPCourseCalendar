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
                beforerender: this.onRender,
                show: this.onShow
            },
            
            'courselistpanel button[action=create]': {
                click: this.createNewCourse
            },
            
            'courselistpanel combobox': {
				collapse: this.combochanged
			},
            
            'courselistpanel textfield': {
				change: this.textchanged
			},
        });
    },
    
    onRender: function (panel) {
		panel.hide();
    },
    
    onShow: function(panel) {
		this.updateCourses(panel);
	},
    
    combochanged: function(field) {
		this.updateCourses(field.up('courselistpanel'));
	},
    
    textchanged: function(field, oldVal, newVal) {
		this.updateCourses(field.up('courselistpanel'));
	},
    
    updateCourses: function (courseListPanel) {
       var subjectFilter = courseListPanel.down('combobox[itemId="subjectField"]');
       var termFilter = courseListPanel.down('combobox[itemId="termField"]');
       var titleFilter = courseListPanel.down('textfield[itemId="titleField"]');
       var facultyFilter = courseListPanel.down('textfield[itemId="facNameField"]');
       var courselist = courseListPanel.down('coursecalendar');
	   var distroBox = courseListPanel.down('[itemId="distroBox"]');
		
       courselist.store.proxy.extraParams.fac_name = facultyFilter.getValue();
       courselist.store.proxy.extraParams.title = titleFilter.getValue();
       courselist.store.proxy.extraParams.subject = subjectFilter.getValue().join();
       courselist.store.proxy.extraParams.term = termFilter.getValue();
       
       courselist.store.load({
			scope: this,
			
			callback: function(records, operation, success) {
				var checked = {};
				var blockCount = {'A' : 0.0, 'B' : 0.0, 'C' : 0.0, 'D' : 0.0, 'E' : 0.0};
				var total = 0;
				for (var i = 0; i < records.length; i++) {
					if (!(records[i].CourseId in checked)) {
						checked[records[i].get('CourseID')] = true;
						blockCount[records[i].get('Superblock')] += 1.0;
						total += 1;
					}
				}
				
				var percentA = this.round(((blockCount['A'] / total) * 100), 2);
				distroBox.down('[itemId="blockA"]').setText(distroBox.blockAText + percentA + "% ");
				
				var percentB = this.round(((blockCount['B'] / total) * 100), 2);
				distroBox.down('[itemId="blockB"]').setText(distroBox.blockBText + percentB + "% ");
				
				var percentC = this.round(((blockCount['C'] / total) * 100), 2);
				distroBox.down('[itemId="blockC"]').setText(distroBox.blockCText + percentC + "% ");
				
				var percentD = this.round(((blockCount['D'] / total) * 100), 2);
				distroBox.down('[itemId="lab"]').setText(distroBox.labText + percentD + "% ");
				
				var percentE = this.round(((blockCount['E'] / total) * 100), 2);
				distroBox.down('[itemId="offGrid"]').setText(distroBox.offGridText + percentE + "% ");
			}
		});
    },
    
    round: function(value, precision) {
		var precision = precision || 0,
		neg = value < 0,
		power = Math.pow(10, precision),
		value = Math.round(value * power),
		integral = String((neg ? Math.ceil : Math.floor)(value / power)),
		fraction = String((neg ? -value : value) % power),
		padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');

		return precision ? integral + '.' +  padding + fraction : integral;
	},
    
    updateDistribution: function (courseListPanel) {
        var courselist = courseListPanel.down('coursecalendar');
		console.log(courselist.store.getTotalCount());
	},
    
    createNewCourse: function (button){
		//var window = Ext.create('widget.newcourse', { width: 500});
		//window.show();
		Ext.MessageBox.show({
            title: 'Choose timeblock type',
            msg: 'Would you like to create your course in a standard or custom timeblock? <br> <b>Note: Custom timeblocks must be approved unless for lab or discussion.<b>',
            buttons: Ext.MessageBox.YESNOCANCEL,
            buttonText:{ 
                yes: "Standard timeblock", 
                no: "Custom timeblock"
            },
            
            calendar: button.up('courselistpanel').down('coursecalendar'),
            
            fn: function (btn, text, opt) {
				if (btn == "yes") {
					opt.calendar.setTimeblockView(true);
				} else if (btn == "no") {
					var window = Ext.create('widget.newcourse', { width: 500});
					window.show();
				}
			}
        });
    },
    
    showResult: function (btn) {
    },
});
