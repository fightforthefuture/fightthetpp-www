var OrgSignupView = function(data) {
    var
        modal = $c('div'),
        close = $c('button'),
        headline = $c('h2'),
        copy = $c('p'),
        span = $c('span'),
        a = $c('a'),
        hr = $c('hr'),
        form = $c('form'),
        nameLabel = $c('label'),
        name = $c('input'),
        emailLabel = $c('label'),
        emailHint = $c('span'),
        email = $c('input'),
        statementLabel = $c('label'),
        statementHint = $c('span'),
        statement = $c('textarea'),
        linkLabel = $c('label'),
        link = $c('input'),
        tweetTextLabel = $c('label'),
        tweetTextHint = $c('span'),
        tweetText = $c('input'),
        categoryLabel = $c('label'),
        categoryList = $c('div'),
        imageLabel = $c('label'),
        image = $c('input'),
        imagePlaceholder = $c('img'),
        button = $c('button');

    modal.classList.add('modal', 'org');
    close.classList.add('close');

    close.textContent = '⨉';
    headline.textContent = 'Fight the TPP with your organization!';
    span.textContent = 'Please fill out this form to join the fight. We try to add new signups within 24-48 hours. If you have any questions or suggestions please email '

    a.href = 'mailto:team@fightforthefuture.org';
    a.textContent = 'team@fightforthefuture.org';

    nameLabel.textContent = 'Organization Name';
    form.appendChild(nameLabel);

    name.name = 'name';
    name.type = 'text';
    form.appendChild(name);

    emailLabel.textContent = 'Contact Email';
    form.appendChild(emailLabel);

    emailHint.textContent = 'We will contact you with campaign updates.';
    emailHint.className = 'hint';
    form.appendChild(emailHint);

    email.name = 'email';
    email.type = 'text';
    form.appendChild(email);

    statementLabel.textContent = 'TPP Statement';
    form.appendChild(statementLabel);

    statementHint.textContent = '500 characters or less. Please no HTML or links.';
    statementHint.className = 'hint';
    form.appendChild(statementHint);

    statement.name = 'biography';
    form.appendChild(statement);

    linkLabel.textContent = 'URL for more info';
    form.appendChild(linkLabel);

    link.name = 'url';
    link.type = 'text';
    form.appendChild(link);

    tweetTextLabel.textContent = 'Tweet text (optional)';
    form.appendChild(tweetTextLabel);

    tweetTextHint.textContent = 'We\'ll show a button to tweet this. Max 116 characters.';
    tweetTextHint.className = 'hint';
    form.appendChild(tweetTextHint);

    tweetText.name = 'tweet_text';
    tweetText.maxLength = 116;
    tweetText.type = 'text';
    form.appendChild(tweetText);

    categoryLabel.textContent = 'Categories';
    form.appendChild(categoryLabel);

    for (var i = 0; i < data.categories.length; i++) {
        var checkbox = $c('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'categories['+data.categories[i].id+']';
        checkbox.value = 1;
        checkbox.id = '_cat_cb_'+data.categories[i].id;
        categoryList.appendChild(checkbox);

        var label = $c('label');
        label.htmlFor = '_cat_cb_'+data.categories[i].id;
        label.textContent = data.categories[i].name;
        categoryList.appendChild(label);

        var br = $c('br');
        categoryList.appendChild(br);
    }

    categoryList.className = 'categories';
    form.appendChild(categoryList);

    imageLabel.textContent = 'Logo image';
    form.appendChild(imageLabel);

    image.type = 'file';
    image.name = 'image';
    form.appendChild(image);

    form.appendChild(imagePlaceholder);

    button.textContent = 'Submit';
    form.appendChild(button);

    copy.appendChild(span);
    copy.appendChild(a);
    modal.appendChild(close);
    modal.appendChild(headline);
    modal.appendChild(copy);
    modal.appendChild(hr);
    modal.appendChild(form);

    return modal;

};
