var OrgModalController = BaseModalController.extend({

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
