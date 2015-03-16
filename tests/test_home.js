describe('Home page loads', function () {
    var h1_tags = element.all(by.tagName('h1'));
    var active_class = element.all(by.css('.active'));
    it('should have a title', function () {
        browser.get('http://localhost:8080/');
        expect(browser.getTitle()).toEqual('Bus arrival predictions');
    });
    it('should have only one h1 tag', function () {
        browser.get('http://localhost:8080/');
        expect(h1_tags.count()).toEqual(1);
    });
    it('should have the correct text for the h1', function () {
        browser.get('http://localhost:8080/');
        expect(h1_tags.first().getText()).toEqual('Welcome to TTC Ninja!');
    });
    it('should not have an active menu item', function () {
        browser.get('http://localhost:8080/');
        expect(active_class.count()).toEqual(0);
    });
    it('should display the correct last search', function () {
        browser.get('http://localhost:8080/agency/ttc/32/1242');
        element.all(by.tagName('a')).first().click();
        expect(element.all(by.tagName('h2')).first().getText()).toEqual('Your last search');
        expect(element.all(by.css('.last-search')).first().all(by.tagName('a')).first().getText()).toContain('32-Eglinton West')
    });
});

