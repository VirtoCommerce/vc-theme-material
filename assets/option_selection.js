function floatToString(t, e) {
  var o = t.toFixed(e).toString();
  return o.match(/^\.\d+/) ? "0" + o : o
}
if ("undefined" == typeof Shopify) var Shopify = {};
Shopify.each = function(t, e) {
  for (var o = 0; o < t.length; o++) e(t[o], o)
    }, Shopify.map = function(t, e) {
  for (var o = [], i = 0; i < t.length; i++) o.push(e(t[i], i));
  return o
}, Shopify.arrayIncludes = function(t, e) {
  for (var o = 0; o < t.length; o++)
    if (t[o] == e) return !0;
  return !1
}, Shopify.uniq = function(t) {
  for (var e = [], o = 0; o < t.length; o++) Shopify.arrayIncludes(e, t[o]) || e.push(t[o]);
  return e
}, Shopify.isDefined = function(t) {
  return "undefined" == typeof t ? !1 : !0
}, Shopify.getClass = function(t) {
  return Object.prototype.toString.call(t).slice(8, -1)
}, Shopify.extend = function(t, e) {
  function o() {}
  o.prototype = e.prototype, t.prototype = new o, t.prototype.constructor = t, t.baseConstructor = e, t.superClass = e.prototype
}, Shopify.urlParam = function(t) {
  var e = RegExp("[?&]" + t + "=([^&]*)").exec(window.location.search);
  return e && decodeURIComponent(e[1].replace(/\+/g, " "))
}, Shopify.Product = function(t) {
  Shopify.isDefined(t) && this.update(t)
}, Shopify.Product.prototype.update = function(t) {
  for (property in t) this[property] = t[property]
    }, Shopify.Product.prototype.optionNames = function() {
  return "Array" == Shopify.getClass(this.options) ? this.options : []
}, Shopify.Product.prototype.optionValues = function(t) {
  if (!Shopify.isDefined(this.variants)) return null;
  var e = Shopify.map(this.variants, function(e) {
    var o = "option" + (t + 1);
    return void 0 == e[o] ? null : e[o]
  });
  return null == e[0] ? null : Shopify.uniq(e)
}, Shopify.Product.prototype.getVariant = function(t) {
  var e = null;
  return t.length != this.options.length ? e : (Shopify.each(this.variants, function(o) {
    for (var i = !0, r = 0; r < t.length; r++) {
      var n = "option" + (r + 1);
      o[n] != t[r] && (i = !1)
    }
    return 1 == i ? void(e = o) : void 0
  }), e)
}, Shopify.Product.prototype.getVariantById = function(t) {
  for (var e = 0; e < this.variants.length; e++) {
    var o = this.variants[e];
    if (t == o.id) return o
      }
  return null
}, Shopify.money_format = "${{amount}}", Shopify.formatMoney = function(t, e) {
  function o(t, e) {
    return "undefined" == typeof t ? e : t
  }

  function i(t, e, i, r) {
    if (e = o(e, 2), i = o(i, ","), r = o(r, "."), isNaN(t) || null == t) return 0;
    t = (t / 100).toFixed(e);
    var n = t.split("."),
        a = n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + i),
        s = n[1] ? r + n[1] : "";
    return a + s
  }
  "string" == typeof t && (t = t.replace(".", ""));
  var r = "",
      n = /\{\{\s*(\w+)\s*\}\}/,
      a = e || this.money_format;
  switch (a.match(n)[1]) {
    case "amount":
      r = i(t, 2);
      break;
    case "amount_no_decimals":
      r = i(t, 0);
      break;
    case "amount_with_comma_separator":
      r = i(t, 2, ".", ",");
      break;
    case "amount_no_decimals_with_comma_separator":
      r = i(t, 0, ".", ",")
  }
  return a.replace(n, r)
}, Shopify.OptionSelectors = function(t, e) {
  return this.selectorDivClass = "selector-wrapper", this.selectorClass = "single-option-selector", this.variantIdFieldIdSuffix = "-variant-id", this.variantIdField = null, this.historyState = null, this.selectors = [], this.domIdPrefix = t, this.product = new Shopify.Product(e.product), this.onVariantSelected = Shopify.isDefined(e.onVariantSelected) ? e.onVariantSelected : function() {}, this.replaceSelector(t), this.initDropdown(), e.enableHistoryState && (this.historyState = new Shopify.OptionSelectors.HistoryState(this)), !0
}, Shopify.OptionSelectors.prototype.initDropdown = function() {
  var t = {
    initialLoad: !0
  },
      e = this.selectVariantFromDropdown(t);
  if (!e) {
    var o = this;
    setTimeout(function() {
      o.selectVariantFromParams(t) || o.fireOnChangeForFirstDropdown.call(o, t)
    })
  }
}, Shopify.OptionSelectors.prototype.fireOnChangeForFirstDropdown = function(t) {
  this.selectors[0].element.onchange(t)
}, Shopify.OptionSelectors.prototype.selectVariantFromParamsOrDropdown = function(t) {
  var e = this.selectVariantFromParams(t);
  e || this.selectVariantFromDropdown(t)
}, Shopify.OptionSelectors.prototype.replaceSelector = function(t) {
  var e = document.getElementById(t),
      o = e.parentNode;
  Shopify.each(this.buildSelectors(), function(t) {
    o.insertBefore(t, e)
  }), e.style.display = "none", this.variantIdField = e
}, Shopify.OptionSelectors.prototype.selectVariantFromDropdown = function(t) {
  var e = document.getElementById(this.domIdPrefix).querySelector("[selected]");
  if (!e) return !1;
  var o = e.value;
  return this.selectVariant(o, t)
}, Shopify.OptionSelectors.prototype.selectVariantFromParams = function(t) {
  var e = Shopify.urlParam("variant");
  return this.selectVariant(e, t)
}, Shopify.OptionSelectors.prototype.selectVariant = function(t, e) {
  var o = this.product.getVariantById(t);
  if (null == o) return !1;
  for (var i = 0; i < this.selectors.length; i++) {
    var r = this.selectors[i].element,
        n = r.getAttribute("data-option"),
        a = o[n];
    null != a && this.optionExistInSelect(r, a) && (r.value = a)
  }
  return "undefined" != typeof jQuery ? jQuery(this.selectors[0].element).trigger("change", e) : this.selectors[0].element.onchange(e), !0
}, Shopify.OptionSelectors.prototype.optionExistInSelect = function(t, e) {
  for (var o = 0; o < t.options.length; o++)
    if (t.options[o].value == e) return !0
      }, Shopify.OptionSelectors.prototype.insertSelectors = function(t, e) {
  Shopify.isDefined(e) && this.setMessageElement(e), this.domIdPrefix = "product-" + this.product.id + "-variant-selector";
  var o = document.getElementById(t);
  Shopify.each(this.buildSelectors(), function(t) {
    o.appendChild(t)
  })
}, Shopify.OptionSelectors.prototype.buildSelectors = function() {
  for (var t = 0; t < this.product.optionNames().length; t++) {
    var e = new Shopify.SingleOptionSelector(this, t, this.product.optionNames()[t], this.product.optionValues(t));
    e.element.disabled = !1, this.selectors.push(e)
  }
  var o = this.selectorDivClass,
      i = this.product.optionNames(),
      r = Shopify.map(this.selectors, function(t) {
        var e = document.createElement("div"),
            r = o;
        if ("undefined" != typeof t.name) {
          var n = t.name.name || t.name;
          r = o + " " + n.toLowerCase().replace(" ", "_")
        }
        if (e.setAttribute("class", r), i.length > 1 || i.length >= 1) {
          var a = document.createElement("label");
          a.htmlFor = t.element.id, a.innerHTML = t.name.name || t.name, e.appendChild(a);
          
          if(/size/i.test(n.toLowerCase()) && window.size_chart){
          var sizeChart = jQuery('<a id="size_chart_trigger" href="#" class="sizechart-ctl" data-ctl-toggle="#sizechart-ctl">' + window.size_chart_txt + '</a>');
          jQuery(a).append(sizeChart);
        }
        }
        
        return e.appendChild(t.element), e
      });
  return r
}, Shopify.OptionSelectors.prototype.selectedValues = function() {
  for (var t = [], e = 0; e < this.selectors.length; e++) {
    var o = this.selectors[e].element.value;
    t.push(o)
  }
  return t
}, Shopify.OptionSelectors.prototype.updateSelectors = function(t, e) {
  var o = this.selectedValues(),
      i = this.product.getVariant(o);
  i ? (this.variantIdField.disabled = !1, this.variantIdField.value = i.id) : this.variantIdField.disabled = !0, this.onVariantSelected(i, this, e), null != this.historyState && this.historyState.onVariantChange(i, this, e)
}, Shopify.OptionSelectorsFromDOM = function(t, e) {
  var o = e.optionNames || [],
      i = e.priceFieldExists || !0,
      r = e.delimiter || "/",
      n = this.createProductFromSelector(t, o, i, r);
  e.product = n, Shopify.OptionSelectorsFromDOM.baseConstructor.call(this, t, e)
}, Shopify.extend(Shopify.OptionSelectorsFromDOM, Shopify.OptionSelectors), Shopify.OptionSelectorsFromDOM.prototype.createProductFromSelector = function(t, e, o, i) {
  if (!Shopify.isDefined(o)) var o = !0;
  if (!Shopify.isDefined(i)) var i = "/";
  var r = document.getElementById(t),
      n = r.childNodes,
      a = (r.parentNode, e.length),
      s = [];
  Shopify.each(n, function(t) {
    if (1 == t.nodeType && "option" == t.tagName.toLowerCase()) {
      var r = t.innerHTML.split(new RegExp("\\s*\\" + i + "\\s*"));
      0 == e.length && (a = r.length - (o ? 1 : 0));
      var n = r.slice(0, a),
          p = o ? r[a] : "",
          l = (t.getAttribute("value"), {
            available: t.disabled ? !1 : !0,
            id: parseFloat(t.value),
            price: p,
            option1: n[0],
            option2: n[1],
            option3: n[2]
          });
      s.push(l)
    }
  });
  var p = {
    variants: s
  };
  if (0 == e.length) {
    p.options = [];
    for (var l = 0; a > l; l++) p.options[l] = "option " + (l + 1)
      } else p.options = e;
  return p
}, Shopify.SingleOptionSelector = function(t, e, o, i) {
  this.multiSelector = t, this.values = i, this.index = e, this.name = o, this.element = document.createElement("select");
  for (var r = 0; r < i.length; r++) {
    var n = document.createElement("option");
    n.value = i[r], n.innerHTML = i[r], this.element.appendChild(n)
  }
  return this.element.setAttribute("class", this.multiSelector.selectorClass), this.element.setAttribute("data-option", "option" + (e + 1)), this.element.id = t.domIdPrefix + "-option-" + e, this.element.onchange = function(o, i) {
    i = i || {}, t.updateSelectors(e, i)
  }, !0
}, Shopify.Image = {
  preload: function(t, e) {
    for (var o = 0; o < t.length; o++) {
      var i = t[o];
      this.loadImage(this.getSizedImageUrl(i, e))
    }
  },
  loadImage: function(t) {
    (new Image).src = t
  },
  switchImage: function(t, e, o) {
    if (t && e) {
      var i = this.imageSize(e.src),
          r = this.getSizedImageUrl(t.src, i);
      o ? o(r, t, e) : e.src = r
    }
  },
  imageSize: function(t) {
    var e = t.match(/_(1024x1024|2048x2048|pico|icon|thumb|small|compact|medium|large|grande)\./);
    return null != e ? e[1] : null
  },
  getSizedImageUrl: function(t, e) {
    if (null == e) return t;
    if ("master" == e) return this.removeProtocol(t);
    var o = t.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
    if (null != o) {
      var i = t.split(o[0]),
          r = o[0];
      return this.removeProtocol(i[0] + "_" + e + r)
    }
    return null
  },
  removeProtocol: function(t) {
    return t.replace(/http(s)?:/, "")
  }
}, Shopify.OptionSelectors.HistoryState = function(t) {
  this.browserSupports() && this.register(t)
}, Shopify.OptionSelectors.HistoryState.prototype.register = function(t) {
  window.addEventListener("popstate", function() {
    t.selectVariantFromParamsOrDropdown({
      popStateCall: !0
    })
  })
}, Shopify.OptionSelectors.HistoryState.prototype.onVariantChange = function(t, e, o) {
  this.browserSupports() && (!t || o.initialLoad || o.popStateCall || window.history.replaceState({}, document.title, "?variant=" + t.id))
}, Shopify.OptionSelectors.HistoryState.prototype.browserSupports = function() {
  return window.history && window.history.replaceState
};