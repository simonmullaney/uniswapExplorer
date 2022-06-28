const jwt = require('jsonwebtoken');
import passport from 'passport'
var ethUtil = require('ethereumjs-util');
import { bufferToHex } from 'ethereumjs-util';
import { recoverPersonalSignature } from 'eth-sig-util';
import { config } from '../config'

const nonceObj = {};


exports.getNonce = async(request, response, next) => {
	console.log("Setting random nonce..");
	let ethAddress = request.params.ethAddress;
	console.log("ethAddress: ",ethAddress);

	let nonce = Math.floor(Math.random() * 10000);
	nonceObj[ethAddress] = nonce;
	console.log("nonceObj: ",nonceObj);

	return response.status(200).json({
				'data': nonce,
				'message': 'Success',
				'status': 'success',
				'response': 200
	});
}

exports.getToken = async(request, response, next) => {
	console.log("Getting token..");
	let body = request.body;

	const nonce = nonceObj[body.address].toString();

	// We now are in possession of nonce, publicAddress and signature. We
	// will use a helper from eth-sig-util to extract the address from the signature
	const msgBufferHex = bufferToHex(Buffer.from(nonce, 'utf8'));


	console.log("msgBufferHex: ",msgBufferHex);
	console.log("body.signature: ",body.signature);


	const address = recoverPersonalSignature({
		data: msgBufferHex,
		sig: 	body.signature,
	});

	// The signature verification is successful if the address found with
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
						return reject(err);
					}
					if (!token) {
						return new Error('Empty token');
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

	return response.status(200).json({
				// 'data': nonce,
				'message': 'Success',
				'status': 'success',
				'response': 200
	});
}
