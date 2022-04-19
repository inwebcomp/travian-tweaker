export const groupBy = (x, f) => x.reduce((a, b) => ((a[f(b)] ||= []).push(b), a), {})

export const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}