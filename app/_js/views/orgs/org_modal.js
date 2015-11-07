var OrgModalView = function(data) {
    var
        modal = $c('div'),
        close = $c('button'),
        img = $c('img'),
        headline = $c('h2'),
        copy = $c('p'),
        shares = $c('div'),
        tweet = $c('button'),
        a = $c('a');

    modal.classList.add('modal', 'org');
    close.classList.add('close');
    img.classList.add('org_image');
    tweet.classList.add('social', 'twitter');
    shares.classList.add('org_shares');
    a.classList.add('org_link');

    img.src = data.org.photo_url;
    a.href = data.org.url;
    a.target = '_blank';

    close.textContent = '⨉';
    headline.textContent = data.org.name;
    copy.textContent = data.org.biography;
    tweet.textContent = 'Tweet this';
    a.textContent = data.org.url_label ? data.org.url_label : 'Click here for more info...';

    shares.appendChild(tweet);

    modal.appendChild(close);
    modal.appendChild(headline);
    modal.appendChild(img);
    modal.appendChild(copy);
    modal.appendChild(a);
    modal.appendChild(shares);

    return modal;

};
