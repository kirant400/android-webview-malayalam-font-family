// Author: Kiran T Brahaspathy
// License: (C) Nirays Technologies 2014
// https://github.com/kirant400/android-webview-malayalam-font-family

(function(UniCodeToAsciiFont, $, undefined) {
   
	var defaults = {
	//vowel characters that prepends 
	prependsVowelCharacters: {
		"േ":"t_",
		"െ":"s_",
		"ൈ":"ss_"
    },
	//vowel characters that wraps 
	wrapsVowelCharacters: {
		"ൌ":"s_u",
		"ോ":"t_m",
		"ൊ":"s_m",
	},
	//Vowel character R( Ya| VVa 
	raYaVaCharacters : {
		"ര":"{",
		"യ":"y",
		"വ":"z"
	},
	//vowel characters that appends 
	appendsVowelCharacters: {
		"ാ":"m",
		"ി":"n",
		"ീ":"o",
		"ു":"p",
		"ൂ":"q",
		"ഃ":"x",
		"്":"v",
		"ം":"w",
		"ൗ":"u",
		"ൃ":"r",
		"ൄ":"r"
	},
	//All Alphabets mapping
	alphabetslCharacters: {
		"അ":"A",
		"ആ":"B",
		"ഇ":"C",
		"ഈ":"Cu",
		"ഉ":"D",
		"ഊ":"Du",
		"ഋ":"E",
		"എ":"F",
		"ഏ":"G",
		"ഐ":"sF",
		"ഒ":"H",
		"ഓ":"Hm",
		"ഔ":"Hu",
		"ക":"I",
		"ഖ":"J",
		"ഗ":"K",
		"ഘ":"L",
		"ങ":"M",
		"ച":"N",
		"ഛ":"O",
		"ജ":"P",
		"ഝ":"Q",
		"ഞ":"R",
		"ട":"S",
		"ഠ":"T",
		"ഡ":"U",
		"ഢ":"V",
		"ണ":"W",
		"ത":"X",
		"ഥ":"Y",
		"ദ":"Z",
		"മ":"a",
		"യ":"b",
		"ര":"c",
		"റ":"d",
		"ല":"e",
		"ള":"f",
		"ഴ":"g",
		"വ":"h",
		"ശ":"i",
		"ഷ":"j",
		"സ":"k",
		"ഹ":"l",
		"ഞ്ഞ":"ª",
		"ബ്ബ":"º",
		"ർ":"À",    //special
		"റ്റ":"Á",
		"ൾ":"Ä",    //special
		"ള്ള":"Å",
		"വ്വ":"Æ",
		"ശ്ല":"Ç",
		"ശ്ശ":"È",
		"സ്ല":"É",
		"സ്സ":"Ê",
		"ഹ്ല":"Ë",
		"സ്റ്റ":"Ì",//special handling
		"ഡ്ഡ":"Í",
		"ക്ട":"Î",
		"ബ്ധ":"Ï",
		"ബ്ദ":"Ð",
		"ച്ഛ":"Ñ",
		"ന്ധ":"Ô",
		"ത്സ":"Õ",
		"ജ്ജ":"Ö",
		"സ്ഥ":"Ø",
		"ന്ഫ":"Ù",
		"ജ്ഞ":"Ú",
		"ത്ഭ":"Û",
		"ഗ്മ":"Ü",
		"ശ്ച":"Ý",
		"ണ്ഡ":"Þ",
		"ത്മ":"ß",
		"ക്ത":"à",
		"ഗ്ന":"á",
		"ന്റ":"â",//special
		"ഷ്ട":"ã",
		"റ്റ":"ä",
		"ണ്ട":"ï",
		"ൽ":"ð",//special
		"ല്ല":"ñ",
		"ന്മ":"ò",
		"ന്ന":"ó",
		"ഞ്ച":"ô",
		"ധ":"[",
		"ന":"\\",
		"പ":"]",
		"ഫ":"^",
		"ബ":"_",
		"ഭ":"`",
		"ക്ക":"¡",
		"ക്ല":"¢",
		"ക്ഷ":"£",
		"ഗ്ഗ":"¤",
		"ഗ്ല":"¥",
		"ങ്ക":"¦",
		"ങ്ങ":"§",
		"ച്ച":"¨",
		"ട്ട":"«",
		"ണ്മ":"×",
		"ൺ":"¬",
		"ണ്ണ":"®",
		"ത്ത":"¯",
		"ത്ഥ":"°",
		"ദ്ദ":"±",
		"ദ്ധ":"²",
		"ൻ":"³", //special
		"ന്ത":"´",
		"ന്ദ":"µ",
		"പ്പ":"¸",
		"പ്ല":"¹",
		"ബ്ല":"»",
		"മ്പ":"¼",
		"മ്മ":"½",
		"മ്ല":"¾",
		"യ്യ":"¿"
	},
	//Class name to be added for a non English character
	className:"mal-rev",
	//Node type that is wrapped for non English ACII character
	elementType:"span"
	}
	var config = $.extend({}, defaults, {});
	//Scratch pad variable for recursion
	var __index_=0;
	
	//To escape the characters
	var escapeRegExp = function (string) {
	  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}
	
	//Recursive Function To separate English and Non English
	//This function return the index of last consecutive Non-English character.
	var getLastAppearanceOfNonEnglishCharacter = function (index,strSource,isUnicode){
	  for (var i = index, n = strSource.length; i < n; i++) {
		if ((strSource.charCodeAt( i ) > 0x0D00 && strSource.charCodeAt( i ) < 0x0DFC) || 
		  $.inArray( strSource.charAt(i), ["‍","à"] ) > -1
		  ) { 
			return getLastAppearanceOfNonEnglishCharacter(i+1,strSource,true); 
		  } else {
			if ($.inArray( strSource.charAt(i),[" ", ".", ",","0","1","2","3","4","5","6","7","8","9","\r","\n"])>-1) {
			  if (isUnicode) {
				return getLastAppearanceOfNonEnglishCharacter(i+1,strSource,true); 
			  } else {
				return i;
			  }
			} else{
			  return i; 
			}          
		  }
	  }       
	}
	//To check if the given character is available. 
	//If available the the value in ASCII is returned.
	var getAvailableCharacter = function(singleCharacter){
	   var mSingle = config.alphabetslCharacters[singleCharacter];
	   if(!mSingle){
		mSingle = config.appendsVowelCharacters[singleCharacter];
		 if(!mSingle){
			mSingle = config.prependsVowelCharacters[singleCharacter];
			if(!mSingle){
				mSingle = config.wrapsVowelCharacters[singleCharacter];
			}
		 }
	   }
	   return  mSingle;
	}
	//To check if the given character is available except the Regular alphabets. 
	//If available the the value in ASCII is returned.
	var getSpecialCharaAvailable = function(singleCharacter){
		var mSingle = config.appendsVowelCharacters[singleCharacter];
		 if(!mSingle){
			mSingle = config.prependsVowelCharacters[singleCharacter];
			if(!mSingle){
				mSingle = config.wrapsVowelCharacters[singleCharacter];
			}
		 }
		return  mSingle;
	};
	
	//Recursive Function that find out a single non English character and then convert to Acsii
	var convertToNonEngilshAsciiSingleCharacter = function(inputString,index,UnicodeCharacter,AsciiCharacter){
		var Chara1 = UnicodeCharacter;
		i = index;
		n = inputString.length;
		outputString = "";
		var MalChara1 = AsciiCharacter; 
			if(i+1<n){
				var Chara2 = inputString[i+1];
				var MalChara2 = getSpecialCharaAvailable(Chara2); 
				if(MalChara2){
					//check if double chara
					if(Chara2=='്'){
						 if(i+2<n) {
							var Chara3 = inputString[i+2];
							var MalChara3 =  config.alphabetslCharacters[Chara3];
							var isHandled = false;
							 //special handling
							if(Chara3=='റ'){
								if(i+4<n &&   Chara1!='ന' && inputString[i+3] =='്' &&
									inputString[i+4]=='റ' ){
									//റ്റ
									var Char4_ = Chara1+Chara2+Chara3+inputString[i+3]+inputString[i+4];    
									var MalChara4_ = config.alphabetslCharacters[Char4_]; 
									if(MalChara4_){
										//recurcive check
									   outputString = convertToNonEngilshAsciiSingleCharacter(inputString,i+4,Char4_,MalChara4_);
										isHandled = true;
									} 
								}
							}
							//Special handling
							if(Chara1=='ന'){
								if(i+4<n && inputString[i+3] =='്' &&
									inputString[i+2]=='റ' && 
									inputString[i+4]=='റ'){
									var Char4__ = "ന്റ";    
									var MalChara4__ = config.alphabetslCharacters[Char4__]; 
									if(MalChara4__){
									  outputString = convertToNonEngilshAsciiSingleCharacter(inputString,i+4,Char4__,MalChara4__);
										isHandled = true;
									}
								}
							}
							if(isHandled==false){
								if(MalChara3){  
									var Char4 = Chara1+Chara2+Chara3;    
									var MalChara4 = config.alphabetslCharacters[Char4]; 
									if(MalChara4){
										//recurcive check
										outputString =convertToNonEngilshAsciiSingleCharacter(inputString,i+2,Char4,MalChara4);
										
									} else {
										if(Chara3=='ര'){
										  MalChara4 = config.raYaVaCharacters['ര'] + MalChara1;
										   //recurcive check
										  outputString = convertToNonEngilshAsciiSingleCharacter(inputString,i+2,Char4,MalChara4)
										  ;
										} else
										if(Chara3=='യ'){
											 MalChara4 =  MalChara1+config.raYaVaCharacters['യ'];
											//recurcive check
											outputString = convertToNonEngilshAsciiSingleCharacter(inputString,i+2,Char4,MalChara4);
										} else
										if(Chara3=='വ'){
											MalChara4 = MalChara1 + config.raYaVaCharacters['വ'] ;
											//recurcive check
											outputString = convertToNonEngilshAsciiSingleCharacter(inputString,i+2,Char4,MalChara4);
										} else{
										  outputString = MalChara1;
										  outputString += MalChara2;
										  __index_ = i+1;
										}
									}
								}else{
									if(Chara3=='‍'||Chara3=='à'){
										//For chillu
										if(Chara1=='ണ'){
											outputString = config.alphabetslCharacters["ൺ"];
											i=i+2;
											__index_ = i;
										} else if(Chara1=='ന'){
											outputString = config.alphabetslCharacters["ൻ"];
											i=i+2;
											__index_ = i;
										} else if(Chara1=='ര'){
											outputString = config.alphabetslCharacters["ർ"];
											i=i+2;
											__index_ = i;
										} else if(Chara1=='ള'){
											outputString = config.alphabetslCharacters["ൾ"];
											i=i+2;
											__index_ = i;
										} else if(Chara1=='ല'){
											outputString = config.alphabetslCharacters["ൽ"];
											i=i+2;
											__index_ = i;
										}else{
											outputString = MalChara1;
											outputString += MalChara2;
											outputString += "‍"
											i=i+2;
											__index_ = i;
										}
									}else{
										outputString = MalChara1;
										outputString += MalChara2;
										i=i+1;
										__index_ = i;
									}
								}
							}

						} else {
							outputString = MalChara1;
							outputString += MalChara2;
							i=i+1;
							__index_ = i;
						}
					} else {
						//check for append prepend etc
						if(MalChara2.length>1){
							outputString = MalChara2.replace("_", MalChara1);
						}else{
							outputString = MalChara1;
							outputString += MalChara2;
						}
						i=i+1;
						__index_ = i;
					}
				} else{
					 outputString = MalChara1;
					 __index_ = i;
				}
			}else{
				outputString = MalChara1;
				__index_ = i;
			} 
	 return outputString;
	}
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
	UniCodeToAsciiFont.configure = function(configValue){
		config = $.extend({}, defaults, configValue);
	}
	/*
    * Given string is converted to ASCII character.
    * @param {string} inputString: Provide only NonEnglish string.
    * @return {string} converted value in ASCII is returned.
    */
	UniCodeToAsciiFont.convertToNonEngilshAscii = function(inputString){
	   var outputString = "";
	   __index_ = 0;
		for(var i=0,n=inputString.length; i<n; i++)
		{
			var Chara1 = inputString[i];
			var MalChara1 = getAvailableCharacter(Chara1); 
			if(MalChara1){
				if(MalChara1.length>1)
					MalChara1 = MalChara1.replace("_", "");
			   outputString +=convertToNonEngilshAsciiSingleCharacter(inputString,i,Chara1,MalChara1);
			   i = __index_;
			} else{                
				outputString +=Chara1;
			}
		}
		return outputString;
	}
    /*
    * To convert from Unicode to ASCII.
    * @param {string} strSource: String that need to be changed.Mix of English and non English accepted
    * @return {string} converted value along with wrapped html element.
    */
	UniCodeToAsciiFont.convertFont = function(strSource) {    
	  var charMap= [];
	  var indexPointer = 0;
	  var outPointer = 0;
	  //zero width join hack
	  strSource = strSource.replace(new RegExp(escapeRegExp('&zwj;'), 'g'), 'à');//replace all
	  //Separating English and non English Character
	  //The numbers and characters like ',' '.' will be part of English or NonEnglish based on
	  //Character group before that.
	  while(outPointer<strSource.length){
		outPointer = getLastAppearanceOfNonEnglishCharacter(indexPointer,strSource);     
		if( indexPointer!=outPointer){
		  outPointer = outPointer == null ? strSource.length:outPointer;
		  charMap.push({'inputPointer':indexPointer,'outputPointer':outPointer});
		}
		indexPointer = outPointer+1;
	  }
	  //Convert and insert the elementType(span) over non English character.
	  //Class className(mal-rev) is used as the font-face identifier
	  for (var i = charMap.length-1; i > -1; --i) {
		strSource = strSource.substring(0,charMap[i].inputPointer)+
		  "<"+config.elementType+" class='"+config.className+"'>" +
		  UniCodeToAsciiFont.convertToNonEngilshAscii(strSource.substring(charMap[i].inputPointer,charMap[i].outputPointer))+
		  "</"+config.elementType+">"+
		strSource.substring(charMap[i].outputPointer);
	  }
	  return strSource;          
	}
}(UniCodeToAsciiFont = {}, jQuery));