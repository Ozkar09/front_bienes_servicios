$(document).ready(function() {

	var queryString = decodeURIComponent(window.location.search);
	
	queryString = queryString.substring(1);
	var queries = queryString.split("&");
	
	supplier = {
		id: queries[0].replace("id=",""),
		email: queries[1].replace("email=",""),
		name: queries[2].replace("name=","")
	}

	var id_quote;

	$(document).on("click", "#btnSalir", function(e) {
		e.preventDefault()
	    
	    window.location.replace("../views/login.html");

	});

	$(document).on("click", "#btnTender", function(e) {
		e.preventDefault()
	    
	    var price = $("#price").val();
	    var offerDescription = $("#offerDescription").val();

	    if (price === "" || offerDescription === "") {
	    	alert("Por favor complete los datos de la oferta")
	    }else{
			
			offer = {
				"price": price,
				"description": offerDescription,
				"quotationId": id_quote,
				"supplierId": supplier.id
			}
			
			$.ajax({
				type: "POST",
		      	url: 'http://localhost:8080/offers',
		      	data: JSON.stringify(offer),
		      	success: function(data) {
		      		$('#offer').modal('hide');
	            	alert("Oferta Generada Satisfactoriamente");
	            	funcionVer();
		      	},
		    	error: function (xhr, ajaxOptions, thrownError) {
	        		alert("Se ha presentado un error. Intente nuevamente.")
	      	  	},
		      	dataType: 'json',
		      	contentType: "application/json"
		    });
	    }
	});

	$(document).on("click", ".offer", function(e) {
		e.preventDefault()
	    
	    id_quote = $(this).attr("id").replace("quote_", "")

	});

	var funcionVer = function() {
	var idSupplier = supplier["id"];
	var url = "http://localhost:8080/quotation/getBySupplier/" + idSupplier;

    $.ajax({
    	"method": "get",
    	"url": url,
      	"success": function(data) {
    		$("#tableQuote").empty()
        	data.forEach(function(cotizacion) {
          	$(`#tableQuote`).append(`<tr>
            	<td>${cotizacion.id}</td>
            	<td>${cotizacion.name}</td>
            	<td>${cotizacion.description}</td>
            	<td>${cotizacion.client.name}</td>
            	<td>${cotizacion.client.email}</td>
            	<td>
                	<p data-placement="top" data-toggle="tooltip" title="Offer"><button class="btn btn-primary btn-xs" data-title="Offer" data-toggle="modal" data-target="#offer" ><span class="glyphicon glyphicon-pencil"></span></button></p>
              	</td>
            </tr>`)
        })
      }
    })

  }
    
  funcionVer();

  $("[data-toggle=tooltip]").tooltip();

})