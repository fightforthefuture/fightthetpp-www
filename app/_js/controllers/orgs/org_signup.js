var OrgSignupController = BaseModalController.extend({

    elements: {
        'input[name="image"]': 'imageInput',
        'img': 'imagePlaceholder'
    },

    events: {
        'change input[type=file]': 'handleFile',
    },

    imgData: null,

    init: function() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var res = JSON.parse(xhr.response);
                console.log('api response: ', res);

                this.render(res);
                this.show();


            }
        }.bind(this);
        xhr.open("get", ORG_API_BASE_URL+'/categories', true);
        xhr.send();
    },

    render: function(categories) {
        var overlay = this.base_render();

        overlay.firstChild.appendChild(OrgSignupView({categories: categories}));

        this.html(overlay);
    },

    handleFile: function() {
        if (this.imageInput.files && this.imageInput.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                this.imgData = e.target.result;
                this.imagePlaceholder.src = e.target.result;
            }.bind(this)

            reader.readAsDataURL(this.imageInput.files[0]);
        }
    },

    getBase64ImgData: function() {
        return this.imgData.replace(/^data:image\/(png|jpg|jpeg);base64,/,"");
    },

});
