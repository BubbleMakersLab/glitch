function fb({action, ref, value, callback = console.log}) {
    const rand = items => items[~~(items.length * Math.random())];
    const server = `https://dww-firebase${rand(['', '2', '3'])}.glitch.me/`;

    const req = new Request(server, {
        method: 'POST',
        mode: 'cors',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({action, ref, value})
    });

    fetch(req)
        .then(response => response.json())
        .then(json => callback(json))
        .catch(e => console.log(e));
}

function activateBSMode() {
    let containers = document.querySelectorAll('.container');
    [].forEach.call(containers, container => {
        container.classList.remove('container');
        container.classList.add('bs-container');
    });

    // remove image zoom
    let zoomableImages = document.querySelectorAll('[data-action="zoom"]');
    [].forEach.call(zoomableImages, img => {
        img.removeAttribute('data-action');
    });

    // if brightspace log clicks on links and iframes
    function logEvent(type, url = '') {
        fb({
            action: 'push',
            ref: `${brightspace.courseCode}/${brightspace.slugName}${location.pathname.split('.')[0]}/events/${type}`,
            value: {ts: Date.now(), url},
            callback: result => console.log(result)
        });
    }

    // log page load/unload
    // logEvent('load');
    // addEventListener('beforeunload', e => {
    //     logEvent('unload');
    // });

    // log links click
    (function logLinkClick() {
        [].forEach.call(document.querySelectorAll('a'), a => {
            a.addEventListener('click', e => {
                logEvent('link', a.href);
            });
        });
    })();

    // log iframes click
    (function logIframeCick() {
        $('iframe').wrap(function() {
            return `<div class="iframetrack" style="height:100%;width:100%;" id="${this.dataset.src}"></div>`;
        });

        $('.iframetrack iframe').iframeTracker({
            blurCallback: function(e) {
                logEvent('iframe', this._overId);
            },
            overCallback: function(element, e) {
                this._overId = $(element).parent().attr('id'); // Saving the iframe wrapper id
            },
            outCallback: function(element, e) {
                this._overId = null; // Reset hover iframe wrapper id
            },
            _overId: null
        });
    })();
}
