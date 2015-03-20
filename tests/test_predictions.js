describe('Predictions page loads', function () {
    var h1_tags = element.all(by.tagName('h1'));
    var active_class = element.all(by.css('.active'));
    beforeEach(function () {
        browser.get('http://localhost:8080/agency/ttc/90/5900');
    });
    it('should have a title', function () {
        expect(browser.getTitle()).toEqual('Bus arrival predictions');
    });
    it('should have only one h1 tag', function () {
        expect(h1_tags.count()).toEqual(1);
    });
    it('should have the correct text for the h1', function () {
        expect(h1_tags.first().getText()).toEqual('Your next bus arrivals');
    });
    it('should have the correct menu item set as active', function () {
        expect(active_class.count()).toEqual(1);
        expect(active_class.first().getText()).toEqual('Lookup tool');
    });
    it('should display the correct route title and stop title', function () {
        expect(element.all(by.tagName('h2')).first().getText()).toContain('90-Vaughan | Vaughan Rd At Winona');
    });
    it('should be displaying 2 or more predictions', function () {
        expect(element.all(by.repeater('prediction in predictions')).count()).toBeGreaterThan(1);
        expect(element.all(by.repeater('prediction in predictions')).first().getText()).toContain('Branch: 90');
    });
});

