# android-webview-malayalam-font-family
Android, for UTF character on Web view Such as Cordova based application doesnot apply font change when there is a UTF character present.<br>
The Library provided will convert UTF to ASCII and then use a Malayalam font to display the font.
This can be extended to any UTF character. <br>
Current default unicodetoasciifont.js is for a Malayalam font MLW-TTRevathi
##Dependency 
jQuery
###Usage
```javascript
<style type="text/css">
  @font-face {
      font-family: 'mlw-ttrevathinormal';
      src: url('./fonts/mlwrv0nt-webfont.eot');
      src: url('./fonts/mlwrv0nt-webfont.eot?#iefix') format('embedded-opentype'),
           url('./fonts/mlwrv0nt-webfont.woff2') format('woff2'),
           url('./fonts/mlwrv0nt-webfont.woff') format('woff'),
           url('./fonts/mlwrv0nt-webfont.ttf') format('truetype'),
           url('./fonts/mlwrv0nt-webfont.svg#mlw-ttrevathinormal') format('svg');
      font-weight: normal;
      font-style: normal;
  }
	.mal-rev{font-family:"mlw-ttrevathinormal"!important;}
</style>
<script src="js/vendor/jquery-1.11.2.min.js"></script>
<script src="lib/unicodetoasciifont.js"></script>

var strUnicodeVal = $("#unicodeChar").html();
$("#asciirevathi").html(UniCodeToAsciiFont.convertFont(strUnicodeVal));
```
###Methods
```javascript
   /*
    * To convert from Unicode to ASCII.
    * @param {string} strSource: String that need to be changed.Mix of English and non English accepted
    * @return {string} converted value along with wrapped html element.
    */
	UniCodeToAsciiFont.convertFont(strSource);
		/*
    * Given string is converted to ASCII character.
    * @param {string} inputString: Provide only NonEnglish string.
    * @return {string} converted value in ASCII is returned.
    */
	UniCodeToAsciiFont.convertToNonEngilshAscii(inputString);
```
###Configuration
```javascript
	 /*
    * Change all the configuration.
    * @param {object} configValue {
		//vowel characters that prepends.
		//In value add _ that will be replaced
		prependsVowelCharacters: {"key":"value"},
		//vowel characters that wraps 
		//In value add _ that will be replaced
		wrapsVowelCharacters: {"key":"value"},
		//Vowel character R( Ya| VVa 
		raYaVaCharacters : {"key":"value"},
		//vowel characters that appends 
		appendsVowelCharacters: {"key":"value"},
		//All Alphabets mapping
		alphabetslCharacters: {"key":"value"},
		//Class name to be added for a non English character
		className:"mal-rev",
		//Node type that is wrapped for non English ACII character
		elementType:"span"}
    */
	UniCodeToAsciiFont.configure(configValue);
```
	###Extending To new Ascii font
	create a javascript file eg:karthikatemplatefont.js<br>
	Add below code 'KarthikaTemplateFont' can be replaced with any other name
```javascript
	(function(KarthikaTemplateFont) {
	KarthikaTemplateFont.defaults = {
			//vowel characters that prepends.
		//In value add _ that will be replaced
		prependsVowelCharacters: {"key":"value"},
		//vowel characters that wraps 
		//In value add _ that will be replaced
		wrapsVowelCharacters: {"key":"value"},
		//Vowel character R( Ya| VVa 
		raYaVaCharacters : {"key":"value"},
		//vowel characters that appends 
		appendsVowelCharacters: {"key":"value"},
		//All Alphabets mapping
		alphabetslCharacters: {"key":"value"}
	}
}(KarthikaTemplateFont = {}));
```
You may check the sample template font in the lib folder.<br>
Ascii mapping can be done by installing the font and use some tools like "character Map" to get the equalent value.
