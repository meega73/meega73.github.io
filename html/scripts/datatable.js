$(document).ready(function(){
    $("#getdata").click(function(){
        alert("test");
        $.ajax({url: "http://localhost:3000/api/contacts", success: function(result){
            alert(result);
            console.log(result);
            $("#div1").html(result);
        }});
    });
});