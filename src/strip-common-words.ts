const commonWords = ["The"]

export default function stripCommonWords(name: string) {
    const wordList = []
    const splitName = name.split(" ")
    for (const word of splitName) {
        if (!commonWords.includes(word)) {
            wordList.push(word)
        }
    }
    const newName = wordList.join(" ").trim()
    return newName
}