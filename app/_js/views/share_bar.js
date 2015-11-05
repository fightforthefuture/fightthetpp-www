var ShareBarView = function (data) {
    var
        frag = document.createDocumentFragment(),
        logo = $c('a'),
        action = $c('button'),
        tweet = $c('button'),
        hr = $c('hr'),
        share = $c('button');

    logo.href = 'https://www.fightforthefuture.org';
    logo.className = 'logo';
    logo.target = '_blank';
    frag.appendChild(logo);

    action.textContent = 'Take Action';
    action.className = 'action';
    frag.appendChild(action);

    tweet.className = 'share twitter';
    frag.appendChild(tweet);

    frag.appendChild(hr);

    share.className = 'share facebook';
    frag.appendChild(share);

    return frag;
};
