var OrgThanksModalView = function(data) {
    var
        modal = $c('div'),
        close = $c('button'),
        headline = $c('h2'),
        copy = $c('p'),
        span = $c('span'),
        a = $c('a');

    modal.classList.add('modal', 'org');
    close.classList.add('close');


    close.textContent = '⨉';
    headline.textContent = 'Thanks for signing up!';
    span.textContent = 'We\'ll reach out to you within the next 24 - 48 hours to verify your affiliation. If you have any questions, please email ';

    a.href = 'mailto:team@fightforthefuture.org';
    a.textContent = 'team@fightforthefuture.org';

    copy.appendChild(span);
    copy.appendChild(a);

    modal.appendChild(close);
    modal.appendChild(headline);
    modal.appendChild(copy);

    return modal;

};
