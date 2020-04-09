(function () {
    const form = $('.contact-form');


    form.submit(function (e) {
        e.preventDefault();

        fetch('/api/post/message', {
            method: 'POST',
            body: new FormData(this)
        })
            .then(result => {
                if(result.ok) return alert('Message sent');
                throw new Error(`Message not delivered: ${result.statusText}`)
            })
            .catch(err => console.log(err))
    })

})();