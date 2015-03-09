exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['test_homepage.js', 'test_contact.js', 'test_about.js', 'test_routes.js', 'test_stops.js', 'test_predictions.js']
}
