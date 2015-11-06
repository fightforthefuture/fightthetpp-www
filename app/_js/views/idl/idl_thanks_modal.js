var IDLThanksModalView = function(data) {
    var
        modal = $c('div'),
        close = $c('button'),
        headline = $c('h2'),
        copy = $c('p'),
        span = $c('span'),
        a = $c('a'),
        img = $c('img');

    modal.classList.add('modal', '_call_modal');
    close.classList.add('close');

    close.textContent = '⨉';
    headline.textContent = 'Awesome! You\'re all set.';

    span.textContent = 'Thanks for joining the Internet Defense League! With your help we can create an unstoppable social force to fight the TPP! To learn more about the Internet Defense League, ';
    copy.appendChild(span);

    a.href = 'https://www.internetdefenseleague.org';
    a.target = '_blank';
    a.textContent = 'click here.';
    copy.appendChild(a);

    img.src = 'images/idl.png';
    img.classList.add('idl_logo');

    modal.appendChild(close);
    modal.appendChild(headline);
    modal.appendChild(img);
    modal.appendChild(copy);


    return modal;

};
