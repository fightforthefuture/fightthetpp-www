var OrgListView = function (data) {
    var
        frag = document.createDocumentFragment(),
        ul = $c('ul'),
        ul2 = $c('ul'),
        li1 = $c('li'),
        hint = $c('div'),
        line1 = $c('span'),
        br = $c('br'),
        line2 = $c('span');

    ul.className = 'tabs'
    li1.textContent = 'All';
    li1.className = 'sel';
    ul.appendChild(li1);

    console.log('categories: ', data.categories);

    for (var i=0; i < data.categories.length; i++) {
        var li = $c('li');
        li.textContent = data.categories[i].name;
        ul.appendChild(li);
    }

    frag.appendChild(ul);

    hint.className = 'hint';
    line1.textContent = 'Click any of the issue areas to see which organizations are standing against the TPP and why.';
    line2.textContent = 'Or, click an individual logo to see why that organization opposes the TPP.';
    hint.appendChild(line1);
    hint.appendChild(br);
    hint.appendChild(line2);
    frag.appendChild(hint);

    ul2.className = 'orgs';
    frag.appendChild(ul2);

    return frag;
};
