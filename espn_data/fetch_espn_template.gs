//google app script, calls espn data and puts it in a google sheet, this should work for any espn api, but was test on golf

function fetch_espndata() {
// Sheets Info
  const ss = SpreadsheetApp.openById('{ID}'); //spreadsheet data is going into
  const sourceSheet = ss.getSheetByName('{source sheet name}'); //source sheet if you are pulling data
  const targetSheet = ss.getSheetByName('{target sheet name}'); //target sheet where data is copied
  const url = 'sports.core.api.espn.com';
  const endpoint = '/v2/sports/golf/leagues/'; //espn api endpoint
  var page_url = []; // array for pagninated URLs
  
var pagect_url = base_url + endpoint
      var response = UrlFetchApp.fetch(pagect_url);
      var json_response = response.getContentText();
      var data = JSON.parse(json_response);
      var pageCount = data.pageCount; // number of pages
      var numpage = data.pageSize; // number of items per page
  
      Logger.log(pageCount);
      Logger.log(numpage);

//create paginated urls
  for (let i = 0; i < pageCount; i++){
    var temp_url = base_url + endpoint + (i+1)
    page_url.push(temp_url)
  }

//fetch data from each paginated url and put in the target sheet

  for (let i = 0; i < numpage; i++) {
    var lastrow = targetSheet.getLastRow();
    Logger.log(lastrow);
    var response = UrlFetchApp.fetch(page_url[i]);
    var json_response = response.getContentText();
    var data = JSON.parse(json_response);
    const items = data.items;
    for (var j = 0; j < items.length; j++) {
      const row = items[j];
      targetSheet.getRange(j+1+lastrow, 1).setValue(row);
    }
  }

  
}
