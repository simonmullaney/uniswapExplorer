const jwt = require('jsonwebtoken');
import passport from 'passport'
var ethUtil = require('ethereumjs-util');
import { bufferToHex } from 'ethereumjs-util';
import { recoverPersonalSignature } from 'eth-sig-util';
import { config } from '../config'

const nonceObj = {};

//Function to return a random nonce
exports.getNonce = async(request, response, next) => {
	// console.log("Setting random nonce..");
	let ethAddress = request.params.ethAddress;
	let nonce = Math.floor(Math.random() * 10000);
	nonceObj[ethAddress] = nonce;

	return response.status(200).json({
		'data': nonce,
		'message': 'Success',
		'status': 'success',
		'response': 200
	});
}

//Function to retun a jwt token
exports.getToken = async(request, response, next) => {
	let body = request.body;
	const nonce = nonceObj[body.address].toString();

	// We now have nonce, publicAddress and signature.
	// Use eth-sig-util to extract the address from the signature
	const msgBufferHex = bufferToHex(Buffer.from(nonce, 'utf8'));

	const address = recoverPersonalSignature({
		data: msgBufferHex,
		sig: 	body.signature,
	});

	// Signature verification is successful if the address found with
	// sigUtil.recoverPersonalSignature matches the initial publicAddress
	if (address.toLowerCase() === body.address) {

		return new Promise<string>((resolve, reject) =>
			// https://github.com/auth0/node-jsonwebtoken
			jwt.sign({payload:body.address},
				config.secret,
				{
					algorithm: config.algorithms[0],
				},
				(err, token) => {
					if (err) {
						response.status(401).send({
							'error': err,
							'message': 'Fail',
							'status': 'Fail',
							'response': 401
						});
					}
					if (!token) {
						response.status(401).send({
							'error': 'Empty token',
							'message': 'Fail',
							'status': 'Fail',
							'response': 401
						});
					}
					return response.status(200).json({
						'data': token,
						'message': 'Success',
						'status': 'Success',
						'response': 200
					})
				}
			)
		);
		} else {
		response.status(401).send({
			'error': 'Signature verification failed',
			'message': 'Fail',
			'status': 'Fail',
			'response': 401
		});

		return null;
	}
}
