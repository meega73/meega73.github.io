$(document).ready(function() {

    $("#signin").click(function(){
        var userpass=$("#password").val();
        var signinDetails = {
            email :  $("#email").val(),
            password: $("#password").val(),
            status: "active"
        }
        $.ajax({
            url: "http://localhost:3000/user/signin", 
            data: JSON.stringify(signinDetails),
             type: 'post',
            dataType: 'json',
            contentType: 'application/json',    
            success: function(result){
                console.log(result);
                if(result.length>0){
                    var dbPassword=result[0].password;
                    if(userpass == dbPassword){
                    localStorage.setItem('username',result[0].user_name);
                   localStorage.setItem('email',result[0].email);
                    window.location.href = 'Dashboard.html';
                    }
                    else{
                        alert('UserId and Password mismatch');
                    }
                }else{
                    alert("You  don't have Account!! Please Sign up");
                }
            }
        });
       });
    $("#signup").click(function(){
        var signUpDetails = {
            username :  $("#userName").val(),
            email : $("#email").val(),
            password:$("#password").val(),
            status:"active"
        }
        $.ajax({
            url: "http://localhost:3000/user/signup", 
            data: JSON.stringify(signUpDetails),
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',    
            success: function(result){
                console.log(result);
            alert('Account Created successfully!! Redirecting to Login Page');
            //localStorage.setItem("username",result[0].user_name);
                  //  localStorage.setItem("email",result[0].email);
                    window.location.href = 'signin.html';
            }
        });
        
        localStorage.setItem("username",result.username);
       });

       

});
