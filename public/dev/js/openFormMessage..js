(function () {
    const form          = $('.contact-form');
    const modalForm     = $('.modal-form');
    $('#open-modal-form, .modal-form').click(function (e) {
        if(e.target !== this) return;
        modalForm.toggleClass('modal-form_active');

    })
})();