// ==UserScript==
// @name         Combat Drops Only Complog
// @namespace    melvor_hcco
// @version      0.1.1
// @description  Adds a button to filter completion log to only show combat drop-exclusive items
// @author       mazunki
// @match	https://*.melvoridle.com/*
// @exclude	https://wiki.melvoridle.com*
// @grant       none
// @noframes
// ==/UserScript==

// Made for version 1.0

window.melvor_hcco_is_cdo_available = function (id) {
	for (let i=0; i<MONSTERS.length; i++) {
		monster_loot = MONSTERS[i].lootTable;
		for (let j=0; j<monster_loot.length; j++) {
			if (monster_loot[j][0] === id) return true
		}
	}
	return false;
}

window.complog_filter_cdo = function () {
	clearItemLogSearch();
	showAllItems=true;
	for (let i=0;i<items.length;i++) {
		if (melvor_hcco_is_cdo_available(i))
			$(`#item-log-img-${i}`).removeClass("d-none");
		else 
			$(`#item-log-img-${i}`).addClass("d-none");
	}
}

var add_filter_button = () => {
	if ($("#completion-log-2")) {
		itemlog = $("#completion-log-2");
		buttonRow = itemlog.find(".col-12")[4];
		cdoButton = $("<button>", {
			id: "complog_cdo",
		 	class: "btn btn-sm btn-info m-1",
		 	role: "button",
		 	onclick: "complog_filter_cdo();",
		 	text: "Combat Drops"
		});
		if ($("#complog_cdo").length === 0) {
			cdoButton.appendTo(buttonRow);
		}
	}
};

setTimeout( () => setInterval(add_filter_button, 200), 1000 );

