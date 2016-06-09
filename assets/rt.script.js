Array.prototype.indexOf || (Array.prototype.indexOf = function (e) {
    return jQuery.inArray(e, this)
}), $.fn.inView = function () {
    var e = $(window);
    obj = $(this);
    var t = e.scrollTop(),
        i = e.scrollTop() + e.height(),
        a = obj.offset().top + 20;
    return i >= a && a >= t ? !0 : !1
}, $.fn.exists = function () {
    return $(this).length > 0 ? !0 : !1
}, $.fn.replaceImageWithOneOfNewSrc = function (e) {
    var t = $(this).clone().wrap("<div />").parent().html();
    t = t.replace(/(src=")([^"]*)/gi, "$1" + e);
    var i = $(t);
    return $(this).after(i).remove(), i
}, $.fn.fadeToAnotherImage = function (e, t) {
    var i = $(this),
        a = i.height(),
        o = !i.parent().hasClass("heightkeeper") && i.attr("src") != e;
    return o ? (i.wrap($('<div class="heightkeeper" />').css({
        height: a,
        overflow: "hidden"
    })).stop(!0, !0).animate({
        opacity: 0
    }, 200, function () {
        i = i.replaceImageWithOneOfNewSrc(e), i.imagesLoaded(function () {
            i.stop(!0, !0).animate({
                opacity: 1
            }, 200), i.parent().stop(!0, !0).animate({
                height: i.height()
            }, 500, function () {
                i.unwrap(), t && t(i)
            })
        })
    }), !0) : !1
}, $.fn.fillWithShopifyProduct = function () {
    return $(this).each(function () {
        var e = $(this).data("fill-with-product"),
            t = $(this).find('script[type="text/template"]'),
            i = t.html();
        $.getJSON("/products/" + e + ".json", function (e) {
            var a = e.product;
            for (var o in a) i = i.replace(new RegExp("\\[" + o + "\\]", "ig"), a[o]);
            var r = a.image.src.lastIndexOf(".");
            i = i.replace(/\[img:([a-z]*)\]/gi, a.image.src.slice(0, r) + "_$1" + a.image.src.slice(r)), t.replaceWith(i)
        })
    })
}, window.selectCallback = function (e, t) {
    if (e)
        for (i = 0; i < e.options.length; i++) parseFloat(jQuery.fn.jquery) < 1.6 ? jQuery('.swatch[data-option-index="' + i + '"] :radio[value="' + e.options[i] + '"]').attr("checked", "checked") : jQuery('.swatch[data-option-index="' + i + '"] :radio[value="' + e.options[i] + '"]').prop("checked", !0);
    if (e)
        if (e.available) {
            if (e.compare_at_price > e.price) {
                var a = '<span class="price_percentage">-' + Math.round((e.compare_at_price - e.price) / e.compare_at_price * 100) + "%</span>";
                jQuery("#price").html('<del class="price_compare">' + Shopify.formatMoney(e.compare_at_price, window.money_format) + "</del>" + a + '<div class="price">' + Shopify.formatMoney(e.price, window.money_format) + "</div>")
            } else jQuery("#price").html('<div class="price">' + Shopify.formatMoney(e.price, window.money_format) + "</div>");
            jQuery("#add").removeClass("disabled").removeAttr("disabled").html(jQuery("#add").data("addtocart")), e.inventory_management && e.inventory_quantity <= 0 ? (jQuery("#selected-variant").html(t.product.title + " - " + e.title), jQuery("#backorder").removeClass("hidden")) : jQuery("#backorder").addClass("hidden")
        } else jQuery("#backorder").addClass("hidden"), jQuery("#add").html(jQuery("#add").data("soldout")).addClass("disabled").attr("disabled", "disabled");
    else {
        var o = jQuery("#add").data("unavailable"),
            r = $(".selector-wrapper select").filter(function () {
                return "" == $(this).val()
            }).length > 0;
        r && (o = jQuery("#add").data("addtocart")), jQuery("#price del").remove(), jQuery("#backorder").addClass("hidden"), jQuery("#add").html(o).addClass("disabled").attr("disabled", "disabled")
    }
    if (e && e.featured_image) {
        var n = Shopify.Image.removeProtocol(e.featured_image.src);
        $(".thumbnails a.thumbnail").filter('[href="' + n + '"]').trigger("click")
    }
    e && e.sku ? $("#sku").removeClass("hidden").find("span").html(e.sku) : $("#sku").addClass("hidden").find("span").html("")
}, jQuery(window).resize(function () {
    roar.handleSticky(), roar.detectOptions(), window.slideshow_scale ? roar.mockupCaptionSlider2() : roar.mockupCaptionSlider(), roar.mockupCaptionVideo(), roar.mockupStaticBlock(), roar.mockupLookbookBlock()
}), $(window).scroll(function () {
    roar.closeThemeCtl2()
}), jQuery(document).ready(function () {
    roar.init(), jQuery("[data-fill-with-product]").fillWithShopifyProduct()
});
var ctlCloseButton = '<a class="close-ctl" href="javascript:;" data-ctl-close><i class="zmdi zmdi-close"></i></a>',
    roar = {
        timeout: null,
        init: function () {
            this.megaMenu(), this.mockupCaptionVideo(), this.detectOptions(), this.handleHomepage(), this.handleTooltip(), this.handleCountdown(), this.handleTabs(), this.handleSearch(), this.handleSliding(), this.callbackSearchMobile(), this.handleMenuMobile(), this.handleCartSidebar(), this.handleSlideshow(), this.handleMap(), this.handleScrollToTop(), this.handleSmoothScroll(), this.mapFilters(), this.handleVideo(), this.materialEffect(), this.closeThemeCtlEvents(), this.handleThumbTip(), this.handleEffects(), this.handleSticky(), this.handleQuickshop(), this.handleMore(), this.handleInfiniteScoll(), fakewaffle.responsiveTabs(["xs"])
        },
        handleInfiniteScoll: function () {
            function e() {
                pInfScrNode = $(".infinite_scoll").last(), pInfScrURL = $(".infinite_scoll a").last().attr("href"), !i && pInfScrNode.length > 0 && $.ajax({
                    type: "GET",
                    url: pInfScrURL,
                    beforeSend: function () {
                        i = !0, jQuery(".infinite_scoll a").addClass("animate-load")
                    },
                    success: function (e) {
                        var t = $(e).find(".product_item"),
                            a = jQuery(".cat-grid");
                        a.append(t), jQuery(e).find(".infinite_scoll a").length ? (jQuery(".infinite_scoll a").last().attr("href", jQuery(e).find(".infinite_scoll a").last().attr("href")), jQuery(".infinite_scoll a").removeClass("animate-load")) : jQuery(".infinite_scoll").empty(), i = !1, roar.loadingEffects(), roar.handleReviews()
                    },
                    dataType: "html"
                })
            }

            function t() {
                jQuery(".advanced-pagination").on("click", ".infinite_scoll a", function (t) {
                    return e(), t.stopPropagation(), !1
                })
            }
            if ($(".infinite_scoll").length) {
                var i = !1;
                jQuery(document).ready(function () {
                    t()
                })
            }
        },
        handleMore: function () {
            $("#header_nav.style1 .top-bar-arrow").click(function () {
                var e = $(this);
                e.hasClass("act") ? ($(".site-right").slideDown(), $("#site-more").slideDown(), e.removeClass("act")) : ($("#site-more").slideUp(), $(".site-right").slideUp(), e.addClass("act"))
            }), $("#header_nav.style2 .top-bar-arrow").click(function () {
                var e = $(this);
                e.hasClass("act") ? ($("#top-bar").slideDown(), e.removeClass("act")) : ($("#top-bar").slideUp(), e.addClass("act"))
            })
        },
        showThemeGallery: function (e, t, i) {
            jQuery(t).addClass("is_loading"), jQuery("#theme-gallery").remove();
            for (var a = jQuery(['<div id="theme-gallery" class="theme-ctl">', '<div class="theme-gallery">', '<div class="theme-viewport swiper-container">', '<div class="theme-images swiper-wrapper">', "</div>", "</div>", '<div class="swiper-scrollbar"></div>', '<div class="theme-thumbs"></div>', "</div>", "</div>"].join("")).appendTo(jQuery("body")), o = a.find(".theme-images"), r = 0; r < e.length; r++) i != e[r] && jQuery('<div class="theme-img swiper-slide"/>').append(jQuery("<img/>").attr("src", e[r])).appendTo(o);
            a.find(".theme-images").clone().attr("class", "theme-thumbs-inner").appendTo(a.find(".theme-thumbs")).find(".theme-img").removeClass("swiper-slide").find("img").wrap('<a href="#"/>'), a.imagesLoaded(function () {
                roar.showThemeCtl(a);
                var e = jQuery("#theme-gallery .swiper-container");
                jQuery(window).off(".themeGalleryResize").on("doThemeGalleryResizeCheck.themeGalleryResize resize.themeGalleryResize", function () {
                    var t = e.parent().height();
                    e.height(t), e.find("img").height(t)
                }).trigger("doThemeGalleryResizeCheck");
                var i = {
                    mode: "horizontal",
                    loop: !1,
                    slidesPerView: "auto",
                    slidesPerViewFit: !1,
                    resizeReInit: !0,
                    cssWidthAndHeight: !0,
                    calculateHeight: !1,
                    freeMode: !0,
                    freeModeFluid: !0,
                    scrollContainer: !0,
                    grabCursor: !0,
                    createPagination: !1
                };
                jQuery("html").hasClass("ie8") || jQuery.extend(i, {
                    scrollbar: {
                        container: ".swiper-scrollbar",
                        draggable: !1,
                        hide: !1,
                        snapOnRelease: !0
                    }
                });
                var o = e.swiper(i);
                jQuery("#theme-gallery .theme-thumbs").on("click", "a", function () {
                    return o.swipeTo(jQuery(this).parent().index(), 1e3), !1
                }), jQuery(t).removeClass("is_loading")
            })
        },
        handleQuickshop: function () {
            function resizeColorBox() {
                resizeTimer && clearTimeout(resizeTimer), resizeTimer = setTimeout(function () {
                    $("#cboxOverlay").is(":visible") && ($.colorbox.resize({
                        width: $(window).width() > myWidth + 20 ? myWidth : Math.round($(window).width() * percentageWidth)
                    }), $(".cboxPhoto").css({
                        width: $("#cboxLoadedContent").innerWidth(),
                        height: "auto"
                    }), $("#cboxLoadedContent").height($(".cboxPhoto").height()), $.colorbox.resize())
                }, 300)
            }
            jQuery.colorbox.settings.maxWidth = "95%", jQuery.colorbox.settings.width = "960px";
            var myWidth = 960,
                percentageWidth = .95,
                resizeTimer;
            $(window).resize(resizeColorBox), window.addEventListener("orientationchange", resizeColorBox, !1), roar.isMobile() || ($(document).on("initzoom", ".product-gallery .main .main-img-link", function () {
                $(this).trigger("zoom.destroy"), $(this).zoom({
                    url: $(this).attr("href")
                })
            }), $(".product-gallery .main .main-img-link").trigger("initzoom")), $(document).on("initproduct", "#product-form", function () {
                var e = $(this).find("#product-select");
                if (1 == e.length) {
                    var t = ($(this).find(".product-form"), window.products["id" + $(this).data("product-id")]);
                    new Shopify.OptionSelectors(e.attr("id"), {
                        product: t,
                        onVariantSelected: selectCallback,
                        enableHistoryState: !1
                    }), t.available && t.options.length > 1 && Shopify.linkOptionSelectors(t), roar.createVariantsSwatch(t, $(this)), 1 == t.variants.length && "Default Title" == t.variants[0].title && jQuery(".selector-wrapper").hide();
                    for (var i = !1, a = 0; a < t.variants.length; a++) {
                        var o = t.variants[a];
                        if (o.available && 0 == i) {
                            i = !0;
                            for (var r = 0; r < o.options.length; r++) $(".single-option-selector:eq(" + r + ")").val(o.options[r]).trigger("change")
                        }
                    }
                }
            }), $("#product-form").trigger("initproduct"), $(document).on("click", ".product-gallery .thumbnails .thumbnail", function (e) {
                e.preventDefault();
                var t = $(this).closest(".product-gallery"),
                    i = t.find(".main img.main-img");
                $(this).data("src") != i.attr("src") && t.find(".main .main-img-link").addClass("is_loading"), i.attr("alt", $(this).attr("title")).fadeToAnotherImage($(this).data("src"), function (e) {
                    e.closest(".main-img-link").removeClass("is_loading").trigger("initzoom"), t.closest(".quickbuy-form").length > 0 && $.colorbox.resize()
                }) && (t.find(".main .main-img-link").trigger("zoom.destroy").attr({
                    href: $(this).attr("href"),
                    title: $(this).attr("title")
                }), $(this).addClass("active").siblings(".active").removeClass("active"))
            }), $(document).on("click", ".quick-shop", function () {
                var $prod = $(this).closest(".product_item"),
                    prevIndex = $prod.index(".product_item") - 1,
                    nextIndex = $prod.index(".product_item") + 1;
                nextIndex > $prod.siblings(".product_item").length && (nextIndex = -1), eval($prod.find("[id^=product-block-json-]").html());
                var template = $prod.find("[id^=product-block-template-]").html();
                return $.colorbox({
                    onOpen: function () {
                        $("body").addClass("cbox-active")
                    },
                    onClosed: function () {
                        $("body").removeClass("cbox-active")
                    },
                    closeButton: !1,
                    html: ['<div class="action-icons">', '<a href="javascript:;" class="prev-item action-icon" data-idx="', prevIndex, '"><span class="zmdi zmdi-arrow-back"></span></a>', '<a href="javascript:;" class="next-item action-icon" data-idx="', nextIndex, '"><span class="zmdi zmdi-arrow-forward"></span></a>', '<a href="javascript:;" class="close-box action-icon"><span class="zmdi zmdi-close"></span></a>', "</div>", template].join(""),
                    onComplete: function () {
                        $("#product-form").trigger("initproduct"), $.colorbox.resize(), $(".quickbuy-form").imagesLoaded(function () {
                            $.colorbox.resize(), $(".product-gallery .main .main-img-link").trigger("initzoom")
                        }), $(".product-details .product-wishlist").html($prod.find(".product-buttons .product-wishlist").html()), window.show_multiple_currencies && currenciesCallbackSpecial(".quickbuy-form span.money")
                    }
                }), !1
            }), $(document).on("click", "#colorbox .action-icons .close-box", function () {
                return $.colorbox.close(), !1
            }).on("click", "#colorbox .action-icons .prev-item, #colorbox .action-icons .next-item", function () {
                return $(".product_item:eq(" + $(this).data("idx") + ") .quick-shop").click(), !1
            })
        },
        handleSticky: function () {
            if (jQuery("#header.sticky-header").length > 0) {
                var e = 0,
                    t = jQuery("#header_nav").css("height", "auto").outerHeight() + jQuery("#site-navigation").outerHeight(),
                    i = jQuery("#header_nav").css("height", "auto").outerHeight(),
                    a = window.innerWidth;
                a > 767 ? jQuery("#header_nav").css("height", i) : jQuery("#header_nav").css("height", "auto"), jQuery(window).scroll(function () {
                    var i = jQuery(this).scrollTop(),
                        a = window.innerWidth;
                    i > t && a > 767 ? (jQuery("#header_nav").addClass("is-sticky"), jQuery("#site-navigation").addClass("fadeInDown")) : (jQuery("#header_nav").removeClass("is-sticky"), jQuery("#site-navigation").removeClass("fadeInDown"));
                    var o = jQuery(this).scrollTop(),
                        r = 800;
                    if (jQuery("#home-slider").length > 0) {
                        var n = jQuery("#home-slider"),
                            s = n.offset().top,
                            l = n.height();
                        r = s + l + 100
                    }
                    o > e && o > r ? jQuery(".sticky-header").addClass("sticky-header-hide") : jQuery(".sticky-header").hasClass("sticky-header-hide") && jQuery(".sticky-header").removeClass("sticky-header-hide"), e = o
                })
            }
        },
        hoverIntent: function () {
            jQuery(".nav-dropdown-parent").hoverIntent(function () {
                var e = jQuery(this),
                    t = e.find(".nav-dropdown");
                t.slideDown(400, "jswing", function () {
                    e.addClass("active")
                })
            }, function () {
                var e = jQuery(this),
                    t = e.find(".nav-dropdown");
                t.slideUp(400, "jswing", function () {
                    e.removeClass("active")
                })
            })
        },
        handleEffects: function () {
            var e = $(".animated:not(.shown)");
            e.exists() && (setTimeout(function () {
                roar.loadingEffects()
            }, 100), $(window).on("scroll", function () {
                roar.loadingEffects()
            }))
        },
        loadingEffects: function () {
            var e = $(".animated:not(.shown)");
            e.exists() && roar.precessEffects(e)
        },
        precessEffects: function (e) {
            var t = 0;
            e.each(function () {
                var e = $(this);
                $("html.touch").length > 0 ? e.hasClass("shown") || e.hasClass("animation-triggered") || (e.addClass("animation-triggered"), setTimeout(function () {
                    e.hasClass("animation-triggered") && e.removeClass("animation-triggered").addClass("shown")
                }, 200)) : e.hasClass("shown") || e.hasClass("animation-triggered") || !e.inView() || (e.addClass("animation-triggered"), t++, setTimeout(function () {
                    e.hasClass("animation-triggered") && e.removeClass("animation-triggered").addClass("shown")
                }, 100 * t))
            })
        },
        handleThumbTip: function () {
            jQuery(".tip_holder_big").each(function () {
                var e = jQuery(this).find(".tip_holder_small");
                jQuery(this).hover(function () {
                    e.addClass("hover").appendTo("body")
                }, function () {
                    e.removeClass("hover").appendTo(this)
                }).mousemove(function (t) {
                    var i = t.pageX + 60,
                        a = t.pageY - 50,
                        o = e.width(),
                        r = e.height(),
                        n = jQuery(window).width() - (i + o);
                    jQuery(window).height() - (a + r), 50 > n && (i = t.pageX - o - 60), e.css({
                        left: i,
                        top: a
                    })
                })
            })
        },
        handleGallery: function (e, t, i) {
            jQuery(t).addClass("loading"), jQuery("#theme-gallery").remove();
            for (var a = jQuery(['<div id="theme-gallery" class="theme-ctl">', '<div class="theme-gallery">', '<div class="theme-viewport swiper-container">', '<div class="theme-images swiper-wrapper">', "</div>", "</div>", '<div class="swiper-scrollbar"></div>', '<div class="theme-thumbs"></div>', "</div>", "</div>"].join("")).appendTo(jQuery("body")), o = a.find(".theme-images"), r = 0; r < e.length; r++) i != e[r] && jQuery('<div class="theme-img swiper-slide"/>').append(jQuery("<img/>").attr("src", e[r])).appendTo(o);
            a.find(".theme-images").clone().attr("class", "theme-thumbs-inner").appendTo(a.find(".theme-thumbs")).find(".theme-img").removeClass("swiper-slide").find("img").wrap('<a href="#"/>'), a.imagesLoaded(function () {
                roar.showThemeCtl(a);
                var e = jQuery("#theme-gallery .swiper-container");
                jQuery(window).off(".themeGalleryResize").on("doThemeGalleryResizeCheck.themeGalleryResize resize.themeGalleryResize", function () {
                    var t = e.parent().height();
                    e.height(t), e.find("img").height(t)
                }).trigger("doThemeGalleryResizeCheck");
                var i = {
                    mode: "horizontal",
                    loop: !1,
                    slidesPerView: "auto",
                    slidesPerViewFit: !1,
                    resizeReInit: !0,
                    cssWidthAndHeight: !0,
                    calculateHeight: !1,
                    freeMode: !0,
                    freeModeFluid: !0,
                    scrollContainer: !0,
                    grabCursor: !0,
                    createPagination: !1
                };
                jQuery("html").hasClass("ie8") || jQuery.extend(i, {
                    scrollbar: {
                        container: ".swiper-scrollbar",
                        draggable: !1,
                        hide: !1,
                        snapOnRelease: !0
                    }
                });
                var o = e.swiper(i);
                jQuery("#theme-gallery .theme-thumbs").on("click", "a", function () {
                    return o.swipeTo(jQuery(this).parent().index(), 1e3), !1
                }), jQuery(t).removeClass("loading")
            })
        },
        showThemeCtl: function (e) {
            roar.closeThemeCtl(!0), jQuery(".theme-ctl.temp").remove();
            var t = jQuery(e);
            t.appendTo("body").addClass("reveal").find(".ctl-actions").remove(), t.prepend('<div class="ctl-actions">' + ctlCloseButton + "</div>"), roar.isPageScrollin() && jQuery("#page, #site-control").css("padding-right", jQuery.scrollBarWidth()), jQuery("body").addClass("ctl-active")
        },
        showThemeCtl2: function (e) {
            roar.closeThemeCtl2(!0);
            var t = jQuery(e);
            t.addClass("reveal2")
        },
        closeThemeCtl: function () {
            clearTimeout(roar.timeout), jQuery("a[data-ctl-toggle].active").removeClass("active"), jQuery(".theme-ctl.reveal").removeClass("reveal").addClass("unreveal"), jQuery("body").removeClass("ctl-active"), roar.isPageScrollin() && jQuery("body").css("padding-right", 0)
        },
        closeThemeCtl2: function () {
            clearTimeout(roar.timeout), jQuery(".theme-ctl.reveal2").removeClass("reveal2")
        },
        closeThemeCtlEvents: function () {
            jQuery(document).on("click", "body:not(.ctl-active) a[data-ctl-toggle]", function (e) {
                e.preventDefault();
                var t = jQuery(jQuery(this).data("ctl-toggle")).removeClass("unreveal").addClass("reveal");
                t.find(":input[type=search]:visible:first").focus(), jQuery(this).addClass("active"), roar.isPageScrollin() && jQuery("body").css("padding-right", jQuery.scrollBarWidth()), jQuery("body").addClass("ctl-active")
            }).on("keyup", function (e) {
                27 == e.which && roar.closeThemeCtl()
            }), jQuery(document).on("click", "body.ctl-active a[data-ctl-close]", function (e) {
                e.preventDefault(), roar.closeThemeCtl()
            }), jQuery(document).on("click", ".theme-ctl", function (e) {
                e.target == this && (e.preventDefault(), roar.closeThemeCtl(), jQuery(this).trigger("reset-ctl"))
            }), jQuery(document).on("click", "body.ctl-active a[data-ctl-toggle]", function (e) {
                e.preventDefault(), roar.closeThemeCtl(), jQuery(this).click()
            }), jQuery(document).on("click", "a[data-ctl-target]", function (e) {
                e.preventDefault(), roar.showThemeCtl($('<div class="theme-ctl temp"/>').append($('<div class="inner"/>').html(jQuery(jQuery(this).data("ctl-target")).wrapInner('<div class="container"/>').html())))
            })
        },
        isPageScrollin: function () {
            return jQuery("#page").outerHeight() > jQuery(window).height()
        },
        materialEffect: function () {
            jQuery(".ripple").on("click", function (e) {
                var t = e.target,
                    i = t.getBoundingClientRect(),
                    a = t.querySelector(".ripple-effect");
                a || (a = document.createElement("span"), a.className = "ripple-effect", a.style.height = a.style.width = Math.max(i.width, i.height) + "px", t.appendChild(a)), a.classList.remove("show");
                var o = e.pageY - i.top - a.offsetHeight / 2 - document.body.scrollTop,
                    r = e.pageX - i.left - a.offsetWidth / 2 - document.body.scrollLeft;
                a.style.top = o + "px", a.style.left = r + "px", a.classList.add("show")
            });
            var e = function () {
                var e = jQuery(this);
                "hidden" != e.attr("type") && e.toggleClass("not-empty", "" != e.val())
            };
            jQuery("input, textarea").each(e).on("input", e)
        },
        megaMenu: function () {
            jQuery(".is-mega .mega-menu.style_1 .item").hoverIntent(function () {
                var e = jQuery(this),
                    t = e.closest(".mega-menu").find(".item"),
                    i = e.find(".mega-menu-content > .wrap");
                t.removeClass("hover"), e.addClass("hover"), i.fadeIn(400, function () {
                    var t = e.closest(".mega-menu").find(".item:not(.hover) .mega-menu-content > .wrap");
                    t.hide()
                })
            }), jQuery(".is-mega .mega-menu.style_3 .item").hoverIntent(function () {
                var e = jQuery(this),
                    t = e.closest(".mega-menu").find(".item"),
                    i = e.find(".mega-menu-content > .wrap");
                t.removeClass("hover"), e.addClass("hover"), i.fadeIn(400, function () {
                    var t = e.closest(".mega-menu").find(".item:not(.hover) .mega-menu-content > .wrap");
                    t.hide()
                })
            }), jQuery(".is-mega .mega-menu.style_4 .item").hoverIntent(function () {
                var e = jQuery(this).find(".img-visual"),
                    t = jQuery(this).closest(".mega-menu").find(".img-visual-first");
                e.length && e.find("a").data("id") != t.find("a").data("id") && t.html(e.html())
            })
        },
        handleVideo: function () {
            var e = jQuery(".responsive-video iframe");
            e.each(function () {
                jQuery(this).removeAttr("height").removeAttr("width")
            }), jQuery(".responsive-video").fitVids({
                customSelector: "iframe[src^='https://w.soundcloud.com'], iframe[src^='http://myviiids.com']"
            })
        },
        setPossitionTag: function () {
            if (jQuery(".filters-bar").length) {
                var e = jQuery(".filters-bar").find(".advanced-filter"),
                    t = jQuery(".filters-bar").offset().left;
                e.each(function () {
                    var e = jQuery(this).parents(".column"),
                        i = e.find(".filter_title"),
                        a = e.find(".fields"),
                        o = i.offset().left;
                    a.css("padding-left", o - t)
                })
            }
        },
        setLocationTag: function () {
            jQuery("#module-content").on("click", ".filters-bar .filter_title span", function () {
                var e = jQuery(this).parent(),
                    t = e.closest(".column").find(".filter_container");
                jQuery("#module-content #sandBox .filters-bar:not(.is_filter) .filter_container").slideUp(), t.is(":visible") ? (e.removeClass("active"), t.slideUp()) : (jQuery("#module-content #sandBox .filters-bar .filter_title").removeClass("active"), e.addClass("active"), t.slideDown())
            }), jQuery("#module-content").on("click", ".filter_close", function (e) {
                return jQuery("#module-content #sandBox .filters-bar .filter_title").removeClass("active"), jQuery("#module-content #sandBox .filter_container").slideUp(), e.preventDefault(), !1
            })
        },
        mapClearFilter: function () {
            jQuery(".filters-bar .column").each(function () {
                var e = jQuery(this);
                e.find("input:checked").length > 0 && e.find(".clear").click(function (t) {
                    var i = [];
                    Shopify.queryParams.constraint && (i = Shopify.queryParams.constraint.split("+")), e.find("input:checked").each(function () {
                        var e = jQuery(this),
                            t = e.val();
                        if (t) {
                            var a = i.indexOf(t);
                            a >= 0 && i.splice(a, 1)
                        }
                    }), i.length ? Shopify.queryParams.constraint = i.join("+") : delete Shopify.queryParams.constraint, roar.filterAjaxClick(), t.preventDefault()
                })
            })
        },
        mapClearAllFilter: function () {
            jQuery(".filters-bar").on("click", ".clearall", function (e) {
                delete Shopify.queryParams.constraint, delete Shopify.queryParams.q, roar.filterAjaxClick(), e.preventDefault()
            })
        },
        mapSingleFilter: function () {
            jQuery("#module-content").on("click", ".advanced-filter .field:not(.disable)", function () {
                var e = jQuery(this),
                    t = e.find("input").val(),
                    i = [];
                if (Shopify.queryParams.constraint && (i = Shopify.queryParams.constraint.split("+")), !window.enable_filter_multiple_choice && !e.hasClass("active")) {
                    var a = e.parents(".advanced-filter").find(".active");
                    a.length > 0 && a.each(function () {
                        var e = jQuery(this).data("handle");
                        if (jQuery(this).removeClass("active"), e) {
                            var t = i.indexOf(e);
                            t >= 0 && i.splice(t, 1)
                        }
                    })
                }
                if (t) {
                    var o = i.indexOf(t);
                    0 > o ? (i.push(t), e.addClass("active")) : (i.splice(o, 1), e.removeClass("active"))
                }
                i.length ? Shopify.queryParams.constraint = i.join("+") : delete Shopify.queryParams.constraint, roar.filterAjaxClick()
            })
        },
        mapSingleCollection: function () {
            jQuery("#module-content").on("click", ".advanced-collection .field", function (e) {
                var t = jQuery(this),
                    i = t.find("input").val();
                t.hasClass("active") || (roar.filterAjaxClick(i), jQuery(".advanced-collection .field").removeClass("active"), t.addClass("active"), e.preventDefault())
            })
        },
        mapSingleSortby: function () {
            jQuery("#module-content").on("change", ".advanced-sortby .field", function (e) {
                var t = jQuery(this),
                    i = t.val();
                Shopify.queryParams.sort_by = i, roar.filterAjaxClick(), e.preventDefault()
            })
        },
        mapSingleViewas: function () {
            jQuery("#module-content").on("click", ".advanced-viewas .field", function (e) {
                var t = jQuery(this),
                    i = t.data("handle");
                t.hasClass("active") || (Shopify.queryParams.view = i, roar.filterAjaxClick(), e.preventDefault())
            })
        },
        mapSinglePagination: function () {
            jQuery("#module-content").on("click", ".advanced-pagination a", function (e) {
                var t = jQuery(this);
                delete Shopify.queryParams.page, delete Shopify.queryParams.constraint, delete Shopify.queryParams.q, delete Shopify.queryParams.sort_by, roar.filterAjaxClick(t.attr("href")), e.preventDefault()
            })
        },
        mapFilters: function () {
            roar.setLocationTag(), roar.handleGridList(), roar.handleFilters(), roar.mapSingleFilter(), roar.mapSingleCollection(), roar.mapSingleSortby(), roar.mapSingleViewas(), roar.mapSinglePagination(), roar.mapClearFilter(), roar.mapClearAllFilter()
        },
        filterCreateUrl: function (e) {
            var t = jQuery.param(Shopify.queryParams).replace(/%2B/g, "+");
            return e ? "" != t ? e + "?" + t : e : location.pathname + "?" + t
        },
        filterAjaxClick: function (e) {
            delete Shopify.queryParams.page;
            var t = roar.filterCreateUrl(e);
            roar.filterGetContent(t)
        },
        filterGetContent: function (e) {
            jQuery.ajax({
                type: "get",
                url: e,
                beforeSend: function () {
                    jQuery("body").addClass("is_loading")
                },
                success: function (t) {
                    var i = t.match("<title>(.*?)</title>")[1];
                    jQuery("#filters").empty().html(jQuery(t).find("#filters").html()), jQuery("#sandBox").empty().html(jQuery(t).find("#sandBox").html()), jQuery(".filter-widgets").empty().html(jQuery(t).find(".filter-widgets").html()), jQuery(".advanced-pagination").empty().html(jQuery(t).find(".advanced-pagination").html()), jQuery(".page-top").empty().html(jQuery(t).find(".page-top").html()), jQuery(".infinite_scoll").length && jQuery(t).find(".infinite_scoll").length && jQuery(".infinite_scoll").removeClass("invisible").empty().html(jQuery(t).find(".infinite_scoll").html()), History.pushState({
                        param: Shopify.queryParams
                    }, i, e), setTimeout(function () {
                        jQuery("html,body").animate({
                            scrollTop: jQuery("#module-content .nav-elements-container").offset().top
                        }, 500, "swing")
                    }, 100), jQuery("body").removeClass("is_loading"), roar.loadingEffects(), roar.mapClearFilter(), roar.mapClearAllFilter(), roar.handleTooltip(), roar.handleReviews()
                },
                error: function () {
                    jQuery("body").removeClass("is_loading")
                }
            })
        },
        handleReviews: function () {
            SPR.registerCallbacks(), SPR.initRatingHandler(), SPR.initDomEls(), SPR.loadProducts(), SPR.loadBadges()
        },
        handleFilters: function () {
            jQuery("body").on("click", ".nav-filters .btn-filter", function (e) {
                e.stopPropagation(), jQuery("html,body").toggleClass("filter-opened"), jQuery(".filters-bar").toggleClass("is_filter")
            }), jQuery("body").on("click", ".filters-bar .nav_close", function () {
                jQuery("html,body").removeClass("filter-opened"), jQuery(".filters-bar").removeClass("is_filter")
            })
        },
        getHeightOfProductCase: function () {
            var e;
            return jQuery("#sandBox").hasClass("list") ? (e = jQuery(".product_item .displayed").parent().height(), e = e < window.list_height ? window.list_height : e) : (e = jQuery(".product_item").first().height(), e = e < window.grid_height ? window.grid_height : e), e
        },
        buildProductItem: function () {
            jQuery("select.product-select").each(function (e) {
                var t = new Date,
                    i = t.getTime() + e;
                jQuery(this).attr("id", "product-select-" + i).attr("data-id", i)
            })
        },
        createVariantsSwatch: function (e, t) {
            var a = new Array;
            if (window.swatch_size && a.push("Size"), window.swatch_color && (a.push("Color"), a.push("Colour")), a.length > 0) {
                var o = ".png",
                    r = !1,
                    n = !1,
                    s = 0,
                    l = window.asset_url.substring(0, window.asset_url.lastIndexOf("?"));
                for (i = 0; i < e.options.length; i++) {
                    var d = "";
                    if (d = "object" == typeof e.options[i] ? e.options[i].name : e.options[i], r = !1, n = !1, a.indexOf(d) > -1) {
                        r = !0, s = i;
                        var c = d.toLowerCase();
                        if (/color|colour/i.test(c) && (n = !0), r) {
                            var u = "",
                                h = "";
                            /size/i.test(d.toLowerCase()) && window.size_chart && (h = '<a id="size_chart_trigger" href="#" class="sizechart-ctl" data-ctl-toggle="#sizechart-ctl">' + window.size_chart_txt + "</a>"), u += '<div class="swatch ' + c + ' clearfix" data-option-index="' + s + '">', u += '<div class="header"><span>' + d + "</span>" + h + "</div><div>";
                            var f = new Array;
                            for (j = 0; j < e.variants.length; j++) {
                                var m = e.variants[j],
                                    p = m.options[s],
                                    y = roar.convertToSlug(p),
                                    g = "swatch-" + s + "-" + y;
                                f.indexOf(p) < 0 && (u += '<div data-value="' + p + '" class="swatch-element ' + (n ? "color" : "") + y + (m.available ? " available " : " soldout ") + '">', n && (u += '<div class="tooltip">' + p + "</div>"), u += '<input id="' + g + '" type="radio" name="option-' + s + '" value="' + p + '"' + (0 == j ? " checked " : "") + (m.available ? "" : " disabled") + "/>", n ? (u += '<label for="' + g + '" class="img"><i style="background-color:' + y + "; background-image: url(" + l + y + o + ')">', u += '<img class="crossed-out" src="' + l + 'soldout.png" />', u += "</i></label>") : (u += '<label for="' + g + '">' + p, u += '<img class="crossed-out" src="' + l + 'soldout.png" />', u += "</label>"), u += "</div>", f.push(p))
                            }
                            u += "</div></div>", t.find("#product-variants > select").after(u), t.find(".swatch :radio").change(function () {
                                var e = jQuery(this).closest(".swatch").attr("data-option-index"),
                                    t = jQuery(this).val();
                                jQuery(this).closest("form").find(".single-option-selector").eq(e).val(t).trigger("change")
                            })
                        }
                    }
                }
            }
        },
        convertToSlug: function (e) {
            return e.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
        },
        isMobile: function () {
            var e = navigator.userAgent.toLowerCase();
            return Modernizr.touch || e.match(/(iphone|ipod|ipad)/) || e.match(/(android)/) || e.match(/(iemobile)/) || e.match(/iphone/i) || e.match(/ipad/i) || e.match(/ipod/i) || e.match(/blackberry/i) || e.match(/bada/i) || e.match(/windows phone/i) || e.match(/webOS/i) ? !0 : !1
        },
        getWidthBrowser: function () {
            var e;
            return "number" == typeof window.innerWidth ? e = window.innerWidth : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? e = document.documentElement.clientWidth : document.body && (document.body.clientWidth || document.body.clientHeight) && (e = document.body.clientWidth), e
        },
        getHeightBrowser: function () {
            var e;
            return "number" == typeof window.innerHeight ? e = window.innerHeight : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? e = document.documentElement.clientHeight : document.body && (document.body.clientWidth || document.body.clientHeight) && (e = document.body.clientHeight), e
        },
        handleFocus: function () {
            jQuery(".form-focus input").focus(function () {
                jQuery(this).parents(".form-focus").addClass("focus")
            }).blur(function () {
                jQuery(this).parents(".form-focus").removeClass("focus")
            })
        },
        handleBoxLogin: function () {
            jQuery("#loginBox input").focus(function () {
                jQuery(this).parents("#loginBox").addClass("focus")
            }).blur(function () {
                jQuery(this).parents("#loginBox").removeClass("focus")
            })
        },
        handleScrollToTop: function () {
            function e(e) {
                var t = jQuery("#scroll-top");
                t.removeClass("off on"), t.addClass("on" == e ? "on" : "off")
            }
            jQuery(window).scroll(function () {
                var t = jQuery(this).scrollTop(),
                    i = jQuery(this).height();
                if (t > 0) var a = t + i / 2;
                else var a = 1;
                e(1e3 > a ? "off" : "on")
            }), jQuery("#scroll-top").click(function (e) {
                e.preventDefault(), jQuery("html,body").animate({
                    scrollTop: 0
                }, 800, "swing")
            })
        },
        handleTooltip: function () {
            jQuery("body .btooltip").length && jQuery("body .btooltip").tooltip()
        },
        handleTabs: function () {
            jQuery("body").on("click", ".nav-tabs a", function (e) {
                e.preventDefault(), jQuery(this).tab("show")
            })
        },
        getRandomInt: function (e, t) {
            return Math.floor(Math.random() * (t - e + 1)) + e
        },
        mockupCaptionVideo: function () {
            if (jQuery("#home-video").length) {
                if (roar.getWidthBrowser() < 1200) {
                    var e = window.general_font_size,
                        t = window.video_heading_size,
                        i = window.video_caption_size,
                        a = roar.getWidthBrowser(),
                        o = t * a / 1200,
                        r = i * a / 1200;
                    e > o && (o = e), e > r && (r = e), jQuery("#home-video .video_caption").css({
                        "font-size": r
                    }), jQuery("#home-video .video_heading").css({
                        "font-size": o
                    })
                } else {
                    var t = window.video_heading_size,
                        i = window.video_caption_size;
                    jQuery("#home-video .video_caption").css({
                        "font-size": i
                    }), jQuery("#home-video .video_heading").css({
                        "font-size": t
                    })
                }
                var n = jQuery("#home-video").height() / 2,
                    s = jQuery("#home-video .video_width").height(),
                    l = n - s / 2;
                jQuery("#home-video .video_width").css({
                    top: l,
                    opacity: 1
                })
            }
        },
        mockupCaptionSlider2: function () {
            if (window.slideshow_show && jQuery("#home-slider").length) {
                var e = roar.getWidthBrowser(),
                    t = 30;
                jQuery("#home-slider .caption-content").each(1200 > e ? function () {
                    var i = jQuery(this).data("min"),
                        a = jQuery(this).data("max"),
                        o = a * e / 1200,
                        r = t * e / 1200;
                    i > o && (o = i), jQuery(this).css({
                        "font-size": o,
                        "padding-bottom": r
                    })
                } : function () {
                    var e = jQuery(this).data("max");
                    jQuery(this).css({
                        "font-size": e,
                        "padding-bottom": t
                    })
                });
                var i = jQuery("#home-slider").height() / 2;
                jQuery("#home-slider .slide-caption").each(function () {
                    var t = jQuery(this).data("position");
                    if (1 == t) {
                        var a = jQuery(this).data("left"),
                            o = jQuery(this).data("top"),
                            r = jQuery(this).data("right"),
                            n = jQuery(this).data("bottom"),
                            s = jQuery(this).data("width"),
                            l = jQuery(this).data("align");
                        "undefined" == typeof o && (o = "auto"), "undefined" == typeof n && (n = "auto"), "undefined" == typeof a && (a = "auto"), "undefined" == typeof r && (r = "auto"), 1200 > e && ("auto" != a && (a = a * e / 1200), "auto" != o && (o = o * e / 1200), "auto" != r && (r = r * e / 1200), "auto" != n && (n = n * e / 1200), s = s * e / 1200), jQuery(this).css({
                            top: o,
                            left: a,
                            bottom: n,
                            right: r,
                            "max-width": s,
                            "text-align": l,
                            display: "inline-block",
                            opacity: 1,
                            width: "auto",
                            "line-height": 1
                        })
                    } else {
                        var d = jQuery(this).height(),
                            c = i - d / 2;
                        jQuery(this).css({
                            top: c,
                            opacity: 1
                        })
                    }
                })
            }
        },
        mockupCaptionSlider: function () {
            if (window.slideshow_show && jQuery("#home-slider").length) {
                var e = roar.getWidthBrowser(),
                    t = 30;
                jQuery("#home-slider .caption-content").each(767 > e ? function () {
                    var i = jQuery(this).data("min"),
                        a = jQuery(this).data("max"),
                        o = a,
                        r = t * e / 767;
                    a > 50 && (o = 50), i > o && (o = i), jQuery(this).css({
                        "font-size": o,
                        "padding-bottom": r
                    })
                } : function () {
                    var e = jQuery(this).data("max");
                    jQuery(this).css({
                        "font-size": e,
                        "padding-bottom": t
                    })
                });
                var i = jQuery("#home-slider").height() / 2;
                jQuery("#home-slider .slide-caption").each(function () {
                    var t = jQuery(this).data("position");
                    if (1 == t) {
                        var a = jQuery(this).data("left"),
                            o = jQuery(this).data("top"),
                            r = jQuery(this).data("right"),
                            n = jQuery(this).data("bottom"),
                            s = jQuery(this).data("width"),
                            l = jQuery(this).data("align");
                        "undefined" == typeof o && (o = "auto"), "undefined" == typeof n && (n = "auto"), "undefined" == typeof a && (a = "auto"), "undefined" == typeof r && (r = "auto"), 1200 > e && ("auto" != a && (a = a * e / 1200), "auto" != o && (o = o * e / 1200), "auto" != r && (r = r * e / 1200), "auto" != n && (n = n * e / 1200), s = s * e / 1200), jQuery(this).css({
                            top: o,
                            left: a,
                            bottom: n,
                            right: r,
                            "max-width": s,
                            "text-align": l,
                            display: "inline-block",
                            opacity: 1,
                            width: "auto",
                            "line-height": 1
                        })
                    } else {
                        var d = jQuery(this).height(),
                            c = i - d / 2;
                        jQuery(this).css({
                            top: c,
                            opacity: 1
                        })
                    }
                })
            }
        },
        handleSlideshow: function () {
            window.slideshow_show && jQuery("#home-slider").length && (jQuery("#home-slider").flexslider({
                animation: "fade",
                prevText: "",
                nextText: "",
                slideshowSpeed: window.slideshow_interval,
                slideshow: window.slideshow_auto,
                controlNav: !1,
                start: function () {
                    jQuery("body").removeClass("loading")
                }
            }), imagesLoaded("#home-slider", function () {
                window.slideshow_scale ? roar.mockupCaptionSlider2() : roar.mockupCaptionSlider()
            }))
        },
        handleMap: function () {
            jQuery("#contact_map").length && jQuery().gMap && jQuery("#contact_map").gMap({
                zoom: window.contact_zoom,
                scrollwheel: window.contact_scroll,
                maptype: window.contact_type,
                markers: [{
                    address: window.contact_address,
                    html: "_address",
                    icon: {
                        image: window.contact_icon,
                        iconsize: [188, 68],
                        iconanchor: [0, 68]
                    }
                }]
            })
        },
        handleGridList: function () {
            jQuery("body").on("click", ".togrid", function () {
                var e = jQuery(this).closest(".nav-view-as");
                jQuery("body").removeClass("cat-list"), e.find(".tolist").removeClass("active"), jQuery(this).addClass("active")
            }), jQuery("body").on("click", ".tolist", function () {
                var e = jQuery(this).closest(".nav-view-as");
                jQuery("body").addClass("cat-list"), e.find(".togrid").removeClass("active"), jQuery(this).addClass("active")
            })
        },
        handleCartSidebar: function () {
            jQuery(".cart-controller").click(function (e) {
                e.stopPropagation(), jQuery(".cart-sidebar").toggleClass("opened"), jQuery("html,body").toggleClass("cart-opened")
            }), jQuery("#page").click(function () {
                jQuery(".cart-sidebar").removeClass("opened"), jQuery("html,body").removeClass("cart-opened")
            })
        },
        handleMenuMobile: function () {
            jQuery("#page").click(function () {
                jQuery(".menu-mobile").removeClass("opened"), jQuery("html,body").removeClass("menu-opened")
            }), jQuery("[data-toggle=offcanvas]").click(function (e) {
                e.stopPropagation(), jQuery(".menu-mobile").toggleClass("opened"), jQuery("html,body").toggleClass("menu-opened")
            }), jQuery(".is-mobile .menu-mobile .mobile_nav .expand").click(function () {
                var e = jQuery(this).parents(".parent_submenu").first();
                e.hasClass("is_open") ? e.removeClass("is_open") : e.addClass("is_open"), e.find(".dropdown_menu").first().slideToggle()
            })
        },
        handleSearch: function () {
            jQuery(".site-search-toggle").click(function () {
                var e = jQuery("#header");
                e.hasClass("is_search") ? e.removeClass("is_search") : (e.addClass("is_search"), jQuery("#input-ajax").focus())
            }), jQuery(".site-search-trigger").click(function () {
                jQuery(".search-menu-icon .site-search-toggle").trigger("click")
            })
        },
        handleSliding: function () {
            jQuery(".sb-toggle-wrapper").click(function () {
                var e = jQuery("#slidingbar-wrap");
                e.hasClass("is_sliding") ? e.removeClass("is_sliding") : e.addClass("is_sliding"), jQuery("#slidingbar").slideToggle()
            })
        },
        callbackSearchMobile: function () {
            var e = jQuery(".is-mobile .is-mobile-search .fa-search"),
                t = jQuery(".is-mobile .is-mobile-search .fa-times"),
                i = jQuery(".is-mobile .is-mobile-search .input-search"),
                a = jQuery(".is-mobile .is-mobile-search");
            e.click(function () {
                a.addClass("on"), i.focus()
            }), i.click(function () {
                return !1
            }), t.click(function () {
                a.removeClass("on")
            })
        },
        handleCountdown: function () {
            jQuery(".count_holder_big").each(function () {
                var e = jQuery(this).find(".count_holder_small");
                jQuery(this).hover(function () {
                    e.addClass("hover").appendTo("body")
                }, function () {
                    e.removeClass("hover").appendTo(this)
                }).mousemove(function (t) {
                    var i = t.pageX + 60,
                        a = t.pageY - 50,
                        o = e.width(),
                        r = e.height(),
                        n = jQuery(window).width() - (i + o);
                    jQuery(window).height() - (a + r), 50 > n && (i = t.pageX - o - 60), e.css({
                        left: i,
                        top: a
                    })
                })
            })
        },
        handleSmoothScroll: function () {
            jQuery("body").on("click", ".smoothscroll", function (e) {
                e.preventDefault();
                var t = jQuery(this).attr("href");
                jQuery(t).trigger("click"), setTimeout(function () {
                    jQuery("html,body").animate({
                        scrollTop: jQuery("#product-reviews").offset().top - 100
                    }, 800, "swing")
                }, 300)
            })
        },
        notifyIE8Users: function () {
            if (jQuery("html").hasClass("ie7") || jQuery("html").hasClass("ie7"))
                if (window.notify_ie8_page) jQuery.ajax({
                    type: "GET",
                    url: "pages/" + window.notify_ie8_page,
                    beforeSend: function () { },
                    success: function (e) {
                        var t = jQuery(e).find("#col-main > .page > .page_content");
                        jQuery("body").html(t.html()).show()
                    },
                    dataType: "html"
                });
                else {
                    var e = "<h1>Unsupported Browser</h1>";
                    jQuery("body").html(e).show()
                }
        },
        detectOptions: function () {
            roar.getWidthBrowser() < 992 ? jQuery("#product-header-first").is(":empty") && jQuery("#product-header").detach().appendTo("#product-header-first") : jQuery("#product-header-first").is(":empty") || jQuery("#product-header").detach().appendTo("#product-header-last")
        },
        mockupStaticBlock: function () {
            if (jQuery(".static-surround").length) {
                var e = jQuery(".static-surround").find("[data-size]");
                e.each(function () {
                    var e = jQuery(this);
                    if (roar.getWidthBrowser() < 1200) {
                        var t = window.general_font_size,
                            i = e.data("size"),
                            a = (e.data("bottom"), roar.getWidthBrowser()),
                            o = i * a / 1200;
                        t > o && (o = t), e.css({
                            "font-size": o
                        })
                    } else {
                        var i = e.data("size");
                        e.css({
                            "font-size": i
                        })
                    }
                })
            }
        },
        mockupLookbookBlock: function () {
            if (jQuery(".widget-lookbook").length) {
                var e = jQuery(".widget-lookbook").find("[data-size]");
                e.each(function () {
                    var e = jQuery(this);
                    if (roar.getWidthBrowser() < 1200) {
                        var t = window.general_font_size,
                            i = e.data("size"),
                            a = (e.data("bottom"), roar.getWidthBrowser()),
                            o = i * a / 1200;
                        t > o && (o = t), e.css({
                            "font-size": o
                        })
                    } else {
                        var i = e.data("size");
                        e.css({
                            "font-size": i
                        })
                    }
                })
            }
        },
        handleHomepage: function () {
            jQuery("#sidebar .featured-products").length && jQuery("#sidebar .featured-products").owlCarousel({
                loop: !0,
                rtl: window.rtl,
                margin: 0,
                nav: !0,
                dots: !1,
                mouseDrag: !0,
                autoplay: 3e3,
                items: 1,
                responsive: !1,
                navText: ['<span class="btn-owl"><i class="fa fa-angle-left"></i></span>', '<span class="btn-owl"><i class="fa fa-angle-right"></i></span>']
            }), jQuery("#our-partner").length && jQuery("#our-partner").owlCarousel({
                loop: !0,
                rtl: window.rtl,
                margin: 0,
                nav: !0,
                dots: !1,
                mouseDrag: !0,
                autoplay: 3e3,
                items: 5,
                responsive: !0,
                responsive: {
                    0: {
                        items: 2
                    },
                    479: {
                        items: 3
                    },
                    767: {
                        items: 4
                    },
                    992: {
                        items: 5
                    }
                },
                navText: ['<span class="btn-owl"><i class="fa fa-angle-left"></i></span>', '<span class="btn-owl"><i class="fa fa-angle-right"></i></span>']
            }), jQuery("#featured-products").length && jQuery("#featured-products").owlCarousel({
                loop: !0,
                rtl: window.rtl,
                margin: 0,
                nav: !0,
                dots: !1,
                mouseDrag: !0,
                items: 5,
                responsive: !0,
                responsive: {
                    0: {
                        items: 2
                    },
                    479: {
                        items: 3
                    },
                    767: {
                        items: 4
                    },
                    992: {
                        items: 5
                    }
                },
                navText: ['<span class="btn-owl"><i class="fa fa-angle-left"></i></span>', '<span class="btn-owl"><i class="fa fa-angle-right"></i></span>']
            }), jQuery("#featured-collections").length && jQuery("#featured-collections").owlCarousel({
                loop: !0,
                rtl: window.rtl,
                margin: 0,
                nav: !0,
                dots: !1,
                mouseDrag: !0,
                items: 5,
                responsive: !0,
                responsive: {
                    0: {
                        items: 2
                    },
                    479: {
                        items: 3
                    },
                    767: {
                        items: 4
                    },
                    992: {
                        items: 5
                    }
                },
                navText: ['<span class="btn-owl"><i class="fa fa-angle-left"></i></span>', '<span class="btn-owl"><i class="fa fa-angle-right"></i></span>']
            }), jQuery("#category_filter").length && jQuery("#category_filter").on("change", function () {
                var e = jQuery(this).find("option:selected"),
                    t = e.val(),
                    i = e.data("handle"),
                    a = jQuery(".cat-templates").find("#collection-template-" + i).html();
                jQuery.ajax({
                    type: "GET",
                    url: t,
                    beforeSend: function () {
                        jQuery("body").addClass("is_loading")
                    },
                    success: function (e) {
                        var t = jQuery(e).find(".product_item"),
                            i = jQuery(".cat-grid");

                        i.empty().append(a).append(t),
                        jQuery(e).find(".infinite_scoll a").length ? jQuery(".infinite_scoll").last().html(jQuery(e).find(".infinite_scoll").last().html()) : jQuery(".infinite_scoll").empty(),
                        jQuery("body").removeClass("is_loading"),
                        roar.loadingEffects(),
                        roar.handleReviews()
                    },
                    dataType: "html"
                })
            }), jQuery(".lookbook-carousel").length && jQuery(".lookbook-carousel").each(function () {
                jQuery(this).owlCarousel({
                    loop: !0,
                    rtl: window.rtl,
                    margin: 0,
                    autoplay: 3e3,
                    nav: !0,
                    dots: !1,
                    mouseDrag: !0,
                    responsive: {
                        0: {
                            items: 2
                        }
                    },
                    navText: ['<span class="btn-owl"><i class="fa fa-angle-left"></i></span>', '<span class="btn-owl"><i class="fa fa-angle-right"></i></span>']
                })
            }), roar.mockupStaticBlock(), roar.mockupLookbookBlock()
        }
    };