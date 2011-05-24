var elements = {};

var testData = {
    'data': '000000013160d7d723a51827938dd2c8a40140ddb91ac6bc22d8d5cd0000077000000000291a5256ddd1a03d9cd054bec9c2739ff645a313e0170cdc5f34e16fff89170f4dd9a2c11a44b9f200000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000080020000',
    'hash1': '00000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000010000',
    'midstate': '1f484c11e7007529e176f26309a598513cb5667346814fea897a25b0eaae0545',
    'target': 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000'
};

var start = function () {
    // Cache elements for updating later
    elements.hps = document.getElementById("hps");
    elements.current = document.getElementById("current");
    elements.answer = document.getElementById("answer");

    // Create worker thread
    var thread = new Worker("Worker.js");

    thread.onmessage = messageHandler;
    thread.onerror = errorHandler;

    thread.postMessage(testData);
};

var messageHandler = function (e) {
    switch (e.data.type) {
        case "status" :
            elements.hps.innerHTML = "H/s: "+e.data.hps;
            elements.current.innerHTML = "Current: "+e.data.current;
            break;
        case "solve" :
            elements.answer.innerHTML = "Solution Found: "+e.data.current;
            break;
    }
};
    
var errorHandler = function (e) {
    console.log("Error: ",e);
};