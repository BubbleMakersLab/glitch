addEventListener('load', e => {
    // check links target
    console.log([].filter.call(document.querySelectorAll('a'), a => a.target !== '_blank'));

    // create page title based on '.info>h1' text content
    (function addTitle() {
        let title = document.createElement('title');
        title.innerText = document.querySelector('.info>h1').innerText.toLowerCase();
        document.querySelector('head').appendChild(title);
    })();

    // lazy load iframes
    (function lazyLoadIframes() {
        let myLazyLoad = new LazyLoad({
            elements_selector: 'iframe'
        });
    })();
});
