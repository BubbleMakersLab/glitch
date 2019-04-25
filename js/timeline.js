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
// const standard = gaussian(Math.random() * modules.length | 0, 4)
const standard = gaussian(14 | 0, 4)
for(let i = 0; i<330; i++){
    modules[Math.min(standard()|0, modules.length - 1)].nb ++
}

console.log(modules)

const currentModuleIndex = Math.random() * modules.length | 0

document.querySelector('h1').innerText = modules[currentModuleIndex].name

const timeline = document.createElement('div')
timeline.id = 'timeline'
const parentEl = d3.select('.container').node()
parentEl.insertBefore(timeline, parentEl.childNodes[0])

const svg = d3.select(timeline)
    .append('svg')
svg.attr('width', '100%')
svg.attr('height', '110')

const svgWidth = document.querySelector('#timeline>svg').getBoundingClientRect().width

const currentWidth = 200
const moduleWidth = (svgWidth - currentWidth) / (modules.length - 1)

// console.log( {svgWidth, moduleWidth, total: moduleWidth * modules.length - 1 + currentWidth})

const groups = svg.selectAll('g')
    .data(modules)
    .enter()
    .append('g')
    .attr('transform', (d, i) => `translate(${i <= currentModuleIndex ? i * moduleWidth : (i - 1) * moduleWidth + currentWidth} 5)`)
    
groups.each(function(d, i) {
    d3.select(this)
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', () => i === currentModuleIndex ? currentWidth : moduleWidth)
        .attr('height', 30)
        .attr('fill', () => i < currentModuleIndex ? '#8F8F8F' : i === currentModuleIndex ? '#E0031A' : '#F4F4F4')
        .attr('stroke', 'white')
        .attr('stroke-width', '3px')

    if(i === currentModuleIndex) {
        const txt = d3.select(this)
            .append('text')
            .text(d.name)
            .attr('fill', 'white')
            .attr('font-size', 12)
            .attr('y', 19)
        
            const txtWidth = txt.node().getBBox().width
            txt.attr('x', (currentWidth - txtWidth) / 2)
    }
    
    const pop = d3.select(this)
        .append('g')
        .attr('transform', () => `translate(${i === currentModuleIndex ? currentWidth / 2 : moduleWidth / 2} 35)`)

    pop.append('rect')
        .attr('x', -(('' + d.nb).length * 8 + 20)/2)
        .attr('y', 5)
        .attr('width', () => ('' + d.nb).length * 8 + 20)
        .attr('height', 20)
        .attr('height', 20)
        .attr('fill', '#8F8F8F')
        .attr('stroke', '#8F8F8F')
        .attr('stroke-width', 5)
        .attr('stroke-linejoin', 'round')
    
    pop.append('path')
        .attr('d', 'M-10 8 L0 0 L10 8')
        .attr('fill', '#8F8F8F')
        .attr('stroke', '#8F8F8F')
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
        .attr('stroke-width', 3)
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
        .text(d => i === currentModuleIndex ? d.nb + 1 : d.nb)
        .attr('font-size', 12)
        .attr('text-anchor', 'end')
        .attr('x', -2)
        .attr('y', 10)

    g.append('circle')
        .attr('cx', 8)
        .attr('cy', 1)
        .attr('r', 2.5)
        .attr('fill', 'white')
        .attr('stroke', 'black')

    g.append('circle')
        .attr('cx', 8)
        .attr('cy', 9)
        .attr('r', 4)
        .attr('fill', 'white')
        .attr('stroke', 'black')

    g.append('rect')
        .attr('x', 3)
        .attr('y', 10)
        .attr('width', 10)
        .attr('height', 6)
        .attr('fill', 'white')    
})