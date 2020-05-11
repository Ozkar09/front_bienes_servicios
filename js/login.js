$(document).ready(function() {

	$("form").on("submit", function(e) {

    	e.preventDefault()
    	$email = $("#inputUsername")
    	$password = $("#inputPassword")

    	if ($email.val() === "" || $password.val() === "") {
      		alert("Por favor ingresa todos tus datos")
    	}
	    
	    userLogin = {
	      email: $email.val(),
	      password: $password.val()
	    }

	    $.ajax({
	      type: "POST",
	      url: 'http://localhost:8080/login',
	      data: JSON.stringify(userLogin),
	      success: function(data) {
	        
	        console.log(data);
            
            if (data.user.profile === "CLIENT") {
				var queryString = "?id=" + data.user.id + "&email=" + data.user.email + "&name=" + data.user.name;
            	window.location.replace("../views/showoffers.html" + queryString);
            } else{
            	var queryString = "?id=" + data.user.id + "&email=" + data.user.email + "&name=" + data.user.name;
            	window.location.replace("../views/showquotes.html" + queryString);
			}
	      },
	      error: function (xhr, ajaxOptions, thrownError) {
	      	console.log("SE HA PRESENTADO UN ERROR")
        	alert("Se ha presentado un error. Intente nuevamente.")
      	  },
	      dataType: 'json',
	      contentType: "application/json"
	    });
  	})
})