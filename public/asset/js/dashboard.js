let table = document.getElementById("datatable");
resetForm();
if (table) {
    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            tableText(this);
            document.getElementById("btnSimpan").disabled = false;
            document.getElementById("btnHapus").disabled = false;
            document.getElementById("btnCancel").disabled = false;
            document.getElementById("judulForm").innerHTML = "Silahkan Edit atau Hapus Data";
        };
    }
}

function tableText(tableRow) {
    let name = tableRow.cells[2].innerHTML;
    let username = tableRow.cells[3].innerHTML;
    let email = tableRow.cells[4].innerHTML;

    let id = tableRow.cells[1].innerHTML;
    document.getElementById("nama").value = name;
    document.getElementById("username").value = username;
    document.getElementById("email").value = email;

    document.querySelector("#btnHapus a").href = "/users/delete/" + id;
    document.getElementById("form").action = "/users/update/" + id;
    togleInput(false);

}

function togleInput(val) {
    let input = document.getElementsByTagName("input");
    for (var i = 0; i < input.length; i++) {
        input[i].disabled = val;
    }
}

function resetForm() {
    document.getElementById("nama").value = "";
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("btnHapus").href = "";
    document.getElementById("form").action = "";
    document.getElementById("btnSimpan").disabled = true;
    document.getElementById("btnHapus").disabled = true;
    document.getElementById("btnCancel").disabled = true;
    togleInput(true);

}

function setFormTambah() {
    resetForm();
    document.getElementById("judulForm").innerHTML = "Silahkan Tambah Data";
    document.getElementById("form").action = "/users";
    document.getElementById("btnSimpan").disabled = false;
    document.getElementById("btnHapus").disabled = true;
    document.getElementById("btnCancel").disabled = false;
    togleInput(false);
}