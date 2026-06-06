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

/**
 * toglie tutti gli "id" e "style" dall'svg
 * @param element elemento placeholder che viene rimpiazzato con l'svg
 * @param path percorso dell'svg che rimpiazza
 */
async function render_svg(element, path) {
    element.innerHTML = await fetch(path).then(data => data.text())
    element.parentElement.replaceChild(element.querySelector("svg"), element)

    Array.from(element.getElementsByTagName('*')).forEach(node => {
        node.removeAttribute('id')
        node.removeAttribute('style')
    })
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
            svg: '/photo/svg/portfolio.svg',
            button: '',
        }
    ]

    for (const data of TitleData) {
        const title = await MyComponents.Title()

        const link = title.querySelector("a")
        link.href = data.href
        link.innerText = data.about

        await render_svg(title.querySelector('div'), data.svg)


        title.appendChild(await my)
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
