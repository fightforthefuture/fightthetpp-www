var OrgListController = Composer.Controller.extend({
    elements: {
        'div.orgs': 'orgs'
    },

    events: {
    },

    collection: null,
    categories: null,

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
    },

    render: function() {
        var div = OrgListView({
            categories: this.categories,
        });
        this.html(div);
    },


});
