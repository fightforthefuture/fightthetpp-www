var OrgSignupController = BaseModalController.extend({

    elements: {
        'input[name="name"]': 'name',
        'input[name="email"]': 'email',
        'textarea': 'biography',
        'input[name="url"]': 'url',
        'input[name="tweet_text"]': 'tweet_text',
        'div.categories': 'categories',
        'input[name="image"]': 'imageInput',
        'img': 'imagePlaceholder',
        'form button': 'submitButton'
    },

    events: {
        'change input[type=file]': 'handleFile',
        'submit form': 'submit'
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
        var imgData = this.imgData;
        if (imgData)
            return imgData.replace(/^data:image\/(png|jpg|jpeg);base64,/,"");
        else
            return;
    },

    submit: function(e) {

        this.submitButton.disabled = true;

        e.preventDefault();
        
        var data = new FormData();

        data.append('name', this.name.value);
        data.append('email', this.email.value);
        data.append('biography', this.biography.value);
        data.append('url', this.url.value);
        data.append('tweet_text', this.tweet_text.value);

        var categories = this.categories.querySelectorAll('input');

        for (var i = 0; i < categories.length; i++)
            if (categories[i].checked)
                data.append(categories[i].name, 1)
        
        var imgData = this.getBase64ImgData();
        if (imgData)
            data.append('photo_data', imgData);

        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4)
            {
                var response = JSON.parse(xhr.response);

                console.log('RESPONSE: ', response);

                if (response.error) {
                    this.submitButton.disabled = false;
                    return alert(response.error);
                }

                this.hide();
                new OrgThanksModalController();
            }
        }.bind(this);
        xhr.open("post", ORG_API_BASE_URL + '/orgs', true);
        xhr.send(data);
    }

});
