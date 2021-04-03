// Globally setting up our variables
var todaysDate = moment().format("DD-MM-YYYY");
var currentYear = moment().format("YYYY");
var listJan = $("#listJanuary");
var listFeb = $("#listFebruary");
var listMar = $("#listMarch");
var listApr = $("#listApril");
var listMay = $("#listMay");
var listJune = $("#listJune");
var listJuly = $("#listJuly");
var listAug = $("#listAugust");
var listSep = $("#listSeptember");
var listOct = $("#listOctober");
var listNov = $("#listNovember");
var listDec = $("#listDecember");
var holidayHolder = $("#holiday-holder");
var nextHoliday;
var min = 365;

// Connecting to Calendarific API with our API Key and Parameters
var apiKey = "4e543c39030cf814f23d6b0384c5df95bb916d89";
var apiURL =
  "https://calendarific.com/api/v2/holidays?&api_key=" +
  apiKey +
  "&country=US&year=" +
  currentYear +
  "&type=national,religious";
//  fetch calendarific data (console log to test)
function getCalendarAPI() {
  fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // Iterating through each holiday and retrieving its data, including the specific holiday and its date
      for (var i = 0; i < data.response.holidays.length; i++) {
        var listEl = $("<a>");
        listEl.text(
          moment(data.response.holidays[i].date.iso).format("MM/DD") +
            " - " +
            data.response.holidays[i].name
        );
        // Creating holiday list
        listEl.addClass("list-group-item");
        listEl.attr(
          "href",
          "./results.html?q=" + data.response.holidays[i].name
        );
        // Determining the closest upcoming holiday
        var month = data.response.holidays[i].date.datetime.month;
        console.log(month);
        if (month == 1) {
          listJan.append(listEl);
        } else if (month == 2) {
          listFeb.append(listEl);
        } else if (month == 3) {
          listMar.append(listEl);
        } else if (month == 4) {
          listApr.append(listEl);
        } else if (month == 5) {
          listMay.append(listEl);
        } else if (month == 6) {
          listJune.append(listEl);
        } else if (month == 7) {
          listJuly.append(listEl);
        } else if (month == 8) {
          listAug.append(listEl);
        } else if (month == 9) {
          listSep.append(listEl);
        } else if (month == 10) {
          listOct.append(listEl);
        } else if (month == 11) {
          listNov.append(listEl);
        } else if (month == 12) {
          listDec.append(listEl);
        }
        // Setting next holiday in collaboration with moment giving the current day
        var holidayDate = data.response.holidays[i].date.iso;
        var difference = moment(holidayDate).diff(moment(), "days");
        if (difference > 0 && difference < min) {
          min = difference;
          nextHoliday = data.response.holidays[i];
        }
      }
      $("#nextHoliday").text(nextHoliday.name);
      $("#daysTil").text(" " + min);
    });
}
// Calling the function to retrieve a needed data from the API
getCalendarAPI();
