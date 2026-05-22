const ComponentsCache = {}

async function renderComponent(type, path) {
    if (!ComponentsCache[path]) {
        const response = await fetch(path)
        ComponentsCache[path] = await response.text()
    }

    const renderer = document.createElement('div')
    renderer.innerHTML = ComponentsCache[path]
    renderer.dataset.type = type

    return document.body.appendChild(renderer)
}

const MyComponents = {
    Title: async () => await renderComponent('title', '/components/title/title.html'),
    Card: async () => await renderComponent('card', '/components/card/card.html')
};

(async () => {
    const title = await MyComponents.Title()
    title.querySelector('h2').innerText = 'Title'
    const titleb = await MyComponents.Title()
    titleb.querySelector('h2').innerText = 'Title1'


    const CardData = [
        {
            src: 'https://picsum.photos/200/300',
            title: 'Card Title 1'
        },
        {
            src: 'https://picsum.photos/200/300',
            title: 'Card Title 2'
        }
    ]

    for (const data of CardData) {
        const card = await MyComponents.Card()
        card.querySelector('h2').innerText = data.title
        card.querySelector('img').src = data.src
    }
})()
