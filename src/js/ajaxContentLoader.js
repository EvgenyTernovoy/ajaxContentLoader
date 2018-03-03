(function ($) {

    $.fn.ajaxContentLoader = function (options) {

        var settings = $.extend({
            btnSelector         : '.js--ajaxBtn',
            pagerSelector       : '.js--ajaxPager',
            containerSelector   : '.js--ajaxContainer',
            controlSelector     : '.js--ajaxControlWrapper',
            filterSelector      : '.js--ajaxFilter',
            filterSubmitSelector: 'js--ajaxFilterSubmit'
        }, options);

        var methods = {
            ajaxFilter: function ($form) {
                var $wrapper = $('#' + $form.data('for')),
                    $container = $wrapper.find(settings.containerSelector),
                    $control = $wrapper.find(settings.controlSelector),
                    $pager = $wrapper.find(settings.pagerSelector);

                $.ajax({
                    url     : $form.attr('action'),
                    data    : $form.serialize(),
                    dataType: 'JSON',
                    method  : 'GET',
                    success : function (data) {
                        if (data !== undefined) {

                            if (data.loop !== undefined && data.loop !== null ) {
                                $container.html(data.loop);
                            }

                            if (data.moreButtons !== undefined && data.moreButtons !== null) {
                                if ($control.length > 0) {
                                    if (data.moreButtons.length > 10) {
                                        $control.html(data.moreButtons);
                                    } else {
                                        $control.html('');
                                    }
                                } else {
                                    var btnsForModification = $wrapper.find('.js--ajaxBtn').filter(function () {
                                        return $(this).closest('.js--ajaxPager').length === 0;
                                    });

                                    btnsForModification.each(function () {
                                        if(data.moreButtons.length < 10) {
                                            $(this).addClass('is--hide');
                                        } else {
                                            $(this).replaceWith(data.moreButtons);
                                        }
                                    });
                                }
                            }

                            if (typeof data.pager === 'string') {
                                if (data.pager.length < 10) {
                                    $pager.html('');
                                } else {
                                    $pager.replaceWith(data.pager);
                                }
                            }
                        }
                    },
                    error   : function () {

                    },
                    complete: function () {
                        window.history.replaceState(null, null, this.url);
                    }
                });
            }
        };

        var $body = $('body');

        $body.on('click', settings.btnSelector, function (e) {
            e.preventDefault();
            e.stopPropagation();

            var $btn = $(this),
                $wrapper = $('#' + $btn.data('for')),
                $pager = $wrapper.find(settings.pagerSelector),
                $container = $wrapper.find(settings.containerSelector),
                $control = $wrapper.find(settings.controlSelector),
                url = $btn.attr('href');

            var isPagerBtn = $btn.closest(settings.pagerSelector).length > 0;

            $.ajax({
                url       : url,
                dataType  : 'JSON',
                method    : 'POST',
                cache     : false,
                beforeSend: function () {
                    $btn.addClass('loading');
                },
                success   : function (data) {
                    if (data.loop !== undefined && data.loop !== null) {
                        if (isPagerBtn) {
                            $container.html(data.loop);
                        } else {
                            $container.append(data.loop);
                        }
                    }

                    if (data.moreButtons !== undefined && data.moreButtons !== null) {
                        window.history.replaceState(null, null, url);

                        if (isPagerBtn) {
                            var btnsForModification = $(settings.btnSelector + '[data-for="' + $btn.data('for') + '"]').filter(function () {
                                return $(this).closest(settings.pagerSelector).length === 0;
                            });

                            btnsForModification.each(function () {
                                replaceMoreButton($(this));
                            })
                        } else {
                            replaceMoreButton($btn);
                        }
                    }

                    if (typeof data.pager === 'string') {
                        $pager.replaceWith(data.pager);
                    }

                    function replaceMoreButton($button) {
                        if ($control.length > 0) {
                            if (data.moreButtons.length > 10) {
                                $control.html(data.moreButtons);
                            } else {
                                $control.html('');
                            }
                        }
                        else {
                            if (data.moreButtons.length > 10) {
                                $button.replaceWith(data.moreButtons);
                            } else {
                                $button.addClass('is--hide');
                            }
                        }
                    }

                },
                complete  : function () {
                    $btn.removeClass('loading');
                }
            });
        });

        $body.on('change', settings.filterSelector, function (e) {
            methods.ajaxFilter($(e.target).closest('form'));
        });

    }

})(JQuery);