// ==UserScript==
// @name         Precise chance to hit
// @namespace    melvor_hcco
// @version      0.1.1
// @description  Shows 4 significant digits in chance of hit, instead of an integer%
// @author       mazunki
// @match	https://*.melvoridle.com/*
// @exclude	https://wiki.melvoridle.com*
// @grant       none
// @noframes
/* globals jquery, $, game */
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

do_minify_style = function () {
	if ($("m-page-loader.d-none").length != 0) return;

	clean_up_level_display = function (skill) {
		skilldom = $("#nav-skill-progress-all-"+skill)[0];
		if (skilldom === undefined) return;
		skilldom.textContent = skilldom.textContent.replaceAll("(", "")
		skilldom.textContent = skilldom.textContent.replaceAll(" / 99)", "")
		skilldom.style = "font-size: 100%; margin: auto;";
		
		skillnamedom = $("#skill-nav-name-"+skill)[0];
		if (skilldom === undefined) return;
		skillnamedom.style = "display: none";
	}
	$("#page-container.side-scroll #sidebar .content-side").css("width", "130"); // resize content
	$("#sidebar").css("width", "130"); // resize sidebar
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

	$(".nav-main-heading").css("width", "130px"); // resizes version container

	$(".nav-main-link-name").css("font-size", "70%"); // smoler text for visible labels
	for (let i=0; i<$(".nav-main-submenu").length; i++ ) {
		$(".nav-main-submenu")[i].style = "padding-left: 10px";  // remove some indentation for submenues
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
	
	cb_sidebar = $("#combat-level-sidebar")[0];
	if (cb_sidebar !== undefined) {
		cb_sidebar.textContent = getPlayerCombatLevel();
		cb_sidebar.style = "flex: 0 0 auto; margin: auto; font-size: 100%"; // font and center
	}

	$("#page-container.side-scroll #sidebar .content-header").css("width", "130px"); // resizes logo container
	$(".logo-sidebar").css("width", "100px").css("height", "auto"); // resizes logo at top


}
hide_skill_groups = function() {
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

console.log("[melvor_hcco/minified_view] Loading");
setInterval(do_minify_style, 1000);
local_toggleMenu(0, false);
local_toggleMenu(1, false);
setInterval(hide_skill_groups, 5000);

console.log("[melvor_hcco/minified_view] Done");
