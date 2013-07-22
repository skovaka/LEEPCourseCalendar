Ext.define('Regleep.view.VwDistribution' ,{
	
	display: {
		blockAText: "Block A: ",
		blockBText: "Block B: ",
		blockCText: "Block C: ",
		labText: "Lab: ",
		offGridText: "Off Grid: ",
		
		layout: 'hbox',
		itemId: 'distroBox',
		border: false,
		
		items: [{
					itemId: 'blockA',
					xtype: 'text',
					styleSelector: '.block-a',
					cls: 'timeblocktext',
					text: 'Block A',
					padding: 2,
				},{
					itemId: 'blockB',
					xtype: 'text',
					styleSelector: '.block-b',
					cls: 'timeblocktext',
					text: 'Block B',
					padding: 2,
				},{
					itemId: 'blockC',
					xtype: 'text',
					styleSelector: '.block-c',
					cls: 'timeblocktext',
					text: 'Block C',
					padding: 2,
				},{
					itemId: 'lab',
					xtype: 'text',
					styleSelector: '.lab',
					cls: 'timeblocktext',
					text: 'Lab',
					padding: 2,
				},{
					itemId: 'offGrid',
					xtype: 'text',
					styleSelector: '.off-grid',
					cls: 'timeblocktext',
					text: 'Off Grid',
					padding: 2,
				}]
	}
});
	
