
(function (window, $) {
    "use strict";

    window.history.pushState("object or string", "Title", "/" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split("?")[0]);

    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    })


    /*==================================================================
    [ Login ]*/
    var input = $('.validate-input .input100');
    $('.validate-form .login100-form-btn').click(() => {
        var lenInput = input.length;
        var check = true;
        var username = "";
        var password = "";
        for (var i = 0; i < lenInput; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }
        if (check) {
            username = $('.username').val();
            password = $('.password').val();
            var data = {};
            data.username = username;
            data.password = password;
            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: 'http://192.168.1.2:3000/v1/login',
                success: (data, textStatus) => {
                    window.location.replace(window.location.protocol + "//" + window.location.host + data.redirect);
                },
                statusCode: {
                    200: (res) => {
                        console.log('Login successful.');
                    },
                    400: (res) => {
                        alert("Login unsuccessful. Try again?");
                    }
                }
            });

        }
        return check;
    });
    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function () {
        if (showPass == 0) {
            $(this).next('input').attr('type', 'text');
            $(this).addClass('active');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type', 'password');
            $(this).removeClass('active');
            showPass = 0;
        }
    });
})(window, jQuery);