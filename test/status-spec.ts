"use strict";

import { ToolsController } from '../src/controllers/tools.server.controller';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as express from 'express';
import * as supertest from 'supertest';

const assert = chai.assert;
const app = express();

describe('Status', () => {
    it('should return right message on get', function(done) {
        // supertest(app)
        supertest("localhost:8899")
            .get('/status')
            .set('Accept', 'application/json')
            .expect(200)
            .then(function(res) {
                if(!res || !res.body) {
                    throw new Error();
                }
                assert( /API is up/.test(res.body.msg), 'API doesn\'t return the right message' );
                done();
            }, function(err) {
                done(err);
            });
    });
});
