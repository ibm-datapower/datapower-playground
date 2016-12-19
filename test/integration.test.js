'use strict';

const supertest = require('supertest');
const spawn = require('child_process').spawn;

describe('integration tests', () => {

    let request;

    before((done) => {
	const up = spawn('./deploy/kube-minikube-up.sh');
	up.stderr.on('data', (data) => {
	    console.error(`before: ${data}`);
	});
	up.on('close', (code) => {
	    done();
	});
    });

    after((done) => {
	const down = spawn('./deploy/kube-minikube-down.sh');
	down.stderr.on('data', (data) => {
	    console.error(`after: ${data}`);
	});
	down.on('close', (code) => {
	    done();
	});
    });

    it('determine application url', (done) => {
	const url = spawn('minikube', [ 'service', 'web', '--url' ]);
	url.stdout.on('data', (data) => {
	    request = supertest(`${data}`.trim());
	});
	url.stderr.on('data', (data) => {
	    console.error(`url: ${data}`);
	});
	url.on('close', (code) => {
	    done();
	});
    });

    it('echo', (done) => {
	request
	    .post('/echo')
	    .send({ date: 'today', route: '66' })
	    .expect(200, '{"date":"today","route":"66"}')
	    .end((err, res) => {
		done(err);
	    });
    });

    it('wait for service', (done) => {
	const headers = {
	    "Content-Type": "application/json",
	    "X-GS-Fiddle-Method": "POST",
	    "X-GS-Fiddle-Rule": "request",
	    "X-GS-Fiddle-Service": "mpgw",
	    "X-GS-Fiddle-Request-URI": "/echo",
	    "X-GS-Fiddle-Backside": "http://datapower-playground.mybluemix.net"
	};

	const timer = setInterval (() => {
	    try {
		request.post('/input_and_script')
		    .field('script', 'session.output.write("helloworld");')
		    .field('headers', JSON.stringify (headers))
		    .field('request', '')
		    .expect(200, 'helloworld')
		    .end((err, res) => {
			if (!err) {
			    clearInterval(timer);
			    done();
			} else {
			    console.error (err);
			}
		    });
	    } catch (ex) {}
	}, 1000);
    });

});
