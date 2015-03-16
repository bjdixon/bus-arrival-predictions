describe('Route page loads', function () {
    var h1_tags = element.all(by.tagName('h1'));
    var active_class = element.all(by.css('.active'));
    beforeEach(function () {
        browser.get('http://localhost:8080/agency/ttc');
    });
    it('should have a title', function () {
        expect(browser.getTitle()).toEqual('Bus arrival predictions');
    });
    it('should have only one h1 tag', function () {
        expect(h1_tags.count()).toEqual(1);
    });
    it('should have the correct text for the h1', function () {
        expect(h1_tags.first().getText()).toEqual('Find your bus route');
    });
    it('should have the correct menu item set as active', function () {
        expect(active_class.count()).toEqual(1);
        expect(active_class.first().getText()).toEqual('Lookup tool');
    });
    it('should be displaying over 160 routes', function () {
        expect(element.all(by.repeater('route in routes')).count()).toBeGreaterThan(160);
    });
    it('should display the correct route when performing a search', function () {
        var results, 
            first_a;
        element(by.model('query')).sendKeys('vaughan');
        results = element.all(by.repeater('route in routes'));
        first_a = results.first().all(by.tagName('a')).first();
        expect(results.count()).toEqual(1);
        expect(first_a.getText()).toContain('90');
        expect(first_a.getText()).toContain('Vaughan');
        first_a.click();
        expect(element.all(by.tagName('h1')).first().getText()).toEqual('Find your bus stop');
    });
});

