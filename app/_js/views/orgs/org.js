var OrgView = function (data) {
    var
        frag = document.createDocumentFragment(),
        img = $c('img');

    img.src = data.org.photo_url;
    frag.appendChild(img);

    console.log(data.org);

    return frag;
};
