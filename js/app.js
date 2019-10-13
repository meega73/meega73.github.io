$(document).ready(function () {

    $('#ContactForm').click(function () {
        var email = $('#email').val()
        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        if ($('#name').val() == '') {
            alert('Please enter your name')
            return
        } else if (!validateEmail(email)) {
            alert('please enter valid email')
            return
        } else if ($('#message').val() == '') {
            alert('please enter Message')
            return
        }
        var data = {
            time: new Date(),
            name: $('#name').val(),
            email: $('#email').val(),
            message: $('#message').val()
        }
        $.ajax({
            url: "http://52.53.169.124:3000/contact/ccForm",
            data: JSON.stringify(data),
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (result) {
                if (result.msg == 'success') {
                    alert('Thank you!! we will get in touch with you')
                    $('#name').val("")
                    $('#email').val("")
                    $('#message').val("")
                }
            }
        })
    })

    function validations() {

    }
})