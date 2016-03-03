/**
 * Created by Caleb Milligan on 3/2/2016.
 */
$(document).ready(function () {
    text_element = document.getElementById("text");
    color_element = document.getElementById("color");
    size_element = document.getElementById("size");
    body_element = document.getElementById("body");
    setInterval(cheer, 500);
    setInterval(modColor, 20);
    setSize(size);
});

var color_paused = true;
var anim_paused = true;
var high_contrast = false;
var text = "";
var current_text = "";
var index = 0;
var state = false;
var flash_state = false;
var flash_count = 0;
var text_element;
var color_element;
var size_element;
var body_element;
var size = 100;
var color = "#000000";
var controls_shown = true;

function setText(new_text) {
    if (text_element != null) {
        text_element.innerHTML = new_text;
        text_element.setAttribute("style", "visibility: visible");
    }
    text = new_text;
    current_text = "";
    index = 0;
    state = false;
    flash_state = false;
    flash_count = 0;
}

function toggleContrast() {
    high_contrast ^= true;
}

function toggleColorPaused() {
    color_paused ^= true;
}

function toggleAnimPaused() {
    anim_paused ^= true;
}

function toggleControls() {
    controls_shown ^= true;
    var visible = "visibility: " + (controls_shown ? "visible" : "hidden");
    document.getElementById("text_input").setAttribute("style", visible);
    document.getElementById("size_input").setAttribute("style", visible);
    document.getElementById("anim_pause").setAttribute("style", visible);
    document.getElementById("color_pause").setAttribute("style", visible);
    document.getElementById("high_contrast").setAttribute("style", visible);
}

var red = 255;
var blue = 255;
var green = 255;
var color_state = 0;

function modColor() {
    if (color_paused) {
        return;
    }
    if (color_state == 0) {
        blue--;
        green--;
        if (blue <= 0) {
            color_state = 1;
        }
    }
    else if (color_state == 1) {
        blue++;
        green++;
        if (blue >= 255) {
            color_state = 2;
        }
    }
    else if (color_state == 2) {
        green++;
        if (green >= 255) {
            color_state = 3;
        }
    }
    else if (color_state == 3) {
        green--;
        red--;
        if (red <= 0) {
            color_state = 4;
        }
    }
    if (color_state == 4) {
        red++;
        green++;
        if (green >= 255) {
            color_state = 0;
        }
    }
    red = Math.min(Math.max(0, red), 255);
    green = Math.min(Math.max(0, green), 255);
    blue = Math.min(Math.max(0, blue), 255);
    var c_red = red ^ 0xff;
    var c_green = (high_contrast ? green ^ 0xff : 0);
    var c_blue = blue ^ 0xff;
    var bg = toHex(c_red) + toHex(c_green) + toHex(c_blue);
    color = toHex(red) + toHex(green) + toHex(blue);
    color_element.setAttribute("style", "color: #" + color);
    body_element.setAttribute("style", "background-color: #" + bg);
}

function toHex(num) {
    return ("00" + num.toString(16)).slice(-2);
}

function setSize(new_size) {
    size = new_size;
    size_element.setAttribute("style", "font-size: " + size + "pt");
}

function cheer() {
    if (!text || anim_paused) {
        return;
    }
    if (!state) {
        current_text = text.substr(0, index++);
        text_element.innerHTML = current_text;
        if (index > text.length) {
            current_text = "";
            index = 0;
            state = true;
        }
    }
    else {
        text_element.setAttribute("style", "visibility: " + ((flash_state ^= true) ? "hidden" : "visible"));
        flash_count++;
        if (flash_count > 5) {
            flash_count = 0;
            flash_state = false;
            state = false;
        }
    }
}