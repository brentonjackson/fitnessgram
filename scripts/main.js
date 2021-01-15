// Add back functionality to navbar back link
const backLink = document.getElementsByClassName('nav-back-link')[0];
function backFunc () {
    window.history.back();
    console.log('went back!')
}
backLink.addEventListener('click', backFunc);



// JS to make clicked image the big one
// Using es5 syntax

var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

/** setDetails
 * param imageUrl
 * param titleText
 * changes detail image/title
 * to arguments
 */
function setDetails(imageUrl, titleText) {
    'use strict';
    //change detail image and title
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

/** imageFromThumb
 * param thumbnail dom object
 * return image url of selected thumbnail
 */
function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

/** titleFromThumb
 * param thumbnail dom object
 * return title of selected thumbnail
 */
function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

/** setDetailsFromThumb
 * param thumbnail dom object
 * calls fn to make detail image current thumbnail image
 * and thumbnail title
 */
function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

/** addThumbClickHandler
 * param thumbnail dom object
 * prevents link action
 * calls fn to make detail image current thumbnail
 * calls fn to show detail image if it's hidden
 */
function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

/** getThumbnailsArray
 * gets all thumbnails and converts
 * from nodelist to array
 */
function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    // convert nodelist to array
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

/** hideDetails
 * adds class to body
 * used with css to hide detail image
 */
function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

/** showDetails
 * adds class to body
 * used with css to hide detail image
 */
function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function() {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
    
}

/** addKeyPressHandler
 * listens for esc key press
 * calls fn to hide detail image if pressed
 */
function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

/** initializeEvents
 * gets all thumbnails, iterates over them, adding
 * events to each
 * also runs fn to listen to escape key press
 * immediately invoked
 */
(function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
})();
