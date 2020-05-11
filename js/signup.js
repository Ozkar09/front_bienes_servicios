$(document).ready(function() {

    $("#btnRegisterClient").click(function () {

        var nameClient = $("#nameClient").val();
        var lastNameClient = $("#lastNameClient").val();
        var passwordClient = $("#passwordClient").val();
        var checkPasswordClient = $("#checkPasswordClient").val();
        var emailClient = $("#emailClient").val();
        
        user = {
          email: emailClient,
          password: passwordClient,
          name: nameClient + " " + lastNameClient,
          profile: "CLIENT"
        }

        if (passwordClient != checkPasswordClient){
            alert("Las contraseñas no coinciden, ingreselas nuevamente");
        }else{
            registrarUsuario(user); 
        }
    })

    
    $("#btnRegisterSupplier").click(function () {

        var nameSupplier = $("#nameSupplier").val();
        var lastNameSupplier = $("#lastNameSupplier").val();
        var passwordSupplier = $("#passwordSupplier").val();
        var checkPasswordSupplier = $("#checkPasswordSupplier").val();
        var emailSupplier = $("#emailSupplier").val();
        
        user = {
          email: emailSupplier,
          password: passwordSupplier,
          name: nameSupplier + " " + lastNameSupplier,
          profile: "SUPPLIER"
        }

        if (passwordSupplier != checkPasswordSupplier){
            alert("Las contraseñas no coinciden, ingreselas nuevamente");
        }else{
            registrarUsuario(user); 
        }

    })


    function registrarUsuario(user){

        console.log("SI ENTRA Nombre= " + user.name + " password = " + user.password + " email = " + user.email + " profile = " + user.profile);

        if (user.name === "" || user.password === "" || user.email === ""){

            alert("Por favor diligencie el formulario completamente");

        }else{

            userCreated = {
                id: 1,
                email: user.email,
                password: user.password,
                name: user.name,
                profile: "CLIENT",
                items: null
            }

            var queryString = "?id=" + userCreated.id + "&email=" + userCreated.email + "&name=" + userCreated.name;

            $.ajax({
                type: "POST",
                url: 'http://localhost:8080/users',
                data: JSON.stringify(user),
                success: function(data) {
                    if (user.profile === "CLIENT") {
                        console.log("CLIENTE REGISTRADO" + data);
                        window.location.replace("../views/cliente.html" + queryString);
                    } else{
                        console.log("PROVEEDOR REGISTRADO" + data);
                        window.location.replace("../views/showquotes.html" + queryString);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("SE HA PRESENTADO UN ERROR AL REALIZAR EL REGISTRO")
                    alert("Se ha presentado un error al realizar el registro. Intente nuevamente.")
                },
                dataType: 'json',
                contentType: "application/json"
            });
        }
    }
})