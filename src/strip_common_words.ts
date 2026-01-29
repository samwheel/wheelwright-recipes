const commonWords = ["The"]

export default function StripCommonWords(name: string) {
    const wordList = []
    const splitName = name.split(" ")
    for (const word in splitName) {
        if (!(splitName[word] in commonWords)) {
            wordList.push(splitName[word])
        }
    }
    const newName = wordList.reduce((name1: string, name2: string) => name1 + " " + name2)
    return newName
}