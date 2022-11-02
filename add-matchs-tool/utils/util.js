const getRandomArr = (num) => {
    let arr = [];
    for (let i = 0; i < num; ++i) {
        arr[i] = i + 1;
    }

    var tmp,
        current,
        top = num;
    if (top)
        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = arr[current];
            arr[current] = arr[top];
            arr[top] = tmp;
        }
    return arr;
};

module.exports = {
    getRandomArr,
};
