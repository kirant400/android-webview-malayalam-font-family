$(document).ready(function(){
var strUnicodeVal = $("#unicodeChar").html();
$("#asciirevathi").html(UniCodeToAsciiFont.convertFont(strUnicodeVal));
var config = RevathiTemplateFont.defaults;
config["elementType"] ="div";
UniCodeToAsciiFont.configure(config);
$("#asciirevathidiv").html(UniCodeToAsciiFont.convertFont(strUnicodeVal));

var config = KarthikaTemplateFont.defaults;
config["className"] ="mal-kar";
UniCodeToAsciiFont.configure(config);
$("#asciikarthika").html(UniCodeToAsciiFont.convertFont(strUnicodeVal));

});
