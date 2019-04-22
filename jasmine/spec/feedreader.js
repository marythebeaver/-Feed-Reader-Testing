/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run the application.
 */

/* placing all of our tests within the $() function
 * to ensure they don't run until the DOM is ready,
 * since some of these tests may require DOM elements

 */
$(function() {
    /* a test suite just contains a related set of tests.
    * This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* a test makes sure that the
         * allFeeds variable has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URl are defined', function(){
           for(var i = 0; i < allFeeds.length; i++){
             expect(allFeeds[i].url).toBeDefined();
             expect(allFeeds[i].url.length).not.toBe(0);
           }
         });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('name are defined', function(){
           for(var i = 0; i < allFeeds.length; i++){
             expect(allFeeds[i].name).toBeDefined();
             expect(allFeeds[i].name.length).not.toBe(0);
           }
         });
    });


    /* a new test suite related to menu */
    describe('The menu', function() {

        /* a test that ensures the menu element is
         * hidden by default.
         */
         it('menu is hidden', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });

         /* a test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
          it('menu is toggled', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
           });
    });

    /* a test suite related to initialing entries */
    describe('Initial Entries', function() {
        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         beforeEach(function(done){
             loadFeed(0, done);
         });

         it('at least a single .entry element within the .feed container', function() {
           var entry_feed = $('.feed .entry');
           expect(entry_feed.length).toBeGreaterThan(0);
         });
    });

    /* a test suite related to updating Feed */
    describe('New Feed Selection', function() {
        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         var pre_Feed, cur_Feed;

         // load previous and current feeds
        beforeEach(function(done) {
            loadFeed(0, function() {
                pre_Feed = $('.feed').html();

                loadFeed(1, function() {
                    cur_Feed = $('.feed').html();
                    done();
                });
            });
        });

        // if two feeds are different
        it('New feed is updated', function() {
            expect(pre_Feed).not.toEqual(cur_Feed);
        });
    });

}());
