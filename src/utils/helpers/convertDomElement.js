export const convertToDomElement = (textElement, type) => {
    const parser = new DOMParser()
    const element = parser.parseFromString(textElement, type)
    return element.documentElement
}