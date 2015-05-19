function resizeTopVideo() {
    var t, e, i = $(window).width(),
        n = $(window).height(),
        s = 185;
    n / i > originalRatio ? (t = n + s, video.height(t), e = (n + s) / originalRatio, video.width(e)) : (e = i + s * originalRatio, video.width(e), t = (i + s) * originalRatio, video.height(t)), setTimeout(function() {
        $(window).width() > 479 ? ($("#top-video").width(i), $("#top-video").height(n)) : ($("#top-video").width(i), $("body.home").length > 0 ? $("#top-video").height(n) : $("#top-video").height(2 * (n / 3)), mainPositioning()), video.css("left", (i - e) / 2), video.css("top", (n - t) / 2)
    }, 10)
}

function resizeEmbedVideo() {
    var t = $(window).width();
    embedVideo.width(t), embedVideo.height(t / originalEmbedRatio)
}

function resizeConclusionVideo() {
    var t = $(".video-embed:not(.no-interaction)").first().width();
    conclusionVideo.width(t), conclusionVideo.height(t / originalConclusionRatio)
}

function triggerResize() {
    setTimeout(function() {
        video = $("#home-video iframe, #home-video video, #home-video object, #detail-video iframe").first(), originalRatio = video.height() / video.width(), resizeTopVideo(), startTopVideo()
    }, 10), $(window).resize(function() {
        resizeTopVideo()
    })
}

function startTopVideo() {
    player = $f(video[0]), player.addEvent("ready", function() {
        player.api("setVolume", 0), player.api("play")
    }), pausePlayVideo(), $(document).scroll(function() {
        pausePlayVideo()
    })
}

function guessCountry() {
    var t = window.navigator.userLanguage || window.navigator.language;
    return -1 != t.indexOf("cn") ? "CN" : "US"
}

function loadVideoHtml() {
    var t, e = $.cookie("pwhcountry2014");
    "CN" == e ? $("html").hasClass("no-touch") ? $.getScript("http://admin.brightcove.com/js/BrightcoveExperiences.js", function() {
        t = $("#video-cn").html(), $("#top-video").html(Mustache.render(t, {
            key: $("#video-urls").data("cn-key"),
            id: $("#video-urls").data("cn-id"),
            player: $("#video-urls").data("cn-player")
        })), brightcove.createExperiences()
    }) : triggerResize() : (t = $("#video").html(), $("html").hasClass("no-touch") && $("#top-video").html(Mustache.render(t, {
        url: $("#video-urls").data("world")
    })), triggerResize())
}

function setCountryCookie(t) {
    $.cookie("pwhcountry2014", t, {
        expires: 1,
        path: "/"
    })
}

function pausePlayVideo() {
    var t = $(window).height();
    $(window).scrollTop() > t + 50 ? player.api("pause") : player.api("play")
}

function mainPositioning() {
    var t = $("#detail-main .title").height() + parseInt($("#detail-main .title").css("padding-top"), 10) + parseInt($("#detail-main .title").css("padding-bottom"), 10);
    $(window).width() > 479 ? $("#detail-main").css("margin-top", $("#detail-video").height() - t) : $("#detail-main").css("margin-top", $("#detail-video .container").height())
}

function scrollFading() {
    var t, e, i, n, s = $("#detail-video").height(),
        r = $(window).scrollTop(),
        o = "";
    o = 0 > r ? 0 : r >= s ? 100 : Math.round(100 * (r / (s - 150))), o = 100 - o, t = o / 1.666666667, e = 80 - (100 - t), e /= 2, i = 80 - e, i = Math.round(i), n = 100 === i ? "rgba(0,0,0,1)" : "rgba(0,0,0,0." + i + ")", $("#detail-main > .title").css("background-color", n)
}

function hideDetailTopvideo() {
    var t = $("#detail-video").height(),
        e = $(window).scrollTop();
    e > t ? $("#detail-video iframe").css("display", "none") : $("#detail-video iframe").css("display", "block")
}

function navPositioning() {
    var t = jQuery(window).scrollTop();
    if ($("body.home").length > 0) t > $(window).height() - $("nav").height() - 5 ? $("nav").addClass("open") : $("nav").removeClass("open");
    else {
        if ($(".video-embed.no-interaction").length > 0) {
            var e = $(".video-embed.no-interaction"),
                i = e.offset(),
                n = i.top,
                s = n + e.height();
            t > n - 27 && s - 27 > t ? $("nav").addClass("middlevideo-over") : t > $(window).height() ? $("nav").removeClass("middlevideo-over") : $("nav").removeClass("middlevideo-over")
        }
        if ($(".slides-wrapper").length > 0) {
            var r = $(".slides-wrapper"),
                o = r.offset(),
                a = o.top,
                l = o.top + r.height();
            t > a - 27 && l - 27 > t ? $("nav").removeClass("open") : t > $(window).height() ? $("nav").addClass("open") : $("nav").removeClass("open")
        } else t > $(window).height() ? $("nav").addClass("open") : $("nav").removeClass("open")
    }
}

function checkNavigationType() {
    $(window).width() < 1025 ? $("nav").addClass("mobile") : $("nav").removeClass("mobile")
}

function declareEventHandlers() {
    $("nav.mobile").length > 0 && !$("nav").hasClass("mobile-init") && ($("nav").addClass("mobile-init"), $("html").click(function() {
        $("nav.mobile").removeClass("mobile-open"), $("body").removeClass("mobile-nav-open")
    }), $(window).scroll(function() {
        $("nav.mobile").removeClass("mobile-open"), $("body").removeClass("mobile-nav-open")
    }), $("nav.mobile .toggle").click(function(t) {
        $(this).parent().parent().hasClass("mobile-open") ? ($("nav.mobile").removeClass("mobile-open"), $("body").removeClass("mobile-nav-open")) : ($("nav.mobile").addClass("mobile-open"), $("body").addClass("mobile-nav-open"), t.stopPropagation())
    }))
}

function updateFootnotePosition() {
    $(window).width() > 1025 ? $("#ouvertures section > .footnote").each(function() {
        footnoteIndex = $(this).data("footnote"), footnoteOffset = $("#ouvertures section p .footnote:contains(" + footnoteIndex + ")").offset(), footnoteOffsetTop = Math.floor(footnoteOffset.top), $(this).css("position", "absolute").css("top", footnoteOffsetTop - 56)
    }) : $("#ouvertures section > .footnote").css("position", "").css("top", "")
}

function checkTOCPosition() {
    $("html").hasClass("touch") || (scrollOffset = $(window).scrollTop(), scrollOffset > TOCOffsetX + $(".toc").height() + 315 ? $(".toc.scroll").addClass("active") : $(".toc.scroll").removeClass("active"))
}

function checkImageIntroHeight() {
    var t;
    t = $("html.touch").length > 0 ? $(window).height() : $(window).height() - $("nav").height(), $(".image-intro").height(t);
    var e = $(".image-intro .toc").offset().top,
        i = $("nav").height() + $(".image-intro .title .title").height(),
        n = e - i;
    $(".image-intro .title .title").css("margin-top", n / 2), imageIntroVisible || ($(".image-intro span.title, .image-intro ol.toc").addClass("visible"), imageIntroVisible = !0)
}

function rotateCompass() {
    activeSlide = $(".slides.compass .slidesjs-pagination li a.active").parent().index() + 1, 1 === activeSlide ? (activeIndicator = "n", compassRotation = 0) : 2 === activeSlide ? (activeIndicator = "e", compassRotation = 90) : 3 === activeSlide ? (activeIndicator = "s", compassRotation = 180) : 4 === activeSlide && (activeIndicator = "w", compassRotation = 270), $(".base").rotate(-compassRotation), $(".indicator").rotate(compassRotation), $(".indicator." + activeIndicator).addClass("current").siblings().removeClass("current"), $(".pointer").addClass("wiggle"), setTimeout(function() {
        $(".pointer").removeClass("wiggle")
    }, 400)
}

function checkVictoirePosition() {
    viewportHeight = $(window).height(), viewportHeightNetto = viewportHeight - 53, scrollIndex = $(this).scrollTop(), $(".part-one").css("margin-bottom", viewportHeightNetto), scrollIndex > viewportHeight ? $(".scrollover").addClass("visible") : $(".scrollover").removeClass("visible")
}

function victoireNavPositioning() {
    var t = jQuery(window).scrollTop(),
        e = $(".slides-wrapper.second"),
        i = e.offset(),
        n = i.top,
        s = i.top + e.height();
    t > n - 27 && s - 27 > t ? $("nav").addClass("victoire-closed") : t > $(window).height() ? $("nav").removeClass("victoire-closed") : $("nav").addClass("victoire-closed")
}

function checkFanBridgePosition() {
    viewportHeight = $(window).height(), viewportHeightNetto = viewportHeight - 53, scrollIndex = $(this).scrollTop(), $(".part-one").css("margin-bottom", viewportHeightNetto), scrollIndex > viewportHeight ? $(".scrollover").addClass("visible") : $(".scrollover").removeClass("visible")
}

function checkGridHeight() {
    imageGridHeight = $(".interactive-image-grid .large img").height(), $(".interactive-image-grid").height(imageGridHeight)
}

function checkErasmusPosition() {
    viewportHeight = $(window).height(), viewportHeightNetto = viewportHeight - 53, scrollIndex = $(this).scrollTop(), $(".part-one").css("margin-bottom", viewportHeightNetto), scrollIndex > viewportHeight ? $(".scrollover").addClass("visible") : $(".scrollover").removeClass("visible")
}

function checkErasmusSlider() {
    $(window).width() > 768 ? $(".erasmus-pavilion .diagrams .slides").slidesjs({
        width: 1450,
        height: 517,
        effect: {
            fade: {
                speed: 700,
                crossfade: !0
            }
        },
        play: {
            active: !0,
            effect: "fade",
            auto: !1,
            interval: 5e3,
            pauseOnHover: !1
        },
        navigation: {
            effect: "fade"
        },
        pagination: {
            effect: "fade"
        }
    }) : $(".erasmus-pavilion .diagrams .slides").slidesjs({
        width: 1450,
        height: 1300,
        effect: {
            fade: {
                speed: 700,
                crossfade: !0
            }
        },
        play: {
            active: !0,
            effect: "fade",
            auto: !1,
            interval: 5e3,
            pauseOnHover: !1
        },
        pagination: {
            effect: "fade"
        }
    })
}

function checkRhijnspoorSlider() {
    $(window).width() > 768 ? $(".rhijnspoorbuilding .slides.fade").slidesjs({
        width: 1450,
        height: 517,
        effect: {
            fade: {
                speed: 700,
                crossfade: !0
            }
        },
        play: {
            active: !0,
            effect: "fade",
            auto: !1,
            interval: 5e3,
            pauseOnHover: !1
        },
        navigation: {
            effect: "fade"
        }
    }) : $(".rhijnspoorbuilding .slides.fade").slidesjs({
        width: 1450,
        height: 1300,
        effect: {
            fade: {
                speed: 700,
                crossfade: !0
            }
        },
        play: {
            active: !0,
            effect: "fade",
            auto: !1,
            interval: 5e3,
            pauseOnHover: !1
        }
    })
}

function checkFooterPosition() {
    var t = $(window).height(),
        e = $("footer").height(),
        i = "",
        n = $("nav.mobile").height();
    i = $(window).width() < 480 ? t - e - 88 : t - n - e - 92.796875, $("#detail-main .inner .locations").css("min-height", i)
}

function checkErrorFooterPosition() {
        var t = $(window).height(),
            e = $("footer").height(),
            i = "",
            n = $("nav.mobile").height();
        i = $(window).width() < 1025 ? t - n - e - 77 + 44 : t - n - e - 77, $("#detail-main .inner").css("min-height", i)
    }! function(t, e) {
        function i(t) {
            var e = t.length,
                i = ue.type(t);
            return ue.isWindow(t) ? !1 : 1 === t.nodeType && e ? !0 : "array" === i || "function" !== i && (0 === e || "number" == typeof e && e > 0 && e - 1 in t)
        }

        function n(t) {
            var e = Te[t] = {};
            return ue.each(t.match(de) || [], function(t, i) {
                e[i] = !0
            }), e
        }

        function s(t, i, n, s) {
            if (ue.acceptData(t)) {
                var r, o, a = ue.expando,
                    l = t.nodeType,
                    c = l ? ue.cache : t,
                    u = l ? t[a] : t[a] && a;
                if (u && c[u] && (s || c[u].data) || n !== e || "string" != typeof i) return u || (u = l ? t[a] = ee.pop() || ue.guid++ : a), c[u] || (c[u] = l ? {} : {
                    toJSON: ue.noop
                }), ("object" == typeof i || "function" == typeof i) && (s ? c[u] = ue.extend(c[u], i) : c[u].data = ue.extend(c[u].data, i)), o = c[u], s || (o.data || (o.data = {}), o = o.data), n !== e && (o[ue.camelCase(i)] = n), "string" == typeof i ? (r = o[i], null == r && (r = o[ue.camelCase(i)])) : r = o, r
            }
        }

        function r(t, e, i) {
            if (ue.acceptData(t)) {
                var n, s, r = t.nodeType,
                    o = r ? ue.cache : t,
                    l = r ? t[ue.expando] : ue.expando;
                if (o[l]) {
                    if (e && (n = i ? o[l] : o[l].data)) {
                        ue.isArray(e) ? e = e.concat(ue.map(e, ue.camelCase)) : e in n ? e = [e] : (e = ue.camelCase(e), e = e in n ? [e] : e.split(" ")), s = e.length;
                        for (; s--;) delete n[e[s]];
                        if (i ? !a(n) : !ue.isEmptyObject(n)) return
                    }(i || (delete o[l].data, a(o[l]))) && (r ? ue.cleanData([t], !0) : ue.support.deleteExpando || o != o.window ? delete o[l] : o[l] = null)
                }
            }
        }

        function o(t, i, n) {
            if (n === e && 1 === t.nodeType) {
                var s = "data-" + i.replace(Ee, "-$1").toLowerCase();
                if (n = t.getAttribute(s), "string" == typeof n) {
                    try {
                        n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : Me.test(n) ? ue.parseJSON(n) : n
                    } catch (r) {}
                    ue.data(t, i, n)
                } else n = e
            }
            return n
        }

        function a(t) {
            var e;
            for (e in t)
                if (("data" !== e || !ue.isEmptyObject(t[e])) && "toJSON" !== e) return !1;
            return !0
        }

        function l() {
            return !0
        }

        function c() {
            return !1
        }

        function u() {
            try {
                return X.activeElement
            } catch (t) {}
        }

        function h(t, e) {
            do t = t[e]; while (t && 1 !== t.nodeType);
            return t
        }

        function d(t, e, i) {
            if (ue.isFunction(e)) return ue.grep(t, function(t, n) {
                return !!e.call(t, n, t) !== i
            });
            if (e.nodeType) return ue.grep(t, function(t) {
                return t === e !== i
            });
            if ("string" == typeof e) {
                if (Be.test(e)) return ue.filter(e, t, i);
                e = ue.filter(e, t)
            }
            return ue.grep(t, function(t) {
                return ue.inArray(t, e) >= 0 !== i
            })
        }

        function p(t) {
            var e = Ue.split("|"),
                i = t.createDocumentFragment();
            if (i.createElement)
                for (; e.length;) i.createElement(e.pop());
            return i
        }

        function f(t, e) {
            return ue.nodeName(t, "table") && ue.nodeName(1 === e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
        }

        function m(t) {
            return t.type = (null !== ue.find.attr(t, "type")) + "/" + t.type, t
        }

        function g(t) {
            var e = si.exec(t.type);
            return e ? t.type = e[1] : t.removeAttribute("type"), t
        }

        function v(t, e) {
            for (var i, n = 0; null != (i = t[n]); n++) ue._data(i, "globalEval", !e || ue._data(e[n], "globalEval"))
        }

        function y(t, e) {
            if (1 === e.nodeType && ue.hasData(t)) {
                var i, n, s, r = ue._data(t),
                    o = ue._data(e, r),
                    a = r.events;
                if (a) {
                    delete o.handle, o.events = {};
                    for (i in a)
                        for (n = 0, s = a[i].length; s > n; n++) ue.event.add(e, i, a[i][n])
                }
                o.data && (o.data = ue.extend({}, o.data))
            }
        }

        function b(t, e) {
            var i, n, s;
            if (1 === e.nodeType) {
                if (i = e.nodeName.toLowerCase(), !ue.support.noCloneEvent && e[ue.expando]) {
                    s = ue._data(e);
                    for (n in s.events) ue.removeEvent(e, n, s.handle);
                    e.removeAttribute(ue.expando)
                }
                "script" === i && e.text !== t.text ? (m(e).text = t.text, g(e)) : "object" === i ? (e.parentNode && (e.outerHTML = t.outerHTML), ue.support.html5Clone && t.innerHTML && !ue.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === i && ei.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === i ? e.defaultSelected = e.selected = t.defaultSelected : ("input" === i || "textarea" === i) && (e.defaultValue = t.defaultValue)
            }
        }

        function w(t, i) {
            var n, s, r = 0,
                o = typeof t.getElementsByTagName !== V ? t.getElementsByTagName(i || "*") : typeof t.querySelectorAll !== V ? t.querySelectorAll(i || "*") : e;
            if (!o)
                for (o = [], n = t.childNodes || t; null != (s = n[r]); r++) !i || ue.nodeName(s, i) ? o.push(s) : ue.merge(o, w(s, i));
            return i === e || i && ue.nodeName(t, i) ? ue.merge([t], o) : o
        }

        function _(t) {
            ei.test(t.type) && (t.defaultChecked = t.checked)
        }

        function x(t, e) {
            if (e in t) return e;
            for (var i = e.charAt(0).toUpperCase() + e.slice(1), n = e, s = ki.length; s--;)
                if (e = ki[s] + i, e in t) return e;
            return n
        }

        function C(t, e) {
            return t = e || t, "none" === ue.css(t, "display") || !ue.contains(t.ownerDocument, t)
        }

        function k(t, e) {
            for (var i, n, s, r = [], o = 0, a = t.length; a > o; o++) n = t[o], n.style && (r[o] = ue._data(n, "olddisplay"), i = n.style.display, e ? (r[o] || "none" !== i || (n.style.display = ""), "" === n.style.display && C(n) && (r[o] = ue._data(n, "olddisplay", D(n.nodeName)))) : r[o] || (s = C(n), (i && "none" !== i || !s) && ue._data(n, "olddisplay", s ? i : ue.css(n, "display"))));
            for (o = 0; a > o; o++) n = t[o], n.style && (e && "none" !== n.style.display && "" !== n.style.display || (n.style.display = e ? r[o] || "" : "none"));
            return t
        }

        function T(t, e, i) {
            var n = vi.exec(e);
            return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : e
        }

        function M(t, e, i, n, s) {
            for (var r = i === (n ? "border" : "content") ? 4 : "width" === e ? 1 : 0, o = 0; 4 > r; r += 2) "margin" === i && (o += ue.css(t, i + Ci[r], !0, s)), n ? ("content" === i && (o -= ue.css(t, "padding" + Ci[r], !0, s)), "margin" !== i && (o -= ue.css(t, "border" + Ci[r] + "Width", !0, s))) : (o += ue.css(t, "padding" + Ci[r], !0, s), "padding" !== i && (o += ue.css(t, "border" + Ci[r] + "Width", !0, s)));
            return o
        }

        function E(t, e, i) {
            var n = !0,
                s = "width" === e ? t.offsetWidth : t.offsetHeight,
                r = ui(t),
                o = ue.support.boxSizing && "border-box" === ue.css(t, "boxSizing", !1, r);
            if (0 >= s || null == s) {
                if (s = hi(t, e, r), (0 > s || null == s) && (s = t.style[e]), yi.test(s)) return s;
                n = o && (ue.support.boxSizingReliable || s === t.style[e]), s = parseFloat(s) || 0
            }
            return s + M(t, e, i || (o ? "border" : "content"), n, r) + "px"
        }

        function D(t) {
            var e = X,
                i = wi[t];
            return i || (i = S(t, e), "none" !== i && i || (ci = (ci || ue("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(e.documentElement), e = (ci[0].contentWindow || ci[0].contentDocument).document, e.write("<!doctype html><html><body>"), e.close(), i = S(t, e), ci.detach()), wi[t] = i), i
        }

        function S(t, e) {
            var i = ue(e.createElement(t)).appendTo(e.body),
                n = ue.css(i[0], "display");
            return i.remove(), n
        }

        function I(t, e, i, n) {
            var s;
            if (ue.isArray(e)) ue.each(e, function(e, s) {
                i || Mi.test(t) ? n(t, s) : I(t + "[" + ("object" == typeof s ? e : "") + "]", s, i, n)
            });
            else if (i || "object" !== ue.type(e)) n(t, e);
            else
                for (s in e) I(t + "[" + s + "]", e[s], i, n)
        }

        function j(t) {
            return function(e, i) {
                "string" != typeof e && (i = e, e = "*");
                var n, s = 0,
                    r = e.toLowerCase().match(de) || [];
                if (ue.isFunction(i))
                    for (; n = r[s++];) "+" === n[0] ? (n = n.slice(1) || "*", (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i)
            }
        }

        function $(t, e, i, n) {
            function s(a) {
                var l;
                return r[a] = !0, ue.each(t[a] || [], function(t, a) {
                    var c = a(e, i, n);
                    return "string" != typeof c || o || r[c] ? o ? !(l = c) : void 0 : (e.dataTypes.unshift(c), s(c), !1)
                }), l
            }
            var r = {},
                o = t === Wi;
            return s(e.dataTypes[0]) || !r["*"] && s("*")
        }

        function P(t, i) {
            var n, s, r = ue.ajaxSettings.flatOptions || {};
            for (s in i) i[s] !== e && ((r[s] ? t : n || (n = {}))[s] = i[s]);
            return n && ue.extend(!0, t, n), t
        }

        function A(t, i, n) {
            for (var s, r, o, a, l = t.contents, c = t.dataTypes;
                "*" === c[0];) c.shift(), r === e && (r = t.mimeType || i.getResponseHeader("Content-Type"));
            if (r)
                for (a in l)
                    if (l[a] && l[a].test(r)) {
                        c.unshift(a);
                        break
                    }
            if (c[0] in n) o = c[0];
            else {
                for (a in n) {
                    if (!c[0] || t.converters[a + " " + c[0]]) {
                        o = a;
                        break
                    }
                    s || (s = a)
                }
                o = o || s
            }
            return o ? (o !== c[0] && c.unshift(o), n[o]) : void 0
        }

        function H(t, e, i, n) {
            var s, r, o, a, l, c = {},
                u = t.dataTypes.slice();
            if (u[1])
                for (o in t.converters) c[o.toLowerCase()] = t.converters[o];
            for (r = u.shift(); r;)
                if (t.responseFields[r] && (i[t.responseFields[r]] = e), !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = r, r = u.shift())
                    if ("*" === r) r = l;
                    else if ("*" !== l && l !== r) {
                if (o = c[l + " " + r] || c["* " + r], !o)
                    for (s in c)
                        if (a = s.split(" "), a[1] === r && (o = c[l + " " + a[0]] || c["* " + a[0]])) {
                            o === !0 ? o = c[s] : c[s] !== !0 && (r = a[0], u.unshift(a[1]));
                            break
                        }
                if (o !== !0)
                    if (o && t["throws"]) e = o(e);
                    else try {
                        e = o(e)
                    } catch (h) {
                        return {
                            state: "parsererror",
                            error: o ? h : "No conversion from " + l + " to " + r
                        }
                    }
            }
            return {
                state: "success",
                data: e
            }
        }

        function N() {
            try {
                return new t.XMLHttpRequest
            } catch (e) {}
        }

        function O() {
            try {
                return new t.ActiveXObject("Microsoft.XMLHTTP")
            } catch (e) {}
        }

        function z() {
            return setTimeout(function() {
                Ji = e
            }), Ji = ue.now()
        }

        function L(t, e, i) {
            for (var n, s = (rn[e] || []).concat(rn["*"]), r = 0, o = s.length; o > r; r++)
                if (n = s[r].call(i, e, t)) return n
        }

        function R(t, e, i) {
            var n, s, r = 0,
                o = sn.length,
                a = ue.Deferred().always(function() {
                    delete l.elem
                }),
                l = function() {
                    if (s) return !1;
                    for (var e = Ji || z(), i = Math.max(0, c.startTime + c.duration - e), n = i / c.duration || 0, r = 1 - n, o = 0, l = c.tweens.length; l > o; o++) c.tweens[o].run(r);
                    return a.notifyWith(t, [c, r, i]), 1 > r && l ? i : (a.resolveWith(t, [c]), !1)
                },
                c = a.promise({
                    elem: t,
                    props: ue.extend({}, e),
                    opts: ue.extend(!0, {
                        specialEasing: {}
                    }, i),
                    originalProperties: e,
                    originalOptions: i,
                    startTime: Ji || z(),
                    duration: i.duration,
                    tweens: [],
                    createTween: function(e, i) {
                        var n = ue.Tween(t, c.opts, e, i, c.opts.specialEasing[e] || c.opts.easing);
                        return c.tweens.push(n), n
                    },
                    stop: function(e) {
                        var i = 0,
                            n = e ? c.tweens.length : 0;
                        if (s) return this;
                        for (s = !0; n > i; i++) c.tweens[i].run(1);
                        return e ? a.resolveWith(t, [c, e]) : a.rejectWith(t, [c, e]), this
                    }
                }),
                u = c.props;
            for (F(u, c.opts.specialEasing); o > r; r++)
                if (n = sn[r].call(c, t, u, c.opts)) return n;
            return ue.map(u, L, c), ue.isFunction(c.opts.start) && c.opts.start.call(t, c), ue.fx.timer(ue.extend(l, {
                elem: t,
                anim: c,
                queue: c.opts.queue
            })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
        }

        function F(t, e) {
            var i, n, s, r, o;
            for (i in t)
                if (n = ue.camelCase(i), s = e[n], r = t[i], ue.isArray(r) && (s = r[1], r = t[i] = r[0]), i !== n && (t[n] = r, delete t[i]), o = ue.cssHooks[n], o && "expand" in o) {
                    r = o.expand(r), delete t[n];
                    for (i in r) i in t || (t[i] = r[i], e[i] = s)
                } else e[n] = s
        }

        function B(t, e, i) {
            var n, s, r, o, a, l, c = this,
                u = {},
                h = t.style,
                d = t.nodeType && C(t),
                p = ue._data(t, "fxshow");
            i.queue || (a = ue._queueHooks(t, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
                a.unqueued || l()
            }), a.unqueued++, c.always(function() {
                c.always(function() {
                    a.unqueued--, ue.queue(t, "fx").length || a.empty.fire()
                })
            })), 1 === t.nodeType && ("height" in e || "width" in e) && (i.overflow = [h.overflow, h.overflowX, h.overflowY], "inline" === ue.css(t, "display") && "none" === ue.css(t, "float") && (ue.support.inlineBlockNeedsLayout && "inline" !== D(t.nodeName) ? h.zoom = 1 : h.display = "inline-block")), i.overflow && (h.overflow = "hidden", ue.support.shrinkWrapBlocks || c.always(function() {
                h.overflow = i.overflow[0], h.overflowX = i.overflow[1], h.overflowY = i.overflow[2]
            }));
            for (n in e)
                if (s = e[n], tn.exec(s)) {
                    if (delete e[n], r = r || "toggle" === s, s === (d ? "hide" : "show")) continue;
                    u[n] = p && p[n] || ue.style(t, n)
                }
            if (!ue.isEmptyObject(u)) {
                p ? "hidden" in p && (d = p.hidden) : p = ue._data(t, "fxshow", {}), r && (p.hidden = !d), d ? ue(t).show() : c.done(function() {
                    ue(t).hide()
                }), c.done(function() {
                    var e;
                    ue._removeData(t, "fxshow");
                    for (e in u) ue.style(t, e, u[e])
                });
                for (n in u) o = L(d ? p[n] : 0, n, c), n in p || (p[n] = o.start, d && (o.end = o.start, o.start = "width" === n || "height" === n ? 1 : 0))
            }
        }

        function W(t, e, i, n, s) {
            return new W.prototype.init(t, e, i, n, s)
        }

        function Q(t, e) {
            var i, n = {
                    height: t
                },
                s = 0;
            for (e = e ? 1 : 0; 4 > s; s += 2 - e) i = Ci[s], n["margin" + i] = n["padding" + i] = t;
            return e && (n.opacity = n.width = t), n
        }

        function q(t) {
            return ue.isWindow(t) ? t : 9 === t.nodeType ? t.defaultView || t.parentWindow : !1
        }
        var U, Y, V = typeof e,
            K = t.location,
            X = t.document,
            G = X.documentElement,
            J = t.jQuery,
            Z = t.$,
            te = {},
            ee = [],
            ie = "1.10.2",
            ne = ee.concat,
            se = ee.push,
            re = ee.slice,
            oe = ee.indexOf,
            ae = te.toString,
            le = te.hasOwnProperty,
            ce = ie.trim,
            ue = function(t, e) {
                return new ue.fn.init(t, e, Y)
            },
            he = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            de = /\S+/g,
            pe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            fe = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            me = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            ge = /^[\],:{}\s]*$/,
            ve = /(?:^|:|,)(?:\s*\[)+/g,
            ye = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
            be = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
            we = /^-ms-/,
            _e = /-([\da-z])/gi,
            xe = function(t, e) {
                return e.toUpperCase()
            },
            Ce = function(t) {
                (X.addEventListener || "load" === t.type || "complete" === X.readyState) && (ke(), ue.ready())
            },
            ke = function() {
                X.addEventListener ? (X.removeEventListener("DOMContentLoaded", Ce, !1), t.removeEventListener("load", Ce, !1)) : (X.detachEvent("onreadystatechange", Ce), t.detachEvent("onload", Ce))
            };
        ue.fn = ue.prototype = {
                jquery: ie,
                constructor: ue,
                init: function(t, i, n) {
                    var s, r;
                    if (!t) return this;
                    if ("string" == typeof t) {
                        if (s = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : fe.exec(t), !s || !s[1] && i) return !i || i.jquery ? (i || n).find(t) : this.constructor(i).find(t);
                        if (s[1]) {
                            if (i = i instanceof ue ? i[0] : i, ue.merge(this, ue.parseHTML(s[1], i && i.nodeType ? i.ownerDocument || i : X, !0)), me.test(s[1]) && ue.isPlainObject(i))
                                for (s in i) ue.isFunction(this[s]) ? this[s](i[s]) : this.attr(s, i[s]);
                            return this
                        }
                        if (r = X.getElementById(s[2]), r && r.parentNode) {
                            if (r.id !== s[2]) return n.find(t);
                            this.length = 1, this[0] = r
                        }
                        return this.context = X, this.selector = t, this
                    }
                    return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : ue.isFunction(t) ? n.ready(t) : (t.selector !== e && (this.selector = t.selector, this.context = t.context), ue.makeArray(t, this))
                },
                selector: "",
                length: 0,
                toArray: function() {
                    return re.call(this)
                },
                get: function(t) {
                    return null == t ? this.toArray() : 0 > t ? this[this.length + t] : this[t]
                },
                pushStack: function(t) {
                    var e = ue.merge(this.constructor(), t);
                    return e.prevObject = this, e.context = this.context, e
                },
                each: function(t, e) {
                    return ue.each(this, t, e)
                },
                ready: function(t) {
                    return ue.ready.promise().done(t), this
                },
                slice: function() {
                    return this.pushStack(re.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                eq: function(t) {
                    var e = this.length,
                        i = +t + (0 > t ? e : 0);
                    return this.pushStack(i >= 0 && e > i ? [this[i]] : [])
                },
                map: function(t) {
                    return this.pushStack(ue.map(this, function(e, i) {
                        return t.call(e, i, e)
                    }))
                },
                end: function() {
                    return this.prevObject || this.constructor(null)
                },
                push: se,
                sort: [].sort,
                splice: [].splice
            }, ue.fn.init.prototype = ue.fn, ue.extend = ue.fn.extend = function() {
                var t, i, n, s, r, o, a = arguments[0] || {},
                    l = 1,
                    c = arguments.length,
                    u = !1;
                for ("boolean" == typeof a && (u = a, a = arguments[1] || {}, l = 2), "object" == typeof a || ue.isFunction(a) || (a = {}), c === l && (a = this, --l); c > l; l++)
                    if (null != (r = arguments[l]))
                        for (s in r) t = a[s], n = r[s], a !== n && (u && n && (ue.isPlainObject(n) || (i = ue.isArray(n))) ? (i ? (i = !1, o = t && ue.isArray(t) ? t : []) : o = t && ue.isPlainObject(t) ? t : {}, a[s] = ue.extend(u, o, n)) : n !== e && (a[s] = n));
                return a
            }, ue.extend({
                expando: "jQuery" + (ie + Math.random()).replace(/\D/g, ""),
                noConflict: function(e) {
                    return t.$ === ue && (t.$ = Z), e && t.jQuery === ue && (t.jQuery = J), ue
                },
                isReady: !1,
                readyWait: 1,
                holdReady: function(t) {
                    t ? ue.readyWait++ : ue.ready(!0)
                },
                ready: function(t) {
                    if (t === !0 ? !--ue.readyWait : !ue.isReady) {
                        if (!X.body) return setTimeout(ue.ready);
                        ue.isReady = !0, t !== !0 && --ue.readyWait > 0 || (U.resolveWith(X, [ue]), ue.fn.trigger && ue(X).trigger("ready").off("ready"))
                    }
                },
                isFunction: function(t) {
                    return "function" === ue.type(t)
                },
                isArray: Array.isArray || function(t) {
                    return "array" === ue.type(t)
                },
                isWindow: function(t) {
                    return null != t && t == t.window
                },
                isNumeric: function(t) {
                    return !isNaN(parseFloat(t)) && isFinite(t)
                },
                type: function(t) {
                    return null == t ? String(t) : "object" == typeof t || "function" == typeof t ? te[ae.call(t)] || "object" : typeof t
                },
                isPlainObject: function(t) {
                    var i;
                    if (!t || "object" !== ue.type(t) || t.nodeType || ue.isWindow(t)) return !1;
                    try {
                        if (t.constructor && !le.call(t, "constructor") && !le.call(t.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (n) {
                        return !1
                    }
                    if (ue.support.ownLast)
                        for (i in t) return le.call(t, i);
                    for (i in t);
                    return i === e || le.call(t, i)
                },
                isEmptyObject: function(t) {
                    var e;
                    for (e in t) return !1;
                    return !0
                },
                error: function(t) {
                    throw new Error(t)
                },
                parseHTML: function(t, e, i) {
                    if (!t || "string" != typeof t) return null;
                    "boolean" == typeof e && (i = e, e = !1), e = e || X;
                    var n = me.exec(t),
                        s = !i && [];
                    return n ? [e.createElement(n[1])] : (n = ue.buildFragment([t], e, s), s && ue(s).remove(), ue.merge([], n.childNodes))
                },
                parseJSON: function(e) {
                    return t.JSON && t.JSON.parse ? t.JSON.parse(e) : null === e ? e : "string" == typeof e && (e = ue.trim(e), e && ge.test(e.replace(ye, "@").replace(be, "]").replace(ve, ""))) ? new Function("return " + e)() : (ue.error("Invalid JSON: " + e), void 0)
                },
                parseXML: function(i) {
                    var n, s;
                    if (!i || "string" != typeof i) return null;
                    try {
                        t.DOMParser ? (s = new DOMParser, n = s.parseFromString(i, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(i))
                    } catch (r) {
                        n = e
                    }
                    return n && n.documentElement && !n.getElementsByTagName("parsererror").length || ue.error("Invalid XML: " + i), n
                },
                noop: function() {},
                globalEval: function(e) {
                    e && ue.trim(e) && (t.execScript || function(e) {
                        t.eval.call(t, e)
                    })(e)
                },
                camelCase: function(t) {
                    return t.replace(we, "ms-").replace(_e, xe)
                },
                nodeName: function(t, e) {
                    return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
                },
                each: function(t, e, n) {
                    var s, r = 0,
                        o = t.length,
                        a = i(t);
                    if (n) {
                        if (a)
                            for (; o > r && (s = e.apply(t[r], n), s !== !1); r++);
                        else
                            for (r in t)
                                if (s = e.apply(t[r], n), s === !1) break
                    } else if (a)
                        for (; o > r && (s = e.call(t[r], r, t[r]), s !== !1); r++);
                    else
                        for (r in t)
                            if (s = e.call(t[r], r, t[r]), s === !1) break; return t
                },
                trim: ce && !ce.call("﻿ ") ? function(t) {
                    return null == t ? "" : ce.call(t)
                } : function(t) {
                    return null == t ? "" : (t + "").replace(pe, "")
                },
                makeArray: function(t, e) {
                    var n = e || [];
                    return null != t && (i(Object(t)) ? ue.merge(n, "string" == typeof t ? [t] : t) : se.call(n, t)), n
                },
                inArray: function(t, e, i) {
                    var n;
                    if (e) {
                        if (oe) return oe.call(e, t, i);
                        for (n = e.length, i = i ? 0 > i ? Math.max(0, n + i) : i : 0; n > i; i++)
                            if (i in e && e[i] === t) return i
                    }
                    return -1
                },
                merge: function(t, i) {
                    var n = i.length,
                        s = t.length,
                        r = 0;
                    if ("number" == typeof n)
                        for (; n > r; r++) t[s++] = i[r];
                    else
                        for (; i[r] !== e;) t[s++] = i[r++];
                    return t.length = s, t
                },
                grep: function(t, e, i) {
                    var n, s = [],
                        r = 0,
                        o = t.length;
                    for (i = !!i; o > r; r++) n = !!e(t[r], r), i !== n && s.push(t[r]);
                    return s
                },
                map: function(t, e, n) {
                    var s, r = 0,
                        o = t.length,
                        a = i(t),
                        l = [];
                    if (a)
                        for (; o > r; r++) s = e(t[r], r, n), null != s && (l[l.length] = s);
                    else
                        for (r in t) s = e(t[r], r, n), null != s && (l[l.length] = s);
                    return ne.apply([], l)
                },
                guid: 1,
                proxy: function(t, i) {
                    var n, s, r;
                    return "string" == typeof i && (r = t[i], i = t, t = r), ue.isFunction(t) ? (n = re.call(arguments, 2), s = function() {
                        return t.apply(i || this, n.concat(re.call(arguments)))
                    }, s.guid = t.guid = t.guid || ue.guid++, s) : e
                },
                access: function(t, i, n, s, r, o, a) {
                    var l = 0,
                        c = t.length,
                        u = null == n;
                    if ("object" === ue.type(n)) {
                        r = !0;
                        for (l in n) ue.access(t, i, l, n[l], !0, o, a)
                    } else if (s !== e && (r = !0, ue.isFunction(s) || (a = !0), u && (a ? (i.call(t, s), i = null) : (u = i, i = function(t, e, i) {
                            return u.call(ue(t), i)
                        })), i))
                        for (; c > l; l++) i(t[l], n, a ? s : s.call(t[l], l, i(t[l], n)));
                    return r ? t : u ? i.call(t) : c ? i(t[0], n) : o
                },
                now: function() {
                    return (new Date).getTime()
                },
                swap: function(t, e, i, n) {
                    var s, r, o = {};
                    for (r in e) o[r] = t.style[r], t.style[r] = e[r];
                    s = i.apply(t, n || []);
                    for (r in e) t.style[r] = o[r];
                    return s
                }
            }), ue.ready.promise = function(e) {
                if (!U)
                    if (U = ue.Deferred(), "complete" === X.readyState) setTimeout(ue.ready);
                    else if (X.addEventListener) X.addEventListener("DOMContentLoaded", Ce, !1), t.addEventListener("load", Ce, !1);
                else {
                    X.attachEvent("onreadystatechange", Ce), t.attachEvent("onload", Ce);
                    var i = !1;
                    try {
                        i = null == t.frameElement && X.documentElement
                    } catch (n) {}
                    i && i.doScroll && function s() {
                        if (!ue.isReady) {
                            try {
                                i.doScroll("left")
                            } catch (t) {
                                return setTimeout(s, 50)
                            }
                            ke(), ue.ready()
                        }
                    }()
                }
                return U.promise(e)
            }, ue.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
                te["[object " + e + "]"] = e.toLowerCase()
            }), Y = ue(X),
            function(t, e) {
                function i(t, e, i, n) {
                    var s, r, o, a, l, c, u, h, f, m;
                    if ((e ? e.ownerDocument || e : R) !== $ && j(e), e = e || $, i = i || [], !t || "string" != typeof t) return i;
                    if (1 !== (a = e.nodeType) && 9 !== a) return [];
                    if (A && !n) {
                        if (s = be.exec(t))
                            if (o = s[1]) {
                                if (9 === a) {
                                    if (r = e.getElementById(o), !r || !r.parentNode) return i;
                                    if (r.id === o) return i.push(r), i
                                } else if (e.ownerDocument && (r = e.ownerDocument.getElementById(o)) && z(e, r) && r.id === o) return i.push(r), i
                            } else {
                                if (s[2]) return te.apply(i, e.getElementsByTagName(t)), i;
                                if ((o = s[3]) && C.getElementsByClassName && e.getElementsByClassName) return te.apply(i, e.getElementsByClassName(o)), i
                            }
                        if (C.qsa && (!H || !H.test(t))) {
                            if (h = u = L, f = e, m = 9 === a && t, 1 === a && "object" !== e.nodeName.toLowerCase()) {
                                for (c = d(t), (u = e.getAttribute("id")) ? h = u.replace(xe, "\\$&") : e.setAttribute("id", h), h = "[id='" + h + "'] ", l = c.length; l--;) c[l] = h + p(c[l]);
                                f = pe.test(t) && e.parentNode || e, m = c.join(",")
                            }
                            if (m) try {
                                return te.apply(i, f.querySelectorAll(m)), i
                            } catch (g) {} finally {
                                u || e.removeAttribute("id")
                            }
                        }
                    }
                    return _(t.replace(ce, "$1"), e, i, n)
                }

                function n() {
                    function t(i, n) {
                        return e.push(i += " ") > T.cacheLength && delete t[e.shift()], t[i] = n
                    }
                    var e = [];
                    return t
                }

                function s(t) {
                    return t[L] = !0, t
                }

                function r(t) {
                    var e = $.createElement("div");
                    try {
                        return !!t(e)
                    } catch (i) {
                        return !1
                    } finally {
                        e.parentNode && e.parentNode.removeChild(e), e = null
                    }
                }

                function o(t, e) {
                    for (var i = t.split("|"), n = t.length; n--;) T.attrHandle[i[n]] = e
                }

                function a(t, e) {
                    var i = e && t,
                        n = i && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || K) - (~t.sourceIndex || K);
                    if (n) return n;
                    if (i)
                        for (; i = i.nextSibling;)
                            if (i === e) return -1;
                    return t ? 1 : -1
                }

                function l(t) {
                    return function(e) {
                        var i = e.nodeName.toLowerCase();
                        return "input" === i && e.type === t
                    }
                }

                function c(t) {
                    return function(e) {
                        var i = e.nodeName.toLowerCase();
                        return ("input" === i || "button" === i) && e.type === t
                    }
                }

                function u(t) {
                    return s(function(e) {
                        return e = +e, s(function(i, n) {
                            for (var s, r = t([], i.length, e), o = r.length; o--;) i[s = r[o]] && (i[s] = !(n[s] = i[s]))
                        })
                    })
                }

                function h() {}

                function d(t, e) {
                    var n, s, r, o, a, l, c, u = Q[t + " "];
                    if (u) return e ? 0 : u.slice(0);
                    for (a = t, l = [], c = T.preFilter; a;) {
                        (!n || (s = he.exec(a))) && (s && (a = a.slice(s[0].length) || a), l.push(r = [])), n = !1, (s = de.exec(a)) && (n = s.shift(), r.push({
                            value: n,
                            type: s[0].replace(ce, " ")
                        }), a = a.slice(n.length));
                        for (o in T.filter) !(s = ve[o].exec(a)) || c[o] && !(s = c[o](s)) || (n = s.shift(), r.push({
                            value: n,
                            type: o,
                            matches: s
                        }), a = a.slice(n.length));
                        if (!n) break
                    }
                    return e ? a.length : a ? i.error(t) : Q(t, l).slice(0)
                }

                function p(t) {
                    for (var e = 0, i = t.length, n = ""; i > e; e++) n += t[e].value;
                    return n
                }

                function f(t, e, i) {
                    var n = e.dir,
                        s = i && "parentNode" === n,
                        r = B++;
                    return e.first ? function(e, i, r) {
                        for (; e = e[n];)
                            if (1 === e.nodeType || s) return t(e, i, r)
                    } : function(e, i, o) {
                        var a, l, c, u = F + " " + r;
                        if (o) {
                            for (; e = e[n];)
                                if ((1 === e.nodeType || s) && t(e, i, o)) return !0
                        } else
                            for (; e = e[n];)
                                if (1 === e.nodeType || s)
                                    if (c = e[L] || (e[L] = {}), (l = c[n]) && l[0] === u) {
                                        if ((a = l[1]) === !0 || a === k) return a === !0
                                    } else if (l = c[n] = [u], l[1] = t(e, i, o) || k, l[1] === !0) return !0
                    }
                }

                function m(t) {
                    return t.length > 1 ? function(e, i, n) {
                        for (var s = t.length; s--;)
                            if (!t[s](e, i, n)) return !1;
                        return !0
                    } : t[0]
                }

                function g(t, e, i, n, s) {
                    for (var r, o = [], a = 0, l = t.length, c = null != e; l > a; a++)(r = t[a]) && (!i || i(r, n, s)) && (o.push(r), c && e.push(a));
                    return o
                }

                function v(t, e, i, n, r, o) {
                    return n && !n[L] && (n = v(n)), r && !r[L] && (r = v(r, o)), s(function(s, o, a, l) {
                        var c, u, h, d = [],
                            p = [],
                            f = o.length,
                            m = s || w(e || "*", a.nodeType ? [a] : a, []),
                            v = !t || !s && e ? m : g(m, d, t, a, l),
                            y = i ? r || (s ? t : f || n) ? [] : o : v;
                        if (i && i(v, y, a, l), n)
                            for (c = g(y, p), n(c, [], a, l), u = c.length; u--;)(h = c[u]) && (y[p[u]] = !(v[p[u]] = h));
                        if (s) {
                            if (r || t) {
                                if (r) {
                                    for (c = [], u = y.length; u--;)(h = y[u]) && c.push(v[u] = h);
                                    r(null, y = [], c, l)
                                }
                                for (u = y.length; u--;)(h = y[u]) && (c = r ? ie.call(s, h) : d[u]) > -1 && (s[c] = !(o[c] = h))
                            }
                        } else y = g(y === o ? y.splice(f, y.length) : y), r ? r(null, o, y, l) : te.apply(o, y)
                    })
                }

                function y(t) {
                    for (var e, i, n, s = t.length, r = T.relative[t[0].type], o = r || T.relative[" "], a = r ? 1 : 0, l = f(function(t) {
                            return t === e
                        }, o, !0), c = f(function(t) {
                            return ie.call(e, t) > -1
                        }, o, !0), u = [function(t, i, n) {
                            return !r && (n || i !== S) || ((e = i).nodeType ? l(t, i, n) : c(t, i, n))
                        }]; s > a; a++)
                        if (i = T.relative[t[a].type]) u = [f(m(u), i)];
                        else {
                            if (i = T.filter[t[a].type].apply(null, t[a].matches), i[L]) {
                                for (n = ++a; s > n && !T.relative[t[n].type]; n++);
                                return v(a > 1 && m(u), a > 1 && p(t.slice(0, a - 1).concat({
                                    value: " " === t[a - 2].type ? "*" : ""
                                })).replace(ce, "$1"), i, n > a && y(t.slice(a, n)), s > n && y(t = t.slice(n)), s > n && p(t))
                            }
                            u.push(i)
                        }
                    return m(u)
                }

                function b(t, e) {
                    var n = 0,
                        r = e.length > 0,
                        o = t.length > 0,
                        a = function(s, a, l, c, u) {
                            var h, d, p, f = [],
                                m = 0,
                                v = "0",
                                y = s && [],
                                b = null != u,
                                w = S,
                                _ = s || o && T.find.TAG("*", u && a.parentNode || a),
                                x = F += null == w ? 1 : Math.random() || .1;
                            for (b && (S = a !== $ && a, k = n); null != (h = _[v]); v++) {
                                if (o && h) {
                                    for (d = 0; p = t[d++];)
                                        if (p(h, a, l)) {
                                            c.push(h);
                                            break
                                        }
                                    b && (F = x, k = ++n)
                                }
                                r && ((h = !p && h) && m--, s && y.push(h))
                            }
                            if (m += v, r && v !== m) {
                                for (d = 0; p = e[d++];) p(y, f, a, l);
                                if (s) {
                                    if (m > 0)
                                        for (; v--;) y[v] || f[v] || (f[v] = J.call(c));
                                    f = g(f)
                                }
                                te.apply(c, f), b && !s && f.length > 0 && m + e.length > 1 && i.uniqueSort(c)
                            }
                            return b && (F = x, S = w), y
                        };
                    return r ? s(a) : a
                }

                function w(t, e, n) {
                    for (var s = 0, r = e.length; r > s; s++) i(t, e[s], n);
                    return n
                }

                function _(t, e, i, n) {
                    var s, r, o, a, l, c = d(t);
                    if (!n && 1 === c.length) {
                        if (r = c[0] = c[0].slice(0), r.length > 2 && "ID" === (o = r[0]).type && C.getById && 9 === e.nodeType && A && T.relative[r[1].type]) {
                            if (e = (T.find.ID(o.matches[0].replace(Ce, ke), e) || [])[0], !e) return i;
                            t = t.slice(r.shift().value.length)
                        }
                        for (s = ve.needsContext.test(t) ? 0 : r.length; s-- && (o = r[s], !T.relative[a = o.type]);)
                            if ((l = T.find[a]) && (n = l(o.matches[0].replace(Ce, ke), pe.test(r[0].type) && e.parentNode || e))) {
                                if (r.splice(s, 1), t = n.length && p(r), !t) return te.apply(i, n), i;
                                break
                            }
                    }
                    return D(t, c)(n, e, !A, i, pe.test(t)), i
                }
                var x, C, k, T, M, E, D, S, I, j, $, P, A, H, N, O, z, L = "sizzle" + -new Date,
                    R = t.document,
                    F = 0,
                    B = 0,
                    W = n(),
                    Q = n(),
                    q = n(),
                    U = !1,
                    Y = function(t, e) {
                        return t === e ? (U = !0, 0) : 0
                    },
                    V = typeof e,
                    K = 1 << 31,
                    X = {}.hasOwnProperty,
                    G = [],
                    J = G.pop,
                    Z = G.push,
                    te = G.push,
                    ee = G.slice,
                    ie = G.indexOf || function(t) {
                        for (var e = 0, i = this.length; i > e; e++)
                            if (this[e] === t) return e;
                        return -1
                    },
                    ne = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    se = "[\\x20\\t\\r\\n\\f]",
                    re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    oe = re.replace("w", "w#"),
                    ae = "\\[" + se + "*(" + re + ")" + se + "*(?:([*^$|!~]?=)" + se + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + oe + ")|)|)" + se + "*\\]",
                    le = ":(" + re + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + ae.replace(3, 8) + ")*)|.*)\\)|)",
                    ce = new RegExp("^" + se + "+|((?:^|[^\\\\])(?:\\\\.)*)" + se + "+$", "g"),
                    he = new RegExp("^" + se + "*," + se + "*"),
                    de = new RegExp("^" + se + "*([>+~]|" + se + ")" + se + "*"),
                    pe = new RegExp(se + "*[+~]"),
                    fe = new RegExp("=" + se + "*([^\\]'\"]*)" + se + "*\\]", "g"),
                    me = new RegExp(le),
                    ge = new RegExp("^" + oe + "$"),
                    ve = {
                        ID: new RegExp("^#(" + re + ")"),
                        CLASS: new RegExp("^\\.(" + re + ")"),
                        TAG: new RegExp("^(" + re.replace("w", "w*") + ")"),
                        ATTR: new RegExp("^" + ae),
                        PSEUDO: new RegExp("^" + le),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + se + "*(even|odd|(([+-]|)(\\d*)n|)" + se + "*(?:([+-]|)" + se + "*(\\d+)|))" + se + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + ne + ")$", "i"),
                        needsContext: new RegExp("^" + se + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + se + "*((?:-\\d)?\\d*)" + se + "*\\)|)(?=[^-]|$)", "i")
                    },
                    ye = /^[^{]+\{\s*\[native \w/,
                    be = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    we = /^(?:input|select|textarea|button)$/i,
                    _e = /^h\d$/i,
                    xe = /'|\\/g,
                    Ce = new RegExp("\\\\([\\da-f]{1,6}" + se + "?|(" + se + ")|.)", "ig"),
                    ke = function(t, e, i) {
                        var n = "0x" + e - 65536;
                        return n !== n || i ? e : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(55296 | n >> 10, 56320 | 1023 & n)
                    };
                try {
                    te.apply(G = ee.call(R.childNodes), R.childNodes), G[R.childNodes.length].nodeType
                } catch (Te) {
                    te = {
                        apply: G.length ? function(t, e) {
                            Z.apply(t, ee.call(e))
                        } : function(t, e) {
                            for (var i = t.length, n = 0; t[i++] = e[n++];);
                            t.length = i - 1
                        }
                    }
                }
                E = i.isXML = function(t) {
                    var e = t && (t.ownerDocument || t).documentElement;
                    return e ? "HTML" !== e.nodeName : !1
                }, C = i.support = {}, j = i.setDocument = function(t) {
                    var e = t ? t.ownerDocument || t : R,
                        i = e.defaultView;
                    return e !== $ && 9 === e.nodeType && e.documentElement ? ($ = e, P = e.documentElement, A = !E(e), i && i.attachEvent && i !== i.top && i.attachEvent("onbeforeunload", function() {
                        j()
                    }), C.attributes = r(function(t) {
                        return t.className = "i", !t.getAttribute("className")
                    }), C.getElementsByTagName = r(function(t) {
                        return t.appendChild(e.createComment("")), !t.getElementsByTagName("*").length
                    }), C.getElementsByClassName = r(function(t) {
                        return t.innerHTML = "<div class='a'></div><div class='a i'></div>", t.firstChild.className = "i", 2 === t.getElementsByClassName("i").length
                    }), C.getById = r(function(t) {
                        return P.appendChild(t).id = L, !e.getElementsByName || !e.getElementsByName(L).length
                    }), C.getById ? (T.find.ID = function(t, e) {
                        if (typeof e.getElementById !== V && A) {
                            var i = e.getElementById(t);
                            return i && i.parentNode ? [i] : []
                        }
                    }, T.filter.ID = function(t) {
                        var e = t.replace(Ce, ke);
                        return function(t) {
                            return t.getAttribute("id") === e
                        }
                    }) : (delete T.find.ID, T.filter.ID = function(t) {
                        var e = t.replace(Ce, ke);
                        return function(t) {
                            var i = typeof t.getAttributeNode !== V && t.getAttributeNode("id");
                            return i && i.value === e
                        }
                    }), T.find.TAG = C.getElementsByTagName ? function(t, e) {
                        return typeof e.getElementsByTagName !== V ? e.getElementsByTagName(t) : void 0
                    } : function(t, e) {
                        var i, n = [],
                            s = 0,
                            r = e.getElementsByTagName(t);
                        if ("*" === t) {
                            for (; i = r[s++];) 1 === i.nodeType && n.push(i);
                            return n
                        }
                        return r
                    }, T.find.CLASS = C.getElementsByClassName && function(t, e) {
                        return typeof e.getElementsByClassName !== V && A ? e.getElementsByClassName(t) : void 0
                    }, N = [], H = [], (C.qsa = ye.test(e.querySelectorAll)) && (r(function(t) {
                        t.innerHTML = "<select><option selected=''></option></select>", t.querySelectorAll("[selected]").length || H.push("\\[" + se + "*(?:value|" + ne + ")"), t.querySelectorAll(":checked").length || H.push(":checked")
                    }), r(function(t) {
                        var i = e.createElement("input");
                        i.setAttribute("type", "hidden"), t.appendChild(i).setAttribute("t", ""), t.querySelectorAll("[t^='']").length && H.push("[*^$]=" + se + "*(?:''|\"\")"), t.querySelectorAll(":enabled").length || H.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), H.push(",.*:")
                    })), (C.matchesSelector = ye.test(O = P.webkitMatchesSelector || P.mozMatchesSelector || P.oMatchesSelector || P.msMatchesSelector)) && r(function(t) {
                        C.disconnectedMatch = O.call(t, "div"), O.call(t, "[s!='']:x"), N.push("!=", le)
                    }), H = H.length && new RegExp(H.join("|")), N = N.length && new RegExp(N.join("|")), z = ye.test(P.contains) || P.compareDocumentPosition ? function(t, e) {
                        var i = 9 === t.nodeType ? t.documentElement : t,
                            n = e && e.parentNode;
                        return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
                    } : function(t, e) {
                        if (e)
                            for (; e = e.parentNode;)
                                if (e === t) return !0;
                        return !1
                    }, Y = P.compareDocumentPosition ? function(t, i) {
                        if (t === i) return U = !0, 0;
                        var n = i.compareDocumentPosition && t.compareDocumentPosition && t.compareDocumentPosition(i);
                        return n ? 1 & n || !C.sortDetached && i.compareDocumentPosition(t) === n ? t === e || z(R, t) ? -1 : i === e || z(R, i) ? 1 : I ? ie.call(I, t) - ie.call(I, i) : 0 : 4 & n ? -1 : 1 : t.compareDocumentPosition ? -1 : 1
                    } : function(t, i) {
                        var n, s = 0,
                            r = t.parentNode,
                            o = i.parentNode,
                            l = [t],
                            c = [i];
                        if (t === i) return U = !0, 0;
                        if (!r || !o) return t === e ? -1 : i === e ? 1 : r ? -1 : o ? 1 : I ? ie.call(I, t) - ie.call(I, i) : 0;
                        if (r === o) return a(t, i);
                        for (n = t; n = n.parentNode;) l.unshift(n);
                        for (n = i; n = n.parentNode;) c.unshift(n);
                        for (; l[s] === c[s];) s++;
                        return s ? a(l[s], c[s]) : l[s] === R ? -1 : c[s] === R ? 1 : 0
                    }, e) : $
                }, i.matches = function(t, e) {
                    return i(t, null, null, e)
                }, i.matchesSelector = function(t, e) {
                    if ((t.ownerDocument || t) !== $ && j(t), e = e.replace(fe, "='$1']"), !(!C.matchesSelector || !A || N && N.test(e) || H && H.test(e))) try {
                        var n = O.call(t, e);
                        if (n || C.disconnectedMatch || t.document && 11 !== t.document.nodeType) return n
                    } catch (s) {}
                    return i(e, $, null, [t]).length > 0
                }, i.contains = function(t, e) {
                    return (t.ownerDocument || t) !== $ && j(t), z(t, e)
                }, i.attr = function(t, i) {
                    (t.ownerDocument || t) !== $ && j(t);
                    var n = T.attrHandle[i.toLowerCase()],
                        s = n && X.call(T.attrHandle, i.toLowerCase()) ? n(t, i, !A) : e;
                    return s === e ? C.attributes || !A ? t.getAttribute(i) : (s = t.getAttributeNode(i)) && s.specified ? s.value : null : s
                }, i.error = function(t) {
                    throw new Error("Syntax error, unrecognized expression: " + t)
                }, i.uniqueSort = function(t) {
                    var e, i = [],
                        n = 0,
                        s = 0;
                    if (U = !C.detectDuplicates, I = !C.sortStable && t.slice(0), t.sort(Y), U) {
                        for (; e = t[s++];) e === t[s] && (n = i.push(s));
                        for (; n--;) t.splice(i[n], 1)
                    }
                    return t
                }, M = i.getText = function(t) {
                    var e, i = "",
                        n = 0,
                        s = t.nodeType;
                    if (s) {
                        if (1 === s || 9 === s || 11 === s) {
                            if ("string" == typeof t.textContent) return t.textContent;
                            for (t = t.firstChild; t; t = t.nextSibling) i += M(t)
                        } else if (3 === s || 4 === s) return t.nodeValue
                    } else
                        for (; e = t[n]; n++) i += M(e);
                    return i
                }, T = i.selectors = {
                    cacheLength: 50,
                    createPseudo: s,
                    match: ve,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(t) {
                            return t[1] = t[1].replace(Ce, ke), t[3] = (t[4] || t[5] || "").replace(Ce, ke), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                        },
                        CHILD: function(t) {
                            return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || i.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && i.error(t[0]), t
                        },
                        PSEUDO: function(t) {
                            var i, n = !t[5] && t[2];
                            return ve.CHILD.test(t[0]) ? null : (t[3] && t[4] !== e ? t[2] = t[4] : n && me.test(n) && (i = d(n, !0)) && (i = n.indexOf(")", n.length - i) - n.length) && (t[0] = t[0].slice(0, i), t[2] = n.slice(0, i)), t.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(t) {
                            var e = t.replace(Ce, ke).toLowerCase();
                            return "*" === t ? function() {
                                return !0
                            } : function(t) {
                                return t.nodeName && t.nodeName.toLowerCase() === e
                            }
                        },
                        CLASS: function(t) {
                            var e = W[t + " "];
                            return e || (e = new RegExp("(^|" + se + ")" + t + "(" + se + "|$)")) && W(t, function(t) {
                                return e.test("string" == typeof t.className && t.className || typeof t.getAttribute !== V && t.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(t, e, n) {
                            return function(s) {
                                var r = i.attr(s, t);
                                return null == r ? "!=" === e : e ? (r += "", "=" === e ? r === n : "!=" === e ? r !== n : "^=" === e ? n && 0 === r.indexOf(n) : "*=" === e ? n && r.indexOf(n) > -1 : "$=" === e ? n && r.slice(-n.length) === n : "~=" === e ? (" " + r + " ").indexOf(n) > -1 : "|=" === e ? r === n || r.slice(0, n.length + 1) === n + "-" : !1) : !0
                            }
                        },
                        CHILD: function(t, e, i, n, s) {
                            var r = "nth" !== t.slice(0, 3),
                                o = "last" !== t.slice(-4),
                                a = "of-type" === e;
                            return 1 === n && 0 === s ? function(t) {
                                return !!t.parentNode
                            } : function(e, i, l) {
                                var c, u, h, d, p, f, m = r !== o ? "nextSibling" : "previousSibling",
                                    g = e.parentNode,
                                    v = a && e.nodeName.toLowerCase(),
                                    y = !l && !a;
                                if (g) {
                                    if (r) {
                                        for (; m;) {
                                            for (h = e; h = h[m];)
                                                if (a ? h.nodeName.toLowerCase() === v : 1 === h.nodeType) return !1;
                                            f = m = "only" === t && !f && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (f = [o ? g.firstChild : g.lastChild], o && y) {
                                        for (u = g[L] || (g[L] = {}), c = u[t] || [], p = c[0] === F && c[1], d = c[0] === F && c[2], h = p && g.childNodes[p]; h = ++p && h && h[m] || (d = p = 0) || f.pop();)
                                            if (1 === h.nodeType && ++d && h === e) {
                                                u[t] = [F, p, d];
                                                break
                                            }
                                    } else if (y && (c = (e[L] || (e[L] = {}))[t]) && c[0] === F) d = c[1];
                                    else
                                        for (;
                                            (h = ++p && h && h[m] || (d = p = 0) || f.pop()) && ((a ? h.nodeName.toLowerCase() !== v : 1 !== h.nodeType) || !++d || (y && ((h[L] || (h[L] = {}))[t] = [F, d]), h !== e)););
                                    return d -= s, d === n || 0 === d % n && d / n >= 0
                                }
                            }
                        },
                        PSEUDO: function(t, e) {
                            var n, r = T.pseudos[t] || T.setFilters[t.toLowerCase()] || i.error("unsupported pseudo: " + t);
                            return r[L] ? r(e) : r.length > 1 ? (n = [t, t, "", e], T.setFilters.hasOwnProperty(t.toLowerCase()) ? s(function(t, i) {
                                for (var n, s = r(t, e), o = s.length; o--;) n = ie.call(t, s[o]), t[n] = !(i[n] = s[o])
                            }) : function(t) {
                                return r(t, 0, n)
                            }) : r
                        }
                    },
                    pseudos: {
                        not: s(function(t) {
                            var e = [],
                                i = [],
                                n = D(t.replace(ce, "$1"));
                            return n[L] ? s(function(t, e, i, s) {
                                for (var r, o = n(t, null, s, []), a = t.length; a--;)(r = o[a]) && (t[a] = !(e[a] = r))
                            }) : function(t, s, r) {
                                return e[0] = t, n(e, null, r, i), !i.pop()
                            }
                        }),
                        has: s(function(t) {
                            return function(e) {
                                return i(t, e).length > 0
                            }
                        }),
                        contains: s(function(t) {
                            return function(e) {
                                return (e.textContent || e.innerText || M(e)).indexOf(t) > -1
                            }
                        }),
                        lang: s(function(t) {
                            return ge.test(t || "") || i.error("unsupported lang: " + t), t = t.replace(Ce, ke).toLowerCase(),
                                function(e) {
                                    var i;
                                    do
                                        if (i = A ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return i = i.toLowerCase(), i === t || 0 === i.indexOf(t + "-");
                                    while ((e = e.parentNode) && 1 === e.nodeType);
                                    return !1
                                }
                        }),
                        target: function(e) {
                            var i = t.location && t.location.hash;
                            return i && i.slice(1) === e.id
                        },
                        root: function(t) {
                            return t === P
                        },
                        focus: function(t) {
                            return t === $.activeElement && (!$.hasFocus || $.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                        },
                        enabled: function(t) {
                            return t.disabled === !1
                        },
                        disabled: function(t) {
                            return t.disabled === !0
                        },
                        checked: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && !!t.checked || "option" === e && !!t.selected
                        },
                        selected: function(t) {
                            return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                        },
                        empty: function(t) {
                            for (t = t.firstChild; t; t = t.nextSibling)
                                if (t.nodeName > "@" || 3 === t.nodeType || 4 === t.nodeType) return !1;
                            return !0
                        },
                        parent: function(t) {
                            return !T.pseudos.empty(t)
                        },
                        header: function(t) {
                            return _e.test(t.nodeName)
                        },
                        input: function(t) {
                            return we.test(t.nodeName)
                        },
                        button: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && "button" === t.type || "button" === e
                        },
                        text: function(t) {
                            var e;
                            return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || e.toLowerCase() === t.type)
                        },
                        first: u(function() {
                            return [0]
                        }),
                        last: u(function(t, e) {
                            return [e - 1]
                        }),
                        eq: u(function(t, e, i) {
                            return [0 > i ? i + e : i]
                        }),
                        even: u(function(t, e) {
                            for (var i = 0; e > i; i += 2) t.push(i);
                            return t
                        }),
                        odd: u(function(t, e) {
                            for (var i = 1; e > i; i += 2) t.push(i);
                            return t
                        }),
                        lt: u(function(t, e, i) {
                            for (var n = 0 > i ? i + e : i; --n >= 0;) t.push(n);
                            return t
                        }),
                        gt: u(function(t, e, i) {
                            for (var n = 0 > i ? i + e : i; ++n < e;) t.push(n);
                            return t
                        })
                    }
                }, T.pseudos.nth = T.pseudos.eq;
                for (x in {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    }) T.pseudos[x] = l(x);
                for (x in {
                        submit: !0,
                        reset: !0
                    }) T.pseudos[x] = c(x);
                h.prototype = T.filters = T.pseudos, T.setFilters = new h, D = i.compile = function(t, e) {
                    var i, n = [],
                        s = [],
                        r = q[t + " "];
                    if (!r) {
                        for (e || (e = d(t)), i = e.length; i--;) r = y(e[i]), r[L] ? n.push(r) : s.push(r);
                        r = q(t, b(s, n))
                    }
                    return r
                }, C.sortStable = L.split("").sort(Y).join("") === L, C.detectDuplicates = U, j(), C.sortDetached = r(function(t) {
                    return 1 & t.compareDocumentPosition($.createElement("div"))
                }), r(function(t) {
                    return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
                }) || o("type|href|height|width", function(t, e, i) {
                    return i ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
                }), C.attributes && r(function(t) {
                    return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
                }) || o("value", function(t, e, i) {
                    return i || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue
                }), r(function(t) {
                    return null == t.getAttribute("disabled")
                }) || o(ne, function(t, e, i) {
                    var n;
                    return i ? void 0 : (n = t.getAttributeNode(e)) && n.specified ? n.value : t[e] === !0 ? e.toLowerCase() : null
                }), ue.find = i, ue.expr = i.selectors, ue.expr[":"] = ue.expr.pseudos, ue.unique = i.uniqueSort, ue.text = i.getText, ue.isXMLDoc = i.isXML, ue.contains = i.contains
            }(t);
        var Te = {};
        ue.Callbacks = function(t) {
            t = "string" == typeof t ? Te[t] || n(t) : ue.extend({}, t);
            var i, s, r, o, a, l, c = [],
                u = !t.once && [],
                h = function(e) {
                    for (s = t.memory && e, r = !0, a = l || 0, l = 0, o = c.length, i = !0; c && o > a; a++)
                        if (c[a].apply(e[0], e[1]) === !1 && t.stopOnFalse) {
                            s = !1;
                            break
                        }
                    i = !1, c && (u ? u.length && h(u.shift()) : s ? c = [] : d.disable())
                },
                d = {
                    add: function() {
                        if (c) {
                            var e = c.length;
                            ! function n(e) {
                                ue.each(e, function(e, i) {
                                    var s = ue.type(i);
                                    "function" === s ? t.unique && d.has(i) || c.push(i) : i && i.length && "string" !== s && n(i)
                                })
                            }(arguments), i ? o = c.length : s && (l = e, h(s))
                        }
                        return this
                    },
                    remove: function() {
                        return c && ue.each(arguments, function(t, e) {
                            for (var n;
                                (n = ue.inArray(e, c, n)) > -1;) c.splice(n, 1), i && (o >= n && o--, a >= n && a--)
                        }), this
                    },
                    has: function(t) {
                        return t ? ue.inArray(t, c) > -1 : !(!c || !c.length)
                    },
                    empty: function() {
                        return c = [], o = 0, this
                    },
                    disable: function() {
                        return c = u = s = e, this
                    },
                    disabled: function() {
                        return !c
                    },
                    lock: function() {
                        return u = e, s || d.disable(), this
                    },
                    locked: function() {
                        return !u
                    },
                    fireWith: function(t, e) {
                        return !c || r && !u || (e = e || [], e = [t, e.slice ? e.slice() : e], i ? u.push(e) : h(e)), this
                    },
                    fire: function() {
                        return d.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!r
                    }
                };
            return d
        }, ue.extend({
            Deferred: function(t) {
                var e = [
                        ["resolve", "done", ue.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", ue.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", ue.Callbacks("memory")]
                    ],
                    i = "pending",
                    n = {
                        state: function() {
                            return i
                        },
                        always: function() {
                            return s.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var t = arguments;
                            return ue.Deferred(function(i) {
                                ue.each(e, function(e, r) {
                                    var o = r[0],
                                        a = ue.isFunction(t[e]) && t[e];
                                    s[r[1]](function() {
                                        var t = a && a.apply(this, arguments);
                                        t && ue.isFunction(t.promise) ? t.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[o + "With"](this === n ? i.promise() : this, a ? [t] : arguments)
                                    })
                                }), t = null
                            }).promise()
                        },
                        promise: function(t) {
                            return null != t ? ue.extend(t, n) : n
                        }
                    },
                    s = {};
                return n.pipe = n.then, ue.each(e, function(t, r) {
                    var o = r[2],
                        a = r[3];
                    n[r[1]] = o.add, a && o.add(function() {
                        i = a
                    }, e[1 ^ t][2].disable, e[2][2].lock), s[r[0]] = function() {
                        return s[r[0] + "With"](this === s ? n : this, arguments), this
                    }, s[r[0] + "With"] = o.fireWith
                }), n.promise(s), t && t.call(s, s), s
            },
            when: function(t) {
                var e, i, n, s = 0,
                    r = re.call(arguments),
                    o = r.length,
                    a = 1 !== o || t && ue.isFunction(t.promise) ? o : 0,
                    l = 1 === a ? t : ue.Deferred(),
                    c = function(t, i, n) {
                        return function(s) {
                            i[t] = this, n[t] = arguments.length > 1 ? re.call(arguments) : s, n === e ? l.notifyWith(i, n) : --a || l.resolveWith(i, n)
                        }
                    };
                if (o > 1)
                    for (e = new Array(o), i = new Array(o), n = new Array(o); o > s; s++) r[s] && ue.isFunction(r[s].promise) ? r[s].promise().done(c(s, n, r)).fail(l.reject).progress(c(s, i, e)) : --a;
                return a || l.resolveWith(n, r), l.promise()
            }
        }), ue.support = function(e) {
            var i, n, s, r, o, a, l, c, u, h = X.createElement("div");
            if (h.setAttribute("className", "t"), h.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = h.getElementsByTagName("*") || [], n = h.getElementsByTagName("a")[0], !n || !n.style || !i.length) return e;
            r = X.createElement("select"), a = r.appendChild(X.createElement("option")), s = h.getElementsByTagName("input")[0], n.style.cssText = "top:1px;float:left;opacity:.5", e.getSetAttribute = "t" !== h.className, e.leadingWhitespace = 3 === h.firstChild.nodeType, e.tbody = !h.getElementsByTagName("tbody").length, e.htmlSerialize = !!h.getElementsByTagName("link").length, e.style = /top/.test(n.getAttribute("style")), e.hrefNormalized = "/a" === n.getAttribute("href"), e.opacity = /^0.5/.test(n.style.opacity), e.cssFloat = !!n.style.cssFloat, e.checkOn = !!s.value, e.optSelected = a.selected, e.enctype = !!X.createElement("form").enctype, e.html5Clone = "<:nav></:nav>" !== X.createElement("nav").cloneNode(!0).outerHTML, e.inlineBlockNeedsLayout = !1, e.shrinkWrapBlocks = !1, e.pixelPosition = !1, e.deleteExpando = !0, e.noCloneEvent = !0, e.reliableMarginRight = !0, e.boxSizingReliable = !0, s.checked = !0, e.noCloneChecked = s.cloneNode(!0).checked, r.disabled = !0, e.optDisabled = !a.disabled;
            try {
                delete h.test
            } catch (d) {
                e.deleteExpando = !1
            }
            s = X.createElement("input"), s.setAttribute("value", ""), e.input = "" === s.getAttribute("value"), s.value = "t", s.setAttribute("type", "radio"), e.radioValue = "t" === s.value, s.setAttribute("checked", "t"), s.setAttribute("name", "t"), o = X.createDocumentFragment(), o.appendChild(s), e.appendChecked = s.checked, e.checkClone = o.cloneNode(!0).cloneNode(!0).lastChild.checked, h.attachEvent && (h.attachEvent("onclick", function() {
                e.noCloneEvent = !1
            }), h.cloneNode(!0).click());
            for (u in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                }) h.setAttribute(l = "on" + u, "t"), e[u + "Bubbles"] = l in t || h.attributes[l].expando === !1;
            h.style.backgroundClip = "content-box", h.cloneNode(!0).style.backgroundClip = "", e.clearCloneStyle = "content-box" === h.style.backgroundClip;
            for (u in ue(e)) break;
            return e.ownLast = "0" !== u, ue(function() {
                var i, n, s, r = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                    o = X.getElementsByTagName("body")[0];
                o && (i = X.createElement("div"), i.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", o.appendChild(i).appendChild(h), h.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", s = h.getElementsByTagName("td"), s[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = 0 === s[0].offsetHeight, s[0].style.display = "", s[1].style.display = "none", e.reliableHiddenOffsets = c && 0 === s[0].offsetHeight, h.innerHTML = "", h.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", ue.swap(o, null != o.style.zoom ? {
                    zoom: 1
                } : {}, function() {
                    e.boxSizing = 4 === h.offsetWidth
                }), t.getComputedStyle && (e.pixelPosition = "1%" !== (t.getComputedStyle(h, null) || {}).top, e.boxSizingReliable = "4px" === (t.getComputedStyle(h, null) || {
                    width: "4px"
                }).width, n = h.appendChild(X.createElement("div")), n.style.cssText = h.style.cssText = r, n.style.marginRight = n.style.width = "0", h.style.width = "1px", e.reliableMarginRight = !parseFloat((t.getComputedStyle(n, null) || {}).marginRight)), typeof h.style.zoom !== V && (h.innerHTML = "", h.style.cssText = r + "width:1px;padding:1px;display:inline;zoom:1", e.inlineBlockNeedsLayout = 3 === h.offsetWidth, h.style.display = "block", h.innerHTML = "<div></div>", h.firstChild.style.width = "5px", e.shrinkWrapBlocks = 3 !== h.offsetWidth, e.inlineBlockNeedsLayout && (o.style.zoom = 1)), o.removeChild(i), i = h = s = n = null)
            }), i = r = o = a = n = s = null, e
        }({});
        var Me = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
            Ee = /([A-Z])/g;
        ue.extend({
            cache: {},
            noData: {
                applet: !0,
                embed: !0,
                object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
            },
            hasData: function(t) {
                return t = t.nodeType ? ue.cache[t[ue.expando]] : t[ue.expando], !!t && !a(t)
            },
            data: function(t, e, i) {
                return s(t, e, i)
            },
            removeData: function(t, e) {
                return r(t, e)
            },
            _data: function(t, e, i) {
                return s(t, e, i, !0)
            },
            _removeData: function(t, e) {
                return r(t, e, !0)
            },
            acceptData: function(t) {
                if (t.nodeType && 1 !== t.nodeType && 9 !== t.nodeType) return !1;
                var e = t.nodeName && ue.noData[t.nodeName.toLowerCase()];
                return !e || e !== !0 && t.getAttribute("classid") === e
            }
        }), ue.fn.extend({
            data: function(t, i) {
                var n, s, r = null,
                    a = 0,
                    l = this[0];
                if (t === e) {
                    if (this.length && (r = ue.data(l), 1 === l.nodeType && !ue._data(l, "parsedAttrs"))) {
                        for (n = l.attributes; a < n.length; a++) s = n[a].name, 0 === s.indexOf("data-") && (s = ue.camelCase(s.slice(5)), o(l, s, r[s]));
                        ue._data(l, "parsedAttrs", !0)
                    }
                    return r
                }
                return "object" == typeof t ? this.each(function() {
                    ue.data(this, t)
                }) : arguments.length > 1 ? this.each(function() {
                    ue.data(this, t, i)
                }) : l ? o(l, t, ue.data(l, t)) : null
            },
            removeData: function(t) {
                return this.each(function() {
                    ue.removeData(this, t)
                })
            }
        }), ue.extend({
            queue: function(t, e, i) {
                var n;
                return t ? (e = (e || "fx") + "queue", n = ue._data(t, e), i && (!n || ue.isArray(i) ? n = ue._data(t, e, ue.makeArray(i)) : n.push(i)), n || []) : void 0
            },
            dequeue: function(t, e) {
                e = e || "fx";
                var i = ue.queue(t, e),
                    n = i.length,
                    s = i.shift(),
                    r = ue._queueHooks(t, e),
                    o = function() {
                        ue.dequeue(t, e)
                    };
                "inprogress" === s && (s = i.shift(), n--), s && ("fx" === e && i.unshift("inprogress"), delete r.stop, s.call(t, o, r)), !n && r && r.empty.fire()
            },
            _queueHooks: function(t, e) {
                var i = e + "queueHooks";
                return ue._data(t, i) || ue._data(t, i, {
                    empty: ue.Callbacks("once memory").add(function() {
                        ue._removeData(t, e + "queue"), ue._removeData(t, i)
                    })
                })
            }
        }), ue.fn.extend({
            queue: function(t, i) {
                var n = 2;
                return "string" != typeof t && (i = t, t = "fx", n--), arguments.length < n ? ue.queue(this[0], t) : i === e ? this : this.each(function() {
                    var e = ue.queue(this, t, i);
                    ue._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && ue.dequeue(this, t)
                })
            },
            dequeue: function(t) {
                return this.each(function() {
                    ue.dequeue(this, t)
                })
            },
            delay: function(t, e) {
                return t = ue.fx ? ue.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, i) {
                    var n = setTimeout(e, t);
                    i.stop = function() {
                        clearTimeout(n)
                    }
                })
            },
            clearQueue: function(t) {
                return this.queue(t || "fx", [])
            },
            promise: function(t, i) {
                var n, s = 1,
                    r = ue.Deferred(),
                    o = this,
                    a = this.length,
                    l = function() {
                        --s || r.resolveWith(o, [o])
                    };
                for ("string" != typeof t && (i = t, t = e), t = t || "fx"; a--;) n = ue._data(o[a], t + "queueHooks"), n && n.empty && (s++, n.empty.add(l));
                return l(), r.promise(i)
            }
        });
        var De, Se, Ie = /[\t\r\n\f]/g,
            je = /\r/g,
            $e = /^(?:input|select|textarea|button|object)$/i,
            Pe = /^(?:a|area)$/i,
            Ae = /^(?:checked|selected)$/i,
            He = ue.support.getSetAttribute,
            Ne = ue.support.input;
        ue.fn.extend({
            attr: function(t, e) {
                return ue.access(this, ue.attr, t, e, arguments.length > 1)
            },
            removeAttr: function(t) {
                return this.each(function() {
                    ue.removeAttr(this, t)
                })
            },
            prop: function(t, e) {
                return ue.access(this, ue.prop, t, e, arguments.length > 1)
            },
            removeProp: function(t) {
                return t = ue.propFix[t] || t, this.each(function() {
                    try {
                        this[t] = e, delete this[t]
                    } catch (i) {}
                })
            },
            addClass: function(t) {
                var e, i, n, s, r, o = 0,
                    a = this.length,
                    l = "string" == typeof t && t;
                if (ue.isFunction(t)) return this.each(function(e) {
                    ue(this).addClass(t.call(this, e, this.className))
                });
                if (l)
                    for (e = (t || "").match(de) || []; a > o; o++)
                        if (i = this[o], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(Ie, " ") : " ")) {
                            for (r = 0; s = e[r++];) n.indexOf(" " + s + " ") < 0 && (n += s + " ");
                            i.className = ue.trim(n)
                        }
                return this
            },
            removeClass: function(t) {
                var e, i, n, s, r, o = 0,
                    a = this.length,
                    l = 0 === arguments.length || "string" == typeof t && t;
                if (ue.isFunction(t)) return this.each(function(e) {
                    ue(this).removeClass(t.call(this, e, this.className))
                });
                if (l)
                    for (e = (t || "").match(de) || []; a > o; o++)
                        if (i = this[o], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(Ie, " ") : "")) {
                            for (r = 0; s = e[r++];)
                                for (; n.indexOf(" " + s + " ") >= 0;) n = n.replace(" " + s + " ", " ");
                            i.className = t ? ue.trim(n) : ""
                        }
                return this
            },
            toggleClass: function(t, e) {
                var i = typeof t;
                return "boolean" == typeof e && "string" === i ? e ? this.addClass(t) : this.removeClass(t) : ue.isFunction(t) ? this.each(function(i) {
                    ue(this).toggleClass(t.call(this, i, this.className, e), e)
                }) : this.each(function() {
                    if ("string" === i)
                        for (var e, n = 0, s = ue(this), r = t.match(de) || []; e = r[n++];) s.hasClass(e) ? s.removeClass(e) : s.addClass(e);
                    else(i === V || "boolean" === i) && (this.className && ue._data(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : ue._data(this, "__className__") || "")
                })
            },
            hasClass: function(t) {
                for (var e = " " + t + " ", i = 0, n = this.length; n > i; i++)
                    if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(Ie, " ").indexOf(e) >= 0) return !0;
                return !1
            },
            val: function(t) {
                var i, n, s, r = this[0]; {
                    if (arguments.length) return s = ue.isFunction(t), this.each(function(i) {
                        var r;
                        1 === this.nodeType && (r = s ? t.call(this, i, ue(this).val()) : t, null == r ? r = "" : "number" == typeof r ? r += "" : ue.isArray(r) && (r = ue.map(r, function(t) {
                            return null == t ? "" : t + ""
                        })), n = ue.valHooks[this.type] || ue.valHooks[this.nodeName.toLowerCase()], n && "set" in n && n.set(this, r, "value") !== e || (this.value = r))
                    });
                    if (r) return n = ue.valHooks[r.type] || ue.valHooks[r.nodeName.toLowerCase()], n && "get" in n && (i = n.get(r, "value")) !== e ? i : (i = r.value, "string" == typeof i ? i.replace(je, "") : null == i ? "" : i)
                }
            }
        }), ue.extend({
            valHooks: {
                option: {
                    get: function(t) {
                        var e = ue.find.attr(t, "value");
                        return null != e ? e : t.text
                    }
                },
                select: {
                    get: function(t) {
                        for (var e, i, n = t.options, s = t.selectedIndex, r = "select-one" === t.type || 0 > s, o = r ? null : [], a = r ? s + 1 : n.length, l = 0 > s ? a : r ? s : 0; a > l; l++)
                            if (i = n[l], !(!i.selected && l !== s || (ue.support.optDisabled ? i.disabled : null !== i.getAttribute("disabled")) || i.parentNode.disabled && ue.nodeName(i.parentNode, "optgroup"))) {
                                if (e = ue(i).val(), r) return e;
                                o.push(e)
                            }
                        return o
                    },
                    set: function(t, e) {
                        for (var i, n, s = t.options, r = ue.makeArray(e), o = s.length; o--;) n = s[o], (n.selected = ue.inArray(ue(n).val(), r) >= 0) && (i = !0);
                        return i || (t.selectedIndex = -1), r
                    }
                }
            },
            attr: function(t, i, n) {
                var s, r, o = t.nodeType;
                if (t && 3 !== o && 8 !== o && 2 !== o) return typeof t.getAttribute === V ? ue.prop(t, i, n) : (1 === o && ue.isXMLDoc(t) || (i = i.toLowerCase(), s = ue.attrHooks[i] || (ue.expr.match.bool.test(i) ? Se : De)), n === e ? s && "get" in s && null !== (r = s.get(t, i)) ? r : (r = ue.find.attr(t, i), null == r ? e : r) : null !== n ? s && "set" in s && (r = s.set(t, n, i)) !== e ? r : (t.setAttribute(i, n + ""), n) : (ue.removeAttr(t, i), void 0))
            },
            removeAttr: function(t, e) {
                var i, n, s = 0,
                    r = e && e.match(de);
                if (r && 1 === t.nodeType)
                    for (; i = r[s++];) n = ue.propFix[i] || i, ue.expr.match.bool.test(i) ? Ne && He || !Ae.test(i) ? t[n] = !1 : t[ue.camelCase("default-" + i)] = t[n] = !1 : ue.attr(t, i, ""), t.removeAttribute(He ? i : n)
            },
            attrHooks: {
                type: {
                    set: function(t, e) {
                        if (!ue.support.radioValue && "radio" === e && ue.nodeName(t, "input")) {
                            var i = t.value;
                            return t.setAttribute("type", e), i && (t.value = i), e
                        }
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            },
            prop: function(t, i, n) {
                var s, r, o, a = t.nodeType;
                if (t && 3 !== a && 8 !== a && 2 !== a) return o = 1 !== a || !ue.isXMLDoc(t), o && (i = ue.propFix[i] || i, r = ue.propHooks[i]), n !== e ? r && "set" in r && (s = r.set(t, n, i)) !== e ? s : t[i] = n : r && "get" in r && null !== (s = r.get(t, i)) ? s : t[i]
            },
            propHooks: {
                tabIndex: {
                    get: function(t) {
                        var e = ue.find.attr(t, "tabindex");
                        return e ? parseInt(e, 10) : $e.test(t.nodeName) || Pe.test(t.nodeName) && t.href ? 0 : -1
                    }
                }
            }
        }), Se = {
            set: function(t, e, i) {
                return e === !1 ? ue.removeAttr(t, i) : Ne && He || !Ae.test(i) ? t.setAttribute(!He && ue.propFix[i] || i, i) : t[ue.camelCase("default-" + i)] = t[i] = !0, i
            }
        }, ue.each(ue.expr.match.bool.source.match(/\w+/g), function(t, i) {
            var n = ue.expr.attrHandle[i] || ue.find.attr;
            ue.expr.attrHandle[i] = Ne && He || !Ae.test(i) ? function(t, i, s) {
                var r = ue.expr.attrHandle[i],
                    o = s ? e : (ue.expr.attrHandle[i] = e) != n(t, i, s) ? i.toLowerCase() : null;
                return ue.expr.attrHandle[i] = r, o
            } : function(t, i, n) {
                return n ? e : t[ue.camelCase("default-" + i)] ? i.toLowerCase() : null
            }
        }), Ne && He || (ue.attrHooks.value = {
            set: function(t, e, i) {
                return ue.nodeName(t, "input") ? (t.defaultValue = e, void 0) : De && De.set(t, e, i)
            }
        }), He || (De = {
            set: function(t, i, n) {
                var s = t.getAttributeNode(n);
                return s || t.setAttributeNode(s = t.ownerDocument.createAttribute(n)), s.value = i += "", "value" === n || i === t.getAttribute(n) ? i : e
            }
        }, ue.expr.attrHandle.id = ue.expr.attrHandle.name = ue.expr.attrHandle.coords = function(t, i, n) {
            var s;
            return n ? e : (s = t.getAttributeNode(i)) && "" !== s.value ? s.value : null
        }, ue.valHooks.button = {
            get: function(t, i) {
                var n = t.getAttributeNode(i);
                return n && n.specified ? n.value : e
            },
            set: De.set
        }, ue.attrHooks.contenteditable = {
            set: function(t, e, i) {
                De.set(t, "" === e ? !1 : e, i)
            }
        }, ue.each(["width", "height"], function(t, e) {
            ue.attrHooks[e] = {
                set: function(t, i) {
                    return "" === i ? (t.setAttribute(e, "auto"), i) : void 0
                }
            }
        })), ue.support.hrefNormalized || ue.each(["href", "src"], function(t, e) {
            ue.propHooks[e] = {
                get: function(t) {
                    return t.getAttribute(e, 4)
                }
            }
        }), ue.support.style || (ue.attrHooks.style = {
            get: function(t) {
                return t.style.cssText || e
            },
            set: function(t, e) {
                return t.style.cssText = e + ""
            }
        }), ue.support.optSelected || (ue.propHooks.selected = {
            get: function(t) {
                var e = t.parentNode;
                return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
            }
        }), ue.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            ue.propFix[this.toLowerCase()] = this
        }), ue.support.enctype || (ue.propFix.enctype = "encoding"), ue.each(["radio", "checkbox"], function() {
            ue.valHooks[this] = {
                set: function(t, e) {
                    return ue.isArray(e) ? t.checked = ue.inArray(ue(t).val(), e) >= 0 : void 0
                }
            }, ue.support.checkOn || (ue.valHooks[this].get = function(t) {
                return null === t.getAttribute("value") ? "on" : t.value
            })
        });
        var Oe = /^(?:input|select|textarea)$/i,
            ze = /^key/,
            Le = /^(?:mouse|contextmenu)|click/,
            Re = /^(?:focusinfocus|focusoutblur)$/,
            Fe = /^([^.]*)(?:\.(.+)|)$/;
        ue.event = {
            global: {},
            add: function(t, i, n, s, r) {
                var o, a, l, c, u, h, d, p, f, m, g, v = ue._data(t);
                if (v) {
                    for (n.handler && (c = n, n = c.handler, r = c.selector), n.guid || (n.guid = ue.guid++), (a = v.events) || (a = v.events = {}), (h = v.handle) || (h = v.handle = function(t) {
                            return typeof ue === V || t && ue.event.triggered === t.type ? e : ue.event.dispatch.apply(h.elem, arguments)
                        }, h.elem = t), i = (i || "").match(de) || [""], l = i.length; l--;) o = Fe.exec(i[l]) || [], f = g = o[1], m = (o[2] || "").split(".").sort(), f && (u = ue.event.special[f] || {}, f = (r ? u.delegateType : u.bindType) || f, u = ue.event.special[f] || {}, d = ue.extend({
                        type: f,
                        origType: g,
                        data: s,
                        handler: n,
                        guid: n.guid,
                        selector: r,
                        needsContext: r && ue.expr.match.needsContext.test(r),
                        namespace: m.join(".")
                    }, c), (p = a[f]) || (p = a[f] = [], p.delegateCount = 0, u.setup && u.setup.call(t, s, m, h) !== !1 || (t.addEventListener ? t.addEventListener(f, h, !1) : t.attachEvent && t.attachEvent("on" + f, h))), u.add && (u.add.call(t, d), d.handler.guid || (d.handler.guid = n.guid)), r ? p.splice(p.delegateCount++, 0, d) : p.push(d), ue.event.global[f] = !0);
                    t = null
                }
            },
            remove: function(t, e, i, n, s) {
                var r, o, a, l, c, u, h, d, p, f, m, g = ue.hasData(t) && ue._data(t);
                if (g && (u = g.events)) {
                    for (e = (e || "").match(de) || [""], c = e.length; c--;)
                        if (a = Fe.exec(e[c]) || [], p = m = a[1], f = (a[2] || "").split(".").sort(), p) {
                            for (h = ue.event.special[p] || {}, p = (n ? h.delegateType : h.bindType) || p, d = u[p] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = r = d.length; r--;) o = d[r], !s && m !== o.origType || i && i.guid !== o.guid || a && !a.test(o.namespace) || n && n !== o.selector && ("**" !== n || !o.selector) || (d.splice(r, 1), o.selector && d.delegateCount--, h.remove && h.remove.call(t, o));
                            l && !d.length && (h.teardown && h.teardown.call(t, f, g.handle) !== !1 || ue.removeEvent(t, p, g.handle), delete u[p])
                        } else
                            for (p in u) ue.event.remove(t, p + e[c], i, n, !0);
                    ue.isEmptyObject(u) && (delete g.handle, ue._removeData(t, "events"))
                }
            },
            trigger: function(i, n, s, r) {
                var o, a, l, c, u, h, d, p = [s || X],
                    f = le.call(i, "type") ? i.type : i,
                    m = le.call(i, "namespace") ? i.namespace.split(".") : [];
                if (l = h = s = s || X, 3 !== s.nodeType && 8 !== s.nodeType && !Re.test(f + ue.event.triggered) && (f.indexOf(".") >= 0 && (m = f.split("."), f = m.shift(), m.sort()), a = f.indexOf(":") < 0 && "on" + f, i = i[ue.expando] ? i : new ue.Event(f, "object" == typeof i && i), i.isTrigger = r ? 2 : 3, i.namespace = m.join("."), i.namespace_re = i.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, i.result = e, i.target || (i.target = s), n = null == n ? [i] : ue.makeArray(n, [i]), u = ue.event.special[f] || {}, r || !u.trigger || u.trigger.apply(s, n) !== !1)) {
                    if (!r && !u.noBubble && !ue.isWindow(s)) {
                        for (c = u.delegateType || f, Re.test(c + f) || (l = l.parentNode); l; l = l.parentNode) p.push(l), h = l;
                        h === (s.ownerDocument || X) && p.push(h.defaultView || h.parentWindow || t)
                    }
                    for (d = 0;
                        (l = p[d++]) && !i.isPropagationStopped();) i.type = d > 1 ? c : u.bindType || f, o = (ue._data(l, "events") || {})[i.type] && ue._data(l, "handle"), o && o.apply(l, n), o = a && l[a], o && ue.acceptData(l) && o.apply && o.apply(l, n) === !1 && i.preventDefault();
                    if (i.type = f, !r && !i.isDefaultPrevented() && (!u._default || u._default.apply(p.pop(), n) === !1) && ue.acceptData(s) && a && s[f] && !ue.isWindow(s)) {
                        h = s[a], h && (s[a] = null), ue.event.triggered = f;
                        try {
                            s[f]()
                        } catch (g) {}
                        ue.event.triggered = e, h && (s[a] = h)
                    }
                    return i.result
                }
            },
            dispatch: function(t) {
                t = ue.event.fix(t);
                var i, n, s, r, o, a = [],
                    l = re.call(arguments),
                    c = (ue._data(this, "events") || {})[t.type] || [],
                    u = ue.event.special[t.type] || {};
                if (l[0] = t, t.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, t) !== !1) {
                    for (a = ue.event.handlers.call(this, t, c), i = 0;
                        (r = a[i++]) && !t.isPropagationStopped();)
                        for (t.currentTarget = r.elem, o = 0;
                            (s = r.handlers[o++]) && !t.isImmediatePropagationStopped();)(!t.namespace_re || t.namespace_re.test(s.namespace)) && (t.handleObj = s, t.data = s.data, n = ((ue.event.special[s.origType] || {}).handle || s.handler).apply(r.elem, l), n !== e && (t.result = n) === !1 && (t.preventDefault(), t.stopPropagation()));
                    return u.postDispatch && u.postDispatch.call(this, t), t.result
                }
            },
            handlers: function(t, i) {
                var n, s, r, o, a = [],
                    l = i.delegateCount,
                    c = t.target;
                if (l && c.nodeType && (!t.button || "click" !== t.type))
                    for (; c != this; c = c.parentNode || this)
                        if (1 === c.nodeType && (c.disabled !== !0 || "click" !== t.type)) {
                            for (r = [], o = 0; l > o; o++) s = i[o], n = s.selector + " ", r[n] === e && (r[n] = s.needsContext ? ue(n, this).index(c) >= 0 : ue.find(n, this, null, [c]).length), r[n] && r.push(s);
                            r.length && a.push({
                                elem: c,
                                handlers: r
                            })
                        }
                return l < i.length && a.push({
                    elem: this,
                    handlers: i.slice(l)
                }), a
            },
            fix: function(t) {
                if (t[ue.expando]) return t;
                var e, i, n, s = t.type,
                    r = t,
                    o = this.fixHooks[s];
                for (o || (this.fixHooks[s] = o = Le.test(s) ? this.mouseHooks : ze.test(s) ? this.keyHooks : {}), n = o.props ? this.props.concat(o.props) : this.props, t = new ue.Event(r), e = n.length; e--;) i = n[e], t[i] = r[i];
                return t.target || (t.target = r.srcElement || X), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, o.filter ? o.filter(t, r) : t
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(t, e) {
                    return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(t, i) {
                    var n, s, r, o = i.button,
                        a = i.fromElement;
                    return null == t.pageX && null != i.clientX && (s = t.target.ownerDocument || X, r = s.documentElement, n = s.body, t.pageX = i.clientX + (r && r.scrollLeft || n && n.scrollLeft || 0) - (r && r.clientLeft || n && n.clientLeft || 0), t.pageY = i.clientY + (r && r.scrollTop || n && n.scrollTop || 0) - (r && r.clientTop || n && n.clientTop || 0)), !t.relatedTarget && a && (t.relatedTarget = a === t.target ? i.toElement : a), t.which || o === e || (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), t
                }
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== u() && this.focus) try {
                            return this.focus(), !1
                        } catch (t) {}
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        return this === u() && this.blur ? (this.blur(), !1) : void 0
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        return ue.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                    },
                    _default: function(t) {
                        return ue.nodeName(t.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(t) {
                        t.result !== e && (t.originalEvent.returnValue = t.result)
                    }
                }
            },
            simulate: function(t, e, i, n) {
                var s = ue.extend(new ue.Event, i, {
                    type: t,
                    isSimulated: !0,
                    originalEvent: {}
                });
                n ? ue.event.trigger(s, null, e) : ue.event.dispatch.call(e, s), s.isDefaultPrevented() && i.preventDefault()
            }
        }, ue.removeEvent = X.removeEventListener ? function(t, e, i) {
            t.removeEventListener && t.removeEventListener(e, i, !1)
        } : function(t, e, i) {
            var n = "on" + e;
            t.detachEvent && (typeof t[n] === V && (t[n] = null), t.detachEvent(n, i))
        }, ue.Event = function(t, e) {
            return this instanceof ue.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || t.returnValue === !1 || t.getPreventDefault && t.getPreventDefault() ? l : c) : this.type = t, e && ue.extend(this, e), this.timeStamp = t && t.timeStamp || ue.now(), this[ue.expando] = !0, void 0) : new ue.Event(t, e)
        }, ue.Event.prototype = {
            isDefaultPrevented: c,
            isPropagationStopped: c,
            isImmediatePropagationStopped: c,
            preventDefault: function() {
                var t = this.originalEvent;
                this.isDefaultPrevented = l, t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
            },
            stopPropagation: function() {
                var t = this.originalEvent;
                this.isPropagationStopped = l, t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
            },
            stopImmediatePropagation: function() {
                this.isImmediatePropagationStopped = l, this.stopPropagation()
            }
        }, ue.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function(t, e) {
            ue.event.special[t] = {
                delegateType: e,
                bindType: e,
                handle: function(t) {
                    var i, n = this,
                        s = t.relatedTarget,
                        r = t.handleObj;
                    return (!s || s !== n && !ue.contains(n, s)) && (t.type = r.origType, i = r.handler.apply(this, arguments), t.type = e), i
                }
            }
        }), ue.support.submitBubbles || (ue.event.special.submit = {
            setup: function() {
                return ue.nodeName(this, "form") ? !1 : (ue.event.add(this, "click._submit keypress._submit", function(t) {
                    var i = t.target,
                        n = ue.nodeName(i, "input") || ue.nodeName(i, "button") ? i.form : e;
                    n && !ue._data(n, "submitBubbles") && (ue.event.add(n, "submit._submit", function(t) {
                        t._submit_bubble = !0
                    }), ue._data(n, "submitBubbles", !0))
                }), void 0)
            },
            postDispatch: function(t) {
                t._submit_bubble && (delete t._submit_bubble, this.parentNode && !t.isTrigger && ue.event.simulate("submit", this.parentNode, t, !0))
            },
            teardown: function() {
                return ue.nodeName(this, "form") ? !1 : (ue.event.remove(this, "._submit"), void 0)
            }
        }), ue.support.changeBubbles || (ue.event.special.change = {
            setup: function() {
                return Oe.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ue.event.add(this, "propertychange._change", function(t) {
                    "checked" === t.originalEvent.propertyName && (this._just_changed = !0)
                }), ue.event.add(this, "click._change", function(t) {
                    this._just_changed && !t.isTrigger && (this._just_changed = !1), ue.event.simulate("change", this, t, !0)
                })), !1) : (ue.event.add(this, "beforeactivate._change", function(t) {
                    var e = t.target;
                    Oe.test(e.nodeName) && !ue._data(e, "changeBubbles") && (ue.event.add(e, "change._change", function(t) {
                        !this.parentNode || t.isSimulated || t.isTrigger || ue.event.simulate("change", this.parentNode, t, !0)
                    }), ue._data(e, "changeBubbles", !0))
                }), void 0)
            },
            handle: function(t) {
                var e = t.target;
                return this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type ? t.handleObj.handler.apply(this, arguments) : void 0
            },
            teardown: function() {
                return ue.event.remove(this, "._change"), !Oe.test(this.nodeName)
            }
        }), ue.support.focusinBubbles || ue.each({
            focus: "focusin",
            blur: "focusout"
        }, function(t, e) {
            var i = 0,
                n = function(t) {
                    ue.event.simulate(e, t.target, ue.event.fix(t), !0)
                };
            ue.event.special[e] = {
                setup: function() {
                    0 === i++ && X.addEventListener(t, n, !0)
                },
                teardown: function() {
                    0 === --i && X.removeEventListener(t, n, !0)
                }
            }
        }), ue.fn.extend({
            on: function(t, i, n, s, r) {
                var o, a;
                if ("object" == typeof t) {
                    "string" != typeof i && (n = n || i, i = e);
                    for (o in t) this.on(o, i, n, t[o], r);
                    return this
                }
                if (null == n && null == s ? (s = i, n = i = e) : null == s && ("string" == typeof i ? (s = n, n = e) : (s = n, n = i, i = e)), s === !1) s = c;
                else if (!s) return this;
                return 1 === r && (a = s, s = function(t) {
                    return ue().off(t), a.apply(this, arguments)
                }, s.guid = a.guid || (a.guid = ue.guid++)), this.each(function() {
                    ue.event.add(this, t, s, n, i)
                })
            },
            one: function(t, e, i, n) {
                return this.on(t, e, i, n, 1)
            },
            off: function(t, i, n) {
                var s, r;
                if (t && t.preventDefault && t.handleObj) return s = t.handleObj, ue(t.delegateTarget).off(s.namespace ? s.origType + "." + s.namespace : s.origType, s.selector, s.handler), this;
                if ("object" == typeof t) {
                    for (r in t) this.off(r, i, t[r]);
                    return this
                }
                return (i === !1 || "function" == typeof i) && (n = i, i = e), n === !1 && (n = c), this.each(function() {
                    ue.event.remove(this, t, n, i)
                })
            },
            trigger: function(t, e) {
                return this.each(function() {
                    ue.event.trigger(t, e, this)
                })
            },
            triggerHandler: function(t, e) {
                var i = this[0];
                return i ? ue.event.trigger(t, e, i, !0) : void 0
            }
        });
        var Be = /^.[^:#\[\.,]*$/,
            We = /^(?:parents|prev(?:Until|All))/,
            Qe = ue.expr.match.needsContext,
            qe = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        ue.fn.extend({
            find: function(t) {
                var e, i = [],
                    n = this,
                    s = n.length;
                if ("string" != typeof t) return this.pushStack(ue(t).filter(function() {
                    for (e = 0; s > e; e++)
                        if (ue.contains(n[e], this)) return !0
                }));
                for (e = 0; s > e; e++) ue.find(t, n[e], i);
                return i = this.pushStack(s > 1 ? ue.unique(i) : i), i.selector = this.selector ? this.selector + " " + t : t, i
            },
            has: function(t) {
                var e, i = ue(t, this),
                    n = i.length;
                return this.filter(function() {
                    for (e = 0; n > e; e++)
                        if (ue.contains(this, i[e])) return !0
                })
            },
            not: function(t) {
                return this.pushStack(d(this, t || [], !0))
            },
            filter: function(t) {
                return this.pushStack(d(this, t || [], !1))
            },
            is: function(t) {
                return !!d(this, "string" == typeof t && Qe.test(t) ? ue(t) : t || [], !1).length
            },
            closest: function(t, e) {
                for (var i, n = 0, s = this.length, r = [], o = Qe.test(t) || "string" != typeof t ? ue(t, e || this.context) : 0; s > n; n++)
                    for (i = this[n]; i && i !== e; i = i.parentNode)
                        if (i.nodeType < 11 && (o ? o.index(i) > -1 : 1 === i.nodeType && ue.find.matchesSelector(i, t))) {
                            i = r.push(i);
                            break
                        }
                return this.pushStack(r.length > 1 ? ue.unique(r) : r)
            },
            index: function(t) {
                return t ? "string" == typeof t ? ue.inArray(this[0], ue(t)) : ue.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(t, e) {
                var i = "string" == typeof t ? ue(t, e) : ue.makeArray(t && t.nodeType ? [t] : t),
                    n = ue.merge(this.get(), i);
                return this.pushStack(ue.unique(n))
            },
            addBack: function(t) {
                return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
            }
        }), ue.each({
            parent: function(t) {
                var e = t.parentNode;
                return e && 11 !== e.nodeType ? e : null
            },
            parents: function(t) {
                return ue.dir(t, "parentNode")
            },
            parentsUntil: function(t, e, i) {
                return ue.dir(t, "parentNode", i)
            },
            next: function(t) {
                return h(t, "nextSibling")
            },
            prev: function(t) {
                return h(t, "previousSibling")
            },
            nextAll: function(t) {
                return ue.dir(t, "nextSibling")
            },
            prevAll: function(t) {
                return ue.dir(t, "previousSibling")
            },
            nextUntil: function(t, e, i) {
                return ue.dir(t, "nextSibling", i)
            },
            prevUntil: function(t, e, i) {
                return ue.dir(t, "previousSibling", i)
            },
            siblings: function(t) {
                return ue.sibling((t.parentNode || {}).firstChild, t)
            },
            children: function(t) {
                return ue.sibling(t.firstChild)
            },
            contents: function(t) {
                return ue.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : ue.merge([], t.childNodes)
            }
        }, function(t, e) {
            ue.fn[t] = function(i, n) {
                var s = ue.map(this, e, i);
                return "Until" !== t.slice(-5) && (n = i), n && "string" == typeof n && (s = ue.filter(n, s)), this.length > 1 && (qe[t] || (s = ue.unique(s)), We.test(t) && (s = s.reverse())), this.pushStack(s)
            }
        }), ue.extend({
            filter: function(t, e, i) {
                var n = e[0];
                return i && (t = ":not(" + t + ")"), 1 === e.length && 1 === n.nodeType ? ue.find.matchesSelector(n, t) ? [n] : [] : ue.find.matches(t, ue.grep(e, function(t) {
                    return 1 === t.nodeType
                }))
            },
            dir: function(t, i, n) {
                for (var s = [], r = t[i]; r && 9 !== r.nodeType && (n === e || 1 !== r.nodeType || !ue(r).is(n));) 1 === r.nodeType && s.push(r), r = r[i];
                return s
            },
            sibling: function(t, e) {
                for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t);
                return i
            }
        });
        var Ue = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            Ye = / jQuery\d+="(?:null|\d+)"/g,
            Ve = new RegExp("<(?:" + Ue + ")[\\s/>]", "i"),
            Ke = /^\s+/,
            Xe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            Ge = /<([\w:]+)/,
            Je = /<tbody/i,
            Ze = /<|&#?\w+;/,
            ti = /<(?:script|style|link)/i,
            ei = /^(?:checkbox|radio)$/i,
            ii = /checked\s*(?:[^=]|=\s*.checked.)/i,
            ni = /^$|\/(?:java|ecma)script/i,
            si = /^true\/(.*)/,
            ri = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            oi = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: ue.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            },
            ai = p(X),
            li = ai.appendChild(X.createElement("div"));
        oi.optgroup = oi.option, oi.tbody = oi.tfoot = oi.colgroup = oi.caption = oi.thead, oi.th = oi.td, ue.fn.extend({
            text: function(t) {
                return ue.access(this, function(t) {
                    return t === e ? ue.text(this) : this.empty().append((this[0] && this[0].ownerDocument || X).createTextNode(t))
                }, null, t, arguments.length)
            },
            append: function() {
                return this.domManip(arguments, function(t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = f(this, t);
                        e.appendChild(t)
                    }
                })
            },
            prepend: function() {
                return this.domManip(arguments, function(t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = f(this, t);
                        e.insertBefore(t, e.firstChild)
                    }
                })
            },
            before: function() {
                return this.domManip(arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this)
                })
            },
            after: function() {
                return this.domManip(arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                })
            },
            remove: function(t, e) {
                for (var i, n = t ? ue.filter(t, this) : this, s = 0; null != (i = n[s]); s++) e || 1 !== i.nodeType || ue.cleanData(w(i)), i.parentNode && (e && ue.contains(i.ownerDocument, i) && v(w(i, "script")), i.parentNode.removeChild(i));
                return this
            },
            empty: function() {
                for (var t, e = 0; null != (t = this[e]); e++) {
                    for (1 === t.nodeType && ue.cleanData(w(t, !1)); t.firstChild;) t.removeChild(t.firstChild);
                    t.options && ue.nodeName(t, "select") && (t.options.length = 0)
                }
                return this
            },
            clone: function(t, e) {
                return t = null == t ? !1 : t, e = null == e ? t : e, this.map(function() {
                    return ue.clone(this, t, e)
                })
            },
            html: function(t) {
                return ue.access(this, function(t) {
                    var i = this[0] || {},
                        n = 0,
                        s = this.length;
                    if (t === e) return 1 === i.nodeType ? i.innerHTML.replace(Ye, "") : e;
                    if (!("string" != typeof t || ti.test(t) || !ue.support.htmlSerialize && Ve.test(t) || !ue.support.leadingWhitespace && Ke.test(t) || oi[(Ge.exec(t) || ["", ""])[1].toLowerCase()])) {
                        t = t.replace(Xe, "<$1></$2>");
                        try {
                            for (; s > n; n++) i = this[n] || {}, 1 === i.nodeType && (ue.cleanData(w(i, !1)), i.innerHTML = t);
                            i = 0
                        } catch (r) {}
                    }
                    i && this.empty().append(t)
                }, null, t, arguments.length)
            },
            replaceWith: function() {
                var t = ue.map(this, function(t) {
                        return [t.nextSibling, t.parentNode]
                    }),
                    e = 0;
                return this.domManip(arguments, function(i) {
                    var n = t[e++],
                        s = t[e++];
                    s && (n && n.parentNode !== s && (n = this.nextSibling), ue(this).remove(), s.insertBefore(i, n))
                }, !0), e ? this : this.remove()
            },
            detach: function(t) {
                return this.remove(t, !0)
            },
            domManip: function(t, e, i) {
                t = ne.apply([], t);
                var n, s, r, o, a, l, c = 0,
                    u = this.length,
                    h = this,
                    d = u - 1,
                    p = t[0],
                    f = ue.isFunction(p);
                if (f || !(1 >= u || "string" != typeof p || ue.support.checkClone) && ii.test(p)) return this.each(function(n) {
                    var s = h.eq(n);
                    f && (t[0] = p.call(this, n, s.html())), s.domManip(t, e, i)
                });
                if (u && (l = ue.buildFragment(t, this[0].ownerDocument, !1, !i && this), n = l.firstChild, 1 === l.childNodes.length && (l = n), n)) {
                    for (o = ue.map(w(l, "script"), m), r = o.length; u > c; c++) s = l, c !== d && (s = ue.clone(s, !0, !0), r && ue.merge(o, w(s, "script"))), e.call(this[c], s, c);
                    if (r)
                        for (a = o[o.length - 1].ownerDocument, ue.map(o, g), c = 0; r > c; c++) s = o[c], ni.test(s.type || "") && !ue._data(s, "globalEval") && ue.contains(a, s) && (s.src ? ue._evalUrl(s.src) : ue.globalEval((s.text || s.textContent || s.innerHTML || "").replace(ri, "")));
                    l = n = null
                }
                return this
            }
        }), ue.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(t, e) {
            ue.fn[t] = function(t) {
                for (var i, n = 0, s = [], r = ue(t), o = r.length - 1; o >= n; n++) i = n === o ? this : this.clone(!0), ue(r[n])[e](i), se.apply(s, i.get());
                return this.pushStack(s)
            }
        }), ue.extend({
            clone: function(t, e, i) {
                var n, s, r, o, a, l = ue.contains(t.ownerDocument, t);
                if (ue.support.html5Clone || ue.isXMLDoc(t) || !Ve.test("<" + t.nodeName + ">") ? r = t.cloneNode(!0) : (li.innerHTML = t.outerHTML, li.removeChild(r = li.firstChild)), !(ue.support.noCloneEvent && ue.support.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || ue.isXMLDoc(t)))
                    for (n = w(r), a = w(t), o = 0; null != (s = a[o]); ++o) n[o] && b(s, n[o]);
                if (e)
                    if (i)
                        for (a = a || w(t), n = n || w(r), o = 0; null != (s = a[o]); o++) y(s, n[o]);
                    else y(t, r);
                return n = w(r, "script"), n.length > 0 && v(n, !l && w(t, "script")), n = a = s = null, r
            },
            buildFragment: function(t, e, i, n) {
                for (var s, r, o, a, l, c, u, h = t.length, d = p(e), f = [], m = 0; h > m; m++)
                    if (r = t[m], r || 0 === r)
                        if ("object" === ue.type(r)) ue.merge(f, r.nodeType ? [r] : r);
                        else if (Ze.test(r)) {
                    for (a = a || d.appendChild(e.createElement("div")), l = (Ge.exec(r) || ["", ""])[1].toLowerCase(), u = oi[l] || oi._default, a.innerHTML = u[1] + r.replace(Xe, "<$1></$2>") + u[2], s = u[0]; s--;) a = a.lastChild;
                    if (!ue.support.leadingWhitespace && Ke.test(r) && f.push(e.createTextNode(Ke.exec(r)[0])), !ue.support.tbody)
                        for (r = "table" !== l || Je.test(r) ? "<table>" !== u[1] || Je.test(r) ? 0 : a : a.firstChild, s = r && r.childNodes.length; s--;) ue.nodeName(c = r.childNodes[s], "tbody") && !c.childNodes.length && r.removeChild(c);
                    for (ue.merge(f, a.childNodes), a.textContent = ""; a.firstChild;) a.removeChild(a.firstChild);
                    a = d.lastChild
                } else f.push(e.createTextNode(r));
                for (a && d.removeChild(a), ue.support.appendChecked || ue.grep(w(f, "input"), _), m = 0; r = f[m++];)
                    if ((!n || -1 === ue.inArray(r, n)) && (o = ue.contains(r.ownerDocument, r), a = w(d.appendChild(r), "script"), o && v(a), i))
                        for (s = 0; r = a[s++];) ni.test(r.type || "") && i.push(r);
                return a = null, d
            },
            cleanData: function(t, e) {
                for (var i, n, s, r, o = 0, a = ue.expando, l = ue.cache, c = ue.support.deleteExpando, u = ue.event.special; null != (i = t[o]); o++)
                    if ((e || ue.acceptData(i)) && (s = i[a], r = s && l[s])) {
                        if (r.events)
                            for (n in r.events) u[n] ? ue.event.remove(i, n) : ue.removeEvent(i, n, r.handle);
                        l[s] && (delete l[s], c ? delete i[a] : typeof i.removeAttribute !== V ? i.removeAttribute(a) : i[a] = null, ee.push(s))
                    }
            },
            _evalUrl: function(t) {
                return ue.ajax({
                    url: t,
                    type: "GET",
                    dataType: "script",
                    async: !1,
                    global: !1,
                    "throws": !0
                })
            }
        }), ue.fn.extend({
            wrapAll: function(t) {
                if (ue.isFunction(t)) return this.each(function(e) {
                    ue(this).wrapAll(t.call(this, e))
                });
                if (this[0]) {
                    var e = ue(t, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                        for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;) t = t.firstChild;
                        return t
                    }).append(this)
                }
                return this
            },
            wrapInner: function(t) {
                return ue.isFunction(t) ? this.each(function(e) {
                    ue(this).wrapInner(t.call(this, e))
                }) : this.each(function() {
                    var e = ue(this),
                        i = e.contents();
                    i.length ? i.wrapAll(t) : e.append(t)
                })
            },
            wrap: function(t) {
                var e = ue.isFunction(t);
                return this.each(function(i) {
                    ue(this).wrapAll(e ? t.call(this, i) : t)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    ue.nodeName(this, "body") || ue(this).replaceWith(this.childNodes)
                }).end()
            }
        });
        var ci, ui, hi, di = /alpha\([^)]*\)/i,
            pi = /opacity\s*=\s*([^)]*)/,
            fi = /^(top|right|bottom|left)$/,
            mi = /^(none|table(?!-c[ea]).+)/,
            gi = /^margin/,
            vi = new RegExp("^(" + he + ")(.*)$", "i"),
            yi = new RegExp("^(" + he + ")(?!px)[a-z%]+$", "i"),
            bi = new RegExp("^([+-])=(" + he + ")", "i"),
            wi = {
                BODY: "block"
            },
            _i = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            xi = {
                letterSpacing: 0,
                fontWeight: 400
            },
            Ci = ["Top", "Right", "Bottom", "Left"],
            ki = ["Webkit", "O", "Moz", "ms"];
        ue.fn.extend({
            css: function(t, i) {
                return ue.access(this, function(t, i, n) {
                    var s, r, o = {},
                        a = 0;
                    if (ue.isArray(i)) {
                        for (r = ui(t), s = i.length; s > a; a++) o[i[a]] = ue.css(t, i[a], !1, r);
                        return o
                    }
                    return n !== e ? ue.style(t, i, n) : ue.css(t, i)
                }, t, i, arguments.length > 1)
            },
            show: function() {
                return k(this, !0)
            },
            hide: function() {
                return k(this)
            },
            toggle: function(t) {
                return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                    C(this) ? ue(this).show() : ue(this).hide()
                })
            }
        }), ue.extend({
            cssHooks: {
                opacity: {
                    get: function(t, e) {
                        if (e) {
                            var i = hi(t, "opacity");
                            return "" === i ? "1" : i
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": ue.support.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function(t, i, n, s) {
                if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                    var r, o, a, l = ue.camelCase(i),
                        c = t.style;
                    if (i = ue.cssProps[l] || (ue.cssProps[l] = x(c, l)), a = ue.cssHooks[i] || ue.cssHooks[l], n === e) return a && "get" in a && (r = a.get(t, !1, s)) !== e ? r : c[i];
                    if (o = typeof n, "string" === o && (r = bi.exec(n)) && (n = (r[1] + 1) * r[2] + parseFloat(ue.css(t, i)), o = "number"), !(null == n || "number" === o && isNaN(n) || ("number" !== o || ue.cssNumber[l] || (n += "px"), ue.support.clearCloneStyle || "" !== n || 0 !== i.indexOf("background") || (c[i] = "inherit"), a && "set" in a && (n = a.set(t, n, s)) === e))) try {
                        c[i] = n
                    } catch (u) {}
                }
            },
            css: function(t, i, n, s) {
                var r, o, a, l = ue.camelCase(i);
                return i = ue.cssProps[l] || (ue.cssProps[l] = x(t.style, l)), a = ue.cssHooks[i] || ue.cssHooks[l], a && "get" in a && (o = a.get(t, !0, n)), o === e && (o = hi(t, i, s)), "normal" === o && i in xi && (o = xi[i]), "" === n || n ? (r = parseFloat(o), n === !0 || ue.isNumeric(r) ? r || 0 : o) : o
            }
        }), t.getComputedStyle ? (ui = function(e) {
            return t.getComputedStyle(e, null)
        }, hi = function(t, i, n) {
            var s, r, o, a = n || ui(t),
                l = a ? a.getPropertyValue(i) || a[i] : e,
                c = t.style;
            return a && ("" !== l || ue.contains(t.ownerDocument, t) || (l = ue.style(t, i)), yi.test(l) && gi.test(i) && (s = c.width, r = c.minWidth, o = c.maxWidth, c.minWidth = c.maxWidth = c.width = l, l = a.width, c.width = s, c.minWidth = r, c.maxWidth = o)), l
        }) : X.documentElement.currentStyle && (ui = function(t) {
            return t.currentStyle
        }, hi = function(t, i, n) {
            var s, r, o, a = n || ui(t),
                l = a ? a[i] : e,
                c = t.style;
            return null == l && c && c[i] && (l = c[i]), yi.test(l) && !fi.test(i) && (s = c.left, r = t.runtimeStyle, o = r && r.left, o && (r.left = t.currentStyle.left), c.left = "fontSize" === i ? "1em" : l, l = c.pixelLeft + "px", c.left = s, o && (r.left = o)), "" === l ? "auto" : l
        }), ue.each(["height", "width"], function(t, e) {
            ue.cssHooks[e] = {
                get: function(t, i, n) {
                    return i ? 0 === t.offsetWidth && mi.test(ue.css(t, "display")) ? ue.swap(t, _i, function() {
                        return E(t, e, n)
                    }) : E(t, e, n) : void 0
                },
                set: function(t, i, n) {
                    var s = n && ui(t);
                    return T(t, i, n ? M(t, e, n, ue.support.boxSizing && "border-box" === ue.css(t, "boxSizing", !1, s), s) : 0)
                }
            }
        }), ue.support.opacity || (ue.cssHooks.opacity = {
            get: function(t, e) {
                return pi.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
            },
            set: function(t, e) {
                var i = t.style,
                    n = t.currentStyle,
                    s = ue.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
                    r = n && n.filter || i.filter || "";
                i.zoom = 1, (e >= 1 || "" === e) && "" === ue.trim(r.replace(di, "")) && i.removeAttribute && (i.removeAttribute("filter"), "" === e || n && !n.filter) || (i.filter = di.test(r) ? r.replace(di, s) : r + " " + s)
            }
        }), ue(function() {
            ue.support.reliableMarginRight || (ue.cssHooks.marginRight = {
                get: function(t, e) {
                    return e ? ue.swap(t, {
                        display: "inline-block"
                    }, hi, [t, "marginRight"]) : void 0
                }
            }), !ue.support.pixelPosition && ue.fn.position && ue.each(["top", "left"], function(t, e) {
                ue.cssHooks[e] = {
                    get: function(t, i) {
                        return i ? (i = hi(t, e), yi.test(i) ? ue(t).position()[e] + "px" : i) : void 0
                    }
                }
            })
        }), ue.expr && ue.expr.filters && (ue.expr.filters.hidden = function(t) {
            return t.offsetWidth <= 0 && t.offsetHeight <= 0 || !ue.support.reliableHiddenOffsets && "none" === (t.style && t.style.display || ue.css(t, "display"))
        }, ue.expr.filters.visible = function(t) {
            return !ue.expr.filters.hidden(t)
        }), ue.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(t, e) {
            ue.cssHooks[t + e] = {
                expand: function(i) {
                    for (var n = 0, s = {}, r = "string" == typeof i ? i.split(" ") : [i]; 4 > n; n++) s[t + Ci[n] + e] = r[n] || r[n - 2] || r[0];
                    return s
                }
            }, gi.test(t) || (ue.cssHooks[t + e].set = T)
        });
        var Ti = /%20/g,
            Mi = /\[\]$/,
            Ei = /\r?\n/g,
            Di = /^(?:submit|button|image|reset|file)$/i,
            Si = /^(?:input|select|textarea|keygen)/i;
        ue.fn.extend({
            serialize: function() {
                return ue.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var t = ue.prop(this, "elements");
                    return t ? ue.makeArray(t) : this
                }).filter(function() {
                    var t = this.type;
                    return this.name && !ue(this).is(":disabled") && Si.test(this.nodeName) && !Di.test(t) && (this.checked || !ei.test(t))
                }).map(function(t, e) {
                    var i = ue(this).val();
                    return null == i ? null : ue.isArray(i) ? ue.map(i, function(t) {
                        return {
                            name: e.name,
                            value: t.replace(Ei, "\r\n")
                        }
                    }) : {
                        name: e.name,
                        value: i.replace(Ei, "\r\n")
                    }
                }).get()
            }
        }), ue.param = function(t, i) {
            var n, s = [],
                r = function(t, e) {
                    e = ue.isFunction(e) ? e() : null == e ? "" : e, s[s.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
                };
            if (i === e && (i = ue.ajaxSettings && ue.ajaxSettings.traditional), ue.isArray(t) || t.jquery && !ue.isPlainObject(t)) ue.each(t, function() {
                r(this.name, this.value)
            });
            else
                for (n in t) I(n, t[n], i, r);
            return s.join("&").replace(Ti, "+")
        }, ue.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
            ue.fn[e] = function(t, i) {
                return arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e)
            }
        }), ue.fn.extend({
            hover: function(t, e) {
                return this.mouseenter(t).mouseleave(e || t)
            },
            bind: function(t, e, i) {
                return this.on(t, null, e, i)
            },
            unbind: function(t, e) {
                return this.off(t, null, e)
            },
            delegate: function(t, e, i, n) {
                return this.on(e, t, i, n)
            },
            undelegate: function(t, e, i) {
                return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
            }
        });
        var Ii, ji, $i = ue.now(),
            Pi = /\?/,
            Ai = /#.*$/,
            Hi = /([?&])_=[^&]*/,
            Ni = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            Oi = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            zi = /^(?:GET|HEAD)$/,
            Li = /^\/\//,
            Ri = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
            Fi = ue.fn.load,
            Bi = {},
            Wi = {},
            Qi = "*/".concat("*");
        try {
            ji = K.href
        } catch (qi) {
            ji = X.createElement("a"), ji.href = "", ji = ji.href
        }
        Ii = Ri.exec(ji.toLowerCase()) || [], ue.fn.load = function(t, i, n) {
            if ("string" != typeof t && Fi) return Fi.apply(this, arguments);
            var s, r, o, a = this,
                l = t.indexOf(" ");
            return l >= 0 && (s = t.slice(l, t.length), t = t.slice(0, l)), ue.isFunction(i) ? (n = i, i = e) : i && "object" == typeof i && (o = "POST"), a.length > 0 && ue.ajax({
                url: t,
                type: o,
                dataType: "html",
                data: i
            }).done(function(t) {
                r = arguments, a.html(s ? ue("<div>").append(ue.parseHTML(t)).find(s) : t)
            }).complete(n && function(t, e) {
                a.each(n, r || [t.responseText, e, t])
            }), this
        }, ue.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
            ue.fn[e] = function(t) {
                return this.on(e, t)
            }
        }), ue.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: ji,
                type: "GET",
                isLocal: Oi.test(Ii[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Qi,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": ue.parseJSON,
                    "text xml": ue.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(t, e) {
                return e ? P(P(t, ue.ajaxSettings), e) : P(ue.ajaxSettings, t)
            },
            ajaxPrefilter: j(Bi),
            ajaxTransport: j(Wi),
            ajax: function(t, i) {
                function n(t, i, n, s) {
                    var r, h, y, b, _, C = i;
                    2 !== w && (w = 2, l && clearTimeout(l), u = e, a = s || "", x.readyState = t > 0 ? 4 : 0, r = t >= 200 && 300 > t || 304 === t, n && (b = A(d, x, n)), b = H(d, b, x, r), r ? (d.ifModified && (_ = x.getResponseHeader("Last-Modified"), _ && (ue.lastModified[o] = _), _ = x.getResponseHeader("etag"), _ && (ue.etag[o] = _)), 204 === t || "HEAD" === d.type ? C = "nocontent" : 304 === t ? C = "notmodified" : (C = b.state, h = b.data, y = b.error, r = !y)) : (y = C, (t || !C) && (C = "error", 0 > t && (t = 0))), x.status = t, x.statusText = (i || C) + "", r ? m.resolveWith(p, [h, C, x]) : m.rejectWith(p, [x, C, y]), x.statusCode(v), v = e, c && f.trigger(r ? "ajaxSuccess" : "ajaxError", [x, d, r ? h : y]), g.fireWith(p, [x, C]), c && (f.trigger("ajaxComplete", [x, d]), --ue.active || ue.event.trigger("ajaxStop")))
                }
                "object" == typeof t && (i = t, t = e), i = i || {};
                var s, r, o, a, l, c, u, h, d = ue.ajaxSetup({}, i),
                    p = d.context || d,
                    f = d.context && (p.nodeType || p.jquery) ? ue(p) : ue.event,
                    m = ue.Deferred(),
                    g = ue.Callbacks("once memory"),
                    v = d.statusCode || {},
                    y = {},
                    b = {},
                    w = 0,
                    _ = "canceled",
                    x = {
                        readyState: 0,
                        getResponseHeader: function(t) {
                            var e;
                            if (2 === w) {
                                if (!h)
                                    for (h = {}; e = Ni.exec(a);) h[e[1].toLowerCase()] = e[2];
                                e = h[t.toLowerCase()]
                            }
                            return null == e ? null : e
                        },
                        getAllResponseHeaders: function() {
                            return 2 === w ? a : null
                        },
                        setRequestHeader: function(t, e) {
                            var i = t.toLowerCase();
                            return w || (t = b[i] = b[i] || t, y[t] = e), this
                        },
                        overrideMimeType: function(t) {
                            return w || (d.mimeType = t), this
                        },
                        statusCode: function(t) {
                            var e;
                            if (t)
                                if (2 > w)
                                    for (e in t) v[e] = [v[e], t[e]];
                                else x.always(t[x.status]);
                            return this
                        },
                        abort: function(t) {
                            var e = t || _;
                            return u && u.abort(e), n(0, e), this
                        }
                    };
                if (m.promise(x).complete = g.add, x.success = x.done, x.error = x.fail, d.url = ((t || d.url || ji) + "").replace(Ai, "").replace(Li, Ii[1] + "//"), d.type = i.method || i.type || d.method || d.type, d.dataTypes = ue.trim(d.dataType || "*").toLowerCase().match(de) || [""], null == d.crossDomain && (s = Ri.exec(d.url.toLowerCase()), d.crossDomain = !(!s || s[1] === Ii[1] && s[2] === Ii[2] && (s[3] || ("http:" === s[1] ? "80" : "443")) === (Ii[3] || ("http:" === Ii[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = ue.param(d.data, d.traditional)), $(Bi, d, i, x), 2 === w) return x;
                c = d.global, c && 0 === ue.active++ && ue.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !zi.test(d.type), o = d.url, d.hasContent || (d.data && (o = d.url += (Pi.test(o) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = Hi.test(o) ? o.replace(Hi, "$1_=" + $i++) : o + (Pi.test(o) ? "&" : "?") + "_=" + $i++)), d.ifModified && (ue.lastModified[o] && x.setRequestHeader("If-Modified-Since", ue.lastModified[o]), ue.etag[o] && x.setRequestHeader("If-None-Match", ue.etag[o])), (d.data && d.hasContent && d.contentType !== !1 || i.contentType) && x.setRequestHeader("Content-Type", d.contentType), x.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Qi + "; q=0.01" : "") : d.accepts["*"]);
                for (r in d.headers) x.setRequestHeader(r, d.headers[r]);
                if (d.beforeSend && (d.beforeSend.call(p, x, d) === !1 || 2 === w)) return x.abort();
                _ = "abort";
                for (r in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) x[r](d[r]);
                if (u = $(Wi, d, i, x)) {
                    x.readyState = 1, c && f.trigger("ajaxSend", [x, d]), d.async && d.timeout > 0 && (l = setTimeout(function() {
                        x.abort("timeout")
                    }, d.timeout));
                    try {
                        w = 1, u.send(y, n)
                    } catch (C) {
                        if (!(2 > w)) throw C;
                        n(-1, C)
                    }
                } else n(-1, "No Transport");
                return x
            },
            getJSON: function(t, e, i) {
                return ue.get(t, e, i, "json")
            },
            getScript: function(t, i) {
                return ue.get(t, e, i, "script")
            }
        }), ue.each(["get", "post"], function(t, i) {
            ue[i] = function(t, n, s, r) {
                return ue.isFunction(n) && (r = r || s, s = n, n = e), ue.ajax({
                    url: t,
                    type: i,
                    dataType: r,
                    data: n,
                    success: s
                })
            }
        }), ue.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function(t) {
                    return ue.globalEval(t), t
                }
            }
        }), ue.ajaxPrefilter("script", function(t) {
            t.cache === e && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
        }), ue.ajaxTransport("script", function(t) {
            if (t.crossDomain) {
                var i, n = X.head || ue("head")[0] || X.documentElement;
                return {
                    send: function(e, s) {
                        i = X.createElement("script"), i.async = !0, t.scriptCharset && (i.charset = t.scriptCharset), i.src = t.url, i.onload = i.onreadystatechange = function(t, e) {
                            (e || !i.readyState || /loaded|complete/.test(i.readyState)) && (i.onload = i.onreadystatechange = null, i.parentNode && i.parentNode.removeChild(i), i = null, e || s(200, "success"))
                        }, n.insertBefore(i, n.firstChild)
                    },
                    abort: function() {
                        i && i.onload(e, !0)
                    }
                }
            }
        });
        var Ui = [],
            Yi = /(=)\?(?=&|$)|\?\?/;
        ue.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var t = Ui.pop() || ue.expando + "_" + $i++;
                return this[t] = !0, t
            }
        }), ue.ajaxPrefilter("json jsonp", function(i, n, s) {
            var r, o, a, l = i.jsonp !== !1 && (Yi.test(i.url) ? "url" : "string" == typeof i.data && !(i.contentType || "").indexOf("application/x-www-form-urlencoded") && Yi.test(i.data) && "data");
            return l || "jsonp" === i.dataTypes[0] ? (r = i.jsonpCallback = ue.isFunction(i.jsonpCallback) ? i.jsonpCallback() : i.jsonpCallback, l ? i[l] = i[l].replace(Yi, "$1" + r) : i.jsonp !== !1 && (i.url += (Pi.test(i.url) ? "&" : "?") + i.jsonp + "=" + r), i.converters["script json"] = function() {
                return a || ue.error(r + " was not called"), a[0]
            }, i.dataTypes[0] = "json", o = t[r], t[r] = function() {
                a = arguments
            }, s.always(function() {
                t[r] = o, i[r] && (i.jsonpCallback = n.jsonpCallback, Ui.push(r)), a && ue.isFunction(o) && o(a[0]), a = o = e
            }), "script") : void 0
        });
        var Vi, Ki, Xi = 0,
            Gi = t.ActiveXObject && function() {
                var t;
                for (t in Vi) Vi[t](e, !0)
            };
        ue.ajaxSettings.xhr = t.ActiveXObject ? function() {
            return !this.isLocal && N() || O()
        } : N, Ki = ue.ajaxSettings.xhr(), ue.support.cors = !!Ki && "withCredentials" in Ki, Ki = ue.support.ajax = !!Ki, Ki && ue.ajaxTransport(function(i) {
            if (!i.crossDomain || ue.support.cors) {
                var n;
                return {
                    send: function(s, r) {
                        var o, a, l = i.xhr();
                        if (i.username ? l.open(i.type, i.url, i.async, i.username, i.password) : l.open(i.type, i.url, i.async), i.xhrFields)
                            for (a in i.xhrFields) l[a] = i.xhrFields[a];
                        i.mimeType && l.overrideMimeType && l.overrideMimeType(i.mimeType), i.crossDomain || s["X-Requested-With"] || (s["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (a in s) l.setRequestHeader(a, s[a])
                        } catch (c) {}
                        l.send(i.hasContent && i.data || null), n = function(t, s) {
                            var a, c, u, h;
                            try {
                                if (n && (s || 4 === l.readyState))
                                    if (n = e, o && (l.onreadystatechange = ue.noop, Gi && delete Vi[o]), s) 4 !== l.readyState && l.abort();
                                    else {
                                        h = {}, a = l.status, c = l.getAllResponseHeaders(), "string" == typeof l.responseText && (h.text = l.responseText);
                                        try {
                                            u = l.statusText
                                        } catch (d) {
                                            u = ""
                                        }
                                        a || !i.isLocal || i.crossDomain ? 1223 === a && (a = 204) : a = h.text ? 200 : 404
                                    }
                            } catch (p) {
                                s || r(-1, p)
                            }
                            h && r(a, u, h, c)
                        }, i.async ? 4 === l.readyState ? setTimeout(n) : (o = ++Xi, Gi && (Vi || (Vi = {}, ue(t).unload(Gi)), Vi[o] = n), l.onreadystatechange = n) : n()
                    },
                    abort: function() {
                        n && n(e, !0)
                    }
                }
            }
        });
        var Ji, Zi, tn = /^(?:toggle|show|hide)$/,
            en = new RegExp("^(?:([+-])=|)(" + he + ")([a-z%]*)$", "i"),
            nn = /queueHooks$/,
            sn = [B],
            rn = {
                "*": [function(t, e) {
                    var i = this.createTween(t, e),
                        n = i.cur(),
                        s = en.exec(e),
                        r = s && s[3] || (ue.cssNumber[t] ? "" : "px"),
                        o = (ue.cssNumber[t] || "px" !== r && +n) && en.exec(ue.css(i.elem, t)),
                        a = 1,
                        l = 20;
                    if (o && o[3] !== r) {
                        r = r || o[3], s = s || [], o = +n || 1;
                        do a = a || ".5", o /= a, ue.style(i.elem, t, o + r); while (a !== (a = i.cur() / n) && 1 !== a && --l)
                    }
                    return s && (o = i.start = +o || +n || 0, i.unit = r, i.end = s[1] ? o + (s[1] + 1) * s[2] : +s[2]), i
                }]
            };
        ue.Animation = ue.extend(R, {
            tweener: function(t, e) {
                ue.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
                for (var i, n = 0, s = t.length; s > n; n++) i = t[n], rn[i] = rn[i] || [], rn[i].unshift(e)
            },
            prefilter: function(t, e) {
                e ? sn.unshift(t) : sn.push(t)
            }
        }), ue.Tween = W, W.prototype = {
            constructor: W,
            init: function(t, e, i, n, s, r) {
                this.elem = t, this.prop = i, this.easing = s || "swing", this.options = e, this.start = this.now = this.cur(), this.end = n, this.unit = r || (ue.cssNumber[i] ? "" : "px")
            },
            cur: function() {
                var t = W.propHooks[this.prop];
                return t && t.get ? t.get(this) : W.propHooks._default.get(this)
            },
            run: function(t) {
                var e, i = W.propHooks[this.prop];
                return this.pos = e = this.options.duration ? ue.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : W.propHooks._default.set(this), this
            }
        }, W.prototype.init.prototype = W.prototype, W.propHooks = {
            _default: {
                get: function(t) {
                    var e;
                    return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = ue.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
                },
                set: function(t) {
                    ue.fx.step[t.prop] ? ue.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[ue.cssProps[t.prop]] || ue.cssHooks[t.prop]) ? ue.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
                }
            }
        }, W.propHooks.scrollTop = W.propHooks.scrollLeft = {
            set: function(t) {
                t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
            }
        }, ue.each(["toggle", "show", "hide"], function(t, e) {
            var i = ue.fn[e];
            ue.fn[e] = function(t, n, s) {
                return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(Q(e, !0), t, n, s)
            }
        }), ue.fn.extend({
            fadeTo: function(t, e, i, n) {
                return this.filter(C).css("opacity", 0).show().end().animate({
                    opacity: e
                }, t, i, n)
            },
            animate: function(t, e, i, n) {
                var s = ue.isEmptyObject(t),
                    r = ue.speed(e, i, n),
                    o = function() {
                        var e = R(this, ue.extend({}, t), r);
                        (s || ue._data(this, "finish")) && e.stop(!0)
                    };
                return o.finish = o, s || r.queue === !1 ? this.each(o) : this.queue(r.queue, o)
            },
            stop: function(t, i, n) {
                var s = function(t) {
                    var e = t.stop;
                    delete t.stop, e(n)
                };
                return "string" != typeof t && (n = i, i = t, t = e), i && t !== !1 && this.queue(t || "fx", []), this.each(function() {
                    var e = !0,
                        i = null != t && t + "queueHooks",
                        r = ue.timers,
                        o = ue._data(this);
                    if (i) o[i] && o[i].stop && s(o[i]);
                    else
                        for (i in o) o[i] && o[i].stop && nn.test(i) && s(o[i]);
                    for (i = r.length; i--;) r[i].elem !== this || null != t && r[i].queue !== t || (r[i].anim.stop(n), e = !1, r.splice(i, 1));
                    (e || !n) && ue.dequeue(this, t)
                })
            },
            finish: function(t) {
                return t !== !1 && (t = t || "fx"), this.each(function() {
                    var e, i = ue._data(this),
                        n = i[t + "queue"],
                        s = i[t + "queueHooks"],
                        r = ue.timers,
                        o = n ? n.length : 0;
                    for (i.finish = !0, ue.queue(this, t, []), s && s.stop && s.stop.call(this, !0), e = r.length; e--;) r[e].elem === this && r[e].queue === t && (r[e].anim.stop(!0), r.splice(e, 1));
                    for (e = 0; o > e; e++) n[e] && n[e].finish && n[e].finish.call(this);
                    delete i.finish
                })
            }
        }), ue.each({
            slideDown: Q("show"),
            slideUp: Q("hide"),
            slideToggle: Q("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(t, e) {
            ue.fn[t] = function(t, i, n) {
                return this.animate(e, t, i, n)
            }
        }), ue.speed = function(t, e, i) {
            var n = t && "object" == typeof t ? ue.extend({}, t) : {
                complete: i || !i && e || ue.isFunction(t) && t,
                duration: t,
                easing: i && e || e && !ue.isFunction(e) && e
            };
            return n.duration = ue.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in ue.fx.speeds ? ue.fx.speeds[n.duration] : ue.fx.speeds._default, (null == n.queue || n.queue === !0) && (n.queue = "fx"), n.old = n.complete, n.complete = function() {
                ue.isFunction(n.old) && n.old.call(this), n.queue && ue.dequeue(this, n.queue)
            }, n
        }, ue.easing = {
            linear: function(t) {
                return t
            },
            swing: function(t) {
                return .5 - Math.cos(t * Math.PI) / 2
            }
        }, ue.timers = [], ue.fx = W.prototype.init, ue.fx.tick = function() {
            var t, i = ue.timers,
                n = 0;
            for (Ji = ue.now(); n < i.length; n++) t = i[n], t() || i[n] !== t || i.splice(n--, 1);
            i.length || ue.fx.stop(), Ji = e
        }, ue.fx.timer = function(t) {
            t() && ue.timers.push(t) && ue.fx.start()
        }, ue.fx.interval = 13, ue.fx.start = function() {
            Zi || (Zi = setInterval(ue.fx.tick, ue.fx.interval))
        }, ue.fx.stop = function() {
            clearInterval(Zi), Zi = null
        }, ue.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, ue.fx.step = {}, ue.expr && ue.expr.filters && (ue.expr.filters.animated = function(t) {
            return ue.grep(ue.timers, function(e) {
                return t === e.elem
            }).length
        }), ue.fn.offset = function(t) {
            if (arguments.length) return t === e ? this : this.each(function(e) {
                ue.offset.setOffset(this, t, e)
            });
            var i, n, s = {
                    top: 0,
                    left: 0
                },
                r = this[0],
                o = r && r.ownerDocument;
            if (o) return i = o.documentElement, ue.contains(i, r) ? (typeof r.getBoundingClientRect !== V && (s = r.getBoundingClientRect()), n = q(o), {
                top: s.top + (n.pageYOffset || i.scrollTop) - (i.clientTop || 0),
                left: s.left + (n.pageXOffset || i.scrollLeft) - (i.clientLeft || 0)
            }) : s
        }, ue.offset = {
            setOffset: function(t, e, i) {
                var n = ue.css(t, "position");
                "static" === n && (t.style.position = "relative");
                var s, r, o = ue(t),
                    a = o.offset(),
                    l = ue.css(t, "top"),
                    c = ue.css(t, "left"),
                    u = ("absolute" === n || "fixed" === n) && ue.inArray("auto", [l, c]) > -1,
                    h = {},
                    d = {};
                u ? (d = o.position(), s = d.top, r = d.left) : (s = parseFloat(l) || 0, r = parseFloat(c) || 0), ue.isFunction(e) && (e = e.call(t, i, a)), null != e.top && (h.top = e.top - a.top + s), null != e.left && (h.left = e.left - a.left + r), "using" in e ? e.using.call(t, h) : o.css(h)
            }
        }, ue.fn.extend({
            position: function() {
                if (this[0]) {
                    var t, e, i = {
                            top: 0,
                            left: 0
                        },
                        n = this[0];
                    return "fixed" === ue.css(n, "position") ? e = n.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), ue.nodeName(t[0], "html") || (i = t.offset()), i.top += ue.css(t[0], "borderTopWidth", !0), i.left += ue.css(t[0], "borderLeftWidth", !0)), {
                        top: e.top - i.top - ue.css(n, "marginTop", !0),
                        left: e.left - i.left - ue.css(n, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var t = this.offsetParent || G; t && !ue.nodeName(t, "html") && "static" === ue.css(t, "position");) t = t.offsetParent;
                    return t || G
                })
            }
        }), ue.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(t, i) {
            var n = /Y/.test(i);
            ue.fn[t] = function(s) {
                return ue.access(this, function(t, s, r) {
                    var o = q(t);
                    return r === e ? o ? i in o ? o[i] : o.document.documentElement[s] : t[s] : (o ? o.scrollTo(n ? ue(o).scrollLeft() : r, n ? r : ue(o).scrollTop()) : t[s] = r, void 0)
                }, t, s, arguments.length, null)
            }
        }), ue.each({
            Height: "height",
            Width: "width"
        }, function(t, i) {
            ue.each({
                padding: "inner" + t,
                content: i,
                "": "outer" + t
            }, function(n, s) {
                ue.fn[s] = function(s, r) {
                    var o = arguments.length && (n || "boolean" != typeof s),
                        a = n || (s === !0 || r === !0 ? "margin" : "border");
                    return ue.access(this, function(i, n, s) {
                        var r;
                        return ue.isWindow(i) ? i.document.documentElement["client" + t] : 9 === i.nodeType ? (r = i.documentElement, Math.max(i.body["scroll" + t], r["scroll" + t], i.body["offset" + t], r["offset" + t], r["client" + t])) : s === e ? ue.css(i, n, a) : ue.style(i, n, s, a)
                    }, i, o ? s : e, o, null)
                }
            })
        }), ue.fn.size = function() {
            return this.length
        }, ue.fn.andSelf = ue.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = ue : (t.jQuery = t.$ = ue, "function" == typeof define && define.amd && define("jquery", [], function() {
            return ue
        }))
    }(window),
    function(t, e) {
        t.rails !== e && t.error("jquery-ujs has already been loaded!");
        var i, n = t(document);
        t.rails = i = {
            linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
            buttonClickSelector: "button[data-remote]",
            inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
            formSubmitSelector: "form",
            formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
            disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
            enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
            requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
            fileInputSelector: "input[type=file]",
            linkDisableSelector: "a[data-disable-with]",
            CSRFProtection: function(e) {
                var i = t('meta[name="csrf-token"]').attr("content");
                i && e.setRequestHeader("X-CSRF-Token", i)
            },
            fire: function(e, i, n) {
                var s = t.Event(i);
                return e.trigger(s, n), s.result !== !1
            },
            confirm: function(t) {
                return confirm(t)
            },
            ajax: function(e) {
                return t.ajax(e)
            },
            href: function(t) {
                return t.attr("href")
            },
            handleRemote: function(n) {
                var s, r, o, a, l, c, u, h;
                if (i.fire(n, "ajax:before")) {
                    if (a = n.data("cross-domain"), l = a === e ? null : a, c = n.data("with-credentials") || null, u = n.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, n.is("form")) {
                        s = n.attr("method"), r = n.attr("action"), o = n.serializeArray();
                        var d = n.data("ujs:submit-button");
                        d && (o.push(d), n.data("ujs:submit-button", null))
                    } else n.is(i.inputChangeSelector) ? (s = n.data("method"), r = n.data("url"), o = n.serialize(), n.data("params") && (o = o + "&" + n.data("params"))) : n.is(i.buttonClickSelector) ? (s = n.data("method") || "get", r = n.data("url"), o = n.serialize(), n.data("params") && (o = o + "&" + n.data("params"))) : (s = n.data("method"), r = i.href(n), o = n.data("params") || null);
                    h = {
                        type: s || "GET",
                        data: o,
                        dataType: u,
                        beforeSend: function(t, s) {
                            return s.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + s.accepts.script), i.fire(n, "ajax:beforeSend", [t, s])
                        },
                        success: function(t, e, i) {
                            n.trigger("ajax:success", [t, e, i])
                        },
                        complete: function(t, e) {
                            n.trigger("ajax:complete", [t, e])
                        },
                        error: function(t, e, i) {
                            n.trigger("ajax:error", [t, e, i])
                        },
                        crossDomain: l
                    }, c && (h.xhrFields = {
                        withCredentials: c
                    }), r && (h.url = r);
                    var p = i.ajax(h);
                    return n.trigger("ajax:send", p), p
                }
                return !1
            },
            handleMethod: function(n) {
                var s = i.href(n),
                    r = n.data("method"),
                    o = n.attr("target"),
                    a = t("meta[name=csrf-token]").attr("content"),
                    l = t("meta[name=csrf-param]").attr("content"),
                    c = t('<form method="post" action="' + s + '"></form>'),
                    u = '<input name="_method" value="' + r + '" type="hidden" />';
                l !== e && a !== e && (u += '<input name="' + l + '" value="' + a + '" type="hidden" />'), o && c.attr("target", o), c.hide().append(u).appendTo("body"), c.submit()
            },
            disableFormElements: function(e) {
                e.find(i.disableSelector).each(function() {
                    var e = t(this),
                        i = e.is("button") ? "html" : "val";
                    e.data("ujs:enable-with", e[i]()), e[i](e.data("disable-with")), e.prop("disabled", !0)
                })
            },
            enableFormElements: function(e) {
                e.find(i.enableSelector).each(function() {
                    var e = t(this),
                        i = e.is("button") ? "html" : "val";
                    e.data("ujs:enable-with") && e[i](e.data("ujs:enable-with")), e.prop("disabled", !1)
                })
            },
            allowAction: function(t) {
                var e, n = t.data("confirm"),
                    s = !1;
                return n ? (i.fire(t, "confirm") && (s = i.confirm(n), e = i.fire(t, "confirm:complete", [s])), s && e) : !0
            },
            blankInputs: function(e, i, n) {
                var s, r, o = t(),
                    a = i || "input,textarea",
                    l = e.find(a);
                return l.each(function() {
                    if (s = t(this), r = s.is("input[type=checkbox],input[type=radio]") ? s.is(":checked") : s.val(), !r == !n) {
                        if (s.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + s.attr("name") + '"]').length) return !0;
                        o = o.add(s)
                    }
                }), o.length ? o : !1
            },
            nonBlankInputs: function(t, e) {
                return i.blankInputs(t, e, !0)
            },
            stopEverything: function(e) {
                return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
            },
            disableElement: function(t) {
                t.data("ujs:enable-with", t.html()), t.html(t.data("disable-with")), t.bind("click.railsDisable", function(t) {
                    return i.stopEverything(t)
                })
            },
            enableElement: function(t) {
                t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.unbind("click.railsDisable")
            }
        }, i.fire(n, "rails:attachBindings") && (t.ajaxPrefilter(function(t, e, n) {
            t.crossDomain || i.CSRFProtection(n)
        }), n.delegate(i.linkDisableSelector, "ajax:complete", function() {
            i.enableElement(t(this))
        }), n.delegate(i.linkClickSelector, "click.rails", function(n) {
            var s = t(this),
                r = s.data("method"),
                o = s.data("params");
            if (!i.allowAction(s)) return i.stopEverything(n);
            if (s.is(i.linkDisableSelector) && i.disableElement(s), s.data("remote") !== e) {
                if (!(!n.metaKey && !n.ctrlKey || r && "GET" !== r || o)) return !0;
                var a = i.handleRemote(s);
                return a === !1 ? i.enableElement(s) : a.error(function() {
                    i.enableElement(s)
                }), !1
            }
            return s.data("method") ? (i.handleMethod(s), !1) : void 0
        }), n.delegate(i.buttonClickSelector, "click.rails", function(e) {
            var n = t(this);
            return i.allowAction(n) ? (i.handleRemote(n), !1) : i.stopEverything(e)
        }), n.delegate(i.inputChangeSelector, "change.rails", function(e) {
            var n = t(this);
            return i.allowAction(n) ? (i.handleRemote(n), !1) : i.stopEverything(e)
        }), n.delegate(i.formSubmitSelector, "submit.rails", function(n) {
            var s = t(this),
                r = s.data("remote") !== e,
                o = i.blankInputs(s, i.requiredInputSelector),
                a = i.nonBlankInputs(s, i.fileInputSelector);
            if (!i.allowAction(s)) return i.stopEverything(n);
            if (o && s.attr("novalidate") == e && i.fire(s, "ajax:aborted:required", [o])) return i.stopEverything(n);
            if (r) {
                if (a) {
                    setTimeout(function() {
                        i.disableFormElements(s)
                    }, 13);
                    var l = i.fire(s, "ajax:aborted:file", [a]);
                    return l || setTimeout(function() {
                        i.enableFormElements(s)
                    }, 13), l
                }
                return i.handleRemote(s), !1
            }
            setTimeout(function() {
                i.disableFormElements(s)
            }, 13)
        }), n.delegate(i.formInputClickSelector, "click.rails", function(e) {
            var n = t(this);
            if (!i.allowAction(n)) return i.stopEverything(e);
            var s = n.attr("name"),
                r = s ? {
                    name: s,
                    value: n.val()
                } : null;
            n.closest("form").data("ujs:submit-button", r)
        }), n.delegate(i.formSubmitSelector, "ajax:beforeSend.rails", function(e) {
            this == e.target && i.disableFormElements(t(this))
        }), n.delegate(i.formSubmitSelector, "ajax:complete.rails", function(e) {
            this == e.target && i.enableFormElements(t(this))
        }), t(function() {
            var e = t("meta[name=csrf-token]").attr("content"),
                i = t("meta[name=csrf-param]").attr("content");
            t('form input[name="' + i + '"]').val(e)
        }))
    }(jQuery),
    function(t, e) {
        function i(e, i) {
            var s, r, o, a = e.nodeName.toLowerCase();
            return "area" === a ? (s = e.parentNode, r = s.name, e.href && r && "map" === s.nodeName.toLowerCase() ? (o = t("img[usemap=#" + r + "]")[0], !!o && n(o)) : !1) : (/input|select|textarea|button|object/.test(a) ? !e.disabled : "a" === a ? e.href || i : i) && n(e)
        }

        function n(e) {
            return t.expr.filters.visible(e) && !t(e).parents().addBack().filter(function() {
                return "hidden" === t.css(this, "visibility")
            }).length
        }
        var s = 0,
            r = /^ui-id-\d+$/;
        t.ui = t.ui || {}, t.extend(t.ui, {
            version: "1.10.3",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        }), t.fn.extend({
            focus: function(e) {
                return function(i, n) {
                    return "number" == typeof i ? this.each(function() {
                        var e = this;
                        setTimeout(function() {
                            t(e).focus(), n && n.call(e)
                        }, i)
                    }) : e.apply(this, arguments)
                }
            }(t.fn.focus),
            scrollParent: function() {
                var e;
                return e = t.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                    return /(relative|absolute|fixed)/.test(t.css(this, "position")) && /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
                }).eq(0) : this.parents().filter(function() {
                    return /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
                }).eq(0), /fixed/.test(this.css("position")) || !e.length ? t(document) : e
            },
            zIndex: function(i) {
                if (i !== e) return this.css("zIndex", i);
                if (this.length)
                    for (var n, s, r = t(this[0]); r.length && r[0] !== document;) {
                        if (n = r.css("position"), ("absolute" === n || "relative" === n || "fixed" === n) && (s = parseInt(r.css("zIndex"), 10), !isNaN(s) && 0 !== s)) return s;
                        r = r.parent()
                    }
                return 0
            },
            uniqueId: function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++s)
                })
            },
            removeUniqueId: function() {
                return this.each(function() {
                    r.test(this.id) && t(this).removeAttr("id")
                })
            }
        }), t.extend(t.expr[":"], {
            data: t.expr.createPseudo ? t.expr.createPseudo(function(e) {
                return function(i) {
                    return !!t.data(i, e)
                }
            }) : function(e, i, n) {
                return !!t.data(e, n[3])
            },
            focusable: function(e) {
                return i(e, !isNaN(t.attr(e, "tabindex")))
            },
            tabbable: function(e) {
                var n = t.attr(e, "tabindex"),
                    s = isNaN(n);
                return (s || n >= 0) && i(e, !s)
            }
        }), t("<a>").outerWidth(1).jquery || t.each(["Width", "Height"], function(i, n) {
            function s(e, i, n, s) {
                return t.each(r, function() {
                    i -= parseFloat(t.css(e, "padding" + this)) || 0, n && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), s && (i -= parseFloat(t.css(e, "margin" + this)) || 0)
                }), i
            }
            var r = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"],
                o = n.toLowerCase(),
                a = {
                    innerWidth: t.fn.innerWidth,
                    innerHeight: t.fn.innerHeight,
                    outerWidth: t.fn.outerWidth,
                    outerHeight: t.fn.outerHeight
                };
            t.fn["inner" + n] = function(i) {
                return i === e ? a["inner" + n].call(this) : this.each(function() {
                    t(this).css(o, s(this, i) + "px")
                })
            }, t.fn["outer" + n] = function(e, i) {
                return "number" != typeof e ? a["outer" + n].call(this, e) : this.each(function() {
                    t(this).css(o, s(this, e, !0, i) + "px")
                })
            }
        }), t.fn.addBack || (t.fn.addBack = function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }), t("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (t.fn.removeData = function(e) {
            return function(i) {
                return arguments.length ? e.call(this, t.camelCase(i)) : e.call(this)
            }
        }(t.fn.removeData)), t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), t.support.selectstart = "onselectstart" in document.createElement("div"), t.fn.extend({
            disableSelection: function() {
                return this.bind((t.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(t) {
                    t.preventDefault()
                })
            },
            enableSelection: function() {
                return this.unbind(".ui-disableSelection")
            }
        }), t.extend(t.ui, {
            plugin: {
                add: function(e, i, n) {
                    var s, r = t.ui[e].prototype;
                    for (s in n) r.plugins[s] = r.plugins[s] || [], r.plugins[s].push([i, n[s]])
                },
                call: function(t, e, i) {
                    var n, s = t.plugins[e];
                    if (s && t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType)
                        for (n = 0; n < s.length; n++) t.options[s[n][0]] && s[n][1].apply(t.element, i)
                }
            },
            hasScroll: function(e, i) {
                if ("hidden" === t(e).css("overflow")) return !1;
                var n = i && "left" === i ? "scrollLeft" : "scrollTop",
                    s = !1;
                return e[n] > 0 ? !0 : (e[n] = 1, s = e[n] > 0, e[n] = 0, s)
            }
        })
    }(jQuery),
    function(t, e) {
        var i = 0,
            n = Array.prototype.slice,
            s = t.cleanData;
        t.cleanData = function(e) {
            for (var i, n = 0; null != (i = e[n]); n++) try {
                t(i).triggerHandler("remove")
            } catch (r) {}
            s(e)
        }, t.widget = function(e, i, n) {
            var s, r, o, a, l = {},
                c = e.split(".")[0];
            e = e.split(".")[1], s = c + "-" + e, n || (n = i, i = t.Widget), t.expr[":"][s.toLowerCase()] = function(e) {
                return !!t.data(e, s)
            }, t[c] = t[c] || {}, r = t[c][e], o = t[c][e] = function(t, e) {
                return this._createWidget ? (arguments.length && this._createWidget(t, e), void 0) : new o(t, e)
            }, t.extend(o, r, {
                version: n.version,
                _proto: t.extend({}, n),
                _childConstructors: []
            }), a = new i, a.options = t.widget.extend({}, a.options), t.each(n, function(e, n) {
                return t.isFunction(n) ? (l[e] = function() {
                    var t = function() {
                            return i.prototype[e].apply(this, arguments)
                        },
                        s = function(t) {
                            return i.prototype[e].apply(this, t)
                        };
                    return function() {
                        var e, i = this._super,
                            r = this._superApply;
                        return this._super = t, this._superApply = s, e = n.apply(this, arguments), this._super = i, this._superApply = r, e
                    }
                }(), void 0) : (l[e] = n, void 0)
            }), o.prototype = t.widget.extend(a, {
                widgetEventPrefix: r ? a.widgetEventPrefix : e
            }, l, {
                constructor: o,
                namespace: c,
                widgetName: e,
                widgetFullName: s
            }), r ? (t.each(r._childConstructors, function(e, i) {
                var n = i.prototype;
                t.widget(n.namespace + "." + n.widgetName, o, i._proto)
            }), delete r._childConstructors) : i._childConstructors.push(o), t.widget.bridge(e, o)
        }, t.widget.extend = function(i) {
            for (var s, r, o = n.call(arguments, 1), a = 0, l = o.length; l > a; a++)
                for (s in o[a]) r = o[a][s], o[a].hasOwnProperty(s) && r !== e && (i[s] = t.isPlainObject(r) ? t.isPlainObject(i[s]) ? t.widget.extend({}, i[s], r) : t.widget.extend({}, r) : r);
            return i
        }, t.widget.bridge = function(i, s) {
            var r = s.prototype.widgetFullName || i;
            t.fn[i] = function(o) {
                var a = "string" == typeof o,
                    l = n.call(arguments, 1),
                    c = this;
                return o = !a && l.length ? t.widget.extend.apply(null, [o].concat(l)) : o, a ? this.each(function() {
                    var n, s = t.data(this, r);
                    return s ? t.isFunction(s[o]) && "_" !== o.charAt(0) ? (n = s[o].apply(s, l), n !== s && n !== e ? (c = n && n.jquery ? c.pushStack(n.get()) : n, !1) : void 0) : t.error("no such method '" + o + "' for " + i + " widget instance") : t.error("cannot call methods on " + i + " prior to initialization; " + "attempted to call method '" + o + "'")
                }) : this.each(function() {
                    var e = t.data(this, r);
                    e ? e.option(o || {})._init() : t.data(this, r, new s(o, this))
                }), c
            }
        }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: !1,
                create: null
            },
            _createWidget: function(e, n) {
                n = t(n || this.defaultElement || this)[0], this.element = t(n), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this.bindings = t(), this.hoverable = t(), this.focusable = t(), n !== this && (t.data(n, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(t) {
                        t.target === n && this.destroy()
                    }
                }), this.document = t(n.style ? n.ownerDocument : n.document || n), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: t.noop,
            _getCreateEventData: t.noop,
            _create: t.noop,
            _init: t.noop,
            destroy: function() {
                this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
            },
            _destroy: t.noop,
            widget: function() {
                return this.element
            },
            option: function(i, n) {
                var s, r, o, a = i;
                if (0 === arguments.length) return t.widget.extend({}, this.options);
                if ("string" == typeof i)
                    if (a = {}, s = i.split("."), i = s.shift(), s.length) {
                        for (r = a[i] = t.widget.extend({}, this.options[i]), o = 0; o < s.length - 1; o++) r[s[o]] = r[s[o]] || {}, r = r[s[o]];
                        if (i = s.pop(), n === e) return r[i] === e ? null : r[i];
                        r[i] = n
                    } else {
                        if (n === e) return this.options[i] === e ? null : this.options[i];
                        a[i] = n
                    }
                return this._setOptions(a), this
            },
            _setOptions: function(t) {
                var e;
                for (e in t) this._setOption(e, t[e]);
                return this
            },
            _setOption: function(t, e) {
                return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!e).attr("aria-disabled", e), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
            },
            enable: function() {
                return this._setOption("disabled", !1)
            },
            disable: function() {
                return this._setOption("disabled", !0)
            },
            _on: function(e, i, n) {
                var s, r = this;
                "boolean" != typeof e && (n = i, i = e, e = !1), n ? (i = s = t(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, s = this.widget()), t.each(n, function(n, o) {
                    function a() {
                        return e || r.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? r[o] : o).apply(r, arguments) : void 0
                    }
                    "string" != typeof o && (a.guid = o.guid = o.guid || a.guid || t.guid++);
                    var l = n.match(/^(\w+)\s*(.*)$/),
                        c = l[1] + r.eventNamespace,
                        u = l[2];
                    u ? s.delegate(u, c, a) : i.bind(c, a)
                })
            },
            _off: function(t, e) {
                e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(e).undelegate(e)
            },
            _delay: function(t, e) {
                function i() {
                    return ("string" == typeof t ? n[t] : t).apply(n, arguments)
                }
                var n = this;
                return setTimeout(i, e || 0)
            },
            _hoverable: function(e) {
                this.hoverable = this.hoverable.add(e), this._on(e, {
                    mouseenter: function(e) {
                        t(e.currentTarget).addClass("ui-state-hover")
                    },
                    mouseleave: function(e) {
                        t(e.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function(e) {
                this.focusable = this.focusable.add(e), this._on(e, {
                    focusin: function(e) {
                        t(e.currentTarget).addClass("ui-state-focus")
                    },
                    focusout: function(e) {
                        t(e.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function(e, i, n) {
                var s, r, o = this.options[e];
                if (n = n || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], r = i.originalEvent)
                    for (s in r) s in i || (i[s] = r[s]);
                return this.element.trigger(i, n), !(t.isFunction(o) && o.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented())
            }
        }, t.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(e, i) {
            t.Widget.prototype["_" + e] = function(n, s, r) {
                "string" == typeof s && (s = {
                    effect: s
                });
                var o, a = s ? s === !0 || "number" == typeof s ? i : s.effect || i : e;
                s = s || {}, "number" == typeof s && (s = {
                    duration: s
                }), o = !t.isEmptyObject(s), s.complete = r, s.delay && n.delay(s.delay), o && t.effects && t.effects.effect[a] ? n[e](s) : a !== e && n[a] ? n[a](s.duration, s.easing, r) : n.queue(function(i) {
                    t(this)[e](), r && r.call(n[0]), i()
                })
            }
        })
    }(jQuery),
    function(t) {
        var e = 0,
            i = {},
            n = {};
        i.height = i.paddingTop = i.paddingBottom = i.borderTopWidth = i.borderBottomWidth = "hide", n.height = n.paddingTop = n.paddingBottom = n.borderTopWidth = n.borderBottomWidth = "show", t.widget("ui.accordion", {
            version: "1.10.3",
            options: {
                active: 0,
                animate: {},
                collapsible: !1,
                event: "click",
                header: "> li > :first-child,> :not(li):even",
                heightStyle: "auto",
                icons: {
                    activeHeader: "ui-icon-triangle-1-s",
                    header: "ui-icon-triangle-1-e"
                },
                activate: null,
                beforeActivate: null
            },
            _create: function() {
                var e = this.options;
                this.prevShow = this.prevHide = t(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), e.collapsible || e.active !== !1 && null != e.active || (e.active = 0), this._processPanels(), e.active < 0 && (e.active += this.headers.length), this._refresh()
            },
            _getCreateEventData: function() {
                return {
                    header: this.active,
                    panel: this.active.length ? this.active.next() : t(),
                    content: this.active.length ? this.active.next() : t()
                }
            },
            _createIcons: function() {
                var e = this.options.icons;
                e && (t("<span>").addClass("ui-accordion-header-icon ui-icon " + e.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(e.header).addClass(e.activeHeader), this.headers.addClass("ui-accordion-icons"))
            },
            _destroyIcons: function() {
                this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
            },
            _destroy: function() {
                var t;
                this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function() {
                    /^ui-accordion/.test(this.id) && this.removeAttribute("id")
                }), this._destroyIcons(), t = this.headers.next().css("display", "").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function() {
                    /^ui-accordion/.test(this.id) && this.removeAttribute("id")
                }), "content" !== this.options.heightStyle && t.css("height", "")
            },
            _setOption: function(t, e) {
                return "active" === t ? (this._activate(e), void 0) : ("event" === t && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(e)), this._super(t, e), "collapsible" !== t || e || this.options.active !== !1 || this._activate(0), "icons" === t && (this._destroyIcons(), e && this._createIcons()), "disabled" === t && this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!e), void 0)
            },
            _keydown: function(e) {
                if (!e.altKey && !e.ctrlKey) {
                    var i = t.ui.keyCode,
                        n = this.headers.length,
                        s = this.headers.index(e.target),
                        r = !1;
                    switch (e.keyCode) {
                        case i.RIGHT:
                        case i.DOWN:
                            r = this.headers[(s + 1) % n];
                            break;
                        case i.LEFT:
                        case i.UP:
                            r = this.headers[(s - 1 + n) % n];
                            break;
                        case i.SPACE:
                        case i.ENTER:
                            this._eventHandler(e);
                            break;
                        case i.HOME:
                            r = this.headers[0];
                            break;
                        case i.END:
                            r = this.headers[n - 1]
                    }
                    r && (t(e.target).attr("tabIndex", -1), t(r).attr("tabIndex", 0), r.focus(), e.preventDefault())
                }
            },
            _panelKeyDown: function(e) {
                e.keyCode === t.ui.keyCode.UP && e.ctrlKey && t(e.currentTarget).prev().focus()
            },
            refresh: function() {
                var e = this.options;
                this._processPanels(), e.active === !1 && e.collapsible === !0 || !this.headers.length ? (e.active = !1, this.active = t()) : e.active === !1 ? this._activate(0) : this.active.length && !t.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (e.active = !1, this.active = t()) : this._activate(Math.max(0, e.active - 1)) : e.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
            },
            _processPanels: function() {
                this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"), this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()
            },
            _refresh: function() {
                var i, n = this.options,
                    s = n.heightStyle,
                    r = this.element.parent(),
                    o = this.accordionId = "ui-accordion-" + (this.element.attr("id") || ++e);
                this.active = this._findActive(n.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function(e) {
                    var i = t(this),
                        n = i.attr("id"),
                        s = i.next(),
                        r = s.attr("id");
                    n || (n = o + "-header-" + e, i.attr("id", n)), r || (r = o + "-panel-" + e, s.attr("id", r)), i.attr("aria-controls", r), s.attr("aria-labelledby", n)
                }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
                    "aria-selected": "false",
                    tabIndex: -1
                }).next().attr({
                    "aria-expanded": "false",
                    "aria-hidden": "true"
                }).hide(), this.active.length ? this.active.attr({
                    "aria-selected": "true",
                    tabIndex: 0
                }).next().attr({
                    "aria-expanded": "true",
                    "aria-hidden": "false"
                }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(n.event), "fill" === s ? (i = r.height(), this.element.siblings(":visible").each(function() {
                    var e = t(this),
                        n = e.css("position");
                    "absolute" !== n && "fixed" !== n && (i -= e.outerHeight(!0))
                }), this.headers.each(function() {
                    i -= t(this).outerHeight(!0)
                }), this.headers.next().each(function() {
                    t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()))
                }).css("overflow", "auto")) : "auto" === s && (i = 0, this.headers.next().each(function() {
                    i = Math.max(i, t(this).css("height", "").height())
                }).height(i))
            },
            _activate: function(e) {
                var i = this._findActive(e)[0];
                i !== this.active[0] && (i = i || this.active[0], this._eventHandler({
                    target: i,
                    currentTarget: i,
                    preventDefault: t.noop
                }))
            },
            _findActive: function(e) {
                return "number" == typeof e ? this.headers.eq(e) : t()
            },
            _setupEvents: function(e) {
                var i = {
                    keydown: "_keydown"
                };
                e && t.each(e.split(" "), function(t, e) {
                    i[e] = "_eventHandler"
                }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, i), this._on(this.headers.next(), {
                    keydown: "_panelKeyDown"
                }), this._hoverable(this.headers), this._focusable(this.headers)
            },
            _eventHandler: function(e) {
                var i = this.options,
                    n = this.active,
                    s = t(e.currentTarget),
                    r = s[0] === n[0],
                    o = r && i.collapsible,
                    a = o ? t() : s.next(),
                    l = n.next(),
                    c = {
                        oldHeader: n,
                        oldPanel: l,
                        newHeader: o ? t() : s,
                        newPanel: a
                    };
                e.preventDefault(), r && !i.collapsible || this._trigger("beforeActivate", e, c) === !1 || (i.active = o ? !1 : this.headers.index(s), this.active = r ? t() : s, this._toggle(c), n.removeClass("ui-accordion-header-active ui-state-active"), i.icons && n.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header), r || (s.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), i.icons && s.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader), s.next().addClass("ui-accordion-content-active")))
            },
            _toggle: function(e) {
                var i = e.newPanel,
                    n = this.prevShow.length ? this.prevShow : e.oldPanel;
                this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = i, this.prevHide = n, this.options.animate ? this._animate(i, n, e) : (n.hide(), i.show(), this._toggleComplete(e)), n.attr({
                    "aria-expanded": "false",
                    "aria-hidden": "true"
                }), n.prev().attr("aria-selected", "false"), i.length && n.length ? n.prev().attr("tabIndex", -1) : i.length && this.headers.filter(function() {
                    return 0 === t(this).attr("tabIndex")
                }).attr("tabIndex", -1), i.attr({
                    "aria-expanded": "true",
                    "aria-hidden": "false"
                }).prev().attr({
                    "aria-selected": "true",
                    tabIndex: 0
                })
            },
            _animate: function(t, e, s) {
                var r, o, a, l = this,
                    c = 0,
                    u = t.length && (!e.length || t.index() < e.index()),
                    h = this.options.animate || {},
                    d = u && h.down || h,
                    p = function() {
                        l._toggleComplete(s)
                    };
                return "number" == typeof d && (a = d), "string" == typeof d && (o = d), o = o || d.easing || h.easing, a = a || d.duration || h.duration, e.length ? t.length ? (r = t.show().outerHeight(), e.animate(i, {
                    duration: a,
                    easing: o,
                    step: function(t, e) {
                        e.now = Math.round(t)
                    }
                }), t.hide().animate(n, {
                    duration: a,
                    easing: o,
                    complete: p,
                    step: function(t, i) {
                        i.now = Math.round(t), "height" !== i.prop ? c += i.now : "content" !== l.options.heightStyle && (i.now = Math.round(r - e.outerHeight() - c), c = 0)
                    }
                }), void 0) : e.animate(i, a, o, p) : t.animate(n, a, o, p)
            },
            _toggleComplete: function(t) {
                var e = t.oldPanel;
                e.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), e.length && (e.parent()[0].className = e.parent()[0].className), this._trigger("activate", null, t)
            }
        })
    }(jQuery),
    function(t, e) {
        function i(t, e, i) {
            return [parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)]
        }

        function n(e, i) {
            return parseInt(t.css(e, i), 10) || 0
        }

        function s(e) {
            var i = e[0];
            return 9 === i.nodeType ? {
                width: e.width(),
                height: e.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            } : t.isWindow(i) ? {
                width: e.width(),
                height: e.height(),
                offset: {
                    top: e.scrollTop(),
                    left: e.scrollLeft()
                }
            } : i.preventDefault ? {
                width: 0,
                height: 0,
                offset: {
                    top: i.pageY,
                    left: i.pageX
                }
            } : {
                width: e.outerWidth(),
                height: e.outerHeight(),
                offset: e.offset()
            }
        }
        t.ui = t.ui || {};
        var r, o = Math.max,
            a = Math.abs,
            l = Math.round,
            c = /left|center|right/,
            u = /top|center|bottom/,
            h = /[\+\-]\d+(\.[\d]+)?%?/,
            d = /^\w+/,
            p = /%$/,
            f = t.fn.position;
        t.position = {
                scrollbarWidth: function() {
                    if (r !== e) return r;
                    var i, n, s = t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                        o = s.children()[0];
                    return t("body").append(s), i = o.offsetWidth, s.css("overflow", "scroll"), n = o.offsetWidth, i === n && (n = s[0].clientWidth), s.remove(), r = i - n
                },
                getScrollInfo: function(e) {
                    var i = e.isWindow ? "" : e.element.css("overflow-x"),
                        n = e.isWindow ? "" : e.element.css("overflow-y"),
                        s = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth,
                        r = "scroll" === n || "auto" === n && e.height < e.element[0].scrollHeight;
                    return {
                        width: r ? t.position.scrollbarWidth() : 0,
                        height: s ? t.position.scrollbarWidth() : 0
                    }
                },
                getWithinInfo: function(e) {
                    var i = t(e || window),
                        n = t.isWindow(i[0]);
                    return {
                        element: i,
                        isWindow: n,
                        offset: i.offset() || {
                            left: 0,
                            top: 0
                        },
                        scrollLeft: i.scrollLeft(),
                        scrollTop: i.scrollTop(),
                        width: n ? i.width() : i.outerWidth(),
                        height: n ? i.height() : i.outerHeight()
                    }
                }
            }, t.fn.position = function(e) {
                if (!e || !e.of) return f.apply(this, arguments);
                e = t.extend({}, e);
                var r, p, m, g, v, y, b = t(e.of),
                    w = t.position.getWithinInfo(e.within),
                    _ = t.position.getScrollInfo(w),
                    x = (e.collision || "flip").split(" "),
                    C = {};
                return y = s(b), b[0].preventDefault && (e.at = "left top"), p = y.width, m = y.height, g = y.offset, v = t.extend({}, g), t.each(["my", "at"], function() {
                    var t, i, n = (e[this] || "").split(" ");
                    1 === n.length && (n = c.test(n[0]) ? n.concat(["center"]) : u.test(n[0]) ? ["center"].concat(n) : ["center", "center"]), n[0] = c.test(n[0]) ? n[0] : "center", n[1] = u.test(n[1]) ? n[1] : "center", t = h.exec(n[0]), i = h.exec(n[1]), C[this] = [t ? t[0] : 0, i ? i[0] : 0], e[this] = [d.exec(n[0])[0], d.exec(n[1])[0]]
                }), 1 === x.length && (x[1] = x[0]), "right" === e.at[0] ? v.left += p : "center" === e.at[0] && (v.left += p / 2), "bottom" === e.at[1] ? v.top += m : "center" === e.at[1] && (v.top += m / 2), r = i(C.at, p, m), v.left += r[0], v.top += r[1], this.each(function() {
                    var s, c, u = t(this),
                        h = u.outerWidth(),
                        d = u.outerHeight(),
                        f = n(this, "marginLeft"),
                        y = n(this, "marginTop"),
                        k = h + f + n(this, "marginRight") + _.width,
                        T = d + y + n(this, "marginBottom") + _.height,
                        M = t.extend({}, v),
                        E = i(C.my, u.outerWidth(), u.outerHeight());
                    "right" === e.my[0] ? M.left -= h : "center" === e.my[0] && (M.left -= h / 2), "bottom" === e.my[1] ? M.top -= d : "center" === e.my[1] && (M.top -= d / 2), M.left += E[0], M.top += E[1], t.support.offsetFractions || (M.left = l(M.left), M.top = l(M.top)), s = {
                        marginLeft: f,
                        marginTop: y
                    }, t.each(["left", "top"], function(i, n) {
                        t.ui.position[x[i]] && t.ui.position[x[i]][n](M, {
                            targetWidth: p,
                            targetHeight: m,
                            elemWidth: h,
                            elemHeight: d,
                            collisionPosition: s,
                            collisionWidth: k,
                            collisionHeight: T,
                            offset: [r[0] + E[0], r[1] + E[1]],
                            my: e.my,
                            at: e.at,
                            within: w,
                            elem: u
                        })
                    }), e.using && (c = function(t) {
                        var i = g.left - M.left,
                            n = i + p - h,
                            s = g.top - M.top,
                            r = s + m - d,
                            l = {
                                target: {
                                    element: b,
                                    left: g.left,
                                    top: g.top,
                                    width: p,
                                    height: m
                                },
                                element: {
                                    element: u,
                                    left: M.left,
                                    top: M.top,
                                    width: h,
                                    height: d
                                },
                                horizontal: 0 > n ? "left" : i > 0 ? "right" : "center",
                                vertical: 0 > r ? "top" : s > 0 ? "bottom" : "middle"
                            };
                        h > p && a(i + n) < p && (l.horizontal = "center"), d > m && a(s + r) < m && (l.vertical = "middle"), l.important = o(a(i), a(n)) > o(a(s), a(r)) ? "horizontal" : "vertical", e.using.call(this, t, l)
                    }), u.offset(t.extend(M, {
                        using: c
                    }))
                })
            }, t.ui.position = {
                fit: {
                    left: function(t, e) {
                        var i, n = e.within,
                            s = n.isWindow ? n.scrollLeft : n.offset.left,
                            r = n.width,
                            a = t.left - e.collisionPosition.marginLeft,
                            l = s - a,
                            c = a + e.collisionWidth - r - s;
                        e.collisionWidth > r ? l > 0 && 0 >= c ? (i = t.left + l + e.collisionWidth - r - s, t.left += l - i) : t.left = c > 0 && 0 >= l ? s : l > c ? s + r - e.collisionWidth : s : l > 0 ? t.left += l : c > 0 ? t.left -= c : t.left = o(t.left - a, t.left)
                    },
                    top: function(t, e) {
                        var i, n = e.within,
                            s = n.isWindow ? n.scrollTop : n.offset.top,
                            r = e.within.height,
                            a = t.top - e.collisionPosition.marginTop,
                            l = s - a,
                            c = a + e.collisionHeight - r - s;
                        e.collisionHeight > r ? l > 0 && 0 >= c ? (i = t.top + l + e.collisionHeight - r - s, t.top += l - i) : t.top = c > 0 && 0 >= l ? s : l > c ? s + r - e.collisionHeight : s : l > 0 ? t.top += l : c > 0 ? t.top -= c : t.top = o(t.top - a, t.top)
                    }
                },
                flip: {
                    left: function(t, e) {
                        var i, n, s = e.within,
                            r = s.offset.left + s.scrollLeft,
                            o = s.width,
                            l = s.isWindow ? s.scrollLeft : s.offset.left,
                            c = t.left - e.collisionPosition.marginLeft,
                            u = c - l,
                            h = c + e.collisionWidth - o - l,
                            d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
                            p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
                            f = -2 * e.offset[0];
                        0 > u ? (i = t.left + d + p + f + e.collisionWidth - o - r, (0 > i || i < a(u)) && (t.left += d + p + f)) : h > 0 && (n = t.left - e.collisionPosition.marginLeft + d + p + f - l, (n > 0 || a(n) < h) && (t.left += d + p + f))
                    },
                    top: function(t, e) {
                        var i, n, s = e.within,
                            r = s.offset.top + s.scrollTop,
                            o = s.height,
                            l = s.isWindow ? s.scrollTop : s.offset.top,
                            c = t.top - e.collisionPosition.marginTop,
                            u = c - l,
                            h = c + e.collisionHeight - o - l,
                            d = "top" === e.my[1],
                            p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
                            f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
                            m = -2 * e.offset[1];
                        0 > u ? (n = t.top + p + f + m + e.collisionHeight - o - r, t.top + p + f + m > u && (0 > n || n < a(u)) && (t.top += p + f + m)) : h > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + m - l, t.top + p + f + m > h && (i > 0 || a(i) < h) && (t.top += p + f + m))
                    }
                },
                flipfit: {
                    left: function() {
                        t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
                    },
                    top: function() {
                        t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
                    }
                }
            },
            function() {
                var e, i, n, s, r, o = document.getElementsByTagName("body")[0],
                    a = document.createElement("div");
                e = document.createElement(o ? "div" : "body"), n = {
                    visibility: "hidden",
                    width: 0,
                    height: 0,
                    border: 0,
                    margin: 0,
                    background: "none"
                }, o && t.extend(n, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
                for (r in n) e.style[r] = n[r];
                e.appendChild(a), i = o || document.documentElement, i.insertBefore(e, i.firstChild), a.style.cssText = "position: absolute; left: 10.7432222px;", s = t(a).offset().left, t.support.offsetFractions = s > 10 && 11 > s, e.innerHTML = "", i.removeChild(e)
            }()
    }(jQuery),
    function(t) {
        t.widget("ui.menu", {
            version: "1.10.3",
            defaultElement: "<ul>",
            delay: 300,
            options: {
                icons: {
                    submenu: "ui-icon-carat-1-e"
                },
                menus: "ul",
                position: {
                    my: "left top",
                    at: "right top"
                },
                role: "menu",
                blur: null,
                focus: null,
                select: null
            },
            _create: function() {
                this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                    role: this.options.role,
                    tabIndex: 0
                }).bind("click" + this.eventNamespace, t.proxy(function(t) {
                    this.options.disabled && t.preventDefault()
                }, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
                    "mousedown .ui-menu-item > a": function(t) {
                        t.preventDefault()
                    },
                    "click .ui-state-disabled > a": function(t) {
                        t.preventDefault()
                    },
                    "click .ui-menu-item:has(a)": function(e) {
                        var i = t(e.target).closest(".ui-menu-item");
                        !this.mouseHandled && i.not(".ui-state-disabled").length && (this.mouseHandled = !0, this.select(e), i.has(".ui-menu").length ? this.expand(e) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                    },
                    "mouseenter .ui-menu-item": function(e) {
                        var i = t(e.currentTarget);
                        i.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(e, i)
                    },
                    mouseleave: "collapseAll",
                    "mouseleave .ui-menu": "collapseAll",
                    focus: function(t, e) {
                        var i = this.active || this.element.children(".ui-menu-item").eq(0);
                        e || this.focus(t, i)
                    },
                    blur: function(e) {
                        this._delay(function() {
                            t.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(e)
                        })
                    },
                    keydown: "_keydown"
                }), this.refresh(), this._on(this.document, {
                    click: function(e) {
                        t(e.target).closest(".ui-menu").length || this.collapseAll(e), this.mouseHandled = !1
                    }
                })
            },
            _destroy: function() {
                this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                    var e = t(this);
                    e.data("ui-menu-submenu-carat") && e.remove()
                }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
            },
            _keydown: function(e) {
                function i(t) {
                    return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
                }
                var n, s, r, o, a, l = !0;
                switch (e.keyCode) {
                    case t.ui.keyCode.PAGE_UP:
                        this.previousPage(e);
                        break;
                    case t.ui.keyCode.PAGE_DOWN:
                        this.nextPage(e);
                        break;
                    case t.ui.keyCode.HOME:
                        this._move("first", "first", e);
                        break;
                    case t.ui.keyCode.END:
                        this._move("last", "last", e);
                        break;
                    case t.ui.keyCode.UP:
                        this.previous(e);
                        break;
                    case t.ui.keyCode.DOWN:
                        this.next(e);
                        break;
                    case t.ui.keyCode.LEFT:
                        this.collapse(e);
                        break;
                    case t.ui.keyCode.RIGHT:
                        this.active && !this.active.is(".ui-state-disabled") && this.expand(e);
                        break;
                    case t.ui.keyCode.ENTER:
                    case t.ui.keyCode.SPACE:
                        this._activate(e);
                        break;
                    case t.ui.keyCode.ESCAPE:
                        this.collapse(e);
                        break;
                    default:
                        l = !1, s = this.previousFilter || "", r = String.fromCharCode(e.keyCode), o = !1, clearTimeout(this.filterTimer), r === s ? o = !0 : r = s + r, a = new RegExp("^" + i(r), "i"), n = this.activeMenu.children(".ui-menu-item").filter(function() {
                            return a.test(t(this).children("a").text())
                        }), n = o && -1 !== n.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : n, n.length || (r = String.fromCharCode(e.keyCode), a = new RegExp("^" + i(r), "i"), n = this.activeMenu.children(".ui-menu-item").filter(function() {
                            return a.test(t(this).children("a").text())
                        })), n.length ? (this.focus(e, n), n.length > 1 ? (this.previousFilter = r, this.filterTimer = this._delay(function() {
                            delete this.previousFilter
                        }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
                }
                l && e.preventDefault()
            },
            _activate: function(t) {
                this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(t) : this.select(t))
            },
            refresh: function() {
                var e, i = this.options.icons.submenu,
                    n = this.element.find(this.options.menus);
                n.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                    role: this.options.role,
                    "aria-hidden": "true",
                    "aria-expanded": "false"
                }).each(function() {
                    var e = t(this),
                        n = e.prev("a"),
                        s = t("<span>").addClass("ui-menu-icon ui-icon " + i).data("ui-menu-submenu-carat", !0);
                    n.attr("aria-haspopup", "true").prepend(s), e.attr("aria-labelledby", n.attr("id"))
                }), e = n.add(this.element), e.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                    tabIndex: -1,
                    role: this._itemRole()
                }), e.children(":not(.ui-menu-item)").each(function() {
                    var e = t(this);
                    /[^\-\u2014\u2013\s]/.test(e.text()) || e.addClass("ui-widget-content ui-menu-divider")
                }), e.children(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !t.contains(this.element[0], this.active[0]) && this.blur()
            },
            _itemRole: function() {
                return {
                    menu: "menuitem",
                    listbox: "option"
                }[this.options.role]
            },
            _setOption: function(t, e) {
                "icons" === t && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu), this._super(t, e)
            },
            focus: function(t, e) {
                var i, n;
                this.blur(t, t && "focus" === t.type), this._scrollIntoView(e), this.active = e.first(), n = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", n.attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), t && "keydown" === t.type ? this._close() : this.timer = this._delay(function() {
                    this._close()
                }, this.delay), i = e.children(".ui-menu"), i.length && /^mouse/.test(t.type) && this._startOpening(i), this.activeMenu = e.parent(), this._trigger("focus", t, {
                    item: e
                })
            },
            _scrollIntoView: function(e) {
                var i, n, s, r, o, a;
                this._hasScroll() && (i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0, n = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0, s = e.offset().top - this.activeMenu.offset().top - i - n, r = this.activeMenu.scrollTop(), o = this.activeMenu.height(), a = e.height(), 0 > s ? this.activeMenu.scrollTop(r + s) : s + a > o && this.activeMenu.scrollTop(r + s - o + a))
            },
            blur: function(t, e) {
                e || clearTimeout(this.timer), this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", t, {
                    item: this.active
                }))
            },
            _startOpening: function(t) {
                clearTimeout(this.timer), "true" === t.attr("aria-hidden") && (this.timer = this._delay(function() {
                    this._close(), this._open(t)
                }, this.delay))
            },
            _open: function(e) {
                var i = t.extend({
                    of: this.active
                }, this.options.position);
                clearTimeout(this.timer), this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"), e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
            },
            collapseAll: function(e, i) {
                clearTimeout(this.timer), this.timer = this._delay(function() {
                    var n = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu"));
                    n.length || (n = this.element), this._close(n), this.blur(e), this.activeMenu = n
                }, this.delay)
            },
            _close: function(t) {
                t || (t = this.active ? this.active.parent() : this.element), t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
            },
            collapse: function(t) {
                var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
                e && e.length && (this._close(), this.focus(t, e))
            },
            expand: function(t) {
                var e = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
                e && e.length && (this._open(e.parent()), this._delay(function() {
                    this.focus(t, e)
                }))
            },
            next: function(t) {
                this._move("next", "first", t)
            },
            previous: function(t) {
                this._move("prev", "last", t)
            },
            isFirstItem: function() {
                return this.active && !this.active.prevAll(".ui-menu-item").length
            },
            isLastItem: function() {
                return this.active && !this.active.nextAll(".ui-menu-item").length
            },
            _move: function(t, e, i) {
                var n;
                this.active && (n = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)), n && n.length && this.active || (n = this.activeMenu.children(".ui-menu-item")[e]()), this.focus(i, n)
            },
            nextPage: function(e) {
                var i, n, s;
                return this.active ? (this.isLastItem() || (this._hasScroll() ? (n = this.active.offset().top, s = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                    return i = t(this), i.offset().top - n - s < 0
                }), this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())), void 0) : (this.next(e), void 0)
            },
            previousPage: function(e) {
                var i, n, s;
                return this.active ? (this.isFirstItem() || (this._hasScroll() ? (n = this.active.offset().top, s = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                    return i = t(this), i.offset().top - n + s > 0
                }), this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item").first())), void 0) : (this.next(e), void 0)
            },
            _hasScroll: function() {
                return this.element.outerHeight() < this.element.prop("scrollHeight")
            },
            select: function(e) {
                this.active = this.active || t(e.target).closest(".ui-menu-item");
                var i = {
                    item: this.active
                };
                this.active.has(".ui-menu").length || this.collapseAll(e, !0), this._trigger("select", e, i)
            }
        })
    }(jQuery),
    function(t) {
        var e = 0;
        t.widget("ui.autocomplete", {
            version: "1.10.3",
            defaultElement: "<input>",
            options: {
                appendTo: null,
                autoFocus: !1,
                delay: 300,
                minLength: 1,
                position: {
                    my: "left top",
                    at: "left bottom",
                    collision: "none"
                },
                source: null,
                change: null,
                close: null,
                focus: null,
                open: null,
                response: null,
                search: null,
                select: null
            },
            pending: 0,
            _create: function() {
                var e, i, n, s = this.element[0].nodeName.toLowerCase(),
                    r = "textarea" === s,
                    o = "input" === s;
                this.isMultiLine = r ? !0 : o ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[r || o ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
                    keydown: function(s) {
                        if (this.element.prop("readOnly")) return e = !0, n = !0, i = !0, void 0;
                        e = !1, n = !1, i = !1;
                        var r = t.ui.keyCode;
                        switch (s.keyCode) {
                            case r.PAGE_UP:
                                e = !0, this._move("previousPage", s);
                                break;
                            case r.PAGE_DOWN:
                                e = !0, this._move("nextPage", s);
                                break;
                            case r.UP:
                                e = !0, this._keyEvent("previous", s);
                                break;
                            case r.DOWN:
                                e = !0, this._keyEvent("next", s);
                                break;
                            case r.ENTER:
                            case r.NUMPAD_ENTER:
                                this.menu.active && (e = !0, s.preventDefault(), this.menu.select(s));
                                break;
                            case r.TAB:
                                this.menu.active && this.menu.select(s);
                                break;
                            case r.ESCAPE:
                                this.menu.element.is(":visible") && (this._value(this.term), this.close(s), s.preventDefault());
                                break;
                            default:
                                i = !0, this._searchTimeout(s)
                        }
                    },
                    keypress: function(n) {
                        if (e) return e = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && n.preventDefault(), void 0;
                        if (!i) {
                            var s = t.ui.keyCode;
                            switch (n.keyCode) {
                                case s.PAGE_UP:
                                    this._move("previousPage", n);
                                    break;
                                case s.PAGE_DOWN:
                                    this._move("nextPage", n);
                                    break;
                                case s.UP:
                                    this._keyEvent("previous", n);
                                    break;
                                case s.DOWN:
                                    this._keyEvent("next", n)
                            }
                        }
                    },
                    input: function(t) {
                        return n ? (n = !1, t.preventDefault(), void 0) : (this._searchTimeout(t), void 0)
                    },
                    focus: function() {
                        this.selectedItem = null, this.previous = this._value()
                    },
                    blur: function(t) {
                        return this.cancelBlur ? (delete this.cancelBlur, void 0) : (clearTimeout(this.searching), this.close(t), this._change(t), void 0)
                    }
                }), this._initSource(), this.menu = t("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                    role: null
                }).hide().data("ui-menu"), this._on(this.menu.element, {
                    mousedown: function(e) {
                        e.preventDefault(), this.cancelBlur = !0, this._delay(function() {
                            delete this.cancelBlur
                        });
                        var i = this.menu.element[0];
                        t(e.target).closest(".ui-menu-item").length || this._delay(function() {
                            var e = this;
                            this.document.one("mousedown", function(n) {
                                n.target === e.element[0] || n.target === i || t.contains(i, n.target) || e.close()
                            })
                        })
                    },
                    menufocus: function(e, i) {
                        if (this.isNewMenu && (this.isNewMenu = !1, e.originalEvent && /^mouse/.test(e.originalEvent.type))) return this.menu.blur(), this.document.one("mousemove", function() {
                            t(e.target).trigger(e.originalEvent)
                        }), void 0;
                        var n = i.item.data("ui-autocomplete-item");
                        !1 !== this._trigger("focus", e, {
                            item: n
                        }) ? e.originalEvent && /^key/.test(e.originalEvent.type) && this._value(n.value) : this.liveRegion.text(n.value)
                    },
                    menuselect: function(t, e) {
                        var i = e.item.data("ui-autocomplete-item"),
                            n = this.previous;
                        this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = n, this._delay(function() {
                            this.previous = n, this.selectedItem = i
                        })), !1 !== this._trigger("select", t, {
                            item: i
                        }) && this._value(i.value), this.term = this._value(), this.close(t), this.selectedItem = i
                    }
                }), this.liveRegion = t("<span>", {
                    role: "status",
                    "aria-live": "polite"
                }).addClass("ui-helper-hidden-accessible").insertBefore(this.element), this._on(this.window, {
                    beforeunload: function() {
                        this.element.removeAttr("autocomplete")
                    }
                })
            },
            _destroy: function() {
                clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
            },
            _setOption: function(t, e) {
                this._super(t, e), "source" === t && this._initSource(), "appendTo" === t && this.menu.element.appendTo(this._appendTo()), "disabled" === t && e && this.xhr && this.xhr.abort()
            },
            _appendTo: function() {
                var e = this.options.appendTo;
                return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e || (e = this.element.closest(".ui-front")), e.length || (e = this.document[0].body), e
            },
            _initSource: function() {
                var e, i, n = this;
                t.isArray(this.options.source) ? (e = this.options.source, this.source = function(i, n) {
                    n(t.ui.autocomplete.filter(e, i.term))
                }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function(e, s) {
                    n.xhr && n.xhr.abort(), n.xhr = t.ajax({
                        url: i,
                        data: e,
                        dataType: "json",
                        success: function(t) {
                            s(t)
                        },
                        error: function() {
                            s([])
                        }
                    })
                }) : this.source = this.options.source
            },
            _searchTimeout: function(t) {
                clearTimeout(this.searching), this.searching = this._delay(function() {
                    this.term !== this._value() && (this.selectedItem = null, this.search(null, t))
                }, this.options.delay)
            },
            search: function(t, e) {
                return t = null != t ? t : this._value(), this.term = this._value(), t.length < this.options.minLength ? this.close(e) : this._trigger("search", e) !== !1 ? this._search(t) : void 0
            },
            _search: function(t) {
                this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
                    term: t
                }, this._response())
            },
            _response: function() {
                var t = this,
                    i = ++e;
                return function(n) {
                    i === e && t.__response(n), t.pending--, t.pending || t.element.removeClass("ui-autocomplete-loading")
                }
            },
            __response: function(t) {
                t && (t = this._normalize(t)), this._trigger("response", null, {
                    content: t
                }), !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close()
            },
            close: function(t) {
                this.cancelSearch = !0, this._close(t)
            },
            _close: function(t) {
                this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", t))
            },
            _change: function(t) {
                this.previous !== this._value() && this._trigger("change", t, {
                    item: this.selectedItem
                })
            },
            _normalize: function(e) {
                return e.length && e[0].label && e[0].value ? e : t.map(e, function(e) {
                    return "string" == typeof e ? {
                        label: e,
                        value: e
                    } : t.extend({
                        label: e.label || e.value,
                        value: e.value || e.label
                    }, e)
                })
            },
            _suggest: function(e) {
                var i = this.menu.element.empty();
                this._renderMenu(i, e), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(t.extend({
                    of: this.element
                }, this.options.position)), this.options.autoFocus && this.menu.next()
            },
            _resizeMenu: function() {
                var t = this.menu.element;
                t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()))
            },
            _renderMenu: function(e, i) {
                var n = this;
                t.each(i, function(t, i) {
                    n._renderItemData(e, i)
                })
            },
            _renderItemData: function(t, e) {
                return this._renderItem(t, e).data("ui-autocomplete-item", e)
            },
            _renderItem: function(e, i) {
                return t("<li>").append(t("<a>").text(i.label)).appendTo(e)
            },
            _move: function(t, e) {
                return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(t) || this.menu.isLastItem() && /^next/.test(t) ? (this._value(this.term), this.menu.blur(), void 0) : (this.menu[t](e), void 0) : (this.search(null, e), void 0)
            },
            widget: function() {
                return this.menu.element
            },
            _value: function() {
                return this.valueMethod.apply(this.element, arguments)
            },
            _keyEvent: function(t, e) {
                (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(t, e), e.preventDefault())
            }
        }), t.extend(t.ui.autocomplete, {
            escapeRegex: function(t) {
                return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            },
            filter: function(e, i) {
                var n = new RegExp(t.ui.autocomplete.escapeRegex(i), "i");
                return t.grep(e, function(t) {
                    return n.test(t.label || t.value || t)
                })
            }
        }), t.widget("ui.autocomplete", t.ui.autocomplete, {
            options: {
                messages: {
                    noResults: "No search results.",
                    results: function(t) {
                        return t + (t > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                    }
                }
            },
            __response: function(t) {
                var e;
                this._superApply(arguments), this.options.disabled || this.cancelSearch || (e = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.text(e))
            }
        })
    }(jQuery),
    function(t) {
        var e, i, n, s, r = "ui-button ui-widget ui-state-default ui-corner-all",
            o = "ui-state-hover ui-state-active ",
            a = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
            l = function() {
                var e = t(this);
                setTimeout(function() {
                    e.find(":ui-button").button("refresh")
                }, 1)
            },
            c = function(e) {
                var i = e.name,
                    n = e.form,
                    s = t([]);
                return i && (i = i.replace(/'/g, "\\'"), s = n ? t(n).find("[name='" + i + "']") : t("[name='" + i + "']", e.ownerDocument).filter(function() {
                    return !this.form
                })), s
            };
        t.widget("ui.button", {
            version: "1.10.3",
            defaultElement: "<button>",
            options: {
                disabled: null,
                text: !0,
                label: null,
                icons: {
                    primary: null,
                    secondary: null
                }
            },
            _create: function() {
                this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, l), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
                var o = this,
                    a = this.options,
                    u = "checkbox" === this.type || "radio" === this.type,
                    h = u ? "" : "ui-state-active",
                    d = "ui-state-focus";
                null === a.label && (a.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(r).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
                    a.disabled || this === e && t(this).addClass("ui-state-active")
                }).bind("mouseleave" + this.eventNamespace, function() {
                    a.disabled || t(this).removeClass(h)
                }).bind("click" + this.eventNamespace, function(t) {
                    a.disabled && (t.preventDefault(), t.stopImmediatePropagation())
                }), this.element.bind("focus" + this.eventNamespace, function() {
                    o.buttonElement.addClass(d)
                }).bind("blur" + this.eventNamespace, function() {
                    o.buttonElement.removeClass(d)
                }), u && (this.element.bind("change" + this.eventNamespace, function() {
                    s || o.refresh()
                }), this.buttonElement.bind("mousedown" + this.eventNamespace, function(t) {
                    a.disabled || (s = !1, i = t.pageX, n = t.pageY)
                }).bind("mouseup" + this.eventNamespace, function(t) {
                    a.disabled || (i !== t.pageX || n !== t.pageY) && (s = !0)
                })), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                    return a.disabled || s ? !1 : void 0
                }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                    if (a.disabled || s) return !1;
                    t(this).addClass("ui-state-active"), o.buttonElement.attr("aria-pressed", "true");
                    var e = o.element[0];
                    c(e).not(e).map(function() {
                        return t(this).button("widget")[0]
                    }).removeClass("ui-state-active").attr("aria-pressed", "false")
                }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
                    return a.disabled ? !1 : (t(this).addClass("ui-state-active"), e = this, o.document.one("mouseup", function() {
                        e = null
                    }), void 0)
                }).bind("mouseup" + this.eventNamespace, function() {
                    return a.disabled ? !1 : (t(this).removeClass("ui-state-active"), void 0)
                }).bind("keydown" + this.eventNamespace, function(e) {
                    return a.disabled ? !1 : ((e.keyCode === t.ui.keyCode.SPACE || e.keyCode === t.ui.keyCode.ENTER) && t(this).addClass("ui-state-active"), void 0)
                }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
                    t(this).removeClass("ui-state-active")
                }), this.buttonElement.is("a") && this.buttonElement.keyup(function(e) {
                    e.keyCode === t.ui.keyCode.SPACE && t(this).click()
                })), this._setOption("disabled", a.disabled), this._resetButton()
            },
            _determineButtonType: function() {
                var t, e, i;
                this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", "checkbox" === this.type || "radio" === this.type ? (t = this.element.parents().last(), e = "label[for='" + this.element.attr("id") + "']", this.buttonElement = t.find(e), this.buttonElement.length || (t = t.length ? t.siblings() : this.element.siblings(), this.buttonElement = t.filter(e), this.buttonElement.length || (this.buttonElement = t.find(e))), this.element.addClass("ui-helper-hidden-accessible"), i = this.element.is(":checked"), i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
            },
            widget: function() {
                return this.buttonElement
            },
            _destroy: function() {
                this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(r + " " + o + " " + a).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
            },
            _setOption: function(t, e) {
                return this._super(t, e), "disabled" === t ? (e ? this.element.prop("disabled", !0) : this.element.prop("disabled", !1), void 0) : (this._resetButton(), void 0)
            },
            refresh: function() {
                var e = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
                e !== this.options.disabled && this._setOption("disabled", e), "radio" === this.type ? c(this.element[0]).each(function() {
                    t(this).is(":checked") ? t(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
                }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
            },
            _resetButton: function() {
                if ("input" === this.type) return this.options.label && this.element.val(this.options.label), void 0;
                var e = this.buttonElement.removeClass(a),
                    i = t("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text(),
                    n = this.options.icons,
                    s = n.primary && n.secondary,
                    r = [];
                n.primary || n.secondary ? (this.options.text && r.push("ui-button-text-icon" + (s ? "s" : n.primary ? "-primary" : "-secondary")), n.primary && e.prepend("<span class='ui-button-icon-primary ui-icon " + n.primary + "'></span>"), n.secondary && e.append("<span class='ui-button-icon-secondary ui-icon " + n.secondary + "'></span>"), this.options.text || (r.push(s ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || e.attr("title", t.trim(i)))) : r.push("ui-button-text-only"), e.addClass(r.join(" "))
            }
        }), t.widget("ui.buttonset", {
            version: "1.10.3",
            options: {
                items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
            },
            _create: function() {
                this.element.addClass("ui-buttonset")
            },
            _init: function() {
                this.refresh()
            },
            _setOption: function(t, e) {
                "disabled" === t && this.buttons.button("option", t, e), this._super(t, e)
            },
            refresh: function() {
                var e = "rtl" === this.element.css("direction");
                this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                    return t(this).button("widget")[0]
                }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(e ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(e ? "ui-corner-left" : "ui-corner-right").end().end()
            },
            _destroy: function() {
                this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
                    return t(this).button("widget")[0]
                }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
            }
        })
    }(jQuery),
    function(t, e) {
        function i() {
            this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
                closeText: "Done",
                prevText: "Prev",
                nextText: "Next",
                currentText: "Today",
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                weekHeader: "Wk",
                dateFormat: "mm/dd/yy",
                firstDay: 0,
                isRTL: !1,
                showMonthAfterYear: !1,
                yearSuffix: ""
            }, this._defaults = {
                showOn: "focus",
                showAnim: "fadeIn",
                showOptions: {},
                defaultDate: null,
                appendText: "",
                buttonText: "...",
                buttonImage: "",
                buttonImageOnly: !1,
                hideIfNoPrevNext: !1,
                navigationAsDateFormat: !1,
                gotoCurrent: !1,
                changeMonth: !1,
                changeYear: !1,
                yearRange: "c-10:c+10",
                showOtherMonths: !1,
                selectOtherMonths: !1,
                showWeek: !1,
                calculateWeek: this.iso8601Week,
                shortYearCutoff: "+10",
                minDate: null,
                maxDate: null,
                duration: "fast",
                beforeShowDay: null,
                beforeShow: null,
                onSelect: null,
                onChangeMonthYear: null,
                onClose: null,
                numberOfMonths: 1,
                showCurrentAtPos: 0,
                stepMonths: 1,
                stepBigMonths: 12,
                altField: "",
                altFormat: "",
                constrainInput: !0,
                showButtonPanel: !1,
                autoSize: !1,
                disabled: !1
            }, t.extend(this._defaults, this.regional[""]), this.dpDiv = n(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
        }

        function n(e) {
            var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return e.delegate(i, "mouseout", function() {
                t(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover")
            }).delegate(i, "mouseover", function() {
                t.datepicker._isDisabledDatepicker(r.inline ? e.parent()[0] : r.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"))
            })
        }

        function s(e, i) {
            t.extend(e, i);
            for (var n in i) null == i[n] && (e[n] = i[n]);
            return e
        }
        t.extend(t.ui, {
            datepicker: {
                version: "1.10.3"
            }
        });
        var r, o = "datepicker";
        t.extend(i.prototype, {
            markerClassName: "hasDatepicker",
            maxRows: 4,
            _widgetDatepicker: function() {
                return this.dpDiv
            },
            setDefaults: function(t) {
                return s(this._defaults, t || {}), this
            },
            _attachDatepicker: function(e, i) {
                var n, s, r;
                n = e.nodeName.toLowerCase(), s = "div" === n || "span" === n, e.id || (this.uuid += 1, e.id = "dp" + this.uuid), r = this._newInst(t(e), s), r.settings = t.extend({}, i || {}), "input" === n ? this._connectDatepicker(e, r) : s && this._inlineDatepicker(e, r)
            },
            _newInst: function(e, i) {
                var s = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
                return {
                    id: s,
                    input: e,
                    selectedDay: 0,
                    selectedMonth: 0,
                    selectedYear: 0,
                    drawMonth: 0,
                    drawYear: 0,
                    inline: i,
                    dpDiv: i ? n(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
                }
            },
            _connectDatepicker: function(e, i) {
                var n = t(e);
                i.append = t([]), i.trigger = t([]), n.hasClass(this.markerClassName) || (this._attachments(n, i), n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), t.data(e, o, i), i.settings.disabled && this._disableDatepicker(e))
            },
            _attachments: function(e, i) {
                var n, s, r, o = this._get(i, "appendText"),
                    a = this._get(i, "isRTL");
                i.append && i.append.remove(), o && (i.append = t("<span class='" + this._appendClass + "'>" + o + "</span>"), e[a ? "before" : "after"](i.append)), e.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), n = this._get(i, "showOn"), ("focus" === n || "both" === n) && e.focus(this._showDatepicker), ("button" === n || "both" === n) && (s = this._get(i, "buttonText"), r = this._get(i, "buttonImage"), i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({
                    src: r,
                    alt: s,
                    title: s
                }) : t("<button type='button'></button>").addClass(this._triggerClass).html(r ? t("<img/>").attr({
                    src: r,
                    alt: s,
                    title: s
                }) : s)), e[a ? "before" : "after"](i.trigger), i.trigger.click(function() {
                    return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]), !1
                }))
            },
            _autoSize: function(t) {
                if (this._get(t, "autoSize") && !t.inline) {
                    var e, i, n, s, r = new Date(2009, 11, 20),
                        o = this._get(t, "dateFormat");
                    o.match(/[DM]/) && (e = function(t) {
                        for (i = 0, n = 0, s = 0; s < t.length; s++) t[s].length > i && (i = t[s].length, n = s);
                        return n
                    }, r.setMonth(e(this._get(t, o.match(/MM/) ? "monthNames" : "monthNamesShort"))), r.setDate(e(this._get(t, o.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - r.getDay())), t.input.attr("size", this._formatDate(t, r).length)
                }
            },
            _inlineDatepicker: function(e, i) {
                var n = t(e);
                n.hasClass(this.markerClassName) || (n.addClass(this.markerClassName).append(i.dpDiv), t.data(e, o, i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css("display", "block"))
            },
            _dialogDatepicker: function(e, i, n, r, a) {
                var l, c, u, h, d, p = this._dialogInst;
                return p || (this.uuid += 1, l = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + l + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), t("body").append(this._dialogInput), p = this._dialogInst = this._newInst(this._dialogInput, !1), p.settings = {}, t.data(this._dialogInput[0], o, p)), s(p.settings, r || {}), i = i && i.constructor === Date ? this._formatDate(p, i) : i, this._dialogInput.val(i), this._pos = a ? a.length ? a : [a.pageX, a.pageY] : null, this._pos || (c = document.documentElement.clientWidth, u = document.documentElement.clientHeight, h = document.documentElement.scrollLeft || document.body.scrollLeft, d = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [c / 2 - 100 + h, u / 2 - 150 + d]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), p.settings.onSelect = n, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), t.blockUI && t.blockUI(this.dpDiv), t.data(this._dialogInput[0], o, p), this
            },
            _destroyDatepicker: function(e) {
                var i, n = t(e),
                    s = t.data(e, o);
                n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, o), "input" === i ? (s.append.remove(), s.trigger.remove(), n.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && n.removeClass(this.markerClassName).empty())
            },
            _enableDatepicker: function(e) {
                var i, n, s = t(e),
                    r = t.data(e, o);
                s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !1, r.trigger.filter("button").each(function() {
                    this.disabled = !1
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })) : ("div" === i || "span" === i) && (n = s.children("." + this._inlineClass), n.children().removeClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
                    return t === e ? null : t
                }))
            },
            _disableDatepicker: function(e) {
                var i, n, s = t(e),
                    r = t.data(e, o);
                s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !0, r.trigger.filter("button").each(function() {
                    this.disabled = !0
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })) : ("div" === i || "span" === i) && (n = s.children("." + this._inlineClass), n.children().addClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
                    return t === e ? null : t
                }), this._disabledInputs[this._disabledInputs.length] = e)
            },
            _isDisabledDatepicker: function(t) {
                if (!t) return !1;
                for (var e = 0; e < this._disabledInputs.length; e++)
                    if (this._disabledInputs[e] === t) return !0;
                return !1
            },
            _getInst: function(e) {
                try {
                    return t.data(e, o)
                } catch (i) {
                    throw "Missing instance data for this datepicker"
                }
            },
            _optionDatepicker: function(i, n, r) {
                var o, a, l, c, u = this._getInst(i);
                return 2 === arguments.length && "string" == typeof n ? "defaults" === n ? t.extend({}, t.datepicker._defaults) : u ? "all" === n ? t.extend({}, u.settings) : this._get(u, n) : null : (o = n || {}, "string" == typeof n && (o = {}, o[n] = r), u && (this._curInst === u && this._hideDatepicker(), a = this._getDateDatepicker(i, !0), l = this._getMinMaxDate(u, "min"), c = this._getMinMaxDate(u, "max"), s(u.settings, o), null !== l && o.dateFormat !== e && o.minDate === e && (u.settings.minDate = this._formatDate(u, l)), null !== c && o.dateFormat !== e && o.maxDate === e && (u.settings.maxDate = this._formatDate(u, c)), "disabled" in o && (o.disabled ? this._disableDatepicker(i) : this._enableDatepicker(i)), this._attachments(t(i), u), this._autoSize(u), this._setDate(u, a), this._updateAlternate(u), this._updateDatepicker(u)), void 0)
            },
            _changeDatepicker: function(t, e, i) {
                this._optionDatepicker(t, e, i)
            },
            _refreshDatepicker: function(t) {
                var e = this._getInst(t);
                e && this._updateDatepicker(e)
            },
            _setDateDatepicker: function(t, e) {
                var i = this._getInst(t);
                i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i))
            },
            _getDateDatepicker: function(t, e) {
                var i = this._getInst(t);
                return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null
            },
            _doKeyDown: function(e) {
                var i, n, s, r = t.datepicker._getInst(e.target),
                    o = !0,
                    a = r.dpDiv.is(".ui-datepicker-rtl");
                if (r._keyEvent = !0, t.datepicker._datepickerShowing) switch (e.keyCode) {
                    case 9:
                        t.datepicker._hideDatepicker(), o = !1;
                        break;
                    case 13:
                        return s = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", r.dpDiv), s[0] && t.datepicker._selectDay(e.target, r.selectedMonth, r.selectedYear, s[0]), i = t.datepicker._get(r, "onSelect"), i ? (n = t.datepicker._formatDate(r), i.apply(r.input ? r.input[0] : null, [n, r])) : t.datepicker._hideDatepicker(), !1;
                    case 27:
                        t.datepicker._hideDatepicker();
                        break;
                    case 33:
                        t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(r, "stepBigMonths") : -t.datepicker._get(r, "stepMonths"), "M");
                        break;
                    case 34:
                        t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(r, "stepBigMonths") : +t.datepicker._get(r, "stepMonths"), "M");
                        break;
                    case 35:
                        (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target), o = e.ctrlKey || e.metaKey;
                        break;
                    case 36:
                        (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target), o = e.ctrlKey || e.metaKey;
                        break;
                    case 37:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, a ? 1 : -1, "D"), o = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(r, "stepBigMonths") : -t.datepicker._get(r, "stepMonths"), "M");
                        break;
                    case 38:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"), o = e.ctrlKey || e.metaKey;
                        break;
                    case 39:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, a ? -1 : 1, "D"), o = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(r, "stepBigMonths") : +t.datepicker._get(r, "stepMonths"), "M");
                        break;
                    case 40:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"), o = e.ctrlKey || e.metaKey;
                        break;
                    default:
                        o = !1
                } else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : o = !1;
                o && (e.preventDefault(), e.stopPropagation())
            },
            _doKeyPress: function(e) {
                var i, n, s = t.datepicker._getInst(e.target);
                return t.datepicker._get(s, "constrainInput") ? (i = t.datepicker._possibleChars(t.datepicker._get(s, "dateFormat")), n = String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), e.ctrlKey || e.metaKey || " " > n || !i || i.indexOf(n) > -1) : void 0
            },
            _doKeyUp: function(e) {
                var i, n = t.datepicker._getInst(e.target);
                if (n.input.val() !== n.lastVal) try {
                    i = t.datepicker.parseDate(t.datepicker._get(n, "dateFormat"), n.input ? n.input.val() : null, t.datepicker._getFormatConfig(n)), i && (t.datepicker._setDateFromField(n), t.datepicker._updateAlternate(n), t.datepicker._updateDatepicker(n))
                } catch (s) {}
                return !0
            },
            _showDatepicker: function(e) {
                if (e = e.target || e, "input" !== e.nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]), !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e) {
                    var i, n, r, o, a, l, c;
                    i = t.datepicker._getInst(e), t.datepicker._curInst && t.datepicker._curInst !== i && (t.datepicker._curInst.dpDiv.stop(!0, !0), i && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])), n = t.datepicker._get(i, "beforeShow"), r = n ? n.apply(e, [e, i]) : {}, r !== !1 && (s(i.settings, r), i.lastVal = null, t.datepicker._lastInput = e, t.datepicker._setDateFromField(i), t.datepicker._inDialog && (e.value = ""), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e), t.datepicker._pos[1] += e.offsetHeight), o = !1, t(e).parents().each(function() {
                        return o |= "fixed" === t(this).css("position"), !o
                    }), a = {
                        left: t.datepicker._pos[0],
                        top: t.datepicker._pos[1]
                    }, t.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
                        position: "absolute",
                        display: "block",
                        top: "-1000px"
                    }), t.datepicker._updateDatepicker(i), a = t.datepicker._checkOffset(i, a, o), i.dpDiv.css({
                        position: t.datepicker._inDialog && t.blockUI ? "static" : o ? "fixed" : "absolute",
                        display: "none",
                        left: a.left + "px",
                        top: a.top + "px"
                    }), i.inline || (l = t.datepicker._get(i, "showAnim"), c = t.datepicker._get(i, "duration"), i.dpDiv.zIndex(t(e).zIndex() + 1), t.datepicker._datepickerShowing = !0, t.effects && t.effects.effect[l] ? i.dpDiv.show(l, t.datepicker._get(i, "showOptions"), c) : i.dpDiv[l || "show"](l ? c : null), t.datepicker._shouldFocusInput(i) && i.input.focus(), t.datepicker._curInst = i))
                }
            },
            _updateDatepicker: function(e) {
                this.maxRows = 4, r = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e), e.dpDiv.find("." + this._dayOverClass + " a").mouseover();
                var i, n = this._getNumberOfMonths(e),
                    s = n[1],
                    o = 17;
                e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), s > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + s).css("width", o * s + "em"), e.dpDiv[(1 !== n[0] || 1 !== n[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.focus(), e.yearshtml && (i = e.yearshtml, setTimeout(function() {
                    i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), i = e.yearshtml = null
                }, 0))
            },
            _shouldFocusInput: function(t) {
                return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus")
            },
            _checkOffset: function(e, i, n) {
                var s = e.dpDiv.outerWidth(),
                    r = e.dpDiv.outerHeight(),
                    o = e.input ? e.input.outerWidth() : 0,
                    a = e.input ? e.input.outerHeight() : 0,
                    l = document.documentElement.clientWidth + (n ? 0 : t(document).scrollLeft()),
                    c = document.documentElement.clientHeight + (n ? 0 : t(document).scrollTop());
                return i.left -= this._get(e, "isRTL") ? s - o : 0, i.left -= n && i.left === e.input.offset().left ? t(document).scrollLeft() : 0, i.top -= n && i.top === e.input.offset().top + a ? t(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + s > l && l > s ? Math.abs(i.left + s - l) : 0), i.top -= Math.min(i.top, i.top + r > c && c > r ? Math.abs(r + a) : 0), i
            },
            _findPos: function(e) {
                for (var i, n = this._getInst(e), s = this._get(n, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e));) e = e[s ? "previousSibling" : "nextSibling"];
                return i = t(e).offset(), [i.left, i.top]
            },
            _hideDatepicker: function(e) {
                var i, n, s, r, a = this._curInst;
                !a || e && a !== t.data(e, o) || this._datepickerShowing && (i = this._get(a, "showAnim"), n = this._get(a, "duration"), s = function() {
                    t.datepicker._tidyDialog(a)
                }, t.effects && (t.effects.effect[i] || t.effects[i]) ? a.dpDiv.hide(i, t.datepicker._get(a, "showOptions"), n, s) : a.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? n : null, s), i || s(), this._datepickerShowing = !1, r = this._get(a, "onClose"), r && r.apply(a.input ? a.input[0] : null, [a.input ? a.input.val() : "", a]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                    position: "absolute",
                    left: "0",
                    top: "-100px"
                }), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = !1)
            },
            _tidyDialog: function(t) {
                t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
            },
            _checkExternalClick: function(e) {
                if (t.datepicker._curInst) {
                    var i = t(e.target),
                        n = t.datepicker._getInst(i[0]);
                    (i[0].id !== t.datepicker._mainDivId && 0 === i.parents("#" + t.datepicker._mainDivId).length && !i.hasClass(t.datepicker.markerClassName) && !i.closest("." + t.datepicker._triggerClass).length && t.datepicker._datepickerShowing && (!t.datepicker._inDialog || !t.blockUI) || i.hasClass(t.datepicker.markerClassName) && t.datepicker._curInst !== n) && t.datepicker._hideDatepicker()
                }
            },
            _adjustDate: function(e, i, n) {
                var s = t(e),
                    r = this._getInst(s[0]);
                this._isDisabledDatepicker(s[0]) || (this._adjustInstDate(r, i + ("M" === n ? this._get(r, "showCurrentAtPos") : 0), n), this._updateDatepicker(r))
            },
            _gotoToday: function(e) {
                var i, n = t(e),
                    s = this._getInst(n[0]);
                this._get(s, "gotoCurrent") && s.currentDay ? (s.selectedDay = s.currentDay, s.drawMonth = s.selectedMonth = s.currentMonth, s.drawYear = s.selectedYear = s.currentYear) : (i = new Date, s.selectedDay = i.getDate(), s.drawMonth = s.selectedMonth = i.getMonth(), s.drawYear = s.selectedYear = i.getFullYear()), this._notifyChange(s), this._adjustDate(n)
            },
            _selectMonthYear: function(e, i, n) {
                var s = t(e),
                    r = this._getInst(s[0]);
                r["selected" + ("M" === n ? "Month" : "Year")] = r["draw" + ("M" === n ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(r), this._adjustDate(s)
            },
            _selectDay: function(e, i, n, s) {
                var r, o = t(e);
                t(s).hasClass(this._unselectableClass) || this._isDisabledDatepicker(o[0]) || (r = this._getInst(o[0]), r.selectedDay = r.currentDay = t("a", s).html(), r.selectedMonth = r.currentMonth = i, r.selectedYear = r.currentYear = n, this._selectDate(e, this._formatDate(r, r.currentDay, r.currentMonth, r.currentYear)))
            },
            _clearDate: function(e) {
                var i = t(e);
                this._selectDate(i, "")
            },
            _selectDate: function(e, i) {
                var n, s = t(e),
                    r = this._getInst(s[0]);
                i = null != i ? i : this._formatDate(r), r.input && r.input.val(i), this._updateAlternate(r), n = this._get(r, "onSelect"), n ? n.apply(r.input ? r.input[0] : null, [i, r]) : r.input && r.input.trigger("change"), r.inline ? this._updateDatepicker(r) : (this._hideDatepicker(), this._lastInput = r.input[0], "object" != typeof r.input[0] && r.input.focus(), this._lastInput = null)
            },
            _updateAlternate: function(e) {
                var i, n, s, r = this._get(e, "altField");
                r && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"), n = this._getDate(e), s = this.formatDate(i, n, this._getFormatConfig(e)), t(r).each(function() {
                    t(this).val(s)
                }))
            },
            noWeekends: function(t) {
                var e = t.getDay();
                return [e > 0 && 6 > e, ""]
            },
            iso8601Week: function(t) {
                var e, i = new Date(t.getTime());
                return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1
            },
            parseDate: function(e, i, n) {
                if (null == e || null == i) throw "Invalid arguments";
                if (i = "object" == typeof i ? i.toString() : i + "", "" === i) return null;
                var s, r, o, a, l = 0,
                    c = (n ? n.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                    u = "string" != typeof c ? c : (new Date).getFullYear() % 100 + parseInt(c, 10),
                    h = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort,
                    d = (n ? n.dayNames : null) || this._defaults.dayNames,
                    p = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort,
                    f = (n ? n.monthNames : null) || this._defaults.monthNames,
                    m = -1,
                    g = -1,
                    v = -1,
                    y = -1,
                    b = !1,
                    w = function(t) {
                        var i = s + 1 < e.length && e.charAt(s + 1) === t;
                        return i && s++, i
                    },
                    _ = function(t) {
                        var e = w(t),
                            n = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2,
                            s = new RegExp("^\\d{1," + n + "}"),
                            r = i.substring(l).match(s);
                        if (!r) throw "Missing number at position " + l;
                        return l += r[0].length, parseInt(r[0], 10)
                    },
                    x = function(e, n, s) {
                        var r = -1,
                            o = t.map(w(e) ? s : n, function(t, e) {
                                return [
                                    [e, t]
                                ]
                            }).sort(function(t, e) {
                                return -(t[1].length - e[1].length)
                            });
                        if (t.each(o, function(t, e) {
                                var n = e[1];
                                return i.substr(l, n.length).toLowerCase() === n.toLowerCase() ? (r = e[0], l += n.length, !1) : void 0
                            }), -1 !== r) return r + 1;
                        throw "Unknown name at position " + l
                    },
                    C = function() {
                        if (i.charAt(l) !== e.charAt(s)) throw "Unexpected literal at position " + l;
                        l++
                    };
                for (s = 0; s < e.length; s++)
                    if (b) "'" !== e.charAt(s) || w("'") ? C() : b = !1;
                    else switch (e.charAt(s)) {
                        case "d":
                            v = _("d");
                            break;
                        case "D":
                            x("D", h, d);
                            break;
                        case "o":
                            y = _("o");
                            break;
                        case "m":
                            g = _("m");
                            break;
                        case "M":
                            g = x("M", p, f);
                            break;
                        case "y":
                            m = _("y");
                            break;
                        case "@":
                            a = new Date(_("@")), m = a.getFullYear(), g = a.getMonth() + 1, v = a.getDate();
                            break;
                        case "!":
                            a = new Date((_("!") - this._ticksTo1970) / 1e4), m = a.getFullYear(), g = a.getMonth() + 1, v = a.getDate();
                            break;
                        case "'":
                            w("'") ? C() : b = !0;
                            break;
                        default:
                            C()
                    }
                    if (l < i.length && (o = i.substr(l), !/^\s+/.test(o))) throw "Extra/unparsed characters found in date: " + o;
                if (-1 === m ? m = (new Date).getFullYear() : 100 > m && (m += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (u >= m ? 0 : -100)), y > -1)
                    for (g = 1, v = y;;) {
                        if (r = this._getDaysInMonth(m, g - 1), r >= v) break;
                        g++, v -= r
                    }
                if (a = this._daylightSavingAdjust(new Date(m, g - 1, v)), a.getFullYear() !== m || a.getMonth() + 1 !== g || a.getDate() !== v) throw "Invalid date";
                return a
            },
            ATOM: "yy-mm-dd",
            COOKIE: "D, dd M yy",
            ISO_8601: "yy-mm-dd",
            RFC_822: "D, d M y",
            RFC_850: "DD, dd-M-y",
            RFC_1036: "D, d M y",
            RFC_1123: "D, d M yy",
            RFC_2822: "D, d M yy",
            RSS: "D, d M y",
            TICKS: "!",
            TIMESTAMP: "@",
            W3C: "yy-mm-dd",
            _ticksTo1970: 1e7 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
            formatDate: function(t, e, i) {
                if (!e) return "";
                var n, s = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                    r = (i ? i.dayNames : null) || this._defaults.dayNames,
                    o = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                    a = (i ? i.monthNames : null) || this._defaults.monthNames,
                    l = function(e) {
                        var i = n + 1 < t.length && t.charAt(n + 1) === e;
                        return i && n++, i
                    },
                    c = function(t, e, i) {
                        var n = "" + e;
                        if (l(t))
                            for (; n.length < i;) n = "0" + n;
                        return n
                    },
                    u = function(t, e, i, n) {
                        return l(t) ? n[e] : i[e]
                    },
                    h = "",
                    d = !1;
                if (e)
                    for (n = 0; n < t.length; n++)
                        if (d) "'" !== t.charAt(n) || l("'") ? h += t.charAt(n) : d = !1;
                        else switch (t.charAt(n)) {
                            case "d":
                                h += c("d", e.getDate(), 2);
                                break;
                            case "D":
                                h += u("D", e.getDay(), s, r);
                                break;
                            case "o":
                                h += c("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                                break;
                            case "m":
                                h += c("m", e.getMonth() + 1, 2);
                                break;
                            case "M":
                                h += u("M", e.getMonth(), o, a);
                                break;
                            case "y":
                                h += l("y") ? e.getFullYear() : (e.getYear() % 100 < 10 ? "0" : "") + e.getYear() % 100;
                                break;
                            case "@":
                                h += e.getTime();
                                break;
                            case "!":
                                h += 1e4 * e.getTime() + this._ticksTo1970;
                                break;
                            case "'":
                                l("'") ? h += "'" : d = !0;
                                break;
                            default:
                                h += t.charAt(n)
                        }
                        return h
            },
            _possibleChars: function(t) {
                var e, i = "",
                    n = !1,
                    s = function(i) {
                        var n = e + 1 < t.length && t.charAt(e + 1) === i;
                        return n && e++, n
                    };
                for (e = 0; e < t.length; e++)
                    if (n) "'" !== t.charAt(e) || s("'") ? i += t.charAt(e) : n = !1;
                    else switch (t.charAt(e)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            i += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            s("'") ? i += "'" : n = !0;
                            break;
                        default:
                            i += t.charAt(e)
                    }
                    return i
            },
            _get: function(t, i) {
                return t.settings[i] !== e ? t.settings[i] : this._defaults[i]
            },
            _setDateFromField: function(t, e) {
                if (t.input.val() !== t.lastVal) {
                    var i = this._get(t, "dateFormat"),
                        n = t.lastVal = t.input ? t.input.val() : null,
                        s = this._getDefaultDate(t),
                        r = s,
                        o = this._getFormatConfig(t);
                    try {
                        r = this.parseDate(i, n, o) || s
                    } catch (a) {
                        n = e ? "" : n
                    }
                    t.selectedDay = r.getDate(), t.drawMonth = t.selectedMonth = r.getMonth(), t.drawYear = t.selectedYear = r.getFullYear(), t.currentDay = n ? r.getDate() : 0, t.currentMonth = n ? r.getMonth() : 0, t.currentYear = n ? r.getFullYear() : 0, this._adjustInstDate(t)
                }
            },
            _getDefaultDate: function(t) {
                return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
            },
            _determineDate: function(e, i, n) {
                var s = function(t) {
                        var e = new Date;
                        return e.setDate(e.getDate() + t), e
                    },
                    r = function(i) {
                        try {
                            return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e))
                        } catch (n) {}
                        for (var s = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date, r = s.getFullYear(), o = s.getMonth(), a = s.getDate(), l = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, c = l.exec(i); c;) {
                            switch (c[2] || "d") {
                                case "d":
                                case "D":
                                    a += parseInt(c[1], 10);
                                    break;
                                case "w":
                                case "W":
                                    a += 7 * parseInt(c[1], 10);
                                    break;
                                case "m":
                                case "M":
                                    o += parseInt(c[1], 10), a = Math.min(a, t.datepicker._getDaysInMonth(r, o));
                                    break;
                                case "y":
                                case "Y":
                                    r += parseInt(c[1], 10), a = Math.min(a, t.datepicker._getDaysInMonth(r, o))
                            }
                            c = l.exec(i)
                        }
                        return new Date(r, o, a)
                    },
                    o = null == i || "" === i ? n : "string" == typeof i ? r(i) : "number" == typeof i ? isNaN(i) ? n : s(i) : new Date(i.getTime());
                return o = o && "Invalid Date" === o.toString() ? n : o, o && (o.setHours(0), o.setMinutes(0), o.setSeconds(0), o.setMilliseconds(0)), this._daylightSavingAdjust(o)
            },
            _daylightSavingAdjust: function(t) {
                return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null
            },
            _setDate: function(t, e, i) {
                var n = !e,
                    s = t.selectedMonth,
                    r = t.selectedYear,
                    o = this._restrictMinMax(t, this._determineDate(t, e, new Date));
                t.selectedDay = t.currentDay = o.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = o.getMonth(), t.drawYear = t.selectedYear = t.currentYear = o.getFullYear(), s === t.selectedMonth && r === t.selectedYear || i || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(n ? "" : this._formatDate(t))
            },
            _getDate: function(t) {
                var e = !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
                return e
            },
            _attachHandlers: function(e) {
                var i = this._get(e, "stepMonths"),
                    n = "#" + e.id.replace(/\\\\/g, "\\");
                e.dpDiv.find("[data-handler]").map(function() {
                    var e = {
                        prev: function() {
                            t.datepicker._adjustDate(n, -i, "M")
                        },
                        next: function() {
                            t.datepicker._adjustDate(n, +i, "M")
                        },
                        hide: function() {
                            t.datepicker._hideDatepicker()
                        },
                        today: function() {
                            t.datepicker._gotoToday(n)
                        },
                        selectDay: function() {
                            return t.datepicker._selectDay(n, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                        },
                        selectMonth: function() {
                            return t.datepicker._selectMonthYear(n, this, "M"), !1
                        },
                        selectYear: function() {
                            return t.datepicker._selectMonthYear(n, this, "Y"), !1
                        }
                    };
                    t(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
                })
            },
            _generateHTML: function(t) {
                var e, i, n, s, r, o, a, l, c, u, h, d, p, f, m, g, v, y, b, w, _, x, C, k, T, M, E, D, S, I, j, $, P, A, H, N, O, z, L, R = new Date,
                    F = this._daylightSavingAdjust(new Date(R.getFullYear(), R.getMonth(), R.getDate())),
                    B = this._get(t, "isRTL"),
                    W = this._get(t, "showButtonPanel"),
                    Q = this._get(t, "hideIfNoPrevNext"),
                    q = this._get(t, "navigationAsDateFormat"),
                    U = this._getNumberOfMonths(t),
                    Y = this._get(t, "showCurrentAtPos"),
                    V = this._get(t, "stepMonths"),
                    K = 1 !== U[0] || 1 !== U[1],
                    X = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
                    G = this._getMinMaxDate(t, "min"),
                    J = this._getMinMaxDate(t, "max"),
                    Z = t.drawMonth - Y,
                    te = t.drawYear;
                if (0 > Z && (Z += 12, te--), J)
                    for (e = this._daylightSavingAdjust(new Date(J.getFullYear(), J.getMonth() - U[0] * U[1] + 1, J.getDate())), e = G && G > e ? G : e; this._daylightSavingAdjust(new Date(te, Z, 1)) > e;) Z--, 0 > Z && (Z = 11, te--);
                for (t.drawMonth = Z, t.drawYear = te, i = this._get(t, "prevText"), i = q ? this.formatDate(i, this._daylightSavingAdjust(new Date(te, Z - V, 1)), this._getFormatConfig(t)) : i, n = this._canAdjustMonth(t, -1, te, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (B ? "e" : "w") + "'>" + i + "</span></a>" : Q ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (B ? "e" : "w") + "'>" + i + "</span></a>", s = this._get(t, "nextText"), s = q ? this.formatDate(s, this._daylightSavingAdjust(new Date(te, Z + V, 1)), this._getFormatConfig(t)) : s, r = this._canAdjustMonth(t, 1, te, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (B ? "w" : "e") + "'>" + s + "</span></a>" : Q ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (B ? "w" : "e") + "'>" + s + "</span></a>", o = this._get(t, "currentText"), a = this._get(t, "gotoCurrent") && t.currentDay ? X : F, o = q ? this.formatDate(o, a, this._getFormatConfig(t)) : o, l = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", c = W ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (B ? l : "") + (this._isInRange(t, a) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + o + "</button>" : "") + (B ? "" : l) + "</div>" : "", u = parseInt(this._get(t, "firstDay"), 10), u = isNaN(u) ? 0 : u, h = this._get(t, "showWeek"), d = this._get(t, "dayNames"), p = this._get(t, "dayNamesMin"), f = this._get(t, "monthNames"), m = this._get(t, "monthNamesShort"), g = this._get(t, "beforeShowDay"), v = this._get(t, "showOtherMonths"), y = this._get(t, "selectOtherMonths"), b = this._getDefaultDate(t), w = "", x = 0; x < U[0]; x++) {
                    for (C = "", this.maxRows = 4, k = 0; k < U[1]; k++) {
                        if (T = this._daylightSavingAdjust(new Date(te, Z, t.selectedDay)), M = " ui-corner-all", E = "", K) {
                            if (E += "<div class='ui-datepicker-group", U[1] > 1) switch (k) {
                                case 0:
                                    E += " ui-datepicker-group-first", M = " ui-corner-" + (B ? "right" : "left");
                                    break;
                                case U[1] - 1:
                                    E += " ui-datepicker-group-last", M = " ui-corner-" + (B ? "left" : "right");
                                    break;
                                default:
                                    E += " ui-datepicker-group-middle", M = ""
                            }
                            E += "'>"
                        }
                        for (E += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + M + "'>" + (/all|left/.test(M) && 0 === x ? B ? r : n : "") + (/all|right/.test(M) && 0 === x ? B ? n : r : "") + this._generateMonthYearHeader(t, Z, te, G, J, x > 0 || k > 0, f, m) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", D = h ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", _ = 0; 7 > _; _++) S = (_ + u) % 7, D += "<th" + ((_ + u + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + d[S] + "'>" + p[S] + "</span></th>";
                        for (E += D + "</tr></thead><tbody>", I = this._getDaysInMonth(te, Z), te === t.selectedYear && Z === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, I)), j = (this._getFirstDayOfMonth(te, Z) - u + 7) % 7, $ = Math.ceil((j + I) / 7), P = K ? this.maxRows > $ ? this.maxRows : $ : $, this.maxRows = P, A = this._daylightSavingAdjust(new Date(te, Z, 1 - j)), H = 0; P > H; H++) {
                            for (E += "<tr>", N = h ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(A) + "</td>" : "", _ = 0; 7 > _; _++) O = g ? g.apply(t.input ? t.input[0] : null, [A]) : [!0, ""], z = A.getMonth() !== Z, L = z && !y || !O[0] || G && G > A || J && A > J, N += "<td class='" + ((_ + u + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (z ? " ui-datepicker-other-month" : "") + (A.getTime() === T.getTime() && Z === t.selectedMonth && t._keyEvent || b.getTime() === A.getTime() && b.getTime() === T.getTime() ? " " + this._dayOverClass : "") + (L ? " " + this._unselectableClass + " ui-state-disabled" : "") + (z && !v ? "" : " " + O[1] + (A.getTime() === X.getTime() ? " " + this._currentClass : "") + (A.getTime() === F.getTime() ? " ui-datepicker-today" : "")) + "'" + (z && !v || !O[2] ? "" : " title='" + O[2].replace(/'/g, "&#39;") + "'") + (L ? "" : " data-handler='selectDay' data-event='click' data-month='" + A.getMonth() + "' data-year='" + A.getFullYear() + "'") + ">" + (z && !v ? "&#xa0;" : L ? "<span class='ui-state-default'>" + A.getDate() + "</span>" : "<a class='ui-state-default" + (A.getTime() === F.getTime() ? " ui-state-highlight" : "") + (A.getTime() === X.getTime() ? " ui-state-active" : "") + (z ? " ui-priority-secondary" : "") + "' href='#'>" + A.getDate() + "</a>") + "</td>", A.setDate(A.getDate() + 1), A = this._daylightSavingAdjust(A);
                            E += N + "</tr>"
                        }
                        Z++, Z > 11 && (Z = 0, te++), E += "</tbody></table>" + (K ? "</div>" + (U[0] > 0 && k === U[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), C += E
                    }
                    w += C
                }
                return w += c, t._keyEvent = !1, w
            },
            _generateMonthYearHeader: function(t, e, i, n, s, r, o, a) {
                var l, c, u, h, d, p, f, m, g = this._get(t, "changeMonth"),
                    v = this._get(t, "changeYear"),
                    y = this._get(t, "showMonthAfterYear"),
                    b = "<div class='ui-datepicker-title'>",
                    w = "";
                if (r || !g) w += "<span class='ui-datepicker-month'>" + o[e] + "</span>";
                else {
                    for (l = n && n.getFullYear() === i, c = s && s.getFullYear() === i, w += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", u = 0; 12 > u; u++)(!l || u >= n.getMonth()) && (!c || u <= s.getMonth()) && (w += "<option value='" + u + "'" + (u === e ? " selected='selected'" : "") + ">" + a[u] + "</option>");
                    w += "</select>"
                }
                if (y || (b += w + (!r && g && v ? "" : "&#xa0;")), !t.yearshtml)
                    if (t.yearshtml = "", r || !v) b += "<span class='ui-datepicker-year'>" + i + "</span>";
                    else {
                        for (h = this._get(t, "yearRange").split(":"), d = (new Date).getFullYear(), p = function(t) {
                                var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10);
                                return isNaN(e) ? d : e
                            }, f = p(h[0]), m = Math.max(f, p(h[1] || "")), f = n ? Math.max(f, n.getFullYear()) : f, m = s ? Math.min(m, s.getFullYear()) : m, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; m >= f; f++) t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
                        t.yearshtml += "</select>", b += t.yearshtml, t.yearshtml = null
                    }
                return b += this._get(t, "yearSuffix"), y && (b += (!r && g && v ? "" : "&#xa0;") + w), b += "</div>"
            },
            _adjustInstDate: function(t, e, i) {
                var n = t.drawYear + ("Y" === i ? e : 0),
                    s = t.drawMonth + ("M" === i ? e : 0),
                    r = Math.min(t.selectedDay, this._getDaysInMonth(n, s)) + ("D" === i ? e : 0),
                    o = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(n, s, r)));
                t.selectedDay = o.getDate(), t.drawMonth = t.selectedMonth = o.getMonth(), t.drawYear = t.selectedYear = o.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(t)
            },
            _restrictMinMax: function(t, e) {
                var i = this._getMinMaxDate(t, "min"),
                    n = this._getMinMaxDate(t, "max"),
                    s = i && i > e ? i : e;
                return n && s > n ? n : s
            },
            _notifyChange: function(t) {
                var e = this._get(t, "onChangeMonthYear");
                e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
            },
            _getNumberOfMonths: function(t) {
                var e = this._get(t, "numberOfMonths");
                return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e
            },
            _getMinMaxDate: function(t, e) {
                return this._determineDate(t, this._get(t, e + "Date"), null)
            },
            _getDaysInMonth: function(t, e) {
                return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate()
            },
            _getFirstDayOfMonth: function(t, e) {
                return new Date(t, e, 1).getDay()
            },
            _canAdjustMonth: function(t, e, i, n) {
                var s = this._getNumberOfMonths(t),
                    r = this._daylightSavingAdjust(new Date(i, n + (0 > e ? e : s[0] * s[1]), 1));
                return 0 > e && r.setDate(this._getDaysInMonth(r.getFullYear(), r.getMonth())), this._isInRange(t, r)
            },
            _isInRange: function(t, e) {
                var i, n, s = this._getMinMaxDate(t, "min"),
                    r = this._getMinMaxDate(t, "max"),
                    o = null,
                    a = null,
                    l = this._get(t, "yearRange");
                return l && (i = l.split(":"), n = (new Date).getFullYear(), o = parseInt(i[0], 10), a = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (o += n), i[1].match(/[+\-].*/) && (a += n)), (!s || e.getTime() >= s.getTime()) && (!r || e.getTime() <= r.getTime()) && (!o || e.getFullYear() >= o) && (!a || e.getFullYear() <= a)
            },
            _getFormatConfig: function(t) {
                var e = this._get(t, "shortYearCutoff");
                return e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10), {
                    shortYearCutoff: e,
                    dayNamesShort: this._get(t, "dayNamesShort"),
                    dayNames: this._get(t, "dayNames"),
                    monthNamesShort: this._get(t, "monthNamesShort"),
                    monthNames: this._get(t, "monthNames")
                }
            },
            _formatDate: function(t, e, i, n) {
                e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
                var s = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(n, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
                return this.formatDate(this._get(t, "dateFormat"), s, this._getFormatConfig(t))
            }
        }), t.fn.datepicker = function(e) {
            if (!this.length) return this;
            t.datepicker.initialized || (t(document).mousedown(t.datepicker._checkExternalClick), t.datepicker.initialized = !0), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);
            var i = Array.prototype.slice.call(arguments, 1);
            return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) : this.each(function() {
                "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e)
            }) : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i))
        }, t.datepicker = new i, t.datepicker.initialized = !1, t.datepicker.uuid = (new Date).getTime(), t.datepicker.version = "1.10.3"
    }(jQuery),
    function(t) {
        var e = !1;
        t(document).mouseup(function() {
            e = !1
        }), t.widget("ui.mouse", {
            version: "1.10.3",
            options: {
                cancel: "input,textarea,button,select,option",
                distance: 1,
                delay: 0
            },
            _mouseInit: function() {
                var e = this;
                this.element.bind("mousedown." + this.widgetName, function(t) {
                    return e._mouseDown(t)
                }).bind("click." + this.widgetName, function(i) {
                    return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
                }), this.started = !1
            },
            _mouseDestroy: function() {
                this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            },
            _mouseDown: function(i) {
                if (!e) {
                    this._mouseStarted && this._mouseUp(i), this._mouseDownEvent = i;
                    var n = this,
                        s = 1 === i.which,
                        r = "string" == typeof this.options.cancel && i.target.nodeName ? t(i.target).closest(this.options.cancel).length : !1;
                    return s && !r && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                        n.mouseDelayMet = !0
                    }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === t.data(i.target, this.widgetName + ".preventClickEvent") && t.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t) {
                        return n._mouseMove(t)
                    }, this._mouseUpDelegate = function(t) {
                        return n._mouseUp(t)
                    }, t(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), e = !0, !0)) : !0
                }
            },
            _mouseMove: function(e) {
                return t.ui.ie && (!document.documentMode || document.documentMode < 9) && !e.button ? this._mouseUp(e) : this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
            },
            _mouseUp: function(e) {
                return t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), !1
            },
            _mouseDistanceMet: function(t) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
            },
            _mouseDelayMet: function() {
                return this.mouseDelayMet
            },
            _mouseStart: function() {},
            _mouseDrag: function() {},
            _mouseStop: function() {},
            _mouseCapture: function() {
                return !0
            }
        })
    }(jQuery),
    function(t) {
        t.widget("ui.draggable", t.ui.mouse, {
            version: "1.10.3",
            widgetEventPrefix: "drag",
            options: {
                addClasses: !0,
                appendTo: "parent",
                axis: !1,
                connectToSortable: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                iframeFix: !1,
                opacity: !1,
                refreshPositions: !1,
                revert: !1,
                revertDuration: 500,
                scope: "default",
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                snap: !1,
                snapMode: "both",
                snapTolerance: 20,
                stack: !1,
                zIndex: !1,
                drag: null,
                start: null,
                stop: null
            },
            _create: function() {
                "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
            },
            _destroy: function() {
                this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
            },
            _mouseCapture: function(e) {
                var i = this.options;
                return this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e), this.handle ? (t(i.iframeFix === !0 ? "iframe" : i.iframeFix).each(function() {
                    t("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                        width: this.offsetWidth + "px",
                        height: this.offsetHeight + "px",
                        position: "absolute",
                        opacity: "0.001",
                        zIndex: 1e3
                    }).css(t(this).offset()).appendTo("body")
                }), !0) : !1)
            },
            _mouseStart: function(e) {
                var i = this.options;
                return this.helper = this._createHelper(e), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, this.offset.scroll = !1, t.extend(this.offset, {
                    click: {
                        left: e.pageX - this.offset.left,
                        top: e.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.originalPosition = this.position = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
            },
            _mouseDrag: function(e, i) {
                if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                    var n = this._uiHash();
                    if (this._trigger("drag", e, n) === !1) return this._mouseUp({}), !1;
                    this.position = n.position
                }
                return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1
            },
            _mouseStop: function(e) {
                var i = this,
                    n = !1;
                return t.ui.ddmanager && !this.options.dropBehaviour && (n = t.ui.ddmanager.drop(this, e)), this.dropped && (n = this.dropped, this.dropped = !1), "original" !== this.options.helper || t.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !n || "valid" === this.options.revert && n || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, n) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    i._trigger("stop", e) !== !1 && i._clear()
                }) : this._trigger("stop", e) !== !1 && this._clear(), !1) : !1
            },
            _mouseUp: function(e) {
                return t("div.ui-draggable-iframeFix").each(function() {
                    this.parentNode.removeChild(this)
                }), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), t.ui.mouse.prototype._mouseUp.call(this, e)
            },
            cancel: function() {
                return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
            },
            _getHandle: function(e) {
                return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : !0
            },
            _createHelper: function(e) {
                var i = this.options,
                    n = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
                return n.parents("body").length || n.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), n[0] === this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"), n
            },
            _adjustOffsetFromHelper: function(e) {
                "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                    left: +e[0],
                    top: +e[1] || 0
                }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
            },
            _getParentOffset: function() {
                var e = this.offsetParent.offset();
                return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                    top: 0,
                    left: 0
                }), {
                    top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if ("relative" === this.cssPosition) {
                    var t = this.element.position();
                    return {
                        top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                        left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.element.css("marginLeft"), 10) || 0,
                    top: parseInt(this.element.css("marginTop"), 10) || 0,
                    right: parseInt(this.element.css("marginRight"), 10) || 0,
                    bottom: parseInt(this.element.css("marginBottom"), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var e, i, n, s = this.options;
                return s.containment ? "window" === s.containment ? (this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : "document" === s.containment ? (this.containment = [0, 0, t(document).width() - this.helperProportions.width - this.margins.left, (t(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : s.containment.constructor === Array ? (this.containment = s.containment, void 0) : ("parent" === s.containment && (s.containment = this.helper[0].parentNode), i = t(s.containment), n = i[0], n && (e = "hidden" !== i.css("overflow"), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(n.scrollWidth, n.offsetWidth) : n.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(n.scrollHeight, n.offsetHeight) : n.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = i), void 0) : (this.containment = null, void 0)
            },
            _convertPositionTo: function(e, i) {
                i || (i = this.position);
                var n = "absolute" === e ? 1 : -1,
                    s = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
                return this.offset.scroll || (this.offset.scroll = {
                    top: s.scrollTop(),
                    left: s.scrollLeft()
                }), {
                    top: i.top + this.offset.relative.top * n + this.offset.parent.top * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * n,
                    left: i.left + this.offset.relative.left * n + this.offset.parent.left * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * n
                }
            },
            _generatePosition: function(e) {
                var i, n, s, r, o = this.options,
                    a = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    l = e.pageX,
                    c = e.pageY;
                return this.offset.scroll || (this.offset.scroll = {
                    top: a.scrollTop(),
                    left: a.scrollLeft()
                }), this.originalPosition && (this.containment && (this.relative_container ? (n = this.relative_container.offset(), i = [this.containment[0] + n.left, this.containment[1] + n.top, this.containment[2] + n.left, this.containment[3] + n.top]) : i = this.containment, e.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), e.pageY - this.offset.click.top < i[1] && (c = i[1] + this.offset.click.top), e.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), e.pageY - this.offset.click.top > i[3] && (c = i[3] + this.offset.click.top)), o.grid && (s = o.grid[1] ? this.originalPageY + Math.round((c - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY, c = i ? s - this.offset.click.top >= i[1] || s - this.offset.click.top > i[3] ? s : s - this.offset.click.top >= i[1] ? s - o.grid[1] : s + o.grid[1] : s, r = o.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX, l = i ? r - this.offset.click.left >= i[0] || r - this.offset.click.left > i[2] ? r : r - this.offset.click.left >= i[0] ? r - o.grid[0] : r + o.grid[0] : r)), {
                    top: c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
                    left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
                }
            },
            _clear: function() {
                this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
            },
            _trigger: function(e, i, n) {
                return n = n || this._uiHash(), t.ui.plugin.call(this, e, [i, n]), "drag" === e && (this.positionAbs = this._convertPositionTo("absolute")), t.Widget.prototype._trigger.call(this, e, i, n)
            },
            plugins: {},
            _uiHash: function() {
                return {
                    helper: this.helper,
                    position: this.position,
                    originalPosition: this.originalPosition,
                    offset: this.positionAbs
                }
            }
        }), t.ui.plugin.add("draggable", "connectToSortable", {
            start: function(e, i) {
                var n = t(this).data("ui-draggable"),
                    s = n.options,
                    r = t.extend({}, i, {
                        item: n.element
                    });
                n.sortables = [], t(s.connectToSortable).each(function() {
                    var i = t.data(this, "ui-sortable");
                    i && !i.options.disabled && (n.sortables.push({
                        instance: i,
                        shouldRevert: i.options.revert
                    }), i.refreshPositions(), i._trigger("activate", e, r))
                })
            },
            stop: function(e, i) {
                var n = t(this).data("ui-draggable"),
                    s = t.extend({}, i, {
                        item: n.element
                    });
                t.each(n.sortables, function() {
                    this.instance.isOver ? (this.instance.isOver = 0, n.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(e), this.instance.options.helper = this.instance.options._helper, "original" === n.options.helper && this.instance.currentItem.css({
                        top: "auto",
                        left: "auto"
                    })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", e, s))
                })
            },
            drag: function(e, i) {
                var n = t(this).data("ui-draggable"),
                    s = this;
                t.each(n.sortables, function() {
                    var r = !1,
                        o = this;
                    this.instance.positionAbs = n.positionAbs, this.instance.helperProportions = n.helperProportions, this.instance.offset.click = n.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (r = !0, t.each(n.sortables, function() {
                        return this.instance.positionAbs = n.positionAbs, this.instance.helperProportions = n.helperProportions, this.instance.offset.click = n.offset.click, this !== o && this.instance._intersectsWith(this.instance.containerCache) && t.contains(o.instance.element[0], this.instance.element[0]) && (r = !1), r
                    })), r ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = t(s).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                        return i.helper[0]
                    }, e.target = this.instance.currentItem[0], this.instance._mouseCapture(e, !0), this.instance._mouseStart(e, !0, !0), this.instance.offset.click.top = n.offset.click.top, this.instance.offset.click.left = n.offset.click.left, this.instance.offset.parent.left -= n.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= n.offset.parent.top - this.instance.offset.parent.top, n._trigger("toSortable", e), n.dropped = this.instance.element, n.currentItem = n.element, this.instance.fromOutside = n), this.instance.currentItem && this.instance._mouseDrag(e)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", e, this.instance._uiHash(this.instance)), this.instance._mouseStop(e, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), n._trigger("fromSortable", e), n.dropped = !1)
                })
            }
        }), t.ui.plugin.add("draggable", "cursor", {
            start: function() {
                var e = t("body"),
                    i = t(this).data("ui-draggable").options;
                e.css("cursor") && (i._cursor = e.css("cursor")), e.css("cursor", i.cursor)
            },
            stop: function() {
                var e = t(this).data("ui-draggable").options;
                e._cursor && t("body").css("cursor", e._cursor)
            }
        }), t.ui.plugin.add("draggable", "opacity", {
            start: function(e, i) {
                var n = t(i.helper),
                    s = t(this).data("ui-draggable").options;
                n.css("opacity") && (s._opacity = n.css("opacity")), n.css("opacity", s.opacity)
            },
            stop: function(e, i) {
                var n = t(this).data("ui-draggable").options;
                n._opacity && t(i.helper).css("opacity", n._opacity)
            }
        }), t.ui.plugin.add("draggable", "scroll", {
            start: function() {
                var e = t(this).data("ui-draggable");
                e.scrollParent[0] !== document && "HTML" !== e.scrollParent[0].tagName && (e.overflowOffset = e.scrollParent.offset())
            },
            drag: function(e) {
                var i = t(this).data("ui-draggable"),
                    n = i.options,
                    s = !1;
                i.scrollParent[0] !== document && "HTML" !== i.scrollParent[0].tagName ? (n.axis && "x" === n.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - e.pageY < n.scrollSensitivity ? i.scrollParent[0].scrollTop = s = i.scrollParent[0].scrollTop + n.scrollSpeed : e.pageY - i.overflowOffset.top < n.scrollSensitivity && (i.scrollParent[0].scrollTop = s = i.scrollParent[0].scrollTop - n.scrollSpeed)), n.axis && "y" === n.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - e.pageX < n.scrollSensitivity ? i.scrollParent[0].scrollLeft = s = i.scrollParent[0].scrollLeft + n.scrollSpeed : e.pageX - i.overflowOffset.left < n.scrollSensitivity && (i.scrollParent[0].scrollLeft = s = i.scrollParent[0].scrollLeft - n.scrollSpeed))) : (n.axis && "x" === n.axis || (e.pageY - t(document).scrollTop() < n.scrollSensitivity ? s = t(document).scrollTop(t(document).scrollTop() - n.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < n.scrollSensitivity && (s = t(document).scrollTop(t(document).scrollTop() + n.scrollSpeed))), n.axis && "y" === n.axis || (e.pageX - t(document).scrollLeft() < n.scrollSensitivity ? s = t(document).scrollLeft(t(document).scrollLeft() - n.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < n.scrollSensitivity && (s = t(document).scrollLeft(t(document).scrollLeft() + n.scrollSpeed)))), s !== !1 && t.ui.ddmanager && !n.dropBehaviour && t.ui.ddmanager.prepareOffsets(i, e)
            }
        }), t.ui.plugin.add("draggable", "snap", {
            start: function() {
                var e = t(this).data("ui-draggable"),
                    i = e.options;
                e.snapElements = [], t(i.snap.constructor !== String ? i.snap.items || ":data(ui-draggable)" : i.snap).each(function() {
                    var i = t(this),
                        n = i.offset();
                    this !== e.element[0] && e.snapElements.push({
                        item: this,
                        width: i.outerWidth(),
                        height: i.outerHeight(),
                        top: n.top,
                        left: n.left
                    })
                })
            },
            drag: function(e, i) {
                var n, s, r, o, a, l, c, u, h, d, p = t(this).data("ui-draggable"),
                    f = p.options,
                    m = f.snapTolerance,
                    g = i.offset.left,
                    v = g + p.helperProportions.width,
                    y = i.offset.top,
                    b = y + p.helperProportions.height;
                for (h = p.snapElements.length - 1; h >= 0; h--) a = p.snapElements[h].left, l = a + p.snapElements[h].width, c = p.snapElements[h].top, u = c + p.snapElements[h].height, a - m > v || g > l + m || c - m > b || y > u + m || !t.contains(p.snapElements[h].item.ownerDocument, p.snapElements[h].item) ? (p.snapElements[h].snapping && p.options.snap.release && p.options.snap.release.call(p.element, e, t.extend(p._uiHash(), {
                    snapItem: p.snapElements[h].item
                })), p.snapElements[h].snapping = !1) : ("inner" !== f.snapMode && (n = Math.abs(c - b) <= m, s = Math.abs(u - y) <= m, r = Math.abs(a - v) <= m, o = Math.abs(l - g) <= m, n && (i.position.top = p._convertPositionTo("relative", {
                    top: c - p.helperProportions.height,
                    left: 0
                }).top - p.margins.top), s && (i.position.top = p._convertPositionTo("relative", {
                    top: u,
                    left: 0
                }).top - p.margins.top), r && (i.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: a - p.helperProportions.width
                }).left - p.margins.left), o && (i.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: l
                }).left - p.margins.left)), d = n || s || r || o, "outer" !== f.snapMode && (n = Math.abs(c - y) <= m, s = Math.abs(u - b) <= m, r = Math.abs(a - g) <= m, o = Math.abs(l - v) <= m, n && (i.position.top = p._convertPositionTo("relative", {
                    top: c,
                    left: 0
                }).top - p.margins.top), s && (i.position.top = p._convertPositionTo("relative", {
                    top: u - p.helperProportions.height,
                    left: 0
                }).top - p.margins.top), r && (i.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: a
                }).left - p.margins.left), o && (i.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: l - p.helperProportions.width
                }).left - p.margins.left)), !p.snapElements[h].snapping && (n || s || r || o || d) && p.options.snap.snap && p.options.snap.snap.call(p.element, e, t.extend(p._uiHash(), {
                    snapItem: p.snapElements[h].item
                })), p.snapElements[h].snapping = n || s || r || o || d)
            }
        }), t.ui.plugin.add("draggable", "stack", {
            start: function() {
                var e, i = this.data("ui-draggable").options,
                    n = t.makeArray(t(i.stack)).sort(function(e, i) {
                        return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0)
                    });
                n.length && (e = parseInt(t(n[0]).css("zIndex"), 10) || 0, t(n).each(function(i) {
                    t(this).css("zIndex", e + i)
                }), this.css("zIndex", e + n.length))
            }
        }), t.ui.plugin.add("draggable", "zIndex", {
            start: function(e, i) {
                var n = t(i.helper),
                    s = t(this).data("ui-draggable").options;
                n.css("zIndex") && (s._zIndex = n.css("zIndex")), n.css("zIndex", s.zIndex)
            },
            stop: function(e, i) {
                var n = t(this).data("ui-draggable").options;
                n._zIndex && t(i.helper).css("zIndex", n._zIndex)
            }
        })
    }(jQuery),
    function(t) {
        function e(t) {
            return parseInt(t, 10) || 0
        }

        function i(t) {
            return !isNaN(parseInt(t, 10))
        }
        t.widget("ui.resizable", t.ui.mouse, {
            version: "1.10.3",
            widgetEventPrefix: "resize",
            options: {
                alsoResize: !1,
                animate: !1,
                animateDuration: "slow",
                animateEasing: "swing",
                aspectRatio: !1,
                autoHide: !1,
                containment: !1,
                ghost: !1,
                grid: !1,
                handles: "e,s,se",
                helper: !1,
                maxHeight: null,
                maxWidth: null,
                minHeight: 10,
                minWidth: 10,
                zIndex: 90,
                resize: null,
                start: null,
                stop: null
            },
            _create: function() {
                var e, i, n, s, r, o = this,
                    a = this.options;
                if (this.element.addClass("ui-resizable"), t.extend(this, {
                        _aspectRatio: !!a.aspectRatio,
                        aspectRatio: a.aspectRatio,
                        originalElement: this.element,
                        _proportionallyResizeElements: [],
                        _helper: a.helper || a.ghost || a.animate ? a.helper || "ui-resizable-helper" : null
                    }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                        position: this.element.css("position"),
                        width: this.element.outerWidth(),
                        height: this.element.outerHeight(),
                        top: this.element.css("top"),
                        left: this.element.css("left")
                    })), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), this.elementIsWrapper = !0, this.element.css({
                        marginLeft: this.originalElement.css("marginLeft"),
                        marginTop: this.originalElement.css("marginTop"),
                        marginRight: this.originalElement.css("marginRight"),
                        marginBottom: this.originalElement.css("marginBottom")
                    }), this.originalElement.css({
                        marginLeft: 0,
                        marginTop: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                        position: "static",
                        zoom: 1,
                        display: "block"
                    })), this.originalElement.css({
                        margin: this.originalElement.css("margin")
                    }), this._proportionallyResize()), this.handles = a.handles || (t(".ui-resizable-handle", this.element).length ? {
                        n: ".ui-resizable-n",
                        e: ".ui-resizable-e",
                        s: ".ui-resizable-s",
                        w: ".ui-resizable-w",
                        se: ".ui-resizable-se",
                        sw: ".ui-resizable-sw",
                        ne: ".ui-resizable-ne",
                        nw: ".ui-resizable-nw"
                    } : "e,s,se"), this.handles.constructor === String)
                    for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), e = this.handles.split(","), this.handles = {}, i = 0; i < e.length; i++) n = t.trim(e[i]), r = "ui-resizable-" + n, s = t("<div class='ui-resizable-handle " + r + "'></div>"), s.css({
                        zIndex: a.zIndex
                    }), "se" === n && s.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[n] = ".ui-resizable-" + n, this.element.append(s);
                this._renderAxis = function(e) {
                    var i, n, s, r;
                    e = e || this.element;
                    for (i in this.handles) this.handles[i].constructor === String && (this.handles[i] = t(this.handles[i], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (n = t(this.handles[i], this.element), r = /sw|ne|nw|se|n|s/.test(i) ? n.outerHeight() : n.outerWidth(), s = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), e.css(s, r), this._proportionallyResize()), t(this.handles[i]).length
                }, this._renderAxis(this.element), this._handles = t(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
                    o.resizing || (this.className && (s = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), o.axis = s && s[1] ? s[1] : "se")
                }), a.autoHide && (this._handles.hide(), t(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                    a.disabled || (t(this).removeClass("ui-resizable-autohide"), o._handles.show())
                }).mouseleave(function() {
                    a.disabled || o.resizing || (t(this).addClass("ui-resizable-autohide"), o._handles.hide())
                })), this._mouseInit()
            },
            _destroy: function() {
                this._mouseDestroy();
                var e, i = function(e) {
                    t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
                };
                return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({
                    position: e.css("position"),
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    top: e.css("top"),
                    left: e.css("left")
                }).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
            },
            _mouseCapture: function(e) {
                var i, n, s = !1;
                for (i in this.handles) n = t(this.handles[i])[0], (n === e.target || t.contains(n, e.target)) && (s = !0);
                return !this.options.disabled && s
            },
            _mouseStart: function(i) {
                var n, s, r, o = this.options,
                    a = this.element.position(),
                    l = this.element;
                return this.resizing = !0, /absolute/.test(l.css("position")) ? l.css({
                    position: "absolute",
                    top: l.css("top"),
                    left: l.css("left")
                }) : l.is(".ui-draggable") && l.css({
                    position: "absolute",
                    top: a.top,
                    left: a.left
                }), this._renderProxy(), n = e(this.helper.css("left")), s = e(this.helper.css("top")), o.containment && (n += t(o.containment).scrollLeft() || 0, s += t(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                    left: n,
                    top: s
                }, this.size = this._helper ? {
                    width: l.outerWidth(),
                    height: l.outerHeight()
                } : {
                    width: l.width(),
                    height: l.height()
                }, this.originalSize = this._helper ? {
                    width: l.outerWidth(),
                    height: l.outerHeight()
                } : {
                    width: l.width(),
                    height: l.height()
                }, this.originalPosition = {
                    left: n,
                    top: s
                }, this.sizeDiff = {
                    width: l.outerWidth() - l.width(),
                    height: l.outerHeight() - l.height()
                }, this.originalMousePosition = {
                    left: i.pageX,
                    top: i.pageY
                }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, r = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === r ? this.axis + "-resize" : r), l.addClass("ui-resizable-resizing"), this._propagate("start", i), !0
            },
            _mouseDrag: function(e) {
                var i, n = this.helper,
                    s = {},
                    r = this.originalMousePosition,
                    o = this.axis,
                    a = this.position.top,
                    l = this.position.left,
                    c = this.size.width,
                    u = this.size.height,
                    h = e.pageX - r.left || 0,
                    d = e.pageY - r.top || 0,
                    p = this._change[o];
                return p ? (i = p.apply(this, [e, h, d]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate("resize", e), this.position.top !== a && (s.top = this.position.top + "px"), this.position.left !== l && (s.left = this.position.left + "px"), this.size.width !== c && (s.width = this.size.width + "px"), this.size.height !== u && (s.height = this.size.height + "px"), n.css(s), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(s) || this._trigger("resize", e, this.ui()), !1) : !1
            },
            _mouseStop: function(e) {
                this.resizing = !1;
                var i, n, s, r, o, a, l, c = this.options,
                    u = this;
                return this._helper && (i = this._proportionallyResizeElements, n = i.length && /textarea/i.test(i[0].nodeName), s = n && t.ui.hasScroll(i[0], "left") ? 0 : u.sizeDiff.height, r = n ? 0 : u.sizeDiff.width, o = {
                    width: u.helper.width() - r,
                    height: u.helper.height() - s
                }, a = parseInt(u.element.css("left"), 10) + (u.position.left - u.originalPosition.left) || null, l = parseInt(u.element.css("top"), 10) + (u.position.top - u.originalPosition.top) || null, c.animate || this.element.css(t.extend(o, {
                    top: l,
                    left: a
                })), u.helper.height(u.size.height), u.helper.width(u.size.width), this._helper && !c.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1
            },
            _updateVirtualBoundaries: function(t) {
                var e, n, s, r, o, a = this.options;
                o = {
                    minWidth: i(a.minWidth) ? a.minWidth : 0,
                    maxWidth: i(a.maxWidth) ? a.maxWidth : 1 / 0,
                    minHeight: i(a.minHeight) ? a.minHeight : 0,
                    maxHeight: i(a.maxHeight) ? a.maxHeight : 1 / 0
                }, (this._aspectRatio || t) && (e = o.minHeight * this.aspectRatio, s = o.minWidth / this.aspectRatio, n = o.maxHeight * this.aspectRatio, r = o.maxWidth / this.aspectRatio, e > o.minWidth && (o.minWidth = e), s > o.minHeight && (o.minHeight = s), n < o.maxWidth && (o.maxWidth = n), r < o.maxHeight && (o.maxHeight = r)), this._vBoundaries = o
            },
            _updateCache: function(t) {
                this.offset = this.helper.offset(), i(t.left) && (this.position.left = t.left), i(t.top) && (this.position.top = t.top), i(t.height) && (this.size.height = t.height), i(t.width) && (this.size.width = t.width)
            },
            _updateRatio: function(t) {
                var e = this.position,
                    n = this.size,
                    s = this.axis;
                return i(t.height) ? t.width = t.height * this.aspectRatio : i(t.width) && (t.height = t.width / this.aspectRatio), "sw" === s && (t.left = e.left + (n.width - t.width), t.top = null), "nw" === s && (t.top = e.top + (n.height - t.height), t.left = e.left + (n.width - t.width)), t
            },
            _respectSize: function(t) {
                var e = this._vBoundaries,
                    n = this.axis,
                    s = i(t.width) && e.maxWidth && e.maxWidth < t.width,
                    r = i(t.height) && e.maxHeight && e.maxHeight < t.height,
                    o = i(t.width) && e.minWidth && e.minWidth > t.width,
                    a = i(t.height) && e.minHeight && e.minHeight > t.height,
                    l = this.originalPosition.left + this.originalSize.width,
                    c = this.position.top + this.size.height,
                    u = /sw|nw|w/.test(n),
                    h = /nw|ne|n/.test(n);
                return o && (t.width = e.minWidth), a && (t.height = e.minHeight), s && (t.width = e.maxWidth), r && (t.height = e.maxHeight), o && u && (t.left = l - e.minWidth), s && u && (t.left = l - e.maxWidth), a && h && (t.top = c - e.minHeight), r && h && (t.top = c - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t
            },
            _proportionallyResize: function() {
                if (this._proportionallyResizeElements.length) {
                    var t, e, i, n, s, r = this.helper || this.element;
                    for (t = 0; t < this._proportionallyResizeElements.length; t++) {
                        if (s = this._proportionallyResizeElements[t], !this.borderDif)
                            for (this.borderDif = [], i = [s.css("borderTopWidth"), s.css("borderRightWidth"), s.css("borderBottomWidth"), s.css("borderLeftWidth")], n = [s.css("paddingTop"), s.css("paddingRight"), s.css("paddingBottom"), s.css("paddingLeft")], e = 0; e < i.length; e++) this.borderDif[e] = (parseInt(i[e], 10) || 0) + (parseInt(n[e], 10) || 0);
                        s.css({
                            height: r.height() - this.borderDif[0] - this.borderDif[2] || 0,
                            width: r.width() - this.borderDif[1] - this.borderDif[3] || 0
                        })
                    }
                }
            },
            _renderProxy: function() {
                var e = this.element,
                    i = this.options;
                this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() - 1,
                    height: this.element.outerHeight() - 1,
                    position: "absolute",
                    left: this.elementOffset.left + "px",
                    top: this.elementOffset.top + "px",
                    zIndex: ++i.zIndex
                }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
            },
            _change: {
                e: function(t, e) {
                    return {
                        width: this.originalSize.width + e
                    }
                },
                w: function(t, e) {
                    var i = this.originalSize,
                        n = this.originalPosition;
                    return {
                        left: n.left + e,
                        width: i.width - e
                    }
                },
                n: function(t, e, i) {
                    var n = this.originalSize,
                        s = this.originalPosition;
                    return {
                        top: s.top + i,
                        height: n.height - i
                    }
                },
                s: function(t, e, i) {
                    return {
                        height: this.originalSize.height + i
                    }
                },
                se: function(e, i, n) {
                    return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, n]))
                },
                sw: function(e, i, n) {
                    return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, n]))
                },
                ne: function(e, i, n) {
                    return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, n]))
                },
                nw: function(e, i, n) {
                    return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, n]))
                }
            },
            _propagate: function(e, i) {
                t.ui.plugin.call(this, e, [i, this.ui()]), "resize" !== e && this._trigger(e, i, this.ui())
            },
            plugins: {},
            ui: function() {
                return {
                    originalElement: this.originalElement,
                    element: this.element,
                    helper: this.helper,
                    position: this.position,
                    size: this.size,
                    originalSize: this.originalSize,
                    originalPosition: this.originalPosition
                }
            }
        }), t.ui.plugin.add("resizable", "animate", {
            stop: function(e) {
                var i = t(this).data("ui-resizable"),
                    n = i.options,
                    s = i._proportionallyResizeElements,
                    r = s.length && /textarea/i.test(s[0].nodeName),
                    o = r && t.ui.hasScroll(s[0], "left") ? 0 : i.sizeDiff.height,
                    a = r ? 0 : i.sizeDiff.width,
                    l = {
                        width: i.size.width - a,
                        height: i.size.height - o
                    },
                    c = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
                    u = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
                i.element.animate(t.extend(l, u && c ? {
                    top: u,
                    left: c
                } : {}), {
                    duration: n.animateDuration,
                    easing: n.animateEasing,
                    step: function() {
                        var n = {
                            width: parseInt(i.element.css("width"), 10),
                            height: parseInt(i.element.css("height"), 10),
                            top: parseInt(i.element.css("top"), 10),
                            left: parseInt(i.element.css("left"), 10)
                        };
                        s && s.length && t(s[0]).css({
                            width: n.width,
                            height: n.height
                        }), i._updateCache(n), i._propagate("resize", e)
                    }
                })
            }
        }), t.ui.plugin.add("resizable", "containment", {
            start: function() {
                var i, n, s, r, o, a, l, c = t(this).data("ui-resizable"),
                    u = c.options,
                    h = c.element,
                    d = u.containment,
                    p = d instanceof t ? d.get(0) : /parent/.test(d) ? h.parent().get(0) : d;
                p && (c.containerElement = t(p), /document/.test(d) || d === document ? (c.containerOffset = {
                    left: 0,
                    top: 0
                }, c.containerPosition = {
                    left: 0,
                    top: 0
                }, c.parentData = {
                    element: t(document),
                    left: 0,
                    top: 0,
                    width: t(document).width(),
                    height: t(document).height() || document.body.parentNode.scrollHeight
                }) : (i = t(p), n = [], t(["Top", "Right", "Left", "Bottom"]).each(function(t, s) {
                    n[t] = e(i.css("padding" + s))
                }), c.containerOffset = i.offset(), c.containerPosition = i.position(), c.containerSize = {
                    height: i.innerHeight() - n[3],
                    width: i.innerWidth() - n[1]
                }, s = c.containerOffset, r = c.containerSize.height, o = c.containerSize.width, a = t.ui.hasScroll(p, "left") ? p.scrollWidth : o, l = t.ui.hasScroll(p) ? p.scrollHeight : r, c.parentData = {
                    element: p,
                    left: s.left,
                    top: s.top,
                    width: a,
                    height: l
                }))
            },
            resize: function(e) {
                var i, n, s, r, o = t(this).data("ui-resizable"),
                    a = o.options,
                    l = o.containerOffset,
                    c = o.position,
                    u = o._aspectRatio || e.shiftKey,
                    h = {
                        top: 0,
                        left: 0
                    },
                    d = o.containerElement;
                d[0] !== document && /static/.test(d.css("position")) && (h = l), c.left < (o._helper ? l.left : 0) && (o.size.width = o.size.width + (o._helper ? o.position.left - l.left : o.position.left - h.left), u && (o.size.height = o.size.width / o.aspectRatio), o.position.left = a.helper ? l.left : 0), c.top < (o._helper ? l.top : 0) && (o.size.height = o.size.height + (o._helper ? o.position.top - l.top : o.position.top), u && (o.size.width = o.size.height * o.aspectRatio), o.position.top = o._helper ? l.top : 0), o.offset.left = o.parentData.left + o.position.left, o.offset.top = o.parentData.top + o.position.top, i = Math.abs((o._helper ? o.offset.left - h.left : o.offset.left - h.left) + o.sizeDiff.width), n = Math.abs((o._helper ? o.offset.top - h.top : o.offset.top - l.top) + o.sizeDiff.height), s = o.containerElement.get(0) === o.element.parent().get(0), r = /relative|absolute/.test(o.containerElement.css("position")), s && r && (i -= o.parentData.left), i + o.size.width >= o.parentData.width && (o.size.width = o.parentData.width - i, u && (o.size.height = o.size.width / o.aspectRatio)), n + o.size.height >= o.parentData.height && (o.size.height = o.parentData.height - n, u && (o.size.width = o.size.height * o.aspectRatio))
            },
            stop: function() {
                var e = t(this).data("ui-resizable"),
                    i = e.options,
                    n = e.containerOffset,
                    s = e.containerPosition,
                    r = e.containerElement,
                    o = t(e.helper),
                    a = o.offset(),
                    l = o.outerWidth() - e.sizeDiff.width,
                    c = o.outerHeight() - e.sizeDiff.height;
                e._helper && !i.animate && /relative/.test(r.css("position")) && t(this).css({
                    left: a.left - s.left - n.left,
                    width: l,
                    height: c
                }), e._helper && !i.animate && /static/.test(r.css("position")) && t(this).css({
                    left: a.left - s.left - n.left,
                    width: l,
                    height: c
                })
            }
        }), t.ui.plugin.add("resizable", "alsoResize", {
            start: function() {
                var e = t(this).data("ui-resizable"),
                    i = e.options,
                    n = function(e) {
                        t(e).each(function() {
                            var e = t(this);
                            e.data("ui-resizable-alsoresize", {
                                width: parseInt(e.width(), 10),
                                height: parseInt(e.height(), 10),
                                left: parseInt(e.css("left"), 10),
                                top: parseInt(e.css("top"), 10)
                            })
                        })
                    };
                "object" != typeof i.alsoResize || i.alsoResize.parentNode ? n(i.alsoResize) : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], n(i.alsoResize)) : t.each(i.alsoResize, function(t) {
                    n(t)
                })
            },
            resize: function(e, i) {
                var n = t(this).data("ui-resizable"),
                    s = n.options,
                    r = n.originalSize,
                    o = n.originalPosition,
                    a = {
                        height: n.size.height - r.height || 0,
                        width: n.size.width - r.width || 0,
                        top: n.position.top - o.top || 0,
                        left: n.position.left - o.left || 0
                    },
                    l = function(e, n) {
                        t(e).each(function() {
                            var e = t(this),
                                s = t(this).data("ui-resizable-alsoresize"),
                                r = {},
                                o = n && n.length ? n : e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                            t.each(o, function(t, e) {
                                var i = (s[e] || 0) + (a[e] || 0);
                                i && i >= 0 && (r[e] = i || null)
                            }), e.css(r)
                        })
                    };
                "object" != typeof s.alsoResize || s.alsoResize.nodeType ? l(s.alsoResize) : t.each(s.alsoResize, function(t, e) {
                    l(t, e)
                })
            },
            stop: function() {
                t(this).removeData("resizable-alsoresize")
            }
        }), t.ui.plugin.add("resizable", "ghost", {
            start: function() {
                var e = t(this).data("ui-resizable"),
                    i = e.options,
                    n = e.size;
                e.ghost = e.originalElement.clone(), e.ghost.css({
                    opacity: .25,
                    display: "block",
                    position: "relative",
                    height: n.height,
                    width: n.width,
                    margin: 0,
                    left: 0,
                    top: 0
                }).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""), e.ghost.appendTo(e.helper)
            },
            resize: function() {
                var e = t(this).data("ui-resizable");
                e.ghost && e.ghost.css({
                    position: "relative",
                    height: e.size.height,
                    width: e.size.width
                })
            },
            stop: function() {
                var e = t(this).data("ui-resizable");
                e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
            }
        }), t.ui.plugin.add("resizable", "grid", {
            resize: function() {
                var e = t(this).data("ui-resizable"),
                    i = e.options,
                    n = e.size,
                    s = e.originalSize,
                    r = e.originalPosition,
                    o = e.axis,
                    a = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid,
                    l = a[0] || 1,
                    c = a[1] || 1,
                    u = Math.round((n.width - s.width) / l) * l,
                    h = Math.round((n.height - s.height) / c) * c,
                    d = s.width + u,
                    p = s.height + h,
                    f = i.maxWidth && i.maxWidth < d,
                    m = i.maxHeight && i.maxHeight < p,
                    g = i.minWidth && i.minWidth > d,
                    v = i.minHeight && i.minHeight > p;
                i.grid = a, g && (d += l), v && (p += c), f && (d -= l), m && (p -= c), /^(se|s|e)$/.test(o) ? (e.size.width = d, e.size.height = p) : /^(ne)$/.test(o) ? (e.size.width = d, e.size.height = p, e.position.top = r.top - h) : /^(sw)$/.test(o) ? (e.size.width = d, e.size.height = p, e.position.left = r.left - u) : (e.size.width = d, e.size.height = p, e.position.top = r.top - h, e.position.left = r.left - u)
            }
        })
    }(jQuery),
    function(t) {
        var e = {
                buttons: !0,
                height: !0,
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0,
                width: !0
            },
            i = {
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0
            };
        t.widget("ui.dialog", {
            version: "1.10.3",
            options: {
                appendTo: "body",
                autoOpen: !0,
                buttons: [],
                closeOnEscape: !0,
                closeText: "close",
                dialogClass: "",
                draggable: !0,
                hide: null,
                height: "auto",
                maxHeight: null,
                maxWidth: null,
                minHeight: 150,
                minWidth: 150,
                modal: !1,
                position: {
                    my: "center",
                    at: "center",
                    of: window,
                    collision: "fit",
                    using: function(e) {
                        var i = t(this).css(e).offset().top;
                        0 > i && t(this).css("top", e.top - i)
                    }
                },
                resizable: !0,
                show: null,
                title: null,
                width: 300,
                beforeClose: null,
                close: null,
                drag: null,
                dragStart: null,
                dragStop: null,
                focus: null,
                open: null,
                resize: null,
                resizeStart: null,
                resizeStop: null
            },
            _create: function() {
                this.originalCss = {
                    display: this.element[0].style.display,
                    width: this.element[0].style.width,
                    minHeight: this.element[0].style.minHeight,
                    maxHeight: this.element[0].style.maxHeight,
                    height: this.element[0].style.height
                }, this.originalPosition = {
                    parent: this.element.parent(),
                    index: this.element.parent().children().index(this.element)
                }, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, this._createWrapper(), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), this._createTitlebar(), this._createButtonPane(), this.options.draggable && t.fn.draggable && this._makeDraggable(), this.options.resizable && t.fn.resizable && this._makeResizable(), this._isOpen = !1
            },
            _init: function() {
                this.options.autoOpen && this.open()
            },
            _appendTo: function() {
                var e = this.options.appendTo;
                return e && (e.jquery || e.nodeType) ? t(e) : this.document.find(e || "body").eq(0)
            },
            _destroy: function() {
                var t, e = this.originalPosition;
                this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), this.uiDialog.stop(!0, !0).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), t = e.parent.children().eq(e.index), t.length && t[0] !== this.element[0] ? t.before(this.element) : e.parent.append(this.element)
            },
            widget: function() {
                return this.uiDialog
            },
            disable: t.noop,
            enable: t.noop,
            close: function(e) {
                var i = this;
                this._isOpen && this._trigger("beforeClose", e) !== !1 && (this._isOpen = !1, this._destroyOverlay(), this.opener.filter(":focusable").focus().length || t(this.document[0].activeElement).blur(), this._hide(this.uiDialog, this.options.hide, function() {
                    i._trigger("close", e)
                }))
            },
            isOpen: function() {
                return this._isOpen
            },
            moveToTop: function() {
                this._moveToTop()
            },
            _moveToTop: function(t, e) {
                var i = !!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;
                return i && !e && this._trigger("focus", t), i
            },
            open: function() {
                var e = this;
                return this._isOpen ? (this._moveToTop() && this._focusTabbable(), void 0) : (this._isOpen = !0, this.opener = t(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this._show(this.uiDialog, this.options.show, function() {
                    e._focusTabbable(), e._trigger("focus")
                }), this._trigger("open"), void 0)
            },
            _focusTabbable: function() {
                var t = this.element.find("[autofocus]");
                t.length || (t = this.element.find(":tabbable")), t.length || (t = this.uiDialogButtonPane.find(":tabbable")), t.length || (t = this.uiDialogTitlebarClose.filter(":tabbable")), t.length || (t = this.uiDialog), t.eq(0).focus()
            },
            _keepFocus: function(e) {
                function i() {
                    var e = this.document[0].activeElement,
                        i = this.uiDialog[0] === e || t.contains(this.uiDialog[0], e);
                    i || this._focusTabbable()
                }
                e.preventDefault(), i.call(this), this._delay(i)
            },
            _createWrapper: function() {
                this.uiDialog = t("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                    tabIndex: -1,
                    role: "dialog"
                }).appendTo(this._appendTo()), this._on(this.uiDialog, {
                    keydown: function(e) {
                        if (this.options.closeOnEscape && !e.isDefaultPrevented() && e.keyCode && e.keyCode === t.ui.keyCode.ESCAPE) return e.preventDefault(), this.close(e), void 0;
                        if (e.keyCode === t.ui.keyCode.TAB) {
                            var i = this.uiDialog.find(":tabbable"),
                                n = i.filter(":first"),
                                s = i.filter(":last");
                            e.target !== s[0] && e.target !== this.uiDialog[0] || e.shiftKey ? e.target !== n[0] && e.target !== this.uiDialog[0] || !e.shiftKey || (s.focus(1), e.preventDefault()) : (n.focus(1), e.preventDefault())
                        }
                    },
                    mousedown: function(t) {
                        this._moveToTop(t) && this._focusTabbable()
                    }
                }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                    "aria-describedby": this.element.uniqueId().attr("id")
                })
            },
            _createTitlebar: function() {
                var e;
                this.uiDialogTitlebar = t("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), this._on(this.uiDialogTitlebar, {
                    mousedown: function(e) {
                        t(e.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
                    }
                }), this.uiDialogTitlebarClose = t("<button></button>").button({
                    label: this.options.closeText,
                    icons: {
                        primary: "ui-icon-closethick"
                    },
                    text: !1
                }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, {
                    click: function(t) {
                        t.preventDefault(), this.close(t)
                    }
                }), e = t("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), this._title(e), this.uiDialog.attr({
                    "aria-labelledby": e.attr("id")
                })
            },
            _title: function(t) {
                this.options.title || t.html("&#160;"), t.text(this.options.title)
            },
            _createButtonPane: function() {
                this.uiDialogButtonPane = t("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), this.uiButtonSet = t("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), this._createButtons()
            },
            _createButtons: function() {
                var e = this,
                    i = this.options.buttons;
                return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), t.isEmptyObject(i) || t.isArray(i) && !i.length ? (this.uiDialog.removeClass("ui-dialog-buttons"), void 0) : (t.each(i, function(i, n) {
                    var s, r;
                    n = t.isFunction(n) ? {
                        click: n,
                        text: i
                    } : n, n = t.extend({
                        type: "button"
                    }, n), s = n.click, n.click = function() {
                        s.apply(e.element[0], arguments)
                    }, r = {
                        icons: n.icons,
                        text: n.showText
                    }, delete n.icons, delete n.showText, t("<button></button>", n).button(r).appendTo(e.uiButtonSet)
                }), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog), void 0)
            },
            _makeDraggable: function() {
                function e(t) {
                    return {
                        position: t.position,
                        offset: t.offset
                    }
                }
                var i = this,
                    n = this.options;
                this.uiDialog.draggable({
                    cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                    handle: ".ui-dialog-titlebar",
                    containment: "document",
                    start: function(n, s) {
                        t(this).addClass("ui-dialog-dragging"), i._blockFrames(), i._trigger("dragStart", n, e(s))
                    },
                    drag: function(t, n) {
                        i._trigger("drag", t, e(n))
                    },
                    stop: function(s, r) {
                        n.position = [r.position.left - i.document.scrollLeft(), r.position.top - i.document.scrollTop()], t(this).removeClass("ui-dialog-dragging"), i._unblockFrames(), i._trigger("dragStop", s, e(r))
                    }
                })
            },
            _makeResizable: function() {
                function e(t) {
                    return {
                        originalPosition: t.originalPosition,
                        originalSize: t.originalSize,
                        position: t.position,
                        size: t.size
                    }
                }
                var i = this,
                    n = this.options,
                    s = n.resizable,
                    r = this.uiDialog.css("position"),
                    o = "string" == typeof s ? s : "n,e,s,w,se,sw,ne,nw";
                this.uiDialog.resizable({
                    cancel: ".ui-dialog-content",
                    containment: "document",
                    alsoResize: this.element,
                    maxWidth: n.maxWidth,
                    maxHeight: n.maxHeight,
                    minWidth: n.minWidth,
                    minHeight: this._minHeight(),
                    handles: o,
                    start: function(n, s) {
                        t(this).addClass("ui-dialog-resizing"), i._blockFrames(), i._trigger("resizeStart", n, e(s))
                    },
                    resize: function(t, n) {
                        i._trigger("resize", t, e(n))
                    },
                    stop: function(s, r) {
                        n.height = t(this).height(), n.width = t(this).width(), t(this).removeClass("ui-dialog-resizing"), i._unblockFrames(), i._trigger("resizeStop", s, e(r))
                    }
                }).css("position", r)
            },
            _minHeight: function() {
                var t = this.options;
                return "auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height)
            },
            _position: function() {
                var t = this.uiDialog.is(":visible");
                t || this.uiDialog.show(), this.uiDialog.position(this.options.position), t || this.uiDialog.hide()
            },
            _setOptions: function(n) {
                var s = this,
                    r = !1,
                    o = {};
                t.each(n, function(t, n) {
                    s._setOption(t, n), t in e && (r = !0), t in i && (o[t] = n)
                }), r && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", o)
            },
            _setOption: function(t, e) {
                var i, n, s = this.uiDialog;
                "dialogClass" === t && s.removeClass(this.options.dialogClass).addClass(e), "disabled" !== t && (this._super(t, e), "appendTo" === t && this.uiDialog.appendTo(this._appendTo()), "buttons" === t && this._createButtons(), "closeText" === t && this.uiDialogTitlebarClose.button({
                    label: "" + e
                }), "draggable" === t && (i = s.is(":data(ui-draggable)"), i && !e && s.draggable("destroy"), !i && e && this._makeDraggable()), "position" === t && this._position(), "resizable" === t && (n = s.is(":data(ui-resizable)"), n && !e && s.resizable("destroy"), n && "string" == typeof e && s.resizable("option", "handles", e), n || e === !1 || this._makeResizable()), "title" === t && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
            },
            _size: function() {
                var t, e, i, n = this.options;
                this.element.show().css({
                    width: "auto",
                    minHeight: 0,
                    maxHeight: "none",
                    height: 0
                }), n.minWidth > n.width && (n.width = n.minWidth), t = this.uiDialog.css({
                    height: "auto",
                    width: n.width
                }).outerHeight(), e = Math.max(0, n.minHeight - t), i = "number" == typeof n.maxHeight ? Math.max(0, n.maxHeight - t) : "none", "auto" === n.height ? this.element.css({
                    minHeight: e,
                    maxHeight: i,
                    height: "auto"
                }) : this.element.height(Math.max(0, n.height - t)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
            },
            _blockFrames: function() {
                this.iframeBlocks = this.document.find("iframe").map(function() {
                    var e = t(this);
                    return t("<div>").css({
                        position: "absolute",
                        width: e.outerWidth(),
                        height: e.outerHeight()
                    }).appendTo(e.parent()).offset(e.offset())[0]
                })
            },
            _unblockFrames: function() {
                this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
            },
            _allowInteraction: function(e) {
                return t(e.target).closest(".ui-dialog").length ? !0 : !!t(e.target).closest(".ui-datepicker").length
            },
            _createOverlay: function() {
                if (this.options.modal) {
                    var e = this,
                        i = this.widgetFullName;
                    t.ui.dialog.overlayInstances || this._delay(function() {
                        t.ui.dialog.overlayInstances && this.document.bind("focusin.dialog", function(n) {
                            e._allowInteraction(n) || (n.preventDefault(), t(".ui-dialog:visible:last .ui-dialog-content").data(i)._focusTabbable())
                        })
                    }), this.overlay = t("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), this._on(this.overlay, {
                        mousedown: "_keepFocus"
                    }), t.ui.dialog.overlayInstances++
                }
            },
            _destroyOverlay: function() {
                this.options.modal && this.overlay && (t.ui.dialog.overlayInstances--, t.ui.dialog.overlayInstances || this.document.unbind("focusin.dialog"), this.overlay.remove(), this.overlay = null)
            }
        }), t.ui.dialog.overlayInstances = 0, t.uiBackCompat !== !1 && t.widget("ui.dialog", t.ui.dialog, {
            _position: function() {
                var e, i = this.options.position,
                    n = [],
                    s = [0, 0];
                i ? (("string" == typeof i || "object" == typeof i && "0" in i) && (n = i.split ? i.split(" ") : [i[0], i[1]], 1 === n.length && (n[1] = n[0]), t.each(["left", "top"], function(t, e) {
                    +n[t] === n[t] && (s[t] = n[t], n[t] = e)
                }), i = {
                    my: n[0] + (s[0] < 0 ? s[0] : "+" + s[0]) + " " + n[1] + (s[1] < 0 ? s[1] : "+" + s[1]),
                    at: n.join(" ")
                }), i = t.extend({}, t.ui.dialog.prototype.options.position, i)) : i = t.ui.dialog.prototype.options.position, e = this.uiDialog.is(":visible"), e || this.uiDialog.show(), this.uiDialog.position(i), e || this.uiDialog.hide()
            }
        })
    }(jQuery),
    function(t) {
        function e(t, e, i) {
            return t > e && e + i > t
        }
        t.widget("ui.droppable", {
            version: "1.10.3",
            widgetEventPrefix: "drop",
            options: {
                accept: "*",
                activeClass: !1,
                addClasses: !0,
                greedy: !1,
                hoverClass: !1,
                scope: "default",
                tolerance: "intersect",
                activate: null,
                deactivate: null,
                drop: null,
                out: null,
                over: null
            },
            _create: function() {
                var e = this.options,
                    i = e.accept;
                this.isover = !1, this.isout = !0, this.accept = t.isFunction(i) ? i : function(t) {
                    return t.is(i)
                }, this.proportions = {
                    width: this.element[0].offsetWidth,
                    height: this.element[0].offsetHeight
                }, t.ui.ddmanager.droppables[e.scope] = t.ui.ddmanager.droppables[e.scope] || [], t.ui.ddmanager.droppables[e.scope].push(this), e.addClasses && this.element.addClass("ui-droppable")
            },
            _destroy: function() {
                for (var e = 0, i = t.ui.ddmanager.droppables[this.options.scope]; e < i.length; e++) i[e] === this && i.splice(e, 1);
                this.element.removeClass("ui-droppable ui-droppable-disabled")
            },
            _setOption: function(e, i) {
                "accept" === e && (this.accept = t.isFunction(i) ? i : function(t) {
                    return t.is(i)
                }), t.Widget.prototype._setOption.apply(this, arguments)
            },
            _activate: function(e) {
                var i = t.ui.ddmanager.current;
                this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", e, this.ui(i))
            },
            _deactivate: function(e) {
                var i = t.ui.ddmanager.current;
                this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", e, this.ui(i))
            },
            _over: function(e) {
                var i = t.ui.ddmanager.current;
                i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", e, this.ui(i)))
            },
            _out: function(e) {
                var i = t.ui.ddmanager.current;
                i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", e, this.ui(i)))
            },
            _drop: function(e, i) {
                var n = i || t.ui.ddmanager.current,
                    s = !1;
                return n && (n.currentItem || n.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                    var e = t.data(this, "ui-droppable");
                    return e.options.greedy && !e.options.disabled && e.options.scope === n.options.scope && e.accept.call(e.element[0], n.currentItem || n.element) && t.ui.intersect(n, t.extend(e, {
                        offset: e.element.offset()
                    }), e.options.tolerance) ? (s = !0, !1) : void 0
                }), s ? !1 : this.accept.call(this.element[0], n.currentItem || n.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", e, this.ui(n)), this.element) : !1) : !1
            },
            ui: function(t) {
                return {
                    draggable: t.currentItem || t.element,
                    helper: t.helper,
                    position: t.position,
                    offset: t.positionAbs
                }
            }
        }), t.ui.intersect = function(t, i, n) {
            if (!i.offset) return !1;
            var s, r, o = (t.positionAbs || t.position.absolute).left,
                a = o + t.helperProportions.width,
                l = (t.positionAbs || t.position.absolute).top,
                c = l + t.helperProportions.height,
                u = i.offset.left,
                h = u + i.proportions.width,
                d = i.offset.top,
                p = d + i.proportions.height;
            switch (n) {
                case "fit":
                    return o >= u && h >= a && l >= d && p >= c;
                case "intersect":
                    return u < o + t.helperProportions.width / 2 && a - t.helperProportions.width / 2 < h && d < l + t.helperProportions.height / 2 && c - t.helperProportions.height / 2 < p;
                case "pointer":
                    return s = (t.positionAbs || t.position.absolute).left + (t.clickOffset || t.offset.click).left, r = (t.positionAbs || t.position.absolute).top + (t.clickOffset || t.offset.click).top, e(r, d, i.proportions.height) && e(s, u, i.proportions.width);
                case "touch":
                    return (l >= d && p >= l || c >= d && p >= c || d > l && c > p) && (o >= u && h >= o || a >= u && h >= a || u > o && a > h);
                default:
                    return !1
            }
        }, t.ui.ddmanager = {
            current: null,
            droppables: {
                "default": []
            },
            prepareOffsets: function(e, i) {
                var n, s, r = t.ui.ddmanager.droppables[e.options.scope] || [],
                    o = i ? i.type : null,
                    a = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
                t: for (n = 0; n < r.length; n++)
                    if (!(r[n].options.disabled || e && !r[n].accept.call(r[n].element[0], e.currentItem || e.element))) {
                        for (s = 0; s < a.length; s++)
                            if (a[s] === r[n].element[0]) {
                                r[n].proportions.height = 0;
                                continue t
                            }
                        r[n].visible = "none" !== r[n].element.css("display"), r[n].visible && ("mousedown" === o && r[n]._activate.call(r[n], i), r[n].offset = r[n].element.offset(), r[n].proportions = {
                            width: r[n].element[0].offsetWidth,
                            height: r[n].element[0].offsetHeight
                        })
                    }
            },
            drop: function(e, i) {
                var n = !1;
                return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function() {
                    this.options && (!this.options.disabled && this.visible && t.ui.intersect(e, this, this.options.tolerance) && (n = this._drop.call(this, i) || n), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
                }), n
            },
            dragStart: function(e, i) {
                e.element.parentsUntil("body").bind("scroll.droppable", function() {
                    e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
                })
            },
            drag: function(e, i) {
                e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
                    if (!this.options.disabled && !this.greedyChild && this.visible) {
                        var n, s, r, o = t.ui.intersect(e, this, this.options.tolerance),
                            a = !o && this.isover ? "isout" : o && !this.isover ? "isover" : null;
                        a && (this.options.greedy && (s = this.options.scope, r = this.element.parents(":data(ui-droppable)").filter(function() {
                            return t.data(this, "ui-droppable").options.scope === s
                        }), r.length && (n = t.data(r[0], "ui-droppable"), n.greedyChild = "isover" === a)), n && "isover" === a && (n.isover = !1, n.isout = !0, n._out.call(n, i)), this[a] = !0, this["isout" === a ? "isover" : "isout"] = !1, this["isover" === a ? "_over" : "_out"].call(this, i), n && "isout" === a && (n.isout = !1, n.isover = !0, n._over.call(n, i)))
                    }
                })
            },
            dragStop: function(e, i) {
                e.element.parentsUntil("body").unbind("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
            }
        }
    }(jQuery),
    function(t, e) {
        var i = "ui-effects-";
        t.effects = {
                effect: {}
            },
            function(t, e) {
                function i(t, e, i) {
                    var n = h[e.type] || {};
                    return null == t ? i || !e.def ? null : e.def : (t = n.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : n.mod ? (t + n.mod) % n.mod : 0 > t ? 0 : n.max < t ? n.max : t)
                }

                function n(e) {
                    var i = c(),
                        n = i._rgba = [];
                    return e = e.toLowerCase(), f(l, function(t, s) {
                        var r, o = s.re.exec(e),
                            a = o && s.parse(o),
                            l = s.space || "rgba";
                        return a ? (r = i[l](a), i[u[l].cache] = r[u[l].cache], n = i._rgba = r._rgba, !1) : void 0
                    }), n.length ? ("0,0,0,0" === n.join() && t.extend(n, r.transparent), i) : r[e]
                }

                function s(t, e, i) {
                    return i = (i + 1) % 1, 1 > 6 * i ? t + 6 * (e - t) * i : 1 > 2 * i ? e : 2 > 3 * i ? t + 6 * (e - t) * (2 / 3 - i) : t
                }
                var r, o = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
                    a = /^([\-+])=\s*(\d+\.?\d*)/,
                    l = [{
                        re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        parse: function(t) {
                            return [t[1], t[2], t[3], t[4]]
                        }
                    }, {
                        re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        parse: function(t) {
                            return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
                        }
                    }, {
                        re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                        parse: function(t) {
                            return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
                        }
                    }, {
                        re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                        parse: function(t) {
                            return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)]
                        }
                    }, {
                        re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        space: "hsla",
                        parse: function(t) {
                            return [t[1], t[2] / 100, t[3] / 100, t[4]]
                        }
                    }],
                    c = t.Color = function(e, i, n, s) {
                        return new t.Color.fn.parse(e, i, n, s)
                    },
                    u = {
                        rgba: {
                            props: {
                                red: {
                                    idx: 0,
                                    type: "byte"
                                },
                                green: {
                                    idx: 1,
                                    type: "byte"
                                },
                                blue: {
                                    idx: 2,
                                    type: "byte"
                                }
                            }
                        },
                        hsla: {
                            props: {
                                hue: {
                                    idx: 0,
                                    type: "degrees"
                                },
                                saturation: {
                                    idx: 1,
                                    type: "percent"
                                },
                                lightness: {
                                    idx: 2,
                                    type: "percent"
                                }
                            }
                        }
                    },
                    h = {
                        "byte": {
                            floor: !0,
                            max: 255
                        },
                        percent: {
                            max: 1
                        },
                        degrees: {
                            mod: 360,
                            floor: !0
                        }
                    },
                    d = c.support = {},
                    p = t("<p>")[0],
                    f = t.each;
                p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(u, function(t, e) {
                    e.cache = "_" + t, e.props.alpha = {
                        idx: 3,
                        type: "percent",
                        def: 1
                    }
                }), c.fn = t.extend(c.prototype, {
                    parse: function(s, o, a, l) {
                        if (s === e) return this._rgba = [null, null, null, null], this;
                        (s.jquery || s.nodeType) && (s = t(s).css(o), o = e);
                        var h = this,
                            d = t.type(s),
                            p = this._rgba = [];
                        return o !== e && (s = [s, o, a, l], d = "array"), "string" === d ? this.parse(n(s) || r._default) : "array" === d ? (f(u.rgba.props, function(t, e) {
                            p[e.idx] = i(s[e.idx], e)
                        }), this) : "object" === d ? (s instanceof c ? f(u, function(t, e) {
                            s[e.cache] && (h[e.cache] = s[e.cache].slice())
                        }) : f(u, function(e, n) {
                            var r = n.cache;
                            f(n.props, function(t, e) {
                                if (!h[r] && n.to) {
                                    if ("alpha" === t || null == s[t]) return;
                                    h[r] = n.to(h._rgba)
                                }
                                h[r][e.idx] = i(s[t], e, !0)
                            }), h[r] && t.inArray(null, h[r].slice(0, 3)) < 0 && (h[r][3] = 1, n.from && (h._rgba = n.from(h[r])))
                        }), this) : void 0
                    },
                    is: function(t) {
                        var e = c(t),
                            i = !0,
                            n = this;
                        return f(u, function(t, s) {
                            var r, o = e[s.cache];
                            return o && (r = n[s.cache] || s.to && s.to(n._rgba) || [], f(s.props, function(t, e) {
                                return null != o[e.idx] ? i = o[e.idx] === r[e.idx] : void 0
                            })), i
                        }), i
                    },
                    _space: function() {
                        var t = [],
                            e = this;
                        return f(u, function(i, n) {
                            e[n.cache] && t.push(i)
                        }), t.pop()
                    },
                    transition: function(t, e) {
                        var n = c(t),
                            s = n._space(),
                            r = u[s],
                            o = 0 === this.alpha() ? c("transparent") : this,
                            a = o[r.cache] || r.to(o._rgba),
                            l = a.slice();
                        return n = n[r.cache], f(r.props, function(t, s) {
                            var r = s.idx,
                                o = a[r],
                                c = n[r],
                                u = h[s.type] || {};
                            null !== c && (null === o ? l[r] = c : (u.mod && (c - o > u.mod / 2 ? o += u.mod : o - c > u.mod / 2 && (o -= u.mod)), l[r] = i((c - o) * e + o, s)))
                        }), this[s](l)
                    },
                    blend: function(e) {
                        if (1 === this._rgba[3]) return this;
                        var i = this._rgba.slice(),
                            n = i.pop(),
                            s = c(e)._rgba;
                        return c(t.map(i, function(t, e) {
                            return (1 - n) * s[e] + n * t
                        }))
                    },
                    toRgbaString: function() {
                        var e = "rgba(",
                            i = t.map(this._rgba, function(t, e) {
                                return null == t ? e > 2 ? 1 : 0 : t
                            });
                        return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")"
                    },
                    toHslaString: function() {
                        var e = "hsla(",
                            i = t.map(this.hsla(), function(t, e) {
                                return null == t && (t = e > 2 ? 1 : 0), e && 3 > e && (t = Math.round(100 * t) + "%"), t
                            });
                        return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")"
                    },
                    toHexString: function(e) {
                        var i = this._rgba.slice(),
                            n = i.pop();
                        return e && i.push(~~(255 * n)), "#" + t.map(i, function(t) {
                            return t = (t || 0).toString(16), 1 === t.length ? "0" + t : t
                        }).join("")
                    },
                    toString: function() {
                        return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                    }
                }), c.fn.parse.prototype = c.fn, u.hsla.to = function(t) {
                    if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                    var e, i, n = t[0] / 255,
                        s = t[1] / 255,
                        r = t[2] / 255,
                        o = t[3],
                        a = Math.max(n, s, r),
                        l = Math.min(n, s, r),
                        c = a - l,
                        u = a + l,
                        h = .5 * u;
                    return e = l === a ? 0 : n === a ? 60 * (s - r) / c + 360 : s === a ? 60 * (r - n) / c + 120 : 60 * (n - s) / c + 240, i = 0 === c ? 0 : .5 >= h ? c / u : c / (2 - u), [Math.round(e) % 360, i, h, null == o ? 1 : o]
                }, u.hsla.from = function(t) {
                    if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                    var e = t[0] / 360,
                        i = t[1],
                        n = t[2],
                        r = t[3],
                        o = .5 >= n ? n * (1 + i) : n + i - n * i,
                        a = 2 * n - o;
                    return [Math.round(255 * s(a, o, e + 1 / 3)), Math.round(255 * s(a, o, e)), Math.round(255 * s(a, o, e - 1 / 3)), r]
                }, f(u, function(n, s) {
                    var r = s.props,
                        o = s.cache,
                        l = s.to,
                        u = s.from;
                    c.fn[n] = function(n) {
                        if (l && !this[o] && (this[o] = l(this._rgba)), n === e) return this[o].slice();
                        var s, a = t.type(n),
                            h = "array" === a || "object" === a ? n : arguments,
                            d = this[o].slice();
                        return f(r, function(t, e) {
                            var n = h["object" === a ? t : e.idx];
                            null == n && (n = d[e.idx]), d[e.idx] = i(n, e)
                        }), u ? (s = c(u(d)), s[o] = d, s) : c(d)
                    }, f(r, function(e, i) {
                        c.fn[e] || (c.fn[e] = function(s) {
                            var r, o = t.type(s),
                                l = "alpha" === e ? this._hsla ? "hsla" : "rgba" : n,
                                c = this[l](),
                                u = c[i.idx];
                            return "undefined" === o ? u : ("function" === o && (s = s.call(this, u), o = t.type(s)), null == s && i.empty ? this : ("string" === o && (r = a.exec(s), r && (s = u + parseFloat(r[2]) * ("+" === r[1] ? 1 : -1))), c[i.idx] = s, this[l](c)))
                        })
                    })
                }), c.hook = function(e) {
                    var i = e.split(" ");
                    f(i, function(e, i) {
                        t.cssHooks[i] = {
                            set: function(e, s) {
                                var r, o, a = "";
                                if ("transparent" !== s && ("string" !== t.type(s) || (r = n(s)))) {
                                    if (s = c(r || s), !d.rgba && 1 !== s._rgba[3]) {
                                        for (o = "backgroundColor" === i ? e.parentNode : e;
                                            ("" === a || "transparent" === a) && o && o.style;) try {
                                            a = t.css(o, "backgroundColor"), o = o.parentNode
                                        } catch (l) {}
                                        s = s.blend(a && "transparent" !== a ? a : "_default")
                                    }
                                    s = s.toRgbaString()
                                }
                                try {
                                    e.style[i] = s
                                } catch (l) {}
                            }
                        }, t.fx.step[i] = function(e) {
                            e.colorInit || (e.start = c(e.elem, i), e.end = c(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos))
                        }
                    })
                }, c.hook(o), t.cssHooks.borderColor = {
                    expand: function(t) {
                        var e = {};
                        return f(["Top", "Right", "Bottom", "Left"], function(i, n) {
                            e["border" + n + "Color"] = t
                        }), e
                    }
                }, r = t.Color.names = {
                    aqua: "#00ffff",
                    black: "#000000",
                    blue: "#0000ff",
                    fuchsia: "#ff00ff",
                    gray: "#808080",
                    green: "#008000",
                    lime: "#00ff00",
                    maroon: "#800000",
                    navy: "#000080",
                    olive: "#808000",
                    purple: "#800080",
                    red: "#ff0000",
                    silver: "#c0c0c0",
                    teal: "#008080",
                    white: "#ffffff",
                    yellow: "#ffff00",
                    transparent: [null, null, null, 0],
                    _default: "#ffffff"
                }
            }(jQuery),
            function() {
                function i(e) {
                    var i, n, s = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle,
                        r = {};
                    if (s && s.length && s[0] && s[s[0]])
                        for (n = s.length; n--;) i = s[n], "string" == typeof s[i] && (r[t.camelCase(i)] = s[i]);
                    else
                        for (i in s) "string" == typeof s[i] && (r[i] = s[i]);
                    return r
                }

                function n(e, i) {
                    var n, s, o = {};
                    for (n in i) s = i[n], e[n] !== s && (r[n] || (t.fx.step[n] || !isNaN(parseFloat(s))) && (o[n] = s));
                    return o
                }
                var s = ["add", "remove", "toggle"],
                    r = {
                        border: 1,
                        borderBottom: 1,
                        borderColor: 1,
                        borderLeft: 1,
                        borderRight: 1,
                        borderTop: 1,
                        borderWidth: 1,
                        margin: 1,
                        padding: 1
                    };
                t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(e, i) {
                    t.fx.step[i] = function(t) {
                        ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (jQuery.style(t.elem, i, t.end), t.setAttr = !0)
                    }
                }), t.fn.addBack || (t.fn.addBack = function(t) {
                    return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
                }), t.effects.animateClass = function(e, r, o, a) {
                    var l = t.speed(r, o, a);
                    return this.queue(function() {
                        var r, o = t(this),
                            a = o.attr("class") || "",
                            c = l.children ? o.find("*").addBack() : o;
                        c = c.map(function() {
                            var e = t(this);
                            return {
                                el: e,
                                start: i(this)
                            }
                        }), r = function() {
                            t.each(s, function(t, i) {
                                e[i] && o[i + "Class"](e[i])
                            })
                        }, r(), c = c.map(function() {
                            return this.end = i(this.el[0]), this.diff = n(this.start, this.end), this
                        }), o.attr("class", a), c = c.map(function() {
                            var e = this,
                                i = t.Deferred(),
                                n = t.extend({}, l, {
                                    queue: !1,
                                    complete: function() {
                                        i.resolve(e)
                                    }
                                });
                            return this.el.animate(this.diff, n), i.promise()
                        }), t.when.apply(t, c.get()).done(function() {
                            r(), t.each(arguments, function() {
                                var e = this.el;
                                t.each(this.diff, function(t) {
                                    e.css(t, "")
                                })
                            }), l.complete.call(o[0])
                        })
                    })
                }, t.fn.extend({
                    addClass: function(e) {
                        return function(i, n, s, r) {
                            return n ? t.effects.animateClass.call(this, {
                                add: i
                            }, n, s, r) : e.apply(this, arguments)
                        }
                    }(t.fn.addClass),
                    removeClass: function(e) {
                        return function(i, n, s, r) {
                            return arguments.length > 1 ? t.effects.animateClass.call(this, {
                                remove: i
                            }, n, s, r) : e.apply(this, arguments)
                        }
                    }(t.fn.removeClass),
                    toggleClass: function(i) {
                        return function(n, s, r, o, a) {
                            return "boolean" == typeof s || s === e ? r ? t.effects.animateClass.call(this, s ? {
                                add: n
                            } : {
                                remove: n
                            }, r, o, a) : i.apply(this, arguments) : t.effects.animateClass.call(this, {
                                toggle: n
                            }, s, r, o)
                        }
                    }(t.fn.toggleClass),
                    switchClass: function(e, i, n, s, r) {
                        return t.effects.animateClass.call(this, {
                            add: i,
                            remove: e
                        }, n, s, r)
                    }
                })
            }(),
            function() {
                function n(e, i, n, s) {
                    return t.isPlainObject(e) && (i = e, e = e.effect), e = {
                        effect: e
                    }, null == i && (i = {}), t.isFunction(i) && (s = i, n = null, i = {}), ("number" == typeof i || t.fx.speeds[i]) && (s = n, n = i, i = {}), t.isFunction(n) && (s = n, n = null), i && t.extend(e, i), n = n || i.duration, e.duration = t.fx.off ? 0 : "number" == typeof n ? n : n in t.fx.speeds ? t.fx.speeds[n] : t.fx.speeds._default, e.complete = s || i.complete, e
                }

                function s(e) {
                    return !e || "number" == typeof e || t.fx.speeds[e] ? !0 : "string" != typeof e || t.effects.effect[e] ? t.isFunction(e) ? !0 : "object" != typeof e || e.effect ? !1 : !0 : !0
                }
                t.extend(t.effects, {
                    version: "1.10.3",
                    save: function(t, e) {
                        for (var n = 0; n < e.length; n++) null !== e[n] && t.data(i + e[n], t[0].style[e[n]])
                    },
                    restore: function(t, n) {
                        var s, r;
                        for (r = 0; r < n.length; r++) null !== n[r] && (s = t.data(i + n[r]), s === e && (s = ""), t.css(n[r], s))
                    },
                    setMode: function(t, e) {
                        return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e
                    },
                    getBaseline: function(t, e) {
                        var i, n;
                        switch (t[0]) {
                            case "top":
                                i = 0;
                                break;
                            case "middle":
                                i = .5;
                                break;
                            case "bottom":
                                i = 1;
                                break;
                            default:
                                i = t[0] / e.height
                        }
                        switch (t[1]) {
                            case "left":
                                n = 0;
                                break;
                            case "center":
                                n = .5;
                                break;
                            case "right":
                                n = 1;
                                break;
                            default:
                                n = t[1] / e.width
                        }
                        return {
                            x: n,
                            y: i
                        }
                    },
                    createWrapper: function(e) {
                        if (e.parent().is(".ui-effects-wrapper")) return e.parent();
                        var i = {
                                width: e.outerWidth(!0),
                                height: e.outerHeight(!0),
                                "float": e.css("float")
                            },
                            n = t("<div></div>").addClass("ui-effects-wrapper").css({
                                fontSize: "100%",
                                background: "transparent",
                                border: "none",
                                margin: 0,
                                padding: 0
                            }),
                            s = {
                                width: e.width(),
                                height: e.height()
                            },
                            r = document.activeElement;
                        try {
                            r.id
                        } catch (o) {
                            r = document.body
                        }
                        return e.wrap(n), (e[0] === r || t.contains(e[0], r)) && t(r).focus(), n = e.parent(), "static" === e.css("position") ? (n.css({
                            position: "relative"
                        }), e.css({
                            position: "relative"
                        })) : (t.extend(i, {
                            position: e.css("position"),
                            zIndex: e.css("z-index")
                        }), t.each(["top", "left", "bottom", "right"], function(t, n) {
                            i[n] = e.css(n), isNaN(parseInt(i[n], 10)) && (i[n] = "auto")
                        }), e.css({
                            position: "relative",
                            top: 0,
                            left: 0,
                            right: "auto",
                            bottom: "auto"
                        })), e.css(s), n.css(i).show()
                    },
                    removeWrapper: function(e) {
                        var i = document.activeElement;
                        return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === i || t.contains(e[0], i)) && t(i).focus()), e
                    },
                    setTransition: function(e, i, n, s) {
                        return s = s || {}, t.each(i, function(t, i) {
                            var r = e.cssUnit(i);
                            r[0] > 0 && (s[i] = r[0] * n + r[1])
                        }), s
                    }
                }), t.fn.extend({
                    effect: function() {
                        function e(e) {
                            function n() {
                                t.isFunction(r) && r.call(s[0]), t.isFunction(e) && e()
                            }
                            var s = t(this),
                                r = i.complete,
                                a = i.mode;
                            (s.is(":hidden") ? "hide" === a : "show" === a) ? (s[a](), n()) : o.call(s[0], i, n)
                        }
                        var i = n.apply(this, arguments),
                            s = i.mode,
                            r = i.queue,
                            o = t.effects.effect[i.effect];
                        return t.fx.off || !o ? s ? this[s](i.duration, i.complete) : this.each(function() {
                            i.complete && i.complete.call(this)
                        }) : r === !1 ? this.each(e) : this.queue(r || "fx", e)
                    },
                    show: function(t) {
                        return function(e) {
                            if (s(e)) return t.apply(this, arguments);
                            var i = n.apply(this, arguments);
                            return i.mode = "show", this.effect.call(this, i)
                        }
                    }(t.fn.show),
                    hide: function(t) {
                        return function(e) {
                            if (s(e)) return t.apply(this, arguments);
                            var i = n.apply(this, arguments);
                            return i.mode = "hide", this.effect.call(this, i)
                        }
                    }(t.fn.hide),
                    toggle: function(t) {
                        return function(e) {
                            if (s(e) || "boolean" == typeof e) return t.apply(this, arguments);
                            var i = n.apply(this, arguments);
                            return i.mode = "toggle", this.effect.call(this, i)
                        }
                    }(t.fn.toggle),
                    cssUnit: function(e) {
                        var i = this.css(e),
                            n = [];
                        return t.each(["em", "px", "%", "pt"], function(t, e) {
                            i.indexOf(e) > 0 && (n = [parseFloat(i), e])
                        }), n
                    }
                })
            }(),
            function() {
                var e = {};
                t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(t, i) {
                    e[i] = function(e) {
                        return Math.pow(e, t + 2)
                    }
                }), t.extend(e, {
                    Sine: function(t) {
                        return 1 - Math.cos(t * Math.PI / 2)
                    },
                    Circ: function(t) {
                        return 1 - Math.sqrt(1 - t * t)
                    },
                    Elastic: function(t) {
                        return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15)
                    },
                    Back: function(t) {
                        return t * t * (3 * t - 2)
                    },
                    Bounce: function(t) {
                        for (var e, i = 4; t < ((e = Math.pow(2, --i)) - 1) / 11;);
                        return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
                    }
                }), t.each(e, function(e, i) {
                    t.easing["easeIn" + e] = i, t.easing["easeOut" + e] = function(t) {
                        return 1 - i(1 - t)
                    }, t.easing["easeInOut" + e] = function(t) {
                        return .5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2
                    }
                })
            }()
    }(jQuery),
    function(t) {
        var e = /up|down|vertical/,
            i = /up|left|vertical|horizontal/;
        t.effects.effect.blind = function(n, s) {
            var r, o, a, l = t(this),
                c = ["position", "top", "bottom", "left", "right", "height", "width"],
                u = t.effects.setMode(l, n.mode || "hide"),
                h = n.direction || "up",
                d = e.test(h),
                p = d ? "height" : "width",
                f = d ? "top" : "left",
                m = i.test(h),
                g = {},
                v = "show" === u;
            l.parent().is(".ui-effects-wrapper") ? t.effects.save(l.parent(), c) : t.effects.save(l, c), l.show(), r = t.effects.createWrapper(l).css({
                overflow: "hidden"
            }), o = r[p](), a = parseFloat(r.css(f)) || 0, g[p] = v ? o : 0, m || (l.css(d ? "bottom" : "right", 0).css(d ? "top" : "left", "auto").css({
                position: "absolute"
            }), g[f] = v ? a : o + a), v && (r.css(p, 0), m || r.css(f, a + o)), r.animate(g, {
                duration: n.duration,
                easing: n.easing,
                queue: !1,
                complete: function() {
                    "hide" === u && l.hide(), t.effects.restore(l, c), t.effects.removeWrapper(l), s()
                }
            })
        }
    }(jQuery),
    function(t) {
        t.effects.effect.bounce = function(e, i) {
            var n, s, r, o = t(this),
                a = ["position", "top", "bottom", "left", "right", "height", "width"],
                l = t.effects.setMode(o, e.mode || "effect"),
                c = "hide" === l,
                u = "show" === l,
                h = e.direction || "up",
                d = e.distance,
                p = e.times || 5,
                f = 2 * p + (u || c ? 1 : 0),
                m = e.duration / f,
                g = e.easing,
                v = "up" === h || "down" === h ? "top" : "left",
                y = "up" === h || "left" === h,
                b = o.queue(),
                w = b.length;
            for ((u || c) && a.push("opacity"), t.effects.save(o, a), o.show(), t.effects.createWrapper(o), d || (d = o["top" === v ? "outerHeight" : "outerWidth"]() / 3), u && (r = {
                    opacity: 1
                }, r[v] = 0, o.css("opacity", 0).css(v, y ? 2 * -d : 2 * d).animate(r, m, g)), c && (d /= Math.pow(2, p - 1)), r = {}, r[v] = 0, n = 0; p > n; n++) s = {}, s[v] = (y ? "-=" : "+=") + d, o.animate(s, m, g).animate(r, m, g), d = c ? 2 * d : d / 2;
            c && (s = {
                opacity: 0
            }, s[v] = (y ? "-=" : "+=") + d, o.animate(s, m, g)), o.queue(function() {
                c && o.hide(), t.effects.restore(o, a), t.effects.removeWrapper(o), i()
            }), w > 1 && b.splice.apply(b, [1, 0].concat(b.splice(w, f + 1))), o.dequeue()
        }
    }(jQuery),
    function(t) {
        t.effects.effect.clip = function(e, i) {
            var n, s, r, o = t(this),
                a = ["position", "top", "bottom", "left", "right", "height", "width"],
                l = t.effects.setMode(o, e.mode || "hide"),
                c = "show" === l,
                u = e.direction || "vertical",
                h = "vertical" === u,
                d = h ? "height" : "width",
                p = h ? "top" : "left",
                f = {};
            t.effects.save(o, a), o.show(), n = t.effects.createWrapper(o).css({
                overflow: "hidden"
            }), s = "IMG" === o[0].tagName ? n : o, r = s[d](), c && (s.css(d, 0), s.css(p, r / 2)), f[d] = c ? r : 0, f[p] = c ? 0 : r / 2, s.animate(f, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: function() {
                    c || o.hide(), t.effects.restore(o, a), t.effects.removeWrapper(o), i()
                }
            })
        }
    }(jQuery),
    function(t) {
        t.effects.effect.drop = function(e, i) {
            var n, s = t(this),
                r = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
                o = t.effects.setMode(s, e.mode || "hide"),
                a = "show" === o,
                l = e.direction || "left",
                c = "up" === l || "down" === l ? "top" : "left",
                u = "up" === l || "left" === l ? "pos" : "neg",
                h = {
                    opacity: a ? 1 : 0
                };
            t.effects.save(s, r), s.show(), t.effects.createWrapper(s), n = e.distance || s["top" === c ? "outerHeight" : "outerWidth"](!0) / 2, a && s.css("opacity", 0).css(c, "pos" === u ? -n : n), h[c] = (a ? "pos" === u ? "+=" : "-=" : "pos" === u ? "-=" : "+=") + n, s.animate(h, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: function() {
                    "hide" === o && s.hide(), t.effects.restore(s, r), t.effects.removeWrapper(s), i()
                }
            })
        }
    }(jQuery),
    function(t) {
        t.effects.effect.explode = function(e, i) {
            function n() {
                b.push(this), b.length === h * d && s()
            }

            function s() {
                p.css({
                    visibility: "visible"
                }), t(b).remove(), m || p.hide(), i()
            }
            var r, o, a, l, c, u, h = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3,
                d = h,
                p = t(this),
                f = t.effects.setMode(p, e.mode || "hide"),
                m = "show" === f,
                g = p.show().css("visibility", "hidden").offset(),
                v = Math.ceil(p.outerWidth() / d),
                y = Math.ceil(p.outerHeight() / h),
                b = [];
            for (r = 0; h > r; r++)
                for (l = g.top + r * y, u = r - (h - 1) / 2, o = 0; d > o; o++) a = g.left + o * v, c = o - (d - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({
                    position: "absolute",
                    visibility: "visible",
                    left: -o * v,
                    top: -r * y
                }).parent().addClass("ui-effects-explode").css({
                    position: "absolute",
                    overflow: "hidden",
                    width: v,
                    height: y,
                    left: a + (m ? c * v : 0),
                    top: l + (m ? u * y : 0),
                    opacity: m ? 0 : 1
                }).animate({
                    left: a + (m ? 0 : c * v),
                    top: l + (m ? 0 : u * y),
                    opacity: m ? 1 : 0
                }, e.duration || 500, e.easing, n)
        }
    }(jQuery),
    function(t) {
        t.effects.effect.fade = function(e, i) {
            var n = t(this),
                s = t.effects.setMode(n, e.mode || "toggle");
            n.animate({
                opacity: s
            }, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: i
            })
        }
    }(jQuery),
    function(t) {
        t.effects.effect.fold = function(e, i) {
            var n, s, r = t(this),
                o = ["position", "top", "bottom", "left", "right", "height", "width"],
                a = t.effects.setMode(r, e.mode || "hide"),
                l = "show" === a,
                c = "hide" === a,
                u = e.size || 15,
                h = /([0-9]+)%/.exec(u),
                d = !!e.horizFirst,
                p = l !== d,
                f = p ? ["width", "height"] : ["height", "width"],
                m = e.duration / 2,
                g = {},
                v = {};
            t.effects.save(r, o), r.show(), n = t.effects.createWrapper(r).css({
                overflow: "hidden"
            }), s = p ? [n.width(), n.height()] : [n.height(), n.width()], h && (u = parseInt(h[1], 10) / 100 * s[c ? 0 : 1]), l && n.css(d ? {
                height: 0,
                width: u
            } : {
                height: u,
                width: 0
            }), g[f[0]] = l ? s[0] : u, v[f[1]] = l ? s[1] : 0, n.animate(g, m, e.easing).animate(v, m, e.easing, function() {
                c && r.hide(), t.effects.restore(r, o), t.effects.removeWrapper(r), i()
            })
        }
    }(jQuery),
    function(t) {
        t.effects.effect.highlight = function(e, i) {
            var n = t(this),
                s = ["backgroundImage", "backgroundColor", "opacity"],
                r = t.effects.setMode(n, e.mode || "show"),
                o = {
                    backgroundColor: n.css("backgroundColor")
                };
            "hide" === r && (o.opacity = 0), t.effects.save(n, s), n.show().css({
                backgroundImage: "none",
                backgroundColor: e.color || "#ffff99"
            }).animate(o, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: function() {
                    "hide" === r && n.hide(), t.effects.restore(n, s), i()
                }
            })
        }
    }(jQuery),
    function(t) {
        t.effects.effect.pulsate = function(e, i) {
            var n, s = t(this),
                r = t.effects.setMode(s, e.mode || "show"),
                o = "show" === r,
                a = "hide" === r,
                l = o || "hide" === r,
                c = 2 * (e.times || 5) + (l ? 1 : 0),
                u = e.duration / c,
                h = 0,
                d = s.queue(),
                p = d.length;
            for ((o || !s.is(":visible")) && (s.css("opacity", 0).show(), h = 1), n = 1; c > n; n++) s.animate({
                opacity: h
            }, u, e.easing), h = 1 - h;
            s.animate({
                opacity: h
            }, u, e.easing), s.queue(function() {
                a && s.hide(), i()
            }), p > 1 && d.splice.apply(d, [1, 0].concat(d.splice(p, c + 1))), s.dequeue()
        }
    }(jQuery),
    function(t) {
        t.effects.effect.puff = function(e, i) {
            var n = t(this),
                s = t.effects.setMode(n, e.mode || "hide"),
                r = "hide" === s,
                o = parseInt(e.percent, 10) || 150,
                a = o / 100,
                l = {
                    height: n.height(),
                    width: n.width(),
                    outerHeight: n.outerHeight(),
                    outerWidth: n.outerWidth()
                };
            t.extend(e, {
                effect: "scale",
                queue: !1,
                fade: !0,
                mode: s,
                complete: i,
                percent: r ? o : 100,
                from: r ? l : {
                    height: l.height * a,
                    width: l.width * a,
                    outerHeight: l.outerHeight * a,
                    outerWidth: l.outerWidth * a
                }
            }), n.effect(e)
        }, t.effects.effect.scale = function(e, i) {
            var n = t(this),
                s = t.extend(!0, {}, e),
                r = t.effects.setMode(n, e.mode || "effect"),
                o = parseInt(e.percent, 10) || (0 === parseInt(e.percent, 10) ? 0 : "hide" === r ? 0 : 100),
                a = e.direction || "both",
                l = e.origin,
                c = {
                    height: n.height(),
                    width: n.width(),
                    outerHeight: n.outerHeight(),
                    outerWidth: n.outerWidth()
                },
                u = {
                    y: "horizontal" !== a ? o / 100 : 1,
                    x: "vertical" !== a ? o / 100 : 1
                };
            s.effect = "size", s.queue = !1, s.complete = i, "effect" !== r && (s.origin = l || ["middle", "center"], s.restore = !0), s.from = e.from || ("show" === r ? {
                height: 0,
                width: 0,
                outerHeight: 0,
                outerWidth: 0
            } : c), s.to = {
                height: c.height * u.y,
                width: c.width * u.x,
                outerHeight: c.outerHeight * u.y,
                outerWidth: c.outerWidth * u.x
            }, s.fade && ("show" === r && (s.from.opacity = 0, s.to.opacity = 1), "hide" === r && (s.from.opacity = 1, s.to.opacity = 0)), n.effect(s)
        }, t.effects.effect.size = function(e, i) {
            var n, s, r, o = t(this),
                a = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
                l = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
                c = ["width", "height", "overflow"],
                u = ["fontSize"],
                h = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                d = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                p = t.effects.setMode(o, e.mode || "effect"),
                f = e.restore || "effect" !== p,
                m = e.scale || "both",
                g = e.origin || ["middle", "center"],
                v = o.css("position"),
                y = f ? a : l,
                b = {
                    height: 0,
                    width: 0,
                    outerHeight: 0,
                    outerWidth: 0
                };
            "show" === p && o.show(), n = {
                height: o.height(),
                width: o.width(),
                outerHeight: o.outerHeight(),
                outerWidth: o.outerWidth()
            }, "toggle" === e.mode && "show" === p ? (o.from = e.to || b, o.to = e.from || n) : (o.from = e.from || ("show" === p ? b : n), o.to = e.to || ("hide" === p ? b : n)), r = {
                from: {
                    y: o.from.height / n.height,
                    x: o.from.width / n.width
                },
                to: {
                    y: o.to.height / n.height,
                    x: o.to.width / n.width
                }
            }, ("box" === m || "both" === m) && (r.from.y !== r.to.y && (y = y.concat(h), o.from = t.effects.setTransition(o, h, r.from.y, o.from), o.to = t.effects.setTransition(o, h, r.to.y, o.to)), r.from.x !== r.to.x && (y = y.concat(d), o.from = t.effects.setTransition(o, d, r.from.x, o.from), o.to = t.effects.setTransition(o, d, r.to.x, o.to))), ("content" === m || "both" === m) && r.from.y !== r.to.y && (y = y.concat(u).concat(c), o.from = t.effects.setTransition(o, u, r.from.y, o.from), o.to = t.effects.setTransition(o, u, r.to.y, o.to)), t.effects.save(o, y), o.show(), t.effects.createWrapper(o), o.css("overflow", "hidden").css(o.from), g && (s = t.effects.getBaseline(g, n), o.from.top = (n.outerHeight - o.outerHeight()) * s.y, o.from.left = (n.outerWidth - o.outerWidth()) * s.x, o.to.top = (n.outerHeight - o.to.outerHeight) * s.y, o.to.left = (n.outerWidth - o.to.outerWidth) * s.x), o.css(o.from), ("content" === m || "both" === m) && (h = h.concat(["marginTop", "marginBottom"]).concat(u), d = d.concat(["marginLeft", "marginRight"]), c = a.concat(h).concat(d), o.find("*[width]").each(function() {
                var i = t(this),
                    n = {
                        height: i.height(),
                        width: i.width(),
                        outerHeight: i.outerHeight(),
                        outerWidth: i.outerWidth()
                    };
                f && t.effects.save(i, c), i.from = {
                    height: n.height * r.from.y,
                    width: n.width * r.from.x,
                    outerHeight: n.outerHeight * r.from.y,
                    outerWidth: n.outerWidth * r.from.x
                }, i.to = {
                    height: n.height * r.to.y,
                    width: n.width * r.to.x,
                    outerHeight: n.height * r.to.y,
                    outerWidth: n.width * r.to.x
                }, r.from.y !== r.to.y && (i.from = t.effects.setTransition(i, h, r.from.y, i.from), i.to = t.effects.setTransition(i, h, r.to.y, i.to)), r.from.x !== r.to.x && (i.from = t.effects.setTransition(i, d, r.from.x, i.from), i.to = t.effects.setTransition(i, d, r.to.x, i.to)), i.css(i.from), i.animate(i.to, e.duration, e.easing, function() {
                    f && t.effects.restore(i, c)
                })
            })), o.animate(o.to, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: function() {
                    0 === o.to.opacity && o.css("opacity", o.from.opacity), "hide" === p && o.hide(), t.effects.restore(o, y), f || ("static" === v ? o.css({
                        position: "relative",
                        top: o.to.top,
                        left: o.to.left
                    }) : t.each(["top", "left"], function(t, e) {
                        o.css(e, function(e, i) {
                            var n = parseInt(i, 10),
                                s = t ? o.to.left : o.to.top;
                            return "auto" === i ? s + "px" : n + s + "px"
                        })
                    })), t.effects.removeWrapper(o), i()
                }
            })
        }
    }(jQuery),
    function(t) {
        t.effects.effect.shake = function(e, i) {
            var n, s = t(this),
                r = ["position", "top", "bottom", "left", "right", "height", "width"],
                o = t.effects.setMode(s, e.mode || "effect"),
                a = e.direction || "left",
                l = e.distance || 20,
                c = e.times || 3,
                u = 2 * c + 1,
                h = Math.round(e.duration / u),
                d = "up" === a || "down" === a ? "top" : "left",
                p = "up" === a || "left" === a,
                f = {},
                m = {},
                g = {},
                v = s.queue(),
                y = v.length;
            for (t.effects.save(s, r), s.show(), t.effects.createWrapper(s), f[d] = (p ? "-=" : "+=") + l, m[d] = (p ? "+=" : "-=") + 2 * l, g[d] = (p ? "-=" : "+=") + 2 * l, s.animate(f, h, e.easing), n = 1; c > n; n++) s.animate(m, h, e.easing).animate(g, h, e.easing);
            s.animate(m, h, e.easing).animate(f, h / 2, e.easing).queue(function() {
                "hide" === o && s.hide(), t.effects.restore(s, r), t.effects.removeWrapper(s), i()
            }), y > 1 && v.splice.apply(v, [1, 0].concat(v.splice(y, u + 1))), s.dequeue()
        }
    }(jQuery),
    function(t) {
        t.effects.effect.slide = function(e, i) {
            var n, s = t(this),
                r = ["position", "top", "bottom", "left", "right", "width", "height"],
                o = t.effects.setMode(s, e.mode || "show"),
                a = "show" === o,
                l = e.direction || "left",
                c = "up" === l || "down" === l ? "top" : "left",
                u = "up" === l || "left" === l,
                h = {};
            t.effects.save(s, r), s.show(), n = e.distance || s["top" === c ? "outerHeight" : "outerWidth"](!0), t.effects.createWrapper(s).css({
                overflow: "hidden"
            }), a && s.css(c, u ? isNaN(n) ? "-" + n : -n : n), h[c] = (a ? u ? "+=" : "-=" : u ? "-=" : "+=") + n, s.animate(h, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: function() {
                    "hide" === o && s.hide(), t.effects.restore(s, r), t.effects.removeWrapper(s), i()
                }
            })
        }
    }(jQuery),
    function(t) {
        t.effects.effect.transfer = function(e, i) {
            var n = t(this),
                s = t(e.to),
                r = "fixed" === s.css("position"),
                o = t("body"),
                a = r ? o.scrollTop() : 0,
                l = r ? o.scrollLeft() : 0,
                c = s.offset(),
                u = {
                    top: c.top - a,
                    left: c.left - l,
                    height: s.innerHeight(),
                    width: s.innerWidth()
                },
                h = n.offset(),
                d = t("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(e.className).css({
                    top: h.top - a,
                    left: h.left - l,
                    height: n.innerHeight(),
                    width: n.innerWidth(),
                    position: r ? "fixed" : "absolute"
                }).animate(u, e.duration, e.easing, function() {
                    d.remove(), i()
                })
        }
    }(jQuery),
    function(t, e) {
        t.widget("ui.progressbar", {
            version: "1.10.3",
            options: {
                max: 100,
                value: 0,
                change: null,
                complete: null
            },
            min: 0,
            _create: function() {
                this.oldValue = this.options.value = this._constrainedValue(), this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                    role: "progressbar",
                    "aria-valuemin": this.min
                }), this.valueDiv = t("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this._refreshValue()
            },
            _destroy: function() {
                this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove()
            },
            value: function(t) {
                return t === e ? this.options.value : (this.options.value = this._constrainedValue(t), this._refreshValue(), void 0)
            },
            _constrainedValue: function(t) {
                return t === e && (t = this.options.value), this.indeterminate = t === !1, "number" != typeof t && (t = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, t))
            },
            _setOptions: function(t) {
                var e = t.value;
                delete t.value, this._super(t), this.options.value = this._constrainedValue(e), this._refreshValue()
            },
            _setOption: function(t, e) {
                "max" === t && (e = Math.max(this.min, e)), this._super(t, e)
            },
            _percentage: function() {
                return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
            },
            _refreshValue: function() {
                var e = this.options.value,
                    i = this._percentage();
                this.valueDiv.toggle(this.indeterminate || e > this.min).toggleClass("ui-corner-right", e === this.options.max).width(i.toFixed(0) + "%"), this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = t("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": e
                }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== e && (this.oldValue = e, this._trigger("change")), e === this.options.max && this._trigger("complete")
            }
        })
    }(jQuery),
    function(t) {
        t.widget("ui.selectable", t.ui.mouse, {
            version: "1.10.3",
            options: {
                appendTo: "body",
                autoRefresh: !0,
                distance: 0,
                filter: "*",
                tolerance: "touch",
                selected: null,
                selecting: null,
                start: null,
                stop: null,
                unselected: null,
                unselecting: null
            },
            _create: function() {
                var e, i = this;
                this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
                    e = t(i.options.filter, i.element[0]), e.addClass("ui-selectee"), e.each(function() {
                        var e = t(this),
                            i = e.offset();
                        t.data(this, "selectable-item", {
                            element: this,
                            $element: e,
                            left: i.left,
                            top: i.top,
                            right: i.left + e.outerWidth(),
                            bottom: i.top + e.outerHeight(),
                            startselected: !1,
                            selected: e.hasClass("ui-selected"),
                            selecting: e.hasClass("ui-selecting"),
                            unselecting: e.hasClass("ui-unselecting")
                        })
                    })
                }, this.refresh(), this.selectees = e.addClass("ui-selectee"), this._mouseInit(), this.helper = t("<div class='ui-selectable-helper'></div>")
            },
            _destroy: function() {
                this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
            },
            _mouseStart: function(e) {
                var i = this,
                    n = this.options;
                this.opos = [e.pageX, e.pageY], this.options.disabled || (this.selectees = t(n.filter, this.element[0]), this._trigger("start", e), t(n.appendTo).append(this.helper), this.helper.css({
                    left: e.pageX,
                    top: e.pageY,
                    width: 0,
                    height: 0
                }), n.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                    var n = t.data(this, "selectable-item");
                    n.startselected = !0, e.metaKey || e.ctrlKey || (n.$element.removeClass("ui-selected"), n.selected = !1, n.$element.addClass("ui-unselecting"), n.unselecting = !0, i._trigger("unselecting", e, {
                        unselecting: n.element
                    }))
                }), t(e.target).parents().addBack().each(function() {
                    var n, s = t.data(this, "selectable-item");
                    return s ? (n = !e.metaKey && !e.ctrlKey || !s.$element.hasClass("ui-selected"), s.$element.removeClass(n ? "ui-unselecting" : "ui-selected").addClass(n ? "ui-selecting" : "ui-unselecting"), s.unselecting = !n, s.selecting = n, s.selected = n, n ? i._trigger("selecting", e, {
                        selecting: s.element
                    }) : i._trigger("unselecting", e, {
                        unselecting: s.element
                    }), !1) : void 0
                }))
            },
            _mouseDrag: function(e) {
                if (this.dragged = !0, !this.options.disabled) {
                    var i, n = this,
                        s = this.options,
                        r = this.opos[0],
                        o = this.opos[1],
                        a = e.pageX,
                        l = e.pageY;
                    return r > a && (i = a, a = r, r = i), o > l && (i = l, l = o, o = i), this.helper.css({
                        left: r,
                        top: o,
                        width: a - r,
                        height: l - o
                    }), this.selectees.each(function() {
                        var i = t.data(this, "selectable-item"),
                            c = !1;
                        i && i.element !== n.element[0] && ("touch" === s.tolerance ? c = !(i.left > a || i.right < r || i.top > l || i.bottom < o) : "fit" === s.tolerance && (c = i.left > r && i.right < a && i.top > o && i.bottom < l), c ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, n._trigger("selecting", e, {
                            selecting: i.element
                        }))) : (i.selecting && ((e.metaKey || e.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), n._trigger("unselecting", e, {
                            unselecting: i.element
                        }))), i.selected && (e.metaKey || e.ctrlKey || i.startselected || (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, n._trigger("unselecting", e, {
                            unselecting: i.element
                        })))))
                    }), !1
                }
            },
            _mouseStop: function(e) {
                var i = this;
                return this.dragged = !1, t(".ui-unselecting", this.element[0]).each(function() {
                    var n = t.data(this, "selectable-item");
                    n.$element.removeClass("ui-unselecting"), n.unselecting = !1, n.startselected = !1, i._trigger("unselected", e, {
                        unselected: n.element
                    })
                }), t(".ui-selecting", this.element[0]).each(function() {
                    var n = t.data(this, "selectable-item");
                    n.$element.removeClass("ui-selecting").addClass("ui-selected"), n.selecting = !1, n.selected = !0, n.startselected = !0, i._trigger("selected", e, {
                        selected: n.element
                    })
                }), this._trigger("stop", e), this.helper.remove(), !1
            }
        })
    }(jQuery),
    function(t) {
        var e = 5;
        t.widget("ui.slider", t.ui.mouse, {
            version: "1.10.3",
            widgetEventPrefix: "slide",
            options: {
                animate: !1,
                distance: 0,
                max: 100,
                min: 0,
                orientation: "horizontal",
                range: !1,
                step: 1,
                value: 0,
                values: null,
                change: null,
                slide: null,
                start: null,
                stop: null
            },
            _create: function() {
                this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
            },
            _refresh: function() {
                this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
            },
            _createHandles: function() {
                var e, i, n = this.options,
                    s = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                    r = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
                    o = [];
                for (i = n.values && n.values.length || 1, s.length > i && (s.slice(i).remove(), s = s.slice(0, i)), e = s.length; i > e; e++) o.push(r);
                this.handles = s.add(t(o.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(e) {
                    t(this).data("ui-slider-handle-index", e)
                })
            },
            _createRange: function() {
                var e = this.options,
                    i = "";
                e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                    left: "",
                    bottom: ""
                }) : (this.range = t("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === e.range || "max" === e.range ? " ui-slider-range-" + e.range : ""))) : this.range = t([])
            },
            _setupEvents: function() {
                var t = this.handles.add(this.range).filter("a");
                this._off(t), this._on(t, this._handleEvents), this._hoverable(t), this._focusable(t)
            },
            _destroy: function() {
                this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
            },
            _mouseCapture: function(e) {
                var i, n, s, r, o, a, l, c, u = this,
                    h = this.options;
                return h.disabled ? !1 : (this.elementSize = {
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight()
                }, this.elementOffset = this.element.offset(), i = {
                    x: e.pageX,
                    y: e.pageY
                }, n = this._normValueFromMouse(i), s = this._valueMax() - this._valueMin() + 1, this.handles.each(function(e) {
                    var i = Math.abs(n - u.values(e));
                    (s > i || s === i && (e === u._lastChangedValue || u.values(e) === h.min)) && (s = i, r = t(this), o = e)
                }), a = this._start(e, o), a === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = o, r.addClass("ui-state-active").focus(), l = r.offset(), c = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = c ? {
                    left: 0,
                    top: 0
                } : {
                    left: e.pageX - l.left - r.width() / 2,
                    top: e.pageY - l.top - r.height() / 2 - (parseInt(r.css("borderTopWidth"), 10) || 0) - (parseInt(r.css("borderBottomWidth"), 10) || 0) + (parseInt(r.css("marginTop"), 10) || 0)
                }, this.handles.hasClass("ui-state-hover") || this._slide(e, o, n), this._animateOff = !0, !0))
            },
            _mouseStart: function() {
                return !0
            },
            _mouseDrag: function(t) {
                var e = {
                        x: t.pageX,
                        y: t.pageY
                    },
                    i = this._normValueFromMouse(e);
                return this._slide(t, this._handleIndex, i), !1
            },
            _mouseStop: function(t) {
                return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
            },
            _detectOrientation: function() {
                this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
            },
            _normValueFromMouse: function(t) {
                var e, i, n, s, r;
                return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), n = i / e, n > 1 && (n = 1), 0 > n && (n = 0), "vertical" === this.orientation && (n = 1 - n), s = this._valueMax() - this._valueMin(), r = this._valueMin() + n * s, this._trimAlignValue(r)
            },
            _start: function(t, e) {
                var i = {
                    handle: this.handles[e],
                    value: this.value()
                };
                return this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("start", t, i)
            },
            _slide: function(t, e, i) {
                var n, s, r;
                this.options.values && this.options.values.length ? (n = this.values(e ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === e && i > n || 1 === e && n > i) && (i = n), i !== this.values(e) && (s = this.values(), s[e] = i, r = this._trigger("slide", t, {
                    handle: this.handles[e],
                    value: i,
                    values: s
                }), n = this.values(e ? 0 : 1), r !== !1 && this.values(e, i, !0))) : i !== this.value() && (r = this._trigger("slide", t, {
                    handle: this.handles[e],
                    value: i
                }), r !== !1 && this.value(i))
            },
            _stop: function(t, e) {
                var i = {
                    handle: this.handles[e],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("stop", t, i)
            },
            _change: function(t, e) {
                if (!this._keySliding && !this._mouseSliding) {
                    var i = {
                        handle: this.handles[e],
                        value: this.value()
                    };
                    this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._lastChangedValue = e, this._trigger("change", t, i)
                }
            },
            value: function(t) {
                return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), this._change(null, 0), void 0) : this._value()
            },
            values: function(e, i) {
                var n, s, r;
                if (arguments.length > 1) return this.options.values[e] = this._trimAlignValue(i), this._refreshValue(), this._change(null, e), void 0;
                if (!arguments.length) return this._values();
                if (!t.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(e) : this.value();
                for (n = this.options.values, s = arguments[0], r = 0; r < n.length; r += 1) n[r] = this._trimAlignValue(s[r]), this._change(null, r);
                this._refreshValue()
            },
            _setOption: function(e, i) {
                var n, s = 0;
                switch ("range" === e && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (s = this.options.values.length), t.Widget.prototype._setOption.apply(this, arguments), e) {
                    case "orientation":
                        this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                        break;
                    case "value":
                        this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                        break;
                    case "values":
                        for (this._animateOff = !0, this._refreshValue(), n = 0; s > n; n += 1) this._change(null, n);
                        this._animateOff = !1;
                        break;
                    case "min":
                    case "max":
                        this._animateOff = !0, this._refreshValue(), this._animateOff = !1;
                        break;
                    case "range":
                        this._animateOff = !0, this._refresh(), this._animateOff = !1
                }
            },
            _value: function() {
                var t = this.options.value;
                return t = this._trimAlignValue(t)
            },
            _values: function(t) {
                var e, i, n;
                if (arguments.length) return e = this.options.values[t], e = this._trimAlignValue(e);
                if (this.options.values && this.options.values.length) {
                    for (i = this.options.values.slice(), n = 0; n < i.length; n += 1) i[n] = this._trimAlignValue(i[n]);
                    return i
                }
                return []
            },
            _trimAlignValue: function(t) {
                if (t <= this._valueMin()) return this._valueMin();
                if (t >= this._valueMax()) return this._valueMax();
                var e = this.options.step > 0 ? this.options.step : 1,
                    i = (t - this._valueMin()) % e,
                    n = t - i;
                return 2 * Math.abs(i) >= e && (n += i > 0 ? e : -e), parseFloat(n.toFixed(5))
            },
            _valueMin: function() {
                return this.options.min
            },
            _valueMax: function() {
                return this.options.max
            },
            _refreshValue: function() {
                var e, i, n, s, r, o = this.options.range,
                    a = this.options,
                    l = this,
                    c = this._animateOff ? !1 : a.animate,
                    u = {};
                this.options.values && this.options.values.length ? this.handles.each(function(n) {
                    i = 100 * ((l.values(n) - l._valueMin()) / (l._valueMax() - l._valueMin())), u["horizontal" === l.orientation ? "left" : "bottom"] = i + "%", t(this).stop(1, 1)[c ? "animate" : "css"](u, a.animate), l.options.range === !0 && ("horizontal" === l.orientation ? (0 === n && l.range.stop(1, 1)[c ? "animate" : "css"]({
                        left: i + "%"
                    }, a.animate), 1 === n && l.range[c ? "animate" : "css"]({
                        width: i - e + "%"
                    }, {
                        queue: !1,
                        duration: a.animate
                    })) : (0 === n && l.range.stop(1, 1)[c ? "animate" : "css"]({
                        bottom: i + "%"
                    }, a.animate), 1 === n && l.range[c ? "animate" : "css"]({
                        height: i - e + "%"
                    }, {
                        queue: !1,
                        duration: a.animate
                    }))), e = i
                }) : (n = this.value(), s = this._valueMin(), r = this._valueMax(), i = r !== s ? 100 * ((n - s) / (r - s)) : 0, u["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[c ? "animate" : "css"](u, a.animate), "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[c ? "animate" : "css"]({
                    width: i + "%"
                }, a.animate), "max" === o && "horizontal" === this.orientation && this.range[c ? "animate" : "css"]({
                    width: 100 - i + "%"
                }, {
                    queue: !1,
                    duration: a.animate
                }), "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[c ? "animate" : "css"]({
                    height: i + "%"
                }, a.animate), "max" === o && "vertical" === this.orientation && this.range[c ? "animate" : "css"]({
                    height: 100 - i + "%"
                }, {
                    queue: !1,
                    duration: a.animate
                }))
            },
            _handleEvents: {
                keydown: function(i) {
                    var n, s, r, o, a = t(i.target).data("ui-slider-handle-index");
                    switch (i.keyCode) {
                        case t.ui.keyCode.HOME:
                        case t.ui.keyCode.END:
                        case t.ui.keyCode.PAGE_UP:
                        case t.ui.keyCode.PAGE_DOWN:
                        case t.ui.keyCode.UP:
                        case t.ui.keyCode.RIGHT:
                        case t.ui.keyCode.DOWN:
                        case t.ui.keyCode.LEFT:
                            if (i.preventDefault(), !this._keySliding && (this._keySliding = !0, t(i.target).addClass("ui-state-active"), n = this._start(i, a), n === !1)) return
                    }
                    switch (o = this.options.step, s = r = this.options.values && this.options.values.length ? this.values(a) : this.value(), i.keyCode) {
                        case t.ui.keyCode.HOME:
                            r = this._valueMin();
                            break;
                        case t.ui.keyCode.END:
                            r = this._valueMax();
                            break;
                        case t.ui.keyCode.PAGE_UP:
                            r = this._trimAlignValue(s + (this._valueMax() - this._valueMin()) / e);
                            break;
                        case t.ui.keyCode.PAGE_DOWN:
                            r = this._trimAlignValue(s - (this._valueMax() - this._valueMin()) / e);
                            break;
                        case t.ui.keyCode.UP:
                        case t.ui.keyCode.RIGHT:
                            if (s === this._valueMax()) return;
                            r = this._trimAlignValue(s + o);
                            break;
                        case t.ui.keyCode.DOWN:
                        case t.ui.keyCode.LEFT:
                            if (s === this._valueMin()) return;
                            r = this._trimAlignValue(s - o)
                    }
                    this._slide(i, a, r)
                },
                click: function(t) {
                    t.preventDefault()
                },
                keyup: function(e) {
                    var i = t(e.target).data("ui-slider-handle-index");
                    this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), t(e.target).removeClass("ui-state-active"))
                }
            }
        })
    }(jQuery),
    function(t) {
        function e(t, e, i) {
            return t > e && e + i > t
        }

        function i(t) {
            return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
        }
        t.widget("ui.sortable", t.ui.mouse, {
            version: "1.10.3",
            widgetEventPrefix: "sort",
            ready: !1,
            options: {
                appendTo: "parent",
                axis: !1,
                connectWith: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                dropOnEmpty: !0,
                forcePlaceholderSize: !1,
                forceHelperSize: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                items: "> *",
                opacity: !1,
                placeholder: !1,
                revert: !1,
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                scope: "default",
                tolerance: "intersect",
                zIndex: 1e3,
                activate: null,
                beforeStop: null,
                change: null,
                deactivate: null,
                out: null,
                over: null,
                receive: null,
                remove: null,
                sort: null,
                start: null,
                stop: null,
                update: null
            },
            _create: function() {
                var t = this.options;
                this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === t.axis || i(this.items[0].item) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
            },
            _destroy: function() {
                this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
                for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + "-item");
                return this
            },
            _setOption: function(e, i) {
                "disabled" === e ? (this.options[e] = i, this.widget().toggleClass("ui-sortable-disabled", !!i)) : t.Widget.prototype._setOption.apply(this, arguments)
            },
            _mouseCapture: function(e, i) {
                var n = null,
                    s = !1,
                    r = this;
                return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(e), t(e.target).parents().each(function() {
                    return t.data(this, r.widgetName + "-item") === r ? (n = t(this), !1) : void 0
                }), t.data(e.target, r.widgetName + "-item") === r && (n = t(e.target)), n ? !this.options.handle || i || (t(this.options.handle, n).find("*").addBack().each(function() {
                    this === e.target && (s = !0)
                }), s) ? (this.currentItem = n, this._removeCurrentsFromItems(), !0) : !1 : !1)
            },
            _mouseStart: function(e, i, n) {
                var s, r, o = this.options;
                if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                        top: this.offset.top - this.margins.top,
                        left: this.offset.left - this.margins.left
                    }, t.extend(this.offset, {
                        click: {
                            left: e.pageX - this.offset.left,
                            top: e.pageY - this.offset.top
                        },
                        parent: this._getParentOffset(),
                        relative: this._getRelativeOffset()
                    }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), this.domPosition = {
                        prev: this.currentItem.prev()[0],
                        parent: this.currentItem.parent()[0]
                    }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), o.containment && this._setContainment(), o.cursor && "auto" !== o.cursor && (r = this.document.find("body"), this.storedCursor = r.css("cursor"), r.css("cursor", o.cursor), this.storedStylesheet = t("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(r)), o.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", o.opacity)), o.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", o.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !n)
                    for (s = this.containers.length - 1; s >= 0; s--) this.containers[s]._trigger("activate", e, this._uiHash(this));
                return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !o.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(e), !0
            },
            _mouseDrag: function(e) {
                var i, n, s, r, o = this.options,
                    a = !1;
                for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < o.scrollSensitivity ? this.scrollParent[0].scrollTop = a = this.scrollParent[0].scrollTop + o.scrollSpeed : e.pageY - this.overflowOffset.top < o.scrollSensitivity && (this.scrollParent[0].scrollTop = a = this.scrollParent[0].scrollTop - o.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < o.scrollSensitivity ? this.scrollParent[0].scrollLeft = a = this.scrollParent[0].scrollLeft + o.scrollSpeed : e.pageX - this.overflowOffset.left < o.scrollSensitivity && (this.scrollParent[0].scrollLeft = a = this.scrollParent[0].scrollLeft - o.scrollSpeed)) : (e.pageY - t(document).scrollTop() < o.scrollSensitivity ? a = t(document).scrollTop(t(document).scrollTop() - o.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < o.scrollSensitivity && (a = t(document).scrollTop(t(document).scrollTop() + o.scrollSpeed)), e.pageX - t(document).scrollLeft() < o.scrollSensitivity ? a = t(document).scrollLeft(t(document).scrollLeft() - o.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < o.scrollSensitivity && (a = t(document).scrollLeft(t(document).scrollLeft() + o.scrollSpeed))), a !== !1 && t.ui.ddmanager && !o.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--)
                    if (n = this.items[i], s = n.item[0], r = this._intersectsWithPointer(n), r && n.instance === this.currentContainer && s !== this.currentItem[0] && this.placeholder[1 === r ? "next" : "prev"]()[0] !== s && !t.contains(this.placeholder[0], s) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], s) : !0)) {
                        if (this.direction = 1 === r ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(n)) break;
                        this._rearrange(e, n), this._trigger("change", e, this._uiHash());
                        break
                    }
                return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
            },
            _mouseStop: function(e, i) {
                if (e) {
                    if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
                        var n = this,
                            s = this.placeholder.offset(),
                            r = this.options.axis,
                            o = {};
                        r && "x" !== r || (o.left = s.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), r && "y" !== r || (o.top = s.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(o, parseInt(this.options.revert, 10) || 500, function() {
                            n._clear(e)
                        })
                    } else this._clear(e, i);
                    return !1
                }
            },
            cancel: function() {
                if (this.dragging) {
                    this._mouseUp({
                        target: null
                    }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                    for (var e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
                }
                return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
                    helper: null,
                    dragging: !1,
                    reverting: !1,
                    _noFinalSort: null
                }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this
            },
            serialize: function(e) {
                var i = this._getItemsAsjQuery(e && e.connected),
                    n = [];
                return e = e || {}, t(i).each(function() {
                    var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
                    i && n.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
                }), !n.length && e.key && n.push(e.key + "="), n.join("&")
            },
            toArray: function(e) {
                var i = this._getItemsAsjQuery(e && e.connected),
                    n = [];
                return e = e || {}, i.each(function() {
                    n.push(t(e.item || this).attr(e.attribute || "id") || "")
                }), n
            },
            _intersectsWith: function(t) {
                var e = this.positionAbs.left,
                    i = e + this.helperProportions.width,
                    n = this.positionAbs.top,
                    s = n + this.helperProportions.height,
                    r = t.left,
                    o = r + t.width,
                    a = t.top,
                    l = a + t.height,
                    c = this.offset.click.top,
                    u = this.offset.click.left,
                    h = "x" === this.options.axis || n + c > a && l > n + c,
                    d = "y" === this.options.axis || e + u > r && o > e + u,
                    p = h && d;
                return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : r < e + this.helperProportions.width / 2 && i - this.helperProportions.width / 2 < o && a < n + this.helperProportions.height / 2 && s - this.helperProportions.height / 2 < l
            },
            _intersectsWithPointer: function(t) {
                var i = "x" === this.options.axis || e(this.positionAbs.top + this.offset.click.top, t.top, t.height),
                    n = "y" === this.options.axis || e(this.positionAbs.left + this.offset.click.left, t.left, t.width),
                    s = i && n,
                    r = this._getDragVerticalDirection(),
                    o = this._getDragHorizontalDirection();
                return s ? this.floating ? o && "right" === o || "down" === r ? 2 : 1 : r && ("down" === r ? 2 : 1) : !1
            },
            _intersectsWithSides: function(t) {
                var i = e(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
                    n = e(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
                    s = this._getDragVerticalDirection(),
                    r = this._getDragHorizontalDirection();
                return this.floating && r ? "right" === r && n || "left" === r && !n : s && ("down" === s && i || "up" === s && !i)
            },
            _getDragVerticalDirection: function() {
                var t = this.positionAbs.top - this.lastPositionAbs.top;
                return 0 !== t && (t > 0 ? "down" : "up")
            },
            _getDragHorizontalDirection: function() {
                var t = this.positionAbs.left - this.lastPositionAbs.left;
                return 0 !== t && (t > 0 ? "right" : "left")
            },
            refresh: function(t) {
                return this._refreshItems(t), this.refreshPositions(), this
            },
            _connectWith: function() {
                var t = this.options;
                return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
            },
            _getItemsAsjQuery: function(e) {
                var i, n, s, r, o = [],
                    a = [],
                    l = this._connectWith();
                if (l && e)
                    for (i = l.length - 1; i >= 0; i--)
                        for (s = t(l[i]), n = s.length - 1; n >= 0; n--) r = t.data(s[n], this.widgetFullName), r && r !== this && !r.options.disabled && a.push([t.isFunction(r.options.items) ? r.options.items.call(r.element) : t(r.options.items, r.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), r]);
                for (a.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                        options: this.options,
                        item: this.currentItem
                    }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), i = a.length - 1; i >= 0; i--) a[i][0].each(function() {
                    o.push(this)
                });
                return t(o)
            },
            _removeCurrentsFromItems: function() {
                var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
                this.items = t.grep(this.items, function(t) {
                    for (var i = 0; i < e.length; i++)
                        if (e[i] === t.item[0]) return !1;
                    return !0
                })
            },
            _refreshItems: function(e) {
                this.items = [], this.containers = [this];
                var i, n, s, r, o, a, l, c, u = this.items,
                    h = [
                        [t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
                            item: this.currentItem
                        }) : t(this.options.items, this.element), this]
                    ],
                    d = this._connectWith();
                if (d && this.ready)
                    for (i = d.length - 1; i >= 0; i--)
                        for (s = t(d[i]), n = s.length - 1; n >= 0; n--) r = t.data(s[n], this.widgetFullName), r && r !== this && !r.options.disabled && (h.push([t.isFunction(r.options.items) ? r.options.items.call(r.element[0], e, {
                            item: this.currentItem
                        }) : t(r.options.items, r.element), r]), this.containers.push(r));
                for (i = h.length - 1; i >= 0; i--)
                    for (o = h[i][1], a = h[i][0], n = 0, c = a.length; c > n; n++) l = t(a[n]), l.data(this.widgetName + "-item", o), u.push({
                        item: l,
                        instance: o,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
            },
            refreshPositions: function(e) {
                this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
                var i, n, s, r;
                for (i = this.items.length - 1; i >= 0; i--) n = this.items[i], n.instance !== this.currentContainer && this.currentContainer && n.item[0] !== this.currentItem[0] || (s = this.options.toleranceElement ? t(this.options.toleranceElement, n.item) : n.item, e || (n.width = s.outerWidth(), n.height = s.outerHeight()), r = s.offset(), n.left = r.left, n.top = r.top);
                if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
                else
                    for (i = this.containers.length - 1; i >= 0; i--) r = this.containers[i].element.offset(), this.containers[i].containerCache.left = r.left, this.containers[i].containerCache.top = r.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
                return this
            },
            _createPlaceholder: function(e) {
                e = e || this;
                var i, n = e.options;
                n.placeholder && n.placeholder.constructor !== String || (i = n.placeholder, n.placeholder = {
                    element: function() {
                        var n = e.currentItem[0].nodeName.toLowerCase(),
                            s = t("<" + n + ">", e.document[0]).addClass(i || e.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                        return "tr" === n ? e.currentItem.children().each(function() {
                            t("<td>&#160;</td>", e.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(s)
                        }) : "img" === n && s.attr("src", e.currentItem.attr("src")), i || s.css("visibility", "hidden"), s
                    },
                    update: function(t, s) {
                        (!i || n.forcePlaceholderSize) && (s.height() || s.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), s.width() || s.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
                    }
                }), e.placeholder = t(n.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), n.placeholder.update(e, e.placeholder)
            },
            _contactContainers: function(n) {
                var s, r, o, a, l, c, u, h, d, p, f = null,
                    m = null;
                for (s = this.containers.length - 1; s >= 0; s--)
                    if (!t.contains(this.currentItem[0], this.containers[s].element[0]))
                        if (this._intersectsWith(this.containers[s].containerCache)) {
                            if (f && t.contains(this.containers[s].element[0], f.element[0])) continue;
                            f = this.containers[s], m = s
                        } else this.containers[s].containerCache.over && (this.containers[s]._trigger("out", n, this._uiHash(this)), this.containers[s].containerCache.over = 0);
                if (f)
                    if (1 === this.containers.length) this.containers[m].containerCache.over || (this.containers[m]._trigger("over", n, this._uiHash(this)), this.containers[m].containerCache.over = 1);
                    else {
                        for (o = 1e4, a = null, p = f.floating || i(this.currentItem), l = p ? "left" : "top", c = p ? "width" : "height", u = this.positionAbs[l] + this.offset.click[l], r = this.items.length - 1; r >= 0; r--) t.contains(this.containers[m].element[0], this.items[r].item[0]) && this.items[r].item[0] !== this.currentItem[0] && (!p || e(this.positionAbs.top + this.offset.click.top, this.items[r].top, this.items[r].height)) && (h = this.items[r].item.offset()[l], d = !1, Math.abs(h - u) > Math.abs(h + this.items[r][c] - u) && (d = !0, h += this.items[r][c]), Math.abs(h - u) < o && (o = Math.abs(h - u), a = this.items[r], this.direction = d ? "up" : "down"));
                        if (!a && !this.options.dropOnEmpty) return;
                        if (this.currentContainer === this.containers[m]) return;
                        a ? this._rearrange(n, a, null, !0) : this._rearrange(n, null, this.containers[m].element, !0), this._trigger("change", n, this._uiHash()), this.containers[m]._trigger("change", n, this._uiHash(this)), this.currentContainer = this.containers[m], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[m]._trigger("over", n, this._uiHash(this)), this.containers[m].containerCache.over = 1
                    }
            },
            _createHelper: function(e) {
                var i = this.options,
                    n = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
                return n.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(n[0]), n[0] === this.currentItem[0] && (this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }), (!n[0].style.width || i.forceHelperSize) && n.width(this.currentItem.width()), (!n[0].style.height || i.forceHelperSize) && n.height(this.currentItem.height()), n
            },
            _adjustOffsetFromHelper: function(e) {
                "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                    left: +e[0],
                    top: +e[1] || 0
                }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
            },
            _getParentOffset: function() {
                this.offsetParent = this.helper.offsetParent();
                var e = this.offsetParent.offset();
                return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                    top: 0,
                    left: 0
                }), {
                    top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if ("relative" === this.cssPosition) {
                    var t = this.currentItem.position();
                    return {
                        top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                        left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                    top: parseInt(this.currentItem.css("marginTop"), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var e, i, n, s = this.options;
                "parent" === s.containment && (s.containment = this.helper[0].parentNode), ("document" === s.containment || "window" === s.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, t("document" === s.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (t("document" === s.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(s.containment) || (e = t(s.containment)[0], i = t(s.containment).offset(), n = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (n ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (n ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
            },
            _convertPositionTo: function(e, i) {
                i || (i = this.position);
                var n = "absolute" === e ? 1 : -1,
                    s = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    r = /(html|body)/i.test(s[0].tagName);
                return {
                    top: i.top + this.offset.relative.top * n + this.offset.parent.top * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : r ? 0 : s.scrollTop()) * n,
                    left: i.left + this.offset.relative.left * n + this.offset.parent.left * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : r ? 0 : s.scrollLeft()) * n
                }
            },
            _generatePosition: function(e) {
                var i, n, s = this.options,
                    r = e.pageX,
                    o = e.pageY,
                    a = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    l = /(html|body)/i.test(a[0].tagName);
                return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (r = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (o = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (r = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (o = this.containment[3] + this.offset.click.top)), s.grid && (i = this.originalPageY + Math.round((o - this.originalPageY) / s.grid[1]) * s.grid[1], o = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - s.grid[1] : i + s.grid[1] : i, n = this.originalPageX + Math.round((r - this.originalPageX) / s.grid[0]) * s.grid[0], r = this.containment ? n - this.offset.click.left >= this.containment[0] && n - this.offset.click.left <= this.containment[2] ? n : n - this.offset.click.left >= this.containment[0] ? n - s.grid[0] : n + s.grid[0] : n)), {
                    top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : l ? 0 : a.scrollTop()),
                    left: r - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : l ? 0 : a.scrollLeft())
                }
            },
            _rearrange: function(t, e, i, n) {
                i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
                var s = this.counter;
                this._delay(function() {
                    s === this.counter && this.refreshPositions(!n)
                })
            },
            _clear: function(t, e) {
                this.reverting = !1;
                var i, n = [];
                if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                    for (i in this._storedCSS)("auto" === this._storedCSS[i] || "static" === this._storedCSS[i]) && (this._storedCSS[i] = "");
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else this.currentItem.show();
                for (this.fromOutside && !e && n.push(function(t) {
                        this._trigger("receive", t, this._uiHash(this.fromOutside))
                    }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || n.push(function(t) {
                        this._trigger("update", t, this._uiHash())
                    }), this !== this.currentContainer && (e || (n.push(function(t) {
                        this._trigger("remove", t, this._uiHash())
                    }), n.push(function(t) {
                        return function(e) {
                            t._trigger("receive", e, this._uiHash(this))
                        }
                    }.call(this, this.currentContainer)), n.push(function(t) {
                        return function(e) {
                            t._trigger("update", e, this._uiHash(this))
                        }
                    }.call(this, this.currentContainer)))), i = this.containers.length - 1; i >= 0; i--) e || n.push(function(t) {
                    return function(e) {
                        t._trigger("deactivate", e, this._uiHash(this))
                    }
                }.call(this, this.containers[i])), this.containers[i].containerCache.over && (n.push(function(t) {
                    return function(e) {
                        t._trigger("out", e, this._uiHash(this))
                    }
                }.call(this, this.containers[i])), this.containers[i].containerCache.over = 0);
                if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
                    if (!e) {
                        for (this._trigger("beforeStop", t, this._uiHash()), i = 0; i < n.length; i++) n[i].call(this, t);
                        this._trigger("stop", t, this._uiHash())
                    }
                    return this.fromOutside = !1, !1
                }
                if (e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !e) {
                    for (i = 0; i < n.length; i++) n[i].call(this, t);
                    this._trigger("stop", t, this._uiHash())
                }
                return this.fromOutside = !1, !0
            },
            _trigger: function() {
                t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
            },
            _uiHash: function(e) {
                var i = e || this;
                return {
                    helper: i.helper,
                    placeholder: i.placeholder || t([]),
                    position: i.position,
                    originalPosition: i.originalPosition,
                    offset: i.positionAbs,
                    item: i.currentItem,
                    sender: e ? e.element : null
                }
            }
        })
    }(jQuery),
    function(t) {
        function e(t) {
            return function() {
                var e = this.element.val();
                t.apply(this, arguments), this._refresh(), e !== this.element.val() && this._trigger("change")
            }
        }
        t.widget("ui.spinner", {
            version: "1.10.3",
            defaultElement: "<input>",
            widgetEventPrefix: "spin",
            options: {
                culture: null,
                icons: {
                    down: "ui-icon-triangle-1-s",
                    up: "ui-icon-triangle-1-n"
                },
                incremental: !0,
                max: null,
                min: null,
                numberFormat: null,
                page: 10,
                step: 1,
                change: null,
                spin: null,
                start: null,
                stop: null
            },
            _create: function() {
                this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
                    beforeunload: function() {
                        this.element.removeAttr("autocomplete")
                    }
                })
            },
            _getCreateOptions: function() {
                var e = {},
                    i = this.element;
                return t.each(["min", "max", "step"], function(t, n) {
                    var s = i.attr(n);
                    void 0 !== s && s.length && (e[n] = s)
                }), e
            },
            _events: {
                keydown: function(t) {
                    this._start(t) && this._keydown(t) && t.preventDefault()
                },
                keyup: "_stop",
                focus: function() {
                    this.previous = this.element.val()
                },
                blur: function(t) {
                    return this.cancelBlur ? (delete this.cancelBlur, void 0) : (this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", t), void 0)
                },
                mousewheel: function(t, e) {
                    if (e) {
                        if (!this.spinning && !this._start(t)) return !1;
                        this._spin((e > 0 ? 1 : -1) * this.options.step, t), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function() {
                            this.spinning && this._stop(t)
                        }, 100), t.preventDefault()
                    }
                },
                "mousedown .ui-spinner-button": function(e) {
                    function i() {
                        var t = this.element[0] === this.document[0].activeElement;
                        t || (this.element.focus(), this.previous = n, this._delay(function() {
                            this.previous = n
                        }))
                    }
                    var n;
                    n = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), e.preventDefault(), i.call(this), this.cancelBlur = !0, this._delay(function() {
                        delete this.cancelBlur, i.call(this)
                    }), this._start(e) !== !1 && this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e)
                },
                "mouseup .ui-spinner-button": "_stop",
                "mouseenter .ui-spinner-button": function(e) {
                    return t(e.currentTarget).hasClass("ui-state-active") ? this._start(e) === !1 ? !1 : (this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e), void 0) : void 0
                },
                "mouseleave .ui-spinner-button": "_stop"
            },
            _draw: function() {
                var t = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
                this.element.attr("role", "spinbutton"), this.buttons = t.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(.5 * t.height()) && t.height() > 0 && t.height(t.height()), this.options.disabled && this.disable()
            },
            _keydown: function(e) {
                var i = this.options,
                    n = t.ui.keyCode;
                switch (e.keyCode) {
                    case n.UP:
                        return this._repeat(null, 1, e), !0;
                    case n.DOWN:
                        return this._repeat(null, -1, e), !0;
                    case n.PAGE_UP:
                        return this._repeat(null, i.page, e), !0;
                    case n.PAGE_DOWN:
                        return this._repeat(null, -i.page, e), !0
                }
                return !1
            },
            _uiSpinnerHtml: function() {
                return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
            },
            _buttonHtml: function() {
                return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span>" + "</a>" + "<a class='ui-spinner-button ui-spinner-down ui-corner-br'>" + "<span class='ui-icon " + this.options.icons.down + "'>&#9660;</span>" + "</a>"
            },
            _start: function(t) {
                return this.spinning || this._trigger("start", t) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1
            },
            _repeat: function(t, e, i) {
                t = t || 500, clearTimeout(this.timer), this.timer = this._delay(function() {
                    this._repeat(40, e, i)
                }, t), this._spin(e * this.options.step, i)
            },
            _spin: function(t, e) {
                var i = this.value() || 0;
                this.counter || (this.counter = 1), i = this._adjustValue(i + t * this._increment(this.counter)), this.spinning && this._trigger("spin", e, {
                    value: i
                }) === !1 || (this._value(i), this.counter++)
            },
            _increment: function(e) {
                var i = this.options.incremental;
                return i ? t.isFunction(i) ? i(e) : Math.floor(e * e * e / 5e4 - e * e / 500 + 17 * e / 200 + 1) : 1
            },
            _precision: function() {
                var t = this._precisionOf(this.options.step);
                return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t
            },
            _precisionOf: function(t) {
                var e = t.toString(),
                    i = e.indexOf(".");
                return -1 === i ? 0 : e.length - i - 1
            },
            _adjustValue: function(t) {
                var e, i, n = this.options;
                return e = null !== n.min ? n.min : 0, i = t - e, i = Math.round(i / n.step) * n.step, t = e + i, t = parseFloat(t.toFixed(this._precision())), null !== n.max && t > n.max ? n.max : null !== n.min && t < n.min ? n.min : t
            },
            _stop: function(t) {
                this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", t))
            },
            _setOption: function(t, e) {
                if ("culture" === t || "numberFormat" === t) {
                    var i = this._parse(this.element.val());
                    return this.options[t] = e, this.element.val(this._format(i)), void 0
                }("max" === t || "min" === t || "step" === t) && "string" == typeof e && (e = this._parse(e)), "icons" === t && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(e.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(e.down)), this._super(t, e), "disabled" === t && (e ? (this.element.prop("disabled", !0), this.buttons.button("disable")) : (this.element.prop("disabled", !1), this.buttons.button("enable")))
            },
            _setOptions: e(function(t) {
                this._super(t), this._value(this.element.val())
            }),
            _parse: function(t) {
                return "string" == typeof t && "" !== t && (t = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(t, 10, this.options.culture) : +t), "" === t || isNaN(t) ? null : t
            },
            _format: function(t) {
                return "" === t ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(t, this.options.numberFormat, this.options.culture) : t
            },
            _refresh: function() {
                this.element.attr({
                    "aria-valuemin": this.options.min,
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": this._parse(this.element.val())
                })
            },
            _value: function(t, e) {
                var i;
                "" !== t && (i = this._parse(t), null !== i && (e || (i = this._adjustValue(i)), t = this._format(i))), this.element.val(t), this._refresh()
            },
            _destroy: function() {
                this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element)
            },
            stepUp: e(function(t) {
                this._stepUp(t)
            }),
            _stepUp: function(t) {
                this._start() && (this._spin((t || 1) * this.options.step), this._stop())
            },
            stepDown: e(function(t) {
                this._stepDown(t)
            }),
            _stepDown: function(t) {
                this._start() && (this._spin((t || 1) * -this.options.step), this._stop())
            },
            pageUp: e(function(t) {
                this._stepUp((t || 1) * this.options.page)
            }),
            pageDown: e(function(t) {
                this._stepDown((t || 1) * this.options.page)
            }),
            value: function(t) {
                return arguments.length ? (e(this._value).call(this, t), void 0) : this._parse(this.element.val())
            },
            widget: function() {
                return this.uiSpinner
            }
        })
    }(jQuery),
    function(t, e) {
        function i() {
            return ++s
        }

        function n(t) {
            return t.hash.length > 1 && decodeURIComponent(t.href.replace(r, "")) === decodeURIComponent(location.href.replace(r, ""))
        }
        var s = 0,
            r = /#.*$/;
        t.widget("ui.tabs", {
            version: "1.10.3",
            delay: 300,
            options: {
                active: null,
                collapsible: !1,
                event: "click",
                heightStyle: "content",
                hide: null,
                show: null,
                activate: null,
                beforeActivate: null,
                beforeLoad: null,
                load: null
            },
            _create: function() {
                var e = this,
                    i = this.options;
                this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function(e) {
                    t(this).is(".ui-state-disabled") && e.preventDefault()
                }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
                    t(this).closest("li").is(".ui-state-disabled") && this.blur()
                }), this._processTabs(), i.active = this._initialActive(), t.isArray(i.disabled) && (i.disabled = t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"), function(t) {
                    return e.tabs.index(t)
                }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(i.active) : t(), this._refresh(), this.active.length && this.load(i.active)
            },
            _initialActive: function() {
                var e = this.options.active,
                    i = this.options.collapsible,
                    n = location.hash.substring(1);
                return null === e && (n && this.tabs.each(function(i, s) {
                    return t(s).attr("aria-controls") === n ? (e = i, !1) : void 0
                }), null === e && (e = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === e || -1 === e) && (e = this.tabs.length ? 0 : !1)), e !== !1 && (e = this.tabs.index(this.tabs.eq(e)), -1 === e && (e = i ? !1 : 0)), !i && e === !1 && this.anchors.length && (e = 0), e
            },
            _getCreateEventData: function() {
                return {
                    tab: this.active,
                    panel: this.active.length ? this._getPanelForTab(this.active) : t()
                }
            },
            _tabKeydown: function(e) {
                var i = t(this.document[0].activeElement).closest("li"),
                    n = this.tabs.index(i),
                    s = !0;
                if (!this._handlePageNav(e)) {
                    switch (e.keyCode) {
                        case t.ui.keyCode.RIGHT:
                        case t.ui.keyCode.DOWN:
                            n++;
                            break;
                        case t.ui.keyCode.UP:
                        case t.ui.keyCode.LEFT:
                            s = !1, n--;
                            break;
                        case t.ui.keyCode.END:
                            n = this.anchors.length - 1;
                            break;
                        case t.ui.keyCode.HOME:
                            n = 0;
                            break;
                        case t.ui.keyCode.SPACE:
                            return e.preventDefault(), clearTimeout(this.activating), this._activate(n), void 0;
                        case t.ui.keyCode.ENTER:
                            return e.preventDefault(), clearTimeout(this.activating), this._activate(n === this.options.active ? !1 : n), void 0;
                        default:
                            return
                    }
                    e.preventDefault(), clearTimeout(this.activating), n = this._focusNextTab(n, s), e.ctrlKey || (i.attr("aria-selected", "false"), this.tabs.eq(n).attr("aria-selected", "true"), this.activating = this._delay(function() {
                        this.option("active", n)
                    }, this.delay))
                }
            },
            _panelKeydown: function(e) {
                this._handlePageNav(e) || e.ctrlKey && e.keyCode === t.ui.keyCode.UP && (e.preventDefault(), this.active.focus())
            },
            _handlePageNav: function(e) {
                return e.altKey && e.keyCode === t.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : e.altKey && e.keyCode === t.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
            },
            _findNextTab: function(e, i) {
                function n() {
                    return e > s && (e = 0), 0 > e && (e = s), e
                }
                for (var s = this.tabs.length - 1; - 1 !== t.inArray(n(), this.options.disabled);) e = i ? e + 1 : e - 1;
                return e
            },
            _focusNextTab: function(t, e) {
                return t = this._findNextTab(t, e), this.tabs.eq(t).focus(), t
            },
            _setOption: function(t, e) {
                return "active" === t ? (this._activate(e), void 0) : "disabled" === t ? (this._setupDisabled(e), void 0) : (this._super(t, e), "collapsible" === t && (this.element.toggleClass("ui-tabs-collapsible", e), e || this.options.active !== !1 || this._activate(0)), "event" === t && this._setupEvents(e), "heightStyle" === t && this._setupHeightStyle(e), void 0)
            },
            _tabId: function(t) {
                return t.attr("aria-controls") || "ui-tabs-" + i()
            },
            _sanitizeSelector: function(t) {
                return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
            },
            refresh: function() {
                var e = this.options,
                    i = this.tablist.children(":has(a[href])");
                e.disabled = t.map(i.filter(".ui-state-disabled"), function(t) {
                    return i.index(t)
                }), this._processTabs(), e.active !== !1 && this.anchors.length ? this.active.length && !t.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e.disabled.length ? (e.active = !1, this.active = t()) : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1)) : e.active = this.tabs.index(this.active) : (e.active = !1, this.active = t()), this._refresh()
            },
            _refresh: function() {
                this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                    "aria-selected": "false",
                    tabIndex: -1
                }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                    "aria-expanded": "false",
                    "aria-hidden": "true"
                }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                    "aria-selected": "true",
                    tabIndex: 0
                }), this._getPanelForTab(this.active).show().attr({
                    "aria-expanded": "true",
                    "aria-hidden": "false"
                })) : this.tabs.eq(0).attr("tabIndex", 0)
            },
            _processTabs: function() {
                var e = this;
                this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist"), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                    role: "tab",
                    tabIndex: -1
                }), this.anchors = this.tabs.map(function() {
                    return t("a", this)[0]
                }).addClass("ui-tabs-anchor").attr({
                    role: "presentation",
                    tabIndex: -1
                }), this.panels = t(), this.anchors.each(function(i, s) {
                    var r, o, a, l = t(s).uniqueId().attr("id"),
                        c = t(s).closest("li"),
                        u = c.attr("aria-controls");
                    n(s) ? (r = s.hash, o = e.element.find(e._sanitizeSelector(r))) : (a = e._tabId(c), r = "#" + a, o = e.element.find(r), o.length || (o = e._createPanel(a), o.insertAfter(e.panels[i - 1] || e.tablist)), o.attr("aria-live", "polite")), o.length && (e.panels = e.panels.add(o)), u && c.data("ui-tabs-aria-controls", u), c.attr({
                        "aria-controls": r.substring(1),
                        "aria-labelledby": l
                    }), o.attr("aria-labelledby", l)
                }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
            },
            _getList: function() {
                return this.element.find("ol,ul").eq(0)
            },
            _createPanel: function(e) {
                return t("<div>").attr("id", e).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
            },
            _setupDisabled: function(e) {
                t.isArray(e) && (e.length ? e.length === this.anchors.length && (e = !0) : e = !1);
                for (var i, n = 0; i = this.tabs[n]; n++) e === !0 || -1 !== t.inArray(n, e) ? t(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : t(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");
                this.options.disabled = e
            },
            _setupEvents: function(e) {
                var i = {
                    click: function(t) {
                        t.preventDefault()
                    }
                };
                e && t.each(e.split(" "), function(t, e) {
                    i[e] = "_eventHandler"
                }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(this.anchors, i), this._on(this.tabs, {
                    keydown: "_tabKeydown"
                }), this._on(this.panels, {
                    keydown: "_panelKeydown"
                }), this._focusable(this.tabs), this._hoverable(this.tabs)
            },
            _setupHeightStyle: function(e) {
                var i, n = this.element.parent();
                "fill" === e ? (i = n.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
                    var e = t(this),
                        n = e.css("position");
                    "absolute" !== n && "fixed" !== n && (i -= e.outerHeight(!0))
                }), this.element.children().not(this.panels).each(function() {
                    i -= t(this).outerHeight(!0)
                }), this.panels.each(function() {
                    t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()))
                }).css("overflow", "auto")) : "auto" === e && (i = 0, this.panels.each(function() {
                    i = Math.max(i, t(this).height("").height())
                }).height(i))
            },
            _eventHandler: function(e) {
                var i = this.options,
                    n = this.active,
                    s = t(e.currentTarget),
                    r = s.closest("li"),
                    o = r[0] === n[0],
                    a = o && i.collapsible,
                    l = a ? t() : this._getPanelForTab(r),
                    c = n.length ? this._getPanelForTab(n) : t(),
                    u = {
                        oldTab: n,
                        oldPanel: c,
                        newTab: a ? t() : r,
                        newPanel: l
                    };
                e.preventDefault(), r.hasClass("ui-state-disabled") || r.hasClass("ui-tabs-loading") || this.running || o && !i.collapsible || this._trigger("beforeActivate", e, u) === !1 || (i.active = a ? !1 : this.tabs.index(r), this.active = o ? t() : r, this.xhr && this.xhr.abort(), c.length || l.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."), l.length && this.load(this.tabs.index(r), e), this._toggle(e, u))
            },
            _toggle: function(e, i) {
                function n() {
                    r.running = !1, r._trigger("activate", e, i)
                }

                function s() {
                    i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), o.length && r.options.show ? r._show(o, r.options.show, n) : (o.show(), n())
                }
                var r = this,
                    o = i.newPanel,
                    a = i.oldPanel;
                this.running = !0, a.length && this.options.hide ? this._hide(a, this.options.hide, function() {
                    i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), s()
                }) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), a.hide(), s()), a.attr({
                    "aria-expanded": "false",
                    "aria-hidden": "true"
                }), i.oldTab.attr("aria-selected", "false"), o.length && a.length ? i.oldTab.attr("tabIndex", -1) : o.length && this.tabs.filter(function() {
                    return 0 === t(this).attr("tabIndex")
                }).attr("tabIndex", -1), o.attr({
                    "aria-expanded": "true",
                    "aria-hidden": "false"
                }), i.newTab.attr({
                    "aria-selected": "true",
                    tabIndex: 0
                })
            },
            _activate: function(e) {
                var i, n = this._findActive(e);
                n[0] !== this.active[0] && (n.length || (n = this.active), i = n.find(".ui-tabs-anchor")[0], this._eventHandler({
                    target: i,
                    currentTarget: i,
                    preventDefault: t.noop
                }))
            },
            _findActive: function(e) {
                return e === !1 ? t() : this.tabs.eq(e)
            },
            _getIndex: function(t) {
                return "string" == typeof t && (t = this.anchors.index(this.anchors.filter("[href$='" + t + "']"))), t
            },
            _destroy: function() {
                this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function() {
                    t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
                }), this.tabs.each(function() {
                    var e = t(this),
                        i = e.data("ui-tabs-aria-controls");
                    i ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls")
                }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
            },
            enable: function(i) {
                var n = this.options.disabled;
                n !== !1 && (i === e ? n = !1 : (i = this._getIndex(i), n = t.isArray(n) ? t.map(n, function(t) {
                    return t !== i ? t : null
                }) : t.map(this.tabs, function(t, e) {
                    return e !== i ? e : null
                })), this._setupDisabled(n))
            },
            disable: function(i) {
                var n = this.options.disabled;
                if (n !== !0) {
                    if (i === e) n = !0;
                    else {
                        if (i = this._getIndex(i), -1 !== t.inArray(i, n)) return;
                        n = t.isArray(n) ? t.merge([i], n).sort() : [i]
                    }
                    this._setupDisabled(n)
                }
            },
            load: function(e, i) {
                e = this._getIndex(e);
                var s = this,
                    r = this.tabs.eq(e),
                    o = r.find(".ui-tabs-anchor"),
                    a = this._getPanelForTab(r),
                    l = {
                        tab: r,
                        panel: a
                    };
                n(o[0]) || (this.xhr = t.ajax(this._ajaxSettings(o, i, l)), this.xhr && "canceled" !== this.xhr.statusText && (r.addClass("ui-tabs-loading"), a.attr("aria-busy", "true"), this.xhr.success(function(t) {
                    setTimeout(function() {
                        a.html(t), s._trigger("load", i, l)
                    }, 1)
                }).complete(function(t, e) {
                    setTimeout(function() {
                        "abort" === e && s.panels.stop(!1, !0), r.removeClass("ui-tabs-loading"), a.removeAttr("aria-busy"), t === s.xhr && delete s.xhr
                    }, 1)
                })))
            },
            _ajaxSettings: function(e, i, n) {
                var s = this;
                return {
                    url: e.attr("href"),
                    beforeSend: function(e, r) {
                        return s._trigger("beforeLoad", i, t.extend({
                            jqXHR: e,
                            ajaxSettings: r
                        }, n))
                    }
                }
            },
            _getPanelForTab: function(e) {
                var i = t(e).attr("aria-controls");
                return this.element.find(this._sanitizeSelector("#" + i))
            }
        })
    }(jQuery),
    function(t) {
        function e(e, i) {
            var n = (e.attr("aria-describedby") || "").split(/\s+/);
            n.push(i), e.data("ui-tooltip-id", i).attr("aria-describedby", t.trim(n.join(" ")))
        }

        function i(e) {
            var i = e.data("ui-tooltip-id"),
                n = (e.attr("aria-describedby") || "").split(/\s+/),
                s = t.inArray(i, n); - 1 !== s && n.splice(s, 1), e.removeData("ui-tooltip-id"), n = t.trim(n.join(" ")), n ? e.attr("aria-describedby", n) : e.removeAttr("aria-describedby")
        }
        var n = 0;
        t.widget("ui.tooltip", {
            version: "1.10.3",
            options: {
                content: function() {
                    var e = t(this).attr("title") || "";
                    return t("<a>").text(e).html()
                },
                hide: !0,
                items: "[title]:not([disabled])",
                position: {
                    my: "left top+15",
                    at: "left bottom",
                    collision: "flipfit flip"
                },
                show: !0,
                tooltipClass: null,
                track: !1,
                close: null,
                open: null
            },
            _create: function() {
                this._on({
                    mouseover: "open",
                    focusin: "open"
                }), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable()
            },
            _setOption: function(e, i) {
                var n = this;
                return "disabled" === e ? (this[i ? "_disable" : "_enable"](), this.options[e] = i, void 0) : (this._super(e, i), "content" === e && t.each(this.tooltips, function(t, e) {
                    n._updateContent(e)
                }), void 0)
            },
            _disable: function() {
                var e = this;
                t.each(this.tooltips, function(i, n) {
                    var s = t.Event("blur");
                    s.target = s.currentTarget = n[0], e.close(s, !0)
                }), this.element.find(this.options.items).addBack().each(function() {
                    var e = t(this);
                    e.is("[title]") && e.data("ui-tooltip-title", e.attr("title")).attr("title", "")
                })
            },
            _enable: function() {
                this.element.find(this.options.items).addBack().each(function() {
                    var e = t(this);
                    e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title"))
                })
            },
            open: function(e) {
                var i = this,
                    n = t(e ? e.target : this.element).closest(this.options.items);
                n.length && !n.data("ui-tooltip-id") && (n.attr("title") && n.data("ui-tooltip-title", n.attr("title")), n.data("ui-tooltip-open", !0), e && "mouseover" === e.type && n.parents().each(function() {
                    var e, n = t(this);
                    n.data("ui-tooltip-open") && (e = t.Event("blur"), e.target = e.currentTarget = this, i.close(e, !0)), n.attr("title") && (n.uniqueId(), i.parents[this.id] = {
                        element: this,
                        title: n.attr("title")
                    }, n.attr("title", ""))
                }), this._updateContent(n, e))
            },
            _updateContent: function(t, e) {
                var i, n = this.options.content,
                    s = this,
                    r = e ? e.type : null;
                return "string" == typeof n ? this._open(e, t, n) : (i = n.call(t[0], function(i) {
                    t.data("ui-tooltip-open") && s._delay(function() {
                        e && (e.type = r), this._open(e, t, i)
                    })
                }), i && this._open(e, t, i), void 0)
            },
            _open: function(i, n, s) {
                function r(t) {
                    c.of = t, o.is(":hidden") || o.position(c)
                }
                var o, a, l, c = t.extend({}, this.options.position);
                if (s) {
                    if (o = this._find(n), o.length) return o.find(".ui-tooltip-content").html(s), void 0;
                    n.is("[title]") && (i && "mouseover" === i.type ? n.attr("title", "") : n.removeAttr("title")), o = this._tooltip(n), e(n, o.attr("id")), o.find(".ui-tooltip-content").html(s), this.options.track && i && /^mouse/.test(i.type) ? (this._on(this.document, {
                        mousemove: r
                    }), r(i)) : o.position(t.extend({
                        of: n
                    }, this.options.position)), o.hide(), this._show(o, this.options.show), this.options.show && this.options.show.delay && (l = this.delayedShow = setInterval(function() {
                        o.is(":visible") && (r(c.of), clearInterval(l))
                    }, t.fx.interval)), this._trigger("open", i, {
                        tooltip: o
                    }), a = {
                        keyup: function(e) {
                            if (e.keyCode === t.ui.keyCode.ESCAPE) {
                                var i = t.Event(e);
                                i.currentTarget = n[0], this.close(i, !0)
                            }
                        },
                        remove: function() {
                            this._removeTooltip(o)
                        }
                    }, i && "mouseover" !== i.type || (a.mouseleave = "close"), i && "focusin" !== i.type || (a.focusout = "close"), this._on(!0, n, a)
                }
            },
            close: function(e) {
                var n = this,
                    s = t(e ? e.currentTarget : this.element),
                    r = this._find(s);
                this.closing || (clearInterval(this.delayedShow), s.data("ui-tooltip-title") && s.attr("title", s.data("ui-tooltip-title")), i(s), r.stop(!0), this._hide(r, this.options.hide, function() {
                    n._removeTooltip(t(this))
                }), s.removeData("ui-tooltip-open"), this._off(s, "mouseleave focusout keyup"), s[0] !== this.element[0] && this._off(s, "remove"), this._off(this.document, "mousemove"), e && "mouseleave" === e.type && t.each(this.parents, function(e, i) {
                    t(i.element).attr("title", i.title), delete n.parents[e]
                }), this.closing = !0, this._trigger("close", e, {
                    tooltip: r
                }), this.closing = !1)
            },
            _tooltip: function(e) {
                var i = "ui-tooltip-" + n++,
                    s = t("<div>").attr({
                        id: i,
                        role: "tooltip"
                    }).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
                return t("<div>").addClass("ui-tooltip-content").appendTo(s), s.appendTo(this.document[0].body), this.tooltips[i] = e, s
            },
            _find: function(e) {
                var i = e.data("ui-tooltip-id");
                return i ? t("#" + i) : t()
            },
            _removeTooltip: function(t) {
                t.remove(), delete this.tooltips[t.attr("id")]
            },
            _destroy: function() {
                var e = this;
                t.each(this.tooltips, function(i, n) {
                    var s = t.Event("blur");
                    s.target = s.currentTarget = n[0], e.close(s, !0), t("#" + i).remove(), n.data("ui-tooltip-title") && (n.attr("title", n.data("ui-tooltip-title")), n.removeData("ui-tooltip-title"))
                })
            }
        })
    }(jQuery), void 0 === jQuery.migrateMute && (jQuery.migrateMute = !0),
    function(t, e, i) {
        function n(i) {
            var n = e.console;
            r[i] || (r[i] = !0, t.migrateWarnings.push(i), n && n.warn && !t.migrateMute && (n.warn("JQMIGRATE: " + i), t.migrateTrace && n.trace && n.trace()))
        }

        function s(e, s, r, o) {
            if (Object.defineProperty) try {
                return Object.defineProperty(e, s, {
                    configurable: !0,
                    enumerable: !0,
                    get: function() {
                        return n(o), r
                    },
                    set: function(t) {
                        n(o), r = t
                    }
                }), i
            } catch (a) {}
            t._definePropertyBroken = !0, e[s] = r
        }
        var r = {};
        t.migrateWarnings = [], !t.migrateMute && e.console && e.console.log && e.console.log("JQMIGRATE: Logging is active"), t.migrateTrace === i && (t.migrateTrace = !0), t.migrateReset = function() {
            r = {}, t.migrateWarnings.length = 0
        }, "BackCompat" === document.compatMode && n("jQuery is not compatible with Quirks Mode");
        var o = t("<input/>", {
                size: 1
            }).attr("size") && t.attrFn,
            a = t.attr,
            l = t.attrHooks.value && t.attrHooks.value.get || function() {
                return null
            },
            c = t.attrHooks.value && t.attrHooks.value.set || function() {
                return i
            },
            u = /^(?:input|button)$/i,
            h = /^[238]$/,
            d = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
            p = /^(?:checked|selected)$/i;
        s(t, "attrFn", o || {}, "jQuery.attrFn is deprecated"), t.attr = function(e, s, r, l) {
            var c = s.toLowerCase(),
                f = e && e.nodeType;
            return l && (4 > a.length && n("jQuery.fn.attr( props, pass ) is deprecated"), e && !h.test(f) && (o ? s in o : t.isFunction(t.fn[s]))) ? t(e)[s](r) : ("type" === s && r !== i && u.test(e.nodeName) && e.parentNode && n("Can't change the 'type' of an input or button in IE 6/7/8"), !t.attrHooks[c] && d.test(c) && (t.attrHooks[c] = {
                get: function(e, n) {
                    var s, r = t.prop(e, n);
                    return r === !0 || "boolean" != typeof r && (s = e.getAttributeNode(n)) && s.nodeValue !== !1 ? n.toLowerCase() : i
                },
                set: function(e, i, n) {
                    var s;
                    return i === !1 ? t.removeAttr(e, n) : (s = t.propFix[n] || n, s in e && (e[s] = !0), e.setAttribute(n, n.toLowerCase())), n
                }
            }, p.test(c) && n("jQuery.fn.attr('" + c + "') may use property instead of attribute")), a.call(t, e, s, r))
        }, t.attrHooks.value = {
            get: function(t, e) {
                var i = (t.nodeName || "").toLowerCase();
                return "button" === i ? l.apply(this, arguments) : ("input" !== i && "option" !== i && n("jQuery.fn.attr('value') no longer gets properties"), e in t ? t.value : null)
            },
            set: function(t, e) {
                var s = (t.nodeName || "").toLowerCase();
                return "button" === s ? c.apply(this, arguments) : ("input" !== s && "option" !== s && n("jQuery.fn.attr('value', val) no longer sets properties"), t.value = e, i)
            }
        };
        var f, m, g = t.fn.init,
            v = t.parseJSON,
            y = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
        t.fn.init = function(e, i, s) {
            var r;
            return e && "string" == typeof e && !t.isPlainObject(i) && (r = y.exec(t.trim(e))) && r[0] && ("<" !== e.charAt(0) && n("$(html) HTML strings must start with '<' character"), r[3] && n("$(html) HTML text after last tag is ignored"), "#" === r[0].charAt(0) && (n("HTML string cannot start with a '#' character"), t.error("JQMIGRATE: Invalid selector string (XSS)")), i && i.context && (i = i.context), t.parseHTML) ? g.call(this, t.parseHTML(r[2], i, !0), i, s) : g.apply(this, arguments)
        }, t.fn.init.prototype = t.fn, t.parseJSON = function(t) {
            return t || null === t ? v.apply(this, arguments) : (n("jQuery.parseJSON requires a valid JSON string"), null)
        }, t.uaMatch = function(t) {
            t = t.toLowerCase();
            var e = /(chrome)[ \/]([\w.]+)/.exec(t) || /(webkit)[ \/]([\w.]+)/.exec(t) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t) || /(msie) ([\w.]+)/.exec(t) || 0 > t.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t) || [];
            return {
                browser: e[1] || "",
                version: e[2] || "0"
            }
        }, t.browser || (f = t.uaMatch(navigator.userAgent), m = {}, f.browser && (m[f.browser] = !0, m.version = f.version), m.chrome ? m.webkit = !0 : m.webkit && (m.safari = !0), t.browser = m), s(t, "browser", t.browser, "jQuery.browser is deprecated"), t.sub = function() {
            function e(t, i) {
                return new e.fn.init(t, i)
            }
            t.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub, e.fn.init = function(n, s) {
                return s && s instanceof t && !(s instanceof e) && (s = e(s)), t.fn.init.call(this, n, s, i)
            }, e.fn.init.prototype = e.fn;
            var i = e(document);
            return n("jQuery.sub() is deprecated"), e
        }, t.ajaxSetup({
            converters: {
                "text json": t.parseJSON
            }
        });
        var b = t.fn.data;
        t.fn.data = function(e) {
            var s, r, o = this[0];
            return !o || "events" !== e || 1 !== arguments.length || (s = t.data(o, e), r = t._data(o, e), s !== i && s !== r || r === i) ? b.apply(this, arguments) : (n("Use of jQuery.fn.data('events') is deprecated"), r)
        };
        var w = /\/(java|ecma)script/i,
            _ = t.fn.andSelf || t.fn.addBack;
        t.fn.andSelf = function() {
            return n("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), _.apply(this, arguments)
        }, t.clean || (t.clean = function(e, s, r, o) {
            s = s || document, s = !s.nodeType && s[0] || s, s = s.ownerDocument || s, n("jQuery.clean() is deprecated");
            var a, l, c, u, h = [];
            if (t.merge(h, t.buildFragment(e, s).childNodes), r)
                for (c = function(t) {
                        return !t.type || w.test(t.type) ? o ? o.push(t.parentNode ? t.parentNode.removeChild(t) : t) : r.appendChild(t) : i
                    }, a = 0; null != (l = h[a]); a++) t.nodeName(l, "script") && c(l) || (r.appendChild(l), l.getElementsByTagName !== i && (u = t.grep(t.merge([], l.getElementsByTagName("script")), c), h.splice.apply(h, [a + 1, 0].concat(u)), a += u.length));
            return h
        });
        var x = t.event.add,
            C = t.event.remove,
            k = t.event.trigger,
            T = t.fn.toggle,
            M = t.fn.live,
            E = t.fn.die,
            D = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
            S = RegExp("\\b(?:" + D + ")\\b"),
            I = /(?:^|\s)hover(\.\S+|)\b/,
            j = function(e) {
                return "string" != typeof e || t.event.special.hover ? e : (I.test(e) && n("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), e && e.replace(I, "mouseenter$1 mouseleave$1"))
            };
        t.event.props && "attrChange" !== t.event.props[0] && t.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"), t.event.dispatch && s(t.event, "handle", t.event.dispatch, "jQuery.event.handle is undocumented and deprecated"), t.event.add = function(t, e, i, s, r) {
            t !== document && S.test(e) && n("AJAX events should be attached to document: " + e), x.call(this, t, j(e || ""), i, s, r)
        }, t.event.remove = function(t, e, i, n, s) {
            C.call(this, t, j(e) || "", i, n, s)
        }, t.fn.error = function() {
            var t = Array.prototype.slice.call(arguments, 0);
            return n("jQuery.fn.error() is deprecated"), t.splice(0, 0, "error"), arguments.length ? this.bind.apply(this, t) : (this.triggerHandler.apply(this, t), this)
        }, t.fn.toggle = function(e, i) {
            if (!t.isFunction(e) || !t.isFunction(i)) return T.apply(this, arguments);
            n("jQuery.fn.toggle(handler, handler...) is deprecated");
            var s = arguments,
                r = e.guid || t.guid++,
                o = 0,
                a = function(i) {
                    var n = (t._data(this, "lastToggle" + e.guid) || 0) % o;
                    return t._data(this, "lastToggle" + e.guid, n + 1), i.preventDefault(), s[n].apply(this, arguments) || !1
                };
            for (a.guid = r; s.length > o;) s[o++].guid = r;
            return this.click(a)
        }, t.fn.live = function(e, i, s) {
            return n("jQuery.fn.live() is deprecated"), M ? M.apply(this, arguments) : (t(this.context).on(e, this.selector, i, s), this)
        }, t.fn.die = function(e, i) {
            return n("jQuery.fn.die() is deprecated"), E ? E.apply(this, arguments) : (t(this.context).off(e, this.selector || "**", i), this)
        }, t.event.trigger = function(t, e, i, s) {
            return i || S.test(t) || n("Global events are undocumented and deprecated"), k.call(this, t, e, i || document, s)
        }, t.each(D.split("|"), function(e, i) {
            t.event.special[i] = {
                setup: function() {
                    var e = this;
                    return e !== document && (t.event.add(document, i + "." + t.guid, function() {
                        t.event.trigger(i, null, e, !0)
                    }), t._data(this, i, t.guid++)), !1
                },
                teardown: function() {
                    return this !== document && t.event.remove(document, i + "." + t._data(this, i)), !1
                }
            }
        })
    }(jQuery, window),
    function(t) {
        "use strict";
        t(window.jQuery, window, document)
    }(function(t, e, i, n) {
        "use strict";
        t.widget("selectBox.selectBoxIt", {
            VERSION: "3.6.0",
            options: {
                showEffect: "none",
                showEffectOptions: {},
                showEffectSpeed: "medium",
                hideEffect: "none",
                hideEffectOptions: {},
                hideEffectSpeed: "medium",
                showFirstOption: !0,
                defaultText: "",
                defaultIcon: "",
                downArrowIcon: "",
                theme: "default",
                keydownOpen: !0,
                isMobile: function() {
                    var t = navigator.userAgent || navigator.vendor || e.opera;
                    return /iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/.test(t)
                },
                "native": !1,
                aggressiveChange: !1,
                selectWhenHidden: !0,
                viewport: t(e),
                similarSearch: !1,
                copyAttributes: ["title", "rel"],
                copyClasses: "button",
                nativeMousedown: !1,
                customShowHideEvent: !1,
                autoWidth: !0,
                html: !0,
                populate: "",
                dynamicPositioning: !0,
                hideCurrent: !1
            },
            getThemes: function() {
                var e = this,
                    i = t(e.element).attr("data-theme") || "c";
                return {
                    bootstrap: {
                        focus: "active",
                        hover: "",
                        enabled: "enabled",
                        disabled: "disabled",
                        arrow: "caret",
                        button: "btn",
                        list: "dropdown-menu",
                        container: "bootstrap",
                        open: "open"
                    },
                    jqueryui: {
                        focus: "ui-state-focus",
                        hover: "ui-state-hover",
                        enabled: "ui-state-enabled",
                        disabled: "ui-state-disabled",
                        arrow: "ui-icon ui-icon-triangle-1-s",
                        button: "ui-widget ui-state-default",
                        list: "ui-widget ui-widget-content",
                        container: "jqueryui",
                        open: "selectboxit-open"
                    },
                    jquerymobile: {
                        focus: "ui-btn-down-" + i,
                        hover: "ui-btn-hover-" + i,
                        enabled: "ui-enabled",
                        disabled: "ui-disabled",
                        arrow: "ui-icon ui-icon-arrow-d ui-icon-shadow",
                        button: "ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-" + i,
                        list: "ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-" + i,
                        container: "jquerymobile",
                        open: "selectboxit-open"
                    },
                    "default": {
                        focus: "selectboxit-focus",
                        hover: "selectboxit-hover",
                        enabled: "selectboxit-enabled",
                        disabled: "selectboxit-disabled",
                        arrow: "selectboxit-default-arrow",
                        button: "selectboxit-btn",
                        list: "selectboxit-list",
                        container: "selectboxit-container",
                        open: "selectboxit-open"
                    }
                }
            },
            isDeferred: function(e) {
                return t.isPlainObject(e) && e.promise && e.done
            },
            _create: function(e) {
                var n = this,
                    s = n.options.populate;
                if (n.element.is("select")) return n.widgetProto = t.Widget.prototype, n.originalElem = n.element[0], n.selectBox = n.element, n.options.populate && n.add && !e && n.add(s), n.selectItems = n.element.find("option"), n.firstSelectItem = n.selectItems.slice(0, 1), n.documentHeight = t(i).height(), n.theme = n.getThemes()[n.options.theme] || n.getThemes()["default"], n.currentFocus = 0, n.blur = !0, n.textArray = [], n.currentIndex = 0, n.currentText = "", n.flipped = !1, e || (n.selectBoxStyles = n.selectBox.attr("style")), n._createDropdownButton()._createUnorderedList()._copyAttributes()._replaceSelectBox()._addClasses(n.theme)._eventHandlers(), n.originalElem.disabled && n.disable && n.disable(), n._ariaAccessibility && n._ariaAccessibility(), n.isMobile = n.options.isMobile(), n._mobile && n._mobile(), n.options["native"] && this._applyNativeSelect(), n.triggerEvent("create"), n
            },
            _createDropdownButton: function() {
                var e = this,
                    i = e.originalElemId = e.originalElem.id || "",
                    n = e.originalElemValue = e.originalElem.value || "",
                    s = e.originalElemName = e.originalElem.name || "",
                    r = e.options.copyClasses,
                    o = e.selectBox.attr("class") || "";
                return e.dropdownText = t("<span/>", {
                    id: i && i + "SelectBoxItText",
                    "class": "selectboxit-text",
                    unselectable: "on",
                    text: e.firstSelectItem.text()
                }).attr("data-val", n), e.dropdownImageContainer = t("<span/>", {
                    "class": "selectboxit-option-icon-container"
                }), e.dropdownImage = t("<i/>", {
                    id: i && i + "SelectBoxItDefaultIcon",
                    "class": "selectboxit-default-icon",
                    unselectable: "on"
                }), e.dropdown = t("<span/>", {
                    id: i && i + "SelectBoxIt",
                    "class": "selectboxit " + ("button" === r ? o : "") + " " + (e.selectBox.prop("disabled") ? e.theme.disabled : e.theme.enabled),
                    name: s,
                    tabindex: e.selectBox.attr("tabindex") || "0",
                    unselectable: "on"
                }).append(e.dropdownImageContainer.append(e.dropdownImage)).append(e.dropdownText), e.dropdownContainer = t("<span/>", {
                    id: i && i + "SelectBoxItContainer",
                    "class": "selectboxit-container " + ("container" === r ? o : "")
                }).append(e.dropdown), e
            },
            _createUnorderedList: function() {
                var e, i, n, s, r, o, a, l, c, u, h, d = this,
                    p = "",
                    f = d.originalElemId || "",
                    m = t("<ul/>", {
                        id: f && f + "SelectBoxItOptions",
                        "class": "selectboxit-options",
                        tabindex: -1
                    });
                if (d.options.showFirstOption || (d.selectItems.first().attr("disabled", "disabled"), d.selectItems = d.selectBox.find("option").slice(1)), d.selectItems.each(function(f) {
                        i = "", n = "", e = t(this).prop("disabled"), s = t(this).attr("data-icon") || "", r = t(this).attr("data-iconurl") || "", o = r ? "selectboxit-option-icon-url" : "", a = r ? "style=\"background-image:url('" + r + "');\"" : "", l = t(this).attr("data-selectedtext"), c = t(this).attr("data-text"), u = c ? c : t(this).text(), h = t(this).parent(), h.is("optgroup") && (i = "selectboxit-optgroup-option", 0 === t(this).index() && (n = '<span class="selectboxit-optgroup-header ' + h.first().attr("class") + '"data-disabled="true">' + h.first().attr("label") + "</span>")), p += n + '<li id="' + f + '" data-val="' + this.value + '" data-disabled="' + e + '" class="' + i + " selectboxit-option " + (t(this).attr("class") || "") + '"><a class="selectboxit-option-anchor"><span class="selectboxit-option-icon-container"><i class="selectboxit-option-icon ' + s + " " + (o || d.theme.container) + '"' + a + "></i></span>" + (d.options.html ? u : d.htmlEscape(u)) + "</a></li>", d.textArray[f] = e ? "" : u, this.selected && (d._setText(d.dropdownText, l || u), d.currentFocus = f)
                    }), d.options.defaultText || d.selectBox.attr("data-text")) {
                    var g = d.options.defaultText || d.selectBox.attr("data-text");
                    d._setText(d.dropdownText, g), d.options.defaultText = g
                }
                return m.append(p), d.list = m, d.dropdownContainer.append(d.list), d.listItems = d.list.children("li"), d.listAnchors = d.list.find("a"), d.listItems.first().addClass("selectboxit-option-first"), d.listItems.last().addClass("selectboxit-option-last"), d.list.find("li[data-disabled='true']").not(".optgroupHeader").addClass(d.theme.disabled), d.dropdownImage.addClass(d.selectBox.attr("data-icon") || d.options.defaultIcon || d.listItems.eq(d.currentFocus).find("i").attr("class")), d.dropdownImage.attr("style", d.listItems.eq(d.currentFocus).find("i").attr("style")), d
            },
            _replaceSelectBox: function() {
                var e, i = this,
                    s = i.originalElem.id || "",
                    r = i.selectBox.attr("data-size"),
                    o = i.listSize = r === n ? "auto" : "0" === r ? "auto" : +r;
                return i.selectBox.css("display", "none").after(i.dropdownContainer), e = i.dropdown.height(), i.downArrow = t("<i/>", {
                    id: s && s + "SelectBoxItArrow",
                    "class": "selectboxit-arrow",
                    unselectable: "on"
                }), i.downArrowContainer = t("<span/>", {
                    id: s && s + "SelectBoxItArrowContainer",
                    "class": "selectboxit-arrow-container",
                    unselectable: "on"
                }).append(i.downArrow), i.dropdown.append(i.downArrowContainer), i.listItems.removeClass("selectboxit-selected").eq(i.currentFocus).addClass("selectboxit-selected"), i._realOuterWidth(i.dropdownImageContainer) || i.dropdownImageContainer.remove(), i.options.autoWidth && (i.dropdown.is(":visible") ? i.dropdown.css({
                    width: "auto"
                }).css({
                    width: i.list.outerWidth(!0) + i.downArrowContainer.outerWidth(!0) + i.dropdownImage.outerWidth(!0)
                }) : i.dropdown.css({
                    width: "auto"
                }).css({
                    width: i._realOuterWidth(i.list) + i._realOuterWidth(i.downArrowContainer) + i._realOuterWidth(i.dropdownImage)
                }), i.list.css({
                    "min-width": i.dropdown.width()
                })), i.dropdownText.css({
                    "max-width": i.dropdownContainer.width() - (i.downArrowContainer.outerWidth(!0) + i.dropdownImage.outerWidth(!0))
                }), "number" === t.type(o) && (i.maxHeight = i.listAnchors.outerHeight(!0) * o), i
            },
            _scrollToView: function(t) {
                var e = this,
                    i = e.listItems.eq(e.currentFocus),
                    n = e.list.scrollTop(),
                    s = i.height(),
                    r = i.position().top,
                    o = Math.abs(r),
                    a = e.list.height();
                return "search" === t ? s > a - r ? e.list.scrollTop(n + (r - (a - s))) : -1 > r && e.list.scrollTop(r - s) : "up" === t ? -1 > r && e.list.scrollTop(n - o) : "down" === t && s > a - r && e.list.scrollTop(n + (o - a + s)), e
            },
            _callbackSupport: function(e) {
                var i = this;
                return t.isFunction(e) && e.call(i, i.dropdown), i
            },
            _setText: function(t, e) {
                var i = this;
                return i.options.html ? t.html(e) : t.text(e), i
            },
            open: function(t) {
                var e = this,
                    i = e.options.showEffect,
                    n = e.options.showEffectSpeed,
                    s = e.options.showEffectOptions,
                    r = e.options["native"],
                    o = e.isMobile;
                return !e.listItems.length || e.dropdown.hasClass(e.theme.disabled) ? e : (r || o || this.list.is(":visible") || (e.triggerEvent("open"), e._dynamicPositioning && e.options.dynamicPositioning && e._dynamicPositioning(), "none" === i ? e.list.show() : "show" === i || "slideDown" === i || "fadeIn" === i ? e.list[i](n) : e.list.show(i, s, n), e.list.promise().done(function() {
                    e._scrollToView("search")
                })), e._callbackSupport(t), e)
            },
            close: function(t) {
                var e = this,
                    i = e.options.hideEffect,
                    n = e.options.hideEffectSpeed,
                    s = e.options.hideEffectOptions,
                    r = e.options["native"],
                    o = e.isMobile;
                return r || o || !e.list.is(":visible") || (e.triggerEvent("close"), "none" === i ? e.list.hide() : "hide" === i || "slideUp" === i || "fadeOut" === i ? e.list[i](n) : e.list.hide(i, s, n)), e._callbackSupport(t), e
            },
            toggle: function() {
                var t = this,
                    e = t.list.is(":visible");
                e ? t.close() : e || t.open()
            },
            _keyMappings: {
                38: "up",
                40: "down",
                13: "enter",
                8: "backspace",
                9: "tab",
                32: "space",
                27: "esc"
            },
            _keydownMethods: function() {
                var t = this,
                    e = t.list.is(":visible") || !t.options.keydownOpen;
                return {
                    down: function() {
                        t.moveDown && e && t.moveDown()
                    },
                    up: function() {
                        t.moveUp && e && t.moveUp()
                    },
                    enter: function() {
                        var e = t.listItems.eq(t.currentFocus);
                        t._update(e), "true" !== e.attr("data-preventclose") && t.close(), t.triggerEvent("enter")
                    },
                    tab: function() {
                        t.triggerEvent("tab-blur"), t.close()
                    },
                    backspace: function() {
                        t.triggerEvent("backspace")
                    },
                    esc: function() {
                        t.close()
                    }
                }
            },
            _eventHandlers: function() {
                var e, i, n = this,
                    s = n.options.nativeMousedown,
                    r = n.options.customShowHideEvent,
                    o = n.focusClass,
                    a = n.hoverClass,
                    l = n.openClass;
                return this.dropdown.on({
                    "click.selectBoxIt": function() {
                        n.dropdown.trigger("focus", !0), n.originalElem.disabled || (n.triggerEvent("click"), s || r || n.toggle())
                    },
                    "mousedown.selectBoxIt": function() {
                        t(this).data("mdown", !0), n.triggerEvent("mousedown"), s && !r && n.toggle()
                    },
                    "mouseup.selectBoxIt": function() {
                        n.triggerEvent("mouseup")
                    },
                    "blur.selectBoxIt": function() {
                        n.blur && (n.triggerEvent("blur"), n.close(), t(this).removeClass(o))
                    },
                    "focus.selectBoxIt": function(e, i) {
                        var s = t(this).data("mdown");
                        t(this).removeData("mdown"), s || i || setTimeout(function() {
                            n.triggerEvent("tab-focus")
                        }, 0), i || (t(this).hasClass(n.theme.disabled) || t(this).addClass(o), n.triggerEvent("focus"))
                    },
                    "keydown.selectBoxIt": function(t) {
                        var e = n._keyMappings[t.keyCode],
                            i = n._keydownMethods()[e];
                        i && (i(), !n.options.keydownOpen || "up" !== e && "down" !== e || n.open()), i && "tab" !== e && t.preventDefault()
                    },
                    "keypress.selectBoxIt": function(t) {
                        var e = t.charCode || t.keyCode,
                            i = n._keyMappings[t.charCode || t.keyCode],
                            s = String.fromCharCode(e);
                        n.search && (!i || i && "space" === i) && n.search(s, !0, !0), "space" === i && t.preventDefault()
                    },
                    "mouseenter.selectBoxIt": function() {
                        n.triggerEvent("mouseenter")
                    },
                    "mouseleave.selectBoxIt": function() {
                        n.triggerEvent("mouseleave")
                    }
                }), n.list.on({
                    "mouseover.selectBoxIt": function() {
                        n.blur = !1
                    },
                    "mouseout.selectBoxIt": function() {
                        n.blur = !0
                    },
                    "focusin.selectBoxIt": function() {
                        n.dropdown.trigger("focus", !0)
                    }
                }), n.list.on({
                    "mousedown.selectBoxIt": function() {
                        n._update(t(this)), n.triggerEvent("option-click"), "false" === t(this).attr("data-disabled") && "true" !== t(this).attr("data-preventclose") && n.close(), setTimeout(function() {
                            n.dropdown.trigger("focus", !0)
                        }, 0)
                    },
                    "focusin.selectBoxIt": function() {
                        n.listItems.not(t(this)).removeAttr("data-active"), t(this).attr("data-active", "");
                        var e = n.list.is(":hidden");
                        (n.options.searchWhenHidden && e || n.options.aggressiveChange || e && n.options.selectWhenHidden) && n._update(t(this)), t(this).addClass(o)
                    },
                    "mouseup.selectBoxIt": function() {
                        s && !r && (n._update(t(this)), n.triggerEvent("option-mouseup"), "false" === t(this).attr("data-disabled") && "true" !== t(this).attr("data-preventclose") && n.close())
                    },
                    "mouseenter.selectBoxIt": function() {
                        "false" === t(this).attr("data-disabled") && (n.listItems.removeAttr("data-active"), t(this).addClass(o).attr("data-active", ""), n.listItems.not(t(this)).removeClass(o), t(this).addClass(o), n.currentFocus = +t(this).attr("id"))
                    },
                    "mouseleave.selectBoxIt": function() {
                        "false" === t(this).attr("data-disabled") && (n.listItems.not(t(this)).removeClass(o).removeAttr("data-active"), t(this).addClass(o), n.currentFocus = +t(this).attr("id"))
                    },
                    "blur.selectBoxIt": function() {
                        t(this).removeClass(o)
                    }
                }, ".selectboxit-option"), n.list.on({
                    "click.selectBoxIt": function(t) {
                        t.preventDefault()
                    }
                }, "a"), n.selectBox.on({
                    "change.selectBoxIt, internal-change.selectBoxIt": function(t, s) {
                        var r, o;
                        s || (r = n.list.find('li[data-val="' + n.originalElem.value + '"]'), r.length && (n.listItems.eq(n.currentFocus).removeClass(n.focusClass), n.currentFocus = +r.attr("id"))), r = n.listItems.eq(n.currentFocus), o = r.attr("data-selectedtext"), e = r.attr("data-text"), i = e ? e : r.find("a").text(), n._setText(n.dropdownText, o || i), n.dropdownText.attr("data-val", n.originalElem.value), r.find("i").attr("class") && (n.dropdownImage.attr("class", r.find("i").attr("class")).addClass("selectboxit-default-icon"), n.dropdownImage.attr("style", r.find("i").attr("style"))), n.triggerEvent("changed")
                    },
                    "disable.selectBoxIt": function() {
                        n.dropdown.addClass(n.theme.disabled)
                    },
                    "enable.selectBoxIt": function() {
                        n.dropdown.removeClass(n.theme.disabled)
                    },
                    "open.selectBoxIt": function() {
                        var t, e = n.list.find("li[data-val='" + n.dropdownText.attr("data-val") + "']");
                        e.length || (e = n.listItems.not("[data-disabled=true]").first()), n.currentFocus = +e.attr("id"), t = n.listItems.eq(n.currentFocus), n.dropdown.addClass(l).removeClass(a).addClass(o), n.listItems.removeClass(n.selectedClass).removeAttr("data-active").not(t).removeClass(o), t.addClass(n.selectedClass).addClass(o), n.options.hideCurrent && (n.listItems.show(), t.hide())
                    },
                    "close.selectBoxIt": function() {
                        n.dropdown.removeClass(l)
                    },
                    "blur.selectBoxIt": function() {
                        n.dropdown.removeClass(o)
                    },
                    "mouseenter.selectBoxIt": function() {
                        t(this).hasClass(n.theme.disabled) || n.dropdown.addClass(a)
                    },
                    "mouseleave.selectBoxIt": function() {
                        n.dropdown.removeClass(a)
                    },
                    destroy: function(t) {
                        t.preventDefault(), t.stopPropagation()
                    }
                }), n
            },
            _update: function(t) {
                var e, i, n, s = this,
                    r = s.options.defaultText || s.selectBox.attr("data-text"),
                    o = s.listItems.eq(s.currentFocus);
                "false" === t.attr("data-disabled") && (e = s.listItems.eq(s.currentFocus).attr("data-selectedtext"), i = o.attr("data-text"), n = i ? i : o.text(), (r && s.options.html ? s.dropdownText.html() === r : s.dropdownText.text() === r) && s.selectBox.val() === t.attr("data-val") ? s.triggerEvent("change") : (s.selectBox.val(t.attr("data-val")), s.currentFocus = +t.attr("id"), s.originalElem.value !== s.dropdownText.attr("data-val") && s.triggerEvent("change")))
            },
            _addClasses: function(t) {
                var e = this,
                    i = (e.focusClass = t.focus, e.hoverClass = t.hover, t.button),
                    n = t.list,
                    s = t.arrow,
                    r = t.container;
                return e.openClass = t.open, e.selectedClass = "selectboxit-selected", e.downArrow.addClass(e.selectBox.attr("data-downarrow") || e.options.downArrowIcon || s), e.dropdownContainer.addClass(r), e.dropdown.addClass(i), e.list.addClass(n), e
            },
            refresh: function(t, e) {
                var i = this;
                return i._destroySelectBoxIt()._create(!0), e || i.triggerEvent("refresh"), i._callbackSupport(t), i
            },
            htmlEscape: function(t) {
                return String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            },
            triggerEvent: function(t) {
                var e = this,
                    i = e.options.showFirstOption ? e.currentFocus : e.currentFocus - 1 >= 0 ? e.currentFocus : 0;
                return e.selectBox.trigger(t, {
                    selectbox: e.selectBox,
                    selectboxOption: e.selectItems.eq(i),
                    dropdown: e.dropdown,
                    dropdownOption: e.listItems.eq(e.currentFocus)
                }), e
            },
            _copyAttributes: function() {
                var t = this;
                return t._addSelectBoxAttributes && t._addSelectBoxAttributes(), t
            },
            _realOuterWidth: function(t) {
                if (t.is(":visible")) return t.outerWidth(!0);
                var e, i = t.clone();
                return i.css({
                    visibility: "hidden",
                    display: "block",
                    position: "absolute"
                }).appendTo("body"), e = i.outerWidth(!0), i.remove(), e
            }
        });
        var s = t.selectBox.selectBoxIt.prototype;
        s._ariaAccessibility = function() {
            var e = this;
            return e.dropdown.attr({
                role: "combobox",
                "aria-autocomplete": "list",
                "aria-expanded": "false",
                "aria-owns": e.list.attr("id"),
                "aria-activedescendant": e.listItems.eq(e.currentFocus).length ? e.listItems.eq(e.currentFocus)[0].id : "",
                "aria-label": t("label[for='" + e.originalElem.id + "']").text() || "",
                "aria-live": "assertive"
            }).on({
                "disable.selectBoxIt": function() {
                    e.dropdown.attr("aria-disabled", "true")
                },
                "enable.selectBoxIt": function() {
                    e.dropdown.attr("aria-disabled", "false")
                }
            }), e.list.attr({
                role: "listbox",
                "aria-hidden": "true"
            }), e.listItems.attr({
                role: "option"
            }), e.selectBox.on({
                "change.selectBoxIt": function() {
                    e.dropdownText.attr("aria-label", e.originalElem.value)
                },
                "open.selectBoxIt": function() {
                    e.list.attr("aria-hidden", "false"), e.dropdown.attr("aria-expanded", "true")
                },
                "close.selectBoxIt": function() {
                    e.list.attr("aria-hidden", "true"), e.dropdown.attr("aria-expanded", "false")
                }
            }), e
        }, s._addSelectBoxAttributes = function() {
            var e = this;
            return e._addAttributes(e.selectBox.prop("attributes"), e.dropdown), e.selectItems.each(function(i) {
                e._addAttributes(t(this).prop("attributes"), e.listItems.eq(i))
            }), e
        }, s._addAttributes = function(e, i) {
            var n = this,
                s = n.options.copyAttributes;
            return e.length && t.each(e, function(e, n) {
                var r = n.name.toLowerCase(),
                    o = n.value;
                "null" === o || -1 === t.inArray(r, s) && -1 === r.indexOf("data") || i.attr(r, o)
            }), n
        }, s.destroy = function(t) {
            var e = this;
            return e._destroySelectBoxIt(), e.widgetProto.destroy.call(e), e._callbackSupport(t), e
        }, s._destroySelectBoxIt = function() {
            var e = this;
            return e.dropdown.off(".selectBoxIt"), t.contains(e.dropdownContainer[0], e.originalElem) && e.dropdownContainer.before(e.selectBox), e.dropdownContainer.remove(), e.selectBox.removeAttr("style").attr("style", e.selectBoxStyles), e.selectBox.show(), e.triggerEvent("destroy"), e
        }, s.disable = function(t) {
            var e = this;
            return e.options.disabled || (e.close(), e.selectBox.attr("disabled", "disabled"), e.dropdown.removeAttr("tabindex").removeClass(e.theme.enabled).addClass(e.theme.disabled), e.setOption("disabled", !0), e.triggerEvent("disable")), e._callbackSupport(t), e
        }, s.disableOption = function(e, i) {
            var n, s, r, o = this,
                a = t.type(e);
            return "number" === a && (o.close(), n = o.selectBox.find("option").eq(e), o.triggerEvent("disable-option"), n.attr("disabled", "disabled"), o.listItems.eq(e).attr("data-disabled", "true").addClass(o.theme.disabled), o.currentFocus === e && (s = o.listItems.eq(o.currentFocus).nextAll("li").not("[data-disabled='true']").first().length, r = o.listItems.eq(o.currentFocus).prevAll("li").not("[data-disabled='true']").first().length, s ? o.moveDown() : r ? o.moveUp() : o.disable())), o._callbackSupport(i), o
        }, s._isDisabled = function() {
            var t = this;
            return t.originalElem.disabled && t.disable(), t
        }, s._dynamicPositioning = function() {
            var e = this;
            if ("number" === t.type(e.listSize)) e.list.css("max-height", e.maxHeight || "none");
            else {
                var i = e.dropdown.offset().top,
                    n = e.list.data("max-height") || e.list.outerHeight(),
                    s = e.dropdown.outerHeight(),
                    r = e.options.viewport,
                    o = r.height(),
                    a = t.isWindow(r.get(0)) ? r.scrollTop() : r.offset().top,
                    l = o + a >= i + s + n,
                    c = !l;
                if (e.list.data("max-height") || e.list.data("max-height", e.list.outerHeight()), c)
                    if (e.dropdown.offset().top - a >= n) e.list.css("max-height", n), e.list.css("top", e.dropdown.position().top - e.list.outerHeight());
                    else {
                        var u = Math.abs(i + s + n - (o + a)),
                            h = Math.abs(e.dropdown.offset().top - a - n);
                        h > u ? (e.list.css("max-height", n - u - s / 2), e.list.css("top", "auto")) : (e.list.css("max-height", n - h - s / 2), e.list.css("top", e.dropdown.position().top - e.list.outerHeight()))
                    } else e.list.css("max-height", n), e.list.css("top", "auto")
            }
            return e
        }, s.enable = function(t) {
            var e = this;
            return e.options.disabled && (e.triggerEvent("enable"), e.selectBox.removeAttr("disabled"), e.dropdown.attr("tabindex", 0).removeClass(e.theme.disabled).addClass(e.theme.enabled), e.setOption("disabled", !1), e._callbackSupport(t)), e
        }, s.enableOption = function(e, i) {
            var n, s = this,
                r = t.type(e);
            return "number" === r && (n = s.selectBox.find("option").eq(e), s.triggerEvent("enable-option"), n.removeAttr("disabled"), s.listItems.eq(e).attr("data-disabled", "false").removeClass(s.theme.disabled)), s._callbackSupport(i), s
        }, s.moveDown = function(t) {
            var e = this;
            e.currentFocus += 1;
            var i = "true" === e.listItems.eq(e.currentFocus).attr("data-disabled") ? !0 : !1,
                n = e.listItems.eq(e.currentFocus).nextAll("li").not("[data-disabled='true']").first().length;
            if (e.currentFocus === e.listItems.length) e.currentFocus -= 1;
            else {
                if (i && n) return e.listItems.eq(e.currentFocus - 1).blur(), e.moveDown(), void 0;
                i && !n ? e.currentFocus -= 1 : (e.listItems.eq(e.currentFocus - 1).blur().end().eq(e.currentFocus).focusin(), e._scrollToView("down"), e.triggerEvent("moveDown"))
            }
            return e._callbackSupport(t), e
        }, s.moveUp = function(t) {
            var e = this;
            e.currentFocus -= 1;
            var i = "true" === e.listItems.eq(e.currentFocus).attr("data-disabled") ? !0 : !1,
                n = e.listItems.eq(e.currentFocus).prevAll("li").not("[data-disabled='true']").first().length;
            if (-1 === e.currentFocus) e.currentFocus += 1;
            else {
                if (i && n) return e.listItems.eq(e.currentFocus + 1).blur(), e.moveUp(), void 0;
                i && !n ? e.currentFocus += 1 : (e.listItems.eq(this.currentFocus + 1).blur().end().eq(e.currentFocus).focusin(), e._scrollToView("up"), e.triggerEvent("moveUp"))
            }
            return e._callbackSupport(t), e
        }, s._setCurrentSearchOption = function(t) {
            var e = this;
            return (e.options.aggressiveChange || e.options.selectWhenHidden || e.listItems.eq(t).is(":visible")) && e.listItems.eq(t).data("disabled") !== !0 && (e.listItems.eq(e.currentFocus).blur(), e.currentIndex = t, e.currentFocus = t, e.listItems.eq(e.currentFocus).focusin(), e._scrollToView("search"), e.triggerEvent("search")), e
        }, s._searchAlgorithm = function(t, e) {
            var i, n, s, r, o = this,
                a = !1,
                l = o.textArray,
                c = o.currentText;
            for (i = t, s = l.length; s > i; i += 1) {
                for (r = l[i], n = 0; s > n; n += 1) - 1 !== l[n].search(e) && (a = !0, n = s);
                if (a || (o.currentText = o.currentText.charAt(o.currentText.length - 1).replace(/[|()\[{.+*?$\\]/g, "\\$0"), c = o.currentText), e = new RegExp(c, "gi"), c.length < 3) {
                    if (e = new RegExp(c.charAt(0), "gi"), -1 !== r.charAt(0).search(e)) return o._setCurrentSearchOption(i), (r.substring(0, c.length).toLowerCase() !== c.toLowerCase() || o.options.similarSearch) && (o.currentIndex += 1), !1
                } else if (-1 !== r.search(e)) return o._setCurrentSearchOption(i), !1;
                if (r.toLowerCase() === o.currentText.toLowerCase()) return o._setCurrentSearchOption(i), o.currentText = "", !1
            }
            return !0
        }, s.search = function(t, e, i) {
            var n = this;
            i ? n.currentText += t.replace(/[|()\[{.+*?$\\]/g, "\\$0") : n.currentText = t.replace(/[|()\[{.+*?$\\]/g, "\\$0");
            var s = n._searchAlgorithm(n.currentIndex, new RegExp(n.currentText, "gi"));
            return s && n._searchAlgorithm(0, n.currentText), n._callbackSupport(e), n
        }, s._applyNativeSelect = function() {
            var t, e, i, n = this;
            n.dropdownContainer.append(n.selectBox), n.dropdown.attr("tabindex", "-1"), n.selectBox.css({
                display: "block",
                visibility: "visible",
                width: n.dropdown.outerWidth(),
                height: n.dropdown.outerHeight(),
                opacity: "0",
                position: "absolute",
                top: "0",
                left: "0",
                cursor: "pointer",
                "z-index": "999999",
                margin: n.dropdown.css("margin"),
                padding: "0",
                "-webkit-appearance": "menulist-button"
            }).on({
                "changed.selectBoxIt": function() {
                    t = n.selectBox.find("option").filter(":selected"), e = t.attr("data-text"), i = e ? e : t.text(), n._setText(n.dropdownText, i), n.list.find('li[data-val="' + t.val() + '"]').find("i").attr("class") && n.dropdownImage.attr("class", n.list.find('li[data-val="' + t.val() + '"]').find("i").attr("class")).addClass("selectboxit-default-icon"), n.triggerEvent("option-click")
                }
            })
        }, s._mobile = function() {
            var t = this;
            return t.isMobile && t._applyNativeSelect(), this
        }, s.selectOption = function(e, i) {
            var n = this,
                s = t.type(e);
            return "number" === s ? n.selectBox.val(n.selectItems.eq(e).val()).change() : "string" === s && n.selectBox.val(e).change(), n._callbackSupport(i), n
        }, s.setOption = function(e, i, n) {
            var s = this;
            return "string" === t.type(e) && (s.options[e] = i), s.refresh(function() {
                s._callbackSupport(n)
            }, !0), s
        }, s.setOptions = function(e, i) {
            var n = this;
            return t.isPlainObject(e) && (n.options = t.extend({}, n.options, e)), n.refresh(function() {
                n._callbackSupport(i)
            }, !0), n
        }, s.wait = function(t, e) {
            var i = this;
            return i.widgetProto._delay.call(i, e, t), i
        }, s.add = function(e, i) {
            this._populate(e, function(e) {
                var n, s, r = this,
                    o = t.type(e),
                    a = 0,
                    l = [],
                    c = r._isJSON(e),
                    u = c && r._parseJSON(e);
                if (e && ("array" === o || c && u.data && "array" === t.type(u.data)) || "object" === o && e.data && "array" === t.type(e.data)) {
                    for (r._isJSON(e) && (e = u), e.data && (e = e.data), s = e.length; s - 1 >= a; a += 1) n = e[a], t.isPlainObject(n) ? l.push(t("<option/>", n)) : "string" === t.type(n) && l.push(t("<option/>", {
                        text: n,
                        value: n
                    }));
                    r.selectBox.append(l)
                } else e && "string" === o && !r._isJSON(e) ? r.selectBox.append(e) : e && "object" === o ? r.selectBox.append(t("<option/>", e)) : e && r._isJSON(e) && t.isPlainObject(r._parseJSON(e)) && r.selectBox.append(t("<option/>", r._parseJSON(e)));
                return r.dropdown ? r.refresh(function() {
                    r._callbackSupport(i)
                }, !0) : r._callbackSupport(i), r
            })
        }, s._parseJSON = function(e) {
            return JSON && JSON.parse && JSON.parse(e) || t.parseJSON(e)
        }, s._isJSON = function(t) {
            var e, i = this;
            try {
                return e = i._parseJSON(t), !0
            } catch (n) {
                return !1
            }
        }, s._populate = function(e, i) {
            var n = this;
            return e = t.isFunction(e) ? e.call() : e, n.isDeferred(e) ? e.done(function(t) {
                i.call(n, t)
            }) : i.call(n, e), n
        }, s.remove = function(e, i) {
            var n, s, r = this,
                o = t.type(e),
                a = 0,
                l = "";
            if ("array" === o) {
                for (s = e.length; s - 1 >= a; a += 1) n = e[a], "number" === t.type(n) && (l += l.length ? ", option:eq(" + n + ")" : "option:eq(" + n + ")");
                r.selectBox.find(l).remove()
            } else "number" === o ? r.selectBox.find("option").eq(e).remove() : r.selectBox.find("option").remove();
            return r.dropdown ? r.refresh(function() {
                r._callbackSupport(i)
            }, !0) : r._callbackSupport(i), r
        }
    });
var Froogaloop = function() {
    function t(e) {
        return new t.fn.init(e)
    }

    function e(t, e, i) {
        if (!i.contentWindow.postMessage) return !1;
        var n = i.getAttribute("src").split("?")[0],
            t = JSON.stringify({
                method: t,
                value: e
            });
        "//" === n.substr(0, 2) && (n = window.location.protocol + n), i.contentWindow.postMessage(t, n)
    }

    function i(t) {
        var e, i;
        try {
            e = JSON.parse(t.data), i = e.event || e.method
        } catch (n) {}
        if ("ready" == i && !r && (r = !0), t.origin != o) return !1;
        var t = e.value,
            a = e.data,
            l = "" === l ? null : e.player_id;
        return e = l ? s[l][i] : s[i], i = [], e ? (void 0 !== t && i.push(t), a && i.push(a), l && i.push(l), 0 < i.length ? e.apply(null, i) : e.call()) : !1
    }

    function n(t, e, i) {
        i ? (s[i] || (s[i] = {}), s[i][t] = e) : s[t] = e
    }
    var s = {},
        r = !1,
        o = "";
    return t.fn = t.prototype = {
        element: null,
        init: function(t) {
            "string" == typeof t && (t = document.getElementById(t)), this.element = t, t = this.element.getAttribute("src"), "//" === t.substr(0, 2) && (t = window.location.protocol + t);
            for (var t = t.split("/"), e = "", i = 0, n = t.length; n > i && 3 > i; i++) e += t[i], 2 > i && (e += "/");
            return o = e, this
        },
        api: function(t, i) {
            if (!this.element || !t) return !1;
            var s = this.element,
                r = "" !== s.id ? s.id : null,
                o = i && i.constructor && i.call && i.apply ? null : i,
                a = i && i.constructor && i.call && i.apply ? i : null;
            return a && n(t, a, r), e(t, o, s), this
        },
        addEvent: function(t, i) {
            if (!this.element) return !1;
            var s = this.element,
                o = "" !== s.id ? s.id : null;
            return n(t, i, o), "ready" != t ? e("addEventListener", t, s) : "ready" == t && r && i.call(null, o), this
        },
        removeEvent: function(t) {
            if (!this.element) return !1;
            var i, n = this.element;
            t: {
                if ((i = "" !== n.id ? n.id : null) && s[i]) {
                    if (!s[i][t]) {
                        i = !1;
                        break t
                    }
                    s[i][t] = null
                } else {
                    if (!s[t]) {
                        i = !1;
                        break t
                    }
                    s[t] = null
                }
                i = !0
            }
            "ready" != t && i && e("removeEventListener", t, n)
        }
    }, t.fn.init.prototype = t.fn, window.addEventListener ? window.addEventListener("message", i, !1) : window.attachEvent("onmessage", i), window.Froogaloop = window.$f = t
}();
! function(t, e) {
    function i() {
        var t = m.elements;
        return "string" == typeof t ? t.split(" ") : t
    }

    function n(t) {
        var e = f[t[d]];
        return e || (e = {}, p++, t[d] = p, f[p] = e), e
    }

    function s(t, i, s) {
        return i || (i = e), l ? i.createElement(t) : (s || (s = n(i)), i = s.cache[t] ? s.cache[t].cloneNode() : h.test(t) ? (s.cache[t] = s.createElem(t)).cloneNode() : s.createElem(t), i.canHaveChildren && !u.test(t) ? s.frag.appendChild(i) : i)
    }

    function r(t, e) {
        e.cache || (e.cache = {}, e.createElem = t.createElement, e.createFrag = t.createDocumentFragment, e.frag = e.createFrag()), t.createElement = function(i) {
            return m.shivMethods ? s(i, t, e) : e.createElem(i)
        }, t.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + i().join().replace(/\w+/g, function(t) {
            return e.createElem(t), e.frag.createElement(t), 'c("' + t + '")'
        }) + ");return n}")(m, e.frag)
    }

    function o(t) {
        t || (t = e);
        var i = n(t);
        if (m.shivCSS && !a && !i.hasCSS) {
            var s, o = t;
            s = o.createElement("p"), o = o.getElementsByTagName("head")[0] || o.documentElement, s.innerHTML = "x<style>article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}</style>", s = o.insertBefore(s.lastChild, o.firstChild), i.hasCSS = !!s
        }
        return l || r(t, i), t
    }
    var a, l, c = t.html5 || {},
        u = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
        h = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
        d = "_html5shiv",
        p = 0,
        f = {};
    ! function() {
        try {
            var t = e.createElement("a");
            t.innerHTML = "<xyz></xyz>", a = "hidden" in t;
            var i;
            if (!(i = 1 == t.childNodes.length)) {
                e.createElement("a");
                var n = e.createDocumentFragment();
                i = "undefined" == typeof n.cloneNode || "undefined" == typeof n.createDocumentFragment || "undefined" == typeof n.createElement
            }
            l = i
        } catch (s) {
            l = a = !0
        }
    }();
    var m = {
        elements: c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
        version: "3.6.2pre",
        shivCSS: !1 !== c.shivCSS,
        supportsUnknownElements: l,
        shivMethods: !1 !== c.shivMethods,
        type: "default",
        shivDocument: o,
        createElement: s,
        createDocumentFragment: function(t, s) {
            if (t || (t = e), l) return t.createDocumentFragment();
            for (var s = s || n(t), r = s.frag.cloneNode(), o = 0, a = i(), c = a.length; c > o; o++) r.createElement(a[o]);
            return r
        }
    };
    t.html5 = m, o(e)
}(this, document),
function(t) {
    "use strict";
    t.fn.fitVids = function(e) {
        var i = {
            customSelector: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var n = document.createElement("div"),
                s = document.getElementsByTagName("base")[0] || document.getElementsByTagName("script")[0];
            n.className = "fit-vids-style", n.id = "fit-vids-style", n.style.display = "none", n.innerHTML = "&shy;<style>                 .fluid-width-video-wrapper {                   width: 100%;                                position: relative;                         padding: 0;                              }                                                                                       .fluid-width-video-wrapper iframe,          .fluid-width-video-wrapper object,          .fluid-width-video-wrapper embed {             position: absolute;                         top: 0;                                     left: 0;                                    width: 100%;                                height: 100%;                            }                                         </style>", s.parentNode.insertBefore(n, s)
        }
        return e && t.extend(i, e), this.each(function() {
            var e = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
            i.customSelector && e.push(i.customSelector);
            var n = t(this).find(e.join(","));
            n = n.not("object object"), n.each(function() {
                var e = t(this);
                if (!("embed" === this.tagName.toLowerCase() && e.parent("object").length || e.parent(".fluid-width-video-wrapper").length)) {
                    var i = "object" === this.tagName.toLowerCase() || e.attr("height") && !isNaN(parseInt(e.attr("height"), 10)) ? parseInt(e.attr("height"), 10) : e.height(),
                        n = isNaN(parseInt(e.attr("width"), 10)) ? e.width() : parseInt(e.attr("width"), 10),
                        s = i / n;
                    if (!e.attr("id")) {
                        var r = "fitvid" + Math.floor(999999 * Math.random());
                        e.attr("id", r)
                    }
                    e.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * s + "%"), e.removeAttr("height").removeAttr("width")
                }
            })
        })
    }
}(jQuery),
function(t, e) {
    var i = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    t.fn.imagesLoaded = function(n) {
        function s() {
            var e = t(h),
                i = t(d);
            a && (d.length ? a.reject(c, e, i) : a.resolve(c)), t.isFunction(n) && n.call(o, c, e, i)
        }

        function r(e, n) {
            e.src === i || -1 !== t.inArray(e, u) || (u.push(e), n ? d.push(e) : h.push(e), t.data(e, "imagesLoaded", {
                isBroken: n,
                src: e.src
            }), l && a.notifyWith(t(e), [n, c, t(h), t(d)]), c.length === u.length && (setTimeout(s), c.unbind(".imagesLoaded")))
        }
        var o = this,
            a = t.isFunction(t.Deferred) ? t.Deferred() : 0,
            l = t.isFunction(a.notify),
            c = o.find("img").add(o.filter("img")),
            u = [],
            h = [],
            d = [];
        return c.length ? c.bind("load.imagesLoaded error.imagesLoaded", function(t) {
            r(t.target, "error" === t.type)
        }).each(function(n, s) {
            var o = s.src,
                a = t.data(s, "imagesLoaded");
            a && a.src === o ? r(s, a.isBroken) : s.complete && s.naturalWidth !== e ? r(s, 0 === s.naturalWidth || 0 === s.naturalHeight) : (s.readyState || s.complete) && (s.src = i, s.src = o)
        }) : s(), a ? a.promise(o) : o
    }
}(jQuery),
function() {
    ! function(t, e, i) {
        var n, s, r;
        return r = "slidesjs", s = {
            width: 940,
            height: 528,
            start: 1,
            navigation: {
                active: !0,
                effect: "slide"
            },
            pagination: {
                active: !0,
                effect: "slide"
            },
            play: {
                active: !1,
                effect: "slide",
                interval: 5e3,
                auto: !1,
                swap: !0,
                pauseOnHover: !1,
                restartDelay: 2500
            },
            effect: {
                slide: {
                    speed: 500
                },
                fade: {
                    speed: 300,
                    crossfade: !0
                }
            },
            callback: {
                loaded: function() {},
                start: function() {},
                complete: function() {}
            }
        }, n = function() {
            function e(e, i) {
                this.element = e, this.options = t.extend(!0, {}, s, i), this._defaults = s, this._name = r, this.init()
            }
            return e
        }(), n.prototype.init = function() {
            var i, n, s, r, o, a, l = this;
            return i = t(this.element), this.data = t.data(this), t.data(this, "animating", !1), t.data(this, "total", i.children().not(".slidesjs-navigation", i).length), t.data(this, "current", this.options.start - 1), t.data(this, "vendorPrefix", this._getVendorPrefix()), "undefined" != typeof TouchEvent && (t.data(this, "touch", !0), this.options.effect.slide.speed = this.options.effect.slide.speed / 2), i.css({
                overflow: "hidden"
            }), i.slidesContainer = i.children().not(".slidesjs-navigation", i).wrapAll("<div class='slidesjs-container'>", i).parent().css({
                overflow: "hidden",
                position: "relative"
            }), t(".slidesjs-container", i).wrapInner("<div class='slidesjs-control'>", i).children(), t(".slidesjs-control", i).css({
                position: "relative",
                left: 0
            }), t(".slidesjs-control", i).children().addClass("slidesjs-slide").css({
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 0,
                display: "none",
                webkitBackfaceVisibility: "hidden"
            }), t.each(t(".slidesjs-control", i).children(), function(e) {
                var i;
                return i = t(this), i.attr("slidesjs-index", e)
            }), this.data.touch && (t(".slidesjs-control", i).on("touchstart", function(t) {
                return l._touchstart(t)
            }), t(".slidesjs-control", i).on("touchmove", function(t) {
                return l._touchmove(t)
            }), t(".slidesjs-control", i).on("touchend", function(t) {
                return l._touchend(t)
            })), i.fadeIn(0), this.update(), this.data.touch && this._setuptouch(), t(".slidesjs-control", i).children(":eq(" + this.data.current + ")").eq(0).fadeIn(0, function() {
                return t(this).css({
                    zIndex: 10
                })
            }), this.options.navigation.active && (o = t("<a>", {
                "class": "slidesjs-previous slidesjs-navigation",
                href: "#",
                title: "Previous",
                text: "Previous"
            }).appendTo(i), n = t("<a>", {
                "class": "slidesjs-next slidesjs-navigation",
                href: "#",
                title: "Next",
                text: "Next"
            }).appendTo(i)), t(".slidesjs-next", i).click(function(t) {
                return t.preventDefault(), l.stop(!0), l.next(l.options.navigation.effect)
            }), t(".slidesjs-previous", i).click(function(t) {
                return t.preventDefault(), l.stop(!0), l.previous(l.options.navigation.effect)
            }), this.options.play.active && (r = t("<a>", {
                "class": "slidesjs-play slidesjs-navigation",
                href: "#",
                title: "Play",
                text: "Play"
            }).appendTo(i), a = t("<a>", {
                "class": "slidesjs-stop slidesjs-navigation",
                href: "#",
                title: "Stop",
                text: "Stop"
            }).appendTo(i), r.click(function(t) {
                return t.preventDefault(), l.play(!0)
            }), a.click(function(t) {
                return t.preventDefault(), l.stop(!0)
            }), this.options.play.swap && a.css({
                display: "none"
            })), this.options.pagination.active && (s = t("<ul>", {
                "class": "slidesjs-pagination"
            }).appendTo(i), t.each(new Array(this.data.total), function(e) {
                var i, n;
                return i = t("<li>", {
                    "class": "slidesjs-pagination-item"
                }).appendTo(s), n = t("<a>", {
                    href: "#",
                    "data-slidesjs-item": e,
                    html: e + 1
                }).appendTo(i), n.click(function(e) {
                    return e.preventDefault(), l.stop(!0), l.goto(1 * t(e.currentTarget).attr("data-slidesjs-item") + 1)
                })
            })), t(e).bind("resize", function() {
                return l.update()
            }), this._setActive(), this.options.play.auto && this.play(), this.options.callback.loaded(this.options.start)
        }, n.prototype._setActive = function(e) {
            var i, n;
            return i = t(this.element), this.data = t.data(this), n = e > -1 ? e : this.data.current, t(".active", i).removeClass("active"), t(".slidesjs-pagination li:eq(" + n + ") a", i).addClass("active")
        }, n.prototype.update = function() {
            var e, i, n;
            return e = t(this.element), this.data = t.data(this), t(".slidesjs-control", e).children(":not(:eq(" + this.data.current + "))").css({
                display: "none",
                left: 0,
                zIndex: 0
            }), n = e.width(), i = this.options.height / this.options.width * n, this.options.width = n, this.options.height = i, t(".slidesjs-control, .slidesjs-container", e).css({
                width: n,
                height: i
            })
        }, n.prototype.next = function(e) {
            var i;
            return i = t(this.element), this.data = t.data(this), t.data(this, "direction", "next"), void 0 === e && (e = this.options.navigation.effect), "fade" === e ? this._fade() : this._slide()
        }, n.prototype.previous = function(e) {
            var i;
            return i = t(this.element), this.data = t.data(this), t.data(this, "direction", "previous"), void 0 === e && (e = this.options.navigation.effect), "fade" === e ? this._fade() : this._slide()
        }, n.prototype.goto = function(e) {
            var i, n;
            if (i = t(this.element), this.data = t.data(this), void 0 === n && (n = this.options.pagination.effect), e > this.data.total ? e = this.data.total : 1 > e && (e = 1), "number" == typeof e) return "fade" === n ? this._fade(e) : this._slide(e);
            if ("string" == typeof e) {
                if ("first" === e) return "fade" === n ? this._fade(0) : this._slide(0);
                if ("last" === e) return "fade" === n ? this._fade(this.data.total) : this._slide(this.data.total)
            }
        }, n.prototype._setuptouch = function() {
            var e, i, n, s;
            return e = t(this.element), this.data = t.data(this), s = t(".slidesjs-control", e), i = this.data.current + 1, n = this.data.current - 1, 0 > n && (n = this.data.total - 1), i > this.data.total - 1 && (i = 0), s.children(":eq(" + i + ")").css({
                display: "block",
                left: this.options.width
            }), s.children(":eq(" + n + ")").css({
                display: "block",
                left: -this.options.width
            })
        }, n.prototype._touchstart = function(e) {
            var i, n;
            return i = t(this.element), this.data = t.data(this), n = e.originalEvent.touches[0], this._setuptouch(), t.data(this, "touchtimer", Number(new Date)), t.data(this, "touchstartx", n.pageX), t.data(this, "touchstarty", n.pageY), e.stopPropagation()
        }, n.prototype._touchend = function(e) {
            var i, n, s, r, o, a, l, c = this;
            return i = t(this.element), this.data = t.data(this), a = e.originalEvent.touches[0], r = t(".slidesjs-control", i), r.position().left > .5 * this.options.width || r.position().left > .1 * this.options.width && Number(new Date) - this.data.touchtimer < 250 ? (t.data(this, "direction", "previous"), this._slide()) : r.position().left < -(.5 * this.options.width) || r.position().left < -(.1 * this.options.width) && Number(new Date) - this.data.touchtimer < 250 ? (t.data(this, "direction", "next"), this._slide()) : (s = this.data.vendorPrefix, l = s + "Transform", n = s + "TransitionDuration", o = s + "TransitionTimingFunction", r[0].style[l] = "translateX(0px)", r[0].style[n] = .85 * this.options.effect.slide.speed + "ms"), r.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
                return s = c.data.vendorPrefix, l = s + "Transform", n = s + "TransitionDuration", o = s + "TransitionTimingFunction", r[0].style[l] = "", r[0].style[n] = "", r[0].style[o] = ""
            }), e.stopPropagation()
        }, n.prototype._touchmove = function(e) {
            var i, n, s, r, o;
            return i = t(this.element), this.data = t.data(this), r = e.originalEvent.touches[0], n = this.data.vendorPrefix, s = t(".slidesjs-control", i), o = n + "Transform", t.data(this, "scrolling", Math.abs(r.pageX - this.data.touchstartx) < Math.abs(r.pageY - this.data.touchstarty)), this.data.animating || this.data.scrolling || (e.preventDefault(), this._setuptouch(), s[0].style[o] = "translateX(" + (r.pageX - this.data.touchstartx) + "px)"), e.stopPropagation()
        }, n.prototype.play = function(e) {
            var i, n, s, r = this;
            return i = t(this.element), this.data = t.data(this), !this.data.playInterval && (e && (n = this.data.current, this.data.direction = "next", "fade" === this.options.play.effect ? this._fade() : this._slide()), t.data(this, "playInterval", setInterval(function() {
                return n = r.data.current, r.data.direction = "next", "fade" === r.options.play.effect ? r._fade() : r._slide()
            }, this.options.play.interval)), s = t(".slidesjs-container", i), this.options.play.pauseOnHover && (s.unbind(), s.bind("mouseenter", function() {
                return r.stop()
            }), s.bind("mouseleave", function() {
                return r.options.play.restartDelay ? t.data(r, "restartDelay", setTimeout(function() {
                    return r.play(!0)
                }, r.options.play.restartDelay)) : r.play()
            })), t.data(this, "playing", !0), t(".slidesjs-play", i).addClass("slidesjs-playing"), this.options.play.swap) ? (t(".slidesjs-play", i).hide(), t(".slidesjs-stop", i).show()) : void 0
        }, n.prototype.stop = function(e) {
            var i;
            return i = t(this.element), this.data = t.data(this), clearInterval(this.data.playInterval), this.options.play.pauseOnHover && e && t(".slidesjs-container", i).unbind(), t.data(this, "playInterval", null), t.data(this, "playing", !1), t(".slidesjs-play", i).removeClass("slidesjs-playing"), this.options.play.swap ? (t(".slidesjs-stop", i).hide(), t(".slidesjs-play", i).show()) : void 0
        }, n.prototype._slide = function(e) {
            var i, n, s, r, o, a, l, c, u, h, d = this;
            return i = t(this.element), this.data = t.data(this), this.data.animating || e === this.data.current + 1 ? void 0 : (t.data(this, "animating", !0), n = this.data.current, e > -1 ? (e -= 1, h = e > n ? 1 : -1, s = e > n ? -this.options.width : this.options.width, o = e) : (h = "next" === this.data.direction ? 1 : -1, s = "next" === this.data.direction ? -this.options.width : this.options.width, o = n + h), -1 === o && (o = this.data.total - 1), o === this.data.total && (o = 0), this._setActive(o), l = t(".slidesjs-control", i), e > -1 && l.children(":not(:eq(" + n + "))").css({
                display: "none",
                left: 0,
                zIndex: 0
            }), l.children(":eq(" + o + ")").css({
                display: "block",
                left: h * this.options.width,
                zIndex: 10
            }), this.options.callback.start(n + 1), this.data.vendorPrefix ? (a = this.data.vendorPrefix, u = a + "Transform", r = a + "TransitionDuration", c = a + "TransitionTimingFunction", l[0].style[u] = "translateX(" + s + "px)", l[0].style[r] = this.options.effect.slide.speed + "ms", l.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
                return l[0].style[u] = "", l[0].style[r] = "", l.children(":eq(" + o + ")").css({
                    left: 0
                }), l.children(":eq(" + n + ")").css({
                    display: "none",
                    left: 0,
                    zIndex: 0
                }), t.data(d, "current", o), t.data(d, "animating", !1), l.unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd"), l.children(":not(:eq(" + o + "))").css({
                    display: "none",
                    left: 0,
                    zIndex: 0
                }), d.data.touch && d._setuptouch(), d.options.callback.complete(o + 1)
            })) : l.stop().animate({
                left: s
            }, this.options.effect.slide.speed, function() {
                return l.css({
                    left: 0
                }), l.children(":eq(" + o + ")").css({
                    left: 0
                }), l.children(":eq(" + n + ")").css({
                    display: "none",
                    left: 0,
                    zIndex: 0
                }, t.data(d, "current", o), t.data(d, "animating", !1), d.options.callback.complete(o + 1))
            }))
        }, n.prototype._fade = function(e) {
            var i, n, s, r, o, a = this;
            return i = t(this.element), this.data = t.data(this), this.data.animating || e === this.data.current + 1 ? void 0 : (t.data(this, "animating", !0), n = this.data.current, e ? (e -= 1, o = e > n ? 1 : -1, s = e) : (o = "next" === this.data.direction ? 1 : -1, s = n + o), -1 === s && (s = this.data.total - 1), s === this.data.total && (s = 0), this._setActive(s), r = t(".slidesjs-control", i), r.children(":eq(" + s + ")").css({
                display: "none",
                left: 0,
                zIndex: 10
            }), this.options.callback.start(n + 1), this.options.effect.fade.crossfade ? (r.children(":eq(" + this.data.current + ")").stop().fadeOut(this.options.effect.fade.speed), r.children(":eq(" + s + ")").stop().fadeIn(this.options.effect.fade.speed, function() {
                return r.children(":eq(" + s + ")").css({
                    zIndex: 0
                }), t.data(a, "animating", !1), t.data(a, "current", s), a.options.callback.complete(s + 1)
            })) : r.children(":eq(" + n + ")").stop().fadeOut(this.options.effect.fade.speed, function() {
                return r.children(":eq(" + s + ")").stop().fadeIn(a.options.effect.fade.speed, function() {
                    return r.children(":eq(" + s + ")").css({
                        zIndex: 10
                    })
                }), t.data(a, "animating", !1), t.data(a, "current", s), a.options.callback.complete(s + 1)
            }))
        }, n.prototype._getVendorPrefix = function() {
            var t, e, n, s, r;
            for (t = i.body || i.documentElement, n = t.style, s = "transition", r = ["Moz", "Webkit", "Khtml", "O", "ms"], s = s.charAt(0).toUpperCase() + s.substr(1), e = 0; e < r.length;) {
                if ("string" == typeof n[r[e] + s]) return r[e];
                e++
            }
            return !1
        }, t.fn[r] = function(e) {
            return this.each(function() {
                return t.data(this, "plugin_" + r) ? void 0 : t.data(this, "plugin_" + r, new n(this, e))
            })
        }
    }(jQuery, window, document)
}.call(this),
    function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
    }(function(t) {
        function e(t) {
            return t
        }

        function i(t) {
            return decodeURIComponent(t.replace(s, " "))
        }

        function n(t) {
            0 === t.indexOf('"') && (t = t.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                return r.json ? JSON.parse(t) : t
            } catch (e) {}
        }
        var s = /\+/g,
            r = t.cookie = function(s, o, a) {
                if (void 0 !== o) {
                    if (a = t.extend({}, r.defaults, a), "number" == typeof a.expires) {
                        var l = a.expires,
                            c = a.expires = new Date;
                        c.setDate(c.getDate() + l)
                    }
                    return o = r.json ? JSON.stringify(o) : String(o), document.cookie = [r.raw ? s : encodeURIComponent(s), "=", r.raw ? o : encodeURIComponent(o), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("")
                }
                for (var u = r.raw ? e : i, h = document.cookie.split("; "), d = s ? void 0 : {}, p = 0, f = h.length; f > p; p++) {
                    var m = h[p].split("="),
                        g = u(m.shift()),
                        v = u(m.join("="));
                    if (s && s === g) {
                        d = n(v);
                        break
                    }
                    s || (d[g] = n(v))
                }
                return d
            };
        r.defaults = {}, t.removeCookie = function(e, i) {
            return void 0 !== t.cookie(e) ? (t.cookie(e, "", t.extend({}, i, {
                expires: -1
            })), !0) : !1
        }
    }), window.Modernizr = function(t, e, i) {
        function n(t) {
            f.cssText = t
        }

        function s(t, e) {
            return typeof t === e
        }
        var r, o, a, l = "2.6.2",
            c = {},
            u = !0,
            h = e.documentElement,
            d = "modernizr",
            p = e.createElement(d),
            f = p.style,
            m = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
            g = {},
            v = [],
            y = v.slice,
            b = function(t, i, n, s) {
                var r, o, a, l, c = e.createElement("div"),
                    u = e.body,
                    p = u || e.createElement("body");
                if (parseInt(n, 10))
                    for (; n--;) a = e.createElement("div"), a.id = s ? s[n] : d + (n + 1), c.appendChild(a);
                return r = ["&#173;", '<style id="s', d, '">', t, "</style>"].join(""), c.id = d, (u ? c : p).innerHTML += r, p.appendChild(c), u || (p.style.background = "", p.style.overflow = "hidden", l = h.style.overflow, h.style.overflow = "hidden", h.appendChild(p)), o = i(c, t), u ? c.parentNode.removeChild(c) : (p.parentNode.removeChild(p), h.style.overflow = l), !!o
            },
            w = {}.hasOwnProperty;
        a = s(w, "undefined") || s(w.call, "undefined") ? function(t, e) {
            return e in t && s(t.constructor.prototype[e], "undefined")
        } : function(t, e) {
            return w.call(t, e)
        }, Function.prototype.bind || (Function.prototype.bind = function(t) {
            var e = this;
            if ("function" != typeof e) throw new TypeError;
            var i = y.call(arguments, 1),
                n = function() {
                    if (this instanceof n) {
                        var s = function() {};
                        s.prototype = e.prototype;
                        var r = new s,
                            o = e.apply(r, i.concat(y.call(arguments)));
                        return Object(o) === o ? o : r
                    }
                    return e.apply(t, i.concat(y.call(arguments)))
                };
            return n
        }), g.touch = function() {
            var i;
            return "ontouchstart" in t || t.DocumentTouch && e instanceof DocumentTouch ? i = !0 : b(["@media (", m.join("touch-enabled),("), d, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(t) {
                i = 9 === t.offsetTop
            }), i
        };
        for (var _ in g) a(g, _) && (o = _.toLowerCase(), c[o] = g[_](), v.push((c[o] ? "" : "no-") + o));
        return c.addTest = function(t, e) {
            if ("object" == typeof t)
                for (var n in t) a(t, n) && c.addTest(n, t[n]);
            else {
                if (t = t.toLowerCase(), c[t] !== i) return c;
                e = "function" == typeof e ? e() : e, "undefined" != typeof u && u && (h.className += " " + (e ? "" : "no-") + t), c[t] = e
            }
            return c
        }, n(""), p = r = null, c._version = l, c._prefixes = m, c.testStyles = b, h.className = h.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (u ? " js " + v.join(" ") : ""), c
    }(this, this.document),
    function(t) {
        "use strict";

        function e(t) {
            return RegExp("(^|\\s+)" + t + "(\\s+|$)")
        }

        function i(t, e) {
            var i = n(t, e) ? r : s;
            i(t, e)
        }
        var n, s, r;
        "classList" in document.documentElement ? (n = function(t, e) {
            return t.classList.contains(e)
        }, s = function(t, e) {
            t.classList.add(e)
        }, r = function(t, e) {
            t.classList.remove(e)
        }) : (n = function(t, i) {
            return e(i).test(t.className)
        }, s = function(t, e) {
            n(t, e) || (t.className = t.className + " " + e)
        }, r = function(t, i) {
            t.className = t.className.replace(e(i), " ")
        });
        var o = {
            hasClass: n,
            addClass: s,
            removeClass: r,
            toggleClass: i,
            has: n,
            add: s,
            remove: r,
            toggle: i
        };
        "function" == typeof define && define.amd ? define(o) : t.classie = o
    }(window),
    function(t) {
        "use strict";
        var e = document.documentElement,
            i = function() {};
        e.addEventListener ? i = function(t, e, i) {
            t.addEventListener(e, i, !1)
        } : e.attachEvent && (i = function(e, i, n) {
            e[i + n] = n.handleEvent ? function() {
                var e = t.event;
                e.target = e.target || e.srcElement, n.handleEvent.call(n, e)
            } : function() {
                var i = t.event;
                i.target = i.target || i.srcElement, n.call(e, i)
            }, e.attachEvent("on" + i, e[i + n])
        });
        var n = function() {};
        e.removeEventListener ? n = function(t, e, i) {
            t.removeEventListener(e, i, !1)
        } : e.detachEvent && (n = function(t, e, i) {
            t.detachEvent("on" + e, t[e + i]);
            try {
                delete t[e + i]
            } catch (n) {
                t[e + i] = void 0
            }
        });
        var s = {
            bind: i,
            unbind: n
        };
        "function" == typeof define && define.amd ? define(s) : t.eventie = s
    }(this),
    function(t) {
        "use strict";

        function e(t) {
            "function" == typeof t && (e.isReady ? t() : r.push(t))
        }

        function i(t) {
            var i = "readystatechange" === t.type && "complete" !== s.readyState;
            if (!e.isReady && !i) {
                e.isReady = !0;
                for (var n = 0, o = r.length; o > n; n++) {
                    var a = r[n];
                    a()
                }
            }
        }

        function n(n) {
            return n.bind(s, "DOMContentLoaded", i), n.bind(s, "readystatechange", i), n.bind(t, "load", i), e
        }
        var s = t.document,
            r = [];
        e.isReady = !1, "function" == typeof define && define.amd ? define(["eventie"], n) : t.docReady = n(t.eventie)
    }(this),
    function(t) {
        "use strict";

        function e() {}

        function i(t, e) {
            if (s) return e.indexOf(t);
            for (var i = e.length; i--;)
                if (e[i] === t) return i;
            return -1
        }
        var n = e.prototype,
            s = Array.prototype.indexOf ? !0 : !1;
        n._getEvents = function() {
            return this._events || (this._events = {})
        }, n.getListeners = function(t) {
            var e, i, n = this._getEvents();
            if ("object" == typeof t) {
                e = {};
                for (i in n) n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i])
            } else e = n[t] || (n[t] = []);
            return e
        }, n.getListenersAsObject = function(t) {
            var e, i = this.getListeners(t);
            return i instanceof Array && (e = {}, e[t] = i), e || i
        }, n.addListener = function(t, e) {
            var n, s = this.getListenersAsObject(t);
            for (n in s) s.hasOwnProperty(n) && -1 === i(e, s[n]) && s[n].push(e);
            return this
        }, n.on = n.addListener, n.defineEvent = function(t) {
            return this.getListeners(t), this
        }, n.defineEvents = function(t) {
            for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]);
            return this
        }, n.removeListener = function(t, e) {
            var n, s, r = this.getListenersAsObject(t);
            for (s in r) r.hasOwnProperty(s) && (n = i(e, r[s]), -1 !== n && r[s].splice(n, 1));
            return this
        }, n.off = n.removeListener, n.addListeners = function(t, e) {
            return this.manipulateListeners(!1, t, e)
        }, n.removeListeners = function(t, e) {
            return this.manipulateListeners(!0, t, e)
        }, n.manipulateListeners = function(t, e, i) {
            var n, s, r = t ? this.removeListener : this.addListener,
                o = t ? this.removeListeners : this.addListeners;
            if ("object" != typeof e || e instanceof RegExp)
                for (n = i.length; n--;) r.call(this, e, i[n]);
            else
                for (n in e) e.hasOwnProperty(n) && (s = e[n]) && ("function" == typeof s ? r.call(this, n, s) : o.call(this, n, s));
            return this
        }, n.removeEvent = function(t) {
            var e, i = typeof t,
                n = this._getEvents();
            if ("string" === i) delete n[t];
            else if ("object" === i)
                for (e in n) n.hasOwnProperty(e) && t.test(e) && delete n[e];
            else delete this._events;
            return this
        }, n.emitEvent = function(t, e) {
            var i, n, s, r = this.getListenersAsObject(t);
            for (n in r)
                if (r.hasOwnProperty(n))
                    for (i = r[n].length; i--;) s = e ? r[n][i].apply(null, e) : r[n][i](), s === !0 && this.removeListener(t, r[n][i]);
            return this
        }, n.trigger = n.emitEvent, n.emit = function(t) {
            var e = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(t, e)
        }, "function" == typeof define && define.amd ? define(function() {
            return e
        }) : t.EventEmitter = e
    }(this),
    function(t) {
        "use strict";

        function e(t) {
            if (t) {
                if ("string" == typeof n[t]) return t;
                t = t.charAt(0).toUpperCase() + t.slice(1);
                for (var e, s = 0, r = i.length; r > s; s++)
                    if (e = i[s] + t, "string" == typeof n[e]) return e
            }
        }
        var i = "Webkit Moz ms Ms O".split(" "),
            n = document.documentElement.style;
        "function" == typeof define && define.amd ? define(function() {
            return e
        }) : t.getStyleProperty = e
    }(window),
    function(t) {
        "use strict";

        function e(t) {
            var e = parseFloat(t),
                i = -1 === t.indexOf("%") && !isNaN(e);
            return i && e
        }

        function i() {
            for (var t = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, e = 0, i = o.length; i > e; e++) {
                var n = o[e];
                t[n] = 0
            }
            return t
        }

        function n(t) {
            function n(t) {
                if ("object" == typeof t && t.nodeType) {
                    var n = r(t);
                    if ("none" === n.display) return i();
                    var l = {};
                    l.width = t.offsetWidth, l.height = t.offsetHeight;
                    for (var c = l.isBorderBox = !(!a || !n[a] || "border-box" !== n[a]), u = 0, h = o.length; h > u; u++) {
                        var d = o[u],
                            p = n[d],
                            f = parseFloat(p);
                        l[d] = isNaN(f) ? 0 : f
                    }
                    var m = l.paddingLeft + l.paddingRight,
                        g = l.paddingTop + l.paddingBottom,
                        v = l.marginLeft + l.marginRight,
                        y = l.marginTop + l.marginBottom,
                        b = l.borderLeftWidth + l.borderRightWidth,
                        w = l.borderTopWidth + l.borderBottomWidth,
                        _ = c && s,
                        x = e(n.width);
                    x !== !1 && (l.width = x + (_ ? 0 : m + b));
                    var C = e(n.height);
                    return C !== !1 && (l.height = C + (_ ? 0 : g + w)), l.innerWidth = l.width - (m + b), l.innerHeight = l.height - (g + w), l.outerWidth = l.width + v, l.outerHeight = l.height + y, l
                }
            }
            var s, a = t("boxSizing");
            return function() {
                if (a) {
                    var t = document.createElement("div");
                    t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style[a] = "border-box";
                    var i = document.body || document.documentElement;
                    i.appendChild(t);
                    var n = r(t);
                    s = 200 === e(n.width), i.removeChild(t)
                }
            }(), n
        }
        var s = document.defaultView,
            r = s && s.getComputedStyle ? function(t) {
                return s.getComputedStyle(t, null)
            } : function(t) {
                return t.currentStyle
            },
            o = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
        "function" == typeof define && define.amd ? define(["get-style-property"], n) : t.getSize = n(t.getStyleProperty)
    }(window),
    function(t) {
        "use strict";

        function e() {}

        function i(t) {
            function i(e) {
                e.prototype.option || (e.prototype.option = function(e) {
                    t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
                })
            }

            function s(e, i) {
                t.fn[e] = function(s) {
                    if ("string" == typeof s) {
                        for (var o = n.call(arguments, 1), a = 0, l = this.length; l > a; a++) {
                            var c = this[a],
                                u = t.data(c, e);
                            if (u)
                                if (t.isFunction(u[s]) && "_" !== s.charAt(0)) {
                                    var h = u[s].apply(u, o);
                                    if (void 0 !== h) return h
                                } else r("no such method '" + s + "' for " + e + " instance");
                            else r("cannot call methods on " + e + " prior to initialization; " + "attempted to call '" + s + "'")
                        }
                        return this
                    }
                    return this.each(function() {
                        var n = t.data(this, e);
                        n ? (n.option(s), n._init()) : (n = new i(this, s), t.data(this, e, n))
                    })
                }
            }
            if (t) {
                var r = "undefined" == typeof console ? e : function(t) {
                    console.error(t)
                };
                t.bridget = function(t, e) {
                    i(e), s(t, e)
                }
            }
        }
        var n = Array.prototype.slice;
        "function" == typeof define && define.amd ? define(["jquery"], i) : i(t.jQuery)
    }(window),
    function(t, e) {
        "use strict";

        function i(t, e) {
            return t[a](e)
        }

        function n(t) {
            if (!t.parentNode) {
                var e = document.createDocumentFragment();
                e.appendChild(t)
            }
        }

        function s(t, e) {
            n(t);
            for (var i = t.parentNode.querySelectorAll(e), s = 0, r = i.length; r > s; s++)
                if (i[s] === t) return !0;
            return !1
        }

        function r(t, e) {
            return n(t), i(t, e)
        }
        var o, a = function() {
            if (e.matchesSelector) return "matchesSelector";
            for (var t = ["webkit", "moz", "ms", "o"], i = 0, n = t.length; n > i; i++) {
                var s = t[i],
                    r = s + "MatchesSelector";
                if (e[r]) return r
            }
        }();
        if (a) {
            var l = document.createElement("div"),
                c = i(l, "div");
            o = c ? i : r
        } else o = s;
        "function" == typeof define && define.amd ? define(function() {
            return o
        }) : window.matchesSelector = o
    }(this, Element.prototype),
    function(t) {
        "use strict";

        function e(t) {
            for (var i in e.defaults) this[i] = e.defaults[i];
            for (i in t) this[i] = t[i]
        }
        var i = t.Packery = function() {};
        i.Rect = e, e.defaults = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }, e.prototype.contains = function(t) {
            var e = t.width || 0,
                i = t.height || 0;
            return this.x <= t.x && this.y <= t.y && this.x + this.width >= t.x + e && this.y + this.height >= t.y + i
        }, e.prototype.overlaps = function(t) {
            var e = this.x + this.width,
                i = this.y + this.height,
                n = t.x + t.width,
                s = t.y + t.height;
            return n > this.x && e > t.x && s > this.y && i > t.y
        }, e.prototype.getMaximalFreeRects = function(t) {
            if (!this.overlaps(t)) return !1;
            var i, n = [],
                s = this.x + this.width,
                r = this.y + this.height,
                o = t.x + t.width,
                a = t.y + t.height;
            return this.y < t.y && (i = new e({
                x: this.x,
                y: this.y,
                width: this.width,
                height: t.y - this.y
            }), n.push(i)), s > o && (i = new e({
                x: o,
                y: this.y,
                width: s - o,
                height: this.height
            }), n.push(i)), r > a && (i = new e({
                x: this.x,
                y: a,
                width: this.width,
                height: r - a
            }), n.push(i)), this.x < t.x && (i = new e({
                x: this.x,
                y: this.y,
                width: t.x - this.x,
                height: this.height
            }), n.push(i)), n
        }, e.prototype.canFit = function(t) {
            return this.width >= t.width && this.height >= t.height
        }
    }(window),
    function(t) {
        "use strict";

        function e(t, e) {
            this.width = t || 0, this.height = e || 0, this.reset()
        }
        var i = t.Packery,
            n = i.Rect;
        e.prototype.reset = function() {
            this.spaces = [], this.newSpaces = [];
            var t = new n({
                x: 0,
                y: 0,
                width: this.width,
                height: this.height
            });
            this.spaces.push(t)
        }, e.prototype.pack = function(t) {
            for (var e = 0, i = this.spaces.length; i > e; e++) {
                var n = this.spaces[e];
                if (n.canFit(t)) {
                    this.placeInSpace(t, n);
                    break
                }
            }
        }, e.prototype.placeInSpace = function(t, e) {
            t.x = e.x, t.y = e.y, this.placed(t)
        }, e.prototype.placed = function(t) {
            for (var i = [], n = 0, s = this.spaces.length; s > n; n++) {
                var r = this.spaces[n],
                    o = r.getMaximalFreeRects(t);
                o ? i.push.apply(i, o) : i.push(r)
            }
            this.spaces = i, e.mergeRects(this.spaces), this.spaces.sort(e.spaceSorterTopLeft)
        }, e.mergeRects = function(t) {
            for (var e = 0, i = t.length; i > e; e++) {
                var n = t[e];
                if (n) {
                    var s = t.slice(0);
                    s.splice(e, 1);
                    for (var r = 0, o = 0, a = s.length; a > o; o++) {
                        var l = s[o],
                            c = e > o ? 0 : 1;
                        n.contains(l) && (t.splice(o + c - r, 1), r++)
                    }
                }
            }
            return t
        }, e.spaceSorterTopLeft = function(t, e) {
            return t.y - e.y || t.x - e.x
        }, e.spaceSorterLeftTop = function(t, e) {
            return t.x - e.x || t.y - e.y
        }, i.Packer = e
    }(window),
    function(t) {
        "use strict";

        function e(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function i(t, e) {
            this.element = t, this.packery = e, this.position = {
                x: 0,
                y: 0
            }, this.rect = new s, this.placeRect = new s, this.element.style.position = "absolute"
        }
        var n = t.Packery,
            s = n.Rect,
            r = t.getSize,
            o = t.getStyleProperty,
            a = t.EventEmitter,
            l = document.defaultView,
            c = l && l.getComputedStyle ? function(t) {
                return l.getComputedStyle(t, null)
            } : function(t) {
                return t.currentStyle
            },
            u = o("transition"),
            h = o("transform"),
            d = u && h,
            p = !!o("perspective"),
            f = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend",
                transition: "transitionend"
            }[u],
            m = {
                WebkitTransform: "-webkit-transform",
                MozTransform: "-moz-transform",
                OTransform: "-o-transform",
                transform: "transform"
            }[h];
        e(i.prototype, a.prototype), i.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, i.prototype.getSize = function() {
            this.size = r(this.element)
        }, i.prototype.css = function(t) {
            var e = this.element.style;
            for (var i in t) e[i] = t[i]
        }, i.prototype.getPosition = function() {
            var t = c(this.element),
                e = parseInt(t.left, 10),
                i = parseInt(t.top, 10);
            e = isNaN(e) ? 0 : e, i = isNaN(i) ? 0 : i;
            var n = this.packery.elementSize;
            e -= n.paddingLeft, i -= n.paddingTop, this.position.x = e, this.position.y = i
        };
        var g = p ? function(t, e) {
            return "translate3d( " + t + "px, " + e + "px, 0)"
        } : function(t, e) {
            return "translate( " + t + "px, " + e + "px)"
        };
        i.prototype._transitionTo = function(t, e) {
            this.getPosition();
            var i = this.position.x,
                n = this.position.y,
                s = parseInt(t, 10),
                r = parseInt(e, 10),
                o = s === this.position.x && r === this.position.y;
            if (this.setPosition(t, e), o && !this.isTransitioning) return this.layoutPosition(), void 0;
            var a = t - i,
                l = e - n,
                c = {};
            c[m] = g(a, l), this.transition(c, this.layoutPosition)
        }, i.prototype.goTo = function(t, e) {
            this.setPosition(t, e), this.layoutPosition()
        }, i.prototype.moveTo = d ? i.prototype._transitionTo : i.prototype.goTo, i.prototype.setPosition = function(t, e) {
            this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
        }, i.prototype.layoutPosition = function() {
            var t = this.packery.elementSize;
            this.css({
                left: this.position.x + t.paddingLeft + "px",
                top: this.position.y + t.paddingTop + "px"
            }), this.emitEvent("layout", [this])
        }, i.prototype._nonTransition = function(t, e) {
            this.css(t), e && e.call(this)
        }, i.prototype._transition = function(t, e) {
            this.transitionStyle = t;
            var i = [];
            for (var n in t) i.push(n);
            var s = {};
            s[u + "Property"] = i.join(","), s[u + "Duration"] = this.packery.options.transitionDuration, this.element.addEventListener(f, this, !1), e && this.on("transitionEnd", function(t) {
                return e.call(t), !0
            }), this.css(s), this.css(t), this.isTransitioning = !0
        }, i.prototype.transition = i.prototype[u ? "_transition" : "_nonTransition"], i.prototype.onwebkitTransitionEnd = function(t) {
            this.ontransitionend(t)
        }, i.prototype.onotransitionend = function(t) {
            this.ontransitionend(t)
        }, i.prototype.ontransitionend = function(t) {
            if (t.target === this.element) {
                this.onTransitionEnd && (this.onTransitionEnd(), delete this.onTransitionEnd), this.removeTransitionStyles();
                var e = {};
                for (var i in this.transitionStyle) e[i] = "";
                this.css(e), this.element.removeEventListener(f, this, !1), delete this.transitionStyle, this.isTransitioning = !1, this.emitEvent("transitionEnd", [this])
            }
        }, i.prototype.removeTransitionStyles = function() {
            var t = {};
            t[u + "Property"] = "", t[u + "Duration"] = "", this.css(t)
        }, i.prototype.remove = function() {
            var t = {
                opacity: 0
            };
            t[m] = "scale(0.001)", this.transition(t, this.removeElem)
        }, i.prototype.removeElem = function() {
            this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
        }, i.prototype.reveal = u ? function() {
            var t = {
                opacity: 0
            };
            t[m] = "scale(0.001)", this.css(t);
            var e = this.element.offsetHeight,
                i = {
                    opacity: 1
                };
            i[m] = "scale(1)", this.transition(i), e = null
        } : function() {}, i.prototype.destroy = function() {
            this.css({
                position: "",
                left: "",
                top: ""
            })
        }, i.prototype.dragStart = function() {
            this.getPosition(), this.removeTransitionStyles(), this.isTransitioning && h && (this.element.style[h] = "none"), this.getSize(), this.isPlacing = !0, this.needsPositioning = !1, this.positionPlaceRect(this.position.x, this.position.y), this.isTransitioning = !1, this.didDrag = !1
        }, i.prototype.dragMove = function(t, e) {
            this.didDrag = !0;
            var i = this.packery.elementSize;
            t -= i.paddingLeft, e -= i.paddingTop, this.positionPlaceRect(t, e)
        }, i.prototype.dragStop = function() {
            this.getPosition();
            var t = this.position.x !== this.placeRect.x,
                e = this.position.y !== this.placeRect.y;
            this.needsPositioning = t || e, this.didDrag = !1
        }, i.prototype.positionPlaceRect = function(t, e, i) {
            this.placeRect.x = this.getPlaceRectCoord(t, !0), this.placeRect.y = this.getPlaceRectCoord(e, !1, i)
        }, i.prototype.getPlaceRectCoord = function(t, e, i) {
            var n = e ? "Width" : "Height",
                s = this.size["outer" + n],
                r = this.packery[e ? "columnWidth" : "rowHeight"],
                o = this.packery.elementSize["inner" + n];
            e || (o = Math.max(o, this.packery.maxY), this.packery.rowHeight || (o -= this.packery.gutter));
            var a;
            if (r) {
                r += this.packery.gutter, o += e ? this.packery.gutter : 0, t = Math.round(t / r);
                var l = Math[e ? "floor" : "ceil"](o / r);
                l -= Math.ceil(s / r), a = l
            } else a = o - s;
            return t = i ? t : Math.min(t, a), t *= r || 1, Math.max(0, t)
        }, i.prototype.copyPlaceRectPosition = function() {
            this.rect.x = this.placeRect.x, this.rect.y = this.placeRect.y
        }, n.Item = i
    }(window),
    function(t) {
        "use strict";

        function e(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function i(t) {
            var e = [];
            if ("number" == typeof t.length)
                for (var i = 0, n = t.length; n > i; i++) e.push(t[i]);
            else e.push(t);
            return e
        }

        function n(t, i) {
            if (!t || !v(t)) return m && m.error("bad Packery element: " + t), void 0;
            this.element = t, this.options = e({}, this.options), e(this.options, i);
            var n = ++b;
            this.element.packeryGUID = n, w[n] = this, this._create(), this.options.isInitLayout && this.layout()
        }
        var s = t.Packery,
            r = s.Rect,
            o = s.Packer,
            a = s.Item,
            l = t.classie,
            c = t.docReady,
            u = t.EventEmitter,
            h = t.eventie,
            d = t.getSize,
            p = t.matchesSelector,
            f = t.document,
            m = t.console,
            g = t.jQuery,
            v = "object" == typeof HTMLElement ? function(t) {
                return t instanceof HTMLElement
            } : function(t) {
                return t && "object" == typeof t && 1 === t.nodeType && "string" == typeof t.nodeName
            },
            y = Array.prototype.indexOf ? function(t, e) {
                return t.indexOf(e)
            } : function(t, e) {
                for (var i = 0, n = t.length; n > i; i++)
                    if (t[i] === e) return i;
                return -1
            },
            b = 0,
            w = {};
        e(n.prototype, u.prototype), n.prototype.options = {
            containerStyle: {
                position: "relative"
            },
            isInitLayout: !0,
            isResizeBound: !0,
            transitionDuration: "0.4s"
        }, n.prototype._create = function() {
            this.packer = new o, this.reloadItems(), this.stampedElements = [], this.stamp(this.options.stamped);
            var t = this.options.containerStyle;
            e(this.element.style, t), this.options.isResizeBound && this.bindResize();
            var i = this;
            this.handleDraggabilly = {
                dragStart: function(t) {
                    i.itemDragStart(t.element)
                },
                dragMove: function(t) {
                    i.itemDragMove(t.element, t.position.x, t.position.y)
                },
                dragEnd: function(t) {
                    i.itemDragEnd(t.element)
                }
            }, this.handleUIDraggable = {
                start: function(t) {
                    i.itemDragStart(t.currentTarget)
                },
                drag: function(t, e) {
                    i.itemDragMove(t.currentTarget, e.position.left, e.position.top)
                },
                stop: function(t) {
                    i.itemDragEnd(t.currentTarget)
                }
            }
        }, n.prototype.reloadItems = function() {
            this.items = this._getItems(this.element.children)
        }, n.prototype._getItems = function(t) {
            for (var e = this._filterFindItemElements(t), i = [], n = 0, s = e.length; s > n; n++) {
                var r = e[n],
                    o = new a(r, this);
                i.push(o)
            }
            return i
        }, n.prototype._filterFindItemElements = function(t) {
            t = i(t);
            var e = this.options.itemSelector;
            if (!e) return t;
            for (var n = [], s = 0, r = t.length; r > s; s++) {
                var o = t[s];
                p(o, e) && n.push(o);
                for (var a = o.querySelectorAll(e), l = 0, c = a.length; c > l; l++) n.push(a[l])
            }
            return n
        }, n.prototype.getItemElements = function() {
            for (var t = [], e = 0, i = this.items.length; i > e; e++) t.push(this.items[e].element);
            return t
        }, n.prototype.layout = function() {
            this._prelayout();
            var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            this.layoutItems(this.items, t), this._isLayoutInited = !0
        }, n.prototype._init = n.prototype.layout, n.prototype._prelayout = function() {
            this.elementSize = d(this.element), this._getMeasurements(), this.packer.width = this.elementSize.innerWidth + this.gutter, this.packer.height = Number.POSITIVE_INFINITY, this.packer.reset(), this.maxY = 0, this.placeStampedElements()
        }, n.prototype._getMeasurements = function() {
            this._getMeasurement("columnWidth", "width"), this._getMeasurement("rowHeight", "height"), this._getMeasurement("gutter", "width")
        }, n.prototype._getMeasurement = function(t, e) {
            var i, n = this.options[t];
            n ? ("string" == typeof n ? i = this.element.querySelector(n) : v(n) && (i = n), this[t] = i ? d(i)[e] : n) : this[t] = 0
        }, n.prototype.layoutItems = function(t, e) {
            var i = this._getLayoutItems(t);
            if (i && i.length) {
                this._itemsOn(i, "layout", function() {
                    this.emitEvent("layoutComplete", [this, i])
                });
                for (var n = 0, s = i.length; s > n; n++) {
                    var r = i[n];
                    this._packItem(r), this._layoutItem(r, e)
                }
            } else this.emitEvent("layoutComplete", [this, []]);
            var o = this.elementSize,
                a = this.maxY - this.gutter;
            o.isBorderBox && (a += o.paddingBottom + o.paddingTop + o.borderTopWidth + o.borderBottomWidth), a = Math.max(a, 0), this.element.style.height = a + "px"
        }, n.prototype._getLayoutItems = function(t) {
            for (var e = [], i = 0, n = t.length; n > i; i++) {
                var s = t[i];
                s.isIgnored || e.push(s)
            }
            return e
        }, n.prototype._packItem = function(t) {
            this._setRectSize(t.element, t.rect), this.packer.pack(t.rect), this._setMaxY(t.rect)
        }, n.prototype._setMaxY = function(t) {
            this.maxY = Math.max(t.y + t.height, this.maxY)
        }, n.prototype._setRectSize = function(t, e) {
            var i = d(t),
                n = i.outerWidth,
                s = i.outerHeight,
                r = this.columnWidth + this.gutter,
                o = this.rowHeight + this.gutter;
            n = this.columnWidth ? Math.ceil(n / r) * r : n + this.gutter, s = this.rowHeight ? Math.ceil(s / o) * o : s + this.gutter, e.width = Math.min(n, this.packer.width), e.height = s
        }, n.prototype._layoutItem = function(t, e) {
            var i = t.rect;
            e ? t.goTo(i.x, i.y) : t.moveTo(i.x, i.y)
        }, n.prototype._itemsOn = function(t, e, i) {
            function n() {
                return s++, s === r && i.call(o), !0
            }
            for (var s = 0, r = t.length, o = this, a = 0, l = t.length; l > a; a++) {
                var c = t[a];
                c.on(e, n)
            }
        }, n.prototype.stamp = function(t) {
            if (t) {
                "string" == typeof t && (t = this.element.querySelectorAll(t)), t = i(t), this.stampedElements.push.apply(this.stampedElements, t);
                for (var e = 0, n = t.length; n > e; e++) {
                    var s = t[e];
                    this.ignore(s)
                }
            }
        }, n.prototype.unstamp = function(t) {
            if (t) {
                t = i(t);
                for (var e = 0, n = t.length; n > e; e++) {
                    var s = t[e],
                        r = y(this.stampedElements, s); - 1 !== r && this.stampedElements.splice(r, 1), this.unignore(s)
                }
            }
        }, n.prototype.placeStampedElements = function() {
            if (this.stampedElements && this.stampedElements.length) {
                this._getBounds();
                for (var t = 0, e = this.stampedElements.length; e > t; t++) {
                    var i = this.stampedElements[t];
                    this.placeStamp(i)
                }
            }
        }, n.prototype._getBounds = function() {
            var t = this.element.getBoundingClientRect();
            this._boundingLeft = t.left + this.elementSize.paddingLeft, this._boundingTop = t.top + this.elementSize.paddingTop
        }, n.prototype.placeStamp = function(t) {
            var e, i = this.getItem(t);
            e = i && i.isPlacing ? i.placeRect : this._getElementOffsetRect(t), this._setRectSize(t, e), this.packer.placed(e), this._setMaxY(e)
        }, n.prototype._getElementOffsetRect = function(t) {
            var e = t.getBoundingClientRect(),
                i = new r({
                    x: e.left - this._boundingLeft,
                    y: e.top - this._boundingTop
                });
            return i.x -= this.elementSize.borderLeftWidth, i.y -= this.elementSize.borderTopWidth, i
        }, n.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, n.prototype.bindResize = function() {
            this.isResizeBound || (h.bind(t, "resize", this), this.isResizeBound = !0)
        }, n.prototype.unbindResize = function() {
            h.unbind(t, "resize", this), this.isResizeBound = !1
        }, n.prototype.onresize = function() {
            function t() {
                e.resize()
            }
            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var e = this;
            this.resizeTimeout = setTimeout(t, 100)
        }, n.prototype.resize = function() {
            var t = d(this.element),
                e = this.elementSize && t;
            e && t.innerWidth === this.elementSize.innerWidth || (this.layout(), delete this.resizeTimeout)
        }, n.prototype.addItems = function(t) {
            var e = this._getItems(t);
            return e.length ? (this.items.push.apply(this.items, e), e) : void 0
        }, n.prototype.appended = function(t) {
            var e = this.addItems(t);
            e.length && (this.layoutItems(e, !0), this.reveal(e))
        }, n.prototype.prepended = function(t) {
            var e = this._getItems(t);
            if (e.length) {
                var i = this.items.slice(0);
                this.items = e.concat(i), this._prelayout(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
            }
        }, n.prototype.reveal = function(t) {
            if (t && t.length)
                for (var e = 0, i = t.length; i > e; e++) {
                    var n = t[e];
                    n.reveal()
                }
        }, n.prototype.getItem = function(t) {
            for (var e = 0, i = this.items.length; i > e; e++) {
                var n = this.items[e];
                if (n.element === t) return n
            }
        }, n.prototype.getItems = function(t) {
            if (t && t.length) {
                for (var e = [], i = 0, n = t.length; n > i; i++) {
                    var s = t[i],
                        r = this.getItem(s);
                    r && e.push(r)
                }
                return e
            }
        }, n.prototype.remove = function(t) {
            t = i(t);
            var e = this.getItems(t);
            this._itemsOn(e, "remove", function() {
                this.emitEvent("removeComplete", [this, e])
            });
            for (var n = 0, s = e.length; s > n; n++) {
                var r = e[n];
                r.remove();
                var o = y(this.items, r);
                this.items.splice(o, 1)
            }
        }, n.prototype.ignore = function(t) {
            var e = this.getItem(t);
            e && (e.isIgnored = !0)
        }, n.prototype.unignore = function(t) {
            var e = this.getItem(t);
            e && delete e.isIgnored
        }, n.prototype.sortItemsByPosition = function() {
            this.items.sort(function(t, e) {
                return t.position.y - e.position.y || t.position.x - e.position.x
            })
        }, n.prototype.fit = function(t, e, i) {
            function n() {
                o++, 2 === o && r.emitEvent("fitComplete", [r, s])
            }
            var s = this.getItem(t);
            if (s) {
                this._getMeasurements(), this.stamp(s.element), s.getSize(), s.isPlacing = !0, e = void 0 === e ? s.rect.x : e, i = void 0 === i ? s.rect.y : i, s.positionPlaceRect(e, i, !0);
                var r = this,
                    o = 0;
                s.on("layout", function() {
                    return n(), !0
                }), this.on("layoutComplete", function() {
                    return n(), !0
                }), s.moveTo(s.placeRect.x, s.placeRect.y), this.layout(), this.unstamp(s.element), this.sortItemsByPosition(), s.isPlacing = !1, s.copyPlaceRectPosition()
            }
        }, n.prototype.itemDragStart = function(t) {
            this.stamp(t);
            var e = this.getItem(t);
            e && e.dragStart()
        }, n.prototype.itemDragMove = function(t, e, i) {
            function n() {
                r.layout(), delete r.dragTimeout
            }
            var s = this.getItem(t);
            s && s.dragMove(e, i);
            var r = this;
            this.clearDragTimeout(), this.dragTimeout = setTimeout(n, 40)
        }, n.prototype.clearDragTimeout = function() {
            this.dragTimeout && clearTimeout(this.dragTimeout)
        }, n.prototype.itemDragEnd = function(t) {
            function e() {
                return o++, o !== r ? !0 : (n && (l.remove(n.element, "is-positioning-post-drag"), n.isPlacing = !1, n.copyPlaceRectPosition()), a.unstamp(t), a.sortItemsByPosition(), n && s && a.emitEvent("dragItemPositioned", [a, n]), !0)
            }
            var i, n = this.getItem(t);
            if (n && (i = n.didDrag, n.dragStop()), !n || !i && !n.needsPositioning) return this.unstamp(t), void 0;
            l.add(n.element, "is-positioning-post-drag");
            var s = n.needsPositioning,
                r = s ? 2 : 1,
                o = 0,
                a = this;
            s ? (n.on("layout", e), n.moveTo(n.placeRect.x, n.placeRect.y)) : n && n.copyPlaceRectPosition(), this.clearDragTimeout(), this.on("layoutComplete", e), this.layout()
        }, n.prototype.bindDraggabillyEvents = function(t) {
            t.on("dragStart", this.handleDraggabilly.dragStart), t.on("dragMove", this.handleDraggabilly.dragMove), t.on("dragEnd", this.handleDraggabilly.dragEnd)
        }, n.prototype.bindUIDraggableEvents = function(t) {
            t.on("dragstart", this.handleUIDraggable.start).on("drag", this.handleUIDraggable.drag).on("dragstop", this.handleUIDraggable.stop)
        }, n.prototype.destroy = function() {
            this.element.style.position = "", this.element.style.height = "", delete this.element.packeryGUID;
            for (var t = 0, e = this.items.length; e > t; t++) {
                var i = this.items[t];
                i.destroy()
            }
            this.unbindResize()
        }, n.data = function(t) {
            var e = t.packeryGUID;
            return e && w[e]
        }, c(function() {
            for (var t = f.querySelectorAll(".js-packery"), e = 0, i = t.length; i > e; e++) {
                var s, r = t[e],
                    o = r.getAttribute("data-packery-options");
                try {
                    s = o && JSON.parse(o)
                } catch (a) {
                    m && m.error("Error parsing data-packery-options on " + r.nodeName.toLowerCase() + (r.id ? "#" + r.id : "") + ": " + a);
                    continue
                }
                var l = new n(r, s);
                g && g.data(r, "packery", l)
            }
        }), g && g.bridget && g.bridget("packery", n), n.Rect = r, n.Packer = o, n.Item = a, t.Packery = n
    }(window),
    function(k) {
        for (var d, f, l = document.getElementsByTagName("head")[0].style, h = ["transformProperty", "WebkitTransform", "OTransform", "msTransform", "MozTransform"], g = 0; g < h.length; g++) void 0 !== l[h[g]] && (d = h[g]);
        d && (f = d.replace(/[tT]ransform/, "TransformOrigin"), "T" == f[0] && (f[0] = "t")), eval('IE = "v"==""'), jQuery.fn.extend({
            rotate: function(t) {
                if (0 !== this.length && "undefined" != typeof t) {
                    "number" == typeof t && (t = {
                        angle: t
                    });
                    for (var e = [], i = 0, n = this.length; n > i; i++) {
                        var s = this.get(i);
                        if (s.Wilq32 && s.Wilq32.PhotoEffect) s.Wilq32.PhotoEffect._handleRotation(t);
                        else {
                            var r = k.extend(!0, {}, t),
                                s = new Wilq32.PhotoEffect(s, r)._rootObj;
                            e.push(k(s))
                        }
                    }
                    return e
                }
            },
            getRotateAngle: function() {
                for (var t = [], e = 0, i = this.length; i > e; e++) {
                    var n = this.get(e);
                    n.Wilq32 && n.Wilq32.PhotoEffect && (t[e] = n.Wilq32.PhotoEffect._angle)
                }
                return t
            },
            stopRotate: function() {
                for (var t = 0, e = this.length; e > t; t++) {
                    var i = this.get(t);
                    i.Wilq32 && i.Wilq32.PhotoEffect && clearTimeout(i.Wilq32.PhotoEffect._timer)
                }
            }
        }), Wilq32 = window.Wilq32 || {}, Wilq32.PhotoEffect = function() {
            return d ? function(t, e) {
                t.Wilq32 = {
                    PhotoEffect: this
                }, this._img = this._rootObj = this._eventObj = t, this._handleRotation(e)
            } : function(t, e) {
                if (this._img = t, this._onLoadDelegate = [e], this._rootObj = document.createElement("span"), this._rootObj.style.display = "inline-block", this._rootObj.Wilq32 = {
                        PhotoEffect: this
                    }, t.parentNode.insertBefore(this._rootObj, t), t.complete) this._Loader();
                else {
                    var i = this;
                    jQuery(this._img).bind("load", function() {
                        i._Loader()
                    })
                }
            }
        }(), Wilq32.PhotoEffect.prototype = {
            _setupParameters: function(t) {
                this._parameters = this._parameters || {}, "number" != typeof this._angle && (this._angle = 0), "number" == typeof t.angle && (this._angle = t.angle), this._parameters.animateTo = "number" == typeof t.animateTo ? t.animateTo : this._angle, this._parameters.step = t.step || this._parameters.step || null, this._parameters.easing = t.easing || this._parameters.easing || this._defaultEasing, this._parameters.duration = t.duration || this._parameters.duration || 1e3, this._parameters.callback = t.callback || this._parameters.callback || this._emptyFunction, this._parameters.center = t.center || this._parameters.center || ["50%", "50%"], this._rotationCenterX = "string" == typeof this._parameters.center[0] ? parseInt(this._parameters.center[0], 10) / 100 * this._imgWidth * this._aspectW : this._parameters.center[0], this._rotationCenterY = "string" == typeof this._parameters.center[1] ? parseInt(this._parameters.center[1], 10) / 100 * this._imgHeight * this._aspectH : this._parameters.center[1], t.bind && t.bind != this._parameters.bind && this._BindEvents(t.bind)
            },
            _emptyFunction: function() {},
            _defaultEasing: function(t, e, i, n, s) {
                return -n * ((e = e / s - 1) * e * e * e - 1) + i
            },
            _handleRotation: function(t, e) {
                d || this._img.complete || e ? (this._setupParameters(t), this._angle == this._parameters.animateTo ? this._rotate(this._angle) : this._animateStart()) : this._onLoadDelegate.push(t)
            },
            _BindEvents: function(t) {
                if (t && this._eventObj) {
                    if (this._parameters.bind) {
                        var e, i = this._parameters.bind;
                        for (e in i) i.hasOwnProperty(e) && jQuery(this._eventObj).unbind(e, i[e])
                    }
                    this._parameters.bind = t;
                    for (e in t) t.hasOwnProperty(e) && jQuery(this._eventObj).bind(e, t[e])
                }
            },
            _Loader: function() {
                return IE ? function() {
                    var t = this._img.width,
                        e = this._img.height;
                    for (this._imgWidth = t, this._imgHeight = e, this._img.parentNode.removeChild(this._img), this._vimage = this.createVMLNode("image"), this._vimage.src = this._img.src, this._vimage.style.height = e + "px", this._vimage.style.width = t + "px", this._vimage.style.position = "absolute", this._vimage.style.top = "0px", this._vimage.style.left = "0px", this._aspectW = this._aspectH = 1, this._container = this.createVMLNode("group"), this._container.style.width = t, this._container.style.height = e, this._container.style.position = "absolute", this._container.style.top = "0px", this._container.style.left = "0px", this._container.setAttribute("coordsize", t - 1 + "," + (e - 1)), this._container.appendChild(this._vimage), this._rootObj.appendChild(this._container), this._rootObj.style.position = "relative", this._rootObj.style.width = t + "px", this._rootObj.style.height = e + "px", this._rootObj.setAttribute("id", this._img.getAttribute("id")), this._rootObj.className = this._img.className, this._eventObj = this._rootObj; t = this._onLoadDelegate.shift();) this._handleRotation(t, !0)
                } : function() {
                    this._rootObj.setAttribute("id", this._img.getAttribute("id")), this._rootObj.className = this._img.className, this._imgWidth = this._img.naturalWidth, this._imgHeight = this._img.naturalHeight;
                    var t = Math.sqrt(this._imgHeight * this._imgHeight + this._imgWidth * this._imgWidth);
                    for (this._width = 3 * t, this._height = 3 * t, this._aspectW = this._img.offsetWidth / this._img.naturalWidth, this._aspectH = this._img.offsetHeight / this._img.naturalHeight, this._img.parentNode.removeChild(this._img), this._canvas = document.createElement("canvas"), this._canvas.setAttribute("width", this._width), this._canvas.style.position = "relative", this._canvas.style.left = -this._img.height * this._aspectW + "px", this._canvas.style.top = -this._img.width * this._aspectH + "px", this._canvas.Wilq32 = this._rootObj.Wilq32, this._rootObj.appendChild(this._canvas), this._rootObj.style.width = this._img.width * this._aspectW + "px", this._rootObj.style.height = this._img.height * this._aspectH + "px", this._eventObj = this._canvas, this._cnv = this._canvas.getContext("2d"); t = this._onLoadDelegate.shift();) this._handleRotation(t, !0)
                }
            }(),
            _animateStart: function() {
                this._timer && clearTimeout(this._timer), this._animateStartTime = +new Date, this._animateStartAngle = this._angle, this._animate()
            },
            _animate: function() {
                var t = +new Date,
                    e = t - this._animateStartTime > this._parameters.duration;
                if (e && !this._parameters.animatedGif) clearTimeout(this._timer);
                else {
                    (this._canvas || this._vimage || this._img) && (t = this._parameters.easing(0, t - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration), this._rotate(~~(10 * t) / 10)), this._parameters.step && this._parameters.step(this._angle);
                    var i = this;
                    this._timer = setTimeout(function() {
                        i._animate.call(i)
                    }, 10)
                }
                this._parameters.callback && e && (this._angle = this._parameters.animateTo, this._rotate(this._angle), this._parameters.callback.call(this._rootObj))
            },
            _rotate: function() {
                var t = Math.PI / 180;
                return IE ? function(t) {
                    this._angle = t, this._container.style.rotation = t % 360 + "deg", this._vimage.style.top = -(this._rotationCenterY - this._imgHeight / 2) + "px", this._vimage.style.left = -(this._rotationCenterX - this._imgWidth / 2) + "px", this._container.style.top = this._rotationCenterY - this._imgHeight / 2 + "px", this._container.style.left = this._rotationCenterX - this._imgWidth / 2 + "px"
                } : d ? function(t) {
                    this._angle = t, this._img.style[d] = "rotate(" + t % 360 + "deg)", this._img.style[f] = this._parameters.center.join(" ")
                } : function(e) {
                    this._angle = e, e = e % 360 * t, this._canvas.width = this._width, this._canvas.height = this._height, this._cnv.translate(this._imgWidth * this._aspectW, this._imgHeight * this._aspectH), this._cnv.translate(this._rotationCenterX, this._rotationCenterY), this._cnv.rotate(e), this._cnv.translate(-this._rotationCenterX, -this._rotationCenterY), this._cnv.scale(this._aspectW, this._aspectH), this._cnv.drawImage(this._img, 0, 0)
                }
            }()
        }, IE && (Wilq32.PhotoEffect.prototype.createVMLNode = function() {
            document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
            try {
                return !document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"),
                    function(t) {
                        return document.createElement("<rvml:" + t + ' class="rvml">')
                    }
            } catch (t) {
                return function(t) {
                    return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                }
            }
        }())
    }(jQuery),
    function(t) {}(this),
    function(t, e) {
        if ("object" == typeof exports && exports) e(exports);
        else {
            var i = {};
            e(i), "function" == typeof define && define.amd ? define(i) : t.Mustache = i
        }
    }(this, function(t) {
        function e(t, e) {
            return b.call(t, e)
        }

        function i(t) {
            return !e(m, t)
        }

        function n(t) {
            return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        }

        function s(t) {
            return String(t).replace(/[&<>"'\/]/g, function(t) {
                return x[t]
            })
        }

        function r(t) {
            this.string = t, this.tail = t, this.pos = 0
        }

        function o(t, e) {
            this.view = t || {}, this.parent = e, this._cache = {}
        }

        function a() {
            this.clearCache()
        }

        function l(e, i, n, s) {
            for (var r, o, a, c = "", u = 0, h = e.length; h > u; ++u) switch (r = e[u], o = r[1], r[0]) {
                case "#":
                    if (a = n.lookup(o), "object" == typeof a)
                        if (_(a))
                            for (var d = 0, p = a.length; p > d; ++d) c += l(r[4], i, n.push(a[d]), s);
                        else a && (c += l(r[4], i, n.push(a), s));
                    else if ("function" == typeof a) {
                        var f = null == s ? null : s.slice(r[3], r[5]);
                        a = a.call(n.view, f, function(t) {
                            return i.render(t, n)
                        }), null != a && (c += a)
                    } else a && (c += l(r[4], i, n, s));
                    break;
                case "^":
                    a = n.lookup(o), (!a || _(a) && 0 === a.length) && (c += l(r[4], i, n, s));
                    break;
                case ">":
                    a = i.getPartial(o), "function" == typeof a && (c += a(n));
                    break;
                case "&":
                    a = n.lookup(o), null != a && (c += a);
                    break;
                case "name":
                    a = n.lookup(o), null != a && (c += t.escape(a));
                    break;
                case "text":
                    c += o
            }
            return c
        }

        function c(t) {
            for (var e, i = [], n = i, s = [], r = 0, o = t.length; o > r; ++r) switch (e = t[r], e[0]) {
                case "#":
                case "^":
                    s.push(e), n.push(e), n = e[4] = [];
                    break;
                case "/":
                    var a = s.pop();
                    a[5] = e[2], n = s.length > 0 ? s[s.length - 1][4] : i;
                    break;
                default:
                    n.push(e)
            }
            return i
        }

        function u(t) {
            for (var e, i, n = [], s = 0, r = t.length; r > s; ++s) e = t[s], e && ("text" === e[0] && i && "text" === i[0] ? (i[1] += e[1], i[3] = e[3]) : (i = e, n.push(e)));
            return n
        }

        function h(t) {
            return [new RegExp(n(t[0]) + "\\s*"), new RegExp("\\s*" + n(t[1]))]
        }

        function d(e, s) {
            function o() {
                if (T && !M)
                    for (; k.length;) delete C[k.pop()];
                else k = [];
                T = !1, M = !1
            }
            if (e = e || "", s = s || t.tags, "string" == typeof s && (s = s.split(f)), 2 !== s.length) throw new Error("Invalid tags: " + s.join(", "));
            for (var a, l, d, m, b, w = h(s), _ = new r(e), x = [], C = [], k = [], T = !1, M = !1; !_.eos();) {
                if (a = _.pos, d = _.scanUntil(w[0]))
                    for (var E = 0, D = d.length; D > E; ++E) m = d.charAt(E), i(m) ? k.push(C.length) : M = !0, C.push(["text", m, a, a + 1]), a += 1, "\n" == m && o();
                if (!_.scan(w[0])) break;
                if (T = !0, l = _.scan(y) || "name", _.scan(p), "=" === l ? (d = _.scanUntil(g), _.scan(g), _.scanUntil(w[1])) : "{" === l ? (d = _.scanUntil(new RegExp("\\s*" + n("}" + s[1]))), _.scan(v), _.scanUntil(w[1]), l = "&") : d = _.scanUntil(w[1]), !_.scan(w[1])) throw new Error("Unclosed tag at " + _.pos);
                if (b = [l, d, a, _.pos], C.push(b), "#" === l || "^" === l) x.push(b);
                else if ("/" === l) {
                    if (0 === x.length) throw new Error('Unopened section "' + d + '" at ' + a);
                    var S = x.pop();
                    if (S[1] !== d) throw new Error('Unclosed section "' + S[1] + '" at ' + a)
                } else if ("name" === l || "{" === l || "&" === l) M = !0;
                else if ("=" === l) {
                    if (s = d.split(f), 2 !== s.length) throw new Error("Invalid tags at " + a + ": " + s.join(", "));
                    w = h(s)
                }
            }
            var S = x.pop();
            if (S) throw new Error('Unclosed section "' + S[1] + '" at ' + _.pos);
            return C = u(C), c(C)
        }
        var p = /\s*/,
            f = /\s+/,
            m = /\S/,
            g = /\s*=/,
            v = /\s*\}/,
            y = /#|\^|\/|>|\{|&|=|!/,
            b = RegExp.prototype.test,
            w = Object.prototype.toString,
            _ = Array.isArray || function(t) {
                return "[object Array]" === w.call(t)
            },
            x = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#x2F;"
            };
        r.prototype.eos = function() {
            return "" === this.tail
        }, r.prototype.scan = function(t) {
            var e = this.tail.match(t);
            return e && 0 === e.index ? (this.tail = this.tail.substring(e[0].length), this.pos += e[0].length, e[0]) : ""
        }, r.prototype.scanUntil = function(t) {
            var e, i = this.tail.search(t);
            switch (i) {
                case -1:
                    e = this.tail, this.pos += this.tail.length, this.tail = "";
                    break;
                case 0:
                    e = "";
                    break;
                default:
                    e = this.tail.substring(0, i), this.tail = this.tail.substring(i), this.pos += i
            }
            return e
        }, o.make = function(t) {
            return t instanceof o ? t : new o(t)
        }, o.prototype.push = function(t) {
            return new o(t, this)
        }, o.prototype.lookup = function(t) {
            var e = this._cache[t];
            if (!e) {
                if ("." == t) e = this.view;
                else
                    for (var i = this; i;) {
                        if (t.indexOf(".") > 0) {
                            e = i.view;
                            for (var n = t.split("."), s = 0; e && s < n.length;) e = e[n[s++]]
                        } else e = i.view[t];
                        if (null != e) break;
                        i = i.parent
                    }
                this._cache[t] = e
            }
            return "function" == typeof e && (e = e.call(this.view)), e
        }, a.prototype.clearCache = function() {
            this._cache = {}, this._partialCache = {}
        }, a.prototype.compile = function(e, i) {
            var n = this._cache[e];
            if (!n) {
                var s = t.parse(e, i);
                n = this._cache[e] = this.compileTokens(s, e)
            }
            return n
        }, a.prototype.compilePartial = function(t, e, i) {
            var n = this.compile(e, i);
            return this._partialCache[t] = n, n
        }, a.prototype.getPartial = function(t) {
            return t in this._partialCache || !this._loadPartial || this.compilePartial(t, this._loadPartial(t)), this._partialCache[t]
        }, a.prototype.compileTokens = function(t, e) {
            var i = this;
            return function(n, s) {
                if (s)
                    if ("function" == typeof s) i._loadPartial = s;
                    else
                        for (var r in s) i.compilePartial(r, s[r]);
                return l(t, i, o.make(n), e)
            }
        }, a.prototype.render = function(t, e, i) {
            return this.compile(t)(e, i)
        }, t.name = "mustache.js", t.version = "0.7.2", t.tags = ["{{", "}}"], t.Scanner = r, t.Context = o, t.Writer = a, t.parse = d, t.escape = s;
        var C = new a;
        t.clearCache = function() {
            return C.clearCache()
        }, t.compile = function(t, e) {
            return C.compile(t, e)
        }, t.compilePartial = function(t, e, i) {
            return C.compilePartial(t, e, i)
        }, t.compileTokens = function(t, e) {
            return C.compileTokens(t, e)
        }, t.render = function(t, e, i) {
            return C.render(t, e, i)
        }, t.to_html = function(e, i, n, s) {
            var r = t.render(e, i, n);
            return "function" != typeof s ? r : (s(r), void 0)
        }
    }), $(document).ready(function() {
        function t() {
            var t = $(window).width(),
                e = .02777777778 * t;
            $("#all-projects-wrapper, #all-projects-header").css("margin-top", e), $("#projects").css("margin-bottom", e), $(".all-projects-filters, .all-projects-filters-placeholder").css("padding-top", e).css("padding-bottom", e)
        }

        function e() {
            l = $(window).scrollTop(), l > a ? ($(".all-projects-filters").addClass("sticky"), $(".all-projects-filters-placeholder").addClass("display")) : a - 65 > l && ($(".all-projects-filters").removeClass("sticky"), $(".all-projects-filters-placeholder").removeClass("display"))
        }

        function i(t) {
            var e = document.querySelector("#projects"),
                i = new Packery(e, {
                    gutter: ".gutter-sizer",
                    itemSelector: ".project",
                    stamp: ".stamp"
                });
            t && i.on("layoutComplete", function() {
                return t(), !0
            }), i.layout()
        }

        function n() {
            $("#projects").removeClass("information-shown"), $(".project").removeClass("active stamp"), $(".project.information").remove(), i()
        }

        function s() {
            new Date - c < h ? setTimeout(s, h) : (u = !1, $("body.all-projects").removeClass("resizing"))
        }

        function r() {
            if ($("html").hasClass("touch")) var t = $(".project.active").offset().top - 200;
            else var t = $(".project.active").offset().top - 120;
            $("html, body").animate({
                scrollTop: t
            }, 600, function() {
                $(".project.information.hidden").removeClass("hidden")
            })
        }
        var o, a, l, c = new Date(1, 1, 2e3, 12),
            u = !1,
            h = 200;
        $("body.all-projects").length > 0 && (o = $(".all-projects-filters").offset(), a = o.top, l = $(window).scrollTop(), $("#all-projects-wrapper").imagesLoaded(function() {
            var t = this,
                e = document.querySelector("#projects"),
                i = new Packery(e, {
                    gutter: ".gutter-sizer",
                    itemSelector: ".project"
                });
            $("#all-projects-wrapper, .all-projects-filters").removeClass("loading"), i.on("layoutComplete", function() {
                $(t).find("img").css("opacity", "1")
            }), i.layout()
        }), $("html, body").bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(t) {
            (t.which > 0 || "mousedown" === t.type || "mousewheel" === t.type) && $("html, body").stop()
        }), $("#projects").on("click", "li.project:not(.information)", function() {
            var t = this;
            $(this).hasClass("active") ? n() : ($("#projects").addClass("information-shown"), $(".project").removeClass("active"), $(".project.information").remove(), $(this).addClass("active stamp"), $.get("/projects/" + $(this).data("project-id") + ".html", function(e) {
                $(t).after(e), i(r)
            }, "html"))
        }).on("click", "li.project.information", function(t) {
            t.target == t.currentTarget && n()
        }), $("#all-projects-wrapper").bind("click", function(t) {
            $("html").hasClass("no-touch") && (t.target == t.currentTarget || t.target == document.getElementById("projects")) && $(".project.information").length > 0 && n()
        }), $(".all-projects-filters select").bind("change", function() {
            var t = this,
                e = $(".all-projects-filters").data("change"),
                s = $(t).val(),
                r = "none" == s || "all" == s ? [] : [s];
            n(), e && ($(".all-projects-filters select").each(function() {
                if (this != t && "none" != $(this).val() || this == t && "all" == $(this).val()) {
                    var e = $(this).data("selectBox-selectBoxIt");
                    $(".all-projects-filters").data("change", !1), e.selectOption(0)
                }
            }), $("li.project").each(function() {
                var t = !1,
                    e = this;
                $.each(r, function(i, n) {
                    $(e).hasClass(n) || (t = !0)
                }), t ? $(e).addClass("hidden") : $(e).removeClass("hidden")
            }), $("#projects li.project.hidden").appendTo("#hidden-projects"), $("#hidden-projects li.project:not(.hidden)").appendTo("#projects"), "none" != s && "all" != s ? ($("#all-projects-header .meta span").text($("#projects li.project").length + " projects"), $("#all-projects-header h2").text($(this).find("option:selected").first().text()), $("#all-projects-header .meta strong").text($(this).find("option:first").text()), $("#all-projects-header").slideDown()) : $("#all-projects-header").slideUp(), i()), e || $(".all-projects-filters").data("change", !0)
        }), $(window).resize(function() {
            $("html").hasClass("no-touch") && (c = new Date, u === !1 && (u = !0, setTimeout(s, h)), $("body.all-projects").addClass("resizing"), $(".project.active").click())
        }), $(window).scroll(function() {
            e()
        }), $(".all-projects-filters select").selectBoxIt({}), t(), e(), $(".all-projects-filters select").first().change())
    }), $(function() {
        function t() {
            var t = $("#detail-video").height(),
                e = $(window).scrollTop();
            e > t ? $("#detail-video iframe").css("display", "none") : $("#detail-video iframe").css("display", "block")
        }

        function e() {
            var t = $("#exploded-view .basement img").height(),
                e = t / 3;
            $("#exploded-view > div.floor:not(.is_stuck)").each(function() {
                if (!$(this).is(":last-child") && $(this).offset().top - $(window).scrollTop() < e) {
                    var t = ($(window).scrollTop() + e - $(this).offset().top) / e,
                        i = $(this).prevAll(".is_stuck:first"),
                        n = 1 - t;
                    0 > n && (n = 0), i.length > 0 && !i.hasClass("always-visible") && !i.hasClass("hide") ? i.css("opacity", n) : $(this).hasClass("hide") && $(this).css("opacity", n)
                }
            }), $("#exploded-view > div.ghost:not(.floor)").each(function() {
                $(this).offset().top > $(window).scrollTop() && ($(this).prev().removeClass("is_stuck"), $(this).prevAll(".hidden_view:first").removeClass("hidden_view"), $(this).remove())
            }), 3 == $("#exploded-view > div.hidden_view").length && $("#exploded-view > div").last().offset().top > $(window).scrollTop() && $("#exploded-view > div").last().prevAll(".hidden_view:first").removeClass("hidden_view"), $("#exploded-view > div.floor:not(.is_stuck)").each(function() {
                if (!$(this).is(":last-child") && $(this).offset().top - $(window).scrollTop() < e) {
                    var t = ($(window).scrollTop() + e - $(this).offset().top) / e,
                        i = $(this).prevAll(".is_stuck:first"),
                        n = 1 - t;
                    0 > n && (n = 0), i.length > 0 && !i.hasClass("always-visible") && !i.hasClass("hide") ? i.css("opacity", n) : $(this).hasClass("hide") && $(this).css("opacity", n)
                }
                if ($(this).offset().top < $(window).scrollTop() && $(this).is(":last-child") ? ($("#full-basement").css("display", "none"), $("#basement-alternative").css("display", "block"), $(".always-visible").css("opacity", 0)) : $(this).is(":last-child") && ($("#full-basement").css("display", "block"), $("#basement-alternative").css("display", "none"), $(".always-visible").css("opacity", 1)), $(this).offset().top < $(window).scrollTop()) {
                    if (!$(this).is(":last-child")) {
                        var s = $(this).height(),
                            r = $(this).width();
                        $(this).addClass("is_stuck"), $(this).next().hasClass("floor") && $(this).after('<div class="ghost" style="width: ' + r + "px; height: " + s + 'px; display: block; float: none; opacity: 0"></div>')
                    }
                    $(this).prevAll(".is_stuck").addClass("hidden_view")
                }
            })
        }

        function i() {
            var t = $("#exploded-view .basement img").height();
            $("#exploded-view-caption").css("margin-top", -1 * t + "px"), $("#exploded-view-caption").css("padding-top", 2 / 3 * t + "px")
        }
        $("#exploded-view").length > 0 && ($(window).resize(function() {
            i()
        }), $(window).scroll(function() {
            t(), $("html").hasClass("no-touch") && e()
        }), $("html").hasClass("no-touch") && setTimeout(function() {
            e(), i()
        }, 1e3))
    }), $(function() {
        function t() {
            i = $(window).height(), $(".slides-wrapper").height(i)
        }

        function e() {
            $(".slidesjs-pagination").each(function() {
                $(this).css("margin-left", -($(this).width() / 2))
            })
        }
        var i;
        $(".slides-wrapper").length > 0 && (t(), $(window).resize(function() {
            t()
        })), $(".slides.compass").slidesjs({
            width: 2500,
            height: 600
        }), $(window).width() < 480 ? $(".slides.mood").slidesjs({
            width: 200,
            height: 100
        }) : $(".slides.mood").slidesjs({
            width: 200,
            height: 100,
            navigation: {
                effect: "fade"
            },
            pagination: {
                effect: "fade"
            },
            effect: {
                fade: {
                    speed: 500
                }
            }
        });
        var n;
        $(".slides").bind("click", function(t) {
            t || (t = window.event), t.target ? n = t.target : t.srcElement && (n = t.srcElement), $(n).is("a") || $(this).find(".slidesjs-next").click()
        }), $(".slides-wrapper a").bind("click", function() {
            var t = $(this).closest(".slides-wrapper"),
                e = t.offset(),
                i = e.top;
            $("html, body").animate({
                scrollTop: i
            }, {
                easing: "swing",
                duration: 400
            })
        }), $(".slides-wrapper").length > 0 && $("html, body").bind("scroll DOMMouseScroll mousewheel keyup", function(t) {
            (t.which > 0 || "mousedown" === t.type || "mousewheel" === t.type) && $("html, body").stop()
        }), $(".slides-container").length > 0 && (e(), setTimeout(e, 250), setTimeout(e, 2e3), $("#detail-main").imagesLoaded(function() {
            e()
        }))
    });
var player, originalRatio, originalEmbedRatio, originalConclusionRatio, video, embedVideo, conclusionVideo, animationOffset, BCL = {};
if (BCL.onTemplateLoad = function(t) {
        BCL.player = brightcove.getExperience(t), BCL.experienceModule = BCL.player.getModule(APIModules.EXPERIENCE), BCL.experienceModule.addEventListener(BCExperienceEvent.TEMPLATE_READY, BCL.onTemplateReady)
    }, BCL.onTemplateReady = function() {
        setTimeout(function() {
            video = $("#home-video object, #detail-video object").first(), originalRatio = video.height() / video.width(), resizeTopVideo()
        }, 10), $(window).resize(function() {
            resizeTopVideo()
        }), BCL.experienceModule.removeEventListener(BCExperienceEvent.TEMPLATE_READY, BCL.onTemplateReady), BCL.videoPlayer = BCL.player.getModule(APIModules.VIDEO_PLAYER), BCL.videoPlayer.addEventListener(BCMediaEvent.PROGRESS, BCL.onMediaProgress), BCL.videoPlayer.addEventListener(BCMediaEvent.COMPLETE, BCL.onMediaComplete)
    }, BCL.onMediaProgress = function(t) {
        t.duration - t.position < .25 && (BCL.videoPlayer.seek(0), BCL.videoPlayer.play())
    }, BCL.onMediaComplete = function() {
        BCL.videoPlayer.play()
    }, BCL.onTemplateLoadEmbed = function(t) {
        BCL.playerEmbed = brightcove.getExperience(t), BCL.experienceModule = BCL.playerEmbed.getModule(APIModules.EXPERIENCE), BCL.experienceModule.addEventListener(BCExperienceEvent.TEMPLATE_READY, BCL.onTemplateReadyEmbed)
    }, BCL.onTemplateReadyEmbed = function() {
        setTimeout(function() {
            embedVideo = $(".video-embed.no-interaction object").first(), originalEmbedRatio = embedVideo.width() / embedVideo.height(), resizeEmbedVideo()
        }, 10), $(window).resize(function() {
            resizeEmbedVideo()
        }), BCL.experienceModule.removeEventListener(BCExperienceEvent.TEMPLATE_READY, BCL.onTemplateReadyEmbed), BCL.videoPlayerEmbed = BCL.playerEmbed.getModule(APIModules.VIDEO_PLAYER), BCL.videoPlayerEmbed.addEventListener(BCMediaEvent.PROGRESS, BCL.onMediaProgressEmbed), BCL.videoPlayerEmbed.addEventListener(BCMediaEvent.COMPLETE, BCL.onMediaCompleteEmbed)
    }, BCL.onMediaProgressEmbed = function(t) {
        t.position > t.duration - .1 && (BCL.videoPlayerEmbed.seek(0), BCL.videoPlayerEmbed.play())
    }, BCL.onMediaCompleteEmbed = function() {
        BCL.videoPlayerEmbed.play()
    }, BCL.onTemplateLoadConclusion = function(t) {
        BCL.playerEmbed = brightcove.getExperience(t), BCL.experienceModule = BCL.playerEmbed.getModule(APIModules.EXPERIENCE), BCL.experienceModule.addEventListener(BCExperienceEvent.TEMPLATE_READY, BCL.onTemplateReadyEmbed)
    }, BCL.onTemplateReadyConclusion = function() {
        setTimeout(function() {
            conclusionVideo = $(".video-embed:not(.no-interaction) object").first(), originalConclusionRatio = conclusionVideo.width() / conclusionVideo.height(), resizeConclusionVideo()
        }, 10), $(window).resize(function() {
            resizeConclusionVideo()
        }), BCL.experienceModule.removeEventListener(BCExperienceEvent.TEMPLATE_READY, BCL.onTemplateReadyEmbed)
    }, $(function() {
        if ($.cookie("pwhcountry2014")) loadVideoHtml();
        else try {
            geoip2.country(function(t) {
                country = t.country.iso_code ? t.country.iso_code : guessCountry(), setCountryCookie(country), loadVideoHtml()
            }, function() {
                country = guessCountry(), setCountryCookie(country), loadVideoHtml()
            }, {
                w3cGeolocationDisabled: $("body").hasClass("dev") ? !1 : !0
            })
        } catch (t) {
            country = guessCountry(), setCountryCookie(country), loadVideoHtml()
        }
        $("#detail-video").length > 0 && ($(window).resize(function() {
            mainPositioning(), hideDetailTopvideo(), scrollFading()
        }), $(document).scroll(function() {
            scrollFading(), hideDetailTopvideo()
        }), mainPositioning(), hideDetailTopvideo(), scrollFading()), $(".video-embed").length > 0 && ($(".video-embed").each(function() {
            var t, e = $.cookie("pwhcountry2014"),
                i = this;
            "CN" == e ? $.getScript("http://admin.brightcove.com/js/BrightcoveExperiences.js", function() {
                t = $(i).hasClass("no-interaction") ? $("#video-cn-embed").html() : $("#video-cn-conclusion").html(), $(i).html(Mustache.render(t, {
                    key: $(i).data("cn-key"),
                    id: $(i).data("cn-id"),
                    player: $(i).data("cn-player")
                })), brightcove.createExperiences()
            }) : (t = $(this).hasClass("no-interaction") ? $("#video-embed-auto").html() : $("#video-embed").html(), $(this).html(Mustache.render(t, {
                vimeo_id: $(this).data("vimeo-id")
            })))
        }), $(".video-embed").fitVids()), $(".title .down").click(function(t) {
            animationOffset = $(window).width() > 1025 ? 54 : 44, $("html, body").animate({
                scrollTop: $("#detail-video").height() - $("#detail-main .title").height()
            }, {
                easing: "swing",
                duration: 600
            }), t.preventDefault()
        })
    }), $(function() {
        function t() {
            $("footer").css("margin-top", $("#home-projects ul").height())
        }($("body.home").length > 0 || $("body.detail").length > 0) && $("body").imagesLoaded(function() {
            $("#curtains").delay(500).fadeOut("750", function() {
                $("#curtains").remove()
            })
        });
        var e, i, n = 600,
            s = "swing",
            r = !0;
        $("#home-video a").click(function(t) {
            i = $(window).width() > 1025 ? 54 : 44, r = !1, $("#home-projects ul").addClass("no-hover"), $("html, body").animate({
                scrollTop: $("#home-video").height() - i
            }, {
                easing: s,
                duration: n,
                complete: function() {
                    r = !0, $("#home-projects ul").removeClass("no-hover"), $("#home-projects .backgrounds div").removeClass("active"), $("#home-projects .backgrounds div." + e).addClass("active")
                }
            }), t.preventDefault()
        }), $("html").hasClass("no-touch") && $("#home-projects ul li a").hover(function() {
            if (e = $(this).attr("class"), r) {
                var t = $(this).attr("class");
                $("#home-projects .backgrounds div").removeClass("active"), $("#home-projects .backgrounds div." + t).addClass("active")
            }
        }, function() {}), $("body.home").length > 0 && ($(window).resize(function() {
            t()
        }), $(window).scroll(function() {
            t()
        }), t())
    }), ($("body.home").length > 0 || $("body.detail").length > 0) && (navPositioning(), $(window).scroll(function() {
        navPositioning()
    })), $("body.all-projects, body#ouvertures").length > 0) {
    var lastScrollTop = 0;
    $(window).scroll(function() {
        $("body").removeClass("top");
        var t = $(this).scrollTop();
        65 > t && $("body").addClass("top"), t > lastScrollTop ? 1 > t ? ($("body").removeClass("nav-hidden"), $("nav.scroll").addClass("temporary-visible"), $(".all-projects-filters").addClass("scroll")) : ($("body").addClass("nav-hidden"), $("nav.scroll").removeClass("temporary-visible"), $(".all-projects-filters").removeClass("scroll"), $(".toc.scroll").removeClass("visible")) : ($(".toc.scroll").addClass("visible"), t > $("nav").height() && $(window).scrollTop() + $(window).height() < $(document).height() && ($("body").removeClass("nav-hidden"), $("nav.scroll").addClass("temporary-visible"), $(".all-projects-filters").addClass("scroll"))), lastScrollTop = t
    })
}
$("nav h2 a").click(function(t) {
    var e = 600,
        i = "swing";
    $("html, body").animate({
        scrollTop: 0
    }, {
        easing: i,
        duration: e
    }), t.preventDefault()
}), $(document).ready(function() {
    checkNavigationType(), $(window).resize(function() {
        checkNavigationType(), declareEventHandlers()
    }), declareEventHandlers()
});
var footnoteIndex, footnoteOffset, footnoteOffsetTop, TOCOffset, TOCOffsetX, scrollOffset;
$("body#ouvertures").length > 0 && (TOCOffset = $(".toc").offset(), TOCOffsetX = TOCOffset.top, scrollOffset = $(window).scrollTop());
var imageIntroVisible = !1;
$("body#ouvertures").length > 0 && ($("ol a").click(function(t) {
        var e = $(this).attr("href"),
            i = 600,
            n = "swing",
            s = $("section" + e).offset().top - $("nav").height() + 62;
        $(".toc.scroll").hasClass("visible") && (s = s - 62 - $(".toc.scroll").height()), $("html, body").animate({
            scrollTop: s
        }, {
            easing: n,
            duration: i
        }), t.preventDefault()
    }), checkImageIntroHeight(), updateFootnotePosition(), checkTOCPosition(), $(window).resize(function() {
        checkImageIntroHeight(), updateFootnotePosition(), checkTOCPosition()
    }), $(window).scroll(function() {
        checkTOCPosition(), updateFootnotePosition()
    })), $(function() {
        function t() {
            var t = document.getElementsByTagName("svg")[0],
                e = $(window).width(),
                i = $("#svg").data("original-width"),
                n = $("#svg").data("original-height"),
                s = i / n;
            t && (t.setAttribute("width", Math.floor(.8 * e) + "px"), t.setAttribute("height", Math.floor(.8 * e) / s + "px"))
        }

        function e() {
            var e = 0;
            t(), $("#layer-two path").each(function() {
                var t = $(this).get(0),
                    i = t.getTotalLength() + 1,
                    n = .01 * Math.pow(i, .5);
                t.style.transition = t.style.WebkitTransition = "none", t.style.strokeDasharray = i + " " + i, t.style.strokeDashoffset = i, t.getBoundingClientRect(), t.style.transition = t.style.WebkitTransition = "stroke-dashoffset " + n + "s " + e + "s ease-in-out", t.style.strokeDashoffset = "0", e = e + n + .05
            })
        }
        if ($("#layer-two path").length > 0) {
            var i = 0;
            $(window).scroll(function() {
                var t = $(window).scrollTop(),
                    n = $("#svg").offset(),
                    s = n.top;
                t > s - 400 && 0 === i && ($("#layer-two path").css("display", "block"), e(), i = 1)
            })
        }
        $(window).resize(function() {
            t()
        })
    }), $(document).ready(function() {
        var t = 0,
            e = 0,
            i = !1;
        $(".floors .magnify").imagesLoaded(function() {
            $(".floors .magnify").each(function() {
                $(this).height($(".magnify").first().find("img").first().height())
            })
        }), $("html").hasClass("no-touch") && $(".magnify").mousemove(function(n) {
            var s = $(this).find("img.small").first(),
                r = $(this).find(".large").first();
            if (t || e || i) {
                if (i) {
                    var o = $(this).offset(),
                        a = n.pageX - o.left,
                        l = n.pageY - o.top;
                    if (a < $(this).width() && l < $(this).height() && a > 0 && l > 0 ? r.fadeIn(100) : r.fadeOut(100), r.is(":visible")) {
                        var c = -1 * Math.round(a / s.width() * t - r.width() / 2),
                            u = -1 * Math.round(l / s.height() * e - r.height() / 2),
                            h = c + "px " + u + "px",
                            d = a - r.width() / 2,
                            p = l - r.height() / 2;
                        r.css({
                            left: d,
                            top: p,
                            backgroundPosition: h
                        })
                    }
                }
            } else {
                var f = new Image;
                f.onload = function() {
                    t = f.width, e = f.height, i = !0
                }, f.src = s.attr("src")
            }
        })
    }),
    function() {
        window.ActiveAdmin = {}, window.AA || (window.AA = window.ActiveAdmin)
    }.call(this),
    function() {
        $(function() {
            return $("#batch_actions_selector li a").click(function(t) {
                var e, i = this;
                return t.stopPropagation(), (e = $(this).data("confirm")) ? ActiveAdmin.modal_dialog(e, $(this).data("inputs"), function(t) {
                    return $(i).trigger("confirm:complete", t)
                }) : $(this).trigger("confirm:complete")
            }), $("#batch_actions_selector li a").on("confirm:complete", function(t, e) {
                var i;
                return (i = JSON.stringify(e)) ? $("#batch_action_inputs").val(i) : $("#batch_action_inputs").attr("disabled", "disabled"), $("#batch_action").val($(this).data("action")), $("#collection_selection").submit()
            }), $("#batch_actions_selector").length && $(":checkbox.toggle_all").length ? ($(".paginated_collection table.index_table").length ? $(".paginated_collection table.index_table").tableCheckboxToggler() : $(".paginated_collection").checkboxToggler(), $(document).on("change", ".paginated_collection :checkbox", function() {
                return $(".paginated_collection :checkbox:checked").length ? $("#batch_actions_selector").aaDropdownMenu("enable") : $("#batch_actions_selector").aaDropdownMenu("disable")
            })) : void 0
        })
    }.call(this),
    function() {
        ActiveAdmin.CheckboxToggler = function() {
            function t(t, e) {
                var i;
                this.options = t, this.container = e, i = {}, this.options = $.extend(i, t), this._init(), this._bind()
            }
            return t.prototype._init = function() {
                if (!this.container) throw new Error("Container element not found");
                if (this.$container = $(this.container), !this.$container.find(".toggle_all").length) throw new Error('"toggle all" checkbox not found');
                return this.toggle_all_checkbox = this.$container.find(".toggle_all"), this.checkboxes = this.$container.find(":checkbox").not(this.toggle_all_checkbox)
            }, t.prototype._bind = function() {
                var t = this;
                return this.checkboxes.change(function(e) {
                    return t._didChangeCheckbox(e.target)
                }), this.toggle_all_checkbox.change(function() {
                    return t._didChangeToggleAllCheckbox()
                })
            }, t.prototype._didChangeCheckbox = function() {
                switch (this.checkboxes.filter(":checked").length) {
                    case this.checkboxes.length - 1:
                        return this.toggle_all_checkbox.prop({
                            checked: null
                        });
                    case this.checkboxes.length:
                        return this.toggle_all_checkbox.prop({
                            checked: !0
                        })
                }
            }, t.prototype._didChangeToggleAllCheckbox = function() {
                var t, e = this;
                return t = this.toggle_all_checkbox.prop("checked") ? !0 : null, this.checkboxes.each(function(i, n) {
                    return $(n).prop({
                        checked: t
                    }), e._didChangeCheckbox(n)
                })
            }, t
        }(), $.widget.bridge("checkboxToggler", ActiveAdmin.CheckboxToggler)
    }.call(this),
    function() {
        ActiveAdmin.DropdownMenu = function() {
            function t(t, e) {
                var i;
                this.options = t, this.element = e, this.$element = $(this.element), i = {
                    fadeInDuration: 20,
                    fadeOutDuration: 100,
                    onClickActionItemCallback: null
                }, this.options = $.extend(i, t), this.isOpen = !1, this.$menuButton = this.$element.find(".dropdown_menu_button"), this.$menuList = this.$element.find(".dropdown_menu_list_wrapper"), this._buildMenuList(), this._bind()
            }
            return t.prototype.open = function() {
                return this.isOpen = !0, this.$menuList.fadeIn(this.options.fadeInDuration), this._positionMenuList(), this._positionNipple(), this
            }, t.prototype.close = function() {
                return this.isOpen = !1, this.$menuList.fadeOut(this.options.fadeOutDuration), this
            }, t.prototype.destroy = function() {
                return this.$element.unbind(), this.$element = null, this
            }, t.prototype.isDisabled = function() {
                return this.$menuButton.hasClass("disabled")
            }, t.prototype.disable = function() {
                return this.$menuButton.addClass("disabled")
            }, t.prototype.enable = function() {
                return this.$menuButton.removeClass("disabled")
            }, t.prototype.option = function(t, e) {
                return $.isPlainObject(t) ? this.options = $.extend(!0, this.options, t) : null != t ? this.options[t] : this.options[t] = e
            }, t.prototype._buildMenuList = function() {
                return this.$nipple = $('<div class="dropdown_menu_nipple"></div>'), this.$menuList.prepend(this.$nipple), this.$menuList.hide()
            }, t.prototype._bind = function() {
                var t = this;
                return $("body").click(function() {
                    return t.isOpen ? t.close() : void 0
                }), this.$menuButton.click(function(e) {
                    return e.stopPropagation(), t.isDisabled() ? void 0 : t.isOpen ? t.close() : t.open()
                })
            }, t.prototype._positionMenuList = function() {
                var t, e;
                return t = this.$menuButton.position().left + this.$menuButton.outerWidth() / 2, e = this.$menuList.outerWidth() / 2, this.$menuList.css("left", t - e)
            }, t.prototype._positionNipple = function() {
                return this.$menuList.css("top", this.$menuButton.position().top + this.$menuButton.outerHeight() + 10), this.$nipple.css("left", this.$menuList.outerWidth() / 2 - this.$nipple.outerWidth() / 2)
            }, t
        }(), $.widget.bridge("aaDropdownMenu", ActiveAdmin.DropdownMenu), $(function() {
            return $(".dropdown_menu").aaDropdownMenu()
        })
    }.call(this),
    function() {
        var t, e;
        $(function() {
            return $(document).on("click", "a.button.has_many_remove", function(t) {
                var i, n;
                return t.preventDefault(), i = $(this).closest(".has_many_container"), n = $(this).closest("fieldset"), e(i), i.trigger("has_many_remove:before", [n]), n.remove()
            }), $(document).on("click", "a.button.has_many_add", function(t) {
                var i, n, s, r, o, a, l;
                return t.preventDefault(), n = $(this), a = n.closest(".has_many_container"), a.trigger(i = $.Event("has_many_add:before")), i.isDefaultPrevented() ? void 0 : (o = a.data("has_many_index") || a.children("fieldset").length - 1, a.data({
                    has_many_index: ++o
                }), l = new RegExp(n.data("placeholder"), "g"), r = n.data("html").replace(l, o), s = $(r).insertBefore(this), e(a), a.trigger("has_many_add:after", [s]))
            }), $(document).on("change", '.has_many_container[data-sortable] :input[name$="[_destroy]"]', function() {
                return e($(this).closest(".has_many"))
            }), t(), $(document).on("has_many_add:after", ".has_many_container", t)
        }), t = function() {
            var t;
            return t = $(".has_many_container[data-sortable]:not(.ui-sortable)"), t.sortable({
                items: "> fieldset",
                handle: "> ol > .handle",
                stop: e
            }), t.each(e)
        }, e = function(t) {
            var e, i;
            return t = t instanceof jQuery ? t : $(this), e = t.data("sortable"), i = 0, t.children("fieldset").each(function() {
                var t, n, s;
                return n = $(this), t = n.find("> ol > .input > :input[name$='[_destroy]']"), s = n.find("> ol > .input > :input[name$='[" + e + "]']"), s.length ? s.val(t.is(":checked") ? "" : i++) : void 0
            })
        }
    }.call(this),
    function() {
        ActiveAdmin.modal_dialog = function(t, e, i) {
            var n, s, r, o, a, l, c, u, h, d;
            s = '<form id="dialog_confirm" title="' + t + '"><ul>';
            for (o in e) {
                if (l = e[o], /^(datepicker|checkbox|text)$/.test(l)) u = "input";
                else if ("textarea" === l) u = "textarea";
                else {
                    if (!$.isArray(l)) throw new Error("Unsupported input type: {" + o + ": " + l + "}");
                    h = ["select", "option", l, ""], u = h[0], n = h[1], a = h[2], l = h[3]
                }
                r = "datepicker" === l ? l : "", s += "<li>\n<label>" + (o.charAt(0).toUpperCase() + o.slice(1)) + "</label>\n<" + u + ' name="' + o + '" class="' + r + '" type="' + l + '">' + (a ? function() {
                    var t, e, i;
                    for (i = [], t = 0, e = a.length; e > t; t++) c = a[t], i.push("<" + n + ">" + c + "</" + n + ">");
                    return i
                }().join("") : "") + ("</" + u + ">") + "</li>", d = [], u = d[0], n = d[1], a = d[2], l = d[3], r = d[4]
            }
            return s += "</ul></form>", $(s).appendTo("body").dialog({
                modal: !0,
                buttons: {
                    OK: function() {
                        return i($(this).serializeObject()), $(this).dialog("close")
                    },
                    Cancel: function() {
                        return $(this).dialog("close").remove()
                    }
                }
            })
        }
    }.call(this),
    function() {
        ActiveAdmin.Popover = function() {
            function t(t, e) {
                var i;
                this.options = t, this.element = e, this.$element = $(this.element), i = {
                    fadeInDuration: 20,
                    fadeOutDuration: 100,
                    autoOpen: !0,
                    pageWrapperElement: "#wrapper",
                    onClickActionItemCallback: null
                }, this.options = $.extend(i, t), this.isOpen = !1, (this.$popover = $(this.$element.attr("href"))).length || (this.$popover = this.$element.next(".popover")), this._buildPopover(), this._bind()
            }
            return t.prototype.open = function() {
                return this.isOpen = !0, this.$popover.fadeIn(this.options.fadeInDuration), this._positionPopover(), this._positionNipple(), this
            }, t.prototype.close = function() {
                return this.isOpen = !1, this.$popover.fadeOut(this.options.fadeOutDuration), this
            }, t.prototype.destroy = function() {
                return this.$element.removeData("popover"), this.$element.unbind(), this.$element = null, this
            }, t.prototype._buildPopover = function() {
                return this.$nipple = $('<div class="popover_nipple"></div>'), this.$popover.prepend(this.$nipple), this.$popover.hide(), this.$popover.addClass("popover")
            }, t.prototype._bind = function() {
                var t = this;
                return $(this.options.pageWrapperElement).click(function() {
                    return t.isOpen ? t.close() : void 0
                }), this.options.autoOpen ? this.$element.click(function(e) {
                    return e.stopPropagation(), t.isOpen ? t.close() : t.open()
                }) : void 0
            }, t.prototype._positionPopover = function() {
                var t, e;
                return t = this.$element.offset().left + this.$element.outerWidth() / 2, e = this.$popover.outerWidth() / 2, this.$popover.css("left", t - e)
            }, t.prototype._positionNipple = function() {
                return this.$popover.css("top", this.$element.offset().top + this.$element.outerHeight() + 10), this.$nipple.css("left", this.$popover.outerWidth() / 2 - this.$nipple.outerWidth() / 2)
            }, t
        }(), $.widget.bridge("popover", ActiveAdmin.Popover)
    }.call(this),
    function() {
        var t, e = {}.hasOwnProperty,
            i = function(t, i) {
                function n() {
                    this.constructor = t
                }
                for (var s in i) e.call(i, s) && (t[s] = i[s]);
                return n.prototype = i.prototype, t.prototype = new n, t.__super__ = i.prototype, t
            };
        ActiveAdmin.TableCheckboxToggler = function(e) {
            function n() {
                return t = n.__super__.constructor.apply(this, arguments)
            }
            return i(n, e), n.prototype._init = function() {
                return n.__super__._init.apply(this, arguments)
            }, n.prototype._bind = function() {
                var t = this;
                return n.__super__._bind.apply(this, arguments), this.$container.find("tbody td").click(function(e) {
                    return "checkbox" !== e.target.type ? t._didClickCell(e.target) : void 0
                })
            }, n.prototype._didChangeCheckbox = function(t) {
                var e;
                return n.__super__._didChangeCheckbox.apply(this, arguments), e = $(t).parents("tr"), t.checked ? e.addClass("selected") : e.removeClass("selected")
            }, n.prototype._didClickCell = function(t) {
                return $(t).parent("tr").find(":checkbox").click()
            }, n
        }(ActiveAdmin.CheckboxToggler), $.widget.bridge("tableCheckboxToggler", ActiveAdmin.TableCheckboxToggler)
    }.call(this),
    function() {
        $.ui.dialog.prototype._focusTabbable = function() {
            return this.uiDialog.focus()
        }
    }.call(this),
    function() {
        $.fn.serializeObject = function() {
            var t, e, i, n, s;
            for (e = {}, s = this.serializeArray(), i = 0, n = s.length; n > i; i++) t = s[i], e[t.name] = t.value;
            return e
        }
    }.call(this),
    function() {
        $(function() {
            return $(document).on("focus", ".datepicker:not(.hasDatepicker)", function() {
                var t, e;
                return t = {
                    dateFormat: "yy-mm-dd"
                }, e = $(this).data("datepicker-options"), $(this).datepicker($.extend(t, e))
            }), $(".clear_filters_btn").click(function() {
                return window.location.search = ""
            }), $(".dropdown_button").popover(), $(".filter_form").submit(function() {
                return $(this).find(":input").filter(function() {
                    return "" === this.value
                }).prop("disabled", !0)
            }), $(".filter_form_field.select_and_search select").change(function() {
                return $(this).siblings("input").prop({
                    name: "q[" + this.value + "]"
                })
            })
        })
    }.call(this), $(function() {
        $(document).on("click", ".remove_fields", function(t) {
            $(this).closest("ul.nested-fields").hide(), $(this).parent().parent().find(".destroy input").val("1"), t.preventDefault()
        }), $(".add_fields").bind("click", function(t) {
            var e = (new Date).getTime(),
                i = new RegExp($(this).data("id"), "g");
            $(this).parent().before($(this).data("fields").replace(i, e)), t.preventDefault()
        })
    }), $("html").removeClass("no-js"), window.Mercury = {
        config: {
            toolbars: {
                primary: {
                    save: ["Save", "Save this page"],
                    preview: ["Preview", "Preview this page", {
                        toggle: !0,
                        mode: !0
                    }],
                    sep1: " ",
                    undoredo: {
                        undo: ["Undo", "Undo your last action"],
                        redo: ["Redo", "Redo your last action"],
                        sep: " "
                    },
                    insertLink: ["Link", "Insert Link", {
                        modal: "/mercury/modals/link.html",
                        regions: ["full", "markdown"]
                    }],
                    insertMedia: ["Media", "Insert Media (images and videos)", {
                        modal: "/mercury/modals/media.html",
                        regions: ["full", "markdown"]
                    }],
                    insertTable: ["Table", "Insert Table", {
                        modal: "/mercury/modals/table.html",
                        regions: ["full", "markdown"]
                    }],
                    insertCharacter: ["Character", "Special Characters", {
                        modal: "/mercury/modals/character.html",
                        regions: ["full", "markdown"]
                    }]
                },
                editable: {
                    _regions: ["full", "markdown"],
                    predefined: {
                        style: ["Style", null, {
                            select: "/mercury/selects/style.html",
                            preload: !0
                        }],
                        sep1: " ",
                        formatblock: ["Block Format", null, {
                            select: "/mercury/selects/formatblock.html",
                            preload: !0
                        }],
                        sep2: "-"
                    },
                    colors: {
                        backColor: ["Background Color", null, {
                            palette: "/mercury/palettes/backcolor.html",
                            context: !0,
                            preload: !0,
                            regions: ["full"]
                        }],
                        sep1: " ",
                        foreColor: ["Text Color", null, {
                            palette: "/mercury/palettes/forecolor.html",
                            context: !0,
                            preload: !0,
                            regions: ["full"]
                        }],
                        sep2: "-"
                    },
                    decoration: {
                        bold: ["Bold", null, {
                            context: !0
                        }],
                        italic: ["Italicize", null, {
                            context: !0
                        }],
                        overline: ["Overline", null, {
                            context: !0,
                            regions: ["full"]
                        }],
                        strikethrough: ["Strikethrough", null, {
                            context: !0,
                            regions: ["full"]
                        }],
                        underline: ["Underline", null, {
                            context: !0,
                            regions: ["full"]
                        }],
                        sep: "-"
                    },
                    script: {
                        subscript: ["Subscript", null, {
                            context: !0
                        }],
                        superscript: ["Superscript", null, {
                            context: !0
                        }],
                        sep: "-"
                    },
                    justify: {
                        justifyLeft: ["Align Left", null, {
                            context: !0,
                            regions: ["full"]
                        }],
                        justifyCenter: ["Center", null, {
                            context: !0,
                            regions: ["full"]
                        }],
                        justifyRight: ["Align Right", null, {
                            context: !0,
                            regions: ["full"]
                        }],
                        justifyFull: ["Justify Full", null, {
                            context: !0,
                            regions: ["full"]
                        }],
                        sep: "-"
                    },
                    list: {
                        insertUnorderedList: ["Unordered List", null, {
                            context: !0
                        }],
                        insertOrderedList: ["Numbered List", null, {
                            context: !0
                        }],
                        sep: "-"
                    },
                    indent: {
                        outdent: ["Decrease Indentation"],
                        indent: ["Increase Indentation"],
                        sep: "-"
                    },
                    table: {
                        _context: !0,
                        insertRowBefore: ["Insert Table Row", "Insert a table row before the cursor", {
                            regions: ["full"]
                        }],
                        insertRowAfter: ["Insert Table Row", "Insert a table row after the cursor", {
                            regions: ["full"]
                        }],
                        deleteRow: ["Delete Table Row", "Delete this table row", {
                            regions: ["full"]
                        }],
                        insertColumnBefore: ["Insert Table Column", "Insert a table column before the cursor", {
                            regions: ["full"]
                        }],
                        insertColumnAfter: ["Insert Table Column", "Insert a table column after the cursor", {
                            regions: ["full"]
                        }],
                        deleteColumn: ["Delete Table Column", "Delete this table column", {
                            regions: ["full"]
                        }],
                        sep1: " ",
                        increaseColspan: ["Increase Cell Columns", "Increase the cells colspan"],
                        decreaseColspan: ["Decrease Cell Columns", "Decrease the cells colspan and add a new cell"],
                        increaseRowspan: ["Increase Cell Rows", "Increase the cells rowspan"],
                        decreaseRowspan: ["Decrease Cell Rows", "Decrease the cells rowspan and add a new cell"],
                        sep2: "-"
                    },
                    rules: {
                        horizontalRule: ["Horizontal Rule", "Insert a horizontal rule"],
                        sep1: "-"
                    },
                    formatting: {
                        removeFormatting: ["Remove Formatting", "Remove formatting for the selection", {
                            regions: ["full"]
                        }],
                        sep2: " "
                    },
                    editors: {
                        htmlEditor: ["Edit HTML", "Edit the HTML content", {
                            regions: ["full"]
                        }]
                    }
                }
            },
            regions: {
                attribute: "data-mercury",
                identifier: "id",
                dataAttributes: []
            },
            snippets: {
                method: "POST",
                optionsUrl: "/mercury/snippets/:name/options.html",
                previewUrl: "/mercury/snippets/:name/preview.html"
            },
            uploading: {
                enabled: !0,
                allowedMimeTypes: ["image/jpeg", "image/gif", "image/png"],
                maxFileSize: 1235242880,
                inputName: "image[image]",
                url: "/mercury/images",
                handler: !1
            },
            localization: {
                enabled: !1,
                preferredLocale: "swedish_chef-BORK"
            },
            behaviors: {
                htmlEditor: function() {
                    Mercury.modal("/mercury/modals/htmleditor.html", {
                        title: "HTML Editor",
                        fullHeight: !0,
                        handler: "htmlEditor"
                    })
                }
            },
            globalBehaviors: {
                exit: function() {
                    window.location.href = this.iframeSrc()
                },
                barrelRoll: function() {
                    $("body").css({
                        webkitTransform: "rotate(360deg)"
                    })
                }
            },
            csrfSelector: 'meta[name="csrf-token"]',
            csrfHeader: "X-CSRF-Token",
            editorUrlRegEx: /([http|https]:\/\/.[^\/]*)\/editor\/?(.*)/i,
            nonHijackableClasses: [],
            pasting: {
                sanitize: "whitelist",
                whitelist: {
                    h1: [],
                    h2: [],
                    h3: [],
                    h4: [],
                    h5: [],
                    h6: [],
                    table: [],
                    thead: [],
                    tbody: [],
                    tfoot: [],
                    tr: [],
                    th: ["colspan", "rowspan"],
                    td: ["colspan", "rowspan"],
                    div: ["class"],
                    span: ["class"],
                    ul: [],
                    ol: [],
                    li: [],
                    b: [],
                    strong: [],
                    i: [],
                    em: [],
                    u: [],
                    strike: [],
                    br: [],
                    p: [],
                    hr: [],
                    a: ["href", "target", "title", "name"],
                    img: ["src", "title", "alt"]
                }
            },
            injectedStyles: '[data-mercury]       { min-height: 10px; outline: 1px dotted #09F } [data-mercury]:focus { outline: none; -webkit-box-shadow: 0 0 10px #09F, 0 0 1px #045; box-shadow: 0 0 10px #09F, 0 0 1px #045 }[data-mercury].focus { outline: none; -webkit-box-shadow: 0 0 10px #09F, 0 0 1px #045; box-shadow: 0 0 10px #09F, 0 0 1px #045 }[data-mercury]:after { content: "."; display: block; visibility: hidden; clear: both; height: 0; overflow: hidden; }[data-mercury] table { border: 1px dotted red; min-width: 6px; }[data-mercury] th    { border: 1px dotted red; min-width: 6px; }[data-mercury] td    { border: 1px dotted red; min-width: 6px; }[data-mercury] .mercury-textarea       { border: 0; box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; resize: none; }[data-mercury] .mercury-textarea:focus { outline: none; -webkit-box-shadow: none; -moz-box-shadow: none; box-shadow: none; }'
        },
        silent: !1,
        debug: !1
    }, $(window).bind("mercury:saved", function() {
        window.location = window.location.href.replace(/\/editor\//i, "/")
    }), ! function(t) {
        t.serializeObject = function(e) {
            var i = {},
                n = i,
                s = e;
            return t.each(s, function() {
                for (var t = this.name.replace(/\[([^\]]+)?\]/g, ",$1").split(","), e = t.length - 1, s = 0; e > s; s++) n.push ? (n[n.length - 1] && n[n.length - 1].constructor === Object && void 0 === n[n.length - 1][t[s + 1]] || n.push({}), n = n[n.length - 1]) : n = n[t[s]] = n[t[s]] || ("" == t[s + 1] ? [] : {});
                n.push ? n.push(this.value) : n[t[e]] = this.value, n = i
            }), i
        }, t.deserializeObject = function i(t, e, n) {
            var s, r, o, a;
            if (e = e || [], "[object Object]" === Object.prototype.toString.call(t)) {
                for (s in t)
                    if (o = n ? [n, "[", s, "]"].join("") : s, t.hasOwnProperty(s))
                        if (a = Object.prototype.toString.call(t[s]), "[object Array]" === a)
                            for (r = 0, jsonLen = t[s].length; jsonLen > r; r++) i(t[s][r], e, o + "[]");
                        else "[object Object]" === a ? i(t[s], e, o) : e.push({
                            name: o,
                            value: t[s]
                        })
            } else e.push({
                name: n,
                value: t
            });
            return e
        };
        var e = function() {
            var e = !!t.fn.prop;
            return function(t, i) {
                e ? t.prop("checked", i) : t.attr("checked", i ? "checked" : null)
            }
        }();
        t.applySerializedArray = function(i, n) {
            var s, r = t(i).find("input,select,textarea");
            e(r.filter(":checked"), !1);
            for (var o = n.length; o--;) s = r.filter("[name='" + n[o].name + "']"), s.filter(":checkbox").length ? s.val() == n[o].value && e(s.filter(":checkbox"), !0) : s.filter(":radio").length ? e(s.filter("[value='" + n[o].value + "']"), !0) : s.val(n[o].value)
        }, t.applySerializedObject = function(e, i) {
            t.applySerializedArray(e, t.deserializeObject(i))
        }, t.fn.serializeObject = t.fn.serializeObject || function() {
            return t.serializeObject(this.serializeArray())
        }, t.fn.applySerializedObject = function(e) {
            return t.applySerializedObject(this, e), this
        }, t.fn.applySerializedArray = function(e) {
            return t.applySerializedArray(this, e), this
        }
    }(jQuery), jQuery.extend(jQuery.easing, {
        easeInSine: function(t, e, i, n, s) {
            return -n * Math.cos(e / s * (Math.PI / 2)) + n + i
        },
        easeOutSine: function(t, e, i, n, s) {
            return n * Math.sin(e / s * (Math.PI / 2)) + i
        },
        easeInOutSine: function(t, e, i, n, s) {
            return -n / 2 * (Math.cos(Math.PI * e / s) - 1) + i
        }
    }),
    function(t) {
        t.toJSON = function(e) {
            if ("object" == typeof JSON && JSON.stringify) return JSON.stringify(e);
            var i = typeof e;
            if (null === e) return "null";
            if ("undefined" == i) return void 0;
            if ("number" == i || "boolean" == i) return e + "";
            if ("string" == i) return t.quoteString(e);
            if ("object" == i) {
                if ("function" == typeof e.toJSON) return t.toJSON(e.toJSON());
                if (e.constructor === Date) {
                    var n = e.getUTCFullYear(),
                        s = e.getUTCMonth() + 1;
                    10 > s && (s = "0" + s);
                    var r = e.getUTCDate();
                    10 > r && (r = "0" + r);
                    var o = e.getUTCHours();
                    10 > o && (o = "0" + o);
                    var a = e.getUTCMinutes();
                    10 > a && (a = "0" + a);
                    var l = e.getUTCSeconds();
                    10 > l && (l = "0" + l);
                    var c = e.getUTCMilliseconds();
                    return 100 > c && (c = "0" + c), 10 > c && (c = "0" + c), '"' + n + "-" + s + "-" + r + "T" + o + ":" + a + ":" + l + "." + c + 'Z"'
                }
                if (e.constructor === Array) {
                    for (var u = [], h = 0; h < e.length; h++) u.push(t.toJSON(e[h]) || "null");
                    return "[" + u.join(",") + "]"
                }
                var d = [];
                for (var p in e) {
                    var f;
                    if (i = typeof p, "number" == i) f = '"' + p + '"';
                    else {
                        if ("string" != i) continue;
                        f = t.quoteString(p)
                    }
                    if ("function" != typeof e[p]) {
                        var m = t.toJSON(e[p]);
                        d.push(f + ":" + m)
                    }
                }
                return "{" + d.join(", ") + "}"
            }
        }, t.quoteString = function(t) {
            return t.match(e) ? '"' + t.replace(e, function(t) {
                var e = i[t];
                return "string" == typeof e ? e : (e = t.charCodeAt(), "\\u00" + Math.floor(e / 16).toString(16) + (e % 16).toString(16))
            }) + '"' : '"' + t + '"'
        };
        var e = /["\\\x00-\x1f\x7f-\x9f]/g,
            i = {
                "\b": "\\b",
                "	": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            }
    }(jQuery),
    function(t) {
        t.fn.localize = function(e) {
            this.find("*").contents().each(function() {
                var i = !1,
                    n = "";
                return "string" == typeof this.data && (n = t.trim(this.data), n && (i = e.sub[n] || e.top[n]) && (this.data = i)), "IMG" == this.nodeName && this.attributes.src && (n = this.attributes.src.nodeValue, n && (i = e.sub[n] || e.top[n]) && t(this).attr("src", i)), "A" == this.nodeName && this.attributes.href && (n = t.trim(this.attributes.href.nodeValue), n && (i = e.sub[n] || e.top[n]) && t(this).attr("href", i)), "INPUT" == this.nodeName && this.attributes.type && this.attributes.value && ["submit", "reset", "button"].indexOf(this.attributes.type.nodeValue.toLowerCase()) > -1 && (n = t.trim(this.attributes.value.nodeValue), n && (i = e.sub[n] || e.top[n]) && t(this).attr("value", i)), this
            })
        }
    }(jQuery),
    function(t) {
        function e(t, e, i, n) {
            if (!t.tag.isInline && i.length > 0) {
                i.push("\n");
                for (var s = 0; n > s; s++) i.push("	")
            }
        }

        function i(n, s) {
            var r = [],
                o = 0 == n.attributes.length,
                h = 0,
                p = null,
                f = n.tag.render && (0 == s.allowedTags.length || t.inArray(n.tag.name, s.allowedTags) > -1) && (0 == s.removeTags.length || -1 == t.inArray(n.tag.name, s.removeTags));
            if (!n.isRoot && f && (r.push("<"), r.push(n.tag.name), t.each(n.attributes, function() {
                    if (-1 == t.inArray(this.name, s.removeAttrs)) {
                        var e = new RegExp(/^(['"]?)(.*?)['"]?$/).exec(this.value),
                            i = e[2],
                            o = e[1] || "'";
                        "class" == this.name && (i = t.grep(i.split(" "), function(e) {
                            return t.grep(s.allowedClasses, function(i) {
                                return i[0] == e && (1 == i.length || t.inArray(n.tag.name, i[1]) > -1)
                            }).length > 0
                        }).join(" "), o = "'"), null != i && (i.length > 0 || t.inArray(this.name, n.tag.requiredAttributes) > -1) && (r.push(" "), r.push(this.name), r.push("="), r.push(o), r.push(i), r.push(o))
                    }
                })), n.tag.isSelfClosing) f && r.push(" />"), o = !1;
            else if (n.tag.isNonClosing) o = !1;
            else {
                if (!n.isRoot && f && r.push(">"), h = s.formatIndent++, n.tag.toProtect) p = t.htmlClean.trim(n.children.join("")).replace(/<br>/gi, "\n"), r.push(p), o = 0 == p.length, s.formatIndent--;
                else {
                    p = [];
                    for (var m = 0; m < n.children.length; m++) {
                        var g = n.children[m],
                            v = t.htmlClean.trim(d(c(g) ? g : g.childrenToString()));
                        u(g) && m > 0 && v.length > 0 && (a(g) || l(n.children[m - 1])) && p.push(" "), c(g) ? v.length > 0 && p.push(v) : (m != n.children.length - 1 || "br" != g.tag.name) && (s.format && e(g, s, p, h), p = p.concat(i(g, s)))
                    }
                    s.formatIndent--, p.length > 0 && (s.format && "\n" != p[0] && e(n, s, r, h), r = r.concat(p), o = !1)
                }!n.isRoot && f && (s.format && e(n, s, r, h - 1), r.push("</"), r.push(n.tag.name), r.push(">"))
            }
            return !n.tag.allowEmpty && o ? [] : r
        }

        function n(e, i, s) {
            return s = s || 1, t.inArray(e[e.length - s].tag.name, i) > -1 ? !0 : e.length - (s + 1) > 0 && n(e, i, s + 1) ? (e.pop(), !0) : !1
        }

        function s(t) {
            return t ? (this.tag = t, this.isRoot = !1) : (this.tag = new o("root"), this.isRoot = !0), this.attributes = [], this.children = [], this.hasAttribute = function(t) {
                for (var e = 0; e < this.attributes.length; e++)
                    if (this.attributes[e].name == t) return !0;
                return !1
            }, this.childrenToString = function() {
                return this.children.join("")
            }, this
        }

        function r(t, e) {
            return this.name = t, this.value = e, this
        }

        function o(e, i, n, s) {
            return this.name = e.toLowerCase(), this.isSelfClosing = t.inArray(this.name, y) > -1, this.isNonClosing = t.inArray(this.name, b) > -1, this.isClosing = void 0 != i && i.length > 0, this.isInline = t.inArray(this.name, p) > -1, this.disallowNest = t.inArray(this.name, f) > -1, this.requiredParent = g[t.inArray(this.name, g) + 1], this.allowEmpty = t.inArray(this.name, m) > -1, this.toProtect = t.inArray(this.name, v) > -1, this.rawAttributes = n, this.allowedAttributes = w[t.inArray(this.name, w) + 1], this.requiredAttributes = _[t.inArray(this.name, _) + 1], this.render = s && -1 == t.inArray(this.name, s.notRenderedTags), this
        }

        function a(e) {
            for (; h(e) && e.children.length > 0;) e = e.children[0];
            return c(e) && e.length > 0 && t.htmlClean.isWhitespace(e.charAt(0))
        }

        function l(e) {
            for (; h(e) && e.children.length > 0;) e = e.children[e.children.length - 1];
            return c(e) && e.length > 0 && t.htmlClean.isWhitespace(e.charAt(e.length - 1))
        }

        function c(t) {
            return t.constructor == String
        }

        function u(t) {
            return c(t) || t.tag.isInline
        }

        function h(t) {
            return t.constructor == s
        }

        function d(t) {
            return t.replace(/&nbsp;|\n/g, " ").replace(/\s\s+/g, " ")
        }
        t.fn.htmlClean = function(e) {
            return this.each(function() {
                this.value ? this.value = t.htmlClean(this.value, e) : this.innerHTML = t.htmlClean(this.innerHTML, e)
            })
        }, t.htmlClean = function(e, a) {
            a = t.extend({}, t.htmlClean.defaults, a);
            var l, u = /<(\/)?(\w+:)?([\w]+)([^>]*)>/gi,
                h = /(\w+)=(".*?"|'.*?'|[^\s>]*)/gi,
                d = new s,
                p = [d],
                f = d;
            a.bodyOnly && (l = /<body[^>]*>((\n|.)*)<\/body>/i.exec(e)) && (e = l[1]), e = e.concat("<xxx>");
            for (var m; l = u.exec(e);) {
                var g = new o(l[3], l[1], l[4], a),
                    v = e.substring(m, l.index);
                if (v.length > 0) {
                    var y = f.children[f.children.length - 1];
                    f.children.length > 0 && c(y = f.children[f.children.length - 1]) ? f.children[f.children.length - 1] = y.concat(v) : f.children.push(v)
                }
                if (m = u.lastIndex, g.isClosing) n(p, [g.name]) && (p.pop(), f = p[p.length - 1]);
                else {
                    for (var b, w = new s(g); b = h.exec(g.rawAttributes);) {
                        if ("style" == b[1].toLowerCase() && a.replaceStyles)
                            for (var _ = !g.isInline, x = 0; x < a.replaceStyles.length; x++) a.replaceStyles[x][0].test(b[2]) && (_ || (g.render = !1, _ = !0), f.children.push(w), p.push(w), f = w, g = new o(a.replaceStyles[x][1], "", "", a), w = new s(g));
                        null != g.allowedAttributes && (0 == g.allowedAttributes.length || t.inArray(b[1], g.allowedAttributes) > -1) && w.attributes.push(new r(b[1], b[2]))
                    }
                    t.each(g.requiredAttributes, function() {
                        var t = this.toString();
                        w.hasAttribute(t) || w.attributes.push(new r(t, ""))
                    });
                    for (var C = 0; C < a.replace.length; C++)
                        for (var k = 0; k < a.replace[C][0].length; k++) {
                            var T = "string" == typeof a.replace[C][0][k];
                            if (T && a.replace[C][0][k] == g.name || !T && a.replace[C][0][k].test(l)) {
                                g.render = !1, f.children.push(w), p.push(w), f = w, g = new o(a.replace[C][1], l[1], l[4], a), w = new s(g), w.attributes = f.attributes, C = a.replace.length;
                                break
                            }
                        }
                    var M = !0;
                    if (f.isRoot || (f.tag.isInline && !g.isInline ? M = !1 : f.tag.disallowNest && g.disallowNest && !g.requiredParent ? M = !1 : g.requiredParent && (M = n(p, g.requiredParent)) && (f = p[p.length - 1])), M)
                        if (f.children.push(w), g.toProtect)
                            for (var E = null; E = u.exec(e);) {
                                var D = new o(E[3], E[1], E[4], a);
                                if (D.isClosing && D.name == g.name) {
                                    w.children.push(RegExp.leftContext.substring(m)), m = u.lastIndex;
                                    break
                                }
                            } else g.isSelfClosing || g.isNonClosing || (p.push(w), f = w)
                }
            }
            return i(d, a).join("")
        }, t.htmlClean.defaults = {
            bodyOnly: !0,
            allowedTags: [],
            removeTags: ["basefont", "center", "dir", "font", "frame", "frameset", "iframe", "isindex", "menu", "noframes", "s", "strike", "u"],
            removeAttrs: [],
            allowedClasses: [],
            notRenderedTags: [],
            format: !1,
            formatIndent: 0,
            replace: [
                [
                    ["b", "big"], "strong"
                ],
                [
                    ["i"], "em"
                ]
            ],
            replaceStyles: [
                [/font-weight:\s*bold/i, "strong"],
                [/font-style:\s*italic/i, "em"],
                [/vertical-align:\s*super/i, "sup"],
                [/vertical-align:\s*sub/i, "sub"]
            ]
        }, t.htmlClean.trim = function(e) {
            return t.htmlClean.trimStart(t.htmlClean.trimEnd(e))
        }, t.htmlClean.trimStart = function(e) {
            return e.substring(t.htmlClean.trimStartIndex(e))
        }, t.htmlClean.trimStartIndex = function(e) {
            for (var i = 0; i < e.length - 1 && t.htmlClean.isWhitespace(e.charAt(i)); i++);
            return i
        }, t.htmlClean.trimEnd = function(e) {
            return e.substring(0, t.htmlClean.trimEndIndex(e))
        }, t.htmlClean.trimEndIndex = function(e) {
            for (var i = e.length - 1; i >= 0 && t.htmlClean.isWhitespace(e.charAt(i)); i--);
            return i + 1
        }, t.htmlClean.isWhitespace = function(e) {
            return -1 != t.inArray(e, x)
        };
        var p = ["a", "abbr", "acronym", "address", "b", "big", "br", "button", "caption", "cite", "code", "del", "em", "font", "hr", "i", "input", "img", "ins", "label", "legend", "map", "q", "samp", "select", "small", "span", "strong", "sub", "sup", "tt", "var"],
            f = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "th", "td"],
            m = ["th", "td"],
            g = [null, "li", ["ul", "ol"], "dt", ["dl"], "dd", ["dl"], "td", ["tr"], "th", ["tr"], "tr", ["table", "thead", "tbody", "tfoot"], "thead", ["table"], "tbody", ["table"], "tfoot", ["table"]],
            v = ["script", "style", "pre", "code"],
            y = ["br", "hr", "img", "link", "meta"],
            b = ["!doctype", "?xml"],
            w = [
                ["class"], "?xml", [], "!doctype", [], "a", ["accesskey", "class", "href", "name", "title", "rel", "rev", "type", "tabindex"], "abbr", ["class", "title"], "acronym", ["class", "title"], "blockquote", ["cite", "class"], "button", ["class", "disabled", "name", "type", "value"], "del", ["cite", "class", "datetime"], "form", ["accept", "action", "class", "enctype", "method", "name"], "input", ["accept", "accesskey", "alt", "checked", "class", "disabled", "ismap", "maxlength", "name", "size", "readonly", "src", "tabindex", "type", "usemap", "value"], "img", ["alt", "class", "height", "src", "width"], "ins", ["cite", "class", "datetime"], "label", ["accesskey", "class", "for"], "legend", ["accesskey", "class"], "link", ["href", "rel", "type"], "meta", ["content", "http-equiv", "name", "scheme"], "map", ["name"], "optgroup", ["class", "disabled", "label"], "option", ["class", "disabled", "label", "selected", "value"], "q", ["class", "cite"], "td", ["colspan", "rowspan"], "th", ["colspan", "rowspan"], "script", ["src", "type"], "select", ["class", "disabled", "multiple", "name", "size", "tabindex"], "style", ["type"], "table", ["class", "summary"], "textarea", ["accesskey", "class", "cols", "disabled", "name", "readonly", "rows", "tabindex"]
            ],
            _ = [
                [], "img", ["alt"]
            ],
            x = [" ", " ", "	", "\n", "\r", "\f"]
    }(jQuery);
var LiquidMetal = function() {
        function t(t, e) {
            var i = t.charAt(e);
            return i >= "A" && "Z" >= i
        }

        function e(t, e) {
            var i = t.charAt(e - 1);
            return " " == i || "	" == i
        }

        function i(t, e, i, n) {
            i = Math.max(i || 0, 0), n = Math.min(n || t.length, t.length);
            for (var s = i; n > s; s++) t[s] = e;
            return t
        }
        var n = 0,
            s = 1,
            r = .8,
            o = .9,
            a = .85;
        return {
            score: function(t, e) {
                if (0 == e.length) return r;
                if (e.length > t.length) return n;
                for (var i = this.buildScoreArray(t, e), s = 0, o = 0; o < i.length; o++) s += i[o];
                return s / i.length
            },
            buildScoreArray: function(l, c) {
                for (var u = new Array(l.length), h = l.toLowerCase(), d = c.toLowerCase().split(""), p = -1, f = !1, m = 0; m < d.length; m++) {
                    var g = d[m],
                        v = h.indexOf(g, p + 1);
                    if (0 > v) return i(u, n);
                    0 == v && (f = !0), e(l, v) ? (u[v - 1] = 1, i(u, a, p + 1, v - 1)) : t(l, v) ? i(u, a, p + 1, v) : i(u, n, p + 1, v), u[v] = s, p = v
                }
                var y = f ? o : r;
                return i(u, y, p + 1), u
            }
        }
    }(),
    Showdown = {};
Showdown.converter = function() {
        var t, e, i, n = 0;
        this.makeHtml = function(n) {
            return t = new Array, e = new Array, i = new Array, n = n.replace(/~/g, "~T"), n = n.replace(/\$/g, "~D"), n = n.replace(/\r\n/g, "\n"), n = n.replace(/\r/g, "\n"), n = "\n\n" + n + "\n\n", n = j(n), n = n.replace(/^[ \t]+$/gm, ""), n = a(n), n = o(n), n = c(n), n = S(n), n = n.replace(/~D/g, "$$"), n = n.replace(/~T/g, "~"), n = n.replace(/https?\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!]/g, function(t, e) {
                var i = n.slice(0, e),
                    s = n.slice(e);
                if (i.match(/<[^>]+$/) && s.match(/^[^>]*>/)) return t;
                var r = t.replace(/^http:\/\/github.com\//, "https://github.com/");
                return "<a href='" + r + "'>" + t + "</a>"
            }), n = n.replace(/[a-z0-9_\-+=.]+@[a-z0-9\-]+(\.[a-z0-9-]+)+/gi, function(t) {
                return "<a href='mailto:" + t + "'>" + t + "</a>"
            }), n = n.replace(/[a-f0-9]{40}/gi, function(t, e) {
                if ("undefined" == typeof GitHub || "undefined" == typeof GitHub.nameWithOwner) return t;
                var i = n.slice(0, e),
                    s = n.slice(e);
                return i.match(/@$/) || i.match(/<[^>]+$/) && s.match(/^[^>]*>/) ? t : "<a href='http://github.com/" + GitHub.nameWithOwner + "/commit/" + t + "'>" + t.substring(0, 7) + "</a>"
            }), n = n.replace(/([a-z0-9_\-+=.]+)@([a-f0-9]{40})/gi, function(t, e, i, s) {
                if ("undefined" == typeof GitHub || "undefined" == typeof GitHub.nameWithOwner) return t;
                GitHub.repoName = GitHub.repoName || r();
                var o = n.slice(0, s),
                    a = n.slice(s);
                return o.match(/\/$/) || o.match(/<[^>]+$/) && a.match(/^[^>]*>/) ? t : "<a href='http://github.com/" + e + "/" + GitHub.repoName + "/commit/" + i + "'>" + e + "@" + i.substring(0, 7) + "</a>"
            }), n = n.replace(/([a-z0-9_\-+=.]+\/[a-z0-9_\-+=.]+)@([a-f0-9]{40})/gi, function(t, e, i) {
                return "<a href='http://github.com/" + e + "/commit/" + i + "'>" + e + "@" + i.substring(0, 7) + "</a>"
            }), n = n.replace(/#([0-9]+)/gi, function(t, e, i) {
                if ("undefined" == typeof GitHub || "undefined" == typeof GitHub.nameWithOwner) return t;
                var s = n.slice(0, i),
                    r = n.slice(i);
                return "" == s || s.match(/[a-z0-9_\-+=.]$/) || s.match(/<[^>]+$/) && r.match(/^[^>]*>/) ? t : "<a href='http://github.com/" + GitHub.nameWithOwner + "/issues/#issue/" + e + "'>" + t + "</a>"
            }), n = n.replace(/([a-z0-9_\-+=.]+)#([0-9]+)/gi, function(t, e, i, s) {
                if ("undefined" == typeof GitHub || "undefined" == typeof GitHub.nameWithOwner) return t;
                GitHub.repoName = GitHub.repoName || r();
                var o = n.slice(0, s),
                    a = n.slice(s);
                return o.match(/\/$/) || o.match(/<[^>]+$/) && a.match(/^[^>]*>/) ? t : "<a href='http://github.com/" + e + "/" + GitHub.repoName + "/issues/#issue/" + i + "'>" + t + "</a>"
            }), n = n.replace(/([a-z0-9_\-+=.]+\/[a-z0-9_\-+=.]+)#([0-9]+)/gi, function(t, e, i) {
                return "<a href='http://github.com/" + e + "/issues/#issue/" + i + "'>" + t + "</a>"
            })
        };
        var s, r = function() {
                return GitHub.nameWithOwner.match(/^.+\/(.+)$/)[1]
            },
            o = function(i) {
                var i = i.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|\Z)/gm, function(i, n, s, r, o) {
                    return n = n.toLowerCase(), t[n] = T(s), r ? r + o : (o && (e[n] = o.replace(/"/g, "&quot;")), "")
                });
                return i
            },
            a = function(t) {
                return t = t.replace(/\n/g, "\n\n"), t = t.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm, l), t = t.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm, l), t = t.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, l), t = t.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g, l), t = t.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, l), t = t.replace(/\n\n/g, "\n")
            },
            l = function(t, e) {
                var n = e;
                return n = n.replace(/\n\n/g, "\n"), n = n.replace(/^\n/, ""), n = n.replace(/\n+$/g, ""), n = "\n\n~K" + (i.push(n) - 1) + "K\n\n"
            },
            c = function(t) {
                t = g(t);
                var e = b("<hr />");
                return t = t.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, e), t = t.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm, e), t = t.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm, e), t = v(t), t = y(t), t = C(t), t = a(t), t = k(t)
            },
            u = function(t) {
                return t = w(t), t = h(t), t = M(t), t = f(t), t = d(t), t = E(t), t = T(t), t = x(t), t = t.replace(/  +\n/g, " <br />\n")
            },
            h = function(t) {
                var e = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;
                return t = t.replace(e, function(t) {
                    var e = t.replace(/(.)<\/?code>(?=.)/g, "$1`");
                    return e = $(e, "\\`*_")
                })
            },
            d = function(t) {
                return t = t.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, p), t = t.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, p), t = t.replace(/(\[([^\[\]]+)\])()()()()()/g, p)
            },
            p = function(i, n, s, r, o, a, l, c) {
                void 0 == c && (c = "");
                var u = n,
                    h = s,
                    d = r.toLowerCase(),
                    p = o,
                    f = c;
                if ("" == p)
                    if ("" == d && (d = h.toLowerCase().replace(/ ?\n/g, " ")), p = "#" + d, void 0 != t[d]) p = t[d], void 0 != e[d] && (f = e[d]);
                    else {
                        if (!(u.search(/\(\s*\)$/m) > -1)) return u;
                        p = ""
                    }
                p = $(p, "*_");
                var m = '<a href="' + p + '"';
                return "" != f && (f = f.replace(/"/g, "&quot;"), f = $(f, "*_"), m += ' title="' + f + '"'), m += ">" + h + "</a>"
            },
            f = function(t) {
                return t = t.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, m), t = t.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, m)
            },
            m = function(i, n, s, r, o, a, l, c) {
                var u = n,
                    h = s,
                    d = r.toLowerCase(),
                    p = o,
                    f = c;
                if (f || (f = ""), "" == p) {
                    if ("" == d && (d = h.toLowerCase().replace(/ ?\n/g, " ")), p = "#" + d, void 0 == t[d]) return u;
                    p = t[d], void 0 != e[d] && (f = e[d])
                }
                h = h.replace(/"/g, "&quot;"), p = $(p, "*_");
                var m = '<img src="' + p + '" alt="' + h + '"';
                return f = f.replace(/"/g, "&quot;"), f = $(f, "*_"), m += ' title="' + f + '"', m += " />"
            },
            g = function(t) {
                return t = t.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm, function(t, e) {
                    return b("<h1>" + u(e) + "</h1>")
                }), t = t.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm, function(t, e) {
                    return b("<h2>" + u(e) + "</h2>")
                }), t = t.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm, function(t, e, i) {
                    var n = e.length;
                    return b("<h" + n + ">" + u(i) + "</h" + n + ">")
                })
            },
            v = function(t) {
                t += "~0";
                var e = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
                return n ? t = t.replace(e, function(t, e, i) {
                    var n = e,
                        r = i.search(/[*+-]/g) > -1 ? "ul" : "ol";
                    n = n.replace(/\n{2,}/g, "\n\n\n");
                    var o = s(n);
                    return o = o.replace(/\s+$/, ""), o = "<" + r + ">" + o + "</" + r + ">\n"
                }) : (e = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g, t = t.replace(e, function(t, e, i, n) {
                    var r = e,
                        o = i,
                        a = n.search(/[*+-]/g) > -1 ? "ul" : "ol",
                        o = o.replace(/\n{2,}/g, "\n\n\n"),
                        l = s(o);
                    return l = r + "<" + a + ">\n" + l + "</" + a + ">\n"
                })), t = t.replace(/~0/, "")
            };
        s = function(t) {
            return n++, t = t.replace(/\n{2,}$/, "\n"), t += "~0", t = t.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm, function(t, e, i, n, s) {
                var r = s,
                    o = e;
                return o || r.search(/\n{2,}/) > -1 ? r = c(I(r)) : (r = v(I(r)), r = r.replace(/\n$/, ""), r = u(r)), "<li>" + r + "</li>\n"
            }), t = t.replace(/~0/g, ""), n--, t
        };
        var y = function(t) {
                return t += "~0", t = t.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function(t, e, i) {
                    var n = e,
                        s = i;
                    return n = _(I(n)), n = j(n), n = n.replace(/^\n+/g, ""), n = n.replace(/\n+$/g, ""), n = "<pre><code>" + n + "\n</code></pre>", b(n) + s
                }), t = t.replace(/~0/, "")
            },
            b = function(t) {
                return t = t.replace(/(^\n+|\n+$)/g, ""), "\n\n~K" + (i.push(t) - 1) + "K\n\n"
            },
            w = function(t) {
                return t = t.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(t, e, i, n) {
                    var s = n;
                    return s = s.replace(/^([ \t]*)/g, ""), s = s.replace(/[ \t]*$/g, ""), s = _(s), e + "<code>" + s + "</code>"
                })
            },
            _ = function(t) {
                return t = t.replace(/&/g, "&amp;"), t = t.replace(/</g, "&lt;"), t = t.replace(/>/g, "&gt;"), t = $(t, "*_{}[]\\", !1)
            },
            x = function(t) {
                return t = t.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, "<strong>$2</strong>"), t = t.replace(/(\w)_(\w)/g, "$1~E95E$2"), t = t.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>")
            },
            C = function(t) {
                return t = t.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(t, e) {
                    var i = e;
                    return i = i.replace(/^[ \t]*>[ \t]?/gm, "~0"), i = i.replace(/~0/g, ""), i = i.replace(/^[ \t]+$/gm, ""), i = c(i), i = i.replace(/(^|\n)/g, "$1  "), i = i.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(t, e) {
                        var i = e;
                        return i = i.replace(/^  /gm, "~0"), i = i.replace(/~0/g, "")
                    }), b("<blockquote>\n" + i + "\n</blockquote>")
                })
            },
            k = function(t) {
                t = t.replace(/^\n+/g, ""), t = t.replace(/\n+$/g, "");
                for (var e = t.split(/\n{2,}/g), n = new Array, s = e.length, r = 0; s > r; r++) {
                    var o = e[r];
                    o.search(/~K(\d+)K/g) >= 0 ? n.push(o) : o.search(/\S/) >= 0 && (o = u(o), o = o.replace(/\n/g, "<br />"), o = o.replace(/^([ \t]*)/g, "<p>"), o += "</p>", n.push(o))
                }
                s = n.length;
                for (var r = 0; s > r; r++)
                    for (; n[r].search(/~K(\d+)K/) >= 0;) {
                        var a = i[RegExp.$1];
                        a = a.replace(/\$/g, "$$$$"), n[r] = n[r].replace(/~K\d+K/, a)
                    }
                return n.join("\n\n")
            },
            T = function(t) {
                return t = t.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), t = t.replace(/<(?![a-z\/?\$!])/gi, "&lt;")
            },
            M = function(t) {
                return t = t.replace(/\\(\\)/g, P), t = t.replace(/\\([`*_{}\[\]()>#+-.!])/g, P)
            },
            E = function(t) {
                return t = t.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi, '<a href="$1">$1</a>'), t = t.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, function(t, e) {
                    return D(S(e))
                })
            },
            D = function(t) {
                function e(t) {
                    var e = "0123456789ABCDEF",
                        i = t.charCodeAt(0);
                    return e.charAt(i >> 4) + e.charAt(15 & i)
                }
                var i = [function(t) {
                    return "&#" + t.charCodeAt(0) + ";"
                }, function(t) {
                    return "&#x" + e(t) + ";"
                }, function(t) {
                    return t
                }];
                return t = "mailto:" + t, t = t.replace(/./g, function(t) {
                    if ("@" == t) t = i[Math.floor(2 * Math.random())](t);
                    else if (":" != t) {
                        var e = Math.random();
                        t = e > .9 ? i[2](t) : e > .45 ? i[1](t) : i[0](t)
                    }
                    return t
                }), t = '<a href="' + t + '">' + t + "</a>", t = t.replace(/">.+:/g, '">')
            },
            S = function(t) {
                return t = t.replace(/~E(\d+)E/g, function(t, e) {
                    var i = parseInt(e);
                    return String.fromCharCode(i)
                })
            },
            I = function(t) {
                return t = t.replace(/^(\t|[ ]{1,4})/gm, "~0"), t = t.replace(/~0/g, "")
            },
            j = function(t) {
                return t = t.replace(/\t(?=\t)/g, "    "), t = t.replace(/\t/g, "~A~B"), t = t.replace(/~B(.+?)~A/g, function(t, e) {
                    for (var i = e, n = 4 - i.length % 4, s = 0; n > s; s++) i += " ";
                    return i
                }), t = t.replace(/~A/g, "    "), t = t.replace(/~B/g, "")
            },
            $ = function(t, e, i) {
                var n = "([" + e.replace(/([\[\]\\])/g, "\\$1") + "])";
                i && (n = "\\\\" + n);
                var s = new RegExp(n, "g");
                return t = t.replace(s, P)
            },
            P = function(t, e) {
                var i = e.charCodeAt(0);
                return "~E" + i + "E"
            }
    },
    function() {
        var t = [].slice;
        this.Mercury || (this.Mercury = {}), jQuery.extend(this.Mercury, {
            version: "0.9.0",
            Regions: Mercury.Regions || {},
            modalHandlers: Mercury.modalHandlers || {},
            lightviewHandlers: Mercury.lightviewHandlers || {},
            dialogHandlers: Mercury.dialogHandlers || {},
            preloadedViews: Mercury.preloadedViews || {},
            ajaxHeaders: function() {
                var t;
                return t = {}, t[Mercury.config.csrfHeader] = Mercury.csrfToken, t
            },
            on: function(t, e) {
                return jQuery(window).on("mercury:" + t, e)
            },
            off: function(t, e) {
                return jQuery(window).off("mercury:" + t, e)
            },
            one: function(t, e) {
                return jQuery(window).one("mercury:" + t, e)
            },
            trigger: function(t, e) {
                return Mercury.log(t, e), jQuery(window).trigger("mercury:" + t, e)
            },
            notify: function() {
                var e;
                return e = 1 <= arguments.length ? t.call(arguments, 0) : [], window.alert(Mercury.I18n.apply(this, e))
            },
            warn: function(t, e) {
                var i, n;
                if (null == e && (e = 0), console) try {
                    return console.warn(t)
                } catch (s) {
                    if (i = s, e >= 1) try {
                        return console.debug(t)
                    } catch (s) {
                        n = s
                    }
                } else if (e >= 1) return Mercury.notify(t)
            },
            deprecated: function(t) {
                return console && console.trace && (t = "" + t + " -- " + console.trace()), Mercury.warn("deprecated: " + t, 1)
            },
            log: function() {
                var t;
                if (Mercury.debug && console) {
                    if ("hide:toolbar" === arguments[0] || "show:toolbar" === arguments[0]) return;
                    try {
                        return console.debug(arguments)
                    } catch (e) {
                        t = e
                    }
                }
            },
            locale: function() {
                var t, e, i;
                return Mercury.determinedLocale ? Mercury.determinedLocale : (Mercury.config.localization.enabled && (t = [], navigator.language && (t = navigator.language.toString().split("-")).length && (i = Mercury.I18n[t[0]] || {}, e = t.length > 1 ? i["_" + t[1].toUpperCase() + "_"] : void 0), Mercury.I18n[t[0]] || (t = Mercury.config.localization.preferredLocale.split("-"), i = Mercury.I18n[t[0]] || {}, e = t.length > 1 ? i["_" + t[1].toUpperCase() + "_"] : void 0)), Mercury.determinedLocale = {
                    top: i || {},
                    sub: e || {}
                })
            },
            I18n: function() {
                var e, i, n, s;
                return n = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : [], i = Mercury.locale(), s = (i.sub[n] || i.top[n] || n || "").toString(), e.length ? s.printf.apply(s, e) : s
            }
        })
    }.call(this),
    function() {
        String.prototype.titleize = function() {
            return this[0].toUpperCase() + this.slice(1)
        }, String.prototype.toHex = function() {
            return "#" === this[0] ? this : this.replace(/rgb(a)?\(([0-9|%]+)[\s|,]?\s?([0-9|%]+)[\s|,]?\s?([0-9|%]+)[\s|,]?\s?([0-9|.|%]+\s?)?\)/gi, function(t, e, i, n, s) {
                return "#" + parseInt(i).toHex() + parseInt(n).toHex() + parseInt(s).toHex()
            })
        }, String.prototype.regExpEscape = function() {
            var t, e;
            return e = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\"], t = new RegExp("(\\" + e.join("|\\") + ")", "g"), this.replace(t, "\\$1")
        }, String.prototype.printf = function() {
            var t, e, i, n, s, r, o, a, l, c;
            for (i = this.split("%"), a = i[0], o = /^([sdf])([\s\S%]*)$/, s = 0, n = l = 0, c = i.length; c > l; n = ++l)
                if (e = i[n], r = o.exec(e), 0 !== n && r && null !== arguments[n]) {
                    switch (t = arguments[n - 1 - s], r[1]) {
                        case "s":
                            a += t;
                            break;
                        case "d":
                        case "i":
                            a += parseInt(t.toString(), 10);
                            break;
                        case "f":
                            a += parseFloat(t)
                    }
                    a += r[2]
                } else n > 1 && (s += 2, a += "%" + e);
            return a
        }, Number.prototype.toHex = function() {
            var t;
            return t = this.toString(16).toUpperCase(), t[1] ? t : "0" + t
        }, Number.prototype.toBytes = function() {
            var t, e;
            for (t = parseInt(this), e = 0; t > 1023;) t /= 1024, e += 1;
            return e ? "" + t.toFixed(2) + ["", " kb", " Mb", " Gb", " Tb", " Pb", " Eb"][e] : "" + t + " bytes"
        }
    }.call(this),
    function() {
        this.Mercury.PageEditor = function() {
            function t(t, e) {
                var i;
                if (this.saveUrl = null != t ? t : null, this.options = null != e ? e : {}, window.mercuryInstance) throw Mercury.I18n("Mercury.PageEditor can only be instantiated once.");
                this.options.visible !== !1 && "false" !== this.options.visible && (this.options.visible = !0), this.visible = this.options.visible, this.options.saveDataType === !1 || this.options.saveDataType || (this.options.saveDataType = "json"), window.mercuryInstance = this, this.regions = [], this.initializeInterface(), (i = jQuery(Mercury.config.csrfSelector).attr("content")) && (Mercury.csrfToken = i)
            }
            return t.prototype.initializeInterface = function() {
                var t, e, i = this;
                return this.focusableElement = jQuery("<input>", {
                    "class": "mercury-focusable",
                    type: "text"
                }).appendTo(null != (t = this.options.appendTo) ? t : "body"), this.iframe = jQuery("<iframe>", {
                    id: "mercury_iframe",
                    name: "mercury_iframe",
                    "class": "mercury-iframe",
                    frameborder: "0",
                    src: "about:blank"
                }), this.iframe.appendTo(null != (e = jQuery(this.options.appendTo).get(0)) ? e : "body"), this.toolbar = new Mercury.Toolbar(jQuery.extend(!0, {}, this.options, this.options.toolbarOptions)), this.statusbar = new Mercury.Statusbar(jQuery.extend(!0, {}, this.options, this.options.statusbarOptions)), this.resize(), this.iframe.one("load", function() {
                    return i.bindEvents()
                }), this.iframe.on("load", function() {
                    return i.initializeFrame()
                }), this.loadIframeSrc(null)
            }, t.prototype.initializeFrame = function() {
                var t, e;
                try {
                    if (this.iframe.data("loaded")) return;
                    return this.iframe.data("loaded", !0), this.document = jQuery(this.iframe.get(0).contentWindow.document), jQuery('<style mercury-styles="true">').html(Mercury.config.injectedStyles).appendTo(this.document.find("head")), e = this.iframe.get(0).contentWindow, jQuery.globalEval = function(t) {
                        return t && /\S/.test(t) ? (e.execScript || function(t) {
                            return e.eval.call(e, t)
                        })(t) : void 0
                    }, e.Mercury = Mercury, window.History && History.Adapter && (e.History = History), this.bindDocumentEvents(), this.resize(), this.initializeRegions(), this.finalizeInterface(), Mercury.trigger("ready"), e.jQuery && e.jQuery(e).trigger("mercury:ready"), e.Event && e.Event.fire && e.Event.fire(e, "mercury:ready"), e.onMercuryReady && e.onMercuryReady(), this.iframe.css({
                        visibility: "visible"
                    })
                } catch (i) {
                    return t = i, Mercury.notify("Mercury.PageEditor failed to load: %s\n\nPlease try refreshing.", t)
                }
            }, t.prototype.initializeRegions = function() {
                var t, e, i, n, s, r, o, a;
                for (this.regions = [], r = jQuery("[" + Mercury.config.regions.attribute + "]", this.document), e = 0, n = r.length; n > e; e++) t = r[e], this.buildRegion(jQuery(t));
                if (this.visible) {
                    for (o = this.regions, a = [], i = 0, s = o.length; s > i; i++) {
                        if (t = o[i], t.focus) {
                            t.focus();
                            break
                        }
                        a.push(void 0)
                    }
                    return a
                }
            }, t.prototype.buildRegion = function(t) {
                var e, i;
                if (t.data("region")) t = t.data("region");
                else {
                    if (e = (t.attr(Mercury.config.regions.attribute) || ("function" == typeof(i = Mercury.config.regions).determineType ? i.determineType(t) : void 0) || "unknown").titleize(), "Unknown" === e || !Mercury.Regions[e]) throw Mercury.I18n('Region type is malformed, no data-type provided, or "%s" is unknown for the "%s" region.', e, t.attr("id") || "unknown");
                    if (!Mercury.Regions[e].supported) return Mercury.notify("Mercury.Regions.%s is unsupported in this client. Supported browsers are %s.", e, Mercury.Regions[e].supportedText), !1;
                    t = new Mercury.Regions[e](t, this.iframe.get(0).contentWindow), this.previewing && t.togglePreview()
                }
                return this.regions.push(t)
            }, t.prototype.finalizeInterface = function() {
                var t;
                return this.santizerElement = jQuery("<div>", {
                    id: "mercury_sanitizer",
                    contenteditable: "true",
                    style: "position:fixed;width:100px;height:100px;min-width:0;top:0;left:-100px;opacity:0;overflow:hidden"
                }), this.santizerElement.appendTo(null != (t = this.options.appendTo) ? t : this.document.find("body")), this.snippetToolbar && this.snippetToolbar.release(), this.snippetToolbar = new Mercury.SnippetToolbar(this.document), this.hijackLinksAndForms(), this.visible ? void 0 : Mercury.trigger("mode", {
                    mode: "preview"
                })
            }, t.prototype.bindDocumentEvents = function() {
                return this.document.on("mousedown", function(t) {
                    return Mercury.trigger("hide:dialogs"), Mercury.region && jQuery(t.target).closest("[" + Mercury.config.regions.attribute + "]").get(0) !== Mercury.region.element.get(0) ? Mercury.trigger("unfocus:regions") : void 0
                }), jQuery(this.document).bind("keydown", function(t) {
                    return t.ctrlKey || t.metaKey ? 83 === t.keyCode ? (Mercury.trigger("action", {
                        action: "save"
                    }), t.preventDefault()) : void 0 : void 0
                })
            }, t.prototype.bindEvents = function() {
                var t = this;
                return Mercury.on("initialize:frame", function() {
                    return setTimeout(t.initializeFrame, 100)
                }), Mercury.on("focus:frame", function() {
                    return t.iframe.focus()
                }), Mercury.on("focus:window", function() {
                    return setTimeout(function() {
                        return t.focusableElement.focus()
                    }, 10)
                }), Mercury.on("toggle:interface", function() {
                    return t.toggleInterface()
                }), Mercury.on("reinitialize", function() {
                    return t.initializeRegions()
                }), Mercury.on("mode", function(e, i) {
                    return "preview" === i.mode ? t.previewing = !t.previewing : void 0
                }), Mercury.on("action", function(e, i) {
                    var n;
                    return n = Mercury.config.globalBehaviors[i.action] || t[i.action], "function" == typeof n ? (e.preventDefault(), n.call(t, i)) : void 0
                }), jQuery(window).on("resize", function() {
                    return t.resize()
                }), jQuery(window).bind("keydown", function(t) {
                    return t.ctrlKey || t.metaKey ? 83 === t.keyCode ? (Mercury.trigger("action", {
                        action: "save"
                    }), t.preventDefault()) : void 0 : void 0
                }), window.onbeforeunload = this.beforeUnload
            }, t.prototype.toggleInterface = function() {
                var t = this;
                return this.visible ? (this.visible = !1, this.toolbar.hide(), this.statusbar.hide(), this.previewing || Mercury.trigger("mode", {
                    mode: "preview"
                }), this.previewing = !0, this.resize()) : (this.visible = !0, this.iframe.animate({
                    top: this.toolbar.height(!0)
                }, 200, "easeInOutSine", function() {
                    return t.resize()
                }), this.toolbar.show(), this.statusbar.show(), Mercury.trigger("mode", {
                    mode: "preview"
                }), this.previewing = !1)
            }, t.prototype.resize = function() {
                var t, e, i;
                return i = jQuery(window).width(), t = this.statusbar.top(), e = this.toolbar.top() + this.toolbar.height(), Mercury.displayRect = {
                    top: e,
                    left: 0,
                    width: i,
                    height: t - e,
                    fullHeight: t
                }, this.iframe.css({
                    top: e,
                    left: 0,
                    height: t - e
                }), Mercury.trigger("resize")
            }, t.prototype.iframeSrc = function(t, e) {
                var i;
                return null == t && (t = null), null == e && (e = !1), t = (null != t ? t : window.location.href).replace(null != (i = Mercury.config).editorUrlRegEx ? (i = Mercury.config).editorUrlRegEx : i.editorUrlRegEx = /([http|https]:\/\/.[^\/]*)\/editor\/?(.*)/i, "$1/$2"), t = t.replace(/[\?|\&]mercury_frame=true/gi, "").replace(/\&_=\d+/gi, "").replace(/#$/, ""), e ? "" + t + (t.indexOf("?") > -1 ? "&" : "?") + "mercury_frame=true&_=" + (new Date).getTime() : t
            }, t.prototype.loadIframeSrc = function(t) {
                return this.document && this.document.off(), this.iframe.data("loaded", !1), this.iframe.get(0).contentWindow.document.location.href = this.iframeSrc(t, !0)
            }, t.prototype.hijackLinksAndForms = function() {
                var t, e, i, n, s, r, o, a, l, c;
                for (a = jQuery("a, form", this.document), c = [], n = 0, r = a.length; r > n; n++) {
                    for (e = a[n], i = !1, l = Mercury.config.nonHijackableClasses || [], s = 0, o = l.length; o > s; s++) t = l[s], jQuery(e).hasClass(t) && (i = !0);
                    i || "" !== e.target && "_self" !== e.target || jQuery(e).closest("[" + Mercury.config.regions.attribute + "]").length ? c.push(void 0) : c.push(jQuery(e).attr("target", "_parent"))
                }
                return c
            }, t.prototype.beforeUnload = function() {
                return Mercury.changes && !Mercury.silent ? Mercury.I18n("You have unsaved changes.  Are you sure you want to leave without saving them first?") : null
            }, t.prototype.getRegionByName = function(t) {
                var e, i, n, s;
                for (s = this.regions, i = 0, n = s.length; n > i; i++)
                    if (e = s[i], e.name === t) return e;
                return null
            }, t.prototype.save = function(t) {
                var e, i, n, s, r, o;
                return s = null != (r = null != (o = this.saveUrl) ? o : Mercury.saveUrl) ? r : this.iframeSrc(), e = this.serialize(), e = {
                    content: e
                }, "POST" === this.options.saveMethod ? i = "POST" : (i = "PUT", e._method = i), Mercury.log("saving", e), n = {
                    headers: Mercury.ajaxHeaders(),
                    type: i,
                    dataType: this.options.saveDataType,
                    data: e,
                    success: function(e) {
                        return Mercury.changes = !1, Mercury.trigger("saved", e), "function" == typeof t ? t() : void 0
                    },
                    error: function(t) {
                        return Mercury.trigger("save_failed", t), Mercury.notify("Mercury was unable to save to the url: %s", s)
                    }
                }, "form" !== this.options.saveStyle && (n.data = jQuery.toJSON(e), n.contentType = "application/json"), jQuery.ajax(s, n)
            }, t.prototype.serialize = function() {
                var t, e, i, n, s;
                for (e = {}, s = this.regions, i = 0, n = s.length; n > i; i++) t = s[i], e[t.name] = t.serialize();
                return e
            }, t
        }()
    }.call(this),
    function() {
        this.Mercury.HistoryBuffer = function() {
            function t(t) {
                this.maxLength = null != t ? t : 200, this.index = 0, this.stack = [], this.markerRegExp = /<em class="mercury-marker"><\/em>/g
            }
            return t.prototype.push = function(t) {
                if ("string" === jQuery.type(t)) {
                    if (this.stack[this.index] && this.stack[this.index].replace(this.markerRegExp, "") === t.replace(this.markerRegExp, "")) return
                } else if ("object" === jQuery.type(t) && t.html && this.stack[this.index] && this.stack[this.index].html === t.html) return;
                return this.stack = this.stack.slice(0, this.index + 1), this.stack.push(t), this.stack.length > this.maxLength && this.stack.shift(), this.index = this.stack.length - 1
            }, t.prototype.undo = function() {
                return this.index < 1 ? null : (this.index -= 1, this.stack[this.index])
            }, t.prototype.redo = function() {
                return this.index >= this.stack.length - 1 ? null : (this.index += 1, this.stack[this.index])
            }, t
        }()
    }.call(this),
    function() {
        this.Mercury.tableEditor = function(t, e, i) {
            return Mercury.tableEditor.load(t, e, i), Mercury.tableEditor
        }, jQuery.extend(Mercury.tableEditor, {
            load: function(t, e, i) {
                return this.table = t, this.cell = e, this.cellContent = null != i ? i : "", this.row = this.cell.parent("tr"), this.columnCount = this.getColumnCount(), this.rowCount = this.getRowCount()
            },
            addColumnBefore: function() {
                return this.addColumn("before")
            },
            addColumnAfter: function() {
                return this.addColumn("after")
            },
            addColumn: function(t) {
                var e, i, n, s, r, o, a, l, c, u, h, d;
                for (null == t && (t = "after"), l = this.cellSignatureFor(this.cell), h = this.table.find("tr"), d = [], e = c = 0, u = h.length; u > c; e = ++c) o = h[e], a = 1, n = "after" === t ? {
                    right: l.right
                } : {
                    left: l.left
                }, (s = this.findCellByOptionsFor(o, n)) ? (r = jQuery("<" + s.cell.get(0).tagName + ">").html(this.cellContent), this.setRowspanFor(r, s.height), "before" === t ? s.cell.before(r) : s.cell.after(r), d.push(e += s.height - 1)) : (i = this.findCellByIntersectionFor(o, l)) ? d.push(this.setColspanFor(i.cell, i.width + 1)) : d.push(void 0);
                return d
            },
            removeColumn: function() {
                var t, e, i, n, s, r, o, a, l, c, u, h, d, p, f, m;
                if (a = this.cellSignatureFor(this.cell), !(a.width > 1)) {
                    for (r = [], t = [], f = this.table.find("tr"), i = l = 0, h = f.length; h > l; i = ++l) o = f[i], (s = this.findCellByOptionsFor(o, {
                        left: a.left,
                        width: a.width
                    })) ? (r.push(s.cell), i += s.height - 1) : (n = this.findCellByIntersectionFor(o, a)) && t.push(n.cell);
                    for (c = 0, d = r.length; d > c; c++) e = r[c], jQuery(e).remove();
                    for (m = [], u = 0, p = t.length; p > u; u++) e = t[u], m.push(this.setColspanFor(e, this.colspanFor(e) - 1));
                    return m
                }
            },
            addRowBefore: function() {
                return this.addRow("before")
            },
            addRowAfter: function() {
                return this.addRow("after")
            },
            addRow: function(t) {
                var e, i, n, s, r, o, a, l, c, u, h, d, p, f, m, g, v;
                for (null == t && (t = "after"), r = jQuery("<tr>"), (l = this.rowspanFor(this.cell)) > 1 && "after" === t && (this.row = jQuery(this.row.nextAll("tr")[l - 2])), i = 0, m = this.row.find("th, td"), c = 0, d = m.length; d > c; c++) e = m[c], n = this.colspanFor(e), s = jQuery("<" + e.tagName + ">").html(this.cellContent), this.setColspanFor(s, n), i += n, (l = this.rowspanFor(e)) > 1 && "after" === t ? this.setRowspanFor(e, l + 1) : r.append(s);
                if (i < this.columnCount)
                    for (a = 0, g = this.row.prevAll("tr"), u = 0, p = g.length; p > u; u++)
                        for (o = g[u], a += 1, v = jQuery(o).find("td[rowspan], th[rowspan]"), h = 0, f = v.length; f > h; h++) e = v[h], l = this.rowspanFor(e), l - 1 >= a && "before" === t ? this.setRowspanFor(e, l + 1) : l - 1 >= a && "after" === t && (l - 1 === a ? (s = jQuery("<" + e.tagName + ">").html(this.cellContent), this.setColspanFor(s, this.colspanFor(e)), r.append(s)) : this.setRowspanFor(e, l + 1));
                return "before" === t ? this.row.before(r) : this.row.after(r)
            },
            removeRow: function() {
                var t, e, i, n, s, r, o, a, l, c, u, h, d, p, f, m, g, v, y, b, w, _, x, C;
                for (l = !0, r = 0, s = 0, b = this.row.find("td, th"), u = 0, f = b.length; f > u; u++) e = b[u], a = this.rowspanFor(e), r && a !== r && (l = !1), (s > a || !s) && (s = a), r = a;
                if (l || !(this.rowspanFor(this.cell) > s)) {
                    if (s > 1)
                        for (i = h = 0, w = s - 2; w >= 0 ? w >= h : h >= w; i = w >= 0 ? ++h : --h) jQuery(this.row.nextAll("tr")[i]).remove();
                    for (_ = this.row.find("td[rowspan], th[rowspan]"), d = 0, m = _.length; m > d; d++) e = _[d], c = this.cellSignatureFor(e), c.height !== s && (n = this.findCellByOptionsFor(this.row.nextAll("tr")[s - 1], {
                        left: c.left,
                        forceAdjacent: !0
                    })) && (this.setRowspanFor(e, this.rowspanFor(e) - this.rowspanFor(this.cell)), "before" === n.direction ? n.cell.before(jQuery(e).clone()) : n.cell.after(jQuery(e).clone()));
                    if (this.columnsFor(this.row.find("td, th")) < this.columnCount)
                        for (o = 0, x = this.row.prevAll("tr"), p = 0, g = x.length; g > p; p++)
                            for (t = x[p], o += 1, C = jQuery(t).find("td[rowspan], th[rowspan]"), y = 0, v = C.length; v > y; y++) e = C[y], a = this.rowspanFor(e), a > o && this.setRowspanFor(e, a - this.rowspanFor(this.cell));
                    return this.row.remove()
                }
            },
            increaseColspan: function() {
                var t;
                return t = this.cell.next("td, th"), !t.length || this.rowspanFor(t) !== this.rowspanFor(this.cell) || this.cellIndexFor(t) > this.cellIndexFor(this.cell) + this.colspanFor(this.cell) ? void 0 : (this.setColspanFor(this.cell, this.colspanFor(this.cell) + this.colspanFor(t)), t.remove())
            },
            decreaseColspan: function() {
                var t;
                if (1 !== this.colspanFor(this.cell)) return this.setColspanFor(this.cell, this.colspanFor(this.cell) - 1), t = jQuery("<" + this.cell.get(0).tagName + ">").html(this.cellContent), this.setRowspanFor(t, this.rowspanFor(this.cell)), this.cell.after(t)
            },
            increaseRowspan: function() {
                var t, e, i;
                return i = this.cellSignatureFor(this.cell), e = this.row.nextAll("tr")[i.height - 1], e && (t = this.findCellByOptionsFor(e, {
                    left: i.left,
                    width: i.width
                })) ? (this.setRowspanFor(this.cell, i.height + t.height), t.cell.remove()) : void 0
            },
            decreaseRowspan: function() {
                var t, e, i, n;
                return n = this.cellSignatureFor(this.cell), 1 !== n.height ? (i = this.row.nextAll("tr")[n.height - 2], (t = this.findCellByOptionsFor(i, {
                    left: n.left,
                    forceAdjacent: !0
                })) ? (e = jQuery("<" + this.cell.get(0).tagName + ">").html(this.cellContent), this.setColspanFor(e, this.colspanFor(this.cell)), this.setRowspanFor(this.cell, n.height - 1), "before" === t.direction ? t.cell.before(e) : t.cell.after(e)) : void 0) : void 0
            },
            getColumnCount: function() {
                return this.columnsFor(this.table.find("thead tr:first-child, tbody tr:first-child, tfoot tr:first-child").first().find("td, th"))
            },
            getRowCount: function() {
                return this.table.find("tr").length
            },
            cellIndexFor: function(t) {
                var e, i, n, s, r, o, a, l, c, u, h, d;
                if (t = jQuery(t), r = t.parent("tr"), n = this.columnsFor(r.find("td, th")), s = this.columnsFor(t.prevAll("td, th")), n < this.columnCount)
                    for (o = 0, h = r.prevAll("tr"), a = 0, c = h.length; c > a; a++)
                        for (i = h[a], o += 1, d = jQuery(i).find("td[rowspan], th[rowspan]"), l = 0, u = d.length; u > l; l++) e = d[l], this.rowspanFor(e) > o && this.cellIndexFor(e) <= s && (s += this.colspanFor(e));
                return s
            },
            cellSignatureFor: function(t) {
                var e;
                return e = {
                    cell: jQuery(t)
                }, e.left = this.cellIndexFor(t), e.width = this.colspanFor(t), e.height = this.rowspanFor(t), e.right = e.left + e.width, e
            },
            findCellByOptionsFor: function(t, e) {
                var i, n, s, r, o, a;
                for (a = jQuery(t).find("td, th"), r = 0, o = a.length; o > r; r++) {
                    if (i = a[r], s = this.cellSignatureFor(i), "undefined" != typeof e.right && s.right === e.right) return s;
                    if ("undefined" != typeof e.left)
                        if (e.width) {
                            if (s.left === e.left && s.width === e.width) return s
                        } else if (e.forceAdjacent) {
                        if (e.forceAdjacent && s.left > e.left) return n = jQuery(i).prev("td, th"), n.length ? (s = this.cellSignatureFor(n), s.direction = "after") : s.direction = "before", s
                    } else if (s.left === e.left) return s
                }
                return e.forceAdjacent ? (s.direction = "after", s) : null
            },
            findCellByIntersectionFor: function(t, e) {
                var i, n, s, r, o;
                for (o = jQuery(t).find("td, th"), s = 0, r = o.length; r > s; s++)
                    if (i = o[s], n = this.cellSignatureFor(i), n.right - e.left >= 0 && n.right > e.left) return n;
                return null
            },
            columnsFor: function(t) {
                var e, i, n, s;
                for (i = 0, n = 0, s = t.length; s > n; n++) e = t[n], i += this.colspanFor(e);
                return i
            },
            colspanFor: function(t) {
                return parseInt(jQuery(t).attr("colspan")) || 1
            },
            rowspanFor: function(t) {
                return parseInt(jQuery(t).attr("rowspan")) || 1
            },
            setColspanFor: function(t, e) {
                return jQuery(t).attr("colspan", e > 1 ? e : null)
            },
            setRowspanFor: function(t, e) {
                return jQuery(t).attr("rowspan", e > 1 ? e : null)
            }
        })
    }.call(this),
    function() {
        this.Mercury.Dialog = function() {
            function t(t, e, i) {
                this.url = t, this.name = e, this.options = null != i ? i : {}, this.button = this.options["for"], this.build(), this.bindEvents(), this.preload()
            }
            return t.prototype.build = function() {
                var t;
                return this.element = jQuery("<div>", {
                    "class": "mercury-dialog mercury-" + this.name + "-dialog loading",
                    style: "display:none"
                }), this.element.appendTo(null != (t = jQuery(this.options.appendTo).get(0)) ? t : "body")
            }, t.prototype.bindEvents = function() {
                return this.element.on("mousedown", function(t) {
                    return t.stopPropagation()
                })
            }, t.prototype.preload = function() {
                return this.options.preload ? this.load() : void 0
            }, t.prototype.toggle = function() {
                return this.visible ? this.hide() : this.show()
            }, t.prototype.resize = function() {
                return this.show()
            }, t.prototype.show = function() {
                return Mercury.trigger("hide:dialogs", this), this.visible = !0, this.loaded ? (this.element.css({
                    width: "auto",
                    height: "auto"
                }), this.position(this.visible)) : this.position(), this.appear()
            }, t.prototype.position = function() {}, t.prototype.appear = function() {
                var t = this;
                return this.element.css({
                    display: "block",
                    opacity: 0
                }), this.element.animate({
                    opacity: .95
                }, 200, "easeInOutSine", function() {
                    return t.loaded ? void 0 : t.load(function() {
                        return t.resize()
                    })
                })
            }, t.prototype.hide = function() {
                return this.element.hide(), this.visible = !1
            }, t.prototype.load = function(t) {
                var e = this;
                if (this.url) return Mercury.preloadedViews[this.url] ? (this.loadContent(Mercury.preloadedViews[this.url]), Mercury.dialogHandlers[this.name] && Mercury.dialogHandlers[this.name].call(this), t ? t() : void 0) : jQuery.ajax(this.url, {
                    success: function(i) {
                        return e.loadContent(i), Mercury.dialogHandlers[e.name] && Mercury.dialogHandlers[e.name].call(e), t ? t() : void 0
                    },
                    error: function() {
                        return e.hide(), e.button && e.button.removeClass("pressed"), Mercury.notify('Mercury was unable to load %s for the "%s" dialog.', e.url, e.name)
                    }
                })
            }, t.prototype.loadContent = function(t) {
                return this.loaded = !0, this.element.removeClass("loading"), this.element.html(t), Mercury.config.localization.enabled ? this.element.localize(Mercury.locale()) : void 0
            }, t
        }()
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, i) {
                function n() {
                    this.constructor = e
                }
                for (var s in i) t.call(i, s) && (e[s] = i[s]);
                return n.prototype = i.prototype, e.prototype = new n, e.__super__ = i.prototype, e
            };
        this.Mercury.Palette = function(t) {
            function i(t, e, n) {
                this.url = t, this.name = e, this.options = null != n ? n : {}, i.__super__.constructor.apply(this, arguments)
            }
            return e(i, t), i.prototype.build = function() {
                var t;
                return this.element = jQuery("<div>", {
                    "class": "mercury-palette mercury-" + this.name + "-palette loading",
                    style: "display:none"
                }), this.element.appendTo(null != (t = jQuery(this.options.appendTo).get(0)) ? t : "body")
            }, i.prototype.bindEvents = function() {
                var t = this;
                return Mercury.on("hide:dialogs", function(e, i) {
                    return i !== t ? t.hide() : void 0
                }), i.__super__.bindEvents.apply(this, arguments)
            }, i.prototype.position = function(t) {
                var e, i;
                return this.element.css({
                    top: 0,
                    left: 0,
                    display: "block",
                    visibility: "hidden"
                }), e = this.button.position(), i = this.element.width(), e.left + i > jQuery(window).width() && (e.left = e.left - i + this.button.width()), this.element.css({
                    top: e.top + this.button.height(),
                    left: e.left,
                    display: t ? "block" : "none",
                    visibility: "visible"
                })
            }, i
        }(Mercury.Dialog)
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, i) {
                function n() {
                    this.constructor = e
                }
                for (var s in i) t.call(i, s) && (e[s] = i[s]);
                return n.prototype = i.prototype, e.prototype = new n, e.__super__ = i.prototype, e
            };
        this.Mercury.Select = function(t) {
            function i(t, e, n) {
                this.url = t, this.name = e, this.options = null != n ? n : {}, i.__super__.constructor.apply(this, arguments)
            }
            return e(i, t), i.prototype.build = function() {
                var t;
                return this.element = jQuery("<div>", {
                    "class": "mercury-select mercury-" + this.name + "-select loading",
                    style: "display:none"
                }), this.element.appendTo(null != (t = jQuery(this.options.appendTo).get(0)) ? t : "body")
            }, i.prototype.bindEvents = function() {
                var t = this;
                return Mercury.on("hide:dialogs", function(e, i) {
                    return i !== t ? t.hide() : void 0
                }), this.element.on("mousedown", function(t) {
                    return t.preventDefault()
                }), i.__super__.bindEvents.apply(this, arguments)
            }, i.prototype.position = function(t) {
                var e, i, n, s, r, o, a;
                return this.element.css({
                    top: 0,
                    left: 0,
                    display: "block",
                    visibility: "hidden"
                }), o = this.button.position(), n = this.element.width(), i = this.element.height(), e = jQuery(document).height(), a = o.top + this.button.height() / 2 - i / 2, a < o.top - 100 && (a = o.top - 100), 20 > a && (a = 20), s = this.loaded ? "auto" : i, a + i >= e - 20 && (s = e - a - 20), r = o.left, r + n > jQuery(window).width() && (r = r - n + this.button.width()), this.element.css({
                    top: a,
                    left: r,
                    height: s,
                    display: t ? "block" : "none",
                    visibility: "visible"
                })
            }, i
        }(Mercury.Dialog)
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, i) {
                function n() {
                    this.constructor = e
                }
                for (var s in i) t.call(i, s) && (e[s] = i[s]);
                return n.prototype = i.prototype, e.prototype = new n, e.__super__ = i.prototype, e
            };
        this.Mercury.Panel = function(t) {
            function i(t, e, n) {
                this.url = t, this.name = e, this.options = null != n ? n : {}, i.__super__.constructor.apply(this, arguments)
            }
            return e(i, t), i.prototype.build = function() {
                var t;
                return this.element = jQuery("<div>", {
                    "class": "mercury-panel loading",
                    style: "display:none;"
                }), this.titleElement = jQuery("<h1><span>" + Mercury.I18n(this.options.title) + "</span></h1>").appendTo(this.element), this.paneElement = jQuery("<div>", {
                    "class": "mercury-panel-pane"
                }).appendTo(this.element), this.options.closeButton && jQuery("<a/>", {
                    "class": "mercury-panel-close"
                }).appendTo(this.titleElement).css({
                    opacity: 0
                }), this.element.appendTo(null != (t = jQuery(this.options.appendTo).get(0)) ? t : "body")
            }, i.prototype.bindEvents = function() {
                var t = this;
                return Mercury.on("resize", function() {
                    return t.position(t.visible)
                }), Mercury.on("hide:panels", function(e, i) {
                    return i !== t ? (t.button.removeClass("pressed"), t.hide()) : void 0
                }), this.titleElement.find(".mercury-panel-close").on("click", function(t) {
                    return t.preventDefault(), Mercury.trigger("hide:panels")
                }), this.element.on("mousedown", function(t) {
                    return t.stopPropagation()
                }), this.element.on("ajax:beforeSend", function(e, i, n) {
                    return n.success = function(e) {
                        return t.loadContent(e), t.resize()
                    }
                }), i.__super__.bindEvents.apply(this, arguments)
            }, i.prototype.show = function() {
                return Mercury.trigger("hide:panels", this), i.__super__.show.apply(this, arguments)
            }, i.prototype.resize = function() {
                var t, e, i, n = this;
                return this.titleElement.find(".mercury-panel-close").css({
                    opacity: 0
                }), this.paneElement.css({
                    display: "none"
                }), i = this.element.width(), this.paneElement.css({
                    visibility: "hidden",
                    width: "auto",
                    display: "block"
                }), e = this.element.width(), this.paneElement.css({
                    visibility: "visible",
                    display: "none"
                }), t = this.element.offset(), this.element.animate({
                    left: t.left - (e - i),
                    width: e
                }, 200, "easeInOutSine", function() {
                    return n.titleElement.find(".mercury-panel-close").animate({
                        opacity: 1
                    }, 100), n.paneElement.css({
                        display: "block",
                        width: e
                    }), jQuery(n.paneElement.find(".focusable").get(0)).focus(), n.makeDraggable()
                }), this.visible ? void 0 : this.hide()
            }, i.prototype.position = function(t) {
                var e, i, n, s, r;
                return this.element.css({
                    display: "block",
                    visibility: "hidden"
                }), s = this.element.offset(), e = this.element.width(), i = Mercury.displayRect.height - 16, r = i - this.titleElement.outerHeight(), this.paneElement.css({
                    height: r,
                    overflowY: 30 > r ? "hidden" : "auto"
                }), this.moved || (n = Mercury.displayRect.width - e - 20), 8 >= n && (n = 8), (this.pinned || e + s.left > Mercury.displayRect.width - 20) && (n = Mercury.displayRect.width - e - 20), this.element.css({
                    top: Mercury.displayRect.top + 8,
                    left: n,
                    height: i,
                    display: t ? "block" : "none",
                    visibility: "visible"
                }), this.makeDraggable(), t ? void 0 : this.element.hide()
            }, i.prototype.loadContent = function(t) {
                return this.loaded = !0, this.element.removeClass("loading"), this.paneElement.css({
                    visibility: "hidden"
                }), this.paneElement.html(t), Mercury.config.localization.enabled ? this.paneElement.localize(Mercury.locale()) : void 0
            }, i.prototype.makeDraggable = function() {
                var t, e = this;
                return t = this.element.width(), this.element.draggable({
                    handle: "h1 span",
                    axis: "x",
                    opacity: .7,
                    scroll: !1,
                    addClasses: !1,
                    iframeFix: !0,
                    containment: [8, 0, Mercury.displayRect.width - t - 20, 0],
                    stop: function() {
                        var i;
                        return i = e.element.offset().left, e.moved = !0, e.pinned = i > Mercury.displayRect.width - t - 30 ? !0 : !1, !0
                    }
                })
            }, i
        }(Mercury.Dialog)
    }.call(this),
    function() {
        var t = function(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        };
        this.Mercury.modal = function(t, e) {
            var i;
            return null == e && (e = {}), i = new Mercury.Modal(t, e), i.show(), i
        }, this.Mercury.Modal = function() {
            function e(e, i) {
                this.url = e, this.options = null != i ? i : {}, this.hide = t(this.hide, this)
            }
            return e.prototype.show = function(t, e) {
                var i, n = this;
                return null == t && (t = null), null == e && (e = null), this.url = t || this.url, this.options = e || this.options, (i = this.options).minWidth || (i.minWidth = 400), this.options.ujsHandling !== !1 && (this.options.ujsHandling = !0), Mercury.trigger("focus:window"), this.initializeModal(), this.visible ? this.update() : this.appear(), this.options.content ? setTimeout(function() {
                    return n.loadContent(n.options.content)
                }, 500) : void 0
            }, e.prototype.initializeModal = function() {
                return this.initialized ? void 0 : (this.build(), this.bindEvents(), this.initialized = !0)
            }, e.prototype.build = function() {
                var t, e;
                return this.element = jQuery(".mercury-modal"), this.overlay = jQuery(".mercury-modal-overlay"), this.element.get(0) && this.overlay.get(0) || (this.element = jQuery("<div>", {
                    "class": "mercury-modal loading"
                }), this.element.html('<h1 class="mercury-modal-title"><span></span><a>&times;</a></h1>'), this.element.append('<div class="mercury-modal-content-container"><div class="mercury-modal-content"></div></div>'), this.overlay = jQuery("<div>", {
                    "class": "mercury-modal-overlay"
                }), this.element.appendTo(null != (t = jQuery(this.options.appendTo).get(0)) ? t : "body"), this.overlay.appendTo(null != (e = jQuery(this.options.appendTo).get(0)) ? e : "body")), this.titleElement = this.element.find(".mercury-modal-title"), this.contentContainerElement = this.element.find(".mercury-modal-content-container"), this.contentElement = this.element.find(".mercury-modal-content")
            }, e.prototype.bindEvents = function() {
                var t = this;
                return Mercury.on("refresh", function() {
                    return t.resize(!0)
                }), Mercury.on("resize", function() {
                    return t.position()
                }), this.overlay.on("click", function() {
                    return t.options.allowHideUsingOverlay ? t.hide() : void 0
                }), this.titleElement.find("a").on("click", function() {
                    return t.hide()
                }), this.options.ujsHandling && this.element.on("ajax:beforeSend", function(e, i, n) {
                    return n.success = function(e) {
                        return t.loadContent(e)
                    }
                }), jQuery(document).on("keydown", function(e) {
                    return 27 === e.keyCode && t.visible ? t.hide() : void 0
                })
            }, e.prototype.appear = function() {
                var t = this;
                return this.showing = !0, this.position(), this.overlay.show(), this.overlay.animate({
                    opacity: 1
                }, 200, "easeInOutSine", function() {
                    return t.element.css({
                        top: -t.element.height()
                    }), t.setTitle(), t.element.show(), t.element.animate({
                        top: 0
                    }, 200, "easeInOutSine", function() {
                        return t.visible = !0, t.showing = !1, t.load()
                    })
                })
            }, e.prototype.resize = function(t) {
                var e, i, n, s, r = this;
                return n = t ? "visible" : "hidden", i = this.titleElement.outerHeight(), s = this.contentElement.outerWidth(), this.contentPane && this.contentPane.css({
                    height: "auto"
                }), this.contentElement.css({
                    height: "auto",
                    visibility: n,
                    display: "block"
                }), e = this.contentElement.outerHeight() + i, s < this.options.minWidth && (s = this.options.minWidth), (e > Mercury.displayRect.fullHeight || this.options.fullHeight) && (e = Mercury.displayRect.fullHeight), this.element.stop().animate({
                    left: (Mercury.displayRect.width - s) / 2,
                    width: s,
                    height: e
                }, 200, "easeInOutSine", function() {
                    var t;
                    return r.contentElement.css({
                        visibility: "visible",
                        display: "block"
                    }), r.contentPane.length ? (r.contentElement.css({
                        height: e - i,
                        overflow: "visible"
                    }), t = r.contentControl.length ? r.contentControl.outerHeight() + 10 : 0, r.contentPane.css({
                        height: e - i - t - 20
                    }), r.contentPane.find(".mercury-display-pane").css({
                        width: s - 20
                    })) : r.contentElement.css({
                        height: e - i,
                        overflow: "auto"
                    })
                })
            }, e.prototype.position = function() {
                var t, e, i, n, s;
                return n = Mercury.displayRect.width, this.contentPane && this.contentPane.css({
                    height: "auto"
                }), this.contentElement.css({
                    height: "auto"
                }), this.element.css({
                    width: "auto",
                    height: "auto",
                    display: "block",
                    visibility: "hidden"
                }), s = this.element.width(), e = this.element.height(), s < this.options.minWidth && (s = this.options.minWidth), (e > Mercury.displayRect.fullHeight || this.options.fullHeight) && (e = Mercury.displayRect.fullHeight), i = this.titleElement.outerHeight(), this.contentPane && this.contentPane.length ? (this.contentElement.css({
                    height: e - i,
                    overflow: "visible"
                }), t = this.contentControl.length ? this.contentControl.outerHeight() + 10 : 0, this.contentPane.css({
                    height: e - i - t - 20
                }), this.contentPane.find(".mercury-display-pane").css({
                    width: s - 20
                })) : this.contentElement.css({
                    height: e - i,
                    overflow: "auto"
                }), this.element.css({
                    left: (n - s) / 2,
                    width: s,
                    height: e,
                    display: this.visible ? "block" : "none",
                    visibility: "visible"
                })
            }, e.prototype.update = function() {
                return this.reset(), this.resize(), this.load()
            }, e.prototype.load = function() {
                var t = this;
                return this.setTitle(), this.url ? (this.element.addClass("loading"), Mercury.preloadedViews[this.url] ? setTimeout(function() {
                    return t.loadContent(Mercury.preloadedViews[t.url])
                }, 10) : jQuery.ajax(this.url, {
                    headers: Mercury.ajaxHeaders(),
                    type: this.options.loadType || "GET",
                    data: this.options.loadData,
                    success: function(e) {
                        return t.loadContent(e)
                    },
                    error: function() {
                        return t.hide(), Mercury.notify("Mercury was unable to load %s for the modal.", t.url)
                    }
                })) : void 0
            }, e.prototype.loadContent = function(t, e) {
                return null == e && (e = null), this.initializeModal(), this.options = e || this.options, this.setTitle(), this.loaded = !0, this.element.removeClass("loading"), this.contentElement.html(t), this.contentElement.css({
                    display: "none",
                    visibility: "hidden"
                }), this.contentPane = this.element.find(".mercury-display-pane-container"), this.contentControl = this.element.find(".mercury-display-controls"), this.options.afterLoad && this.options.afterLoad.call(this), this.options.handler && (Mercury.modalHandlers[this.options.handler] ? "function" == typeof Mercury.modalHandlers[this.options.handler] ? Mercury.modalHandlers[this.options.handler].call(this) : (jQuery.extend(this, Mercury.modalHandlers[this.options.handler]), this.initialize()) : Mercury.lightviewHandlers[this.options.handler] && ("function" == typeof Mercury.lightviewHandlers[this.options.handler] ? Mercury.lightviewHandlers[this.options.handler].call(this) : (jQuery.extend(this, Mercury.lightviewHandlers[this.options.handler]), this.initialize()))), Mercury.config.localization.enabled && this.element.localize(Mercury.locale()), this.element.find(".modal-close").on("click", this.hide), this.resize()
            }, e.prototype.setTitle = function() {
                var t;
                return this.titleElement.find("span").html(Mercury.I18n(this.options.title)), t = this.titleElement.find("a"), this.options.closeButton === !1 ? t.hide() : t.show()
            }, e.prototype.serializeForm = function() {
                return this.element.find("form").serializeObject() || {}
            }, e.prototype.reset = function() {
                return this.titleElement.find("span").html(""), this.contentElement.html("")
            }, e.prototype.hide = function() {
                return this.showing ? void 0 : (this.options = {}, Mercury.trigger("focus:frame"), this.element.hide(), this.overlay.hide(), this.reset(), this.visible = !1)
            }, e
        }()
    }.call(this),
    function() {
        var t = function(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        };
        this.Mercury.lightview = function(t, e) {
            var i;
            return null == e && (e = {}), (i = Mercury.lightview).instance || (i.instance = new Mercury.Lightview(t, e)), Mercury.lightview.instance.show(t, e), Mercury.lightview.instance
        }, this.Mercury.Lightview = function() {
            function e(e, i) {
                this.url = e, this.options = null != i ? i : {}, this.hide = t(this.hide, this)
            }
            return e.prototype.show = function(t, e) {
                var i = this;
                return this.url = t || this.url, this.options = e || this.options, this.options.ujsHandling !== !1 && (this.options.ujsHandling = !0), Mercury.trigger("focus:window"), this.initializeLightview(), this.visible ? this.update() : this.appear(), this.options.content ? setTimeout(function() {
                    return i.loadContent(i.options.content)
                }, 500) : void 0
            }, e.prototype.initializeLightview = function() {
                return this.initialized ? void 0 : (this.build(), this.bindEvents(), this.initialized = !0)
            }, e.prototype.build = function() {
                var t, e;
                return this.element = jQuery("<div>", {
                    "class": "mercury-lightview loading"
                }), this.element.html('<h1 class="mercury-lightview-title"><span></span></h1>'), this.element.append('<div class="mercury-lightview-content"></div>'), this.overlay = jQuery("<div>", {
                    "class": "mercury-lightview-overlay"
                }), this.titleElement = this.element.find(".mercury-lightview-title"), this.options.closeButton && this.titleElement.append('<a class="mercury-lightview-close"></a>'), this.contentElement = this.element.find(".mercury-lightview-content"), this.element.appendTo(null != (t = jQuery(this.options.appendTo).get(0)) ? t : "body"), this.overlay.appendTo(null != (e = jQuery(this.options.appendTo).get(0)) ? e : "body")
            }, e.prototype.bindEvents = function() {
                var t = this;
                return Mercury.on("refresh", function() {
                    return t.resize(!0)
                }), Mercury.on("resize", function() {
                    return t.visible ? t.position() : void 0
                }), this.overlay.on("click", function() {
                    return t.options.closeButton ? void 0 : t.hide()
                }), this.titleElement.find(".mercury-lightview-close").on("click", function() {
                    return t.hide()
                }), this.options.ujsHandling && this.element.on("ajax:beforeSend", function(e, i, n) {
                    return n.success = function(e) {
                        return t.loadContent(e)
                    }
                }), jQuery(document).on("keydown", function(e) {
                    return 27 === e.keyCode && t.visible ? t.hide() : void 0
                })
            }, e.prototype.appear = function() {
                var t = this;
                return this.showing = !0, this.position(), this.overlay.show().css({
                    opacity: 0
                }), this.overlay.animate({
                    opacity: 1
                }, 200, "easeInOutSine", function() {
                    return t.setTitle(), t.element.show().css({
                        opacity: 0
                    }), t.element.stop().animate({
                        opacity: 1
                    }, 200, "easeInOutSine", function() {
                        return t.visible = !0, t.showing = !1, t.load()
                    })
                })
            }, e.prototype.resize = function(t) {
                var e, i, n, s, r, o, a = this;
                return r = t ? "visible" : "hidden", s = Mercury.displayRect.width, n = Mercury.displayRect.fullHeight, i = this.titleElement.outerHeight(), o = this.contentElement.outerWidth(), (o > s - 40 || this.options.fullSize) && (o = s - 40), this.contentPane && this.contentPane.css({
                    height: "auto"
                }), this.contentElement.css({
                    height: "auto",
                    visibility: r,
                    display: "block"
                }), e = this.contentElement.outerHeight() + i, (e > n - 20 || this.options.fullSize) && (e = n - 20), 300 > o && (o = 300), 150 > e && (e = 150), this.element.stop().animate({
                    top: (n - e) / 2 + 10,
                    left: (Mercury.displayRect.width - o) / 2,
                    width: o,
                    height: e
                }, 200, "easeInOutSine", function() {
                    var t;
                    return a.contentElement.css({
                        visibility: "visible",
                        display: "block"
                    }), a.contentPane.length ? (a.contentElement.css({
                        height: e - i,
                        overflow: "visible"
                    }), t = a.contentControl.length ? a.contentControl.outerHeight() : 0, a.contentPane.css({
                        height: e - i - t - 40
                    }), a.contentPane.find(".mercury-display-pane").css({
                        width: o - 40
                    })) : a.contentElement.css({
                        height: e - i - 30,
                        overflow: "auto"
                    })
                })
            }, e.prototype.position = function() {
                var t, e, i, n, s, r;
                return s = Mercury.displayRect.width, n = Mercury.displayRect.fullHeight, this.contentPane && this.contentPane.css({
                    height: "auto"
                }), this.contentElement.css({
                    height: "auto"
                }), this.element.css({
                    width: "auto",
                    height: "auto",
                    display: "block",
                    visibility: "hidden"
                }), r = this.contentElement.width() + 40, e = this.contentElement.height() + this.titleElement.outerHeight() + 30, (r > s - 40 || this.options.fullSize) && (r = s - 40), (e > n - 20 || this.options.fullSize) && (e = n - 20), 300 > r && (r = 300), 150 > e && (e = 150), i = this.titleElement.outerHeight(), this.contentPane && this.contentPane.length ? (this.contentElement.css({
                    height: e - i,
                    overflow: "visible"
                }), t = this.contentControl.length ? this.contentControl.outerHeight() : 0, this.contentPane.css({
                    height: e - i - t - 40
                }), this.contentPane.find(".mercury-display-pane").css({
                    width: r - 40
                })) : this.contentElement.css({
                    height: e - i - 30,
                    overflow: "auto"
                }), this.element.css({
                    top: (n - e) / 2 + 10,
                    left: (s - r) / 2,
                    width: r,
                    height: e,
                    display: this.visible ? "block" : "none",
                    visibility: "visible"
                })
            }, e.prototype.update = function() {
                return this.reset(), this.resize(), this.load()
            }, e.prototype.load = function() {
                var t = this;
                return this.setTitle(), this.url ? (this.element.addClass("loading"), Mercury.preloadedViews[this.url] ? setTimeout(function() {
                    return t.loadContent(Mercury.preloadedViews[t.url])
                }, 10) : jQuery.ajax(this.url, {
                    headers: Mercury.ajaxHeaders(),
                    type: this.options.loadType || "GET",
                    data: this.options.loadData,
                    success: function(e) {
                        return t.loadContent(e)
                    },
                    error: function() {
                        return t.hide(), Mercury.notify("Mercury was unable to load %s for the lightview.", t.url)
                    }
                })) : void 0
            }, e.prototype.loadContent = function(t, e) {
                return null == e && (e = null), this.initializeLightview(), this.options = e || this.options, this.setTitle(), this.loaded = !0, this.element.removeClass("loading"), this.contentElement.html(t), this.contentElement.css({
                    display: "none",
                    visibility: "hidden"
                }), this.contentPane = this.element.find(".mercury-display-pane-container"), this.contentControl = this.element.find(".mercury-display-controls"), this.options.afterLoad && this.options.afterLoad.call(this), this.options.handler && (Mercury.modalHandlers[this.options.handler] ? "function" == typeof Mercury.modalHandlers[this.options.handler] ? Mercury.modalHandlers[this.options.handler].call(this) : (jQuery.extend(this, Mercury.modalHandlers[this.options.handler]), this.initialize()) : Mercury.lightviewHandlers[this.options.handler] && ("function" == typeof Mercury.lightviewHandlers[this.options.handler] ? Mercury.lightviewHandlers[this.options.handler].call(this) : (jQuery.extend(this, Mercury.lightviewHandlers[this.options.handler]), this.initialize()))), Mercury.config.localization.enabled && this.element.localize(Mercury.locale()), this.element.find(".lightview-close").on("click", this.hide), this.resize()
            }, e.prototype.setTitle = function() {
                return this.titleElement.find("span").html(Mercury.I18n(this.options.title))
            }, e.prototype.serializeForm = function() {
                return this.element.find("form").serializeObject() || {}
            }, e.prototype.reset = function() {
                return this.titleElement.find("span").html(""), this.contentElement.html("")
            }, e.prototype.hide = function() {
                return this.showing ? void 0 : (this.options = {}, Mercury.trigger("focus:frame"), this.element.hide(), this.overlay.hide(), this.reset(), this.visible = !1)
            }, e
        }()
    }.call(this),
    function() {
        this.Mercury.Statusbar = function() {
            function t(t) {
                this.options = null != t ? t : {}, this.visible = this.options.visible, this.build(), this.bindEvents()
            }
            return t.prototype.build = function() {
                var t;
                return this.element = jQuery("<div>", {
                    "class": "mercury-statusbar"
                }), this.aboutElement = jQuery("<a>", {
                    "class": "mercury-statusbar-about"
                }).appendTo(this.element).html("Mercury Editor v" + Mercury.version), this.pathElement = jQuery("<div>", {
                    "class": "mercury-statusbar-path"
                }).appendTo(this.element), this.visible || this.element.css({
                    visibility: "hidden"
                }), this.element.appendTo(null != (t = jQuery(this.options.appendTo).get(0)) ? t : "body")
            }, t.prototype.bindEvents = function() {
                var t = this;
                return Mercury.on("region:update", function(e, i) {
                    return i.region && "function" === jQuery.type(i.region.path) ? t.setPath(i.region.path()) : void 0
                }), this.aboutElement.on("click", function() {
                    return Mercury.lightview("/mercury/lightviews/about.html", {
                        title: "Mercury Editor v" + Mercury.version
                    })
                })
            }, t.prototype.height = function() {
                return this.element.outerHeight()
            }, t.prototype.top = function() {
                var t, e;
                return e = this.element.offset().top, t = parseInt(this.element.css("bottom")) < 0 ? e - this.element.outerHeight() : e, this.visible ? t : e + this.element.outerHeight()
            }, t.prototype.setPath = function(t) {
                var e, i, n, s;
                for (i = [], n = 0, s = t.length; s > n; n++) e = t[n], i.push("<a>" + e.tagName.toLowerCase() + "</a>");
                return this.pathElement.html("<span><strong>" + Mercury.I18n("Path:") + " </strong>" + i.reverse().join(" &raquo; ") + "</span>")
            }, t.prototype.show = function() {
                return this.visible = !0, this.element.css({
                    opacity: 0,
                    visibility: "visible"
                }), this.element.animate({
                    opacity: 1
                }, 200, "easeInOutSine")
            }, t.prototype.hide = function() {
                return this.visible = !1, this.element.css({
                    visibility: "hidden"
                })
            }, t
        }()
    }.call(this),
    function() {
        var t = {}.hasOwnProperty;
        this.Mercury.Toolbar = function() {
            function e(t) {
                this.options = null != t ? t : {}, this.visible = this.options.visible, this.build(), this.bindEvents()
            }
            return e.prototype.build = function() {
                var e, i, n, s, r, o, a, l, c, u;
                this.element = jQuery("<div>", {
                    "class": "mercury-toolbar-container",
                    style: "width:10000px"
                }), this.element.css({
                    width: "100%"
                }), this.element.appendTo(null != (c = jQuery(this.options.appendTo).get(0)) ? c : "body"), u = Mercury.config.toolbars;
                for (l in u)
                    if (t.call(u, l) && (n = u[l], !n._custom)) {
                        a = jQuery("<div>", {
                            "class": "mercury-toolbar mercury-" + l + "-toolbar"
                        }).appendTo(this.element), n._regions && a.attr("data-regions", n._regions), s = jQuery("<div>", {
                            "class": "mercury-toolbar-button-container"
                        }).appendTo(a);
                        for (i in n) t.call(n, i) && (o = n[i], "_regions" !== i && (e = this.buildButton(i, o), e && e.appendTo(s)));
                        "nowrap" === s.css("white-space") && (r = new Mercury.Toolbar.Expander(l, {
                            appendTo: a,
                            "for": s
                        }), r.appendTo(this.element)), Mercury.config.toolbars.primary && "primary" !== l && a.addClass("disabled")
                    }
                return this.visible ? void 0 : this.element.css({
                    display: "none"
                })
            }, e.prototype.buildButton = function(e, i) {
                var n, s, r, o, a, l, c;
                if ("_" === e[0]) return !1;
                switch (jQuery.type(i)) {
                    case "array":
                        return c = i[0], l = i[1], o = i[2], new Mercury.Toolbar.Button(e, c, l, o, {
                            appendDialogsTo: this.element
                        });
                    case "object":
                        r = new Mercury.Toolbar.ButtonGroup(e, i);
                        for (n in i) t.call(i, n) && (a = i[n], s = this.buildButton(n, a), s && s.appendTo(r));
                        return r;
                    case "string":
                        return jQuery("<hr>", {
                            "class": "mercury-" + ("-" === i ? "line-separator" : "separator")
                        });
                    default:
                        throw Mercury.I18n('Unknown button structure -- please provide an array, object, or string for "%s".', e)
                }
            }, e.prototype.bindEvents = function() {
                var t = this;
                return Mercury.on("region:focused", function(e, i) {
                    var n, s, r, o, a, l;
                    for (a = t.element.find(".mercury-toolbar"), l = [], r = 0, o = a.length; o > r; r++) s = a[r], s = jQuery(s), (n = s.data("regions")) ? n.split(",").indexOf(i.region.type()) > -1 ? l.push(s.removeClass("disabled")) : l.push(void 0) : l.push(void 0);
                    return l
                }), Mercury.on("region:blurred", function(e, i) {
                    var n, s, r, o, a, l;
                    for (a = t.element.find(".mercury-toolbar"), l = [], r = 0, o = a.length; o > r; r++) s = a[r], s = jQuery(s), (n = s.data("regions")) ? n.split(",").indexOf(i.region.type()) > -1 ? l.push(s.addClass("disabled")) : l.push(void 0) : l.push(void 0);
                    return l
                }), this.element.on("click", function() {
                    return Mercury.trigger("hide:dialogs")
                }), this.element.on("mousedown", function(t) {
                    return t.preventDefault()
                })
            }, e.prototype.height = function(t) {
                return null == t && (t = !1), this.visible || t ? this.element.outerHeight() : 0
            }, e.prototype.top = function() {
                return this.visible ? this.element.offset().top : 0
            }, e.prototype.show = function() {
                return this.visible = !0, this.element.css({
                    top: -this.element.outerHeight(),
                    display: "block"
                }), this.element.animate({
                    top: 0
                }, 200, "easeInOutSine")
            }, e.prototype.hide = function() {
                return this.visible = !1, this.element.hide()
            }, e
        }()
    }.call(this),
    function() {
        var t = {}.hasOwnProperty;
        this.Mercury.Toolbar.Button = function() {
            function e(t, e, i, n, s) {
                return this.name = t, this.title = e, this.summary = null != i ? i : null, this.types = null != n ? n : {}, this.options = null != s ? s : {}, this.title && (this.title = Mercury.I18n(this.title)), this.summary && (this.summary = Mercury.I18n(this.summary)), this.build(), this.bindEvents(), this.element
            }
            return e.prototype.build = function() {
                var e, i, n, s, r, o;
                this.element = jQuery("<div>", {
                    title: null != (s = this.summary) ? s : this.title,
                    "class": "mercury-button mercury-" + this.name + "-button"
                }).html("<em>" + this.title + "</em>"), this.element.data("expander", '<div class="mercury-expander-button" data-button="' + this.name + '"><em></em><span>' + this.title + "</span></div>"), this.handled = {}, r = this.types, o = [];
                for (n in r)
                    if (t.call(r, n)) switch (e = r[n], n) {
                        case "preload":
                            o.push(!0);
                            break;
                        case "regions":
                            this.element.addClass("disabled"), o.push(this.handled[n] = jQuery.isFunction(e) ? e.call(this, this.name) : e);
                            break;
                        case "toggle":
                            o.push(this.handled[n] = !0);
                            break;
                        case "mode":
                            o.push(this.handled[n] = e === !0 ? this.name : e);
                            break;
                        case "context":
                            o.push(this.handled[n] = jQuery.isFunction(e) ? e : Mercury.Toolbar.Button.contexts[this.name]);
                            break;
                        case "palette":
                            this.element.addClass("mercury-button-palette"), i = jQuery.isFunction(e) ? e.call(this, this.name) : e, o.push(this.handled[n] = "string" == typeof i ? new Mercury.Palette(i, this.name, this.defaultDialogOptions()) : i);
                            break;
                        case "select":
                            this.element.addClass("mercury-button-select").find("em").html(this.title), i = jQuery.isFunction(e) ? e.call(this, this.name) : e, o.push(this.handled[n] = "string" == typeof i ? new Mercury.Select(i, this.name, this.defaultDialogOptions()) : i);
                            break;
                        case "panel":
                            this.element.addClass("mercury-button-panel"), this.handled.toggle = !0, i = jQuery.isFunction(e) ? e.call(this, this.name) : e, o.push(this.handled[n] = "string" == typeof i ? new Mercury.Panel(i, this.name, this.defaultDialogOptions()) : i);
                            break;
                        case "modal":
                            o.push(this.handled[n] = jQuery.isFunction(e) ? e.call(this, this.name) : e);
                            break;
                        case "lightview":
                            o.push(this.handled[n] = jQuery.isFunction(e) ? e.call(this, this.name) : e);
                            break;
                        default:
                            throw Mercury.I18n('Unknown button type "%s" used for the "%s" button.', n, this.name)
                    }
                    return o
            }, e.prototype.bindEvents = function() {
                var t = this;
                return Mercury.on("button", function(e, i) {
                    return i.action === t.name ? t.element.click() : void 0
                }), Mercury.on("mode", function(e, i) {
                    return t.handled.mode === i.mode && t.handled.toggle ? t.togglePressed() : void 0
                }), Mercury.on("region:update", function(e, i) {
                    var n;
                    return t.handled.context && i.region && "function" === jQuery.type(i.region.currentElement) ? (n = i.region.currentElement(), n.length && t.handled.context.call(t, n, i.region.element) ? t.element.addClass("active") : t.element.removeClass("active")) : t.element.removeClass("active")
                }), Mercury.on("region:focused", function(e, i) {
                    return t.handled.regions && i.region && i.region.type() ? t.handled.regions.indexOf(i.region.type()) > -1 ? t.element.removeClass("disabled") : t.element.addClass("disabled") : void 0
                }), Mercury.on("region:blurred", function() {
                    return t.handled.regions ? t.element.addClass("disabled") : void 0
                }), this.element.on("mousedown", function() {
                    return t.element.addClass("active")
                }), this.element.on("mouseup", function() {
                    return t.element.removeClass("active")
                }), this.element.on("click", function(e) {
                    return t.element.closest(".disabled").length ? void 0 : t.handleClick(e)
                })
            }, e.prototype.handleClick = function(e) {
                var i, n, s, r;
                i = !1, r = this.handled;
                for (s in r)
                    if (t.call(r, s)) switch (n = r[s], s) {
                        case "toggle":
                            this.handled.mode || this.togglePressed();
                            break;
                        case "mode":
                            i = !0, Mercury.trigger("mode", {
                                mode: n
                            });
                            break;
                        case "modal":
                            i = this.handleModal(e);
                            break;
                        case "lightview":
                            i = this.handleLightview(e);
                            break;
                        case "palette":
                        case "select":
                        case "panel":
                            i = this.handleDialog(e, s)
                    }
                    return i || Mercury.trigger("action", {
                        action: this.name
                    }), this.options.regions && this.options.regions.length ? Mercury.trigger("focus:frame") : void 0
            }, e.prototype.handleModal = function() {
                return Mercury.modal(this.handled.modal, {
                    title: this.summary || this.title,
                    handler: this.name
                }), !0
            }, e.prototype.handleLightview = function() {
                return Mercury.lightview(this.handled.lightview, {
                    title: this.summary || this.title,
                    handler: this.name,
                    closeButton: !0
                }), !0
            }, e.prototype.handleDialog = function(t, e) {
                return t.stopPropagation(), this.handled[e].toggle(), !0
            }, e.prototype.defaultDialogOptions = function() {
                return {
                    title: this.summary || this.title,
                    preload: this.types.preload,
                    appendTo: this.options.appendDialogsTo || "body",
                    closeButton: !0,
                    "for": this.element
                }
            }, e.prototype.togglePressed = function() {
                return this.element.toggleClass("pressed")
            }, e
        }(), this.Mercury.Toolbar.Button.contexts = {
            backColor: function(t) {
                return this.element.css("background-color", t.css("background-color"))
            },
            foreColor: function(t) {
                return this.element.css("background-color", t.css("color"))
            },
            bold: function(t) {
                var e;
                return e = t.css("font-weight"), "bold" === e || e > 400
            },
            italic: function(t) {
                return "italic" === t.css("font-style")
            },
            overline: function(t) {
                var e, i, n, s;
                if ("overline" === t.css("text-decoration")) return !0;
                for (s = t.parentsUntil(this.element), i = 0, n = s.length; n > i; i++)
                    if (e = s[i], "overline" === jQuery(e).css("text-decoration")) return !0;
                return !1
            },
            strikethrough: function(t, e) {
                return "line-through" === t.css("text-decoration") || !!t.closest("strike", e).length
            },
            underline: function(t, e) {
                return "underline" === t.css("text-decoration") || !!t.closest("u", e).length
            },
            subscript: function(t, e) {
                return !!t.closest("sub", e).length
            },
            superscript: function(t, e) {
                return !!t.closest("sup", e).length
            },
            justifyLeft: function(t) {
                return t.css("text-align").indexOf("left") > -1
            },
            justifyCenter: function(t) {
                return t.css("text-align").indexOf("center") > -1
            },
            justifyRight: function(t) {
                return t.css("text-align").indexOf("right") > -1
            },
            justifyFull: function(t) {
                return t.css("text-align").indexOf("justify") > -1
            },
            insertOrderedList: function(t, e) {
                return !!t.closest("ol", e.element).length
            },
            insertUnorderedList: function(t, e) {
                return !!t.closest("ul", e.element).length
            }
        }
    }.call(this),
    function() {
        this.Mercury.Toolbar.ButtonGroup = function() {
            function t(t, e) {
                return this.name = t, this.options = null != e ? e : {}, this.build(), this.bindEvents(), this.regions = this.options._regions, this.element
            }
            return t.prototype.build = function() {
                return this.element = jQuery("<div>", {
                    "class": "mercury-button-group mercury-" + this.name + "-group"
                }), this.options._context || this.options._regions ? this.element.addClass("disabled") : void 0
            }, t.prototype.bindEvents = function() {
                var t = this;
                return Mercury.on("region:update", function(e, i) {
                    var n, s;
                    return n = Mercury.Toolbar.ButtonGroup.contexts[t.name], n && i.region && "function" === jQuery.type(i.region.currentElement) ? (s = i.region.currentElement(), s.length && n.call(t, s, i.region.element) ? t.element.removeClass("disabled") : t.element.addClass("disabled")) : void 0
                }), Mercury.on("region:focused", function(e, i) {
                    if (t.regions && i.region && i.region.type()) {
                        if (!(t.regions.indexOf(i.region.type()) > -1)) return t.element.addClass("disabled");
                        if (!t.options._context) return t.element.removeClass("disabled")
                    }
                }), Mercury.on("region:blurred", function() {
                    return t.options.regions ? t.element.addClass("disabled") : void 0
                })
            }, t
        }(), this.Mercury.Toolbar.ButtonGroup.contexts = {
            table: function(t, e) {
                return !!t.closest("table", e).length
            }
        }
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, i) {
                function n() {
                    this.constructor = e
                }
                for (var s in i) t.call(i, s) && (e[s] = i[s]);
                return n.prototype = i.prototype, e.prototype = new n, e.__super__ = i.prototype, e
            };
        this.Mercury.Toolbar.Expander = function(t) {
            function i(t, e) {
                return this.name = t, this.options = e, this.container = this.options["for"], i.__super__.constructor.call(this, null, this.name, this.options), this.element
            }
            return e(i, t), i.prototype.build = function() {
                var t;
                return this.container.css({
                    whiteSpace: "normal",
                    visibility: "hidden",
                    display: "block"
                }), this.container.css({
                    visibility: "visible"
                }), this.trigger = jQuery("<div>", {
                    "class": "mercury-toolbar-expander"
                }).appendTo(null != (t = jQuery(this.options.appendTo).get(0)) ? t : "body"), this.element = jQuery("<div>", {
                    "class": "mercury-palette mercury-expander mercury-" + this.name + "-expander",
                    style: "display:none"
                }), this.windowResize()
            }, i.prototype.bindEvents = function() {
                var t = this;
                return Mercury.on("hide:dialogs", function(e, i) {
                    return i !== t ? t.hide() : void 0
                }), Mercury.on("resize", function() {
                    return t.windowResize()
                }), i.__super__.bindEvents.apply(this, arguments), this.trigger.click(function(e) {
                    var i, n, s, r, o;
                    for (e.stopPropagation(), n = [], o = t.container.find(".mercury-button"), s = 0, r = o.length; r > s; s++) i = o[s], i = jQuery(i), i.position().top > 5 && n.push(i.data("expander"));
                    return t.loadContent(n.join("")), t.toggle()
                }), this.element.click(function(e) {
                    var i, n;
                    return n = jQuery(e.target).closest("[data-button]").data("button"), i = t.container.find(".mercury-" + n + "-button"), i.click()
                })
            }, i.prototype.windowResize = function() {
                return jQuery(window).width() === this.container.outerWidth() ? this.trigger.show() : this.trigger.hide(), this.hide()
            }, i.prototype.position = function(t) {
                var e, i;
                return this.element.css({
                    top: 0,
                    left: 0,
                    display: "block",
                    visibility: "hidden"
                }), e = this.trigger.position(), i = this.element.width(), e.left + i > jQuery(window).width() && (e.left = e.left - i + this.trigger.width()), this.element.css({
                    top: e.top + this.trigger.height(),
                    left: e.left,
                    display: t ? "block" : "none",
                    visibility: "visible"
                })
            }, i
        }(Mercury.Palette)
    }.call(this),
    function() {
        this.Mercury.tooltip = function(t, e, i) {
            return null == i && (i = {}), Mercury.tooltip.show(t, e, i), Mercury.tooltip
        }, jQuery.extend(Mercury.tooltip, {
            show: function(t, e, i) {
                return this.forElement = t, this.content = e, this.options = null != i ? i : {}, this.document = this.forElement.get(0).ownerDocument, this.initialize(), this.visible ? this.update() : this.appear()
            },
            initialize: function() {
                return this.initialized ? void 0 : (this.build(), this.bindEvents(), this.initialized = !0)
            },
            build: function() {
                var t;
                return this.element = jQuery("<div>", {
                    "class": "mercury-tooltip"
                }), this.element.appendTo(null != (t = jQuery(this.options.appendTo).get(0)) ? t : "body")
            },
            bindEvents: function() {
                var t, e, i, n, s = this;
                for (Mercury.on("resize", function() {
                        return s.visible ? s.position() : void 0
                    }), this.element.on("mousedown", function(t) {
                        return t.preventDefault(), t.stopPropagation()
                    }), n = this.forElement.parentsUntil(jQuery("body", this.document)), e = 0, i = n.length; i > e; e++) t = n[e], t.scrollHeight > t.clientHeight && jQuery(t).on("scroll", function() {
                    return s.visible ? s.position() : void 0
                });
                return jQuery(this.document).on("scroll", function() {
                    return s.visible ? s.position() : void 0
                })
            },
            appear: function() {
                var t = this;
                return this.update(), this.element.show(), this.element.animate({
                    opacity: 1
                }, 200, "easeInOutSine", function() {
                    return t.visible = !0
                })
            },
            update: function() {
                return this.element.html(this.content), this.position()
            },
            position: function() {
                var t, e, i, n;
                return e = this.forElement.offset(), n = this.element.width(), i = e.top + (Mercury.displayRect.top - jQuery(this.document).scrollTop()) + this.forElement.outerHeight(), t = e.left - jQuery(this.document).scrollLeft(), t + n + 25 > Mercury.displayRect.width && (t = t - (t + n + 25) - Mercury.displayRect.width), t = 0 >= t ? 0 : t, this.element.css({
                    top: i,
                    left: t
                })
            },
            hide: function() {
                return this.initialized ? (this.element.hide(), this.visible = !1) : void 0
            }
        })
    }.call(this),
    function() {
        var t = {}.hasOwnProperty;
        this.Mercury.Snippet = function() {
            function e(t, e, i) {
                this.name = t, this.identity = e, null == i && (i = {}), this.version = 0, this.data = "", this.wrapperTag = "div", this.wrapperClass = "", this.history = new Mercury.HistoryBuffer, this.setOptions(i)
            }
            return e.all = [], e.displayOptionsFor = function(t, e, i) {
                var n;
                return null == e && (e = {}), null == i && (i = !0), i ? Mercury.modal(this.optionsUrl(t), jQuery.extend({
                    title: "Snippet Options",
                    handler: "insertSnippet",
                    snippetName: t,
                    loadType: Mercury.config.snippets.method
                }, e)) : (n = Mercury.Snippet.create(t), Mercury.trigger("action", {
                    action: "insertSnippet",
                    value: n
                })), Mercury.snippet = null
            }, e.optionsUrl = function(t) {
                var e;
                return e = Mercury.config.snippets.optionsUrl, "function" == typeof e && (e = e()), e.replace(":name", t)
            }, e.previewUrl = function(t) {
                var e;
                return e = Mercury.config.snippets.previewUrl, "function" == typeof e && (e = e()), e.replace(":name", t)
            }, e.create = function(t, e) {
                var i;
                return i = new Mercury.Snippet(t, this.uniqueId(), e), this.all.push(i), i
            }, e.uniqueId = function() {
                var t, e, i, n, s;
                for (s = [0, "snippet_0"], t = s[0], i = s[1], e = function() {
                        var t, e, i, s;
                        for (i = this.all, s = [], t = 0, e = i.length; e > t; t++) n = i[t], s.push(n.identity);
                        return s
                    }.call(this); - 1 !== e.indexOf(i);) t += 1, i = "snippet_" + t;
                return i
            }, e.find = function(t) {
                var e, i, n, s;
                for (s = this.all, i = 0, n = s.length; n > i; i++)
                    if (e = s[i], e.identity === t) return e;
                return null
            }, e.load = function(e) {
                var i, n, s, r;
                r = [];
                for (n in e) t.call(e, n) && (i = e[n], s = new Mercury.Snippet(i.name, n, i), r.push(this.all.push(s)));
                return r
            }, e.clearAll = function() {
                return delete this.all, this.all = []
            }, e.prototype.getHTML = function(t, e) {
                var i, n;
                return null == e && (e = null), n = "" + this.name + "-snippet", this.wrapperClass && (n += " " + this.wrapperClass), i = jQuery("<" + this.wrapperTag + ">", {
                    "class": n,
                    contenteditable: "false",
                    "data-snippet": this.identity,
                    "data-version": this.version
                }, t), i.html("[" + this.identity + "]"), this.loadPreview(i, e), i
            }, e.prototype.getText = function() {
                return "[--" + this.identity + "--]"
            }, e.prototype.loadPreview = function(t, i) {
                var n = this;
                return null == i && (i = null), jQuery.ajax(e.previewUrl(this.name), {
                    headers: Mercury.ajaxHeaders(),
                    type: Mercury.config.snippets.method,
                    data: this.options,
                    success: function(e) {
                        return n.data = e, t.html(e), i ? i() : void 0
                    },
                    error: function() {
                        return Mercury.notify('Error loading the preview for the "%s" snippet.', n.name)
                    }
                })
            }, e.prototype.displayOptions = function() {
                return Mercury.snippet = this, Mercury.modal(e.optionsUrl(this.name), {
                    title: "Snippet Options",
                    handler: "insertSnippet",
                    loadType: Mercury.config.snippets.method,
                    loadData: this.options
                })
            }, e.prototype.setOptions = function(t) {
                return this.options = t, delete this.options.authenticity_token, delete this.options.utf8, this.options.wrapperTag && (this.wrapperTag = this.options.wrapperTag), this.options.wrapperClass && (this.wrapperClass = this.options.wrapperClass), this.version += 1, this.history.push(this.options)
            }, e.prototype.setVersion = function(t) {
                return null == t && (t = null), t = parseInt(t), t && this.history.stack[t - 1] ? (this.version = t, this.options = this.history.stack[t - 1], !0) : !1
            }, e.prototype.serialize = function() {
                return $.extend({
                    name: this.name
                }, this.options)
            }, e
        }()
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, i) {
                function n() {
                    this.constructor = e
                }
                for (var s in i) t.call(i, s) && (e[s] = i[s]);
                return n.prototype = i.prototype, e.prototype = new n, e.__super__ = i.prototype, e
            };
        this.Mercury.SnippetToolbar = function(i) {
            function n(t, e) {
                this.document = t, this.options = null != e ? e : {}, this._boundEvents = [], n.__super__.constructor.call(this, this.options)
            }
            return e(n, i), n.prototype.build = function() {
                var e, i, n, s, r, o;
                this.element = jQuery("<div>", {
                    "class": "mercury-toolbar mercury-snippet-toolbar",
                    style: "display:none"
                }), this.element.appendTo(null != (s = jQuery(this.options.appendTo).get(0)) ? s : "body"), r = Mercury.config.toolbars.snippets, o = [];
                for (i in r) t.call(r, i) && (n = r[i], e = this.buildButton(i, n), e ? o.push(e.appendTo(this.element)) : o.push(void 0));
                return o
            }, n.prototype.bindEvents = function() {
                var t = this;
                return this.bindReleasableEvent(Mercury, "show:toolbar", function(e, i) {
                    return i.snippet ? (i.snippet.mouseout(function() {
                        return t.hide()
                    }), t.show(i.snippet)) : void 0
                }), this.bindReleasableEvent(Mercury, "hide:toolbar", function(e, i) {
                    return i.type && "snippet" === i.type ? t.hide(i.immediately) : void 0
                }), this.bindReleasableEvent(jQuery(this.document), "scroll", function() {
                    return t.visible ? t.position() : void 0
                }), this.element.mousemove(function() {
                    return clearTimeout(t.hideTimeout)
                }), this.element.mouseout(function() {
                    return t.hide()
                })
            }, n.prototype.bindReleasableEvent = function(t, e, i) {
                return t.on(e, i), this._boundEvents.push([t, e, i])
            }, n.prototype.show = function(t) {
                return this.snippet = t, Mercury.tooltip.hide(), this.position(), this.appear()
            }, n.prototype.position = function() {
                var t, e, i;
                return e = this.snippet.offset(), i = e.top + Mercury.displayRect.top - jQuery(this.document).scrollTop() - this.height() + 10, t = e.left - jQuery(this.document).scrollLeft(), this.element.css({
                    top: i,
                    left: t
                })
            }, n.prototype.appear = function() {
                return clearTimeout(this.hideTimeout), this.visible ? void 0 : (this.visible = !0, this.element.css({
                    display: "block",
                    opacity: 0
                }), this.element.stop().animate({
                    opacity: 1
                }, 200, "easeInOutSine"))
            }, n.prototype.hide = function(t) {
                var e = this;
                return null == t && (t = !1), clearTimeout(this.hideTimeout), t ? (this.element.hide(), this.visible = !1) : this.hideTimeout = setTimeout(function() {
                    return e.element.stop().animate({
                        opacity: 0
                    }, 300, "easeInOutSine", function() {
                        return e.element.hide()
                    }), e.visible = !1
                }, 500)
            }, n.prototype.release = function() {
                var t, e, i, n, s, r, o;
                for (this.element.off(), this.element.remove(), r = this._boundEvents, n = 0, s = r.length; s > n; n++) o = r[n], i = o[0], t = o[1], e = o[2], i.off(t, e);
                return this._boundEvents = []
            }, n
        }(Mercury.Toolbar)
    }.call(this),
    function() {
        this.Mercury.Region = function() {
            function t(t, e, i) {
                this.element = t, this.window = e, this.options = null != i ? i : {}, Mercury.log("building " + this.type(), this.element, this.options), this.document = this.window.document, this.name = this.element.attr(Mercury.config.regions.identifier), this.history = new Mercury.HistoryBuffer, this.build(), this.bindEvents(), this.pushHistory(), this.element.data("region", this)
            }
            return t.prototype.type = function() {
                return "unknown"
            }, t.prototype.build = function() {}, t.prototype.focus = function() {}, t.prototype.bindEvents = function() {
                var t = this;
                return Mercury.on("mode", function(e, i) {
                    return "preview" === i.mode ? t.togglePreview() : void 0
                }), Mercury.on("focus:frame", function() {
                    return t.previewing || Mercury.region !== t ? void 0 : t.focus()
                }), Mercury.on("action", function(e, i) {
                    return t.previewing || Mercury.region !== t || e.isDefaultPrevented() ? void 0 : i.action ? t.execCommand(i.action, i) : void 0
                }), this.element.on("mousemove", function(e) {
                    var i;
                    if (!t.previewing && Mercury.region === t) return i = jQuery(e.target).closest("[data-snippet]"), i.length && (t.snippet = i, t.snippet.data("snippet")) ? Mercury.trigger("show:toolbar", {
                        type: "snippet",
                        snippet: t.snippet
                    }) : void 0
                }), this.element.on("mouseout", function() {
                    return t.previewing ? void 0 : Mercury.trigger("hide:toolbar", {
                        type: "snippet",
                        immediately: !1
                    })
                })
            }, t.prototype.content = function(t, e) {
                var i, n, s, r, o;
                if (null == t && (t = null), null == e && (e = !1), null !== t) return this.element.html(t);
                if (i = document.createElement("div"), i.innerHTML = this.element.html().replace(/^\s+|\s+$/g, ""), i = $(i), e)
                    for (o = i.find("[data-snippet]"), s = 0, r = o.length; r > s; s++) n = o[s], n = jQuery(n), n.attr({
                        contenteditable: null,
                        "data-version": null
                    }), n.html("[" + n.data("snippet") + "]");
                return i.html()
            }, t.prototype.togglePreview = function() {
                return this.previewing ? (this.previewing = !1, this.element.attr(Mercury.config.regions.attribute, this.type()), Mercury.region === this ? this.focus() : void 0) : (this.previewing = !0, this.element.removeAttr(Mercury.config.regions.attribute), Mercury.trigger("region:blurred", {
                    region: this
                }))
            }, t.prototype.execCommand = function(t, e) {
                return null == e && (e = {}), this.focus(), "redo" !== t && this.pushHistory(), Mercury.log("execCommand", t, e.value), Mercury.changes = !0
            }, t.prototype.pushHistory = function() {
                return this.history.push(this.content())
            }, t.prototype.snippets = function() {
                var t, e, i, n, s, r;
                for (i = {}, r = this.element.find("[data-snippet]"), n = 0, s = r.length; s > n; n++) t = r[n], e = Mercury.Snippet.find(jQuery(t).data("snippet")), e && (i[e.identity] = e.serialize());
                return i
            }, t.prototype.dataAttributes = function() {
                var t, e, i, n, s;
                for (e = {}, s = Mercury.config.regions.dataAttributes, i = 0, n = s.length; n > i; i++) t = s[i], e[t] = (this.container || this.element).attr("data-" + t);
                return e
            }, t.prototype.serialize = function() {
                return {
                    type: this.type(),
                    data: this.dataAttributes(),
                    value: this.content(null, !0),
                    snippets: this.snippets()
                }
            }, t
        }()
    }.call(this),
    function() {
        var t = {}.hasOwnProperty;
        this.Mercury.uploader = function(t, e) {
            return Mercury.config.uploading.enabled && Mercury.uploader.show(t, e), Mercury.uploader
        }, jQuery.extend(Mercury.uploader, {
            show: function(t, e) {
                return this.options = null != e ? e : {}, this.file = new Mercury.uploader.File(t), this.file.errors ? (alert("Error: " + this.file.errors), void 0) : this.supported() ? (Mercury.trigger("focus:window"), this.initialize(), this.appear()) : void 0
            },
            initialize: function() {
                return this.initialized ? void 0 : (this.build(), this.bindEvents(), this.initialized = !0)
            },
            supported: function() {
                var t;
                return t = new XMLHttpRequest, window.Uint8Array && window.ArrayBuffer && !XMLHttpRequest.prototype.sendAsBinary && (XMLHttpRequest.prototype.sendAsBinary = function(t) {
                    var e, i, n, s, r;
                    for (n = new Uint8Array(t.length), i = s = 0, r = t.length; r > s; i = ++s) e = t[i], n[i] = 255 & t.charCodeAt(i);
                    return this.send(n.buffer)
                }), !(!t.upload || !t.sendAsBinary || !Mercury.uploader.fileReaderSupported() && !Mercury.uploader.formDataSupported())
            },
            fileReaderSupported: function() {
                return !!window.FileReader
            },
            formDataSupported: function() {
                return !!window.FormData
            },
            build: function() {
                var t, e;
                return this.element = jQuery("<div>", {
                    "class": "mercury-uploader",
                    style: "display:none"
                }), this.element.append('<div class="mercury-uploader-preview"><b><img/></b></div>'), this.element.append('<div class="mercury-uploader-details"></div>'), this.element.append('<div class="mercury-uploader-progress"><span></span><div class="mercury-uploader-indicator"><div><b>0%</b></div></div></div>'), this.updateStatus("Processing..."), this.overlay = jQuery("<div>", {
                    "class": "mercury-uploader-overlay",
                    style: "display:none"
                }), this.element.appendTo(null != (t = jQuery(this.options.appendTo).get(0)) ? t : "body"), this.overlay.appendTo(null != (e = jQuery(this.options.appendTo).get(0)) ? e : "body")
            },
            bindEvents: function() {
                var t = this;
                return Mercury.on("resize", function() {
                    return t.position()
                })
            },
            appear: function() {
                var t = this;
                return this.fillDisplay(), this.position(), this.overlay.show(), this.overlay.animate({
                    opacity: 1
                }, 200, "easeInOutSine", function() {
                    return t.element.show(), t.element.animate({
                        opacity: 1
                    }, 200, "easeInOutSine", function() {
                        return t.visible = !0, t.loadImage()
                    })
                })
            },
            position: function() {
                var t, e;
                return e = this.element.outerWidth(), t = this.element.outerHeight(), this.element.css({
                    top: (Mercury.displayRect.height - t) / 2,
                    left: (Mercury.displayRect.width - e) / 2
                })
            },
            fillDisplay: function() {
                var t;
                return t = [Mercury.I18n("Name: %s", this.file.name), Mercury.I18n("Size: %s", this.file.readableSize), Mercury.I18n("Type: %s", this.file.type)], this.element.find(".mercury-uploader-details").html(t.join("<br/>"))
            },
            loadImage: function() {
                var t = this;
                return Mercury.uploader.fileReaderSupported() ? this.file.readAsDataURL(function(e) {
                    return t.element.find(".mercury-uploader-preview b").html(jQuery("<img>", {
                        src: e
                    })), t.upload()
                }) : this.upload()
            },
            upload: function() {
                var t, e, i = this;
                return e = new XMLHttpRequest, jQuery.each(["onloadstart", "onprogress", "onload", "onabort", "onerror"], function(t, n) {
                    return e.upload[n] = function(t) {
                        return i.uploaderEvents[n].call(i, t)
                    }
                }), e.onload = function(t) {
                    var e, n, s;
                    if (t.currentTarget.status >= 400) return i.updateStatus("Error: Unable to upload the file"), Mercury.notify("Unable to process response: %s", t.currentTarget.status), i.hide();
                    try {
                        if (n = Mercury.config.uploading.handler ? Mercury.config.uploading.handler(t.target.responseText) : jQuery.parseJSON(t.target.responseText), s = n.url || n.image.url, !s) throw "Malformed response from server.";
                        return Mercury.trigger("action", {
                            action: "insertImage",
                            value: {
                                src: s
                            }
                        }), i.hide()
                    } catch (r) {
                        return e = r, i.updateStatus("Error: Unable to upload the file"), Mercury.notify("Unable to process response: %s", e), i.hide()
                    }
                }, e.open("post", Mercury.config.uploading.url, !0), e.setRequestHeader("Accept", "application/json, text/javascript, text/html, application/xml, text/xml, */*"), e.setRequestHeader("X-Requested-With", "XMLHttpRequest"), e.setRequestHeader(Mercury.config.csrfHeader, Mercury.csrfToken), Mercury.uploader.fileReaderSupported() ? this.file.readAsBinaryString(function(t) {
                    var n;
                    return n = new Mercury.uploader.MultiPartPost(Mercury.config.uploading.inputName, i.file, t), i.file.updateSize(n.delta), e.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + n.boundary), e.sendAsBinary(n.body)
                }) : (t = new FormData, t.append(Mercury.config.uploading.inputName, this.file.file, this.file.file.name), e.send(t))
            },
            updateStatus: function(t, e) {
                var i;
                return this.element.find(".mercury-uploader-progress span").html(Mercury.I18n(t).toString()), e ? (i = Math.floor(100 * e / this.file.size) + "%", this.element.find(".mercury-uploader-indicator div").css({
                    width: i
                }), this.element.find(".mercury-uploader-indicator b").html(i).show()) : void 0
            },
            hide: function(t) {
                var e = this;
                return null == t && (t = 0), setTimeout(function() {
                    return e.element.animate({
                        opacity: 0
                    }, 200, "easeInOutSine", function() {
                        return e.overlay.animate({
                            opacity: 0
                        }, 200, "easeInOutSine", function() {
                            return e.overlay.hide(), e.element.hide(), e.reset(), e.visible = !1, Mercury.trigger("focus:frame")
                        })
                    })
                }, 1e3 * t)
            },
            reset: function() {
                return this.element.find(".mercury-uploader-preview b").html(""), this.element.find(".mercury-uploader-indicator div").css({
                    width: 0
                }), this.element.find(".mercury-uploader-indicator b").html("0%").hide(), this.updateStatus("Processing...")
            },
            uploaderEvents: {
                onloadstart: function() {
                    return this.updateStatus("Uploading...")
                },
                onprogress: function(t) {
                    return this.updateStatus("Uploading...", t.loaded)
                },
                onabort: function() {
                    return this.updateStatus("Aborted"), this.hide(1)
                },
                onload: function() {
                    return this.updateStatus("Successfully uploaded...", this.file.size)
                },
                onerror: function() {
                    return this.updateStatus("Error: Unable to upload the file"), this.hide(3)
                }
            }
        }), Mercury.uploader.File = function() {
            function t(t) {
                var e;
                this.file = t, this.fullSize = this.size = this.file.size || this.file.fileSize, this.readableSize = this.size.toBytes(), this.name = this.file.name || this.file.fileName, this.type = this.file.type || this.file.fileType, e = [], this.size >= Mercury.config.uploading.maxFileSize && e.push(Mercury.I18n("Too large")), Mercury.config.uploading.allowedMimeTypes.indexOf(this.type) > -1 || e.push(Mercury.I18n("Unsupported format")), e.length && (this.errors = e.join(" / "))
            }
            return t.prototype.readAsDataURL = function(t) {
                var e;
                return null == t && (t = null), e = new FileReader, e.readAsDataURL(this.file), e.onload = function() {
                    return t ? t(e.result) : void 0
                }
            }, t.prototype.readAsBinaryString = function(t) {
                var e;
                return null == t && (t = null), e = new FileReader, e.readAsBinaryString(this.file), e.onload = function() {
                    return t ? t(e.result) : void 0
                }
            }, t.prototype.updateSize = function(t) {
                return this.fullSize = this.size + t
            }, t
        }(), Mercury.uploader.MultiPartPost = function() {
            function e(t, e, i, n) {
                this.inputName = t, this.file = e, this.contents = i, this.formInputs = null != n ? n : {}, this.boundary = "Boundaryx20072377098235644401115438165x", this.body = "", this.buildBody(), this.delta = this.body.length - this.file.size
            }
            return e.prototype.buildBody = function() {
                var e, i, n, s;
                e = "--" + this.boundary, s = this.formInputs;
                for (i in s) t.call(s, i) && (n = s[i], this.body += "" + e + '\r\nContent-Disposition: form-data; name="' + i + '"\r\n\r\n' + unescape(encodeURIComponent(n)) + "\r\n");
                return this.body += "" + e + '\r\nContent-Disposition: form-data; name="' + this.inputName + '"; filename="' + this.file.name + '"\r\nContent-Type: ' + this.file.type + "\r\nContent-Transfer-Encoding: binary\r\n\r\n" + this.contents + "\r\n" + e + "--"
            }, e
        }()
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, i) {
                function n() {
                    this.constructor = e
                }
                for (var s in i) t.call(i, s) && (e[s] = i[s]);
                return n.prototype = i.prototype, e.prototype = new n, e.__super__ = i.prototype, e
            },
            i = [].indexOf || function(t) {
                for (var e = 0, i = this.length; i > e; e++)
                    if (e in this && this[e] === t) return e;
                return -1
            };
        this.Mercury.Regions.Full = function(t) {
            function n(t, e, i) {
                this.element = t, this.window = e, this.options = null != i ? i : {}, n.__super__.constructor.apply(this, arguments)
            }
            var s;
            return e(n, t), n.supported = document.designMode && !jQuery.browser.konqueror && (!jQuery.browser.msie || jQuery.browser.msie && parseFloat(jQuery.browser.version, 10) >= 10), n.supportedText = "Chrome 10+, Firefox 4+, Safari 5+, Opera 11.64+", s = "full", n.prototype.type = function() {
                return s
            }, n.prototype.build = function() {
                var t, e, i, n, s;
                for (jQuery.browser.mozilla && "" === this.content() && this.content("&nbsp;"), this.element.data({
                        originalOverflow: this.element.css("overflow")
                    }), this.element.css({
                        overflow: "auto"
                    }), this.specialContainer = jQuery.browser.mozilla && "DIV" !== this.element.get(0).tagName, this.element.get(0).contentEditable = !0, s = this.element.find("[data-snippet]"), i = 0, n = s.length; n > i; i++) e = s[i], e.contentEditable = !1, jQuery(e).attr("data-version", "1");
                if (!this.document.mercuryEditing) {
                    this.document.mercuryEditing = !0;
                    try {
                        return this.document.execCommand("styleWithCSS", !1, !1), this.document.execCommand("insertBROnReturn", !1, !0), this.document.execCommand("enableInlineTableEditing", !1, !1), this.document.execCommand("enableObjectResizing", !1, !1)
                    } catch (r) {
                        t = r
                    }
                }
            }, n.prototype.bindEvents = function() {
                var t = this;
                return n.__super__.bindEvents.apply(this, arguments), Mercury.on("region:update", function() {
                    var e, i, n;
                    if (!t.previewing && Mercury.region === t) return setTimeout(function() {
                        return t.selection().forceSelection(t.element.get(0))
                    }, 1), i = t.currentElement(), i.length ? (n = i.closest("table", t.element), n.length && Mercury.tableEditor(n, i.closest("tr, td"), "<br/>"), e = i.closest("a", t.element), e.length && e.attr("href") ? Mercury.tooltip(e, '<a href="' + e.attr("href") + '" target="_blank">' + e.attr("href") + "</a>", {
                        position: "below"
                    }) : Mercury.tooltip.hide()) : void 0
                }), this.element.on("dragenter", function(e) {
                    return t.previewing ? void 0 : (Mercury.snippet || e.preventDefault(), e.originalEvent.dataTransfer.dropEffect = "copy")
                }), this.element.on("dragover", function(e) {
                    return t.previewing ? void 0 : (Mercury.snippet || e.preventDefault(), e.originalEvent.dataTransfer.dropEffect = "copy")
                }), this.element.on("drop", function(e) {
                    return !t.previewing && (clearTimeout(t.dropTimeout), t.dropTimeout = setTimeout(function() {
                        return t.element.trigger("possible:drop")
                    }, 1), e.originalEvent.dataTransfer.files.length) ? (e.preventDefault(), t.focus(), Mercury.uploader(e.originalEvent.dataTransfer.files[0])) : void 0
                }), this.element.on("possible:drop", function() {
                    return t.previewing ? void 0 : Mercury.snippet ? (t.focus(), Mercury.Snippet.displayOptionsFor(Mercury.snippet.name, {}, Mercury.snippet.hasOptions), t.document.execCommand("undo", !1, null)) : void 0
                }), this.element.on("paste", function(e) {
                    if (!t.previewing && Mercury.region === t) {
                        if (t.specialContainer) return e.preventDefault(), void 0;
                        if (!t.pasting) return Mercury.changes = !0, t.handlePaste(e.originalEvent)
                    }
                }), this.element.on("focus", function() {
                    return t.previewing ? void 0 : (Mercury.region = t, setTimeout(function() {
                        return t.selection().forceSelection(t.element.get(0))
                    }, 1), Mercury.trigger("region:focused", {
                        region: t
                    }))
                }), this.element.on("blur", function() {
                    return t.previewing ? void 0 : (Mercury.trigger("region:blurred", {
                        region: t
                    }), Mercury.tooltip.hide())
                }), this.element.on("click", function(e) {
                    return t.previewing ? jQuery(e.target).closest("a").attr("target", "_parent") : void 0
                }), this.element.on("dblclick", function(e) {
                    var i;
                    if (!t.previewing) return i = jQuery(e.target).closest("img", t.element), i.length ? (t.selection().selectNode(i.get(0), !0), Mercury.trigger("button", {
                        action: "insertMedia"
                    })) : void 0
                }), this.element.on("mouseup", function() {
                    return t.previewing ? void 0 : (t.pushHistory(), Mercury.trigger("region:update", {
                        region: t
                    }))
                }), this.element.on("keydown", function(e) {
                    var i;
                    if (!t.previewing) {
                        switch (e.keyCode) {
                            case 90:
                                if (!e.metaKey) return;
                                return e.preventDefault(), e.shiftKey ? t.execCommand("redo") : t.execCommand("undo"), void 0;
                            case 13:
                                jQuery.browser.webkit && 0 === t.selection().commonAncestor().closest("li, ul, ol", t.element).length ? (e.preventDefault(), t.document.execCommand("insertParagraph", !1, null)) : (t.specialContainer || jQuery.browser.opera) && (e.preventDefault(), t.document.execCommand("insertHTML", !1, "<br/>"));
                                break;
                            case 9:
                                e.preventDefault(), i = t.selection().commonAncestor(), i.closest("li", t.element).length ? e.shiftKey ? i.parents("ul, ol").length > 1 && t.execCommand("outdent") : t.execCommand("indent") : t.execCommand("insertHTML", {
                                    value: "&nbsp;&nbsp;"
                                })
                        }
                        if (e.metaKey) switch (e.keyCode) {
                            case 66:
                                t.execCommand("bold"), e.preventDefault();
                                break;
                            case 73:
                                t.execCommand("italic"), e.preventDefault();
                                break;
                            case 85:
                                t.execCommand("underline"), e.preventDefault()
                        }
                        return t.pushHistory(e.keyCode)
                    }
                }), this.element.on("keyup", function() {
                    return t.previewing ? void 0 : (Mercury.trigger("region:update", {
                        region: t
                    }), Mercury.changes = !0)
                })
            }, n.prototype.focus = function() {
                var t, e = this;
                if (Mercury.region !== this) {
                    setTimeout(function() {
                        return e.element.focus()
                    }, 10);
                    try {
                        this.selection().selection.collapseToStart()
                    } catch (i) {
                        t = i
                    }
                } else setTimeout(function() {
                    return e.element.focus()
                }, 10);
                return Mercury.trigger("region:focused", {
                    region: this
                }), Mercury.trigger("region:update", {
                    region: this
                })
            }, n.prototype.content = function(t, e, i) {
                var n, s, r, o, a, l, c, u, h, d, p, f, m, g;
                if (null == t && (t = null), null == e && (e = !0), null == i && (i = !1), null !== t) {
                    for (n = jQuery("<div>").appendTo(this.document.createDocumentFragment()), n.html(t), m = n.find("[data-snippet]"), h = 0, p = m.length; p > h; h++)
                        if (r = m[h], r.contentEditable = !1, r = jQuery(r), c = Mercury.Snippet.find(r.data("snippet")))
                            if (r.data("version")) c.setVersion(r.data("version"));
                            else try {
                                u = parseInt(r.html().match(/\/(\d+)\]/)[1]), u && (c.setVersion(u), r.attr({
                                    "data-version": u
                                }), r.html(c.data))
                            } catch (v) {
                                o = v
                            }
                            return this.element.html(n.html()), this.selection().selectMarker(this.element)
                }
                if (this.element.find("meta").remove(), i && (l = this.selection(), l.placeMarker()), n = jQuery("<div>").appendTo(this.document.createDocumentFragment()), n.html(this.element.html().replace(/^\s+|\s+$/g, "")), e)
                    for (g = n.find("[data-snippet]"), a = d = 0, f = g.length; f > d; a = ++d) r = g[a], r = jQuery(r), (c = Mercury.Snippet.find(r.data("snippet"))) && (c.data = r.html()), r.html("[" + r.data("snippet") + "/" + r.data("version") + "]"), r.attr({
                        contenteditable: null,
                        "data-version": null
                    });
                return s = n.html(), i && l.removeMarker(), s
            }, n.prototype.togglePreview = function() {
                return this.previewing ? (this.element.get(0).contentEditable = !0, this.element.css({
                    overflow: "auto"
                })) : (this.content(this.content()), this.element.get(0).contentEditable = !1, this.element.css({
                    overflow: this.element.data("originalOverflow")
                }), this.element.blur()), n.__super__.togglePreview.apply(this, arguments)
            }, n.prototype.execCommand = function(t, e) {
                var i, s, r;
                if (null == e && (e = {}), n.__super__.execCommand.apply(this, arguments), s = Mercury.config.behaviors[t] || Mercury.Regions.Full.actions[t]) s.call(this, this.selection(), e);
                else {
                    "indent" === t && (r = this.element.get(0).previousSibling), "insertHTML" === t && e.value && e.value.get && (e.value = jQuery("<div>").html(e.value).html());
                    try {
                        this.document.execCommand(t, !1, e.value)
                    } catch (o) {
                        i = o, "indent" === t && this.element.prev() !== r && this.element.prev().remove()
                    }
                }
                return this.element.find("img").one("error", function() {
                    return jQuery(this).attr({
                        src: "/assets/mercury/missing-image.png",
                        title: "Image not found"
                    })
                })
            }, n.prototype.pushHistory = function(t) {
                var e, i, n, s = this;
                return e = [13, 46, 8], n = 2.5, t && (i = e.indexOf(t)), clearTimeout(this.historyTimeout), i >= 0 && i !== this.lastKnownKeyCode ? this.history.push(this.content(null, !1, !0)) : t ? this.historyTimeout = setTimeout(function() {
                    return s.history.push(s.content(null, !1, !0))
                }, 1e3 * n) : this.history.push(this.content(null, !1, !0)), this.lastKnownKeyCode = i
            }, n.prototype.selection = function() {
                return new Mercury.Regions.Full.Selection(this.window.getSelection(), this.document)
            }, n.prototype.path = function() {
                var t;
                return t = this.selection().commonAncestor(), t ? t.get(0) === this.element.get(0) ? [] : t.parentsUntil(this.element) : []
            }, n.prototype.currentElement = function() {
                var t, e;
                return t = [], e = this.selection(), e.range && (t = e.commonAncestor(), 3 === t.get(0).nodeType && (t = t.parent())), t
            }, n.prototype.handlePaste = function(t) {
                var e, i, n = this;
                return "text" === Mercury.config.pasting.sanitize && t.clipboardData ? (this.execCommand("insertHTML", {
                    value: t.clipboardData.getData("text/plain")
                }), t.preventDefault(), void 0) : (i = this.selection(), i.placeMarker(), e = jQuery("#mercury_sanitizer", this.document).focus(), setTimeout(function() {
                    var t;
                    return t = n.sanitize(e), i.selectMarker(n.element), i.removeMarker(), n.element.focus(), n.execCommand("insertHTML", {
                        value: t
                    })
                }, 1))
            }, n.prototype.sanitize = function(t) {
                var e, n, s, r, o, a, l, c, u, h, d, p, f, m;
                if (t.find("[" + Mercury.config.regions.attribute + "]").remove(), t.find('[src*="webkit-fake-url://"]').remove(), Mercury.config.pasting.sanitize) switch (Mercury.config.pasting.sanitize) {
                    case "blacklist":
                        t.find("[style]").removeAttr("style"), t.find('[class="Apple-style-span"]').removeClass("Apple-style-span"), o = t.html();
                        break;
                    case "whitelist":
                        for (d = t.find("*"), l = 0, u = d.length; u > l; l++) {
                            a = d[l], e = !1, p = Mercury.config.pasting.whitelist;
                            for (s in p)
                                if (n = p[s], a.tagName.toLowerCase() === s.toLowerCase()) {
                                    for (e = !0, f = jQuery(a.attributes), c = 0, h = f.length; h > c; c++) r = f[c], m = r.name, i.call(n, m) < 0 && jQuery(a).removeAttr(r.name);
                                    break
                                }
                            e || jQuery(a).replaceWith(jQuery(a).contents())
                        }
                        o = t.html();
                        break;
                    default:
                        o = t.text()
                } else o = t.html(), (o.indexOf("<!--StartFragment-->") > -1 || o.indexOf('="mso-') > -1 || o.indexOf("<o:") > -1 || o.indexOf('="Mso') > -1) && (o = t.text());
                return t.html(""), o
            }, n.actions = {
                insertRowBefore: function() {
                    return Mercury.tableEditor.addRow("before")
                },
                insertRowAfter: function() {
                    return Mercury.tableEditor.addRow("after")
                },
                insertColumnBefore: function() {
                    return Mercury.tableEditor.addColumn("before")
                },
                insertColumnAfter: function() {
                    return Mercury.tableEditor.addColumn("after")
                },
                deleteColumn: function() {
                    return Mercury.tableEditor.removeColumn()
                },
                deleteRow: function() {
                    return Mercury.tableEditor.removeRow()
                },
                increaseColspan: function() {
                    return Mercury.tableEditor.increaseColspan()
                },
                decreaseColspan: function() {
                    return Mercury.tableEditor.decreaseColspan()
                },
                increaseRowspan: function() {
                    return Mercury.tableEditor.increaseRowspan()
                },
                decreaseRowspan: function() {
                    return Mercury.tableEditor.decreaseRowspan()
                },
                undo: function() {
                    return this.content(this.history.undo())
                },
                redo: function() {
                    return this.content(this.history.redo())
                },
                horizontalRule: function() {
                    return this.execCommand("insertHTML", {
                        value: "<hr/>"
                    })
                },
                removeFormatting: function(t) {
                    return t.insertTextNode(t.textContent())
                },
                backColor: function(t, e) {
                    return t.wrap('<span style="background-color:' + e.value.toHex() + '">', !0)
                },
                overline: function(t) {
                    return t.wrap('<span style="text-decoration:overline">', !0)
                },
                style: function(t, e) {
                    return t.wrap('<span class="' + e.value + '">', !0)
                },
                replaceHTML: function(t, e) {
                    return this.content(e.value)
                },
                insertImage: function(t, e) {
                    return this.execCommand("insertHTML", {
                        value: jQuery("<img/>", e.value)
                    })
                },
                insertTable: function(t, e) {
                    return this.execCommand("insertHTML", {
                        value: e.value
                    })
                },
                insertLink: function(t, e) {
                    var i;
                    return i = jQuery("<" + e.value.tagName + ">", this.document).attr(e.value.attrs).html(e.value.content), t.insertNode(i)
                },
                replaceLink: function(t, e) {
                    var i, n;
                    return i = jQuery("<" + e.value.tagName + ">", this.document).attr(e.value.attrs).html(e.value.content), t.selectNode(e.node), n = jQuery("<div>").html(t.content()).find("a").html(), t.replace(jQuery(i, t.context).html(n))
                },
                insertSnippet: function(t, e) {
                    var i, n;
                    return n = e.value, (i = this.element.find("[data-snippet=" + n.identity + "]")).length && t.selectNode(i.get(0)), t.insertNode(n.getHTML(this.document))
                },
                editSnippet: function() {
                    var t;
                    if (this.snippet) return t = Mercury.Snippet.find(this.snippet.data("snippet")), t.displayOptions()
                },
                removeSnippet: function() {
                    return this.snippet && this.snippet.remove(), Mercury.trigger("hide:toolbar", {
                        type: "snippet",
                        immediately: !0
                    })
                }
            }, n
        }(Mercury.Region), Mercury.Regions.Full.Selection = function() {
            function t(t, e) {
                this.selection = t, this.context = e, this.selection.rangeCount >= 1 && (this.range = this.selection.getRangeAt(0), this.fragment = this.range.cloneContents(), this.clone = this.range.cloneRange(), this.collapsed = this.selection.isCollapsed)
            }
            return t.prototype.commonAncestor = function(t) {
                var e;
                return null == t && (t = !1), this.range ? (e = this.range.commonAncestorContainer, 3 === e.nodeType && t && (e = e.parentNode), jQuery(e)) : null
            }, t.prototype.wrap = function(t, e) {
                return null == e && (e = !1), t = jQuery(t, this.context).html(this.fragment), e && this.replace(t), t
            }, t.prototype.textContent = function() {
                return this.content().textContent
            }, t.prototype.htmlContent = function() {
                var t;
                return t = this.content(), jQuery("<div>").html(t).html()
            }, t.prototype.content = function() {
                return this.range.cloneContents()
            }, t.prototype.is = function(t) {
                var e;
                return e = this.content(), 1 === jQuery(e).length && jQuery(e.firstChild).is(t) ? jQuery(e.firstChild) : !1
            }, t.prototype.forceSelection = function(t) {
                var e, i;
                if (jQuery.browser.webkit) return i = this.context.createRange(), this.range ? this.commonAncestor(!0).closest("[data-snippet]").length && (e = this.context.createTextNode("\0"), t.appendChild(e)) : t.lastChild && 3 === t.lastChild.nodeType && "" === t.lastChild.textContent.replace(/^[\s+|\n+]|[\s+|\n+]$/, "") ? (e = t.lastChild, t.lastChild.textContent = "\0") : (e = this.context.createTextNode("\0"), t.appendChild(e)), e ? (i.setStartBefore(e), i.setEndBefore(e), this.selection.addRange(i)) : void 0
            }, t.prototype.selectMarker = function(t) {
                var e, i;
                return e = t.find("em.mercury-marker"), e.length ? (i = this.context.createRange(), i.setStartBefore(e.get(0)), e.length >= 2 && i.setEndBefore(e.get(1)), e.remove(), this.selection.removeAllRanges(), this.selection.addRange(i)) : void 0
            }, t.prototype.placeMarker = function() {
                var t, e;
                if (this.range) return this.startMarker = jQuery('<em class="mercury-marker"/>', this.context).get(0), this.endMarker = jQuery('<em class="mercury-marker"/>', this.context).get(0), t = this.range.cloneRange(), t.collapse(!1), t.insertNode(this.endMarker), this.range.collapsed || (e = this.range.cloneRange(), e.collapse(!0), e.insertNode(this.startMarker)), this.selection.removeAllRanges(), this.selection.addRange(this.range)
            }, t.prototype.removeMarker = function() {
                return jQuery(this.startMarker).remove(), jQuery(this.endMarker).remove()
            }, t.prototype.insertTextNode = function(t) {
                var e;
                return e = this.context.createTextNode(t), this.range.extractContents(), this.range.insertNode(e), this.range.selectNodeContents(e), this.selection.addRange(this.range)
            }, t.prototype.insertNode = function(t) {
                return t.get && (t = t.get(0)), "string" === jQuery.type(t) && (t = jQuery(t, this.context).get(0)), this.range.deleteContents(), this.range.insertNode(t), this.range.selectNodeContents(t), this.selection.addRange(this.range)
            }, t.prototype.selectNode = function(t, e) {
                return null == e && (e = !1), this.range.selectNode(t), e && this.selection.removeAllRanges(), this.selection.addRange(this.range)
            }, t.prototype.replace = function(t, e) {
                return t.get && (t = t.get(0)), "string" === jQuery.type(t) && (t = jQuery(t, this.context).get(0)), this.range.deleteContents(), this.range.insertNode(t), this.range.selectNodeContents(t), this.selection.addRange(this.range), e ? this.range.collapse(!1) : void 0
            }, t
        }()
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, i) {
                function n() {
                    this.constructor = e
                }
                for (var s in i) t.call(i, s) && (e[s] = i[s]);
                return n.prototype = i.prototype, e.prototype = new n, e.__super__ = i.prototype, e
            };
        this.Mercury.Regions.Image = function(t) {
            function i(t, e, n) {
                this.element = t, this.window = e, this.options = null != n ? n : {}, i.__super__.constructor.apply(this, arguments)
            }
            var n;
            return e(i, t), i.supported = document.getElementById, i.supportedText = "Chrome 10+, Firefox 4+, IE 7+, Safari 5+, Opera 8+", n = "image", i.prototype.type = function() {
                return n
            }, i.prototype.bindEvents = function() {
                var t = this;
                return Mercury.on("mode", function(e, i) {
                    return "preview" === i.mode ? t.togglePreview() : void 0
                }), Mercury.on("focus:frame", function() {
                    return t.previewing || Mercury.region !== t ? void 0 : t.focus()
                }), Mercury.on("action", function(e, i) {
                    return t.previewing || Mercury.region !== t ? void 0 : i.action ? t.execCommand(i.action, i) : void 0
                }), this.element.on("dragenter", function(e) {
                    return t.previewing ? void 0 : (e.preventDefault(), e.originalEvent.dataTransfer.dropEffect = "copy")
                }), this.element.on("dragover", function(e) {
                    return t.previewing ? void 0 : (e.preventDefault(), e.originalEvent.dataTransfer.dropEffect = "copy")
                }), this.element.on("drop", function(e) {
                    return t.previewing ? void 0 : e.originalEvent.dataTransfer.files.length ? (e.preventDefault(), t.focus(), Mercury.uploader(e.originalEvent.dataTransfer.files[0])) : void 0
                }), this.element.on("focus", function() {
                    return t.focus()
                })
            }, i.prototype.togglePreview = function() {
                return this.previewing ? (this.previewing = !1, this.element.attr(Mercury.config.regions.attribute, n), this.build()) : (this.previewing = !0, this.element.removeAttr(Mercury.config.regions.attribute), Mercury.trigger("region:blurred", {
                    region: this
                }))
            }, i.prototype.focus = function() {
                return this.previewing ? void 0 : (Mercury.region = this, Mercury.trigger("region:focused", {
                    region: this
                }), Mercury.trigger("region:update", {
                    region: this
                }))
            }, i.prototype.execCommand = function(t, e) {
                var n;
                return null == e && (e = {}), i.__super__.execCommand.apply(this, arguments), (n = Mercury.Regions.Image.actions[t]) ? n.call(this, e) : void 0
            }, i.prototype.pushHistory = function() {
                return this.history.push({
                    src: this.element.attr("src")
                })
            }, i.prototype.updateSrc = function(t) {
                return this.element.attr("src", t)
            }, i.prototype.serialize = function() {
                return {
                    type: n,
                    data: this.dataAttributes(),
                    attributes: {
                        src: this.element.attr("src")
                    }
                }
            }, i.actions = {
                undo: function() {
                    var t;
                    return (t = this.history.undo()) ? this.updateSrc(t.src) : void 0
                },
                redo: function() {
                    var t;
                    return (t = this.history.redo()) ? this.updateSrc(t.src) : void 0
                },
                insertImage: function(t) {
                    return this.updateSrc(t.value.src)
                }
            }, i
        }(Mercury.Region)
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, i) {
                function n() {
                    this.constructor = e
                }
                for (var s in i) t.call(i, s) && (e[s] = i[s]);
                return n.prototype = i.prototype, e.prototype = new n, e.__super__ = i.prototype, e
            };
        this.Mercury.Regions.Markdown = function(t) {
            function i(t, e, n) {
                this.element = t, this.window = e, this.options = null != n ? n : {}, i.__super__.constructor.apply(this, arguments), this.converter = new Showdown.converter
            }
            var n;
            return e(i, t), i.supported = document.getElementById, i.supportedText = "Chrome 10+, Firefox 4+, IE 7+, Safari 5+, Opera 8+", n = "markdown", i.prototype.type = function() {
                return n
            }, i.prototype.build = function() {
                var t, e, i;
                return i = "100%", t = this.element.height(), e = this.element.html().replace(/^\s+|\s+$/g, "").replace("&gt;", ">"), this.textarea = jQuery("<textarea>", this.document).val(e).addClass("mercury-textarea"), this.textarea.css({
                    border: 0,
                    background: "transparent",
                    display: "block",
                    "overflow-y": "hidden",
                    width: i,
                    height: t,
                    fontFamily: '"Courier New", Courier, monospace'
                }), this.element.empty().append(this.textarea), this.previewElement = jQuery("<div>", this.document), this.element.append(this.previewElement), this.container = this.element, this.container.data("region", this), this.element = this.textarea, this.resize()
            }, i.prototype.dataAttributes = function() {
                var t, e, i, n, s;
                for (e = {}, s = Mercury.config.regions.dataAttributes, i = 0, n = s.length; n > i; i++) t = s[i], e[t] = this.container.attr("data-" + t);
                return e
            }, i.prototype.bindEvents = function() {
                var t = this;
                return Mercury.on("mode", function(e, i) {
                    return "preview" === i.mode ? t.togglePreview() : void 0
                }), Mercury.on("focus:frame", function() {
                    return t.previewing || Mercury.region !== t ? void 0 : t.focus()
                }), Mercury.on("action", function(e, i) {
                    return t.previewing || Mercury.region !== t ? void 0 : i.action ? t.execCommand(i.action, i) : void 0
                }), Mercury.on("unfocus:regions", function() {
                    return t.previewing || Mercury.region !== t ? void 0 : (t.element.blur(), t.container.removeClass("focus"), Mercury.trigger("region:blurred", {
                        region: t
                    }))
                }), this.element.on("dragenter", function(e) {
                    return t.previewing ? void 0 : (e.preventDefault(), e.originalEvent.dataTransfer.dropEffect = "copy")
                }), this.element.on("dragover", function(e) {
                    return t.previewing ? void 0 : (e.preventDefault(), e.originalEvent.dataTransfer.dropEffect = "copy")
                }), this.element.on("drop", function(e) {
                    return t.previewing ? void 0 : (Mercury.snippet && (e.preventDefault(), t.focus(), Mercury.Snippet.displayOptionsFor(Mercury.snippet.name, {}, Mercury.snippet.hasOptions)), e.originalEvent.dataTransfer.files.length ? (e.preventDefault(), t.focus(), Mercury.uploader(e.originalEvent.dataTransfer.files[0])) : void 0)
                }), this.element.on("focus", function() {
                    return t.previewing ? void 0 : (Mercury.region = t, t.container.addClass("focus"), Mercury.trigger("region:focused", {
                        region: t
                    }))
                }), this.element.on("keydown", function(e) {
                    var i, n, s, r, o, a;
                    if (!t.previewing) {
                        switch (t.resize(), e.keyCode) {
                            case 90:
                                if (!e.metaKey) return;
                                return e.preventDefault(), e.shiftKey ? t.execCommand("redo") : t.execCommand("undo"), void 0;
                            case 13:
                                r = t.selection(), a = t.element.val(), o = a.lastIndexOf("\n", r.start), i = a.indexOf("\n", r.end), o > i && (i = a.length), "\n" === a[o] && (o = a.lastIndexOf("\n", r.start - 1)), "-" === a[o + 1] && (r.replace("\n- ", !1, !0), e.preventDefault()), /\d/.test(a[o + 1]) && (n = a.substring(o, i), /(\d+)\./.test(n) && (s = parseInt(RegExp.$1), r.replace("\n" + (s += 1) + ". ", !1, !0), e.preventDefault()));
                                break;
                            case 9:
                                e.preventDefault(), t.execCommand("insertHTML", {
                                    value: "  "
                                })
                        }
                        if (e.metaKey) switch (e.keyCode) {
                            case 66:
                                t.execCommand("bold"), e.preventDefault();
                                break;
                            case 73:
                                t.execCommand("italic"), e.preventDefault();
                                break;
                            case 85:
                                t.execCommand("underline"), e.preventDefault()
                        }
                        return t.pushHistory(e.keyCode)
                    }
                }), this.element.on("keyup", function() {
                    return t.previewing ? void 0 : (Mercury.changes = !0, t.resize(), Mercury.trigger("region:update", {
                        region: t
                    }))
                }), this.element.on("mouseup", function() {
                    return t.previewing ? void 0 : (t.focus(), Mercury.trigger("region:focused", {
                        region: t
                    }))
                }), this.previewElement.on("click", function(e) {
                    return t.previewing ? $(e.target).closest("a").attr("target", "_parent") : void 0
                })
            }, i.prototype.focus = function() {
                return this.element.focus()
            }, i.prototype.content = function(t, e) {
                return null == t && (t = null), null == e && (e = !0), null !== t ? "string" === jQuery.type(t) ? this.element.val(t) : (this.element.val(t.html), this.selection().select(t.selection.start, t.selection.end)) : this.element.val()
            }, i.prototype.contentAndSelection = function() {
                return {
                    html: this.content(null, !1),
                    selection: this.selection().serialize()
                }
            }, i.prototype.togglePreview = function() {
                var t;
                return this.previewing ? (this.previewing = !1, this.container.attr(Mercury.config.regions.attribute, n), this.previewElement.hide(), this.element.show(), Mercury.region === this ? this.focus() : void 0) : (this.previewing = !0, this.container.removeAttr(Mercury.config.regions.attribute), t = this.converter.makeHtml(this.element.val()), this.previewElement.html(t), this.previewElement.show(), this.element.hide(), Mercury.trigger("region:blurred", {
                    region: this
                }))
            }, i.prototype.execCommand = function(t, e) {
                var n;
                return null == e && (e = {}), i.__super__.execCommand.apply(this, arguments), (n = Mercury.Regions.Markdown.actions[t]) && n.call(this, this.selection(), e), this.resize()
            }, i.prototype.pushHistory = function(t) {
                var e, i, n, s = this;
                return e = [13, 46, 8], n = 2.5, t && (i = e.indexOf(t)), clearTimeout(this.historyTimeout), i >= 0 && i !== this.lastKnownKeyCode ? this.history.push(this.contentAndSelection()) : t ? this.historyTimeout = setTimeout(function() {
                    return s.history.push(s.contentAndSelection())
                }, 1e3 * n) : this.history.push(this.contentAndSelection()), this.lastKnownKeyCode = i
            }, i.prototype.selection = function() {
                return new Mercury.Regions.Markdown.Selection(this.element)
            }, i.prototype.resize = function() {
                return this.element.css({
                    height: this.element.get(0).scrollHeight - 100
                }), this.element.css({
                    height: this.element.get(0).scrollHeight
                })
            }, i.prototype.snippets = function() {}, i.actions = {
                undo: function() {
                    return this.content(this.history.undo())
                },
                redo: function() {
                    return this.content(this.history.redo())
                },
                insertHTML: function(t, e) {
                    var i;
                    return e.value.get && (i = e.value.get(0)) && (e.value = jQuery("<div>").html(i).html()), t.replace(e.value, !1, !0)
                },
                insertImage: function(t, e) {
                    return t.replace("![add alt text](" + encodeURI(e.value.src) + ")", !0)
                },
                insertTable: function(t, e) {
                    return t.replace(e.value.replace(/<br>|<br\/>/gi, ""), !1, !0)
                },
                insertLink: function(t, e) {
                    return t.replace("[" + e.value.content + "](" + e.value.attrs.href + " 'optional title')", !0)
                },
                insertUnorderedList: function(t) {
                    return t.addList("unordered")
                },
                insertOrderedList: function(t) {
                    return t.addList("ordered")
                },
                style: function(t, e) {
                    return t.wrap('<span class="' + e.value + '">', "</span>")
                },
                formatblock: function(t, e) {
                    var i, n, s;
                    s = {
                        h1: ["# ", " #"],
                        h2: ["## ", " ##"],
                        h3: ["### ", " ###"],
                        h4: ["#### ", " ####"],
                        h5: ["##### ", " #####"],
                        h6: ["###### ", " ######"],
                        pre: ["    ", ""],
                        blockquote: ["> ", ""],
                        p: ["\n", "\n"]
                    };
                    for (n in s) i = s[n], t.unWrapLine("" + i[0], "" + i[1]);
                    return "blockquote" === e.value ? (Mercury.Regions.Markdown.actions.indent.call(this, t, e), void 0) : t.wrapLine("" + s[e.value][0], "" + s[e.value][1])
                },
                bold: function(t) {
                    return t.wrap("**", "**")
                },
                italic: function(t) {
                    return t.wrap("_", "_")
                },
                subscript: function(t) {
                    return t.wrap("<sub>", "</sub>")
                },
                superscript: function(t) {
                    return t.wrap("<sup>", "</sup>")
                },
                indent: function(t) {
                    return t.wrapLine("> ", "", !1, !0)
                },
                outdent: function(t) {
                    return t.unWrapLine("> ", "", !1, !0)
                },
                horizontalRule: function(t) {
                    return t.replace("\n- - -\n")
                },
                insertSnippet: function(t, e) {
                    var i;
                    return i = e.value, t.replace(i.getText())
                }
            }, i
        }(Mercury.Region), Mercury.Regions.Markdown.Selection = function() {
            function t(t) {
                this.element = t, this.el = this.element.get(0), this.getDetails()
            }
            return t.prototype.serialize = function() {
                return {
                    start: this.start,
                    end: this.end
                }
            }, t.prototype.getDetails = function() {
                return this.length = this.el.selectionEnd - this.el.selectionStart, this.start = this.el.selectionStart, this.end = this.el.selectionEnd, this.text = this.element.val().substr(this.start, this.length)
            }, t.prototype.replace = function(t, e, i) {
                var n, s, r;
                return null == e && (e = !1), null == i && (i = !1), this.getDetails(), r = this.element.val(), s = this.element.val(), this.element.val(r.substr(0, this.start) + t + r.substr(this.end, r.length)), n = this.element.val() !== s, e && this.select(this.start, this.start + t.length), i && this.select(this.start + t.length, this.start + t.length), n
            }, t.prototype.select = function(t, e) {
                return this.start = t, this.end = e, this.element.focus(), this.el.selectionStart = this.start, this.el.selectionEnd = this.end, this.getDetails()
            }, t.prototype.wrap = function(t, e) {
                return this.getDetails(), this.deselectNewLines(), this.replace(t + this.text + e, "" !== this.text), "" === this.text ? this.select(this.start + t.length, this.start + t.length) : void 0
            }, t.prototype.wrapLine = function(t, e, i, n) {
                var s, r, o, a;
                return null == i && (i = !0), null == n && (n = !1), this.getDetails(), r = this.serialize(), a = this.element.val(), o = a.lastIndexOf("\n", this.start), s = a.indexOf("\n", this.end), o > s && (s = a.length), "\n" === a[o] && (o = a.lastIndexOf("\n", this.start - 1)), this.select(o + 1, s), this.replace(t + this.text + e, i), n ? this.select(r.start + t.length, r.end + t.length) : void 0
            }, t.prototype.unWrapLine = function(t, e, i, n) {
                var s, r, o, a, l, c, u;
                return null == i && (i = !0), null == n && (n = !1), this.getDetails(), l = this.serialize(), u = this.element.val(), c = u.lastIndexOf("\n", this.start), r = u.indexOf("\n", this.end), c > r && (r = u.length), "\n" === u[c] && (c = u.lastIndexOf("\n", this.start - 1)), this.select(c + 1, r), window.something = this.text, o = new RegExp("^" + t.regExpEscape()), a = new RegExp("" + e.regExpEscape() + "$"), s = this.replace(this.text.replace(o, "").replace(a, ""), i), n && s ? this.select(l.start - t.length, l.end - t.length) : void 0
            }, t.prototype.addList = function(t) {
                var e, i, n, s, r, o;
                return o = this.element.val(), r = o.lastIndexOf("\n", this.start), e = o.indexOf("\n", this.end), r > e && (e = o.length), "\n" === o[r] && (r = o.lastIndexOf("\n", this.start - 1)), this.select(r + 1, e), s = this.text.split("\n"), "unordered" === t ? this.replace("- " + s.join("\n- "), !0) : this.replace(function() {
                    var t, e, r;
                    for (r = [], i = t = 0, e = s.length; e > t; i = ++t) n = s[i], r.push("" + (i + 1) + ". " + n);
                    return r
                }().join("\n"), !0)
            }, t.prototype.deselectNewLines = function() {
                var t, e;
                return e = this.text, t = e.replace(/\n+$/g, "").length, this.select(this.start, this.start + t)
            }, t.prototype.placeMarker = function() {
                return this.wrap("[mercury-marker]", "[mercury-marker]")
            }, t.prototype.removeMarker = function() {
                var t, e, i;
                return i = this.element.val(), e = i.indexOf("[mercury-marker]"), e > -1 ? (t = i.indexOf("[mercury-marker]", e + 1) - "[mercury-marker]".length, this.element.val(this.element.val().replace(/\[mercury-marker\]/g, "")), this.select(e, t)) : void 0
            }, t.prototype.textContent = function() {
                return this.text
            }, t
        }()
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, i) {
                function n() {
                    this.constructor = e
                }
                for (var s in i) t.call(i, s) && (e[s] = i[s]);
                return n.prototype = i.prototype, e.prototype = new n, e.__super__ = i.prototype, e
            };
        this.Mercury.Regions.Simple = function(t) {
            function i(t, e, s) {
                this.element = t, this.window = e, this.options = null != s ? s : {}, Mercury.log("building " + n, this.element, this.options), i.__super__.constructor.apply(this, arguments)
            }
            var n;
            return e(i, t), i.supported = document.getElementById, i.supportedText = "Chrome 10+, Firefox 4+, IE 7+, Safari 5+, Opera 8+", n = "simple", i.prototype.type = function() {
                return n
            }, i.prototype.build = function() {
                var t, e, i;
                return "block" === this.element.css("display") ? (i = "100%", t = this.element.height()) : (i = this.element.width(), t = this.element.height()), e = this.element.text(), this.textarea = jQuery("<textarea>", this.document).val(e).addClass("mercury-textarea"), this.textarea.css({
                    border: 0,
                    background: "transparent",
                    "overflow-y": "hidden",
                    width: i,
                    height: t,
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    fontWeight: "inherit",
                    fontStyle: "inherit",
                    color: "inherit",
                    "min-height": 0,
                    padding: "0",
                    margin: 0,
                    "border-radius": 0,
                    display: "inherit",
                    lineHeight: "inherit",
                    textAlign: "inherit"
                }), this.element.empty().append(this.textarea), this.container = this.element, this.container.data("region", this), this.element = this.textarea, this.resize()
            }, i.prototype.bindEvents = function() {
                var t = this;
                return Mercury.on("mode", function(e, i) {
                    return "preview" === i.mode ? t.togglePreview() : void 0
                }), Mercury.on("focus:frame", function() {
                    return t.previewing || Mercury.region !== t ? void 0 : t.focus()
                }), Mercury.on("action", function(e, i) {
                    return t.previewing || Mercury.region !== t ? void 0 : i.action ? t.execCommand(i.action, i) : void 0
                }), Mercury.on("unfocus:regions", function() {
                    return t.previewing || Mercury.region !== t ? void 0 : (t.element.blur(), t.container.removeClass("focus"), Mercury.trigger("region:blurred", {
                        region: t
                    }))
                }), this.bindElementEvents()
            }, i.prototype.bindElementEvents = function() {
                var t = this;
                return this.element.on("focus", function() {
                    return t.previewing ? void 0 : (Mercury.region = t, t.container.addClass("focus"), Mercury.trigger("region:focused", {
                        region: t
                    }))
                }), this.element.on("keydown", function(e) {
                    var i, n, s, r, o, a;
                    if (!t.previewing) {
                        switch (t.resize(), e.keyCode) {
                            case 90:
                                if (!e.metaKey) return;
                                return e.preventDefault(), e.shiftKey ? t.execCommand("redo") : t.execCommand("undo"), void 0;
                            case 13:
                                r = t.selection(), a = t.element.val(), o = a.lastIndexOf("\n", r.start), i = a.indexOf("\n", r.end), o > i && (i = a.length), "\n" === a[o] && (o = a.lastIndexOf("\n", r.start - 1)), "-" === a[o + 1] && r.replace("\n- ", !1, !0), /\d/.test(a[o + 1]) && (n = a.substring(o, i), /(\d+)\./.test(n) && (s = parseInt(RegExp.$1), r.replace("\n" + (s += 1) + ". ", !1, !0))), e.preventDefault();
                                break;
                            case 9:
                                e.preventDefault(), t.execCommand("insertHTML", {
                                    value: "  "
                                })
                        }
                        return t.pushHistory(e.keyCode)
                    }
                }), this.element.on("keyup", function() {
                    return t.previewing ? void 0 : (Mercury.changes = !0, t.resize(), Mercury.trigger("region:update", {
                        region: t
                    }))
                }), this.element.on("mouseup", function() {
                    return t.previewing ? void 0 : (t.focus(), Mercury.trigger("region:focused", {
                        region: t
                    }))
                }), this.element.on("paste", function(e) {
                    if (!t.previewing && Mercury.region === t) {
                        if (t.specialContainer) return e.preventDefault(), void 0;
                        if (!t.pasting) return Mercury.changes = !0, t.handlePaste(e.originalEvent)
                    }
                })
            }, i.prototype.handlePaste = function(t) {
                this.execCommand("insertHTML", {
                    value: t.clipboardData.getData("text/plain").replace(/\n/g, " ")
                }), t.preventDefault()
            }, i.prototype.path = function() {
                return [this.container.get(0)]
            }, i.prototype.focus = function() {
                return this.element.focus()
            }, i.prototype.content = function(t, e) {
                return null == t && (t = null), null == e && (e = !0), null !== t ? "string" === jQuery.type(t) ? this.element.val(t) : (this.element.val(t.html), this.selection().select(t.selection.start, t.selection.end)) : this.element.val()
            }, i.prototype.contentAndSelection = function() {
                return {
                    html: this.content(null, !1),
                    selection: this.selection().serialize()
                }
            }, i.prototype.togglePreview = function() {
                var t;
                return this.previewing ? (this.previewing = !1, this.element = this.container, this.container.attr(Mercury.config.regions.attribute, n), this.build(), this.bindElementEvents(), Mercury.region === this ? this.focus() : void 0) : (this.previewing = !0, t = jQuery("<div></div>").text(this.element.val()).html(), this.container.removeAttr(Mercury.config.regions.attribute), this.container.html(t), Mercury.trigger("region:blurred", {
                    region: this
                }))
            }, i.prototype.execCommand = function(t, e) {
                var n;
                return null == e && (e = {}), i.__super__.execCommand.apply(this, arguments), (n = Mercury.Regions.Simple.actions[t]) && n.call(this, this.selection(), e), this.resize()
            }, i.prototype.pushHistory = function(t) {
                var e, i, n, s = this;
                return e = [13, 46, 8], n = 2.5, t && (i = e.indexOf(t)), clearTimeout(this.historyTimeout), i >= 0 && i !== this.lastKnownKeyCode ? this.history.push(this.contentAndSelection()) : t ? this.historyTimeout = setTimeout(function() {
                    return s.history.push(s.contentAndSelection())
                }, 1e3 * n) : this.history.push(this.contentAndSelection()), this.lastKnownKeyCode = i
            }, i.prototype.selection = function() {
                return new Mercury.Regions.Simple.Selection(this.element)
            }, i.prototype.resize = function() {
                return this.element.css({
                    height: this.element.get(0).scrollHeight - 100
                }), this.element.css({
                    height: this.element.get(0).scrollHeight
                })
            }, i.prototype.snippets = function() {}, i.actions = {
                undo: function() {
                    return this.content(this.history.undo())
                },
                redo: function() {
                    return this.content(this.history.redo())
                },
                insertHTML: function(t, e) {
                    var i;
                    return e.value.get && (i = e.value.get(0)) && (e.value = jQuery("<div>").html(i).html()), t.replace(e.value, !1, !0)
                }
            }, i
        }(Mercury.Region), Mercury.Regions.Simple.Selection = function() {
            function t(t) {
                this.element = t, this.el = this.element.get(0), this.getDetails()
            }
            return t.prototype.serialize = function() {
                return {
                    start: this.start,
                    end: this.end
                }
            }, t.prototype.getDetails = function() {
                return this.length = this.el.selectionEnd - this.el.selectionStart, this.start = this.el.selectionStart, this.end = this.el.selectionEnd, this.text = this.element.val().substr(this.start, this.length)
            }, t.prototype.replace = function(t, e, i) {
                var n, s, r;
                return null == e && (e = !1), null == i && (i = !1), this.getDetails(), r = this.element.val(), s = this.element.val(), this.element.val(r.substr(0, this.start) + t + r.substr(this.end, r.length)), n = this.element.val() !== s, e && this.select(this.start, this.start + t.length), i && this.select(this.start + t.length, this.start + t.length), n
            }, t.prototype.select = function(t, e) {
                return this.start = t, this.end = e, this.element.focus(), this.el.selectionStart = this.start, this.el.selectionEnd = this.end, this.getDetails()
            }, t.prototype.wrap = function(t, e) {
                return this.getDetails(), this.deselectNewLines(), this.replace(t + this.text + e, "" !== this.text), "" === this.text ? this.select(this.start + t.length, this.start + t.length) : void 0
            }, t.prototype.deselectNewLines = function() {
                var t, e;
                return e = this.text, t = e.replace(/\n+$/g, "").length, this.select(this.start, this.start + t)
            }, t.prototype.placeMarker = function() {
                return this.wrap("[mercury-marker]", "[mercury-marker]")
            }, t.prototype.removeMarker = function() {
                var t, e, i;
                return i = this.element.val(), e = i.indexOf("[mercury-marker]"), e > -1 ? (t = i.indexOf("[mercury-marker]", e + 1) - "[mercury-marker]".length, this.element.val(this.element.val().replace(/\[mercury-marker\]/g, "")), this.select(e, t)) : void 0
            }, t.prototype.textContent = function() {
                return this.text
            }, t
        }()
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, i) {
                function n() {
                    this.constructor = e
                }
                for (var s in i) t.call(i, s) && (e[s] = i[s]);
                return n.prototype = i.prototype, e.prototype = new n, e.__super__ = i.prototype, e
            };
        this.Mercury.Regions.Snippets = function(t) {
            function i(t, e, s) {
                this.element = t, this.window = e, this.options = null != s ? s : {}, Mercury.log("building " + n, this.element, this.options), i.__super__.constructor.apply(this, arguments), this.makeSortable()
            }
            var n;
            return e(i, t), i.supported = document.getElementById, i.supportedText = "Chrome 10+, Firefox 4+, IE 7+, Safari 5+, Opera 8+", n = "snippets", i.prototype.type = function() {
                return n
            }, i.prototype.build = function() {
                var t, e, i, n;
                for (n = this.element.find("[data-snippet]"), e = 0, i = n.length; i > e; e++) t = n[e], jQuery(t).attr("data-version", 0);
                return "0px" === this.element.css("minHeight") ? this.element.css({
                    minHeight: 20
                }) : void 0
            }, i.prototype.bindEvents = function() {
                var t = this;
                return i.__super__.bindEvents.apply(this, arguments), Mercury.on("unfocus:regions", function() {
                    return t.previewing ? void 0 : Mercury.region === t ? (t.element.removeClass("focus"), t.element.sortable("destroy"), Mercury.trigger("region:blurred", {
                        region: t
                    })) : void 0
                }), Mercury.on("focus:window", function() {
                    return t.previewing ? void 0 : Mercury.region === t ? (t.element.removeClass("focus"), t.element.sortable("destroy"), Mercury.trigger("region:blurred", {
                        region: t
                    })) : void 0
                }), this.element.on("mouseup", function() {
                    return t.previewing ? void 0 : (t.focus(), Mercury.trigger("region:focused", {
                        region: t
                    }))
                }), this.element.on("dragover", function(e) {
                    return t.previewing ? void 0 : (e.preventDefault(), e.originalEvent.dataTransfer.dropEffect = "copy")
                }), this.element.on("drop", function(e) {
                    return !t.previewing && Mercury.snippet ? (t.focus(), e.preventDefault(), Mercury.Snippet.displayOptionsFor(Mercury.snippet.name, {}, Mercury.snippet.hasOptions)) : void 0
                }), jQuery(this.document).on("keydown", function(e) {
                    if (!t.previewing && Mercury.region === t) switch (e.keyCode) {
                        case 90:
                            if (!e.metaKey) return;
                            return e.preventDefault(), e.shiftKey ? t.execCommand("redo") : t.execCommand("undo")
                    }
                }), jQuery(this.document).on("keyup", function() {
                    return t.previewing || Mercury.region !== t ? void 0 : Mercury.changes = !0
                })
            }, i.prototype.focus = function() {
                return Mercury.region = this, this.makeSortable(), this.element.addClass("focus")
            }, i.prototype.togglePreview = function() {
                return this.previewing ? this.makeSortable() : (this.element.sortable("destroy"), this.element.removeClass("focus")), i.__super__.togglePreview.apply(this, arguments)
            }, i.prototype.execCommand = function(t, e) {
                var n;
                return null == e && (e = {}), i.__super__.execCommand.apply(this, arguments), (n = Mercury.Regions.Snippets.actions[t]) ? n.call(this, e) : void 0
            }, i.prototype.makeSortable = function() {
                var t = this;
                return this.element.sortable("destroy").sortable({
                    document: this.document,
                    scroll: !1,
                    containment: "parent",
                    items: "[data-snippet]",
                    opacity: .4,
                    revert: 100,
                    tolerance: "pointer",
                    beforeStop: function() {
                        return Mercury.trigger("hide:toolbar", {
                            type: "snippet",
                            immediately: !0
                        }), !0
                    },
                    stop: function() {
                        return setTimeout(function() {
                            return t.pushHistory()
                        }, 100), !0
                    }
                })
            }, i.actions = {
                undo: function() {
                    return this.content(this.history.undo())
                },
                redo: function() {
                    return this.content(this.history.redo())
                },
                insertSnippet: function(t) {
                    var e, i, n = this;
                    return i = t.value, (e = this.element.find("[data-snippet=" + i.identity + "]")).length ? e.replaceWith(i.getHTML(this.document, function() {
                        return n.pushHistory()
                    })) : this.element.append(i.getHTML(this.document, function() {
                        return n.pushHistory()
                    }))
                },
                editSnippet: function() {
                    var t;
                    if (this.snippet) return t = Mercury.Snippet.find(this.snippet.data("snippet")), t.displayOptions()
                },
                removeSnippet: function() {
                    return this.snippet && this.snippet.remove(), Mercury.trigger("hide:toolbar", {
                        type: "snippet",
                        immediately: !0
                    })
                }
            }, i
        }(Mercury.Region)
    }.call(this),
    function() {
        this.Mercury.dialogHandlers.backColor = function() {
            var t = this;
            return this.element.find(".picker, .last-picked").on("click", function(e) {
                var i;
                return i = jQuery(e.target).css("background-color"), t.element.find(".last-picked").css({
                    background: i
                }), t.button.css({
                    backgroundColor: i
                }), Mercury.trigger("action", {
                    action: "backColor",
                    value: i
                })
            })
        }
    }.call(this),
    function() {
        this.Mercury.dialogHandlers.foreColor = function() {
            var t = this;
            return this.element.find(".picker, .last-picked").on("click", function(e) {
                var i;
                return i = jQuery(e.target).css("background-color").toHex(), t.element.find(".last-picked").css({
                    background: i
                }), t.button.css({
                    backgroundColor: i
                }), Mercury.trigger("action", {
                    action: "foreColor",
                    value: i
                })
            })
        }
    }.call(this),
    function() {
        this.Mercury.dialogHandlers.formatblock = function() {
            return this.element.find("[data-tag]").on("click", function(t) {
                var e;
                return e = jQuery(t.target).data("tag"), Mercury.trigger("action", {
                    action: "formatblock",
                    value: e
                })
            })
        }
    }.call(this),
    function() {
        this.Mercury.dialogHandlers.snippetPanel = function() {
            var t = this;
            return this.element.find("input.filter").on("keyup", function() {
                var e, i, n, s, r, o;
                for (i = t.element.find("input.filter").val(), r = t.element.find("li[data-filter]"), o = [], n = 0, s = r.length; s > n; n++) e = r[n], 0 === LiquidMetal.score(jQuery(e).data("filter"), i) ? o.push(jQuery(e).hide()) : o.push(jQuery(e).show());
                return o
            }), this.element.find("img[data-snippet]").on("dragstart", function() {
                return Mercury.snippet = {
                    name: jQuery(this).data("snippet"),
                    hasOptions: !(jQuery(this).data("options") === !1)
                }
            })
        }
    }.call(this),
    function() {
        this.Mercury.dialogHandlers.style = function() {
            return this.element.find("[data-class]").on("click", function(t) {
                var e;
                return e = jQuery(t.target).data("class"), Mercury.trigger("action", {
                    action: "style",
                    value: e
                })
            })
        }
    }.call(this),
    function() {
        this.Mercury.modalHandlers.htmlEditor = function() {
            var t, e = this;
            return t = Mercury.region.content(null, !0, !1), this.element.find("textarea").val(t), this.element.find("form").on("submit", function(t) {
                var i;
                return t.preventDefault(), i = e.element.find("textarea").val(), Mercury.trigger("action", {
                    action: "replaceHTML",
                    value: i
                }), e.hide()
            })
        }
    }.call(this),
    function() {
        this.Mercury.modalHandlers.insertCharacter = function() {
            var t = this;
            return this.element.find(".character").on("click", function(e) {
                return Mercury.trigger("action", {
                    action: "insertHTML",
                    value: "&" + jQuery(e.target).attr("data-entity") + ";"
                }), t.hide()
            })
        }
    }.call(this),
    function() {
        this.Mercury.modalHandlers.insertLink = {
            initialize: function() {
                var t = this;
                return this.editing = !1, this.content = null, this.element.find(".control-label input").on("click", this.onLabelChecked), this.element.find(".controls .optional, .controls .required").on("focus", this.onInputFocused), this.element.find("#link_target").on("change", function() {
                    return t.onChangeTarget()
                }), this.initializeForm(), this.element.find("form").on("submit", function(e) {
                    return e.preventDefault(), t.validateForm(), t.valid ? (t.submitForm(), t.hide()) : (t.resize(), void 0)
                })
            },
            initializeForm: function() {
                var t, e, i, n, s, r;
                return this.fillExistingBookmarks(), Mercury.region && Mercury.region.selection ? (r = Mercury.region.selection(), r.textContent && this.element.find("#link_text").val(r.textContent()), r && r.commonAncestor && (t = r.commonAncestor(!0).closest("a")), r.htmlContent && (n = /<img/.test(r.htmlContent())), n || t && t.length ? (this.element.find("#link_text_container").hide(), n && (this.content = r.htmlContent()), t && t.length ? (this.editing = t, t.attr("href") && 0 === t.attr("href").indexOf("#") ? (e = this.element.find("#link_existing_bookmark"), e.val(t.attr("href").replace(/[^#]*#/, "")), e.closest(".control-group").find("input[type=radio]").prop("checked", !0)) : this.element.find("#link_external_url").val(t.attr("href")), t.attr("name") && (s = this.element.find("#link_new_bookmark"), s.val(t.attr("name")), s.closest(".control-group").find("input[type=radio]").prop("checked", !0)), t.attr("target") && this.element.find("#link_target").val(t.attr("target")), t.attr("href") && 0 === t.attr("href").indexOf("javascript:void") ? (i = t.attr("href"), this.element.find("#link_external_url").val(i.match(/window.open\('([^']+)',/)[1]), this.element.find("#link_target").val("popup"), this.element.find("#link_popup_width").val(i.match(/width=(\d+),/)[1]), this.element.find("#link_popup_height").val(i.match(/height=(\d+),/)[1]), this.element.find("#popup_options").show()) : void 0) : !1) : !1) : void 0
            },
            fillExistingBookmarks: function() {
                var t, e, i, n, s, r;
                for (t = this.element.find("#link_existing_bookmark"), s = jQuery("a[name]", window.mercuryInstance.document), r = [], i = 0, n = s.length; n > i; i++) e = s[i], r.push(t.append(jQuery("<option>", {
                    value: jQuery(e).attr("name")
                }).text(jQuery(e).text())));
                return r
            },
            onLabelChecked: function() {
                var t;
                return t = jQuery(this).closest(".control-label").attr("for"), jQuery(this).closest(".control-group").find("#" + t).focus()
            },
            onInputFocused: function() {
                return jQuery(this).closest(".control-group").find("input[type=radio]").prop("checked", !0)
            },
            onChangeTarget: function() {
                return this.element.find(".link-target-options").hide(), this.element.find("#" + this.element.find("#link_target").val() + "_options").show(), this.resize(!0)
            },
            addInputError: function(t, e) {
                return t.after('<span class="help-inline error-message">' + Mercury.I18n(e) + "</span>").closest(".control-group").addClass("error"), this.valid = !1
            },
            clearInputErrors: function() {
                return this.element.find(".control-group.error").removeClass("error").find(".error-message").remove(), this.valid = !0
            },
            validateForm: function() {
                var t, e;
                return this.clearInputErrors(), e = this.element.find("input[name=link_type]:checked").val(), t = this.element.find("#link_" + e), t.val() || this.addInputError(t, "can't be blank"), this.editing || this.content || (t = this.element.find("#link_text"), t.val()) ? void 0 : this.addInputError(t, "can't be blank")
            },
            submitForm: function() {
                var t, e, i, n, s, r;
                switch (i = this.element.find("#link_text").val(), n = this.element.find("#link_target").val(), s = this.element.find("input[name=link_type]:checked").val()) {
                    case "existing_bookmark":
                        e = {
                            href: "#" + this.element.find("#link_existing_bookmark").val()
                        };
                        break;
                    case "new_bookmark":
                        e = {
                            name: "" + this.element.find("#link_new_bookmark").val()
                        };
                        break;
                    default:
                        e = {
                            href: this.element.find("#link_" + s).val()
                        }
                }
                switch (n) {
                    case "popup":
                        t = {
                            width: parseInt(this.element.find("#link_popup_width").val()) || 500,
                            height: parseInt(this.element.find("#link_popup_height").val()) || 500,
                            menubar: "no",
                            toolbar: "no"
                        }, e.href = "javascript:void(window.open('" + e.href + "', 'popup_window', '" + jQuery.param(t).replace(/&/g, ",") + "'))";
                        break;
                    default:
                        n && (e.target = n)
                }
                return r = {
                    tagName: "a",
                    attrs: e,
                    content: this.content || i
                }, this.editing ? Mercury.trigger("action", {
                    action: "replaceLink",
                    value: r,
                    node: this.editing.get(0)
                }) : Mercury.trigger("action", {
                    action: "insertLink",
                    value: r
                })
            }
        }
    }.call(this),
    function() {
        this.Mercury.modalHandlers.insertMedia = {
            initialize: function() {
                var t = this;
                return this.element.find(".control-label input").on("click", this.onLabelChecked), this.element.find(".controls .optional, .controls .required").on("focus", function(e) {
                    return t.onInputFocused($(e.target))
                }), this.focus("#media_image_url"), this.initializeForm(), this.element.find("form").on("submit", function(e) {
                    return e.preventDefault(), t.validateForm(), t.valid ? (t.submitForm(), t.hide()) : (t.resize(), void 0)
                })
            },
            initializeForm: function() {
                var t, e, i, n;
                if (Mercury.region && Mercury.region.selection && (i = Mercury.region.selection(), (e = "function" == typeof i.is ? i.is("img") : void 0) && (this.element.find("#media_image_url").val(e.attr("src")), this.element.find("#media_image_alignment").val(e.attr("align")), this.element.find("#media_image_float").val(null != e.attr("style") ? e.css("float") : ""), this.focus("#media_image_url")), t = "function" == typeof i.is ? i.is("iframe") : void 0)) {
                    if (n = t.attr("src"), /^https?:\/\/www.youtube.com\//i.test(n)) return this.element.find("#media_youtube_url").val("" + n.match(/^https?/)[0] + "://youtu.be/" + n.match(/\/embed\/(\w+)/)[1]), this.element.find("#media_youtube_width").val(t.width()), this.element.find("#media_youtube_height").val(t.height()), this.focus("#media_youtube_url");
                    if (/^https?:\/\/player.vimeo.com\//i.test(n)) return this.element.find("#media_vimeo_url").val("" + n.match(/^https?/)[0] + "://vimeo.com/" + n.match(/\/video\/(\w+)/)[1]), this.element.find("#media_vimeo_width").val(t.width()), this.element.find("#media_vimeo_height").val(t.height()), this.focus("#media_vimeo_url")
                }
            },
            focus: function(t) {
                var e = this;
                return setTimeout(function() {
                    return e.element.find(t).focus()
                }, 300)
            },
            onLabelChecked: function() {
                var t;
                return t = jQuery(this).closest(".control-label").attr("for"), jQuery(this).closest(".control-group").find("#" + t).focus()
            },
            onInputFocused: function(t) {
                return t.closest(".control-group").find("input[type=radio]").prop("checked", !0), t.closest(".media-options").length ? void 0 : (this.element.find(".media-options").hide(), this.element.find("#" + t.attr("id").replace("media_", "") + "_options").show(), this.resize(!0))
            },
            addInputError: function(t, e) {
                return t.after('<span class="help-inline error-message">' + Mercury.I18n(e) + "</span>").closest(".control-group").addClass("error"), this.valid = !1
            },
            clearInputErrors: function() {
                return this.element.find(".control-group.error").removeClass("error").find(".error-message").remove(), this.valid = !0
            },
            validateForm: function() {
                var t, e, i;
                switch (this.clearInputErrors(), e = this.element.find("input[name=media_type]:checked").val(), t = this.element.find("#media_" + e), e) {
                    case "youtube_url":
                        if (i = this.element.find("#media_youtube_url").val(), !/^https?:\/\/youtu.be\//.test(i)) return this.addInputError(t, "is invalid");
                        break;
                    case "vimeo_url":
                        if (i = this.element.find("#media_vimeo_url").val(), !/^https?:\/\/vimeo.com\//.test(i)) return this.addInputError(t, "is invalid");
                        break;
                    default:
                        if (!t.val()) return this.addInputError(t, "can't be blank")
                }
            },
            submitForm: function() {
                var t, e, i, n, s, r, o, a;
                switch (r = this.element.find("input[name=media_type]:checked").val()) {
                    case "image_url":
                        return e = {
                            src: this.element.find("#media_image_url").val()
                        }, (t = this.element.find("#media_image_alignment").val()) && (e.align = t), (n = this.element.find("#media_image_float").val()) && (e.style = "float: " + n + ";"), Mercury.trigger("action", {
                            action: "insertImage",
                            value: e
                        });
                    case "youtube_url":
                        return o = this.element.find("#media_youtube_url").val(), i = o.replace(/https?:\/\/youtu.be\//, ""), s = "http", /^https:/.test(o) && (s = "https"), a = jQuery("<iframe>", {
                            width: parseInt(this.element.find("#media_youtube_width").val(), 10) || 560,
                            height: parseInt(this.element.find("#media_youtube_height").val(), 10) || 349,
                            src: "" + s + "://www.youtube.com/embed/" + i + "?wmode=transparent",
                            frameborder: 0,
                            allowfullscreen: "true"
                        }), Mercury.trigger("action", {
                            action: "insertHTML",
                            value: a
                        });
                    case "vimeo_url":
                        return o = this.element.find("#media_vimeo_url").val(), i = o.replace(/^https?:\/\/vimeo.com\//, ""), s = "http", /^https:/.test(o) && (s = "https"), a = jQuery("<iframe>", {
                            width: parseInt(this.element.find("#media_vimeo_width").val(), 10) || 400,
                            height: parseInt(this.element.find("#media_vimeo_height").val(), 10) || 225,
                            src: "" + s + "://player.vimeo.com/video/" + i + "?title=1&byline=1&portrait=0&color=ffffff",
                            frameborder: 0
                        }), Mercury.trigger("action", {
                            action: "insertHTML",
                            value: a
                        })
                }
            }
        }
    }.call(this),
    function() {
        this.Mercury.modalHandlers.insertSnippet = function() {
            var t = this;
            return this.element.find("form").on("submit", function(e) {
                var i, n;
                return e.preventDefault(), i = t.element.find("form").serializeObject(), Mercury.snippet ? (n = Mercury.snippet, n.setOptions(i), Mercury.snippet = null) : n = Mercury.Snippet.create(t.options.snippetName, i), Mercury.trigger("action", {
                    action: "insertSnippet",
                    value: n
                }), t.hide()
            })
        }
    }.call(this),
    function() {
        this.Mercury.modalHandlers.insertTable = {
            initialize: function() {
                var t = this;
                return this.table = this.element.find("#table_display table"), this.table.on("click", function(e) {
                    return t.onCellClick($(e.target))
                }), this.element.find("#table_alignment").on("change", function() {
                    return t.setTableAlignment()
                }), this.element.find("#table_border").on("keyup", function() {
                    return t.setTableBorder()
                }), this.element.find("#table_spacing").on("keyup", function() {
                    return t.setTableCellSpacing()
                }), this.element.find("[data-action]").on("click", function(e) {
                    return e.preventDefault(), t.onActionClick(jQuery(e.target).data("action"))
                }), this.selectFirstCell(), this.element.find("form").on("submit", function(e) {
                    return e.preventDefault(), t.submitForm(), t.hide()
                })
            },
            selectFirstCell: function() {
                var t;
                return t = this.table.find("td, th").first(), t.addClass("selected"), Mercury.tableEditor(this.table, t, "&nbsp;")
            },
            onCellClick: function(t) {
                return this.cell = t, this.table = this.cell.closest("table"), this.table.find(".selected").removeAttr("class"), this.cell.addClass("selected"), Mercury.tableEditor(this.table, this.cell, "&nbsp;")
            },
            onActionClick: function(t) {
                return t ? Mercury.tableEditor[t]() : void 0
            },
            setTableAlignment: function() {
                return this.table.attr({
                    align: this.element.find("#table_alignment").val()
                })
            },
            setTableBorder: function() {
                var t;
                return t = parseInt(this.element.find("#table_border").val(), 10), isNaN(t) ? this.table.removeAttr("border") : this.table.attr({
                    border: t
                })
            },
            setTableCellSpacing: function() {
                var t;
                return t = parseInt(this.element.find("#table_spacing").val(), 10), isNaN(t) ? this.table.removeAttr("cellspacing") : this.table.attr({
                    cellspacing: t
                })
            },
            submitForm: function() {
                var t, e;
                return this.table.find(".selected").removeAttr("class"), this.table.find("td, th").html("<br/>"), t = jQuery("<div>").html(this.table).html(), e = t.replace(/^\s+|\n/gm, "").replace(/(<\/.*?>|<table.*?>|<tbody>|<tr>)/g, "$1\n"), Mercury.trigger("action", {
                    action: "insertTable",
                    value: e
                })
            }
        }
    }.call(this),
    function() {
        Mercury.onload && Mercury.onload(), jQuery(window).trigger("mercury:loaded")
    }.call(this);
var activeSlide, compassRotation, activeIndicator;
$(".pointer, .slides-container").click(function() {
    rotateCompass()
}), $(document).ready(function() {
    $(".floor-view a").click(function(t) {
        $(this).parent().hasClass("active") || ($(this).parent().addClass("active").siblings().removeClass("active"), $(this).parent().parent().parent().parent().find(".floors .magnify:nth-child(" + ($(this).parent().index() + 1) + ")").addClass("active").siblings().removeClass("active")), t.preventDefault()
    }), $(".floors .magnify .large").click(function(t) {
        $(this).hide(), $(".floor-view .navigation ul li:not(.active) a").click(), t.preventDefault()
    }), $(".floor-view .floors img").click(function(t) {
        $(".floor-view .navigation ul li:not(.active) a").click(), t.preventDefault()
    })
});
var viewportHeight, viewportHeightNetto, scrollIndex;
$("body.victoire").length > 0 && (checkVictoirePosition(), victoireNavPositioning(), $(window).resize(function() {
    checkVictoirePosition()
}), $(document).scroll(function() {
    checkVictoirePosition(), victoireNavPositioning()
}));
var viewportHeight, viewportHeightNetto, scrollIndex;
$("body.fan-bridge").length > 0 && (checkFanBridgePosition(), $(window).resize(function() {
    checkFanBridgePosition()
}), $(document).scroll(function() {
    checkFanBridgePosition()
}));
var imageGridHeight;
$(document).ready(function() {
    $(".interactive-image-grid").length > 0 && (checkGridHeight(), setTimeout(checkGridHeight(), 250), setTimeout(checkGridHeight(), 2e3), $(window).scroll(function() {
        checkGridHeight()
    }), $(window).resize(function() {
        checkGridHeight()
    }))
}), $(".interactive-image-grid .thumbnails img").mouseenter(function() {
    $(".interactive-image-grid .large img").css("z-index", "3"), $(".interactive-image-grid .large img:nth-child(" + ($(this).index() + 1) + ")").css("z-index", "4"), $(".interactive-image-grid").addClass("hover")
}), $(".interactive-image-grid").mouseleave(function() {
    $(".interactive-image-grid").removeClass("hover")
});
var viewportHeight, viewportHeightNetto, scrollIndex;
$("body.erasmus-pavilion").length > 0 && (checkErasmusPosition(), $(window).resize(function() {
    checkErasmusPosition()
}), $(document).scroll(function() {
    checkErasmusPosition()
})), $(document).ready(function() {
    $(".erasmus-pavilion").length > 0 && (checkErasmusSlider(), $(window).resize(function() {
        checkErasmusSlider()
    }), $(".erasmus-pavilion .diagrams .navigation li:nth-child(1) a").bind("click", function(t) {
        $(this).parent().hasClass("active") || ($(".erasmus-pavilion .diagrams .navigation li").removeClass("active"), $(this).parent().addClass("active"), $(".erasmus-pavilion .diagrams .slidesjs-pagination li:nth-child(1) a").click()), t.preventDefault()
    }), $(".erasmus-pavilion .diagrams .navigation li:nth-child(2) a").bind("click", function(t) {
        $(this).parent().hasClass("active") || ($(".erasmus-pavilion .diagrams .navigation li").removeClass("active"), $(this).parent().addClass("active"), $(".erasmus-pavilion .diagrams .slidesjs-pagination li:nth-child(2) a").click()), t.preventDefault()
    }), $(".erasmus-pavilion .diagrams .navigation li:nth-child(3) a").bind("click", function(t) {
        $(this).parent().hasClass("active") || ($(".erasmus-pavilion .diagrams .navigation li").removeClass("active"), $(this).parent().addClass("active"), $(".erasmus-pavilion .diagrams .slidesjs-pagination li:nth-child(3) a").click()), t.preventDefault()
    }))
}), $(document).ready(function() {
    $(".rhijnspoorbuilding").length > 0 && (checkRhijnspoorSlider(), $(window).resize(function() {
        checkRhijnspoorSlider()
    }), $(".rhijnspoorbuilding .slides.fade a").bind("click", function(t) {
        t.preventDefault()
    }), $(".rhijnspoorbuilding .slides.fade").bind("click", function(t) {
        t || (t = window.event), t.target ? slidesTarget = t.target : t.srcElement && (slidesTarget = t.srcElement), $(this).find(".slidesjs-next").click()
    }))
}), $("body#contact").length > 0 && (checkFooterPosition(), $(window).resize(function() {
    checkFooterPosition()
})), $(document).ready(function() {
    $("body#contact").length > 0 && $(".cols .col").mouseenter(function() {
        $(this).hasClass("rotterdam") ? $(".locations .backgrounds .rotterdam").addClass("visible").siblings().removeClass("visible") : $(this).hasClass("copenhagen") ? $(".locations .backgrounds .copenhagen").addClass("visible").siblings().removeClass("visible") : $(this).hasClass("shanghai") && $(".locations .backgrounds .shanghai").addClass("visible").siblings().removeClass("visible")
    })
}), $(document).ready(function() {
    $("body.error").length > 0 && (checkErrorFooterPosition(), $(window).resize(function() {
        checkErrorFooterPosition()
    }))
}), $(function() {
    function t() {
        var t = jQuery(window).scrollTop();
        villageHouseDrawer = $("#svg"), villageHouseDrawerOffset = villageHouseDrawer.offset(), villageHouseDrawerOffsetTop = villageHouseDrawerOffset.top, villageHouseDrawerOffsetBottom = villageHouseDrawerOffset.top + villageHouseDrawer.height(), t > 0 && villageHouseDrawerOffsetBottom - 27 > t ? (i = $("body").scrollTop(), i > e ? $("nav").addClass("village-house-closed") : $("nav").removeClass("village-house-closed")) : t > $(window).height() && $("nav").removeClass("village-house-closed"), e = i
    }
    var e, i;
    $("body.village-house").length > 0 && (e = 0, t(), $(document).scroll(function() {
        t()
    }))
});