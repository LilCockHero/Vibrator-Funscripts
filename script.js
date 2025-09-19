actions => {
    let preDelay = 50;
    let singleBeatDuration = 800;
    let minDelay = 300;
    let maxDelay = 500;

    let res = [];
    let size = actions.length;
    let min = 1000;
    for(let i = 1 ; i < size ; i++){
        if(actions[i].at - actions[i-1].at < min){
            min = actions[i].at - actions[i-1].at;
        }
    }

    res.push({"at" : 0, "pos" : 0})
    res.push({"at" : actions[0].at - preDelay , "pos" : 0})
    for(let i = 0 ; i < size ; i++){
        if(i >= 1){
            let diff_prev = actions[i].at - actions[i-1].at;
            if(diff_prev > singleBeatDuration + preDelay) {
                res.push({"at" : actions[i].at - preDelay , "pos" : 0})
            }
        }
        res.push({"at" : actions[i].at, "pos" : 99})
        let diff_next = singleBeatDuration + preDelay;
        if(i <= size - 2){
            if(diff_next > actions[i+1].at - actions[i].at){
                diff_next = actions[i+1].at - actions[i].at;
            }
        }
        let pos = 0;
        if(diff_next < minDelay){
            pos = 50;
        }
        else if(diff_next < maxDelay){

            pos = 50 * (1 - ((diff_next - minDelay) / (maxDelay - minDelay)));
        }
        res.push({"at" : actions[i].at + diff_next - preDelay, "pos" : pos})
    }
    return res;
}