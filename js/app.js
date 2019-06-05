$(document).ready(function () {

    $('#ContactForm').click(function () {
        var email = $('#email').val()
        if ($('#name').val() == '') {
            alert('Please enter your name')
            return
        } else if ((!email.includes('@')) || (!email.includes('.com') && !email.includes('.net'))) {
            alert('please enter valid email')
            return
        } else if ($('#message').val() == '') {
            alert('please enter Message')
            return
        }
        alert($('#name').val() + ' ' + $('#email').val() + ' ' + $('#message').val())
        var data = {
            time: new Date(),
            name: $('#name').val(),
            email: $('#email').val(),
            message: $('#message').val()
        }
        $.ajax({
            url: "http://54.67.34.66:3000/contact/ccForm",
            data: JSON.stringify(data),
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (result) {
                if (result.msg == 'success') {
                    alert('Thank you!! we will get in touch with you')
                }
            }
        })
    })

    function validations() {

    }
})