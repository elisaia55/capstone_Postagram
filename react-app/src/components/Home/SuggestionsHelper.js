
function randNum(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min;
    }

export function suggestedUsers(userTotal) {
    let min = userTotal.length - (userTotal.length - 1)
    let max = userTotal.length - 1
    let suggestedTotal = []
    let nums = []
    for (let i = 0; i < 7; i++) {
        let randomN = randNum(min, max)
    if (nums.includes(randomN)) {
        i = i - 1
    } else {
        nums.push(randomN)
        suggestedTotal[i] = userTotal[randomN]
    }
    }
    return suggestedTotal
}