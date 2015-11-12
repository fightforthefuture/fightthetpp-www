var OrgThanksModalController = BaseModalController.extend({

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
