const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
let { app } = require('../index');
chai.use(chaiHttp);

describe('My test', () => {

  it('The response for the path `/files/data` must have a status code of 200', (done) => {
    chai.request(app)
    .get('/files/data')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      done();
    })
  });

  it('The response for the path `/files/data` must return an array', (done) => {
    chai.request(app)
    .get('/files/data')
    .end((err, res) => {
      res.body.should.be.a('array');
      done();
    })
  });

  it('The response for the path `/files/data` must return an array', (done) => {
    chai.request(app)
    .get('/files/data')
    .end((err, res) => {
      res.body.should.be.a('array');
      done();
    })
  });

  it('The response text for the path `/files/data/test1.csv` must be "Empty file"', (done) => {
    chai.request(app)
    .get('/files/data/test1.csv')
    .end((err, res) => {
      expect(res.text).to.be.equal('Empty file');
      done();
    })
  });

  it('The response text for the path `/files/data/test1000.csv` must be "File not found"', (done) => {
    chai.request(app)
    .get('/files/data/test1000.csv')
    .end((err, res) => {
      expect(res.text).to.be.equal('File not found');
      done();
    })
  });

  it('The response for the path `/files/data/test3.csv` must be an object', (done) => {
    chai.request(app)
    .get('/files/data/test3.csv')
    .end((err, res) => {
      res.body.should.be.a('object');
      done();
    })
  });
})