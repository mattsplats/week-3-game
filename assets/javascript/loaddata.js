//var loadData = {
//	data: [],
//	load: function(object) {
//		var badJson;
//		var correctJson;
//
//		for (var i = 0; i < object.feed.entry.length; i++) {
//			badJson = object.feed.entry[i].content.$t;
//			correctJson = "{" + badJson.replace(/(word|image(?=:))/g, '"$1"') + "}";
//			debugger;
//			this.data[i] = JSON.parse(correctJson);
//		}
//		console.log(this.data);
//	}
//}

window.onload = function() { init() };

  var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=0AmYzu_s7QHsmdDNZUzRlYldnWTZCLXdrMXlYQzVxSFE&output=html';

  function init() {
    Tabletop.init( { key: public_spreadsheet_url,
                     callback: showInfo,
                     simpleSheet: true } )
  }

  function showInfo(data, tabletop) {
    debugger;
    console.log(data);
 }

 console.log(Tabletop.data);