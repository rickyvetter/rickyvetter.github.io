// Trianglify. Needs d3js
function Trianglify(options) {
    if (typeof options == 'undefined') options = {};
    // defaults
    this.options = {
        cellsize: defaults(options.cellsize, 150), // zero not valid here
        bleed: defaults(options.cellsize, 150),
        cellpadding: defaults(options.cellpadding, 0.1*options.cellsize || 15),
        x_gradient: defaults(options.x_gradient, ["#000", "#FFF"]),
    }
    this.options.y_gradient = options.y_gradient || this.options.x_gradient.map(function(c){return Trianglify.rgb(c).brighter(.5)})
    function defaults(opt, def) {
        return (typeof opt !== 'undefined') ?  opt : def;
    }
}

Trianglify.prototype.generate = function(width, height) {
    return new Trianglify.Pattern(this.options, width, height);
}

Trianglify.Pattern = function(options, width, height) {
    this.options = options
    this.width = width;
    this.height = height;
    this.svg = this.generateSVG();

    var s = new XMLSerializer();
    this.svgString = s.serializeToString(this.svg);
    this.base64 = btoa(this.svgString);
    this.dataUri = 'data:image/svg+xml;base64,' + this.base64;
    this.dataUrl = 'url('+this.dataUri+')';
}

Trianglify.Pattern.prototype.append = function() {
    document.body.appendChild(this.svg);
}

Trianglify.Pattern.gradient_2d = function (x_gradient, y_gradient, width, height) {
    
    return function(x, y) {
        var color_x = Trianglify.scale.linear()
            .range(x_gradient)
            .domain(Trianglify.range(0, width, width/x_gradient.length)); //[-bleed, width+bleed]
        var color_y = Trianglify.scale.linear()
            .range(y_gradient)
            .domain(Trianglify.range(0, height, height/y_gradient.length)); //[-bleed, width+bleed]
        return Trianglify.interpolateRgb(color_x(x), color_y(y))(0.5);
    }
}

Trianglify.Pattern.prototype.generateSVG = function () {
    var options = this.options;
    cellsX = Math.ceil((this.width+options.bleed*2)/options.cellsize),
    cellsY = Math.ceil((this.height+options.bleed*2)/options.cellsize),
    color = Trianglify.Pattern.gradient_2d(options.x_gradient, options.y_gradient, this.width, this.height);

    var vertices = Trianglify.range(cellsX*cellsY).map(function(d) {
    // figure out which cell we are in
    var col = d % cellsX;
    var row = Math.floor(d / cellsX);
    var x = -options.bleed + col*options.cellsize + Math.random() * (options.cellsize - options.cellpadding*2) + options.cellpadding;
    var y = -options.bleed + row*options.cellsize + Math.random() * (options.cellsize - options.cellpadding*2) + options.cellpadding;
    // return [x*cellsize, y*cellsize];
    return [x, y]; // Populate the actual background with points
    });

    var elem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var svg = Trianglify.select(elem);
    svg.attr("width", this.width);
    svg.attr("height", this.height);
    svg.attr('xmlns', 'http://www.w3.org/2000/svg');
    var group = svg.append("g");

    var polys = Trianglify.geom.delaunay(vertices);
    polys.forEach(function(d) {
        var x = (d[0][0] + d[1][0] + d[2][0])/3;
        var y = (d[0][1] + d[1][1] + d[2][1])/3;
        var c = color(x, y);
        group.append("path").attr("d", "M" + d.join("L") + "Z").attr({ fill: c, stroke: c});
    })
    return svg.node();
}

// reworked D3 functions
  Trianglify.range = function(start, stop, step) {
    if (arguments.length < 3) {
      step = 1;
      if (arguments.length < 2) {
        stop = start;
        start = 0;
      }
    }
    if ((stop - start) / step === Infinity) throw new Error("infinite range");
    var range = [], k = trianglify_range_integerScale(Math.abs(step)), i = -1, j;
    start *= k, stop *= k, step *= k;
    if (step < 0) while ((j = start + step * ++i) > stop) range.push(j / k); else while ((j = start + step * ++i) < stop) range.push(j / k);
    return range;
  };

  function trianglify_range_integerScale(x) {
    var k = 1;
    while (x * k % 1) k *= 10;
    return k;
  }

  Trianglify.interpolateRgb = trianglify_interpolateRgb;
  function trianglify_interpolateRgb(a, b) {
    a = Trianglify.rgb(a);
    b = Trianglify.rgb(b);
    var ar = a.r, ag = a.g, ab = a.b, br = b.r - ar, bg = b.g - ag, bb = b.b - ab;
    return function(t) {
      return "#" + trianglify_rgb_hex(Math.round(ar + br * t)) + trianglify_rgb_hex(Math.round(ag + bg * t)) + trianglify_rgb_hex(Math.round(ab + bb * t));
    };
  }

  function trianglify_rgb_hex(v) {
    return v < 16 ? "0" + Math.max(0, v).toString(16) : Math.min(255, v).toString(16);
  }

  Trianglify.rgb = function(r, g, b) {
    return arguments.length === 1 ? r instanceof trianglify_Rgb ? trianglify_rgb(r.r, r.g, r.b) : trianglify_rgb_parse("" + r, trianglify_rgb, trianglify_hsl_rgb) : trianglify_rgb(~~r, ~~g, ~~b);
  };
  function trianglify_rgb(r, g, b) {
    return new trianglify_Rgb(r, g, b);
  }
  function trianglify_Rgb(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  function trianglify_rgb_parse(format, rgb, hsl) {
    var r = 0, g = 0, b = 0, m1, m2, color;
    m1 = /([a-z]+)\((.*)\)/i.exec(format);
    if (m1) {
      m2 = m1[2].split(",");
      switch (m1[1]) {
       case "hsl":
        {
          return hsl(parseFloat(m2[0]), parseFloat(m2[1]) / 100, parseFloat(m2[2]) / 100);
        }

       case "rgb":
        {
          return rgb(trianglify_rgb_parseNumber(m2[0]), trianglify_rgb_parseNumber(m2[1]), trianglify_rgb_parseNumber(m2[2]));
        }
      }
    }
    if (format != null && format.charAt(0) === "#" && !isNaN(color = parseInt(format.substring(1), 16))) {
      if (format.length === 4) {
        r = (color & 3840) >> 4;
        r = r >> 4 | r;
        g = color & 240;
        g = g >> 4 | g;
        b = color & 15;
        b = b << 4 | b;
      } else if (format.length === 7) {
        r = (color & 16711680) >> 16;
        g = (color & 65280) >> 8;
        b = color & 255;
      }
    }
    return rgb(r, g, b);
  }
  function trianglify_hsl_rgb(h, s, l) {
    var m1, m2;
    h = isNaN(h) ? 0 : (h %= 360) < 0 ? h + 360 : h;
    s = isNaN(s) ? 0 : s < 0 ? 0 : s > 1 ? 1 : s;
    l = l < 0 ? 0 : l > 1 ? 1 : l;
    m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
    m1 = 2 * l - m2;
    function v(h) {
      if (h > 360) h -= 360; else if (h < 0) h += 360;
      if (h < 60) return m1 + (m2 - m1) * h / 60;
      if (h < 180) return m2;
      if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
      return m1;
    }
    function vv(h) {
      return Math.round(v(h) * 255);
    }
    return trianglify_rgb(vv(h + 120), vv(h), vv(h - 120));
  }
  Trianglify.scale = {};
  Trianglify.scale.linear = function() {
    return trianglify_scale_linear([ 0, 1 ], [ 0, 1 ], trianglify_interpolate, false);
  };
  function trianglify_scale_linear(domain, range, interpolate, clamp) {
    var output, input;
    function rescale() {
      var linear = Math.min(domain.length, range.length) > 2 ? trianglify_scale_polylinear : trianglify_scale_bilinear, uninterpolate = clamp ? trianglify_uninterpolateClamp : trianglify_uninterpolateNumber;
      output = linear(domain, range, uninterpolate, interpolate);
      input = linear(range, domain, uninterpolate, trianglify_interpolate);
      return scale;
    }
    function scale(x) {
      return output(x);
    }
    scale.invert = function(y) {
      return input(y);
    };
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      domain = x.map(Number);
      return rescale();
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };
    scale.rangeRound = function(x) {
      return scale.range(x).interpolate(trianglify_interpolateRound);
    };
    scale.clamp = function(x) {
      if (!arguments.length) return clamp;
      clamp = x;
      return rescale();
    };
    scale.interpolate = function(x) {
      if (!arguments.length) return interpolate;
      interpolate = x;
      return rescale();
    };
    scale.ticks = function(m) {
      return trianglify_scale_linearTicks(domain, m);
    };
    scale.tickFormat = function(m, format) {
      return trianglify_scale_linearTickFormat(domain, m, format);
    };
    scale.nice = function(m) {
      trianglify_scale_linearNice(domain, m);
      return rescale();
    };
    scale.copy = function() {
      return trianglify_scale_linear(domain, range, interpolate, clamp);
    };
    return rescale();
  }


  Trianglify.interpolateRgb = trianglify_interpolateRgb;
  function trianglify_interpolateRgb(a, b) {
    a = Trianglify.rgb(a);
    b = Trianglify.rgb(b);
    var ar = a.r, ag = a.g, ab = a.b, br = b.r - ar, bg = b.g - ag, bb = b.b - ab;
    return function(t) {
      return "#" + trianglify_rgb_hex(Math.round(ar + br * t)) + trianglify_rgb_hex(Math.round(ag + bg * t)) + trianglify_rgb_hex(Math.round(ab + bb * t));
    };
  }
  Trianglify.interpolateObject = trianglify_interpolateObject;
  function trianglify_interpolateObject(a, b) {
    var i = {}, c = {}, k;
    for (k in a) {
      if (k in b) {
        i[k] = trianglify_interpolate(a[k], b[k]);
      } else {
        c[k] = a[k];
      }
    }
    for (k in b) {
      if (!(k in a)) {
        c[k] = b[k];
      }
    }
    return function(t) {
      for (k in i) c[k] = i[k](t);
      return c;
    };
  }
  Trianglify.interpolateNumber = trianglify_interpolateNumber;
  function trianglify_interpolateNumber(a, b) {
    b -= a = +a;
    return function(t) {
      return a + b * t;
    };
  }
  Trianglify.interpolateString = trianglify_interpolateString;
  function trianglify_interpolateString(a, b) {
    var bi = trianglify_interpolate_numberA.lastIndex = trianglify_interpolate_numberB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
    a = a + "", b = b + "";
    while ((am = trianglify_interpolate_numberA.exec(a)) && (bm = trianglify_interpolate_numberB.exec(b))) {
      if ((bs = bm.index) > bi) {
        bs = b.substring(bi, bs);
        if (s[i]) s[i] += bs; else s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) {
        if (s[i]) s[i] += bm; else s[++i] = bm;
      } else {
        s[++i] = null;
        q.push({
          i: i,
          x: trianglify_interpolateNumber(am, bm)
        });
      }
      bi = trianglify_interpolate_numberB.lastIndex;
    }
    if (bi < b.length) {
      bs = b.substring(bi);
      if (s[i]) s[i] += bs; else s[++i] = bs;
    }
    return s.length < 2 ? q[0] ? (b = q[0].x, function(t) {
      return b(t) + "";
    }) : function() {
      return b;
    } : (b = q.length, function(t) {
      for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    });
  }
  var trianglify_interpolate_numberA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, trianglify_interpolate_numberB = new RegExp(trianglify_interpolate_numberA.source, "g");
  Trianglify.interpolate = trianglify_interpolate;
  function trianglify_interpolate(a, b) {
    var i = Trianglify.interpolators.length, f;
    while (--i >= 0 && !(f = Trianglify.interpolators[i](a, b))) ;
    return f;
  }
  Trianglify.interpolators = [ function(a, b) {
    var t = typeof b;
    return (t === "string" ? trianglify_rgb_names.has(b) || /^(#|rgb\(|hsl\()/.test(b) ? trianglify_interpolateRgb : trianglify_interpolateString : b instanceof trianglify_Color ? trianglify_interpolateRgb : Array.isArray(b) ? trianglify_interpolateArray : t === "object" && isNaN(b) ? trianglify_interpolateObject : trianglify_interpolateNumber)(a, b);
  } ];
  Trianglify.interpolateArray = trianglify_interpolateArray;
  function trianglify_interpolateArray(a, b) {
    var x = [], c = [], na = a.length, nb = b.length, n0 = Math.min(a.length, b.length), i;
    for (i = 0; i < n0; ++i) x.push(trianglify_interpolate(a[i], b[i]));
    for (;i < na; ++i) c[i] = a[i];
    for (;i < nb; ++i) c[i] = b[i];
    return function(t) {
      for (i = 0; i < n0; ++i) c[i] = x[i](t);
      return c;
    };
  }