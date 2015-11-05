var OrgListController = Composer.Controller.extend({
    elements: {
        'ul.list': 'list'
    },

    events: {
    },

    collection: null,
    categories: null,

    init: function() {
        this.render();

        /*
        new Composer.ListController({
            collection: this.collection,
            inject: this.list,
            init: function() {
                this.track(this.collection, function(model, options) {
                    return new PoliticianController({
                        inject: this.el,
                        model: model
                    });
                }.bind(this), {bind_reset: true})
            }
        });
        */
    },

    render: function() {
        var div = OrgListView({
            categories: this.categories,
        });
        this.html(div);
    },


});
