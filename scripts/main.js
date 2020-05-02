// JS to make clicked image the big one
// Using es5 syntax

var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

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
*/
function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function(event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
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

/** initializeEvents
* gets all thumbnails, iterates over them, adding
* events to each
* immediately invoked
*/
(function initializeEvents(){
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
})();
