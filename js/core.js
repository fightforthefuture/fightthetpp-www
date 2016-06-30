/*
 @licstart  The following is the entire license notice for the
    JavaScript code in this page.

 Copyright (C) 2015 Fight for the Future

 The JavaScript code in this page is free software: you can
 redistribute it and/or modify it under the terms of the GNU
 General Public License (GNU GPL) as published by the Free Software
 Foundation, either version 3 of the License, or (at your option)
 any later version. The code is distributed WITHOUT ANY WARRANTY;
 without even the implied warranty of MERCHANTABILITY or FITNESS
 FOR A PARTICULAR PURPOSE. See the GNU GPL for more details.

 As additional permission under GNU GPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 @licend  The above is the entire license notice
    for the JavaScript code in this page.
*/
util.scrollToTop = function(scrollDuration) {
    var
        scrollHeight = window.scrollY,
        scrollStep = Math.PI / ( scrollDuration / 15 ),
        cosParameter = scrollHeight / 2;
    var
        scrollCount = 0,
        scrollMargin,
        scrollInterval = setInterval(function() {
            if ( window.scrollY != 0 ) {
                scrollCount = scrollCount + 1;
                scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
                window.scrollTo( 0, ( scrollHeight - scrollMargin ) );
            }
            else clearInterval(scrollInterval);
        }, 15);
}

;var IDLModalController = BaseShareModalController.extend({

    events: {
        'submit form': 'newIDLSignup'
    },

    init: function() {
        this.render();
        this.show();
    },

    render: function() {
        var overlay = this.base_render();

        overlay.firstChild.appendChild(IDLModalView({}));

        this.html(overlay);
    },

    newIDLSignup: function(e) {
        e.preventDefault();
        var url = 'https://mothership-js.fightforthefuture.org/connect/twitter?tag=tpp';
        var properties = 'width=600,height=500,toolbar=no,status=no,menubar=no';

        window.open(url, 'idl_connect', properties);
    }
});

;var IDLThanksModalController = BaseShareModalController.extend({

    init: function() {
        this.render();
        this.show();
    },

    render: function() {
        var overlay = this.base_render();

        overlay.firstChild.appendChild(IDLThanksModalView({}));

        this.html(overlay);
    }
});

;var OrgController = Composer.Controller.extend({
    elements: {
        'img': 'img'
    },

    events: {
        'click': 'clicked'
    },

    model: null,
    tag: 'li',

    init: function() {
        this.render();
        this.loadImage();

        this.with_bind(this.model, 'fade', this.fadeOut.bind(this));
    },

    render: function() {
        var div = OrgView({
            org: this.model.toJSON()
        });
        this.html(div);
    },

    loadImage: function() {
        var img = new Image()
        img.src = this.model.get('photo_url');
        img.onload = function() {
            this.img.className = 'visible';
        }.bind(this);
    },

    clicked: function(e) {
        new OrgModalController({
            model: this.model
        });
    },

    fadeOut: function(e) {
        this.img.classList.remove('visible');
    }
});

;var OrgListController = Composer.Controller.extend({
    elements: {
        'div.orgs': 'orgs',
        'ul.tabs': 'tabs'
    },

    events: {
        'click .tabs li': 'filter'
    },

    collection: null,
    categories: null,
    page: 1,

    init: function() {
        this.render();

        new Composer.ListController({
            collection: this.collection,
            tag: 'ul',
            inject: this.orgs,
            init: function() {
                this.track(this.collection, function(model, options) {
                    return new OrgController({
                        inject: this.el,
                        model: model
                    });
                }.bind(this), {bind_reset: true})
            }
        });

        setTimeout(function() {
            this.el.classList.add('visible');
        }.bind(this), 500);
    },

    render: function() {
        var div = OrgListView({
            categories: this.categories,
        });
        this.html(div);
    },

    filter: function(e) {
        this.page = 1;
        var id = e.target.id.substr(9);
        var models = this.collection.models();
        var fadeComplete = false;
        var res = null;

        var tabs = this.tabs.querySelectorAll('li');
        for (var i = 0; i < tabs.length; i++)
            if (tabs[i].id != '_org_cat_'+id)
                tabs[i].classList.remove('sel');
            else
                tabs[i].classList.add('sel');

        if (!id)
            tabs[0].classList.add('sel');


        var checkFinishedAnimating = function() {
            if (fadeComplete && res)
                this.collection.reset(res.rows);
        }.bind(this);

        setTimeout(function() {
            fadeComplete = true;
            checkFinishedAnimating();
        }, 500);

        for (var i = 0; i < models.length; i++)
            models[i].trigger('fade');

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                res = JSON.parse(xhr.response);
                console.log('UPDATE: ', res);
                checkFinishedAnimating();
            }
        }.bind(this);
        xhr.open("get", 'https://fightthetpp-api.herokuapp.com/orgs/20/1/'+id, true);
        xhr.send();
    }

});

;var OrgModalController = BaseModalController.extend({

    model: null,
    events: {
        'click .twitter': 'tweet'
    },

    init: function() {
        this.render();
        this.show();
    },

    render: function() {
        var overlay = this.base_render();

        overlay.firstChild.appendChild(OrgModalView({
            org: this.model.toJSON()
        }));

        this.html(overlay);
    },

    tweet: function() {
        util.tweet(this.model.get('tweet_text') ? this.model.get('tweet_text') : '');
    }
});

;var OrgSignupController = BaseModalController.extend({

    elements: {
        'input[name="name"]': 'name',
        'input[name="email"]': 'email',
        'textarea': 'biography',
        'input[name="url"]': 'url',
        'input[name="tweet_text"]': 'tweet_text',
        'div.categories': 'categories',
        'input[name="image"]': 'imageInput',
        'img': 'imagePlaceholder',
        'form button': 'submitButton'
    },

    events: {
        'change input[type=file]': 'handleFile',
        'submit form': 'submit'

    },

    imgData: null,

    init: function() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var res = JSON.parse(xhr.response);
                console.log('api response: ', res);

                this.render(res);
                this.show();


            }
        }.bind(this);
        xhr.open("get", ORG_API_BASE_URL+'/categories', true);
        xhr.send();
    },

    render: function(categories) {
        var overlay = this.base_render();

        overlay.firstChild.appendChild(OrgSignupView({categories: categories}));

        this.html(overlay);
    },

    handleFile: function() {
        if (this.imageInput.files && this.imageInput.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                this.imgData = e.target.result;
                this.imagePlaceholder.src = e.target.result;
            }.bind(this)

            reader.readAsDataURL(this.imageInput.files[0]);
        }
    },

    getBase64ImgData: function() {
        var imgData = this.imgData;
        if (imgData)
            return imgData.replace(/^data:image\/(png|jpg|jpeg);base64,/,"");
        else
            return;
    },

    submit: function(e) {

        this.submitButton.disabled = true;

        e.preventDefault();

        var data = new FormData();

        data.append('name', this.name.value);
        data.append('email', this.email.value);
        data.append('biography', this.biography.value);
        data.append('url', this.url.value);
        data.append('tweet_text', this.tweet_text.value);

        var categories = this.categories.querySelectorAll('input');

        for (var i = 0; i < categories.length; i++)
            if (categories[i].checked)
                data.append(categories[i].name, 1)

        var imgData = this.getBase64ImgData();
        if (imgData)
            data.append('photo_data', imgData);

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4)
            {
                var response = JSON.parse(xhr.response);

                console.log('RESPONSE: ', response);

                if (response.error) {
                    this.submitButton.disabled = false;
                    return alert(response.error);
                }

                this.hide();
                new OrgThanksModalController();
            }
        }.bind(this);
        xhr.open("post", ORG_API_BASE_URL + '/orgs', true);
        xhr.send(data);
    }
});

;var OrgThanksModalController = BaseModalController.extend({

    model: null,
    events: {
    },

    init: function() {
        this.render();
        this.show();
    },

    render: function() {
        var overlay = this.base_render();

        overlay.firstChild.appendChild(OrgThanksModalView());

        this.html(overlay);
    }
});

;var ShareBarController = Composer.Controller.extend({
    elements: {
    },

    events: {
        'click button.action': 'scrollToTop'
    },

    init: function() {
        this.render();
        window.addEventListener('scroll', this.scrollListener.bind(this));
    },

    render: function() {
        var content = ShareBarView({});
        this.html(content);
    },

    scrollListener: function() {
        var petition1 = document.getElementById('petition1');

        if (!petition1)
            return;

        var bounds = petition1.getBoundingClientRect();

        if (!bounds || typeof bounds.bottom == 'undefined')
            return;

        if (bounds.bottom <= 0)
            this.el.classList.add('visible');
        else
            this.el.classList.remove('visible');
    },

    scrollToTop: function() {
        util.scrollToTop(500);
        setTimeout(function() {
            window.location.hash = '';
        }, 500);
    }
});

;/**
    Org Model
**/
var Org = Composer.Model.extend({

});

/**
    Orgs Collection
**/
var Orgs = Composer.Collection.extend({

});

;var IDLModalView = function(data) {
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

;var IDLThanksModalView = function(data) {
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

;var OrgView = function (data) {
    var
        frag = document.createDocumentFragment(),
        img = $c('img');

    img.src = data.org.photo_url;
    frag.appendChild(img);

    console.log(data.org);

    return frag;
};

;var OrgListView = function (data) {
    var
        frag = document.createDocumentFragment(),
        ul = $c('ul'),
        orgs = $c('div'),
        li1 = $c('li'),
        hint = $c('div'),
        line1 = $c('span'),
        br = $c('br'),
        line2 = $c('span'),
        add = $c('div'),
        addBlurb = $c('span'),
        addLink = $c('a');

    ul.className = 'tabs'
    li1.textContent = 'All';
    li1.className = 'sel';
    ul.appendChild(li1);

    for (var i=0; i < data.categories.length; i++) {
        var li = $c('li');
        li.textContent = data.categories[i].name;
        li.id = '_org_cat_' + data.categories[i].id;
        ul.appendChild(li);
    }

    frag.appendChild(ul);

    hint.className = 'hint';
    line1.textContent = 'Click any of the issue areas to see which organizations are standing against the TPP and why. ';
    line2.textContent = 'Or, click an individual logo to see why that organization opposes the TPP.';
    hint.appendChild(line1);
    hint.appendChild(br);
    hint.appendChild(line2);
    frag.appendChild(hint);

    orgs.className = 'orgs';
    frag.appendChild(orgs);

    add.className = 'add';
    addBlurb.textContent = 'Want to add your group to this list? ';
    add.appendChild(addBlurb);

    addLink.textContent = 'Click here.';
    addLink.href = '#signup';
    add.appendChild(addLink);

    frag.appendChild(add);

    return frag;
};

;var OrgModalView = function(data) {
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

;var OrgSignupView = function(data) {
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

;var OrgThanksModalView = function(data) {
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

;var ShareBarView = function (data) {
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

;var ORG_API_BASE_URL = 'https://fightthetpp-api.herokuapp.com';
//var ORG_API_BASE_URL = 'http://metacube:9000';


(function (doc, win) {
    "use strict";

window.DONATE_URL = 'https://donate.fightforthefuture.org/?tag=fightthetpp';

var spawnPetition = function(i) {
    if ($el('petition'+i))
        new EmailPetitionController({
            el: '#petition'+i,
            disclosureEl: '#disclosure'+i,
            subject: 'Please vote NO on the TPP',
            page_id: 'fightthetpp',
            required: ['email', 'zip', 'first_name', 'address1'],
            buttonText: 'Take Action',
            orgs: {
                fftf: '<a href="https://www.fightforthefuture.org" target="_blank">Fight for the Future</a> will email you with campaign updates. <a href="https://www.fightforthefuture.org/privacy" target="_blank">Privacy</a>'
            },
            onSend: function(formData)
            {
                $el('thanks'+i).style.display = 'block';
                new CallModalController({
                    headline:   'Can you call Congress to #FightTheTPP?',
                    campaign:   'stop-tpp-2',
                    cta:        'Congress needs to understand that the TPP is a dirty deal for the 1%. Enter your phone number and we\'ll call and connect you to Congress.',
                    callScript: 'Please vote against the TPP trade deal, and do not allow Congress to push this through during the lame duck session. I\'m watching this issue closely and hope you\'ll make the right decision.',
                    shareText:  'We\'re up against some of the most powerful corporate lobbyists in the country, but that hasn\'t stopped us before. If a critical mass of citizens speak out against the TPP, our voices will be impossible to ignore.',
                });
            }
        });
}
spawnPetition(1);

if ($el('org-count')) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var res = JSON.parse(xhr.response);
            console.log('api response: ', res);

            $el('org-count').textContent = res.count;

            new OrgListController({
                el: '#org_list',
                categories: res.categories,
                collection: new Orgs(res.rows)
            });
        }
    };
    xhr.open("get", ORG_API_BASE_URL+'/orgs/20/1/', true);
    xhr.send();
}

var idl = $el('idl_signup');
if (idl) {
    idl.addEventListener('click', function() {
        new IDLModalController();
    });
}

var nav = document.querySelector('nav');
if (nav) {
    new ShareBarController({
        el: nav
    });
}

if (util.getParameterByName('idl'))
    new IDLThanksModalController();

if (util.getParameterByName('showOrgs'))      // JL HACK ~ remove when orgs live
    $el('JL-HACK').style.display = 'block';   // JL HACK ~ remove when orgs live

var hashChange = function () {
    if (window.location.hash == '#signup')
        new OrgSignupController();
    else if (window.location.hash != '#' && window.location.hash != '')
        if (document.getElementById(window.location.hash.substr(1)))
            setTimeout(function() {
                var doc = document.documentElement;
                var top = (window.pageYOffset || doc.scrollTop)-(doc.clientTop || 0);
                scrollTo(0, top-40);
            }, 10);
}
window.onhashchange = hashChange;
hashChange();

})(document, window);

//# sourceMappingURL=core.js.map