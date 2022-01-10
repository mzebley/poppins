document.querySelector('head').innerHTML += '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mzebley/poppins@main/dist/poppins.min.css" type="text/css"/>';

let arrow_svg = `<svg viewBox="0 0 32 32" role="img" aria-label="An arrow icon." class="icon blue"><path d="M32 16.010q0-1.452-0.935-2.387l-9.924-9.924q-1.014-1.014-2.227-1.014-1.472 0-2.347 0.885t-0.875 2.178q0 0.776 0.318 1.333t0.776 1.014l3.58 3.54 3.878 3.62 1.71-2.168-7.259-0.338h-15.234q-1.571 0-2.516 0.895t-0.945 2.367 0.945 2.367 2.516 0.895h15.234l7.259-0.338-1.71-2.168-3.878 3.62-3.58 3.52q-0.457 0.438-0.776 1.004t-0.318 1.342q0 1.293 0.875 2.178t2.347 0.885q1.213 0 2.227-1.014l9.924-9.904q0.935-0.935 0.935-2.387z"></path></svg>`;

function poppinTemplates(id, data) {
    var new_poppin = '<div class="poppins-dismissal" onclick="buildPoppin(null, null, false)"></div>';
    if (id === 'custom') {
        new_poppin = new_poppin + `
        <div class="poppins-item list-menu" style="left:-99999px;top:-999999px;opacity:0;" id="poppin-${id}">
            ${data}
        </div>`;
    } else if (id === 'list_menu') {
        new_poppin = new_poppin + `
        <div class="poppins-item list-menu" style="left:-99999px;top:-999999px;opacity:0;" id="poppin-${id}">`
        data.forEach(function (item) {
            new_poppin = new_poppin + `
            <div onclick="buildPoppin(null, null, false);${item.function};">
                <div><p>${item.content}</p></div>
                <div>${item.svg_id ? `<svg class="icon ${item.color_class ? item.color_class : ''} ${item.large_icon ? 'larger' : ''}"><use xlink:href="#${item.svg_id}"></use></svg>` : arrow_svg}</div>
            </div>
            `;
        })
        new_poppin = new_poppin + `</div>`;
    } else if (id === 'additional_info') {
        new_poppin = new_poppin + `
        ${data.photo_link ? `<div class="poppins-image ${data.photo_layout}" style="background-image:url('${data.photo_link}')"><div class="square-jelly-box"><div></div><div></div></div></div>` : ''}
        <div class="poppins-item text-medium" style="left:-99999px;top:-999999px;opacity:0;" id="poppin-${id}">
            <div class="content">
                <div>
                    ${data.title ? `<p class="title">${data.title}</p>` : ''}
                    ${data.content ? `<p>${data.content}</p>` : ''}
                </div>
            </div>
            ${data.link ? `
            <div id="learn-more-btn" onclick="buildPoppin(null, null, false);${data.function};">
                <div>
                    <p>${data.link_header ? data.link_header : 'Dive Deeper'}</p>
                    <span class="full-width float-left text-small opacity-75">Via <b>${data.source}</b></span>
                </div>
                <div>
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

export function buildPoppin(id, reference, show, event, data) {
    // ID - id of desired poppin from map
    // REFERENCE - id of element clicked to trigger poppin
    // SHOW - true/false trigger or remove poppin
    // EVENT - $event from click
    // DATA - object to map poppin template to
    if (show) {
        $(reference ? ('#' + reference) : '.nothing').addClass('poppins-shrink-back');
        $('body').css('overflow', 'hidden');
        // if ID === 'custom', treat DATA as the full poppin template
        var poppin_element = poppinTemplates(id, data);
        $('body').append(poppin_element);
        positionPoppin(id, reference, event);
    } else {
        $('.poppins-shrink-back').removeClass('poppins-shrink-back');
        $('body').css('overflow', '');
        $(".poppins-item, .poppins-image, .poppins-dismissal").fadeOut(125, function () { $(this).remove(); });
    }
};

function positionPoppin(id, reference, event) {
    // Reference data is the element clicked (or if we pass in the event we grab the exact click location)
    var reference_data = !event ? $('#' + reference)[0].getBoundingClientRect() : { left: event.x, top: event.y, height: 0, width: 0 };
    var picture_included = $('.poppins-image').length > 0 ? true : false;
    var included_picture_metrics = picture_included ? $('.poppins-image')[0].getBoundingClientRect() : { height: 0, width: 0 };
    // Get our poppin's exact height and width and then prep it for animation
    var poppin_width = $('#poppin-' + id).width();
    var poppin_height = $('#poppin-' + id).height() + included_picture_metrics.height;
    $('#poppin-' + id).css({ 'transform': 'scale3d(0,0,0)', 'top': '', 'left': '' });
    $('.poppins-image').css({ 'transform': 'scale3d(0,0,0)' });

    if ((reference_data.left - poppin_width <= 0) && (reference_data.left + poppin_width < $(window).width())) {
        // Would clip off left edge of screen
        $('#poppin-' + id).css('left', (reference_data.left) + (event ? 0 : 16));
        $('#poppin-' + id).addClass('from-left');

    } else if ((reference_data.left - poppin_width <= 0) && (reference_data.left + (poppin_width + 32) > $(window).width())) {
        // Would clip off either side of screen; need to center
        $('#poppin-' + id).css('left', 'calc(50% - ' + (poppin_width / 2) + 'px)');
        $('#poppin-' + id).addClass('center');

    } else {

        $('#poppin-' + id).css('right', ($(window).width() - (reference_data.left) - (reference_data.width - (event ? 0 : 16))));

    }
    if ((reference_data.top + reference_data.height + poppin_height) > $(window).height()) {
        if ((reference_data.top + 16) - poppin_height < 0) $('#poppin-' + id).css('max-height', (reference_data.top + 16) + 'px');
        if ((reference_data.top - (reference_data.height + poppin_height + (picture_included ? (included_picture_metrics.height + 16) : 0))) < 8) {
            $('#poppin-' + id).css('top', 16);
        } else {
            $('#poppin-' + id).addClass('from-bottom');
            $('#poppin-' + id).css('bottom', (($(window).height() - (reference_data.top)) + (event ? 0 : 16)));
        }

    } else {
        $('#poppin-' + id).css('top', reference_data.top + (reference_data.height + (event ? 0 : 8)));
    }

    setTimeout(function () {
        $('#poppin-' + id).css({ 'transform': 'scale3d(1,1,1)', 'opacity': 1 });
    }, 25);
    if (picture_included) {
        setTimeout(function () {
            var poppin_reference = $('#poppin-' + id)[0].getBoundingClientRect();
            if ($('#poppin-' + id).hasClass('center')) {
                $('.poppins-image').css('left', 'calc(50% - ' + (included_picture_metrics.width / 2) + 'px)');
                $('.poppins-image').addClass('center');
            } else if ($('#poppin-' + id).hasClass('from-left')) {
                $('.poppins-image').css('left', poppin_reference.left)
            } else {
                $('.poppins-image').css('right', $(window).width() - (poppin_reference.left + poppin_width));
                $('.poppins-image').addClass('from-right');
            }

            if (reference_data.top - (included_picture_metrics.height + 40) < 0) {
                $('.poppins-image').css('top', (poppin_reference.top + poppin_height) + 8);
                $('.poppins-image').addClass('activate underneath');
            } else {
                $('.poppins-image').css({ 'top': poppin_reference.top - (included_picture_metrics.height + 8) });
                $('.poppins-image').addClass('activate');
            }

        }, 175);
    }
};
