function countChars(obj) {
    var maxLength = 235;
    var strLength = obj.value.length;
    var charRemain = (maxLength - strLength);

    if (charRemain < 0) {
        document.getElementById("charNum").innerHTML = '<span style="color: red;">You have exceeded the limit of ' + maxLength + ' characters</span>';
    } else {
        document.getElementById("charNum").innerHTML = charRemain + ' characters remaining';
    }
}

function store() {
    var inputkavithai = document.getElementById("kavithai");
    if (inputkavithai == 0 || inputkavithai == null) {
        console.log('Empty input');
    } else {
        localStorage.setItem("kavithai", inputkavithai.value);
        console.log('Stored in Local Storage');
    }
}

function restoreOptions() {
    var get_kavithai = localStorage.getItem("kavithai");
    var data_field = document.getElementById("kavithai");
    if (data_field != null) {
        data_field.value = get_kavithai;
    }
}
document.addEventListener('DOMContentLoaded', restoreOptions);