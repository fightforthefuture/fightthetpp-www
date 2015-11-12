var ORG_API_BASE_URL = 'https://fightthetpp-api.herokuapp.com';
//var ORG_API_BASE_URL = 'http://metacube:9000';

(function (doc, win) {
    "use strict";

window.DONATE_URL = 'https://donate.fightforthefuture.org/?tag=fightthetpp';

var spawnPetition = function(i) {
    if ($el('petition'+i))
        new EmailPetitionController({
            el: '#petition'+i,
            disclosureEl: '#disclosure'+i,
            page_id: 'choosethefuture',
            required: ['email', 'zip', 'first_name', 'address1'],
            buttonText: 'Take Action',
            orgs: {
                fftf: '<a href="https://www.fightforthefuture.org" target="_blank">Fight for the Future</a> will email you with campaign updates. <a href="https://www.fightforthefuture.org/privacy" target="_blank">Privacy</a>'
            },
            onSend: function(formData)
            {
                $el('thanks'+i).style.display = 'block';
                new ShareModalController({
                    headline: 'Thanks for taking action!',
                    text: 'Thanks for taking action against the TPP. Now triple your impact by sharing this with your friends.'
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

var hashChange = function () {
    if (window.location.hash == '#signup')
        new OrgSignupController();
}
window.onhashchange = hashChange;
hashChange();

})(document, window);
