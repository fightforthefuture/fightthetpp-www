var OrgListController = Composer.Controller.extend({
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
