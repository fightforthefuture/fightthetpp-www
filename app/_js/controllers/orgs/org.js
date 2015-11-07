var OrgController = Composer.Controller.extend({
    elements: {
        'img': 'img'
    },

    events: {
        'click': 'clicked'
    },

    model: null,
    tag: 'li',

    init: function() {
        this.render();
        this.loadImage();
    },

    render: function() {
        var div = OrgView({
            org: this.model.toJSON()
        });
        this.html(div);
    },

    loadImage: function() {
        var img = new Image()
        img.src = this.model.get('photo_url');
        img.onload = function() {
            this.img.className = 'visible';
        }.bind(this);
    },

    clicked: function(e) {
        new OrgModalController({
            model: this.model
        });
    }
});
