$(document).ready(function () {
  $.ajax({
    async: false,
    url: "/getCustomers",
    method: "GET",
    contentType: "application/json",
    success: function (data) {
      $("#example")
        .bootstrapTable("destroy")
        .bootstrapTable({
          data: data,
          cache: false,
          striped: true,
          pagination: true,
          search: true,
          showExport: false,
          minimumCountColumns: 1,
          columns: [
            {
              field: "customer_id",
              title: "ID",
              align: "center",
              sortable: true,
            },
            {
              field: "first_name",
              title: "Nombre",
              align: "center",
              sortable: true,
              formatter: (value, row, index, field) => {
                return row.first_name + " " + row.last_name;
              },
            },
            {
              field: "email",
              title: "Email",
              align: "center",
              sortable: true,
            },
          ],
        });
    },
  });

  /*$.ajax({
    async: false,
    url: "/customer/2",
    method: "GET",
    contentType: "application/json",
    success: function (data) {
      console.log(data);
    },
  });*/

  $.ajax({
    async: false,
    url: "/getCountries",
    method: "GET",
    contentType: "application/json",
    success: function (data) {
      $("#customerCountry").get(0).options.length = 0;
      $("#customerCountry").get(0).options[0] = new Option(
        "--Select Country--",
        ""
      );

      $.each(data, function (i, item) {
        //console.log(item.country)
        $("#customerCountry").get(0).options[
          $("#customerCountry").get(0).options.length
        ] = new Option(item.country, item.country_id);
      });
    },
  });

  $("#customerCountry").on("change", function () {
    $.ajax({
      async: false,
      url: "/getCityByCountryId/" + this.value,
      method: "GET",
      contentType: "application/json",
      success: function (data) {
        console.log(data);
        $("#customerCity").get(0).options.length = 0;
        $("#customerCity").get(0).options[0] = new Option(
          "--Select City--",
          ""
        );

        $.each(data, function (i, item) {
          //console.log(item.country)
          $("#customerCity").get(0).options[
            $("#customerCity").get(0).options.length
          ] = new Option(item.city, item.city_id);
        });
      },
    });
    //alert( this.value );
  });

  $.ajax({
    async: false,
    url: "/getStores",
    method: "GET",
    contentType: "application/json",
    success: function (data) {
      $("#customerStore").get(0).options.length = 0;
      $("#customerStore").get(0).options[0] = new Option(
        "--Select Store--",
        ""
      );

      $.each(data, function (i, item) {
        //console.log(item.country)
        $("#customerStore").get(0).options[
          $("#customerStore").get(0).options.length
        ] = new Option(item.name, item.store_id);
      });
    },
  });

  $("#registerClientForm").submit(function (e) {
    e.preventDefault();
    $.ajax({
      async: false,
      url: "/saveCustomer",
      method: "POST",
      data: {
        firstname: $("#customerName").val(),
        lastname: $("#customerLastName").val(),
        email: $("#customerEmail").val(),
        phone: $("#customerPhone").val(),
        city: $("#customerCity option:selected").val(),
        address: $("#customerAddress").val(),
        postalCode: $("#customerPostalCode").val(),
        storeId: $("#customerStore option:selected").val(),
      },
      success: function (response) {
        console.log(response);
        location.reload();
      },
    });
  });

  $("#btnSubmmit")
    .button()
    .click(function () {});

  $("#btnOpenModalRegisterCustomer")
    .button()
    .click(function () {
      $("#registerClientForm").trigger("reset");
    });
});
