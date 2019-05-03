const openLink = (name, svg, getUrl) => ({
    name,
    render: (text, rawText, shareUrl) => {
        const url = getUrl(text)
        return `<a title="${name}" href="${url}" target="_blank" rel="noopener nofollow noreferrer">${svg}</a>`
    },
    action: (event, item) => document.execCommand('copy')
})

const search = openLink('Search on Qwant', `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 96 96" style="enable-background:new 0 0 96 96; fill:white" xml:space="preserve"> <path d="M61.2,56.1c3.1-4.2,4.8-9.2,4.8-14.6c0-6.5-2.5-12.7-7.2-17.3C54.2,19.5,48,17,41.5,17s-12.7,2.5-17.3,7.2 C19.5,28.8,17,35,17,41.5s2.5,12.7,7.2,17.3C28.8,63.5,35,66,41.5,66c5.3,0,10.4-1.7,14.6-4.8l16.7,16.7c0.7,0.7,1.6,1.1,2.6,1.1 c0.9,0,1.9-0.4,2.6-1.1c1.4-1.4,1.4-3.7,0-5.2L61.2,56.1z M29.3,53.7c-3.2-3.2-5-7.6-5-12.2s1.8-8.9,5-12.2c3.2-3.2,7.6-5,12.2-5 s8.9,1.8,12.2,5c3.2,3.2,5,7.6,5,12.2s-1.8,8.9-5,12.2c-3.2,3.2-7.6,5-12.2,5C36.9,58.7,32.6,56.9,29.3,53.7z"/></svg>`, txt => `https://lite.qwant.com/?q=${txt.split(' ').join('%20')}`)

const slack = openLink('Discuss with your friends on Slack', `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 96 96" style="enable-background:new 0 0 96 96;" xml:space="preserve"><style type="text/css">.st0{fill:#FFF;}.st1{fill:#FFF;}.st2{fill:#FFF;}.st3{fill:#FFF;}</style><g><g><path class="st0" d="M26.8,57.6c0,4.2-3.5,7.7-7.7,7.7s-7.7-3.5-7.7-7.7c0-4.2,3.5-7.7,7.7-7.7h7.7V57.6z"/><path class="st0" d="M30.7,57.6c0-4.2,3.5-7.7,7.7-7.7s7.7,3.5,7.7,7.7v19.2c0,4.2-3.5,7.7-7.7,7.7s-7.7-3.5-7.7-7.7 C30.7,76.9,30.7,57.6,30.7,57.6z"/></g><g><path class="st1" d="M38.4,26.8c-4.2,0-7.7-3.5-7.7-7.7s3.5-7.7,7.7-7.7s7.7,3.5,7.7,7.7v7.7H38.4z"/><path class="st1" d="M38.4,30.7c4.2,0,7.7,3.5,7.7,7.7S42.6,46,38.4,46H19.1c-4.2,0-7.7-3.5-7.7-7.7s3.5-7.7,7.7-7.7 C19.1,30.7,38.4,30.7,38.4,30.7z"/></g><g><path class="st2" d="M69.2,38.4c0-4.2,3.5-7.7,7.7-7.7c4.2,0,7.7,3.5,7.7,7.7S81.1,46,76.9,46h-7.7V38.4z"/><path class="st2" d="M65.3,38.4c0,4.2-3.5,7.7-7.7,7.7c-4.2,0-7.7-3.5-7.7-7.7V19.1c0-4.2,3.5-7.7,7.7-7.7c4.2,0,7.7,3.5,7.7,7.7 V38.4z"/></g><g><path class="st3" d="M57.6,69.2c4.2,0,7.7,3.5,7.7,7.7c0,4.2-3.5,7.7-7.7,7.7c-4.2,0-7.7-3.5-7.7-7.7v-7.7H57.6z"/><path class="st3" d="M57.6,65.3c-4.2,0-7.7-3.5-7.7-7.7c0-4.2,3.5-7.7,7.7-7.7h19.2c4.2,0,7.7,3.5,7.7,7.7c0,4.2-3.5,7.7-7.7,7.7 H57.6z"/></g></g></svg>`, () => `https://bubble-af31447.slack.com/`)

const translate = openLink('Translate on Deepl', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><path style="fill:#fff;" d="M85.53,80.73c-2.23,0-4.45,0-6.67,0a.71.71,0,0,1-.82-.59c-1.45-4.33-2.93-8.64-4.36-13a1,1,0,0,0-1.08-.77q-8.91,0-17.81,0a1,1,0,0,0-1.07.8c-1.43,4.3-2.9,8.59-4.34,12.89-.16.46-.34.65-.86.64-2.17,0-4.34,0-6.58,0,.09-.31.14-.54.22-.77q8.22-23.12,16.45-46.25a.82.82,0,0,1,.92-.66c2.79,0,5.57,0,8.36,0,.55,0,.75.2.92.68Q77,56.84,85.23,79.93c.08.22.2.44.3.65ZM70.94,59.31,63.7,40.24C61.24,46.7,58.85,53,56.42,59.31Z" /><path style="fill:#fff;" d="M10.47,30.74h17v-9.5h7.23v9.39H51.53v7.13h-17c.38,1.25.71,2.39,1.08,3.51a31.72,31.72,0,0,0,7.9,12.43c.74.74,1.5,1.46,2.22,2.23a.83.83,0,0,1,.25.66c-.76,2.21-1.57,4.4-2.41,6.72-4.73-4.6-8.77-9.57-11.31-15.9C29,57.58,21.91,64,12.9,68.87c-.63-1.85-1.23-3.64-1.84-5.43-.18-.5-.39-1-.59-1.47v-.3c5.08-2.5,9.69-5.59,12.76-10.51a35.89,35.89,0,0,0,4.63-13.23H10.47Z""/></svg>`, txt => `https://www.deepl.com/translator#en/fr/${txt.split(' ').join('%20')}`)

const askQuestion = {
    name: 'Ask a question to class',
    render: (text, rawText, shareUrl) => {
        return `<a title="Ask a question to class" href="#" data-txt="${text}"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 96 96" style="enable-background:new 0 0 96 96;" xml:space="preserve"><g fill="white" transform="translate(0,-952.36218)"><path d="M51.8,1017.3c0-1.9,0.6-3.2,1.7-4.7c1.1-1.5,2.8-3.1,4.7-5c3.9-3.7,8.7-7.6,8.7-16.8c0-10.3-8.5-18.9-18.9-18.9 s-18.9,8.5-18.9,18.9c0,2,1.8,3.9,3.8,3.9s3.8-1.9,3.8-3.9c0-6.3,5.1-11.3,11.3-11.3s11.3,5.1,11.3,11.3c0,5.2-2.6,7.8-6.4,11.3 c-1.9,1.8-3.9,3.5-5.7,6c-1.8,2.4-3.1,5.6-3.1,9.1"/><rect fill="white" x="44.1" y="1022" width="7.8" height="7.8"/></g></svg></a>`
    },
    action: (event, item) => {
        event.preventDefault()
        let txt = item.querySelector('a').dataset.txt
          swal({
            title: "Raise your hand !",
            text: txt,
            buttons: true,
            content: {
               element: "input",
               attributes: {
                 placeholder: "Type your question here",
               },
             },
             closeOnClickOutside: false,
             closeOnEsc: false,
        })
    }
}

// openLink('Ask a question to all class', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 96 96" style="enable-background:new 0 0 96 96;" xml:space="preserve"><g fill="white" transform="translate(0,-952.36218)"><path d="M51.8,1017.3c0-1.9,0.6-3.2,1.7-4.7c1.1-1.5,2.8-3.1,4.7-5c3.9-3.7,8.7-7.6,8.7-16.8c0-10.3-8.5-18.9-18.9-18.9 s-18.9,8.5-18.9,18.9c0,2,1.8,3.9,3.8,3.9s3.8-1.9,3.8-3.9c0-6.3,5.1-11.3,11.3-11.3s11.3,5.1,11.3,11.3c0,5.2-2.6,7.8-6.4,11.3 c-1.9,1.8-3.9,3.5-5.7,6c-1.8,2.4-3.1,5.6-3.1,9.1"/><rect fill="white" x="44.1" y="1022" width="7.8" height="7.8"/></g></svg>', () => 'https://bubble-af31447.slack.com/messages/CJ6NR5SAG/')

ShareThis({
    sharers: [search, translate, askQuestion, slack, ShareThisViaNotes],
    selector: 'article'
}).init()
