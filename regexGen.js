"use strict";

// for more details about regex elements- http://www.rexegg.com/regex-quickstart.html
var regexElements = {
    //indexing with number to avoid string as much as possible, for efficiency.
    0 : '\\d', 1 : '\\D', 2 : '\\w', 3 : '\\W', 4 : '\\s', 5 : '\\S', 6 : '.', 7:'\\', //characters
    8 : '+', 9 : '*', 10 : '?',  13 : function(count){return '{'+count+'}';},//quantifiers
    11 : '|', 12 : function(ptrn){return '('+this.ptrn+')';}, 13: function(serial){return '\\'+this.serial;}, // logic
};

function regex(first,middle,last){  //main regex object
    //must exist before desired
    this.firstPart = (first==='') ? '()':'('+first+')';  
    //desired part
    this.middlePart = (middle==='') ? '()':'('+middle+')';  
    //must exist after desired
    this.lastPart = (last==='') ? '()':'('+last+')';
    this.full = this.firstPart+this.middlePart+this.lastPart;
}

function analyzeSampleChar(char){
    if(char.charCodeAt(0) > 47 && char.charCodeAt(0) <58) return 0; //if sample have 0-9
    if(char.charCodeAt(0) > 64 && char.charCodeAt(0) < 91) return 2; //if sample have a capital letter
    if(char.charCodeAt(0) > 96 && char.charCodeAt(0) < 123) return 2; //if sample have a small letter
    return -1; //if sample have a special char
}

function genRgx(sample){
    if(typeof(sample)=='string' && sample.length > 0){
        sample = sample.trim();
        sample = sample.split("");
        var rawRgx=[],index;
        //replacing sample with regex elements, word by word
        for(var i=0;i<sample.length;++i){
            index = analyzeSampleChar(sample[i]);
            if(index===-1){rawRgx.push('\\'+sample[i]);continue;} //add to regex as it is 
            rawRgx.push(regexElements[index]); //new regex element
        }
        //console.log(rawRgx.toString());
        //1st analysis
        for(var i = 1, l = 0;i<rawRgx.length;){
            if(rawRgx[l] !== rawRgx[i])l=i++;
            if(rawRgx[l]===rawRgx[i]){
                if(rawRgx[l+1]==='+' || rawRgx[l+1]==='*') rawRgx.splice(i,1);
                else {rawRgx[i]=regexElements[8];++i;}
            }
        }
        //console.log(rawRgx.toString());
        var sRawRgx= rawRgx.join('');
        //return rawRgx;
        //console.log(sRawRgx);
        //return sRawRgx;
        return new regex('',sRawRgx,'');
    }
}