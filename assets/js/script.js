let saveBtn = $(".save-btn");
saveBtn.click(function () {
    let textValue = $(this).parent().find("textarea").val();
    console.log(textValue);
});
