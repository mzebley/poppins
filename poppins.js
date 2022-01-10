function poppinTemplates(id, data) {
    var new_poppin = '';
    if (id === 'mobile_menu') {
        new_poppin = `
        <div class="additional-options-dismissal" onclick="buildPoppin(null, null, false)"></div>
        <div class="additional-options info-item" style="left:-99999px;top:-999999px;opacity:0;max-width:220px" id="${id}">
            <div onclick="buildPoppin(null, null, false);navigate('?anchor=hero-photo');">
                <div class="align-content-vertically"><p class="text-normal full-width">About Me</p></div>
                <div><svg class="icon color-theme opacity-5"><use xlink:href="#icon-arrow"></use></svg></div>
            </div>
            <div onclick="buildPoppin(null, null, false);navigate('professional')">
                <div class="align-content-vertically"><p class="text-normal full-width">Professional Work</p></div>
                <div class="align-content-vertically"><svg class="icon color-theme opacity-5"><use xlink:href="#icon-arrow"></use></svg></div>
            </div>
            <div onclick="buildPoppin(null, null, false);navigate('hobbyist');">
                <div class="align-content-vertically"><p class="text-normal full-width">Hobbyist Work</p></div>
                <div class="align-content-vertically"><svg class="icon color-theme opacity-5"><use xlink:href="#icon-arrow"></use></svg></div>
            </div>
            <div onclick="buildPoppin(null, null, false);navigate('shop');">
                <div class="align-content-vertically"><p class="text-normal full-width">Merch Shop</p></div>
                <div><svg class="icon color-theme opacity-5"><use xlink:href="#icon-arrow"></use></svg></div>
            </div>
            <div onclick="buildPoppin(null, null, false);navigate('?anchor=contact-form');">
                <div class="align-content-vertically"><p class="text-normal full-width">Contact</p></div>
                <div><svg class="icon color-theme opacity-5"><use xlink:href="#icon-arrow"></use></svg></div>
            </div>
        </div>`;
    } else if (id === 'additional-info') {
        var data_array = [{ 
            id: 'water_bear_info', 
            data: { 
                photo_link: 'https://i.guim.co.uk/img/media/39669fd0fa5c0193955cba565e89aa1f29cec180/0_1063_3511_2105/master/3511.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=71e4819d043defd64df9f5a795ea0512',
                title: 'Tardigrade',
                content: 'Often found with moss or lichen, happily chomping away at plant cells and algae.',
                link: 'https://en.wikipedia.org/wiki/Tardigrade',
                source: 'Wikipedia',
                photo_layout: 'rectangle'
            }
        },{ 
            id: 'toad_info', 
            data: { 
                title: "Toad",
                content: `Science doesn't make a distinction between toads and frogs, but we generally consider toads as being associated with drier skin and more land-based habitats.`,
                link: `https://en.wikipedia.org/wiki/Toad`,
                source: 'Wikipedia',
                photo_link: 'https://media.nature.com/lw800/magazine-assets/d41586-021-02317-9/d41586-021-02317-9_19590920.jpg',
                photo_layout: 'rectangle',
            }
        },{ 
            id: 'turkey_info', 
            data: { 
                title: "Turkey",
                content: `A large bird native to North America. Super popular around Thanksgiving.`,
                link: 'https://en.wikipedia.org/wiki/Turkey_(bird)',
                source: 'Wikipedia',
                photo_link: 'https://wehco.media.clients.ellingtoncms.com/img/photos/2021/04/09/1PB1_turkey_0410_t800.jpg?90232451fbcadccc64a17de7521d859a8f88077d',
                photo_layout: 'square'
            }
        },{ 
            id: 'turtle_info', 
            data: { 
                title: "Turtle",
                content: `A member of the reptile order; most famously known for its shell.`,
                link: 'https://en.wikipedia.org/wiki/Turtle',
                source: 'Wikipedia',
                photo_link: 'https://media.fisheries.noaa.gov/styles/full_width/s3/dam-migration/hawksbill_sea_turtle.jpg?itok=ESbU98wohttps://i.imgur.com/gbDP3e3.jpg',
                photo_layout: 'rectangle'
            }
        },{ 
            id: 'tomato_info', 
            data: { 
                title: "Tomato",
                content: `English gets the word "tomato" from the Spanish "tomate" - which in turn comes from the native word "tomatl" meaning "fat thing."`,
                link: `https://en.wikipedia.org/wiki/Tomato`,
                source: 'Wikipedia',
                photo_link: 'https://cdn3.volusion.com/ph9xz.o9ecs/v/vspfiles/photos/TF-0441-2.jpg?v-cache=1574096525',
                photo_layout: 'rectangle',
            }
        }];
        var info = data_array.filter(item => item.id === data)[0].data;
        new_poppin = `
        <div class="additional-options-dismissal" onclick="buildPoppin(null, null, false)"></div>
        <div class="additional-options-image ${info.photo_layout}" style="background-image:url('${info.photo_link}')"><div class="square-jelly-box"><div></div><div></div></div></div>
        <div class="additional-options info-item text-medium" style="left:-99999px;top:-999999px;opacity:0;max-width:220px" id="${id}">
            <div class="content">
                <div>
                    <p class="full-width title">${info.title}</p>
                    ${info.content}
                </div>
            </div>
            <div id="learn-more-btn" onclick="buildPoppin(null, null, false);navigate('${info.link}', true)">
                <div class="align-content-vertically">
                    <p>Dive Deeper</p>
                    <span class="full-width float-left text-small opacity-75">Via <b>${info.source}</b></span>
                </div>
                <div class="align-content-vertically">
                    <button class="blue small circle">
                        <svg class="icon"><use xlink:href="#icon-arrow"></use></svg>
                    </button>
                </div>
            </div>
        </div>`;
    } else if (id === 'invoice-approvals') {
        var data_array = [{ 
            id: 'invoice-1', 
            data: { 
                date: 'Tuesday<br>12/28/21 - 9:43am',
                comment: 'The winter has been unseasonably warm, so it makes sense the bill looks lower than normal for a December.',
                name: 'Josh Dunder',
                role: 'Building Manager'
            }
        },{ 
            id: 'invoice-2', 
            data: { 
                date: 'Monday<br>12/27/21 - 4:23pm',
                comment: 'Work looks legit, they did a good job. The HVAC is back up and running.',
                name: 'Caleb Pours',
                role: 'Maintenance Tech'
            }
        }];
        var info = data_array.filter(item => item.id === data)[0].data;
        new_poppin = `
        <div class="additional-options-dismissal" onclick="buildPoppin(null, null, false)"></div>
        <div class="additional-options info-item text-medium" style="left:-99999px;top:-999999px;opacity:0;max-width:220px" id="${id}">
            <div class="content">
                <div>
                    <p class="full-width title">${info.name}<span class="full-width float-left text-small opacity-5 sans-serif-font">${info.role}</span></p>
                    "${info.comment}"
                    <div class="block margin-top-8 text-medium"><b>${info.date}</b></div>
                    <svg class="icon color-green position-absolute color-medium fade-from-bottom-bounce" style="width:18px;height:18px;opacity:0;top:12px;right:12px"><use xlink:href="#icon-thumb"></use></svg>
                </div>
            </div>
        </div>`;
    } else if (id === 'invoice-insights') {
        var data_array = [{ 
            id: 'invoice-1', 
            data: {
                content: `
                <div class="block grid-block col-2 gap-8">
                    <div><span class="full-width opacity-5 text-bold float-left text-small">Amount</span><b><span class="serif-font">$</span>234.56</b></div>
                    <div><span class="full-width opacity-5 text-bold float-left text-small">Due Date</span><b>1/31/22</b></div>
                </div>
                <p class="full-width text-medium margin-top-8"><em>This is a recurring invoice.</em></p>
                <span class="full-width opacity-5 margin-top-8 text-bold float-left text-small">Previous Month</span>
                <div class="block gap-8">
                    <b><span class="serif-font">$</span>248.92</b>
                    <span class="full-width text-medium float-left">Utility Bill - November 2021</span>
                    <span class="full-width text-small text-bold color-green float-left">Approved - 12/15/21</span>
                </div>
                <span class="full-width opacity-5 margin-top-8 text-bold float-left text-small">Previous Year</span>
                <div class="block gap-8">
                    <b><span class="serif-font">$</span>378.27</b>
                    <span class="full-width text-medium float-left">Utility Bill - December 2020</span>
                    <span class="full-width text-small text-bold color-green float-left">Approved - 12/17/20</span>
                </div>
                <svg class="icon position-absolute color-blue color-medium fade-from-bottom-bounce" style="width:24px;height:24px;opacity:0;top:12px;right:12px;"><use xlink:href="#icon-rays"></use></svg>`
            }
        },{ 
            id: 'invoice-2', 
            data: {
                content: `
                <div class="block grid-block col-2 gap-8">
                    <div><span class="full-width opacity-5 text-bold float-left text-small">Amount</span><b><span class="serif-font">$</span>1,234.56</b></div>
                    <div><span class="full-width opacity-5 text-bold float-left text-small">Due Date</span><b>1/6/22</b></div>
                </div>
                <p class="full-width text-medium margin-top-8"><em>This invoice is tied to the work order <b>HVAC Broke - URGENT</b>.</em></p>
                <span class="full-width opacity-5 margin-top-8 text-bold float-left text-small">Work Order Status</span>
                <div class="block gap-8">
                    <span class="full-width text-medium text-bold color-green float-left">Completed</span>
                </div>
                <span class="full-width opacity-5 margin-top-8 text-bold float-left text-small">Work Order Submitted</span>
                <div class="block gap-8">
                    <b>12/26/21</b>
                </div>
                <span class="full-width opacity-5 margin-top-8 text-bold float-left text-small">Work Order Completed</span>
                <div class="block gap-8">
                    <b>12/27/21</b>
                </div>
                <svg class="icon position-absolute color-blue color-medium fade-from-bottom-bounce" style="width:24px;height:24px;opacity:0;top:12px;right:12px;"><use xlink:href="#icon-rays"></use></svg>`
            }
        }];
        var info = data_array.filter(item => item.id === data)[0].data;
        new_poppin = `
        <div class="additional-options-dismissal" onclick="buildPoppin(null, null, false)"></div>
        <div class="additional-options info-item text-medium" style="left:-99999px;top:-999999px;opacity:0;max-width:220px" id="${id}">
            <div class="content">
                <div>
                    <p class="full-width title">Invoice Insights</p>
                    ${info.content}
                </div>
            </div>
        </div>`;
    }
    return new_poppin
};

function buildPoppin(id, reference, show, event, data) {
    // ID - id of desired poppin
    // REFERENCE - id for data object in corresponding array
    if (show) {
        modifyBackgroundForModal(true, reference);
        var poppin_element = poppinTemplates(id, data);
        $('body').append(poppin_element);
        positionPoppin(id, reference, event);
    }
    else {
        modifyBackgroundForModal(null);
        $(".additional-options").fadeOut(125, function () { $(this).remove(); })
        $(".additional-options-image").fadeOut(125, function () { $(this).remove(); })
        $(".additional-options-dismissal").fadeOut(125, function () { $(this).remove(); })
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