require('chai').should();

const nhentai = require('../nhentai.js');

describe('nHentai Methods', () => {
    it('getDoujin()', async () => {
        const doujin = await nhentai.getDoujin('https://nhentai.net/g/228626/2');
        doujin.should.have.property('title');
        doujin.should.have.property('details');
        doujin.should.have.property('pages');
        doujin.should.have.property('link');
        doujin.should.have.property('nativeTitle');
        doujin.should.have.property('thumbnails');
    });

    it ('getHomepage()', async() => {
        const homepage = await nhentai.getHomepage(1);
        homepage.should.have.property('results');
        homepage.results.should.be.instanceof(Array);
        homepage.should.have.property('lastPage');
    });

    it('search()', async () => {
        const search = await nhentai.search('stockings');
        search.should.have.property('results');
        search.results.should.be.instanceof(Array);
        search.should.have.property('lastPage');
    });

    it('exists()', async () =>  {
        const exist = await nhentai.exists('228626');
        exist.should.be.true;
    });
});