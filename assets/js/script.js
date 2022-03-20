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
}
