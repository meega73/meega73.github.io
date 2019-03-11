$(document).ready(function () {

$(window).scroll(function(){
    if ($(window).scrollTop() >= 300) {
        $('#header').addClass('navbar-fixed-top');
        $('#caption').hide();
        
    }
    else {
        $('#header').removeClass('navbar-fixed-top');
        $('#caption').show();
        
    }
});

    // ===== Scroll to Top ==== 
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 50) { // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200); // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200); // Else fade out the arrow
        }
    });
    $('#return-to-top').click(function () { // When arrow is clicked
        $('body,html').animate({
            scrollTop: 0 // Scroll to top of body
        }, 500);
    });

$('#Automation').mouseover(function(){
    $('#whatContant').empty();
    $('#whatContant').append('We automate complex activities and make things easy to use so that you can concentrate on business growth.')
})
$('.hov').mouseleave(function(){
    $('#whatContant').empty();
    $('#includesContant').empty();
})
$('#Portability').mouseover(function(){
    $('#whatContant').empty();
    $('#whatContant').append('The software work from the cloud so you can visit the fields and do your office jobs.')
})
$('#Accessability').mouseover(function(){
    $('#whatContant').empty();
    $('#whatContant').append('Software can be accessed from any mobile device including your phone(We recomand Ipad/tablet devices for biginners)')
})
$('#Dashboard').mouseover(function(){
    $('#whatContant').empty();
    $('#whatContant').append('we visualise your business so you dont have the trouble to read and understand the data')
})

$('#Customers').mouseover(function(){
    $('#includesContant').empty();
    $('#includesContant').append('Create new customer and save all the documents and information')
})
$('#Jobs').mouseover(function(){
    $('#includesContant').empty();
    $('#includesContant').append('Configure jobs for the customer. Add trucks to dispatch. see previous jobs')
})
$('#Dispatch').mouseover(function(){
    $('#includesContant').empty();
    $('#includesContant').append('check all the previously Dispatched trucks. Add new trucks for a job. Assign Driver for the Dispatch.')
})
$('#Bill').mouseover(function(){
    $('#includesContant').empty();
    $('#includesContant').append('Create bill from the Job.')
})
$('#Invoice').mouseover(function(){
    $('#includesContant').empty();
    $('#includesContant').append('Invoice the bills by weekly or by job')
})
$('#Payables').mouseover(function(){
    $('#includesContant').empty();
    $('#includesContant').append('Track the working hours of the driver and store the payments ')
})
$('#Receivables').mouseover(function(){
    $('#includesContant').empty();
    $('#includesContant').append('Track invoices for the customers and post checks')
})
$('#HR').mouseover(function(){
    $('#includesContant').empty();
    $('#includesContant').append('Manage Employees information, hours, salaries and other HR related things')
})
$('#Drivers').mouseover(function(){
    $('#includesContant').empty();
    $('#includesContant').append('Develop an oracle of Drivers and pullers. managing information, statements, insurances and other dispatch blockers')
})


});