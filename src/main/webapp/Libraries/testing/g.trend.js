/*
 * Handling the job for drawing the trend line chart.
 * 
 * Author: Shan Huang
 * Last update: 2013/06/14
 */

Raphael.fn.drawGrid = function(x, y, w, h, wv, hv, color) {
	color = color || "#cacaca";
	var path = [ "M", Math.round(x) + .5 + "", Math.round(y) + .5 + "", "L",
			Math.round(x + w) + .5 + "", Math.round(y) + .5 + "", Math.round(x + w) + .5 + "",
			Math.round(y + h) + .5 + "", Math.round(x) + .5 + "", Math.round(y + h) + .5 + "",
			Math.round(x) + .5 + "", Math.round(y) + .5 + "" ], rowHeight = h / hv, columnWidth = w
			/ wv;
	for(var i = 1; i < hv; i++) {
		path = path.concat(["M", Math.round(x) + .5, Math.round(y + i * rowHeight) + .5, "H", Math.round(x + w) + .5]);
	}
	for(i = 1; i < wv; i++) {
		path = path.concat(["M", Math.round(x + i * columnWidth) + .5, Math.round(y) + .5, "V", Math.round(y + h) + .5]);
	}
	return this.path(path.join(",")).attr({
		stroke: color
	});
};

function getAnchors(p1x, p1y, p2x, p2y, p3x, p3y) {
	var l1 = (p2x - p1x) / 2,
		l2 = (p3x - p2x) / 2,
		a = Math.atan((p2x - p1x) / Math.abs(p2y - p1y)),
		b = Math.atan((p3x - p2x) / Math.abs(p2y - p3y));
	a = p1y < p2y ? Math.PI - a : a;
	b = p3y < p2y ? Math.PI - b : b;
	var alpha = Math.PI / 2 - ((a + b) % (Math.PI * 2)) / 2,
		dx1 = l1 * Math.sin(alpha + a),
		dy1 = l1 * Math.cos(alpha + a),
		dx2 = l2 * Math.sin(alpha + b),
		dy2 = l2 * Math.cos(alpha + b);
	return {
		x1: p2x - dx1,
		y1: p2y + dy1,
		x2: p2x + dx2,
		y2: p2y + dy2
	};
}

function drawLine(conf) {
	var lines = !conf.lines ? '' : conf.lines,
		data = !conf.data ? '' : conf.data,
		xlabels = !conf.xlabels ? '' : conf.xlabels,
		comment1 = !conf.comment1 ? '' : conf.comment1,
		comment2 = !conf.comment2 ? '' : conf.comment2,
		max = !conf.max ? '0' : conf.max,
		holder = !conf.holder ? '' : conf.holder,
		spewidth = !conf.spewidth ? 500 : conf.spewidth,
		speheight = !conf.speheight ? 300 : conf.speheight,
		showarea = !conf.showarea ? false : conf.showarea,
		curveline = !conf.showarea ? false : conf.curveline,
		mousecoords = !conf.mousecoords ? 'rect' : conf.mousecoords,
		nodot = !conf.nodot ? false : conf.nodot,
		nogrid = !conf.nogrid ? false : conf.nogrid,
		gridcolor = !conf.gridcolor ? '#CCC' : conf.gridcolor,
		dotcolor = !conf.dotcolor ? '#FFF' : conf.dotcolor,
		lpos = !conf.lpos ? 'top' : conf.lpos,
		nLine = !conf.nLine ? 0 : conf.nLine,
		colors = !conf.colors ? '#333' : conf.colors;
	
	/**
	 * DEBUG
	 */
	if (false) {
		var msg = "[DEBUG] Parameters in drawLine: ";
		msg += "\n lines = " + lines;
		msg += "\n data = " + data;
		msg += "\n xLabel = " + xlabels;
		msg += "\n w = " + spewidth;
		msg += "\n h = " + speheight;
		msg += "\n max = " + max;
		msg += "\n nLine = " + nLine;
		msg += "\n colors = " + colors;
		alert(msg);
	}
	
	var width = spewidth,
		height = speheight,
		leftgutter = 40,
		rightgutter = 25,
		topgutter = lpos == 'top' ? 30 : 20,
		bottomgutter = lpos == 'bottom' ? 50 : 30,
		r = holder,
 		txt = {
			font : '10px Tahoma, Arial',
			fill : "#000"
		},
		txt1 = {
			font : 'bold 11px Tahoma, Arial',
			fill : "#000"
		},
		txt2 = {
			font : 'bold 10px Tahoma, Arial',
			fill : "#000"
		},
		legendtextattr = {
			font : 'bold 12px Tahoma, Arial',
			fill : "#000"
		},
		X = (width - leftgutter - rightgutter) / (xlabels.length - 1),
		Y = max == 0 ? 0 : (height - bottomgutter - topgutter) / max;
		cols = data.length - 1,
		rows = 10,
		color = colors[nLine];
		
	var ylabels = [];
	
	if (max != 0) {
		for (var i = 0; i <= max; i+=(max/rows)) {
			
			if (lines[0] == 'Frequency')
				ylabels.push(Math.round(i));
			else{// Preserve four decimal points
				ylabels.push(Math.round(i * 10000) / 10000);
			
				}
				
		}
		/*
		 * Special handle case for float point "overflow" (ex: 93.2300000001)
		 * In this case will miss the last y-label which is the max,
		 * here add it manually
		 * (y-label length should always be 11)
		 */
		if (ylabels.length == 10)
			ylabels.push(max);
	}
	
	if(!r.gridDrawn && nogrid == false)
		r.drawGrid(leftgutter, topgutter, width - leftgutter - rightgutter, height - topgutter - bottomgutter, cols, rows, gridcolor);
	
	var path = r.path().attr({
		stroke: color,
		"stroke-width": 4,
		"stroke-linejoin": "round"
	}),
		bgp = showarea == true ? r.path().attr({
			stroke: "none",
			opacity: .3,
			fill: color
		})
		: r.path().attr({
			stroke: "none",
			opacity: 0,
			fill: color
		}).hide(),
		label = r.set(),
		leave_timer = 0, blanket = r.set();
	label.push(r.text(60, 12, "0.1234").attr(txt1));
	label.push(r.text(60, 27, "20XX-XX-XX").attr(txt2).attr({
		fill: "#000"
	}));
	label.hide();
	var frame = r.popup(100, 100, label, "right").attr({
		fill: "#FFF",
		stroke: color,
		"stroke-width": 2,
		"fill-opacity": .8
	}).hide();
	
	// Draw Legends (canvas, lines, legendAttr, colors, legendPosition)
	if(!r.gridDrawn && nogrid == false)
		drawChartLegend(r, lines, legendtextattr, colors, lpos);

	// Draw Y Labels
	for ( var i = 0, ii = ylabels.length - 1; i <= ii; i++) {
		r.gridDrawn == false ? ylabels.length > 120 ? i % 2 == 0 ? false : r
				.text(
						leftgutter * .5,
						(height - topgutter - bottomgutter) / rows * i
								+ topgutter, ylabels[ii - i]).attr(txt)
				.toBack() : r.text(leftgutter * .5,
				(height - topgutter - bottomgutter) / rows * i + topgutter,
				ylabels[ii - i]).attr(txt).toBack() : false;
	}
	
	var x = 0,
		y = 0,
		p = new Array(),
		bgpp = new Array();
	for(var i = 0, ii = xlabels.length; i < ii; i++) {
			y = Math.round(height - bottomgutter - Y * data[i]);
			x = Math.round(leftgutter + X * i);
			var points = xlabels.length,
				lW = 75,  /* assume single label is around 75px wide */
				numFit = Math.round(width / lW), /* get how many labels would be fit for chart width */
				manyTimes = Math.round(points / numFit);
			
			/**
			 * DEBUG
			 */
			if (false) {
				var msg = "[DEBUG]: ";
				msg += "\n points = " + points;
				msg += "\n numFit = " + numFit;
				msg += "\n manyTimes = " + manyTimes;
				alert(msg);
			}
			
			// Draw X Labels
			if (r.gridDrawn == false) {
				if (manyTimes == 0) {
					r.text(x, height - bottomgutter + 15, xlabels[i]).attr(txt).toBack();
				}
				if (manyTimes > 0) {
					if (i % manyTimes == 0)
						r.text(x, height - bottomgutter + 15, xlabels[i]).attr(txt).toBack();
				}
			}
		if(!i) {
			p = ["M", x, y, "C", x, y];
			bgpp = ["M", leftgutter + X * .5, height - bottomgutter, "L", x, y, "C", x, y];
		}
		if(i && i < ii - 1) {
			var Y0 = Math.round(height - bottomgutter - Y * data[i - 1]),
				X0 = Math.round(leftgutter + X * (i - .5)),
				Y2 = Math.round(height - bottomgutter - Y * data[i + 1]),
				X2 = Math.round(leftgutter + X * (i + 1.5));
			if(curveline) {
				var a = getAnchors(X0, Y0, x, y, X2, Y2);
				p = p.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
				bgpp = bgpp.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
			} else {
				p = p.concat([x, y, x, y, x, y]);
				bgpp = bgpp.concat([x, y, x, y, x, y]);
			}
		}
		if(mousecoords == 'circle') {
			blanket.push(r.circle(x, y, 14).attr({
				stroke: "none",
				fill: "#fff",
				opacity: 0
			}));
		} else if(mousecoords == 'rect') {
			blanket.push(r.rect(leftgutter + X * i, 0, X, height - bottomgutter).attr({
				stroke: "none",
				fill: "#fff",
				opacity: 0
			}));
		}
		var rect = blanket[blanket.length - 1];
		(function(x, y, data, lbl, line1, line2, dot) {
			rect.hover(function() {
				frame.toFront();
				label[0].toFront();
				label[1].toFront();
				blanket.toFront();
				clearTimeout(leave_timer);
				
				/*
				 * Postion of the popup need the follow orders
				 */
                var side = "top";
                // For those peak points
				if (y - frame.getBBox().height <= 0) {
                    side = "bottom";
                }
				// For the first point
                if (x - frame.getBBox().width <= 0) {
                    side = "right";
                }
				// For the last point
                if (x + frame.getBBox().width > width) {
                    side = "left";
                }
                
                var ppp = r.popup(x, y, label, side, 1),
                    anim = Raphael.animation({
                        path: ppp.path,
                        transform: ["t", ppp.dx, ppp.dy]
                    	}, 100);
                lx = label[0].transform()[0][1] + ppp.dx;
                ly = label[0].transform()[0][2] + ppp.dy;
                frame.show().stop().animate(anim);
                label[0].attr({text: data}).show().stop().animateWith(frame, anim, {transform: ["t", lx, ly]}, 100);
                label[1].attr({text: lbl}).show().stop().animateWith(frame, anim, {transform: ["t", lx, ly]}, 100);
                if(dot){
	                dot.attr("r", 6);
	            }
            }, function() {
            	if(dot){
					dot.attr("r", 4);
				}
                leave_timer = setTimeout(function () {
                    frame.hide();
                    label[0].hide();
                    label[1].hide();
                }, 1);
			});
		})(x, y, data[i], xlabels[i], comment1[i], comment2[i], dot);
	}
	r.gridDrawn = true;
	p = p.concat([x, y, x, y]);
	bgpp = bgpp.concat([x, y, x, y, "L", x, height - bottomgutter, "z"]);
	path.attr({
		path: p
	});
	bgp.attr({
		path: bgpp
	});
	
	// Trend line animation at the first draw (Old functions used)
		path.hide();
	var pathOrig = new Object(path);
	var str_path_from = get_str_path_from(path.attrs['path'], height
			- bottomgutter, 0 + topgutter);

	// Rebuild the path with attributes used before
	path = r.path().attr({
		stroke : color,
		"stroke-width" : 4,
		"stroke-linejoin" : "round",
		path : str_path_from
	});
	animatePath(path, pathOrig);

	path = new Object(pathOrig);

	// Re-draw all the dot points (otherwise will overlay with lines)
	for ( var i = 0, ii = xlabels.length; i < ii; i++) {
		var y = Math.round(height - bottomgutter - Y * data[i]), x = Math
				.round(leftgutter + X * i);
		if (!nodot) {
			var dot = r.circle(x, y, 4).attr({
				fill : dotcolor,
				stroke : color,
				"stroke-width" : 2
			});
			if (y == 0) {
				dot.attr({
					opacity : 0
				});
			}
		}
	}
}
(function() {
	var tokenRegex = /\{([^\}]+)\}/g,
		objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
		replacer = function(all, key, obj) {
			var res = obj;
			key.replace(objNotationRegex, function(all, name, quote, quotedName, isFunc) {
				name = name || quotedName;
				if(res) {
					if(name in res) {
						res = res[name];
					}
					typeof res == "function" && isFunc && (res = res());
				}
			});
			res = (res == null || res == obj ? all : res) + "";
			return res;
		},
		fill = function(str, obj) {
			return String(str).replace(tokenRegex, function(all, key) {
				return replacer(all, key, obj);
			});
		};
	Raphael.fn.popup = function(X, Y, set, pos, ret) {
		pos = String(pos || "top-middle").split("-");
		pos[1] = pos[1] || "middle";
		var r = 5,
			bb = set.getBBox(),
			w = Math.round(bb.width),
			h = Math.round(bb.height),
			x = Math.round(bb.x) - r,
			y = Math.round(bb.y) - r,
			gap = Math.min(h / 2, w / 2, 10),
			shapes = {
				top: "M{x},{y}h{w4},{w4},{w4},{w4}a{r},{r},0,0,1,{r},{r}v{h4},{h4},{h4},{h4}a{r},{r},0,0,1,-{r},{r}l-{right},0-{gap},{gap}-{gap}-{gap}-{left},0a{r},{r},0,0,1-{r}-{r}v-{h4}-{h4}-{h4}-{h4}a{r},{r},0,0,1,{r}-{r}z",
				bottom: "M{x},{y}l{left},0,{gap}-{gap},{gap},{gap},{right},0a{r},{r},0,0,1,{r},{r}v{h4},{h4},{h4},{h4}a{r},{r},0,0,1,-{r},{r}h-{w4}-{w4}-{w4}-{w4}a{r},{r},0,0,1-{r}-{r}v-{h4}-{h4}-{h4}-{h4}a{r},{r},0,0,1,{r}-{r}z",
				right: "M{x},{y}h{w4},{w4},{w4},{w4}a{r},{r},0,0,1,{r},{r}v{h4},{h4},{h4},{h4}a{r},{r},0,0,1,-{r},{r}h-{w4}-{w4}-{w4}-{w4}a{r},{r},0,0,1-{r}-{r}l0-{bottom}-{gap}-{gap},{gap}-{gap},0-{top}a{r},{r},0,0,1,{r}-{r}z",
				left: "M{x},{y}h{w4},{w4},{w4},{w4}a{r},{r},0,0,1,{r},{r}l0,{top},{gap},{gap}-{gap},{gap},0,{bottom}a{r},{r},0,0,1,-{r},{r}h-{w4}-{w4}-{w4}-{w4}a{r},{r},0,0,1-{r}-{r}v-{h4}-{h4}-{h4}-{h4}a{r},{r},0,0,1,{r}-{r}z"
			},
			mask = [{
				x: x + r,
				y: y,
				w: w,
				w4: w / 4,
				h4: h / 4,
				right: 0,
				left: w - gap * 2,
				bottom: 0,
				top: h - gap * 2,
				r: r,
				h: h,
				gap: gap
			}, {
				x: x + r,
				y: y,
				w: w,
				w4: w / 4,
				h4: h / 4,
				left: w / 2 - gap,
				right: w / 2 - gap,
				top: h / 2 - gap,
				bottom: h / 2 - gap,
				r: r,
				h: h,
				gap: gap
			}, {
				x: x + r,
				y: y,
				w: w,
				w4: w / 4,
				h4: h / 4,
				left: 0,
				right: w - gap * 2,
				top: 0,
				bottom: h - gap * 2,
				r: r,
				h: h,
				gap: gap
			}][pos[1] == "middle" ? 1 : (pos[1] == "top" || pos[1] == "left") * 2];
		var dx = 0,
			dy = 0,
			out = this.path(fill(shapes[pos[0]], mask)).insertBefore(set);
		switch(pos[0]) {
		case "top":
			dx = X - (x + r + mask.left + gap);
			dy = Y - (y + r + h + r + gap);
			break;
		case "bottom":
			dx = X - (x + r + mask.left + gap);
			dy = Y - (y - gap);
			break;
		case "left":
			dx = X - (x + r + w + r + gap);
			dy = Y - (y + r + mask.top + gap);
			break;
		case "right":
			dx = X - (x - gap);
			dy = Y - (y + r + mask.top + gap);
			break;
		}
		out.translate(dx, dy);
		if(ret) {
			ret = out.attr("path");
			out.remove();
			return {
				path: ret,
				dx: dx,
				dy: dy
			};
		}
		set.translate(dx, dy);
		return out;
	};
})();

/*
 * Cutomized draw legend function for the Trend chart
 */
function drawChartLegend(canvas, legendsText, legendAttr, colors, pos) {
	/**
	 * DEBUG
	 */
	if (false) {
		var msg = "[DEBUG] ";
		msg += "\n canvas = " + canvas;
		msg += "\n legendsText = " + legendsText;
		msg += "\n legendAttr = " + legendAttr;
		msg += "\n colors = " + colors;
		msg += "\n pos = " + pos;
		alert(msg);
	}

	var rect = undefined, text = undefined,
		// Rectangle Properties
		rX = 40, rY = 0, rW = 10, rH = 10, rR = 0,
		// Text Position
		tX = 40, tY = 0;
	
	var cW = canvas.width,
		cH = canvas.height,
		length = legendsText.length,
		charaSize = 7, /* assume a character is around 6.5px wide */
		stGap = 15; /* gap between square and text */
	
	for (var i = 0; i < length; i++) {
		var	lastTW = i == 0 ? 0 : charaSize * legendsText[i - 1].length;
		var thisTw = charaSize * legendsText[i].length;
		var currentSize = rW + stGap + lastTW;
		
		if (pos == "top") {
			rX += i == 0 ? 0 : currentSize, 
			rY = 5,
			tX = i == 0 ? tX + stGap + thisTw * .5 : rX + stGap + thisTw * .5, 
			tY = rY + 5;
			/**
			 * DEBUG
			 */
			if (false) {
				var msg = "[DEBUG] ";
				msg += "\n rX = " + rX;
				msg += "\n rY = " + rY;
				msg += "\n tX = " + tX;
				msg += "\n tY = " + tY;
				alert(msg);
			}
			rect = canvas.rect(rX, rY, rW, rH, rR);
			rect.attr({
				fill : colors[i],
				stroke : '#000',
				"stroke-width" : 1,
				"stroke-opacity" : 0.3
			});
			text = canvas.text(tX, tY, legendsText[i]).attr(legendAttr);
		} else if (pos == "bottom") {
			rX = cW * .5 - tW * .5
			- (lowOrNega ? forThree : 0) + (highOrPosi ? forThree : 0) 
			+ (freq ? freqDiff : 0) + (tone ? toneDiff : 0) 
			+ (low ? lowDiff : 0) + (high ? highDiff : 0)
			+ (nega ? negaDiff : 0) + (posi ? posiDiff : 0), 
			rY = cH - 15, rW = 10, rH = 10, rR = 0, 
			tX = cW * .5 - tW * .5 + rW - (lowOrNega ? forThree : 0) + (highOrPosi ? forThree : 0) + stGap, 
			tY = rY + 5;
			rect = canvas.rect(rX, rY, rW, rH, rR);
			rect.attr({
				fill : colors[i],
				stroke : '#000',
				"stroke-width" : 1,
				"stroke-opacity" : 0.3
			});
			text = canvas.text(tX, tY, legendsText[i]).attr(legendAttr);
		}
	}
}

/**
 * Old function uesed for Trend line animation:
 * animatePath, get_str_path_from, get_nth_x,
 * get_path_point_num
 */

function animatePath(path_from, path_to) {
	var str_path_to = path_to.attrs['path'];
	path_from.animate({
		"path" : str_path_to
	}, 800);
}

function get_str_path_from(str_path, y_bottom_val, y_top_val) {
	var y = "0.0";
	if (true) {
		// make the lines start from bottom
		y = "" + y_bottom_val + "";
	} else {
		// make the lines start from top
		y = "" + y_top_val + "";
	}
	var count = get_path_point_num(str_path);
	var x = get_nth_x(str_path, 0);
	var str = "M" + x + " " + y + " ";
	for ( var i = 0; i < count; i++) {
		x = get_nth_x(str_path, i);
		str = str + "L" + x + " " + y + " ";
	}
	return str;
}

function get_nth_x(str_path, nth) {
	var s = str_path[nth * 2];
	s = [ s[1], s[2] ];
	return s;
}

function get_path_point_num(str_path) {
	var seg_num = str_path.length / 2;
	return seg_num;
}

function switch_dots(graphData, flag) {
	for ( var e = 0; e < graphData.length; e++) {
		for ( var d = 0; d < graphData[e].dot.length; d++) {
			if (flag == false) {
				graphData[e].dot[d].hide();
			} else {
				graphData[e].dot[d].show();
			}
		}
	}
}
