var ShareBarController = Composer.Controller.extend({
    elements: {
    },

    events: {
        'click button.action': 'scrollToTop'
    },

    init: function() {
        this.render();
        window.addEventListener('scroll', this.scrollListener.bind(this));
    },

    render: function() {
        var content = ShareBarView({});
        this.html(content);
    },

    scrollListener: function() {
        var petition1 = document.getElementById('petition1');

        if (!petition1)
            return;

        var bounds = petition1.getBoundingClientRect();

        if (!bounds || typeof bounds.bottom == 'undefined')
            return;

        if (bounds.bottom <= 0)
            this.el.classList.add('visible');
        else
            this.el.classList.remove('visible');
    },

    scrollToTop: function() {
        util.scrollToTop(500);
    }
});
