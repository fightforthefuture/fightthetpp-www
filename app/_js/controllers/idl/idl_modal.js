var IDLModalController = BaseShareModalController.extend({

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
