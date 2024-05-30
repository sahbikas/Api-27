const randomString = (length = 100) => {
    const chars = "0123456789avcdefghijklmnopqrstvuwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const len = chars.length;
    let random = "";
    for(let i = 1; i <= length; i++){
        const postn = Math.ceil(Math.random() *  (len-1))
        random += chars[postn];
    }
    return random;
}

module.exports = {randomString}