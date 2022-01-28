// ==UserScript==
// @name         Blood Hud
// @namespace    melvor_hcco
// @version      0.1.0
// @description  Adds a blood hud for low hp levels
// @author       mazunki
// @match	https://*.melvoridle.com/*
// @exclude	https://wiki.melvoridle.com*
// @grant       none
// @noframes
/* globals jquery, $, game, getPlayerCombatLevel, skillLevel, CONSTANTS */
// ==/UserScript==

// Made for version 1.0

let has_initialized = false;

let do_add_blood_hud = function () {
	if ($("m-page-loader.d-none").length != 0) return;

    if ($("#page-container")[0] !== undefined && player != undefined) {
        let color = "red";
        let missing_hp = (player.hitpointsPercent) ? (100 - player.hitpointsPercent) : 0;

        let colour = (missing_hp > 50)? "#FF0000" : "#770";
        let percenthud = 0.2;

        let linear_percent = (missing_hp > 20)? 100 - missing_hp * percenthud : 100;
        let radial_percent = (missing_hp > 20)? 100 - missing_hp * (percenthud*1.5) : 100;

        let hudstyle = "linear-gradient(to left, transparent " + linear_percent + "%, " + colour +")";
        hudstyle += ", linear-gradient(to right, transparent " + linear_percent + "%, " + colour +")";
        hudstyle += ", linear-gradient(to bottom, transparent " + linear_percent + "%, " + colour +")";
        hudstyle += ", linear-gradient(to top, transparent " + linear_percent + "%, " + colour +")";
        hudstyle += ", radial-gradient(ellipse, transparent " + radial_percent + "%, " + colour +")";

        $("#page-container")[0].style = "padding-left: 110px; background: " + hudstyle + ";";
    }
}

console.log("[melvor_hcco/blood_hud] Loading");
setInterval(do_add_blood_hud, 100);

console.log("[melvor_hcco/blood_hud] Done");
