module.exports = '\n<!-- - vars = package.json-->\n<element name="polymer-flex-layout" attributes="open closed vertical target targetId">\n  <!-- template-->\n  <!-- include style.css-->\n  <template>\n    <style>\n      @host {\n        * {\n          display: none;\n        }\n      }\n    </style>\n  </template><script type="text/javascript">\nvar stylize;\n\nstylize = function(element, styles) {\n  var style;\n  style = element.style;\n  return Object.keys(styles).forEach(function(k) {\n    return style[k] = styles[k];\n  });\n};\n\nPolymer.register(this, {\n  vertical: false,\n  ready: function() {\n    return this.setAttribute("nolayout", "");\n  },\n  inserted: function() {\n    return this.asyncMethod(function() {\n      this.prepare();\n      return this.layout();\n    });\n  },\n  prepare: function() {\n    var cs, parent, vertical;\n    parent = this.parentNode.host || this.parentNode;\n    cs = window.getComputedStyle(parent);\n    if (cs.position === "static") {\n      parent.style.position = "relative";\n    }\n    parent.style.overflow = "hidden";\n    vertical = void 0;\n    this.parentNode.childNodes.forEach(function(c, i) {\n      if (c.nodeType === Node.ELEMENT_NODE && !c.hasAttribute("nolayout")) {\n        stylize(c, {\n          position: "absolute",\n          boxSizing: "border-box",\n          MozBoxSizing: "border-box"\n        });\n        if (vertical === undefined) {\n          return vertical = c.offsetWidth === 0 && c.offsetHeight !== 0;\n        }\n      }\n    });\n    return this.vertical = this.vertical || vertical;\n  },\n  layout: function() {\n    var fit, hh, list, mxp, myp, parent, post, pre, v, vertical, ww;\n    parent = this.parentNode.host || this.parentNode;\n    vertical = this.vertical;\n    ww = 0;\n    hh = 0;\n    pre = [];\n    fit = void 0;\n    post = [];\n    list = pre;\n    this.parentNode.childNodes.forEach(function(c, i) {\n      var info;\n      if (c.nodeType === Node.ELEMENT_NODE && !c.hasAttribute("nolayout")) {\n        info = {\n          element: c,\n          w: c.offsetWidth,\n          h: c.offsetHeight\n        };\n        if (!c.hasAttribute("fit")) {\n          ww += c.offsetWidth;\n          hh += c.offsetHeight;\n          return list.push(info);\n        } else {\n          fit = c;\n          list = post;\n          return ww = hh = 0;\n        }\n      }\n    });\n    v = 0;\n    mxp = 0;\n    myp = 0;\n    pre.forEach(function(info) {\n      if (vertical) {\n        stylize(info.element, {\n          top: v + "px",\n          right: mxp,\n          height: info.h + "px",\n          left: mxp\n        });\n      } else {\n        stylize(info.element, {\n          top: myp,\n          width: info.w + "px",\n          bottom: myp,\n          left: v + "px"\n        });\n      }\n      return v += (vertical ? info.h : info.w);\n    });\n    if (fit) {\n      if (vertical) {\n        stylize(fit, {\n          top: v + "px",\n          right: mxp,\n          bottom: hh + "px",\n          left: mxp\n        });\n      } else {\n        stylize(fit, {\n          top: myp,\n          right: ww + "px",\n          bottom: myp,\n          left: v + "px"\n        });\n      }\n      v = (vertical ? hh : ww);\n      return post.forEach(function(info) {\n        v -= (vertical ? info.h : info.w);\n        if (vertical) {\n          return stylize(info.element, {\n            height: info.h + "px",\n            right: mxp,\n            bottom: v + "px",\n            left: mxp\n          });\n        } else {\n          return stylize(info.element, {\n            top: myp,\n            right: v + "px",\n            bottom: myp,\n            width: info.w + "px"\n          });\n        }\n      });\n    }\n  }\n});\n</script>\n</element>';