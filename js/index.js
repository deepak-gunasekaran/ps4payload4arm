var ICON_SIZE = 150;
var PADDING = 20;
var model = {
  cursor: {
    x: 0,
    y: 0
  },
  columns: {
	 "QUICK": {
      index: 0,
      title: "QUICK",
      selectedIndex: 0,
      active: false,
      icon: 'style',
      items: [{ title: "VTX HEN", desc: "Runs fake signed content. Inc: update blocker & debug settings", version: "1.7 by xVortex", active: false, icon: "lock", expage: "payloads/vtxhen.html" }, { title: "VTX DUMPER", desc: "Dump disc/PSN games to USB: with/without patches, merged/unmerged", version: "1.8 by xVortex", active: false, icon: "archive", expage: "payloads/vtxdump.html"}, { title: "VTX FTP", desc: "Start an ftp server and connect to your PC to your PS4", version: "1.3 by xVortex", active: false, icon: "wifi", expage: "payloads/vtxftp.html"}]
    },
    "HEN": {
      index: 1,
      title: "HEN",
      selectedIndex: 0,
      active: false,
      icon: 'gamepad',
      items: [{ title: "VTX HEN", desc: "Runs fake signed content. Inc: update blocker & debug settings", version: "1.7 by xVortex", active: false, icon: "lock", expage: "payloads/vtxhen.html" }, { title: "VTX HEN+VR", desc: "Enable VTX HEN 1.7 and VR all in one", version: "1.7 mod by Stooged", active: false, icon: "polymer", expage: "payloads/vtxhenvrmod.html" }, {title: "VTX HEN+SCREENSHOT", desc: "Enable VTX HEN 1.7 with no in app screenshot limitations", version: "1.7 mod by BIORN", active: false, icon: "tab", expage: "payloads/screenshot.html" }, {title: "VTX HEN (LITE)", desc: "Enable VTX HEN 1.7 without the update blocker", version: "1.7 mod by C0d3m4st4", active: false, icon: "loupe", expage: "payloads/vtxhenc0d3mod.html" }, { title: "VTX HEN+AUTH", desc: "Enables VTX HEN 1.7 with AUTH patches", version: "1.7 mod by Björn", active: false, icon: "texture", expage: "payloads/henauth.html" }, { title: "MIRAHEN", desc: "Run fake signed content. Inc: debug settings, Kernel logging (port 9999/9998)", version: "1.7 by OpenOrbisTeam", active: false, icon: "apps", expage: "payloads/mirahen.html" }, { title: "MIRA", desc: "Enable only MIRA Kernel Logging (port 9999/9998)", version: "1.7 by OpenOrbisTeam", active: false, icon: "nfc", expage: "payloads/mira.html" }, { title: "BINLOADER", desc: "Enable only BIN LOADER function on port:9020", version: "1.7 by OpenOrbisTeam", active: false, icon: "send", expage: "payloads/binloader.html" }, { title: "MIRAHEN+BINLOADER", desc: "Enable MIRA HEN with BINLOADER", version: "1.7 by OpenOrbisTeam", active: false, icon: "input", expage: "payloads/mirabin.html" }]
    },
    "BLOCK": {
      index: 2,
      title: "BLOCK",
      selectedIndex: 0,
      active: false,
      icon: "security",
      items: [{ title: "BLOCKER +FTP", desc:"Run to block updates permanently, and start FTP server.", version: "1.3 by Lightningmods & CelesteBlue", active: false, icon: "block", expage: "payloads/blockftp.html"  }, { title: "UPDATE DISABLER", desc:"Run once to disable updates permanently", version: "1.0 by Al-Azif", active: false, icon: "clear", expage: "payloads/blocker.html"  }, { title: "UPDATE ENABLER", desc:"Re-allow updates to download/install", version: "1.0 by Al-Azif", active: false, icon: "undo", expage: "payloads/unblock.html" }, { title: "UPDATE BLOCKER EXTREME", desc:" Blocks every possibly update location permanently", version: "1.0 by Lightningmods", active: false, icon: "language", expage: "payloads/blockEX.html" }, { title: "UPDATE UNBLOCKER EXTREME", desc:"Re-allow updates to download/install", version: "1.0 by Lightningmods", active: false, icon: "sync_disabled", expage: "payloads/unblockEX.html" }]
    },
    "LINUX": {
      index: 3,
      title: "LINUX",
      selectedIndex: 0,
      active: false,
      icon: "laptop",
      items: [{ title: "LINUX", desc:"Lightweight Linux kernel loader (requires usbstick)", version: "1.0 by EEPLY", active: false, icon: "camera", expage: "payloads/eeplinux.html"}, { title: "LINUX", desc:"Boots linux kernel from a USB stick", version: "1.0 by Vultra", active: false, icon: "keyboard", expage: "payloads/linux.html"}, { title: "KEXEC", desc:"Kernel loader direct from Orbis OS", version: "1.0 by ValentineBreize", active: false, icon: "widgets", expage: "payloads/kexec.html"}]
    },
    "BACKUP": {
      index: 4,
      title: "BACKUP",
      selectedIndex: 0,
      active: false,
      icon: "backup",
      items: [{ title: "VTX DUMPER", desc: "Dump disc/PSN games to USB: with/without patches, merged/unmerged", version: "1.8 by xVortex", active: false, icon: "archive", expage: "payloads/vtxdump.html"}, { title: "DB SG BACKUP", desc:"Back up your game saves and important databases", version:"3.0 by Stooged", active: false, icon: "save", expage: "payloads/dbsg.html" }, { title: "DB RESTORE", desc:"Restore your backed up databases", version: "2.0 by Stooged", active: false, icon: "publish", expage: "payloads/dbrestore1.html" }, { title: "DB RESTORE UNDO", desc:"Undo an accidental DB restoration", version: "2.0 by Stooged modded by Leeful", active: false, icon: "delete", expage: "payloads/dbrestoreUNDO1.html" }, { title: "APPTOUSB", desc:"Specify mount point and move games to external EXFAT USB for extra storage", version: "3.0 by Stooged", active: false, icon: "storage", expage: "payloads/apptousb.html"}, { title: "APPTOUSB ALT", desc:"Like AppToUsb but purely for USB1", version: "1.0 mod by Jakkal", active: false, icon: "dns", expage: "payloads/apptousb1alt.html"}, { title: "USB FAKE PACKAGES", desc:"An alternative based on the pkg2usb by SiSTRO and AppToUsb by Stooged", version: "1.1b by Specialfood", active: false, icon: "usb", expage: "payloads/usbfpkgs.html" }, { title: "DUMPER+AUTH", desc:"Experimental APP + AUTH dumper", version: "0.1(Zer0xFF)", active: false, icon: "gradient", expage: "payloads/dumpauth.html"},]
    },
    "SYSTEM": {
	  index: 5,
      title: "SYSTEM",
      selectedIndex: 0,
      active: false,
      icon: "home",
	  items: [{ title: "EVERSION", desc:"Dumps your kernel to USB. Cross-compatible with 4.05-5.05 OFW", version: "1.3 by CelesteBlue", active: false, icon: "memory", expage: "payloads/everkdump.html" }, { title: "KERNEL DUMPER", desc:"Dumps your kernel to USB", version: "2.0 by Stooged", active: false, icon: "work", expage: "payloads/kdumper.html" }, { title: "FS DUMPER", desc:"Dumps your consoles file system to USB", version: "1.0 by Stooged", active: false, icon: "pageview", expage: "payloads/fsdumper.html" }]
	},
  "TOOLS": {
      index: 6,
      title: "TOOLS",
      selectedIndex: 0,
      active: false,
      icon: "settings",
      items: [{ title: "VR ENABLER", desc:"Enables VR headset even after HEN has been run", version: "1.0 by Stooged", active: false, icon: "visibility", expage: "payloads/vr.html" }, { title: "VTX FTP", desc: "Start an ftp server and connect to your PC to your PS4", version: "1.3 by xVortex", active: false, icon: "wifi", expage: "payloads/vtxftp.html"}, { title: "FTP+R/W", desc:"Starts an ftp server with full R/W on all 16 partitions of your PS4.", version: "1.0 by Lightningmods", active: false, icon: "warning", expage: "payloads/ftprw.html" }, { title: "REACTPSPLUS", desc:"Turn your consoles RTC back to play expired PSPLUS games", version: "2012 edition by Zer0xFF", active: false, icon: "restore", expage: "payloads/react.html" }, { title: "UNREACTPSPLUS", desc:"Turn your consoles RTC back to 2018", version: "2018 edition by Zer0xFF", active: false, icon: "update", expage: "payloads/unreact.html" }, { title: "REACTPSPLUS", desc:"Change your consoles RTC to whatever you want", version: "1.0 by Zer0xFF mod by Leeful", active: false, icon: "timelapse", expage: "payloads/reactloader.html" }]
    },
	"CHEATS": {
      index: 7,
      title: "CHEATS",
      selectedIndex: 0,
      active: false,
      icon: "search",
      items: [{ title: "IH RTM EDITOR", desc:"Cheat tool with RTM functions", version: "1.0.0.0 by Intention Hackers", active: false, icon: "dvr", expage: "payloads/ihrtm.html" },{ title: "COMMUNITY TRAINER", desc:"Community driven cheat tool", version: "1.0.2.0 by DeathRGH", active: false, icon: "comment", expage: "payloads/community.html" }, { title: "PS4 TRAINER", desc:"Game trainer tool for cheating", version: "1.4.91.113 by Tylermods", active: false, icon: "code", expage: "payloads/tylermods.html" }, { title: "JKPATCH", desc:"RPC server for finding cheats", version: "1.0 by XEMIO", active: false, icon: "timeline", expage: "payloads/jkpatch.html" }, { title: "DeathRGH", desc:"Cheat toolbox with peek/poke and notifications", version: "1.6.0.0 by DeathRGH", active: false, icon: "attachment", expage: "payloads/deathrgh.html" }, { title: "PS4 CHEATER", desc:"Tool to help find and implement cheats", version: "1.4.7 by Chendochap", active: false, icon: "create", expage: "payloads/cheater.html" }, { title: "PS4API SERVER 1.0", desc:"Allows control of game memory for RTE/RTM tools", version: "1.0 by Helloitu", active: false, icon: "flag", expage: "payloads/ps4api.html" }, { title: "PS4API SERVER 1.1", desc:"Allows control of game memory for RTE/RTM tools", version: "1.1 by Bisoon", active: false, icon: "transform", expage: "payloads/ps4apibisoon.html" }]
    },
  "MENUS": {
      index: 8,
      title: "MENUS",
      selectedIndex: 0,
      active: false,
      icon: "tune",
      items: [{ title: "NOTYOURDOPES 127 ~ [R1 + ⇩]", desc:"GTAV mod menu for EU/US game version 1.27", version: "1.0 by NotYourDope", active: false, icon: "group", expage: "payloads/GTA/GTA_NotYourDopes127.html" }, { title: "LTSMENU 127 ~ [⇨ + □]", desc:"GTAV mod menu for EU/US game version 1.27", version: "1.0 by CMTFrosty (LastTeamStanding)", active: false, icon: "group", expage: "payloads/GTA/GTA_LTS127.html" }, { title: "NOTANOTHERMENU ~ [⇨ + □]", desc:"GTAV mod menu for EU/US game version 1.00", version: "0.1 by David1337hax", active: false, icon: "redeem", expage: "payloads/GTA/GTA_NotAnother.html" }, { title: "NOTANOTHERMENU 127  ~ [⇨ + □]", desc:"GTAV mod menu for EU/US game version 1.27", version: "0.2 by David1337hax", active: false, icon: "redeem", expage: "payloads/GTA/GTA_NotAnother127.html" }, { title: "AP II INTENSE V2 ~ [R1 + □]", desc:"GTAV mod menu for EU/US game version 1.00", version: "1.1 by EROOTIIK", active: false, icon: "extension", expage: "payloads/GTA/GTA_Intense.html" }, { title: "AP II INTENSE V2 1.27 ~ [R1 + □]", desc:"GTAV mod menu for EU game version 1.27", version: "1.5 by EROOTIIK", active: false, icon: "extension", expage: "payloads/GTA/GTA_Intense127.html" }, { title: "LAMANCE ~ [⇨ + □]", desc:"GTAV mod menu for EU/US game version 1.00", version: "0.8 by David1337hax", active: false, icon: "stars", expage: "payloads/GTA/GTA_Lamance.html" }, { title: "LAMANCE 1.27 ~ [⇨ + □]", desc:"GTAV mod menu for EU/US game version 1.27", version: "0.8 by David1337hax", active: false, icon: "stars", expage: "payloads/GTA/GTA_Lamance127.html" }, { title: "WILDEMODZ ~ [⇦ + □]", desc:"GTAV mod menu for EU/US game version 1.00", version: "1.1 by Wildemodz", active: false, icon: "accessibility", expage: "payloads/GTA/GTA_WildeModz.html" }, { title: "WILDEMODZ 127 ~ [⇦ + □]", desc:"GTAV mod menu for EU/US game version 1.27", version: "1.2 by Wildemodz", active: false, icon: "accessibility", expage: "payloads/GTA/GTA_WildeModz127.html" }, { title: "TEAM PSYCH0S ~ [⇦ + □]", desc:"GTAV mod menu for EU/US game version 1.00", version: "1.0 by AlFaMoDz", active: false, icon: "build", expage: "payloads/GTA/GTA_Psych0s.html" }, { title: "ARABICGUY ~ [L1 + R1]", desc:"GTAV mod menu for EU/US game version 1.00", version: "1.1 by RF0oDxM0Dz", active: false, icon: "face", expage: "payloads/GTA/GTA_ArabicGuy.html"}, { title: "TRAINER ~ [⇨ + □]", desc:"GTAV mod menu for EU/US game version 1.00", version: "1.0 by David1337hax", active: false, icon: "shop", expage: "payloads/GTA/GTA_Trainer.html"}]
    },
	"LAN": {
      index: 9,
      title: "LAN",
      selectedIndex: 0,
      active: false,
      icon: "power",
      items: [{ title: "BO3 COD:ONLINE", desc:"Play BO3 LAN games online in private servers", version: "1.0 by TheoryWrong", active: false, icon: "language", expage: "payloads/codonline/BO3.html" }]
	}, 
	"MODS": {
      index: 10,
      title: "MODS",
      selectedIndex: 0,
      active: false,
      icon: "functions",
      items: [{ title: "ORBISAFR", desc:"Application file redirector for game modding", version: "1.0 by TheoryWrong", active: false, icon: "layers", expage: "payloads/orbisafr.html" }, { title: "TROPHY UNLOCKER", desc:"Unlock all trophies with ease", version: "2.0 (experimental) by Samsepi01", active: false, icon: "details", expage: "payloads/trophy.html" }]
	}, 
	"MEDIA": {
      index: 11,
      title: "MEDIA",
      selectedIndex: 0,
      active: false,
      icon: "subscriptions",
      items: [{title: "MP4PLAYER", desc:"Media player for MP4 movies over network", version: "1.0 by DEFAULTDNB", active: false, icon: "airplay", expage: "payloads/playerloader.html" }, {title: "MP3PLAYER", desc:"Audio player for music files over network", version: "COMING SOON by DEFAULTDNB", active: false, icon: "audiotrack" }]
	},
	"CACHE": {
      index: 12,
      title: "CACHE",
      selectedIndex: 0,
      active: false,
      icon: "copyright",
      items: [{ title: "HOST CACHE", desc:"Cache X-Project to your web browser for offline use", version: "1.0 by Al-Azif", active: false, icon: "weekend", expage: "payloads/xmbcache.html" }, { title: "USB CACHE INSTALL", desc:"Installs an ApplicationCache.db from USB for offline use", version: "10.0 by Stooged", active: false, icon: "beenhere", expage: "payloads/usbcacheinstall.html" }, { title: "CACHE INSTALL", desc:"Installs an ApplicationCache.db for offline use", version: "10.0 by Stooged", active: false, icon: "book", expage: "payloads/cacheinstall.html" }, { title: "APPLICATION CACHE", desc:"Installs an ApplicationCache.db that is a modified version of Al-Azif's exploit host", version: "2.0 by Hotdogwithmustard", active: false, icon: "loyalty", expage: "payloads/applicationcache.html" }, { title: "HISTORY BLOCKER", desc:"Toggle auto loading the last page used in webbrowser", version: "2.0 by Stooged", active: false, icon: "bookmarks", expage: "payloads/history.html" }]
	},
	"ABOUT": {
      index: 13,
      title: "ABOUT",
      selectedIndex: 0,
      active: false,
      icon: "help",
      items: [{title: "CREDITS", desc:"Without these people none of this would be possible", version: "1.4 by DEFAULTDNB", active: false, icon: "fingerprint", expage: "payloads/creditsloader.html" }, {title: "PAYLOAD STATISTICS", desc:"Logs how many times a payload has been loaded. (VTX HEN/DUMP/FTP only)", version: "0.1 POC by DEFAULTDNB", active: false, icon: "info", expage: "payloads/statsloader.html" }]
    },
	"★DEBUG": {
      index: 14,
      title: "★DEBUG",
      selectedIndex: 0,
      active: false,
      icon: "cake",
      items: [{ title: "★PAYLOAD", desc: "Quickly test payloads", version:"1.0 by DEFAULTDNB", active: false, icon: "healing", expage: "payloads/testloader.html" }]
	},
  }
  //add zero position to each column and item
};_.each(model.columns, function (c) {
  c.position = { x: 0, y: 0 };
  _.each(c.items, function (i) {
    i.position = {
      x: 0,
      y: 0
    };
  });
});

var xmbVue = new Vue({
  el: "#xmb",
  data: model,
  methods: {
    handleKey: function handleKey(dir, val) {
      this.cursor[dir] += val;
      var nCols = this.nColumns;

      // wrap x
      this.cursor.x = this.cursor.x % nCols;
      if (this.cursor.x < 0) {
        this.cursor.x = this.cursor.x + nCols;
      }

      //wrap y
      var nRows = this.nRows;
      this.cursor.y = this.cursor.y % nRows;
      if (this.cursor.y < 0) {
        this.cursor.y = this.cursor.y + nRows;
      }

      this.highlightCell(this.cursor.x, this.cursor.y);
    },
    highlightCell: function highlightCell(column, row) {

      console.log(column, row);
      //update position of elements as well
      var xAccum = (-column - 1) * (ICON_SIZE);
      if (column == 0) {
        xAccum += ICON_SIZE;
      }
      var yAccum;

      _.each(this.columns, function (col, colKey) {
        col.active = false;
        yAccum =  - (ICON_SIZE) * (row + 1);

        col.position.x = xAccum;
        xAccum += ICON_SIZE;
        if (column === col.index || column === col.index + 1) {
          xAccum += ICON_SIZE;
        }

        _.each(col.items, function (item, rowN) {
          if (rowN == row && col.index == column) {
            item.active = true;
            col.active = true;
          } else {
            item.active = false;
          }

          if (rowN == row) {
            yAccum += ICON_SIZE;
          }
          yAccum += ICON_SIZE;
          item.position.y = yAccum;
        });
      });
      this.cursor.y = row;
      this.cursor.x = column;
    }
  },
  watch: {
    cursor: function cursor(e) {
      console.log('cursor mutated', e);
    }
  },
  computed: {
    nColumns: function nColumns() {
      return Object.keys(this.columns).length;
    },
    nRows: function nRows() {
      //get the row at the current index
      var row = this.columnsArray[this.cursor.x];
      if (!row) {
        console.log('invalid row index: ', this.cursor.x);
        return 0;
      }
      return row.items.length; //todo: number of columns in this row
    },
    columnsArray: function columnsArray() {
      var _this = this;

      //get columns in an array
      var arr = [];
      Object.keys(this.columns).forEach(function (key) {
        arr.push(_this.columns[key]);
      });
      return _.sortBy(arr, 'index');
    }
  },
  created: function created() {
    _.each(this.columns, function (column) {
      _.each(column.items, function (item) {
        item.active = false;
      });
    });
    this.highlightCell(this.cursor.x, this.cursor.y);
  }
});

$('body').on("mousewheel", _.debounce(scrollHandler, 50));

function scrollHandler(e) {
  console.log(e);
  if (e.deltaX) {
    xmbVue.handleKey('x', Math.sign(e.deltaX));
  }
  if (e.deltaY) {
    xmbVue.handleKey('y', Math.sign(e.deltaY));
  }
}
// REMAP TO D-PAD EXPERIMENTAL
// 114 = options, 116 = L1, 117 = R1
window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;
   if (key == 37) {
   xmbVue.handleKey('x', -1);
   } else if (key == 39) {
   xmbVue.handleKey('x', 1);
   } else if (key  == 38) {
   xmbVue.handleKey('y', -1);
   } else if (key  == 40) {
   xmbVue.handleKey('y', 1);
   } else if (key == 116) {
   window.open("payloads/vtxhen.html", "content");
   } else if (key == 117) {
   window.open("payloads/xmbcache.html", "content");
   }
};