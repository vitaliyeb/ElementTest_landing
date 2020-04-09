(function () {
    const burgerButton = $('.burger-button');
    const navigate = $('.header-navigate');

    burgerButton.click(function () {
        $(this).toggleClass('burger-button_active');
        navigate.toggleClass('header-navigate_active')
    });
})();