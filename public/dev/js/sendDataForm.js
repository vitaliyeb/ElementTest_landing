(function () {
    const form = $('.contact-form');
    const warningMessage = $('.contact-form__warning');

    function createWarning(text){
        warningMessage.addClass('contact-form__warning_active');
        warningMessage.text(text);
    }

    form.submit(function (e) {
        e.preventDefault();
        let formData = new FormData(this);

        for( let name of formData){
            if(name[1].replace(/\s+/g,'') === '') return createWarning(`Fill in the field ${name[0]}`);
        }
        warningMessage.removeClass('contact-form__warning_active');

        fetch('/api/post/message', {
            method: 'POST',
            body: formData
        })
            .then(result => {
                if(result.ok) return alert('Message sent');
                throw new Error(`Message not delivered: ${result.statusText}`)
            })
            .catch(err => createWarning(err))
    })

})();