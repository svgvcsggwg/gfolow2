var TH90_SCRIPTS = (function(Mod, $) {
    'use strict';

    Mod.isDuringAjax = false;
    Mod.$singleScrollDelay = 1;
    Mod.isUriLightbox = function(uri) {
        uri = uri.split("?")[0];
        var parts = uri.split("."),
            extension = parts[parts.length - 1],
            lightboxTypes = ['jpg', 'jpeg', 'tiff', 'png', 'gif', 'bmp', 'webp'];
        if (lightboxTypes.indexOf(extension) !== -1) {
            return true;
        } else {
            return false;
        }
    };

    Mod.init = function() {
        this.shareMore();
        this.commentCollapse();
        this.theia_sticky();
        this.widgetTitle();
        this.offCanvas();
        this.searchPopup();
        this.scrollToTop();
        this.stickyHeader();
        this.readingIndicator();
        this.dropdownMobileMenu();
        this.switchSkin('');
        this.switchSkinClick();
        this.ajaxBlockPagi();
        this.ajaxBlockInfinite();
        this.ajaxBlockSorts();
        this.ajaxInfiniteSingle();
        this.ajaxSearch();
        this.dynamicSelectOpt();
        this.numberPlusMinus();
        this.responsiveVideo();
        this.sliderSlick(jQuery('.th90-slider'));
        this.megamenu(jQuery('.have-megamenu'));
        this.dropdown();
        this.ajaxReload();
    };

    Mod.init_noreload = function() {
        this.cloneHeader();
        this.ticker(jQuery('.block-newsticker'));
        this.singlePostHeader();
    }

    Mod.ajaxReload = function() {
        this.lightbox();
        this.masonryRun(jQuery('.columns-masonry'));
    };

    Mod.reinitiateFunctions = function() {
        jQuery('html, body').off();
        jQuery(document).off();
        jQuery(window).trigger('load');
        this.init();
    };
    Mod.hookSide = function() {
        var self = this,
            hook_left = jQuery('.hook-left'),
            hook_right = jQuery('.hook-right'),
            hook_param = jQuery('.hook-param'),
            html_width = jQuery('html').width(),
            cont_width = jQuery('.hook-param').outerWidth();

        if (hook_param[0]) {
            var cont_width = jQuery('.hook-param').outerWidth(),
                space = ((html_width - cont_width) / 2) - 20;

            if (hook_left[0]) {
                if (html_width > cont_width) {
                    hook_left.css('left', space + 'px');
                    setTimeout(function() {
                        hook_left.addClass('active');
                    }, 100);
                } else {
                    hook_left.removeClass('active');
                }
            }
            if (hook_right[0]) {
                if (html_width > cont_width) {
                    hook_right.css('right', space + 'px');
                    setTimeout(function() {
                        hook_right.addClass('active');
                    }, 100);
                } else {
                    hook_right.removeClass('active');
                }
            }
        }

    };
    Mod.shareMore = function() {
        var self = this;
        jQuery(document).on('click', '.social-more', function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (jQuery(this).hasClass('is-active')) {
                jQuery(this).removeClass('is-active').siblings('.collapse').removeClass('show');
            } else {
                jQuery(this).addClass('is-active').siblings('.collapse').addClass('show');
            }

        });
    };

    Mod.commentCollapse = function() {
        var self = this;
        jQuery(document).on('click', '.comment-collapse', function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (jQuery(this).closest('.collapse-wrap').hasClass('is-active')) {
                jQuery(this).closest('.collapse-wrap').removeClass('is-active').siblings('.article-comments').slideUp('fast');
            } else {
                jQuery(this).closest('.collapse-wrap').addClass('is-active').siblings('.article-comments').slideDown('fast');
            }

        });
    };

    Mod.widgetTitle = function() {
        jQuery('.wp-block-group__inner-container > h1,.wp-block-group__inner-container > h2,.wp-block-group__inner-container > h3,.wp-block-group__inner-container > h4,.wp-block-group__inner-container > h5,.wp-block-group__inner-container > h6').each(function() {
            var e = jQuery(this);
            e.after('<div class="widget-heading"><div class="title head4">' + e.text() + '</div></div>');
            e.remove();
        });
    };
    Mod.theia_sticky = function() {
        if (jQuery('.e-con-inner .sticky-yes, .sticky-sidebar .site-bar')[0]) {
            jQuery('.e-con-inner .sticky-yes, .sticky-sidebar .site-bar').each(function(e) {
                jQuery(this).theiaStickySidebar({
                    additionalMarginTop: 0,
                    additionalMarginBottom: th90.stickyMarginBottom,
                    minWidth: 881,
                });
            });
        }
        if (jQuery('.single-shares_sticky')[0]) {
            jQuery('.single-shares_sticky').each(function(e) {
                jQuery(this).theiaStickySidebar({
                    additionalMarginTop: 120,
                    minWidth: 768,
                });
            });
        }
    };
    Mod.ticker = function(element) {
        var self = this;
        if (element[0]) {
            element.each(function(e) {
                jQuery(this).ticker({
                    interval: parseInt(jQuery(this).attr('data-speed')),
                });
            });
        }
    };
    Mod.offCanvas = function() {
        var self = this;
        jQuery(document).on('click', '.offcanvas-trigger', function(e) {
            e.preventDefault();
            jQuery('.offcanvas-overlay, .offcanvas').removeClass('active').addClass('active');
        });

        jQuery('.offcanvas-overlay, .offcanvas-close').on('click', function(e) {
            e.preventDefault();
            jQuery('.offcanvas-overlay, .offcanvas').removeClass('active');
        });
    };

    Mod.searchPopup = function() {
        var self = this;
        jQuery(document).on('click', '.search-trigger', function(e) {
            e.preventDefault();
            jQuery('.search-popup').removeClass('active').addClass('active').addClass('input-ready');
            jQuery('.search-popup-form input[type="search"]').focus();
        });

        jQuery('.search-popup-close, .search-overlay').on('click', function(e) {
            e.preventDefault();
            jQuery('.search-popup').removeClass('active');
        });
    };

    Mod.scrollToTop = function() {
        if (jQuery('.totop-fly')[0]) {
            jQuery(window).on('scroll', function() {
                if (jQuery(window).scrollTop() >= jQuery('.site-header').outerHeight(true) + 60) {
                    jQuery('.totop-fly').addClass('show');
                    jQuery('.totop-fly').siblings('.skin-fly').addClass('top-pos');
                } else {
                    jQuery('.totop-fly').removeClass('show');
                    jQuery('.totop-fly').siblings('.skin-fly').removeClass('top-pos');
                }
            });

            jQuery(document).on('click', '.totop-trigger', function(e) {
                e.preventDefault();
                jQuery("html, body").animate({
                    scrollTop: '0'
                });
            });
        }
    };

    Mod.cloneHeader = function() {
        var self = this;
        if (jQuery('.main-header')[0] && th90.is_sticky_header && !th90.sticky_template) {
            jQuery('.main-header').clone().insertAfter('.main-header').addClass('sticky-header').addClass(th90.sticky_header_behav);
        }
    }

    Mod.singlePostHeader = function() {
        var self = this;
        if (th90.is_singular_post) {
            jQuery('.sticky-header').find('.e-con-inner, .section-inner, .elementor > .e-con-full').prepend('<div class="now-read"><div class="now-read-el"><span class="now-read-title">' + th90.nowReadTitle + '</span><span class="sticky-post-title">' + th90.singlePostTitle + '</span></div><div class="now-read-time">' + th90.svg_pulse + th90.nowReadTime + '</div></div>');
        }
    }

    Mod.stickyHeader = function() {
        var self = this;
        if (jQuery('.sticky-header')[0] && th90.is_sticky_header) {
            jQuery('.sticky-header').each(function(e) {
                var $this = jQuery(this),
                    $sticky_height = $this.outerHeight(true),
                    $prev = $this.prev(),
                    elemTop = $prev.offset().top,
                    elemHeight = $prev.outerHeight(true),
                    offset_prepare = 100,
                    offset_sticky = 400,
                    lastScrollTop = 0;

                jQuery(window).on('scroll', function() {
                    var scroll = jQuery(window).scrollTop();

                    if (scroll - offset_prepare > elemTop) {
                        $this.addClass('sticky-start');
                    } else {
                        $this.removeClass('sticky-start');
                    }

                    if (scroll - offset_sticky > elemTop) {
                        $this.addClass('sticky-show');
                        if (scroll > lastScrollTop) {
                            $this.addClass('scroll-down').removeClass('scroll-up');
                        } else {
                            $this.addClass('scroll-up').removeClass('scroll-down');
                        }
                    } else {
                        $this.removeClass('sticky-show').removeClass('scroll-up').removeClass('scroll-down');
                    }

                    lastScrollTop = scroll;
                });
            });
        }
    }

    Mod.readingIndicator = function() {
        if (th90.is_singular_post) {
            if (jQuery('.article-content')[0]) {
                jQuery('.article-content').each(function(e) {
                    var $this = jQuery(this);
                    if ($this.length > 0) {
                        jQuery(window).on('scroll', function() {
                            var percent = 0,
                                content_height = $this.outerHeight(true),
                                window_height = jQuery(window).height(),
                                content_offset = $this.offset().top,
                                window_offset = jQuery(window).scrollTop();

                            if (window_offset > (content_offset - window_height) && window_offset < (content_offset + content_height + window_height)) {
                                percent = 100 * (window_offset - (content_offset - window_height)) / (content_height + window_height);
                                jQuery('.reading-indicator').css('width', percent + '%');
                            } else {
                                jQuery('.reading-indicator').css('width', '0');
                            }

                        });
                    }
                });
            }
        }
    }

    Mod.responsiveVideo = function() {
        if (jQuery('iframe')[0]) {
            jQuery('iframe').each(function(e) {
                var src = jQuery(this).attr('src'),
                    data_src = jQuery(this).attr('data-src'),
                    thisParent = jQuery(this).parent(),
                    video = false,
                    check_src = false;
                if (typeof src !== 'undefined' && typeof data_src === 'undefined') {
                    check_src = src;
                } else if (typeof data_src !== 'undefined' && typeof src === 'undefined') {
                    check_src = data_src;
                }
                if (check_src) {
                    check_src = check_src.toLowerCase();
                    if (check_src.indexOf('yout') >= 0 || check_src.indexOf('vime') >= 0 || check_src.indexOf('dailymo') >= 0) {
                        video = true;
                    }
                    if (video === false) {
                        return;
                    }
                    if (!thisParent.hasClass('video-container') && !thisParent.hasClass('thumb-container') && !thisParent.hasClass('wp-block-embed__wrapper') && !thisParent.parent().hasClass('wp-block-embed__wrapper') && !thisParent.hasClass('frame-wrap') && !thisParent.hasClass('content-custom') && !jQuery(this).hasClass('elementor-video') && !jQuery(this).hasClass('skip-video') && !thisParent.hasClass('fluid-width-video-wrapper')) {
                        jQuery(this).wrap('<div class="video-container"></div>');
                    }
                }
            });
        }
    };

    Mod.lightbox = function() {
        var self = this;

        /* Check if image have caption */
        jQuery('.article-content').find('figure').not('.gallery, .wp-block-gallery').each(function() {
            var caption_text = jQuery(this).find('.wp-caption-text, figcaption').html();
            jQuery(this).find('a').attr('title', caption_text);
        });

        /* Post Content Image Popup */
        if (th90.lightbox_image) {
            jQuery('.article-content').find('a').not('.gallery a, .wp-block-gallery a').each(function(i, el) {
                if (self.isUriLightbox(this.href)) {
                    jQuery(this).addClass('venobox');
                }
            });
        }

        /* Post Content Gallery Popup */
        if (th90.lightbox_gallery) {
            jQuery('.article-content').find('.gallery, .wp-block-gallery').each(function(i, el) {
                jQuery(this).find('a').each(function() {
                    if (self.isUriLightbox(this.href)) {
                        jQuery(this).attr('data-gall', 'gall-' + i).addClass('venobox');
                    }
                });
            });
        }

        /* WooCommerce Gallery */
        if (jQuery('.woocommerce-product-gallery__wrapper')[0]) {
            jQuery('.woocommerce-product-gallery__wrapper').each(function(i, el) {
                jQuery(this).find('.woocommerce-product-gallery__image a').each(function() {
                    if (self.isUriLightbox(this.href)) {
                        jQuery(this).attr('data-gall', 'gall-' + i).addClass('venobox');
                    }
                });
            });
        }

        new VenoBox({
            numeration: true,
            infinigall: true,
            share: true,
            spinner: 'pulse',
            toolsBackground: 'transparent',
            toolsColor: '#f8f8f8',
        });
    };

    Mod.megamenu = function(element) {
        var self = this;
        if (element[0]) {
            element.each(function(e) {
                var megaMenuWidth = 0,
                    megaMenuLeft = 0,
                    elCont = jQuery(this).closest('.e-con-inner'),
                    defCont = jQuery(this).closest('.section-inner'),
                    fullCont = jQuery(this).closest('.elementor > .e-con-full'),
                    megaListItem = jQuery(this).closest('li'),
                    megaIndicator = jQuery(this).siblings('.mega-indicator'),
                    megaContainer = jQuery(this).siblings('.sub-menu'),
                    navContainer = jQuery(this).closest('.navmain-wrap');
                if (defCont.width() !== undefined) {
                    megaMenuWidth = defCont.outerWidth();
                    megaMenuLeft = megaListItem.offset().left - defCont.offset().left;
                } else if (fullCont.width() !== undefined) {
                    megaMenuWidth = fullCont.outerWidth();
                    megaMenuLeft = megaListItem.offset().left - fullCont.offset().left;
                } else if (elCont.width() !== undefined) {
                    megaMenuWidth = elCont.outerWidth();
                    megaMenuLeft = megaListItem.offset().left - elCont.offset().left;
                }
                megaContainer.css('width', megaMenuWidth);
                megaIndicator.css('width', megaMenuWidth);
                megaContainer.css('left', -(megaMenuLeft));
                megaIndicator.css('left', -(megaMenuLeft));
            });
        }
    };

    Mod.dropdown = function() {
        var self = this;
        jQuery(document).on({
            mouseenter: function() {
                var target = jQuery(this).children('.sub-menu'),
                    megacat = jQuery(this).find('.megacat');
                target.removeClass('is_open');
                if (target.hasClass('is_open')) {
                    target.removeClass('is_open');
                } else {
                    target.addClass('is_open');
                }

                if (megacat.length) {
                    self.ajaxMenu(megacat);
                }
            },
            mouseleave: function() {
                var target = jQuery(this).children('.sub-menu');
                target.removeClass('is_open');
            }
        }, '.nav-main li');
    };

    Mod.dropdownMobileMenu = function() {
        var self = this;

        jQuery(document).on('click', '.sub-pointer', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (jQuery(this).hasClass('is-active')) {
                jQuery(this).removeClass('is-active').closest('a').siblings('.sub-menu').slideUp('fast');
            } else {
                jQuery(this).addClass('is-active').closest('a').siblings('.sub-menu').slideDown('fast');
                jQuery(this).closest('.menu-item').siblings().find('.sub-pointer').removeClass('is-active');
                jQuery(this).closest('.menu-item').siblings().find('.sub-menu').slideUp('fast');
            }

        });
    };

    Mod.sliderProgress = function(progress, sliderTimer) {
        var self = this;
        progress.find('span').removeAttr('style').removeClass('active');
        setTimeout(function() {
            progress.find('span').css('transition-duration', (sliderTimer / 1000) + 's').addClass('active');
        }, 100);
    }

    Mod.sliderSlick = function(element) {
        var self = this;
        if (element[0]) {
            var options = JSON.parse(element.attr('data-settings'));
            element.each(function(e) {
                var slick = jQuery(this).find('.slick-slider'),
                    progress = jQuery(this).closest('.block-slider').siblings('.slick-progress');

                slick.not('.slick-initialized').slick(self.slickConfig(jQuery(this)));

                if (progress.length > 0) {
                    self.sliderProgress(progress, options.delay);

                    jQuery(this).on('beforeChange', function(e, slick) {
                        self.sliderProgress(progress, options.delay);
                    });
                }
            });
        }
    }

    Mod.slickConfig = function($container) {
        var self = this,
            $conf = {},
            $block = $container.closest('.block-slider'),
            options = JSON.parse($container.attr('data-settings'));

        $conf["rtl"] = options.rtl;
        $conf["speed"] = options.speed;
        $conf["infinite"] = options.loop;
        $conf["centerMode"] = options.center;
        $conf["adaptiveHeight"] = options.autoHeight;
        $conf["slidesToShow"] = options.view;
        $conf["fade"] = options.fade;
        $conf["autoplaySpeed"] = options.delay;
        if (options.autoplay) {
            $conf["autoplay"] = options.autoplay;
        }
        if (options.asNavFor) {
            $conf["asNavFor"] = options.asNavFor;
            $conf["focusOnSelect"] = options.focusOnSelect;
        }
        if (options.vertical) {
            $conf["vertical"] = options.vertical;
            $conf["verticalSwiping"] = true;
            $conf["rtl"] = false;
        }
        $conf["responsive"] = [{
                breakpoint: 1025,
                settings: {
                    slidesToShow: options.t_view,
                }
            },
            {
                breakpoint: 881,
                settings: {
                    slidesToShow: options.m_view,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    rtl: options.rtl,
                    vertical: false,
                    verticalSwiping: false,
                    slidesToShow: options.ms_view,
                }
            },
        ];
        $conf["dots"] = options.dots;
        $conf["arrows"] = options.nav;
        $conf["appendArrows"] = $block.find('.slider-arrow');
        $conf["appendDots"] = $block.find('.slider-dots');
        $conf["prevArrow"] = '<div class="prev-arrow">' + th90.svg_arrow_left + '</div>';
        $conf["nextArrow"] = '<div class="next-arrow">' + th90.svg_arrow_right + '</div>';

        return $conf;
    }

    Mod.switchSkinClick = function() {
        var self = this;
        jQuery(document).on('click', '.trigger-dark', function(e) {
            self.switchSkin('dark');
            localStorage.setItem('th90-skin', 'dark');
            jQuery('.trigger-light').css('display', 'flex');
            jQuery('.trigger-dark').hide();
        });
        jQuery(document).on('click', '.trigger-light', function(e) {
            self.switchSkin('light');
            localStorage.setItem('th90-skin', 'light');
            jQuery('.trigger-dark').css('display', 'flex');
            jQuery('.trigger-light').hide();
        });
    }
    Mod.switchSkin = function(switchTo) {
        var self = this,
            tempSkin = localStorage.getItem('th90-skin'),
            savedSkin = (tempSkin) ? tempSkin : '',
            theSkin = (switchTo) ? switchTo : savedSkin;

        if ('dark' == theSkin) {
            jQuery('.trigger-light').css('display', 'flex');
            jQuery('.trigger-dark').hide();
        } else {
            jQuery('.trigger-dark').css('display', 'flex');
            jQuery('.trigger-light').hide();
        }
        if (jQuery('.skin-trigger').length > 0 && theSkin) {
            if (theSkin == 'dark') {
                jQuery('html').find('.is-skin').not('.nochange-yes').each(function() {
                    if (jQuery(this).hasClass('bg-light')) {
                        jQuery(this).removeClass('bg-light');
                        jQuery(this).addClass('bg-dark');
                        jQuery(this).addClass('skin-change');
                    }
                });

                jQuery('html').find('.site-skin').each(function() {
                    if (jQuery(this).hasClass('site-light')) {
                        jQuery(this).removeClass('site-light');
                        jQuery(this).addClass('site-dark');
                        jQuery(this).addClass('skin-change');
                    }
                });
            } else {
                jQuery('html').find('.is-skin').not('.nochange-yes').each(function() {
                    if (jQuery(this).hasClass('skin-change')) {
                        jQuery(this).removeClass('bg-dark');
                        jQuery(this).addClass('bg-light');
                    }
                    jQuery(this).removeClass('skin-change');
                });

                jQuery('html').find('.site-skin').each(function() {
                    if (jQuery(this).hasClass('skin-change')) {
                        jQuery(this).removeClass('site-dark');
                        jQuery(this).addClass('site-light');
                    }
                    jQuery(this).removeClass('skin-change');
                });
            }
        }

        if (jQuery('.skin-trigger').length <= 0) {
            localStorage.removeItem('th90-skin');
        }
    };

    Mod.masonryRun = function(element) {
        var self = this;
        if (element[0]) {
            element.each(function(e) {
                if (!jQuery(this).closest('.navmain-wrap').length) {
                    // init Masonry
                    var $grid = jQuery(this).find('.post-list-columns').masonry({
                        itemSelector: '.post-item',
                        percentPosition: true,
                        columnWidth: '.post-item',
                    });

                    // layout Masonry after each image loads
                    $grid.imagesLoaded().progress(function() {
                        $grid.masonry();
                    });
                }
            });
        }
    }
    Mod.ajaxBlockPagi = function() {
        var self = this;
        jQuery(document).on('click', '.module-pagi', function(e) {
            e.preventDefault();
            self.ajaxBlock(jQuery(this));
        });
    }
    Mod.ajaxBlockInfinite = function() {
        var self = this,
            infiniteLoadPoint = jQuery('.module-infinite');

        if (infiniteLoadPoint.length == 0) {
            return;
        }
        infiniteLoadPoint.viewportChecker({
            repeat: true,
            offset: 30,
            classToAdd: '',
            classToAddForFullView: '',
            classToRemove: '',
            removeClassAfterAnimation: false,
            callbackFunction: function(elem, action) {
                self.ajaxBlock(elem);
            },
        });
    }

    Mod.ajaxBlock = function(pagination) {
        var self = this,
            pagiWrap = pagination.closest('.nav-wrap-inner'),
            theBlock = pagination.closest('.th90-block'),
            blockID = theBlock.get(0).id,
            pageCurrent = theBlock.attr('data-current'),
            blockSort = theBlock.attr('data-sort'),
            postsCont = theBlock.find('.posts-container'),
            postsList = theBlock.find('.posts-list'),
            options = $.extend({}, window['js_' + blockID.replace('th90-', 'th90_')]),
            displayItem = 'block';

        if (self.isDuringAjax == true) {
            return;
        }
        self.isDuringAjax = true;
        if (pageCurrent && options) {

            /* If Post Sort is set */
            if (blockSort) {
                options['orderby'] = blockSort;
            }

            // Check if the Button Disabled
            if (pagination.hasClass('btn-disabled')) {
                self.isDuringAjax = false;
                return false;
            }

            // Check if the button type is Load More
            if (pagination.hasClass('load-more')) {
                pageCurrent++;
            }

            // Next page button
            else if (pagination.hasClass('next-posts')) {
                pageCurrent++;
                theBlock.find('.prev-posts').removeClass('btn-disabled');
            }

            // Prev page button
            else if (pagination.hasClass('prev-posts')) {
                pageCurrent--;
                theBlock.find('.next-posts').removeClass('btn-disabled');
            }

            // Ajax Call
            $.ajax({
                url: th90.ajaxurl,
                type: 'post',
                data: {
                    action: 'th90_blocks_load_more',
                    block: options,
                    page: pageCurrent
                },
                beforeSend: function(data) {
                    pagination.addClass('pagi-loading');
                    if (!pagination.hasClass('load-more')) {
                        postsCont.attr('style', 'min-height:' + postsCont.outerHeight() + 'px');
                        postsCont.append('<div class="block-loader"><span class="xloader">' + th90.svg_loader + '</span></div>');
                        postsList.addClass('is-loading');
                    } else {
                        pagiWrap.append('<span class="pagi-loader"><span class="xloader loader-small">' + th90.svg_loader + '</span></span>');

                    }
                },
                success: function(data) {
                    data = JSON.parse(data);
                    pagination.removeClass('pagi-loading');
                    if (pagination.hasClass('load-more')) {
                        pagiWrap.find('.pagi-loader').remove();
                    }

                    if (data['hide_next']) {
                        theBlock.find('.next-posts').addClass('btn-disabled');
                        if (pagination.hasClass('show-more') && !pagination.hasClass('nextprev-more')) {
                            pagination.find('.more-text').html(data['button']);
                        }
                    }

                    // Hide Prev posts button
                    if (data['hide_prev']) {
                        theBlock.find('.prev-posts').addClass('btn-disabled');
                    }

                    // Posts code
                    data = data['code'];
                    data = data.replace(/class="post-item/g, 'class="post-item post-item-' + pageCurrent + ' ');
                    var content = jQuery(data);
                    if (theBlock.hasClass('columns-masonry') && postsList.hasClass('post-list-columns')) {
                        postsCont.removeAttr('style');
                        postsCont.find('.block-loader').remove();
                        postsList.removeClass('is-loading');

                        if (pagination.hasClass('load-more')) {
                            postsList.append(content).masonry('appended', content);
                        } else {
                            postsList.html(content).masonry('prepended', content);
                        }
                        self.ajaxReload();
                        self.isDuringAjax = false;

                    } else {
                        if (pagination.hasClass('load-more')) {
                            postsList.append(content);
                        } else {
                            postsCont.find('.block-loader').remove();
                            postsList.removeClass('is-loading');
                            postsList.html(content);
                        }

                        self.ajaxReload();
                        postsCont.removeAttr('style');
                        self.isDuringAjax = false;
                    }
                }
            });

            // Change the next page number
            theBlock.attr('data-current', pageCurrent);
        }
        return false;
    };

    Mod.ajaxBlockSorts = function() {
        var self = this;
        jQuery(document).on('click', '.module-sort', function(e) {
            e.preventDefault();
            var sortButton = jQuery(this),
                dataSort = sortButton.attr('data-sort'),
                sortsWrap = sortButton.closest('.module-sorts'),
                theBlock = sortsWrap.closest('.th90-block'),
                pagination = theBlock.find('.module-pagi'),
                blockID = theBlock.get(0).id,
                postsCont = theBlock.find('.posts-container'),
                postsList = theBlock.find('.posts-list'),
                options = $.extend({}, window['js_' + blockID.replace('th90-', 'th90_')]),
                displayItem = 'block';

            if (self.isDuringAjax == true) {
                return;
            }
            self.isDuringAjax = true;

            if (options) {
                sortButton.siblings('.module-sort').removeClass('active');
                sortButton.addClass('active');
                // Set the data attr new values
                theBlock.attr('data-current', 1);

                if (dataSort) {
                    options['orderby'] = dataSort;
                    theBlock.attr('data-sort', dataSort);
                } else {
                    theBlock.removeAttr('data-sort');
                }

                // Ajax Call
                $.ajax({
                    url: th90.ajaxurl,
                    type: 'post',
                    data: {
                        action: 'th90_blocks_load_more',
                        block: options,
                    },
                    beforeSend: function(data) {
                        postsCont.attr('style', 'min-height:' + postsCont.outerHeight() + 'px');
                        postsCont.append('<div class="block-loader"><span class="xloader">' + th90.svg_loader + '</span></div>');
                        postsList.addClass('is-loading');
                    },
                    success: function(data) {
                        data = JSON.parse(data);

                        // Reset the pagination
                        pagination.removeClass('btn-disabled');
                        if (pagination.hasClass('show-more') && !pagination.hasClass('nextprev-more')) {
                            pagination.find('.more-text').html(pagination.attr('data-text'));
                        }

                        // Hide next posts button
                        if (data['hide_next']) {
                            theBlock.find('.next-posts').addClass('btn-disabled');
                            if (pagination.hasClass('show-more') && !pagination.hasClass('nextprev-more')) {
                                pagination.find('.more-text').html(data['button']);
                            }
                        }

                        // Hide Prev posts button
                        if (data['hide_prev']) {
                            theBlock.find('.prev-posts').addClass('btn-disabled');
                        }

                        // Posts code
                        data = data['code'];
                        var content = jQuery(data);

                        if (theBlock.hasClass('columns-masonry') && postsList.hasClass('post-list-columns')) {
                            postsCont.removeAttr('style');
                            postsCont.find('.block-loader').remove();
                            postsList.removeClass('is-loading');
                            postsList.html(content).masonry('prepended', content);
                            self.ajaxReload();
                            self.isDuringAjax = false;
                        } else {
                            postsCont.find('.block-loader').remove();
                            postsList.removeClass('is-loading');
                            postsList.html(content);
                            self.ajaxReload();
                            postsCont.removeAttr('style');
                            self.isDuringAjax = false;
                        }
                    }
                });
            }
            return false;

        });
    };

    Mod.ajaxInfiniteSingle = function() {
        var self = this,
            infiniteWrapper = jQuery('#single-post-ajax'),
            infiniteLoadPoint = jQuery('#single-point-ajax');
        if (infiniteWrapper.length == 0 || infiniteLoadPoint.length == 0) {
            return;
        }
        infiniteLoadPoint.viewportChecker({
            repeat: true,
            offset: 60,
            classToAdd: '',
            classToAddForFullView: '',
            classToRemove: '',
            removeClassAfterAnimation: false,
            callbackFunction: function(elem, action) {

                if (true == self.isDuringAjax) {
                    return;
                }

                var nexturl = infiniteWrapper.data('nexturl');
                if (nexturl.indexOf('?p=') > -1) {
                    nexturl = nexturl + '&th90_single_ajax=1';
                } else {
                    var getParam = 'th90_single_ajax/';
                    if (nexturl.charAt(nexturl.length - 1) != '/')
                        getParam = '/' + getParam;
                    nexturl = nexturl + getParam;
                }

                self.isDuringAjax = true;

                // Ajax Call
                $.ajax({
                    url: nexturl,
                    type: 'GET',
                    dataType: 'html',
                    beforeSend: function(data) {
                        infiniteLoadPoint.append('<div class="single-loader"><span class="xloader">' + th90.svg_loader + '</span></div>');
                    },
                    success: function(response) {
                        response = JSON.parse(JSON.stringify(response));
                        response = $(response);

                        infiniteLoadPoint.find('.single-loader').remove();
                        var nexturl = response.data('nexturl');
                        if ('undefined' != typeof(nexturl) && nexturl.length > 0) {
                            infiniteWrapper.data('nexturl', nexturl);
                        } else {
                            infiniteWrapper.removeAttr('id');
                            infiniteLoadPoint.remove();
                        }
                        if (response.data('sidebar')) {
                            if (jQuery.inArray(response.data('sidebar'), th90.elementor_posts_css) == -1) {
                                jQuery('head').append('<link rel="stylesheet" href="' + response.data('sidebar') + '">');
                            }
                        }
                        infiniteWrapper.append(response);

                        self.isDuringAjax = false;
                        setTimeout(function() {
                            self.scrollUpdateProcess(infiniteWrapper);
                            self.reinitiateFunctions();
                        }, 1);
                    }
                });

            },
        });
    };
    Mod.scrollUpdateProcess = function(infiniteWrapper) {
        var self = this,
            articleData = [];

        if (infiniteWrapper.length == 0) {
            return;
        }

        var articleInner = infiniteWrapper.find('.single-inner-ajax');
        if (articleInner.length > 0) {
            articleInner.each(function() {
                var article = jQuery(this);
                articleData.push({
                    postID: article.data('previd'),
                    postURL: article.data('prevurl'),
                    postTitle: article.find('h1.entry-title').text(),
                    postImage: article.data('image'),
                    postDesc: article.data('desc'),
                    postReadTime: article.data('readtime'),
                    top: article.offset().top,
                    bottom: article.offset().top + article.outerHeight(true),
                    articleContentHeight: article.find('.article-content').outerHeight(true),
                    articleContentTop: article.find('.article-content').offset().top,
                });
            });

            if (window.addEventListener) {
                window.addEventListener('scroll', function() {
                    if (self.$singleScrollDelay % 3 == 1) {
                        self.scrollUpdateAction(articleData);
                        self.$singleScrollDelay = 1;
                    } else {
                        self.$singleScrollDelay++;
                    }
                }, false);
            }
        }

    };
    Mod.scrollUpdateAction = function(articleData) {
        var self = this,
            percent = 0,
            window_height = jQuery(window).height(),
            window_offset = jQuery(window).scrollTop();

        articleData.every(function(element) {
            var content_height = element.articleContentHeight,
                content_offset = element.articleContentTop;

            if (window_offset > (content_offset - window_height) && window_offset < (content_offset + content_height + window_height)) {
                percent = 100 * (window_offset - (content_offset - window_height)) / (content_height + window_height);
                jQuery('.reading-indicator').css('width', percent + '%');
            } else {
                jQuery('.reading-indicator').css('width', '0');
            }

            if (window_offset > element.top && window_offset < element.bottom) {
                if (element.postID != self.currentArticleID) {
                    self.currentArticleID = element.postID;
                    self.updateLocationHref(element.postURL, element.postTitle);
                    jQuery('.sticky-header').find('.sticky-post-title').html(element.postTitle);
                    jQuery('.sticky-header').find('.now-read-time').html(element.postReadTime);
                    jQuery('meta[property="og:title"]').attr('content', element.postTitle + ' - ' + jQuery('meta[property="og:site_name"]').attr('content'));
                    jQuery('meta[property="og:url"]').attr('content', element.postURL);
                    jQuery('meta[property="og:description"]').attr('content', element.postDesc);
                    jQuery('meta[property="og:image"]').attr('content', element.postImage);
                }
                return false;
            }
            return true;
        });
    };
    Mod.updateLocationHref = function(url, title) {
        var self = this;
        if (window.location.href !== url) {
            if (url !== '') {
                history.replaceState(null, null, url);
                document.title = title;
            }
            self.updateGA(url);
        }
    };
    Mod.updateGA = function(url) {
        url = url.replace(/https?:\/\/[^\/]+/i, '');

        if (typeof _gaq !== 'undefined' && _gaq !== null) {
            _gaq.push(['_trackPageview', url]);
        }

        if (typeof ga !== 'undefined' && ga !== null) {
            ga('send', 'pageview', url);
        }

        if (typeof __gaTracker !== 'undefined' && __gaTracker !== null) {
            __gaTracker('send', 'pageview', url);
        }

        if (typeof googletag !== 'undefined') {
            googletag.pubads().refresh();
        }
    };

    Mod.ajaxSearch = function() {
        if (jQuery('.search-popup-form .search-input')[0]) {
            if ( th90.disable_search_ajax ) {
                return false;
            }
            var timeout = null;
            jQuery('.search-popup-form .search-input').on('keyup', function(e) {
                e.preventDefault();

                var search_input = jQuery(this),
                    search_val = search_input.val(),
                    search_container = search_input.closest('.search-popup-wrap'),
                    search_result = search_container.find('.posts-list');

                if (timeout) {
                    clearTimeout(timeout);
                }

                timeout = setTimeout(function() {
                    // Ajax Call
                    $.ajax({
                        url: th90.ajaxurl,
                        type: 'post',
                        data: {
                            action: 'th90_search_ajax',
                            s: search_val,
                        },
                        beforeSend: function(data) {
                            search_container.addClass('loading');
                        },
                        success: function(data) {
                            data = JSON.parse(data);
                            search_container.removeClass('loading');
                            if (search_val.length > 2) {
                                data = data['code'];
                            } else {
                                data = data['min'];
                            }
                            search_result.html(jQuery(data));
                        }
                    });

                }, 500);
                return false;
            });
        }
    };

    Mod.ajaxMenu = function(trigger) {
        var self = this,
            mega = trigger.siblings('.mega-template'),
            postsList = mega.find('.posts-list'),
            id = trigger.attr('data-id'),
            style = trigger.attr('data-style');

        if (id && !trigger.hasClass('is-loaded')) {
            // Ajax Call
            $.ajax({
                url: th90.ajaxurl,
                type: 'post',
                data: {
                    action: 'th90_mega_menu_load_ajax',
                    id: id,
                    style: style,
                },
                beforeSend: function(data) {
                    mega.addClass('loading');
                    if (self.isDuringAjax == false) {
                        mega.append('<div class="block-loader"><span class="xloader">' + th90.svg_loader + '</span></div>');
                        self.isDuringAjax = true;
                    }
                },
                success: function(data) {
                    data = JSON.parse(data);
                    trigger.addClass('is-loaded');
                    mega.removeClass('loading').find('.block-loader').remove();

                    // Posts code
                    data = data['code'];
                    var content = jQuery(data);
                    postsList.html(content);
                    self.ajaxReload();
                    self.isDuringAjax = false;
                }
            });
        }
        return false;
    };

    Mod.dynamicSelectOpt = function() {
        var self = this;

        jQuery("#width_tmp_option").html(jQuery('#resizing_select option:selected').text());
        jQuery('#resizing_select').width(jQuery("#width_tmp_select").width()).show();

        jQuery('#resizing_select').on('change', function() {
            jQuery("#width_tmp_option").html(jQuery('#resizing_select option:selected').text());
            jQuery('#resizing_select').width(jQuery("#width_tmp_select").width()).show();
        });
    }

    Mod.numberPlusMinus = function() {
        jQuery('.quantity .minus-btn').on('click', function(e) {
            e.preventDefault();
            var $qty = jQuery(this).siblings('.qty'),
                val = parseInt($qty.val());
            $qty.val(val > 1 ? val - 1 : 1).trigger('change');
        })
        jQuery('.quantity .plus-btn').on('click', function(e) {
            e.preventDefault();
            var $qty = jQuery(this).siblings('.qty'),
                val = parseInt($qty.val());
            $qty.val(val > 0 ? val + 1 : 1).trigger('change');
        });
    };

    return Mod;

}(TH90_SCRIPTS || {}, jQuery));

jQuery(document).ready(function() {
    TH90_SCRIPTS.init_noreload();
    TH90_SCRIPTS.init();
});

jQuery(window).on('resize', function() {
    TH90_SCRIPTS.megamenu(jQuery('.have-megamenu'));
    TH90_SCRIPTS.hookSide();
});

jQuery(window).on('load', function() {
    TH90_SCRIPTS.hookSide();
});

// ------------------------------------------------------------------------------
// Ticker plugin
// ------------------------------------------------------------------------------
! function(e) {
    e.fn.ticker = function(n) {
        return n = jQuery.extend({
            fadeInTime: 800,
            fadeOutTime: 800,
            interval: 3e3
        }, n), this.each(function() {
            var t, a, i, d, f;
            d = (i = (t = e(this)).find(".posts")).find(".itemWrap"), f = !1, d.eq(0).addClass("active"), d.eq(0).show(), setInterval(function() {
                f || (a = i.find(".active")).fadeOut(n.fadeOutTime, function() {
                    0 !== a.next().length ? (a.removeClass("active"), a.next().addClass("active"), a.next().fadeIn(n.fadeInTime)) : (a.removeClass("active"), d.eq(0).addClass("active"), d.eq(0).fadeIn(n.fadeInTime))
                })
            }, n.interval), t.on("mouseover mouseout", function(e) {
                f = "mouseover" == e.type
            })
        })
    }
}(jQuery);
