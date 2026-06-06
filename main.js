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

    const TitleData = [
        {
            href: 'https://it.wikipedia.org/',
            about: 'About Me',
            svg: '',
            button: '',
        }
    ]

    for (const data of TitleData) {
        const title = await MyComponents.Title()
        title.querySelector('a').href = data.href
        title.querySelector('a').innerText = data.about
        title.querySelector('svg').innerHTML = data.svg
        title.querySelector('button').button = data.button
    }


    const CardData = [
        {
            href: 'https://www.google.com/',
            src: 'https://picsum.photos/200/300?random=1',
            title: 'Card Title 1'
        },
        {
            src: 'https://picsum.photos/200/300?random=2',
            title: 'Card Title 2'
        },
        {
            src: 'https://picsum.photos/200/300?random=3',
            title: 'Card Title 3'
        }
    ]

    for (const data of CardData) {
        const card = await MyComponents.Card()
        card.querySelector('a').href = data.href
        card.querySelector('h2').innerText = data.title
        card.querySelector('img').src = data.src
    }
})()
