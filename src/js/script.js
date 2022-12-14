$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        draggable: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrows/arrL.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrows/arrR.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false,
                    draggable: true
                }
            }
        ]
    })

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault()
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal

    $('[data-modal="consultation"]').on('click', function() {
        $('.overlay, #consultation').fadeIn('fast');
    });
    $('.modal-window__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('fast');
    });
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal-window__description').text($('.catalog-item__subtitle').eq(i).text());
            console.log($('catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('fast');
        })
    });

    function validateForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required:  '????????????????????, ?????????????? ???????? ??????',
                    minlength: jQuery.validator.format('?????????????? ?????? ?????????????? {0} ??????????????')
                },
                phone: '????????????????????, ?????????????? ???????? ?????????? ????????????????',
                email: {
                    required: '????????????????????, ?????????????? ???????? ??????????',
                    email: '?????????????????????? ???????????? ?????????? ??????????'
                }
            }
        });
    };

    validateForm('#consultation form');
    validateForm('#order form');
    validateForm('#consultation-form');

    $('input[name=phone]').mask('+375 (99) 999-99-99');

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize()
        }).done(function() {
            $(this).find('input').val('');
            $('#consultation, #order').fadeOut('fast');
            $('.overlay, #thanks').fadeIn('fast');

            $('form').trigger('reset');
        });
        return false;
    });

    // pageup and smooth scroll

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1000) {
            $('.pageup').fadeIn('fast');
        } else {
            $('.pageup').fadeOut('fast');
        }
    });

    // wow

    new WOW().init();
});