describe('Contact page loads', function () {
    var h1_tags = element.all(by.tagName('h1'));
    var active_class = element.all(by.css('.active'));
    var project_issues_link = element.all(by.css('div.col-md-9.ng-scope a')).first(); // this locator is brittle and should be changed
    beforeEach(function () {
        browser.get('http://localhost:8080/contact');
    });
    it('should have a title', function () {
        expect(browser.getTitle()).toEqual('Bus arrival predictions');
    });
    it('should have only one h1 tag', function () {
        expect(h1_tags.count()).toEqual(1);
    });
    it('should have the correct text for the h1', function () {
        expect(h1_tags.first().getText()).toEqual('Contact');
    });
    it('should have the correct menu item set as active', function () {
        expect(active_class.count()).toEqual(1);
        expect(active_class.first().getText()).toEqual('Contact');
    });
    it('should have a link to project issues', function () {
        expect(project_issues_link.getText()).toEqual('Project issues page');
        expect(project_issues_link.getAttribute('href')).toEqual('http://github.com/bjdixon/bus-arrival-predictions/issues');
    });
});

