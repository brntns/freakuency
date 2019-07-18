'use strict';
var _ = require('lodash');
var debug = true;
var fs = require('fs');
var Jimp = require('jimp');

var width = 6650;
var minutemark = 3600;
var a1= {w:6650,h:8960*3};
var size = a1;
var onepage = 12160;
var count = 0;

var newMap = [];

function App(){
	this.posters = [];

};
var appBase = {
	loadPosters:function(){
		this.posters = fs.readFileSync('posters.json');  

	},
	create: function create() {


	},
	build: function build(){

		let rawdata = fs.readFileSync('map.json');  
		newMap= JSON.parse(rawdata); 

		for (var a = 0; a < 7 ;a++) {
			
			let image = new Jimp(size.w,size.h, function (err, image) {
				if (err) throw err;
				var	row = 0;
				var col = 0;
				for (var i = 0; i < newMap.length; i++) {

					if(col % width === 0  ){
						row = row+70;
						col = 0;
					}
					if(i % minutemark === 0 && i !== 0 ){
						for (var a = 0; a < 70 ; a++) {
							for (var u = 0; u < 70 ; u++) {
								image.setPixelColor(0xff0000,col+a,row+u);
							}
						}
					} else{
						var value = newMap[i];
						for (var x = 0; x < 70 ; x++) {
							for (var y = 0; y < 70 ; y++) {
								image.setPixelColor(newMap[i][count],col+x,row+y);
								// image.setPixelColor(Jimp.rgbaToInt(newMap[i][0], newMap[i][1], newMap[i][2], 255),col+x,row+y);
							}
						}
					}
					col = col+70
				}

				image.write('image'+count+'.png', (err) => {
					console.log('writing image');
					if (err) throw err;
				});
				count++;

			})
		}
	},
	
	makesum: function makesum(elmt){

		var sum = 0;
		var element =  Object.values(elmt);
		//	console.log(element);
		for( var i = 0; i < element.length; i++ ){
		//	console.log(elmt[i]);
		    sum += element[i]; //don't forget to add the base
		}

		var avg = sum/element.length;
		//sconsole.log(avg);
		return avg;
	}
};

var app = {};
_.extend(app, appBase);

App.prototype = app;
module.exports = App;
