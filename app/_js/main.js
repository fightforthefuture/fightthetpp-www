(function (doc, win) {
    "use strict";

window.DONATE_URL = 'https://donate.fightforthefuture.org/?tag=fightthetpp';

var spawnPetition = function(i) {
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

            new ShareModalController({

            });

        }
    });
}
spawnPetition(1);

if ($el('org_count')) {
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
    xhr.open("get", 'https://fightthetpp-api.herokuapp.com/orgs/25/1/', true);
    xhr.send();
}



})(document, window);
