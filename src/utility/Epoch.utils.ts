const convEpoch = (date:Date) => {
    return Math.floor(date.getTime()/1000);
}

export default convEpoch