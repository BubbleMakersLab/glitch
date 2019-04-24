const customSharer = {
    render() {
        return "coucou"
    }
}

const customSharer2 = {
    render() {
        return "JM"
    }
}

$(document).ready(function() {
    const selectionShare = ShareThis({
        selector: '#shareable',
        sharers: [customSharer ,customSharer2]
    });

    selectionShare.init();

})

