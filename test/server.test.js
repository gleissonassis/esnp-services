var request     = require('supertest');
var chai        = require('chai');
var expect      = chai.expect;
var jwtHelper   = require('../app/helpers/jwtHelper')();

describe('server', () => {
    var server;
    var currentTopic = null;
    var token = null;

    var newTopic = {
        title: 'Teste de tópico',
        thumbUrl: '/url',
        category: 'TD',
        date: new Date(2016, 09, 16)                    
    };

    before(() => {
        server = require('../server');
        token = jwtHelper.createToken({userName: 'user'});
    });

    after(() => {
        server.close();
    });

    describe('/api', () => {
        it('should be operational', (done) => {
            request(server)
                .get('/v1/api')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('/api/topics', () => {
        it('should return 403 to store a new topic with a invalid token', (done) => {
            request(server)
                .post('/v1/api/topics')
                .send(newTopic)
                .set('Accept', 'application/json')   
                .set('x-access-token', 'INVALID')
                .expect('Content-Type', /json/)
                .expect(403, done);
        });

        it('should store a new topic', (done) => {
            request(server)
                .post('/v1/api/topics')
                .send(newTopic)
                .set('Accept', 'application/json')   
                .set('x-access-token', token)
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
                .get('/v1/api/topics/' + currentTopic._id)
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
                .get('/v1/api/topics/null')
                .set('Accept', 'application/json')   
                .expect('Content-Type', /json/)
                .expect(404, done);
        });

        it('should return a list of topics', (done) => {
            request(server)
                .get('/v1/api/topics')
                .set('Accept', 'application/json')   
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('should return a list of topics using date param', (done) => {
            request(server)
                .get('/v1/api/topics?date=2016-09-15')
                .set('Accept', 'application/json')   
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('should return a empty list of topics using category param with a non existing category', (done) => {
            request(server)
                .get('/v1/api/topics?category=UNDEFINED_CATEGORY')
                .set('Accept', 'application/json')   
                .expect('Content-Type', /json/)
                .expect(200, (err, res) => {
                    expect(res.body.length).to.equal(0);
                    done();
                });
        });

        it('should return a list of topics using category param with a existing category', (done) => {
            request(server)
                .get('/v1/api/topics?category=TD')
                .set('Accept', 'application/json')   
                .expect('Content-Type', /json/)
                .expect(200, (err, res) => {
                    expect(res.body.length).be.at.least(1);
                    done();
                });
        });

        it('should return 403 to update a topic with a invalid token', (done) => {
            request(server)
                .post('/v1/api/topics')
                .send(currentTopic)
                .set('Accept', 'application/json')   
                .set('x-access-token', 'INVALID')
                .expect('Content-Type', /json/)
                .expect(403, done);
        });

        it('should update a topic', (done) => {
            request(server)
                .post('/v1/api/topics')
                .send(currentTopic)
                .set('Accept', 'application/json')   
                .set('x-access-token', token)
                .expect('Content-Type', /json/)
                .expect(200, (err, res) => {
                    expect(res.body._id).to.equal(currentTopic._id);
                    expect(res.body.title).to.equal(currentTopic.title);
                    expect(res.body.thumbUrl).to.equal(currentTopic.thumbUrl);
                    expect(res.body.category).to.equal(currentTopic.category);
                    done();
                });
        });

        it('should return 403 to delete a topic with a invalid token', (done) => {
            request(server)
                .delete('/v1/api/topics/' + currentTopic._id)
                .set('x-access-token', 'INVALID')
                .expect(403, done);
        });

        it('should delete a topic', (done) => {
            request(server)
                .delete('/v1/api/topics/' + currentTopic._id)
                .set('x-access-token', token)
                .expect(204, done);
        });
    });    

    describe('/api/categories', () => {
        it('should return a list of categories', (done) => {
            request(server)
                .get('/v1/api/categories')
                .set('Accept', 'application/json')   
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

     describe('/api/subscribers', () => {
         var subscriber = {
             registrationId: Date.now()
         };

        it('should store a new subscriber', (done) => {
            request(server)
                .post('/v1/api/subscribers')
                .send(subscriber)
                .set('Accept', 'application/json')   
                .expect('Content-Type', /json/)
                .expect(201, done);
        });

        it('should update a subscriber', (done) => {
            request(server)
                .post('/v1/api/subscribers')
                .send(subscriber)
                .set('Accept', 'application/json')   
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });
});