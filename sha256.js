/*
 *  jssha256 version 0.1  -  Copyright 2006 B. Poettering
 *
 *
 // ==ClosureCompiler==
 // @compilation_level ADVANCED_OPTIMIZATIONS
 // @output_file_name default.js
 // @formatting pretty_print
 // ==/ClosureCompiler==
 */

SHA256_hash = f;

function h(e) {
    for (var b = e.length, d = Array(b), a = 0; a < b; a++) d[a] = e.charCodeAt(a);
    return d
}

function f(e) {
    SHA256_H = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
    SHA256_buf = [];
    SHA256_len = 0;
    SHA256_buf = typeof e == "string" ? SHA256_buf.concat(h(e)) : SHA256_buf.concat(e);
    for (var b = 0; b + 64 <= SHA256_buf.length; b += 64) i(SHA256_H, SHA256_buf.slice(b, b + 64));
    SHA256_buf = SHA256_buf.slice(b);
    SHA256_len += e.length;
    SHA256_buf[SHA256_buf.length] = 128;
    if (SHA256_buf.length > 56) {
        for (b = SHA256_buf.length; b < 64; b++) SHA256_buf[b] = 0;
        i(SHA256_H, SHA256_buf);
        SHA256_buf.length = 0
    }
    for (b = SHA256_buf.length; b < 59; b++) SHA256_buf[b] = 0;
    SHA256_buf[59] = SHA256_len >>> 29 & 255;
    SHA256_buf[60] = SHA256_len >>> 21 & 255;
    SHA256_buf[61] = SHA256_len >>> 13 & 255;
    SHA256_buf[62] = SHA256_len >>> 5 & 255;
    SHA256_buf[63] = SHA256_len << 3 & 255;
    i(SHA256_H, SHA256_buf);
    e = Array(32);
    for (b = 0; b < 8; b++) e[4 * b + 0] = SHA256_H[b] >>> 24, e[4 * b + 1] = SHA256_H[b] >> 16 & 255, e[4 * b + 2] = SHA256_H[b] >> 8 & 255, e[4 * b + 3] = SHA256_H[b] & 255;
    delete SHA256_H;
    delete SHA256_buf;
    delete SHA256_len;
    for (var b = "", d = 0; d < e.length; d++) b += SHA256_hexchars[e[d] >> 4] + SHA256_hexchars[e[d] & 15];
    return b
}
SHA256_hexchars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
SHA256_K = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];

function i(e, b) {
    for (var d = Array(16), a = 0; a < 16; a++) d[a] = b[4 * a + 0] << 24 | b[4 * a + 1] << 16 | b[4 * a + 2] << 8 | b[4 * a + 3];
    for (a = 16; a < 64; a++) d[a] = ((d[a - 2] >>> 17 | d[a - 2] << 15) ^ (d[a - 2] >>> 19 | d[a - 2] << 13) ^ d[a - 2] >>> 10) + d[a - 7] + ((d[a - 15] >>> 7 | d[a - 15] << 25) ^ (d[a - 15] >>> 18 | d[a - 15] << 14) ^ d[a - 15] >>> 3) + d[a - 16] & 4294967295;
    for (var c = [].concat(e), a = 0; a < 64; a++) {
        var g = c[7] + ((c[4] >>> 6 | c[4] << 26) ^ (c[4] >>> 11 | c[4] << 21) ^ (c[4] >>> 25 | c[4] << 7)) + (c[6] ^ c[4] & (c[5] ^ c[6])) + SHA256_K[a] + d[a],
        j = ((c[0] >>> 2 | c[0] << 30) ^ (c[0] >>> 13 | c[0] << 19) ^ (c[0] >>> 22 | c[0] << 10)) + (c[0] & c[1] ^ c[2] & (c[0] ^ c[1]));
        c.pop();
        c.unshift(g + j & 4294967295);
        c[4] = c[4] + g & 4294967295
    }
    for (a = 0; a < 8; a++) e[a] = e[a] + c[a] & 4294967295
};