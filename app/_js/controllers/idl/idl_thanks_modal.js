var IDLThanksModalController = BaseShareModalController.extend({

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
