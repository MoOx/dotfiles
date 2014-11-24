/*globals slate: true*/
"use strict";

// more examples here https://github.com/jigish/dotfiles/blob/master/slate.js
//
// App object: https://github.com/jigish/slate/wiki/Application-Object

// Monitors
var monitorXL = "2560x1440"
var monitorL = "1920x1080"
var monitorM = "1440x900"

var positions = {}
positions.full = slate.operation("move", {
  x: "screenOriginX",
  y: "screenOriginY",
  width: "screenSizeX",
  height: "screenSizeY"
})
positions.top__half = positions.full.dup({
  height: "screenSizeY/2"
})
positions.left__half = positions.full.dup({
  height: "screenSizeY",
  width: "screenSizeX/2"
})
positions.left_top__half = positions.left__half.dup({
  height: "screenSizeY/2"
})
positions.left_bottom__half = positions.left_top__half.dup({
  y: "screenOriginY+screenSizeY/2"
})
positions.left__3of4 = positions.full.dup({
  width: "screenSizeX/4*3"
})
positions.left__2of3 = positions.full.dup({
  width: "screenSizeX/3*2"
})

positions.center_1of2 = positions.left__half.dup({
  x: "screenOriginX+screenSizeX/4"
})

positions.right__half = positions.full.dup({
  height: "screenSizeY",
  width: "screenSizeX/2",
  x: "screenOriginX+screenSizeX/2"
})
positions.right_top__half = positions.right__half.dup({
  height: "screenSizeY/2"
})
positions.right_bottom__half = positions.right_top__half.dup({
  y: "screenOriginY+screenSizeY/2"
})
positions.right__1of3 = positions.full.dup({
  height: "screenSizeY",
  width: "screenSizeX/3",
  x: "screenOriginX+screenSizeX/3*2"
})
positions.right__1of3__top__half = positions.right__1of3.dup({
  height: "screenSizeY/2"
})
positions.right__1of3__bottom__half = positions.right__1of3__top__half.dup({
  y: "screenOriginY+screenSizeY/2"
})
positions.right__2of3 = positions.full.dup({
  height: "screenSizeY",
  width: "2*screenSizeX/3",
  x: "screenOriginX+screenSizeX/3"
})
positions.right__1of4 = positions.full.dup({
  width: "screenSizeX/4",
  x: "screenOriginX+screenSizeX-screenSizeX/4"
})
positions.right__1of4__top__1of3 = positions.right__1of4.dup({
  height: "screenSizeY/3"
})
positions.right__1of4__top__2of3 = positions.right__1of4__top__1of3.dup({
  y: "screenOriginY+screenSizeY/3"
})
positions.right__1of4__top__3of3 = positions.right__1of4__top__1of3.dup({
  y: "screenOriginY+(screenSizeY/3*2)"
})

var tweetbotWidth = 600;
positions.tweetbot = slate.operation("move", {
  screen: 0,
  x: "screenOriginX+screenSizeX-" + tweetbotWidth,
  y: "screenOriginY",
  width: tweetbotWidth,
  height: "screenSizeY"
})

slate.log("❯ Positions defined")

var hashes = {}
Array({screen: 0, key: "main"}, {screen: 1, key: "secondary"}).forEach(function(hashOpts) {
  hashes[hashOpts.key] = {
    full: {operations: [positions.full.dup({screen: hashOpts.screen})]},
    left__half: {operations: [positions.left__half.dup({screen: hashOpts.screen})]},
    left__3of4: {operations: [positions.left__3of4.dup({screen: hashOpts.screen})]},
    left__2of3: {operations: [positions.left__2of3.dup({screen: hashOpts.screen})]},
    center_1of2: {operations: [positions.center_1of2.dup({screen: hashOpts.screen})]},
    right__half: {operations: [positions.right__half.dup({screen: hashOpts.screen})]},
    right_top__half: {operations: [positions.right_top__half.dup({screen: hashOpts.screen})]},
    right_bottom__half: {operations: [positions.right_bottom__half.dup({screen: hashOpts.screen})]},
    right__1of4: {operations: [positions.right__1of4.dup({screen: hashOpts.screen})]},
    right__1of3: {operations: [positions.right__1of3.dup({screen: hashOpts.screen})]},
    right__1of3__top__half: {operations: [positions.right__1of3__top__half.dup({screen: hashOpts.screen})]},
    right__1of3__bottom__half: {operations: [positions.right__1of3__bottom__half.dup({screen: hashOpts.screen})]},
    right__2of3: {operations: [positions.right__2of3.dup({screen: hashOpts.screen})]},
    right__1of4__top__1of3: {operations: [positions.right__1of4__top__1of3.dup({screen: hashOpts.screen})]},
    right__1of4__top__2of3: {operations: [positions.right__1of4__top__2of3.dup({screen: hashOpts.screen})]},
    right__1of4__top__3of3: {operations: [positions.right__1of4__top__3of3.dup({screen: hashOpts.screen})]}
  }
})

// default to ignore-fail & repeat
Object.keys(hashes).forEach(function(type) {
  Object.keys(hashes[type]).forEach(function(hashName) {
    if (hashes[type][hashName]["ignore-fail"] === undefined) {
      hashes[type][hashName]["ignore-fail"] = true
    }
    if (hashes[type][hashName].repeat === undefined) {
      hashes[type][hashName].repeat = true
    }
  })
})

slate.log("❯ Hashes defined", hashes)

var layouts = {}

layouts.XL = slate.layout("layout:XL", {
  Calendar: hashes.main.left__half,
  Wunderlist: hashes.main.right__half,

  Firefox: hashes.main.full,
  FirefoxDeveloperEdition: hashes.main.full, // Firefox
  Nightly: hashes.main.full, // Firefox
  GoogleChrome: hashes.main.full,
  Safari: hashes.main.full,

  Atom: hashes.main.right__2of3,
  SublimeText: hashes.main.right__2of3,

  Tweetbot: {
    operations: [positions.tweetbot],
    ignorefail: true,
    repeat: true
  },

  iTerm: hashes.secondary.left__half,
  Terminal: hashes.secondary.left__half,

  Messages: hashes.secondary.right_top__half,
  Skype: hashes.secondary.right_top__half,
  HipChat: hashes.secondary.right_top__half,
  Slack: hashes.secondary.right_top__half,
  Gitter: hashes.secondary.right_top__half,

  LimeChat: hashes.secondary.right_bottom__half
})

layouts.XM = layouts.XL

Array({key: "L", hashKey: "main"}, {key: "L_alt", hashKey: "secondary"}).forEach(function(layoutOpts) {
  var h = hashes[layoutOpts.hashKey]
  layouts[layoutOpts.key] = slate.layout("layout:" + layoutOpts.key, {
    Calendar: h.left__half,
    Wunderlist: h.right__half,

    Firefox: h.left__3of4,
    FirefoxDeveloperEdition: h.left__3of4, // Firefox
    Nightly: h.left__3of4, // Firefox
    GoogleChrome: h.left__3of4,
    Safari: h.left__3of4,

    Atom: h.center_1of2,
    SublimeText: h.center_1of2,

    Tweetbot: {
      operations: [positions.tweetbot.dup({
        screen: layoutOpts.key === "main" ? 0 : 1,
        x: "screenOriginX+screenSizeX-screenSizeX/4-" + tweetbotWidth,
      })],
      ignorefail: true,
      repeat: true
    },

    iTerm: h.right__1of4__top__1of3,
    Terminal: h.right__1of4__top__1of3,

    LimeChat: h.right__1of4__top__2of3,

    Messages: h.right__1of4__top__3of3,
    Skype: h.right__1of4__top__3of3,
    HipChat: h.right__1of4__top__3of3,
    Slack: h.right__1of4__top__3of3,
    Gitter: h.right__1of4__top__3of3,

    VLC: h.right__1of4__top__3of3,
    MPlayerX: h.right__1of4__top__3of3
  })
})

Array({key: "M", hashKey: "main"}, {key: "M_alt", hashKey: "secondary"}).forEach(function(layoutOpts) {
  var h = hashes[layoutOpts.hashKey]
  layouts[layoutOpts.key] = slate.layout("layout:" + layoutOpts.key, {
    Calendar: h.full,
    Wunderlist: h.right__half,

    Firefox: h.left__2of3,
    FirefoxDeveloperEdition: h.left__2of3, // Firefox
    Nightly: h.left__2of3, // Firefox
    GoogleChrome: h.left__2of3,
    Safari: h.left__2of3,

    Atom: h.left__2of3,
    SublimeText: h.left__2of3,

    Tweetbot: {
      operations: [positions.tweetbot.dup({
        screen: layoutOpts.key === "main" ? 0 : 1,
        x: "screenOriginX+screenSizeX-" + tweetbotWidth,
      })],
      ignorefail: true,
      repeat: true
    },

    iTerm: h.right__1of3__top__half,
    Terminal: h.right__1of3__top__half,

    LimeChat: h.right__1of3__bottom__half,

    Messages: h.right__1of3__bottom__half,
    Skype: h.right__1of3__bottom__half,
    HipChat: h.right__1of3__bottom__half,
    Slack: h.right__1of3__bottom__half,
    Gitter: h.right__1of3__bottom__half,

    VLC: h.right__1of3__bottom__half,
    MPlayerX: h.right__1of3__bottom__half
  })
})

slate.log("❯ Layouts defined")

var ifApp = function(apps, callback) {
  apps = typeof apps === "string" ? [apps] : apps;

  slate.eachApp(function(app) {
    if (apps.indexOf(app.name()) > -1) {
      callback(app)
    }
  })
}

// If a player is running a video, just make it take a quarter of the M screen,
// & make terminals take the rest of the left half
var adaptWhenVideoIsRunning = function() {
  ifApp(["VLC", "MPlayerX"], function(app) {
    app.eachWindow(function(window) {
      if (
          (
            // if VLC is playing
            app.name() === "VLC" ||
            // or if it"s MPlayer
            app.name() === "MPlayerX"
          ) &&
          // and if it"s visible (not an hidden window (eg. pause + minimized))
          !window.isMinimizedOrHidden()
      ) {
        slate.log("Video is running")

        // if two screens, move in the small screen on the top, using half of the height
        if (slate.screenCount() === 2) {
          window.doOperation(positions.left_top__half)

          // make terminals smaller
          slate.eachApp(function(app) {
            if (app.name() === "iTerm" || app.name() === "Terminal") {
              app.eachWindow(function(window) {
                if (window.isMain()) {
                  window.doOperation(positions.left_bottom__half)
                }
              })
            }
          })
        }
        // if one screen, move in the small screen on the top, using half of the height
        // else if (slate.screenCount() === 1) {
          // window.doOperation(positions.right__1of3)
        // }
      }
    })
  })
}

// Layout Operations
var layoutsOperations = {
  XL: slate.operation("layout", {name: "layout:XL"}),
  XM: slate.operation("layout", {name: "layout:XM"}),
  L: slate.operation("layout", {name: "layout:L"}),
  L_alt: slate.operation("layout", {name: "layout:L_alt"}),
  M: slate.operation("layout", {name: "layout:M"}),
  M_alt: slate.operation("layout", {name: "layout:M_alt"})
}

var universalLayout = function() {
  slate.log("❯ Universal layout")

  var screenModifier = slate.screenCount() === 2 ? "X" : ""
  var screenSize = slate.screenForRef(0).rect().width > 1440 ? "L" : "M"

  // if there is app(s) that require fullscreen (video games ?)
  // we just use the secondary screen as a main screen for other apps
  ifApp([
    "insurgency_osx"
  ], function() {
    screenModifier = ""
    screenSize += "_alt"
  })

  // slate.log("❯ Universal layout ", screenSize, screenModifier, layoutsOperations[screenModifier + screenSize])
  layoutsOperations[screenModifier + screenSize].run()

  // slate.log("❯ Universal layout: adapt video player")
  adaptWhenVideoIsRunning()
}

// Defaults when screens are detected
slate.default([monitorXL, monitorL], "layout:XL")
slate.default([monitorXL], "layout:L")
slate.default([monitorL, monitorM], "layout:XM")
slate.default([monitorM], "layout:M")

slate.log("❯ Defaults done")

slate.bindAll({
    // Layout Bindings
  "space:ctrl,alt": universalLayout,

  // Window Hints
  "esc:cmd": slate.operation("hint"),

  // Switch currently doesn"t work well so I"m commenting it out until I fix it.
  // "tab:cmd": slate.operation("switch"),

  // Grid
  "esc:ctrl": slate.operation("grid"),

  "1:cmd,alt,shift": function(win) {
    win.doOperation(positions.full)
  }
})

slate.log("❯ Binds done")
