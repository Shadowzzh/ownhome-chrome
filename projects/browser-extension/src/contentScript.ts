const forEachChildren = (node: Node) => {

    node.addEventListener('mouseenter', (e) => {
        console.log(e.target)
    })

    node.childNodes.forEach((node) => {
        forEachChildren(node)
    })
}

forEachChildren(document.body)
