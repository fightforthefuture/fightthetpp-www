var IDLModalController = BaseShareModalController.extend({

    init: function() {
        this.render();
        this.show();
    },

    render: function() {
        var overlay = this.base_render();

        overlay.firstChild.appendChild(IDLModalView({}));

        this.html(overlay);
    }
});
