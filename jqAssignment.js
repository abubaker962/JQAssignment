$(document).ready(function () {
    var dataTable = $('#ipAddressTable').DataTable();
    $('#ipAddressButton').on('click', function () {
        var ipAddress = $("#ipAddress").val();
        if (validateIpAddress(ipAddress)) {
            var url = "http://ip-api.com/json/" + ipAddress;
            $.get(url, function (data, status) {
                if (data.status) {
                    populateTable(data);
                } else {
                    showErrorMsg();
                }
            });
        } else {
            showErrorMsg();
        }
    });

    $('#ipAddress').keypress(function (event) {
        if (event.which != 46 && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    function validateIpAddress(ipaddress) {
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
            return true;
        } else {
            return false;
        }
    }

    function showErrorMsg() {
        $("#ipAddressForm").after("<p id='notValidpara'>IP Address is not Valid</p>");
        $("#notValidpara").addClass('notValidPara');
        setTimeout(function () {
            $("#notValidpara").hide();
        }, 2000);
    }
    
    function populateTable(row) {
        $('#ipAddressTable').DataTable().row.add([
            row.query,
            row.country,
            row.countryCode,
            '<a><i class="glyphicon glyphicon-trash"></i></a>'
        ]).draw(false);
    }

    $('#ipAddressTable tbody').on('click', '.glyphicon-trash', function () {
        dataTable.row($(this).parents('tr')).remove().draw();
    });
});