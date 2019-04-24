let brightspace;

if (location.href.includes('localhost') || location.href.includes('127.0.0.1')) {
    brightspace = {
        name: 'Lionel RADISSON',
        slugName: 'Lionel_RADISSON',
        course: '',
        courseCode: '2019_G1O04E_00',
        module: location.href.match(/[a-z0-9-]+(?=\.html)/g)[0],
        iframeUrl: ''
    };
}

let activated = false;
let first = true;
let postData = () => console.log(...args);

const debounce = (fn, ms = 0) => {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

addEventListener('message', event => {
    if(event.origin == 'https://emlyon.brightspace.com') {
        Reflect.apply(
            [].forEach,
            document.querySelectorAll('.bs-only'),
            [el => el.style.display = 'block']
        );

        Reflect.apply(
            [].forEach,
            document.querySelectorAll('.not-on-bs'),
            [el => el.style.display = 'none']
        );

        brightspace = {
            name: event.data.name,
            slugName: event.data.name.split(' ').join('_'),
            course: event.data.course,
            courseCode: event.data.course.split(' ')[0],
            module: event.data.module,
            iframeUrl: event.data.iframeUrl
        };
        console.log({brightspace});

        if(!activated){
            activateBSMode();
            activated = true;
        }
    }

    postData = () => {
        document.body.style.overflow = 'auto';

        let data = {};
        data.location = location.href;
        data.height = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );

        event.source.postMessage(data, event.origin);

        document.body.style.overflow = 'hidden';
        document.body.style.overflow = 'auto';
    }
    postData();
    if(first) {
        addEventListener('resize', debounce(postData, 1000));
        first = false;
    }
}, false);
