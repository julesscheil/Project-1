// Psuedocode
// 1. Set up moment
var todaysDate = moment().format("DD-MM-YYYY");
var currentYear = moment().format("YYYY");
var holidayList = $("#holidayList");
var holidayHolder = $("#holiday-holder");
var nextHoliday;
var min = 365;

// 2. fetch calendarific data (console log to test)
var apiKey = "4e543c39030cf814f23d6b0384c5df95bb916d89";
var apiURL =
  "https://calendarific.com/api/v2/holidays?&api_key=" +
  apiKey +
  "&country=US&year=" +
  currentYear +
  "&type=national,religious";
function getCalendarAPI() {
  fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.response.holidays[0].name);
      console.log(data.response.holidays[0].date.iso);

      for (var i = 0; i < data.response.holidays.length; i++) {
        var listEl = $("<a>");
        listEl.text(
          data.response.holidays[i].name +
            " " +
            data.response.holidays[i].date.iso
        );
        listEl.addClass("list-group-item");
        listEl.attr(
          "href",
          "./results.html?q=" + data.response.holidays[i].name
        );
        holidayList.append(listEl);
        var holidayDate = data.response.holidays[i].date.iso;
        var difference = moment(holidayDate).diff(moment(), "days");
        console.log(difference);
        if (difference > 0 && difference < min) {
          min = difference;
          nextHoliday = data.response.holidays[i];
        }
      }
      console.log(nextHoliday);
      $("#nextHoliday").text(nextHoliday.name);
      $("#daysTil").text(" " + min);
    });
}
// function getNextHoliday() {

// }

getCalendarAPI();

// 3. click event for submit button
// 4. access calendar data
// 5. Append upcoming holidays to front page list
