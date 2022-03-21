let saveBtn = $(".save-btn");
let entryArray = [];
onLoad();

saveBtn.click(function () {
    let parentRow = $(this).parent();
    let textValue = parentRow.find("textarea").val();
    console.log(textValue);

    let newEntry = new Entry(textValue, parentRow.attr("id"));
    console.log(newEntry);
    let oldEntries = entryArray.filter((obj) => {
        return obj.hour === newEntry.hour;
    });
    console.log(oldEntries);
    entryArray = entryArray.filter((obj) => !oldEntries.includes(obj));
    entryArray.push(newEntry);
    localStorage.setItem("entryArray", JSON.stringify(entryArray));
    console.log(entryArray);
});

function Entry(text, hour) {
    this.text = text;
    this.hour = hour;
}

function onLoad() {
    entryArray = JSON.parse(localStorage.getItem("entryArray"));
    entryArray = entryArray || [];
    if (entryArray.length > 0) {
        for (let i = 0; i < entryArray.length; i++) {
            let textField = $("#" + entryArray[i].hour).find("textarea");
            textField.val(textField.val() + entryArray[i].text + "\n");
        }
    }
    var day = dayjs().day();
    if (day == 0) day = "Sunday";
    else if (day == 1) day = "Monday";
    else if (day == 2) day = "Tuesday";
    else if (day == 3) day = "Wednesday";
    else if (day == 4) day = "Thursday";
    else if (day == 5) day = "Friday";
    else if (day == 6) day = "Saturday";
    let month = dayjs().month();
    if (month == 0) month = "January";
    else if (month == 1) month = "February";
    else if (month == 2) month = "March";
    else if (month == 3) month = "April";
    else if (month == 4) month = "May";
    else if (month == 5) month = "June";
    else if (month == 6) month = "July";
    else if (month == 7) month = "August";
    else if (month == 8) month = "September";
    else if (month == 9) month = "October";
    else if (month == 19) month = "June";
    else if (month == 11) month = "June";
    let dayOfMonth = dayjs().date();
    $("#currentDay").html(day + ", " + month + " " + dayOfMonth);
    let currentHour = dayjs().hour();
    $(".todo-input").each(function (i) {
        let rowHour = $(this).id;
        if (currentHour > rowHour) $(this).attr("time", "upcoming");
        else if (currentHour == rowHour) $(this).attr("time", "current");
        else $(this).attr("time", "past");
    });
}
