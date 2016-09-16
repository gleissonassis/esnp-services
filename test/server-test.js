var request             = require('supertest');
var chai                = require('chai');
var expect              = chai.expect;

describe('server', () => {
    var server;
    var currentTopic = null;


    before(() => {
        server = require('../server');
    });

    after(() => {
        server.close();
    });

    describe('/api', () => {
        it('should be operational', (done) => {
            request(server)
                .get('/api')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('/api/topics', () => {
        it('should store a new topic', (done) => {
            var newTopic = {
                    title: 'Teste de tópico',
                    thumbUrl: '/url',
                    category: 'TD',
                    date: new Date(2016, 09, 16)
                };

            request(server)
                .post('/api/topics')
                .send(newTopic)
                .set('Accept', 'application/json')   
                .expect('Content-Type', /json/)
                .expect(201, (err, res) => {
                    currentTopic = res.body;
                    expect(res.body.title).to.equal(newTopic.title);
                    expect(res.body.thumbUrl).to.equal(newTopic.thumbUrl);
                    expect(res.body.category).to.equal(newTopic.category);
                    done();
                });
        });

        it('should return a specifc topic', (done) => {
            request(server)
                .get('/api/topics/' + currentTopic._id)
                .set('Accept', 'application/json')   
                .expect('Content-Type', /json/)
                .expect(200, (err, res) => {
                    expect(res.body._id).to.equal(currentTopic._id);
                    expect(res.body.title).to.equal(currentTopic.title);
                    expect(res.body.thumbUrl).to.equal(currentTopic.thumbUrl);
                    expect(res.body.category).to.equal(currentTopic.category);
                    done();
                });
        });

        it('should return 404 to a not existing topic', (done) => {
            request(server)
                .get('/api/topics/null')
                .set('Accept', 'application/json')   
                .expect('Content-Type', /json/)
                .expect(404, done);
        });

        it('should return a list of topics', (done) => {
            request(server)
                .get('/api/topics')
                .set('Accept', 'application/json')   
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('should return a list of topics using date param', (done) => {
            request(server)
                .get('/api/topics?d=2016-09-15')
                .set('Accept', 'application/json')   
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('should delete a topic', (done) => {
            request(server)
                .delete('/api/topics/' + currentTopic._id)
                .expect(204, done);
        });

        it('should update a topic', (done) => {
            request(server)
                .post('/api/topics')
                .send(currentTopic)
                .set('Accept', 'application/json')   
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });    
});