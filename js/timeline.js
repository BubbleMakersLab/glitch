//#FF5656
// returns a gaussian random function with the given mean and stdev.
function gaussian(mean, stdev) {
    let y2;
    let use_last = false;
    return () => {
        let y1;
        if(use_last) {
           y1 = y2;
           use_last = false;
        }
        else {
            let x1, x2, w;
            do {
                 x1 = 2.0 * Math.random() - 1.0;
                 x2 = 2.0 * Math.random() - 1.0;
                 w  = x1 * x1 + x2 * x2;
            } while( w >= 1.0);
            w = Math.sqrt((-2.0 * Math.log(w))/w);
            y1 = x1 * w;
            y2 = x2 * w;
            use_last = true;
       }

       let retval = mean + stdev * y1;
       if(retval > 0) return retval;

       return -retval;
   }
}

const modules = [
    {name: '0. Basic Setup', nb: 0},
    {name: '1. Starting with Glitch', nb: 0},
    {name: '2. Structuring Data', nb: 0},
    {name: '3. HTML - Structuring the Web', nb: 0},
    {name: '4. CSS - Styling the Web', nb: 0},
    {name: '5. Design Resources', nb: 0},
    {name: '6. JS - Programming the Web', nb: 0},
    {name: '6i. JS - Variables', nb: 0},
    {name: '6ii. JS - Conditions', nb: 0},
    {name: '6iii. JS - Loops', nb: 0},
    {name: '6iv. JS - Functions', nb: 0},
    {name: '6v. JS - Arrays', nb: 0},
    {name: '6vi. JS - Objects', nb: 0},
    {name: '7. JS - Libraries', nb: 0},
]
const mean = Math.random() * modules.length | 0
const sd = 4
const standard = gaussian(mean, sd)
for(let i = 0; i<330; i++){
    modules[Math.min(standard()|0, modules.length - 1)].nb ++
}

const currentModuleIndex = Math.random() * modules.length | 0
modules[currentModuleIndex].nb ++

document.querySelector('h1').innerText = modules[currentModuleIndex].name

const timeline = document.createElement('div')
timeline.id = 'timeline'
timeline.style.marginBottom = '20px'

const parentEl = d3.select('.container').node()
parentEl.insertBefore(timeline, parentEl.childNodes[0])

const svg = d3.select(timeline)
    .append('svg')
svg.attr('width', '100%')
svg.attr('height', '80')

const svgWidth = document.querySelector('#timeline>svg').getBoundingClientRect().width

const currentWidth = 200
const moduleWidth = (svgWidth - currentWidth) / (modules.length - 1)

// console.log( {svgWidth, moduleWidth, total: moduleWidth * modules.length - 1 + currentWidth})

const groups = svg.selectAll('g')
    .data(modules)
    .enter()
    .append('g')
    .attr('transform', (d, i) => `translate(${i <= currentModuleIndex ? i * moduleWidth : (i - 1) * moduleWidth + currentWidth} 15)`)

groups.each(function(d, i) {
    d3.select(this)
        .append('rect')
        .attr('x', 0)
        .attr('y', () => i === currentModuleIndex ? -3 : 6)
        .attr('width', () => i === currentModuleIndex ? currentWidth : moduleWidth)
        .attr('height', () => i === currentModuleIndex ? 26 : 8)
        .attr('fill', () => i <= currentModuleIndex ? '#2F61A8' : '#EEECEC')
        .attr('stroke', 'white')
        .attr('stroke-width', '1px')

    if(i === currentModuleIndex) {
        const txt = d3.select(this)
            .append('text')
            .text(d.name)
            .attr('fill', 'white')
            .attr('font-size', 12)
            .attr('y', 14)

            const txtWidth = txt.node().getBBox().width
            txt.attr('x', (currentWidth - txtWidth) / 2)
    }

    const pop = d3.select(this)
        .append('g')
        .attr('transform', () => `translate(${i === currentModuleIndex ? currentWidth / 2 : moduleWidth / 2} ${i === currentModuleIndex ? 27 : 17})`)

    pop.append('rect')
        .attr('x', -(('' + d.nb).length * 8 + 20)/2)
        .attr('y', 5)
        .attr('width', () => ('' + d.nb).length * 8 + 20)
        .attr('height', 20)
        .attr('height', 20)
        .attr('stroke', () => i === currentModuleIndex ? '#2F61A8' : '#AFAFAF')
        .attr('stroke-width', 5)
        .attr('stroke-linejoin', 'round')

    pop.append('path')
        .attr('d', 'M-10 8 L0 0 L10 8')
        .attr('stroke', () => i === currentModuleIndex ? '#2F61A8' : '#AFAFAF')
        .attr('stroke-width', 3)
        .attr('stroke-linejoin', 'round')

    pop.append('rect')
        .attr('x', -(('' + d.nb).length * 8 + 20)/2)
        .attr('y', 5)
        .attr('width', ('' + d.nb).length * 8 + 20)
        .attr('height', 20)
        .attr('height', 20)
        .attr('fill', 'white')
        .attr('stroke', 'white')
        .attr('stroke-width', 6)
        .attr('stroke-linejoin', 'round')

    pop.append('path')
        .attr('d', 'M-10 8 L0 0 L10 8')
        .attr('fill', 'white')
        .attr('stroke', 'white')
        .attr('stroke-width', 1)
        .attr('stroke-linejoin', 'round')

    let g = pop.append('g')
        .attr('transform', `translate(${('' + d.nb).length === 1 ? -1 : ('' + d.nb).length === 2 ? 1 : 5}, 9)`);

    g.append('text')
        .text(d => d.nb)
        .attr('font-size', 12)
        .attr('text-anchor', 'end')
        .attr('x', -2)
        .attr('y', 10)
        .attr('fill', () => i === currentModuleIndex ? '#2F61A8' : '#AFAFAF')

    g.append('circle')
        .attr('cx', 8)
        .attr('cy', 3)
        .attr('r', 2.5)
        // .attr('fill', 'white')
        .attr('fill', () => i === currentModuleIndex ? '#2F61A8' : '#AFAFAF')

    g.append('circle')
        .attr('cx', 8)
        .attr('cy', 11)
        .attr('r', 4)
        // .attr('fill', 'white')
        .attr('fill', () => i === currentModuleIndex ? '#2F61A8' : '#AFAFAF')

    g.append('rect')
        .attr('x', 3)
        .attr('y', 12)
        .attr('width', 10)
        .attr('height', 5)
        .attr('fill', 'white')
})

const p = document.createElement('p')
p.style.marginTop = '2px'
p.style.marginBottom = 0
p.style.fontSize = '12px'
p.innerHTML = `${modules[currentModuleIndex].nb} participants are reading this module:`
timeline.appendChild(p)

fetch(`https://randomuser.me/api/?results=${modules[currentModuleIndex].nb}`)
    .then(resp => resp.json())
    .then(json => {
        console.log(json.results[0])
        // json.results.forEach(user => {
        //     const img = document.createElement('img')
        //     img.src = user.picture.thumbnail
        //     img.style.height = '18px'
        //     img.style.marginRight = '3px'
        //     img.style.boxShadow = 'none'
        //     img.style.webkitBoxShadow = 'none'
        //     img.style.borderRadius = '2px'
        //     img.style.border = 'solid #444 1px'
        //     timeline.appendChild(img)
        // })

        let html = '';
        json.results.forEach(user => {
            html += `<div class="user-wrap">
                <img src="${user.picture.thumbnail}" alt="${user.name.first} ${user.name.last} profile picture">
                <div class="user-card">
                    <div class="row">
                        <div>
                            <img src="${user.picture.thumbnail}" alt="${user.name.first} ${user.name.last} profile picture">
                        </div>
                        <div>
                            <p><strong>${user.name.first} ${user.name.last}</strong></p>
                            <p><a href="mailto:${user.email}">${user.email}</a></p>
                            <p><svg viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path></svg> ${user.location.city}</p>
                        </div>
                    </div>
                </div>
            </div>`

        });
        $(timeline).append(`<div class="users">${html}</div>`);
    })
