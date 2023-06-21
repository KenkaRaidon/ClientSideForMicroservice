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
            },
            {
              field: "last_name",
              title: "Apellido",
              align: "center",
              sortable: true,
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
      $("#customerCountry").get(0).options[0] = new Option("--Select--", "0");

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
        $("#customerCity").get(0).options[0] = new Option("--Select--", "0");

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

  $("#btnSubmmit")
    .button()
    .click(function () {
      $.ajax({
        async: false,
        url: "/saveCustomer",
        method: "POST",
        data: {
          storeId: "1",
          firstname: "Ronald",
          lastname: "McDonald",
          email: "ronald@gmail.com",
          addressId: "964",
          activebool: "1",
        },
        success: function (response) {
          console.log(response);
        },
      });
    });

  $("#btnOpenModalRegisterCustomer")
    .button()
    .click(function () {});
});
