$(function () {
  $("#e").focus();

  $("#form-login").validate({
    rules: {
      "data[email]": "required",
      "data[password]": "required",
    },
    messages: {
      "data[email]": "Please enter email",
      "data[password]": "Please enter password",
    },
  });
  $(".login").click(function () {
    var validator = $("#form-login").validate();
    validator.form();
    if (validator.form() == true) {
      var data = new FormData($("#form-login")[0]);
      console.log(data);
      $.ajax({
        url: "database/loginAction.php",
        type: "POST",
        cache: false,
        data: data,
        processData: false,
        contentType: false,
        success: function (result) {
          var obj = jQuery.parseJSON(result);
          if (obj.status == "1") {
            Swal.fire({
              icon: "success",
              title: "Login...",
              text: obj.message,
            });
            setTimeout(function () {
              window.location.href = "dashboard.php";
            }, 1000);
            $(".login").removeAttr("disabled");
          } else {
            Swal.fire({
              icon: "error",
              title: "Error...",
              text: obj.message,
            });
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          // alert('Error at add data');
        },
      });
    }
  });
});
