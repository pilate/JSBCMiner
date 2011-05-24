importScripts('sha256.js');

var work = function (data, target) {
    var start_time = new Date().getTime();
    var blk_hdr = bReverse(data.substr(0,152));
    target = bReverse(dwReverse(target));
    postMessage(target);

    //var nonce = 879340;
    var nonce = 0;
    while (++nonce) {
        // Reverse nonce
        var rNonce = bReverse(zPad(nonce.toString(16),8));

        // Construct block
        var final_str = blk_hdr + rNonce;

        // Hash Twice
        var hash1 = SHA256_hash(myBin(final_str));
        var hash2 = SHA256_hash(myBin(hash1));

        //if (hash2.substr(64-8) === "00000000") {
        if (bReverse(dwReverse(hash2)) < target) {
            postMessage({
                type:"solve",
                current: nonce
            });
            break;
        }

        if (nonce > 0xffffffff) {
            break;
        }
        if (nonce % 10000 == 0) {
            var total_time = new Date().getTime() - start_time;
            
            postMessage({
                type: "status",
                hps: (nonce * 1000 / total_time) | 0,
                current: nonce
            });
        }
    }
};

//window['onmessage'] = onmessage;
onmessage = function (message) {
    work(message.data.data, message.data.target);
};

var bReverse = function (buff) {
    var new_buff = "";
    for (var i = 0; i < buff.length; i+=8) {
        var work = buff.substr(i,8);
        
        new_buff += work[6]+work[7];
        new_buff += work[4]+work[5];
        new_buff += work[2]+work[3];
        new_buff += work[0]+work[1];
    }
    return new_buff;
};

var dwReverse = function (buff) {
    var new_buff = "";
    for (var i = 0; i < buff.length; i+=8) {
        var work = buff.substr(i,8);
        new_buff = work + new_buff;        
    }
    return new_buff;
};

var zPad = function (num, len) {
    var out = ""+num;
    while (out.length != len) {
        out = "0" + out;
    }
    return out;        
};

var myBin = function (data) {
    var out_data = "";
    for (var i = 0; i < data.length; i+=2) {
        out_data += String.fromCharCode(parseInt(data.substr(i,2),16))
    }
    return out_data;
};