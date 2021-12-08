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

do_minify_style = function () {
	clean_up_level_display = function (skill) {
		skilldom = $("#nav-skill-progress-all-"+skill)[0];
		skilldom.textContent = skilldom.textContent.replaceAll("(", "")
		skilldom.textContent = skilldom.textContent.replaceAll(" / 99)", "")
		skilldom.style = "font-size: 100%; margin: auto;";
	}
	$("#page-container.side-scroll #sidebar .content-side").css("width", "130"); // resize content
	$("#sidebar").css("width", "130"); // resize sidebar
	$("#page-container.sidebar-o").css("padding-left", "110px"); // move game to fit
	$(".nav-main-link.nav-page-1").children()[0].style="display:none;"; // hide shop icon
	$("#nav-current-gp")[0].style = "margin: auto";

	for (let skill=0; skill<=22; skill++) {
		clean_up_level_display(skill);
	}
	clean_up_level_display("16-1");

	$(".nav-main-link-name").css("display", "none"); // hide text labels
	$(".nav-main-heading").css("width", "130px"); // resizes version container
	
	$("#combat-level-sidebar")[0].style = "display: visible !important;"; // redisplay combat level
	$("#combat-level-sidebar")[0].textContent = getPlayerCombatLevel();
	$("#combat-level-sidebar")[0].style = "font-size: 100%; margin-left: 15px;";

	$("#page-container.side-scroll #sidebar .content-header").css("width", "130px"); // resizes logo container
	$(".logo-sidebar").css("width", "100px").css("height", "auto"); // resizes logo at top
}


console.log("[melvor_hcco/minified_view] Loading");
setInterval(do_minify_style, 1000);
console.log("[melvor_hcco/minified_view] Done");
