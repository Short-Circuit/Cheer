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

function setText(new_text) {
    if (text_element != null) {
        text_element.innerHTML = "";
    }
    text = new_text;
    current_text = "";
    index = 0;
    state = false;
    flash_state = false;
    flash_count = 0;
}

var red = 0;
var blue = 0;
var green = 0;
var color_state = 0;

function modColor() {
    if(color_state == 0){
        red++;
        if(red >= 255){
            color_state = 1;
        }
    }
    else if(color_state == 1){
        blue++;
        green++;
        if(blue >= 255){
            color_state = 2;
        }
    }
    else if(color_state == 2){
        red--;
        green--;
        if(red <= 0){
            color_state = 3;
        }
    }
    if(color_state == 3){
        blue--;
        if(blue <= 0){
            color_state = 0;
        }
    }
    red = Math.min(Math.max(0, red), 255);
    green = Math.min(Math.max(0, green), 255);
    blue = Math.min(Math.max(0, blue), 255);
    var c_red = red ^ 0xff;
    var c_green = green ^ 0xff;
    var c_blue = blue ^ 0xff;
    var bg = toHex(c_red) + toHex(c_green) + toHex(c_blue);
    color = toHex(red) + toHex(green) + toHex(blue);
    color_element.setAttribute("style", "color: #" + color);
    body_element.setAttribute("style", "background-color: #" + bg);
}

function toHex(num) {
    return ("00" + num.toString(16)).slice(-2);
}

function getColorComplement(color) {
    return color;
}

function setSize(new_size) {
    size = new_size;
    size_element.setAttribute("style", "font-size: " + size + "pt");
}

function cheer() {
    if (!text) {
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