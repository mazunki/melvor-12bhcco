// ==UserScript==
// @name         Minified View
// @namespace    melvor_hcco
// @version      0.1.2
// @description  Minifies the UI by hiding some stuff, useful for advanced players who already knows the interface
// @author       mazunki
// @match	https://*.melvoridle.com/*
// @exclude	https://wiki.melvoridle.com*
// @grant       none
// @noframes
/* globals jquery, $, game, getPlayerCombatLevel, skillLevel, CONSTANTS */
// ==/UserScript==

// Made for version 1.0

let has_initialized = false;

function local_toggleMenu(menu,show=false){
	let c=[6,7,8,9,12,16,17,18];
	let m=[0,1,2,3,4,5,10,13,14,15,19];
	if(menu===0) {
		for(let i=0;i<c.length;i++) {
			if (show) {
				$("#nav-skill-tooltip-"+c[i]).removeClass("d-none");
			} else {
				$("#nav-skill-tooltip-"+c[i]).addClass("d-none");
			}
		}
	} else if (menu===1){
		if (show) {
			$($(".nav-main-heading")[4]).nextUntil("[id=nav-main-heading]").removeClass("d-none");
		} else {
			$($(".nav-main-heading")[4]).nextUntil("[id=nav-main-heading]").addClass("d-none");
		}
	}
}

let do_minify_sidebar_style = function () {
	if ($("m-page-loader.d-none").length != 0) return;

	let clean_up_level_display = function (skill) {
		let skilldom = $("#nav-skill-progress-all-"+skill)[0];
		if (skilldom === undefined) return;
		skilldom.textContent = skillLevel[skill];
		skilldom.style = "font-size: 100%; margin: auto;";

		let skillnamedom = $("#skill-nav-name-"+skill)[0];
		if (skilldom === undefined) return;
		skillnamedom.style = "display: none";

        let skillcontainerdom = $("#nav-skill-tooltip-"+skill)[0];
        if (skillcontainerdom === undefined) return;

        if ($("#skill-nav-name-"+skill)[0] === undefined) return;
        if ($("#skill-nav-name-"+skill)[0].classList.contains("text-success")) {
            skillcontainerdom.style = "width: 130px !important; background-color: #30888d !important";
        } else {
            skillcontainerdom.style = "width: 130px !important;";
        }
	}

	$(".nav-main-item").css("width", "130px !important;");
	$(".nav-main").css("width", "130px !important;");
	if ($("#page-container.side-scroll #sidebar .content-side")[0] !== undefined ) {
		$("#page-container.side-scroll #sidebar .content-side")[0].style = "width: 130px !important;";
	}
	if ($(".content-header")[0] !== undefined ) {
		$(".content-header")[0].style = "width: 130px !important;";
	}

	if ($("#sidebar") !== undefined) {
		$("#sidebar")[0].style = "width: 130px !important; transform: translateX(0)"; // resize sidebar
	}
	$("#page-container.sidebar-o").css("padding-left", "110px"); // move game to fit

	if ($(".nav-main-link.nav-page-1").children()[0] !== undefined) {
		$(".nav-main-link.nav-page-1").children()[0].style="display:none;"; // hide shop icon
	}
	if ($("#nav-current-gp")[0] !== undefined) {
		$("#nav-current-gp")[0].style = "margin: auto";
	}

	for (let skill=0; skill<=22; skill++) {
		clean_up_level_display(skill);
	}
	clean_up_level_display("16-1");

	if ($("#ad-container")[0] !== undefined)  {
		$("#ad-container")[0].style = "display: none;";
	}


	$(".nav-main-link-name").css("font-size", "70%"); // smoler text for visible labels
	for (let i=0; i<$(".nav-main-submenu").length; i++ ) {
		$(".nav-main-submenu")[i].style = "padding-left: 10px"; // remove some indentation for submenues
	}

	if ($(".page-nav-name-misc-4")[0] !== undefined) { // we already know it's complog
		$(".page-nav-name-misc-4")[0].style = "display: none;";
	}

	if ($(".page-nav-name-1")[0] !== undefined) { // we already know it's bank
		$(".page-nav-name-1")[0].style = "display: none;";
	}

	if ($(".page-nav-name-2")[0] !== undefined) { // we already know it's shop
		$(".page-nav-name-2")[0].style = "display: none;";
	}

	if ($(".page-nav-name-24")[0] !== undefined) { // we already know it's golbin raid
		$(".page-nav-name-24")[0].style = "display: none;";
	}

	let cb_sidebar = $("#combat-level-sidebar")[0];
	if (cb_sidebar !== undefined) {
		cb_sidebar.textContent = getPlayerCombatLevel();
		cb_sidebar.style = "flex: 0 0 auto; margin: auto; font-size: 100%"; // font and center
	}

	$(".nav-main-heading").css("width", "130px !important"); // resizes version container
	$("#page-container.side-scroll #sidebar .content-header").css("width", "130px !important"); // resizes logo container
	$(".logo-sidebar").css("width", "100px").css("height", "auto"); // resizes logo at top


}
let hide_skill_groups = function() {
	const combat_skills = ["Attack", "Strength", "Defence", "Ranged", "Magic", "Prayer", "Slayer"]; // hp starts lvl 10
	const no_combat_skills = ["Woodcutting", "Fishing", "Firemaking", "Cooking", "Mining", "Smithing", "Farming", "Fletching", "Crafting", "Runecrafting", "Herblore", "Agility", "Summoning", "Astrology"];
	let show_combat = false;
	for (let i=0; i<combat_skills.length; i++) {
		if (skillLevel[CONSTANTS.skill[combat_skills[i]]] > 1) {
			show_combat = true;
			break;
		}
	}
	local_toggleMenu(0,show_combat);


	let show_no_combat = false;
	for (let i=0; i<no_combat_skills.length; i++) {
		if (skillLevel[CONSTANTS.skill[no_combat_skills[i]]] > 1) {
			show_no_combat = true;
			break;
		}
	}
	local_toggleMenu(1, show_no_combat);
}

let do_minify_combat_style = function () {
	if ($("#combat-fight-container-player").length != 0) return;
	try {
		let player_stats = $("#combat-fight-container-player").children().children().children().children()[2].children[0].children[0].children;
		player_stats[1].textContent = "min";
		player_stats[3].textContent = "max";
		player_stats[5].textContent = "max (summ)";
		player_stats[7].textContent = "hit chance";
		player_stats[9].textContent = "accuracy";
		player_stats[11].textContent = "dr";
		player_stats[13].textContent = "ev";
		player_stats[15].textContent = "ev";
		player_stats[17].textContent = "ev";
		player_stats[19].textContent = "pp lvl";
		player_stats[21].textContent = "pp";
		player_stats[23].textContent = "active pp";

	} catch (e) {
		console.log(e);
		return;
	}

}

console.log("[] Loading");
setInterval(do_minify_sidebar_style, 1000);
setInterval(do_minify_combat_style, 1000);
local_toggleMenu(0, false);
local_toggleMenu(1, false);
setInterval(hide_skill_groups, 5000);

console.log("[melvor_hcco/minified_view] Done");
