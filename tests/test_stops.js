describe('Stops page loads', function () {
    var h1_tags = element.all(by.tagName('h1'));
    var active_class = element.all(by.css('.active'));
    beforeEach(function () {
        browser.get('http://localhost:8080/agency/ttc/90');
    });
    it('should have a title', function () {
        expect(browser.getTitle()).toEqual('Bus arrival predictions');
    });
    it('should have only one h1 tag', function () {
        expect(h1_tags.count()).toEqual(1);
    });
    it('should have the correct text for the h1', function () {
        expect(h1_tags.first().getText()).toEqual('Find your bus stop');
    });
    it('should have the correct menu item set as active', function () {
        expect(active_class.count()).toEqual(1);
        expect(active_class.first().getText()).toEqual('Lookup tool');
    });
    it('should be displaying over 35 stops', function () {
        expect(element.all(by.repeater('stop in stops')).count()).toBeGreaterThan(35);
    });
    it('should be displaying the correct route title', function () {
        expect(element.all(by.tagName('h2')).first().getText()).toEqual('Route: 90-Vaughan');
    });
    it('should display the correct stops when performing a search', function () {
        var results;
        element(by.model('query')).sendKeys('winona');
        results = element.all(by.repeater('stop in stops'));
        expect(results.count()).toEqual(2);
        expect(results.first().all(by.tagName('a')).first().getText()).toContain('Vaughan Rd At Winona Dr');
        results.first().all(by.tagName('a')).first().click();
        expect(element.all(by.tagName('h1')).first().getText()).toEqual('Your next bus arrivals');
    });
});

