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
do_minify_style = function () {
	if ($("m-page-loader.d-none").length != 0) return;

	clean_up_level_display = function (skill) {
		skilldom = $("#nav-skill-progress-all-"+skill)[0];
		if (skilldom === undefined) return;
		skilldom.textContent = skilldom.textContent.replaceAll("(", "")
		skilldom.textContent = skilldom.textContent.replaceAll(" / 99)", "")
		skilldom.style = "font-size: 100%; margin: auto;";
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

	$(".nav-main-link-name").css("display", "none"); // hide text labels
	$(".nav-main-heading").css("width", "130px"); // resizes version container
	
	cb_sidebar = $("#combat-level-sidebar")[0];
	if (cb_sidebar !== undefined) {
		cb_sidebar.textContent = getPlayerCombatLevel();
		cb_sidebar.style = "flex: 0 0 auto; margin: auto; font-size: 100%"; // font and center
	}

	$("#page-container.side-scroll #sidebar .content-header").css("width", "130px"); // resizes logo container
	$(".logo-sidebar").css("width", "100px").css("height", "auto"); // resizes logo at top

	const combat_skills = ["Attack", "Strength", "Defence", "Ranged", "Magic", "Prayer", "Slayer"]; // hp starts lvl 10
	const no_combat_skills = ["Woodcutting", "Fishing", "Firemaking", "Cooking", "Mining", "Smithing", "Farming", "Fletching", "Crafting", "Runecrafting", "Herblore", "Agility", "Summoning", "Astrology"];

	if (!(has_initialized)) {
		toggleMenu(0); // default to hide combat
		for (let i=0; i<combat_skills.length; i++) {
			if (skillLevel[CONSTANTS.skill[combat_skills[i]]] !== 1) {
				toggleMenu(0);
				break;
			}
		}

		toggleMenu(1);
		for (let i=0; i<no_combat_skills.length; i++) {
			if (skillLevel[CONSTANTS.skill[no_combat_skills[i]]] !== 1) {
				toggleMenu(1);
				break;
			}
		}
	}
	has_initialized = true;
}


console.log("[melvor_hcco/minified_view] Loading");
setInterval(do_minify_style, 1000);
console.log("[melvor_hcco/minified_view] Done");
