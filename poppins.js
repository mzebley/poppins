let arrow_svg = `<svg viewBox="0 0 32 32" role="img" aria-label="An arrow icon." class="icon blue"><path d="M32 16.010q0-1.452-0.935-2.387l-9.924-9.924q-1.014-1.014-2.227-1.014-1.472 0-2.347 0.885t-0.875 2.178q0 0.776 0.318 1.333t0.776 1.014l3.58 3.54 3.878 3.62 1.71-2.168-7.259-0.338h-15.234q-1.571 0-2.516 0.895t-0.945 2.367 0.945 2.367 2.516 0.895h15.234l7.259-0.338-1.71-2.168-3.878 3.62-3.58 3.52q-0.457 0.438-0.776 1.004t-0.318 1.342q0 1.293 0.875 2.178t2.347 0.885q1.213 0 2.227-1.014l9.924-9.904q0.935-0.935 0.935-2.387z"></path></svg>`;

function poppinTemplates(id, data) {
    var new_poppin = '<div class="additional-options-dismissal" onclick="buildPoppin(null, null, false)"></div>';
    if (id === 'list_menu') {
        new_poppin = new_poppin + `
        <div class="additional-options info-item" style="left:-99999px;top:-999999px;opacity:0;max-width:220px" id="${id}">`
        data.forEach(function (item) {
            new_poppin = new_poppin + `
            <div onclick="buildPoppin(null, null, false);${item.function};">
                <div class="align-content-vertically"><p class="text-normal full-width">${item.content}</p></div>
                <div>${item.svg_id ? `<svg class="icon ${item.color_class} opacity-5"><use xlink:href="#${item.svg_id}"></use></svg>` : arrow_svg}</div>
            </div>
            `;
        })
        new_poppin = new_poppin + `</div>`;
    } else if (id === 'additional_info') {
        new_poppin = new_poppin + `
        ${data.photo_link ? `<div class="additional-options-image ${data.photo_layout}" style="background-image:url('${data.photo_link}')"><div class="square-jelly-box"><div></div><div></div></div></div>` : ''}
        <div class="additional-options info-item text-medium" style="left:-99999px;top:-999999px;opacity:0;" id="${id}">
            <div class="content">
                <div>
                    <p class="full-width title">${data.title}</p>
                    ${data.content}
                </div>
            </div>
            ${data.link ? `
            <div id="learn-more-btn" onclick="buildPoppin(null, null, false);${data.function};">
                <div class="align-content-vertically">
                    <p>${data.link_header ? data.link_header : 'Dive Deeper'}</p>
                    <span class="full-width float-left text-small opacity-75">Via <b>${data.source}</b></span>
                </div>
                <div class="align-content-vertically">
                    <button class="blue small circle">
                        ${arrow_svg}
                    </button>
                </div>
            </div>
            ` : ''}
        </div>`;
    }
    return new_poppin
};

function buildPoppin(id, reference, show, event, data) {
    // ID - id of desired poppin from map
    // REFERENCE - id of element clicked to trigger poppin
    // SHOW - true/false trigger or remove poppin
    // EVENT - $event from click
    // DATA - object to map poppin template to
    if (show) {
        $(reference ? ('#' + reference) : '.nothing').addClass('shrink-back');
        $('body').css('overflow', 'hidden');
        // if ID === 'custom', treat DATA as the full poppin template
        var poppin_element = id === 'custom' ? data : poppinTemplates(id, data);
        $('body').append(poppin_element);
        positionPoppin(id, reference, event);
    } else {
        $('.shrink-back').removeClass('shrink-back');
        $('body').css('overflow', '');
        $(".additional-options, .additional-options-image, .additional-options-dismissal").fadeOut(125, function () { $(this).remove(); });
    }
};

function positionPoppin(id, reference, event) {
    // Reference data is the element clicked (or if we pass in the event we grab the exact click location)
    var reference_data = !event ? $('#' + reference)[0].getBoundingClientRect() : { left: event.x, top: event.y, height: 0, width: 0 };
    var picture_included = $('.additional-options-image').length > 0 ? true : false;
    included_picture_metrics = picture_included ? $('.additional-options-image')[0].getBoundingClientRect() : 0;
    // Get our poppin's exact height and width and then prep it for animation
    poppin_width = $('#' + id).width();
    poppin_height = $('#' + id).height();
    $('#' + id).css({ 'transform': 'scale3d(0,0,0)', 'top': '', 'left': '' });
    $('.additional-options-image').css({ 'transform': 'scale3d(0,0,0)' });

    if ((reference_data.left - poppin_width <= 0) && (reference_data.left + poppin_width < $(window).width())) {
        // Would clip off left edge of screen
        $('#' + id).css('left', (reference_data.left) + (event ? 0 : 16));
        $('#' + id).addClass('from-left');

    } else if ((reference_data.left - poppin_width <= 0) && (reference_data.left + (poppin_width + 32) > $(window).width())) {
        // Would clip off either side of screen; need to center
        $('#' + id).css('left', 'calc(50% - ' + (poppin_width / 2) + 'px)');
        $('#' + id).addClass('center');

    } else {

        $('#' + id).css('right', ($(window).width() - (reference_data.left) - (reference_data.width - (event ? 0 : 16))));

    }
    if ((reference_data.top + reference_data.height + poppin_height + (picture_included ? (included_picture_metrics.height + 16) : 0)) > $(window).height()) {
        if ((reference_data.top + 16) - poppin_height < 0) $('#' + id).css('max-height', (reference_data.top + 16) + 'px');
        $('#' + id).addClass('from-bottom');
        $('#' + id).css('bottom', (($(window).height() - (reference_data.top)) + (event ? 0 : 16)));
    } else if ((reference_data.top - (reference_data.height + poppin_height + (picture_included ? (included_picture_metrics.height + 16) : 0))) < 8) {
        $('#' + id).css('top', 16);
    } else {
        $('#' + id).css('top', reference_data.top + (reference_data.height + (event ? 0 : 8)));
    }

    setTimeout(function () {
        $('#' + id).css({ 'transform': 'scale3d(1,1,1)', 'opacity': 1 });
    }, 25);
    if (picture_included) {
        setTimeout(function () {
            var poppin_reference = $('#' + id)[0].getBoundingClientRect();
            if ($('#' + id).hasClass('center')) {
                $('.additional-options-image').css('left', 'calc(50% - ' + (included_picture_metrics.width / 2) + 'px)');
                $('.additional-options-image').addClass('center');
            } else if ($('#' + id).hasClass('from-left')) {
                $('.additional-options-image').css('left', poppin_reference.left)
            } else {
                $('.additional-options-image').css('right', $(window).width() - (poppin_reference.left + poppin_width));
                $('.additional-options-image').addClass('from-right');
            }

            if (reference_data.top - (included_picture_metrics.height + 40) < 0) {
                $('.additional-options-image').css('top', (poppin_reference.top + poppin_height) + 8);
                $('.additional-options-image').addClass('activate underneath');
            } else {
                $('.additional-options-image').css({ 'top': poppin_reference.top - (included_picture_metrics.height + 8) });
                $('.additional-options-image').addClass('activate');
            }

        }, 175);
    }
};

export {buildPoppin}