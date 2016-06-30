var IDLModalView = function(data) {
    var
        modal = $c('div'),
        close = $c('button'),
        headline = $c('h2'),
        copy = $c('p'),
        form = $c('form'),
        input = $c('input'),
        button = $c('button');

    modal.classList.add('modal', '_call_modal');
    close.classList.add('close');

    close.textContent = '⨉';
    headline.textContent = 'Add your Twitter account to fight the TPP!';
    copy.textContent = 'The TPP is backed by the most well-funded corporate lobbyists in the world. Help create a critical mass of people to fight back! Connect your Twitter account to automatically blast the Internet Defense League\'s anti-TPP tweets. You can unsubscribe at any time.';

    button.type = 'submit';
    button.textContent = 'Join with Twitter';
    button.classList.add('idl_authorize');

    form.appendChild(button)

    modal.appendChild(close);
    modal.appendChild(headline);
    modal.appendChild(copy);
    modal.appendChild(form);

    return modal;

};
