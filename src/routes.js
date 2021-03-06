const db = require('../database').db;
const missingChildModal = require('../models/models') 
const Comment = require('../models/comment')
const loginModal = require('../models/login')
const Joi = require('joi');
const path = require('path');
const fs = require('fs');
var express = require('express');
// var Schema = mongoose.Schema;
var multer = require('multer');
const async = require('async')
const Readable = require('stream').Readable

const routes =[
	// {
	// 	method: 'GET',
	// 	path: '/',
	// 	config:{
	// 		tags:['api'],
	// 		description:"node is working",
	// 		notes:"node is working",
	// 	},
	// 	handler: function(request, reply){
	// 		return reply('node is working')
	// 	}
	// },
	// {
 //    	method: 'GET',
 //    	path: '/Get/missingchildren/detals/by/{id}',
 //    	config:{
 //    		tags:['api'],
 //            description:"Getting Details Of a Particular Missing Children",
 //            notes:"We can get details of a particular missngchildrenid with his precious id",
 //    		validate:{
	// 			params:{
	// 				id:Joi.string().required()
	// 			}
	// 		}
	// 	},
 //    	handler: function(request, reply){
 //    		Model.find({"_id":request.params.id}, function(err, data){
 //    			// console.log('dslfkjlkds');
 //    			if (err) {
 //    				reply({
 //    					statusCode: 503,
 //    					message: 'Faild to get Data',
 //    					data: err
 //    				});
 //    			}
 //    			else{
 //    				reply({
 //    					statusCode: 200,
 //    					message: "user details Successfully Fetched",
 //    					data: data
 //    				});
 //    			}
 //    		});
 //    	}
 //    },
	// {
	// 	method:'POST',
	// 	path:'/create/missingChildren/details',
	// 	config:{
			// tags:['api'],
   //          description:"User Can Create Missing Child Details",
   //          notes:"You have to create missing children Details",
	// 	},
	// 	handler: (request, reply) => {
	// 		// console.log(request.payload);
	// 		var newModel = new Model({
	// 			"Name": request.payload.Name,
	// 			"Description": request.payload.Description
	// 		});
	// 		console.log(newModel)
	// 		newModel.save(function(err, data){
	// 			if (err){
	// 				throw err;
	// 				console.log(err);
	// 			} else {
	// 				reply({
 //                        statusCode: 200,
 //                        message: 'missingChildren created Successfully',
 //                        data: data
 //                    });  
	// 			}
	// 		});
	// 	}
	// },
	{
    method: 'POST',
    path: '/create/missingChildren/details',
    config: {
    	// handler: handlers.storeAddFile,
    	plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            },
        },
    	tags:['api'],
        description:"User Can Create Missing Child Details",
        notes:"You have to post missing children Details and keep in your mind that both fields are required",
        // path : "/uploads/file",
    	payload: {
    		output: 'file',
            parse: true,
            allow: 'multipart/form-data',
            maxBytes: 2 * 1000 * 1000,
        },
        validate:{
        	payload:{
        		file: Joi.any()
                    .meta({ swaggerType: 'file' })
                    .description('json file'),
        		"missingChildName": Joi.string(),
        		"Description": Joi.string()
        	}
        },
    },
    handler: function (request, reply) {
    	var uuid = {};
    	var newModel = new missingChildModal(request.payload);
    	newModel.save(function (err, data){
    		if (err) {
    			reply('error saving data')
			}else{
				reply({
					statusCode: 200,
                    message: 'Missing Children Details Created Successfully',
                    data: data
				})
				uuid=data;
				var dataa = request.payload;
	            if (dataa.image) {
	                var name = uuid._id + ".jpg";
	                const __dirname = '../missingchildrenapp/src'
	                var path = __dirname + "/uploadimage/" + name;
	                var file = fs.createWriteStream(path);

	                file.on('error', function (err) { 
	                    console.error('error in saving image') 
	                });
	                dataa.image.pipe(file);
	                dataa.image.on('end', function (err) {
	                    var ret = {
	                        filename: uuid._id + ".jpg",
	                        headers: dataa.image.hapi.headers

	                    }
	                });
		        }
			}

		});

    }
},
	// {
	//     method: 'GET',
	//     path: '/Get/all/data',
	//     config:{
	//     	tags:['api'],
 //            description:"getting all data from here",
 //            notes:"we can get all data from here and you will see all missingChildren details here",
	//     },
	//     handler: ( request, reply ) => {
	//     	// console.log('slkdfjslkjfljs');
	//     	Model.find(function(error, data){
	//     		if(error){
	//     			console.log(error);
	//     		};
	//     		reply({
	//     			statusCode: 200,
	//     			message: "successfully data Fetched",
	//     			data: data
	//     		});
	//     	});
	//     }
	// },
	// {
	// 	method: 'PUT',
	// 	path: '/Update/missingchildren/details/{id}',
	// 		config:{
	// 			tags:['api'],
	//             description:"Edit Missing Children Details",
	//             notes:"we can Edit all details of missingchildren from his id",
	// 			validate:{
	// 				params:{
	// 					id:Joi.string().required()
	// 				},
	// 				payload: {
	// 					Name:Joi.string().required(),
	// 					Description:Joi.string().required()
	// 				}
	// 			}
	// 		},
	// 		handler: (request, reply)=>{
	// 			Model.findOneAndUpdate({_id: request.params.id}, request.payload, function (err, data){
	// 				if (err) {
	// 					reply({
	// 						statusCode: 503,
 //              				data: err,
 //              				message: 'Failed to get data'
	// 					});
	// 				}else{
	// 					reply({
	// 						statusCode: 200,
	// 						message: "user update successfully",
	// 						data: data
	// 					});
	// 				}
	// 			});
	// 		}
	// },
	// {
	// 	method: 'DELETE',
	// 	path: '/Delete/missingchildren/data/{id}',
	// 	config:{
	// 		tags:['api'],
 //            description:"Delete Missing Children Data",
 //            notes:"We Can Delete Missing Children Data From Missing Children ID",
	// 		validate:{
	// 			params:{
	// 				id:Joi.string().required()
	// 			}
	// 		}
	// 	},
	// 	handler: function(request, reply){
	// 		// find user data from missing children id and remove data from database
	// 		Model.findOneAndRemove({_id: request.params.id}, function(err){
	// 			if (err) {
	// 				reply({
	// 					statusCode: 503,
	// 					message: 'Error in removing user',
	// 					data: err
	// 				});
	// 			}else{
	// 				reply({
	// 					statusCode: 200,
	// 					message: 'MissingChildren Details Successfully Deleted'
	// 				});
	// 			}
	// 		});
	// 	}
	// },
	// {
 //    	method: 'GET',
 //    	path: '/Get/detals/missingChildren/{Name}',
 //    	config:{
 //    		tags:['api'],
 //            description:"Get Details Of Missing Children By His/Her Name",
 //            notes:"We Can Get Details Of Missing Children From His/Her Name",
	// 		validate:{
	// 			params:{
	// 				Name:Joi.string().required()
	// 			}
	// 		}
	// 	},
 //    	handler: function(request, reply){   		
 //    		Model.find({'Name':request.params.Name}, function(err, data){
 //    			console.log(data);
 //    			if (err) {
 //    				reply({
 //    					statusCode: 503,
 //    					message: 'Faild to get Data',
 //    					data: err
 //    				});
 //    			}else if(data.length === 0){
 //    				reply({
 //    					statusCode: 403,
 //    					message: 'missingChildren dose not exist',
 //    					data: data
 //    				});
 //    			}
 //    			else{
 //    				reply({
 //    					statusCode: 200,
 //    					message: "user details Successfully Fetched",
 //    					data: data
 //    				});
 //    			}
 //    		});
 //    	}
 //    },
 //    {
	// 	method:'POST',
	// 	path:'/Create/comment/on/missingChildren/{id}',
	// 	config:{
	// 		tags:['api'],
 //            description:"Create Comment on particular missing children Details From Missing Children ID",
 //            notes:"We Can Create comment On Missing Children Details From missing Children ID",
	// 		validate:{
	// 			params:{
	// 				id:Joi.string().required()
	// 			}
	// 		}
	// 	},
	// 	handler: (request, reply) => {
	// 		Model.find({'_id': request.params.id}, function(err, data){
	// 			if (err) {
	// 				reply({
	// 					statusCode: 503,
	// 					message: 'data dose not exist',
	// 					data: err
	// 				});
	// 			}
	// 			// return reply.continue();
	// 		});
	// 		// console.log(request.payload);
	// 		var newComment = new comment({
	// 			"missngchildrenid": request.params.id,
	// 			"comment": request.payload.comment,
	// 		});
	// 		newComment.save(function(err, data){
	// 			if (err){
	// 				throw err;
	// 				console.log(err);
	// 			} else {
	// 				reply({
 //                        statusCode: 200,
 //                        message: 'missingChildren created comment Successfully',
 //                        data: data
 //                    });  
	// 			}
	// 		});
	// 	}
	// },
	// {
	// 	method: 'GET',
	// 	path: '/Get/comment/by/{id}',
	// 	config: {
	// 		tags:['api'],
 //            description:"Get Comment By ID",
 //            notes:"We Can Get Comment By Comment ID",
	// 		validate:{
	// 			params:{
	// 				id:Joi.string().required()
	// 			}
	// 		}
	// 	},
	// 	handler: function(request, reply){
	// 		Comment.find({_id: request.params.id}, function(err, data){
	// 			if (err) {
	// 				reply({
	// 					statusCode: 503,
	// 					message: 'this id dose not exist',
	// 					data: err
	// 				});
	// 			}else{
	// 				reply({
	// 					statusCode: 200,
	// 					message: 'data has found successfully',
	// 					data: data
	// 				});
	// 			}
	// 		});
	// 	}
	// },
	// {
	// 	method: 'PUT',
	// 	path: '/Update/comment/{id}',
	// 	config:{
	// 		tags:['api'],
 //            description:"Edit Comment By Comment ID",
 //            notes:"We Can Edit Comment By Comment ID",
	// 		validate:{
	// 			params:{
	// 				id:Joi.string().required()
	// 			},
	// 			payload: {
	// 				comment:Joi.string().required(),
	// 			}
	// 		}
	// 	},
	// 	handler: function(request, reply){
	// 		Comment.findOneAndUpdate({_id:request.params.id}, request.payload, function(err, data){
	// 			if (err) {
	// 				reply({
	// 					statusCode: 503,
	// 					message: 'this id data dose not exist',
	// 					data: err
	// 				});
	// 			}else{
	// 				reply({
	// 					statusCode: 200,
	// 					message: 'comment update successfully',
	// 					data: data
	// 				});
	// 			}
	// 		});
	// 	}
	// },
	// {
	// 	method: 'DELETE',
	// 	path: '/Delete/comment/{id}',
	// 	config:{
	// 		tags:['api'],
 //            description:"Delete Comment By ID",
 //            notes:"We Can Delete Comment By CommentID",
	// 		validate:{
	// 			params:{
	// 				id:Joi.string().required()
	// 			}
	// 		}
	// 	},
	// 	handler: function(request, reply){
	// 		Comment.findOneAndRemove({'_id':request.params.id}, function(err, data){
	// 			if (err) {
	// 				reply({
	// 					statusCode: 503,
	// 					message: 'This id comment dose not exist',
	// 					data: err
	// 				});
	// 			}else{
	// 				reply({
	// 					statusCode: 200,
	// 					message: 'Comment Deleted Successfully',
	// 					data: data
	// 				});
	// 			}
	// 		});
	// 	}
	// },
	// {
 //        method: 'POST',
 //        path: '/submit',
 //        config:{
 //        	tags:['api'],
 //            description:"Post MissingChildren Image",
 //            notes:"We Can Add a Picture of MissingChildren",
 //            payload:{
 //            	output: 'stream',
	//             parse: true,
	//             allow: 'multipart/form-data',
 //            }
 //        },
 //        handler: function(request, reply){
 //        	var data = request.payload;
 //        	if (data.file) {
 //        		var name = data.file.hapi.filename;
 //        		var path = __dirname + "/uploadimage/" + name;
 //        		var file = fs.createWriteStream(path);

 //        		file.on('error', function (err){
 //        			console.error(err)
 //        		});
 //        		data.file.pipe(file);

 //        		data.file.on('end', function (err){
 //        			var ret = {
 //        				filename: data.file.hapi.filename,
 //                        headers: data.file.hapi.headers
 //        			}
 //        			reply(ret)
 //        		});
 //        	}
 //        }
 //    },
    {
    	method: 'POST',
    	path: '/signup',
    	config:{
        	tags:['api'],
            description:"user can signup with some details.",
            notes:"When you are posting user data then you have to keep in your mind that object data's key is as same as the example value's key if you wanna check this how it's work you have to click on modal of example value when data will come to the body then press the try it button.",
            validate:{
            	payload:{
            		"firstname": Joi.string(),
				    "lastname": Joi.string(),
				    "mobile": Joi.number().required(),
				    "emailid": Joi.string().required(),
				    "password": Joi.string(),
				    "address": Joi.string(),
				    "state": Joi.string(),
				    "city": Joi.string(),
				    "pincode": Joi.number(),
				    "gender": Joi.string(),
            	}
            }
        },
        handler: function(request, reply){
        	console.log(request.payload)
			var newUser = new loginModal(request.payload);
			newUser.save({}, function(err, data){
				if (err) {
					reply('user already exist please try with another mobile and email')
				}else{
					return reply({
						message: 'user successfully registered',
						data: data
					});
				}
			});
        }
    },
    {
	    method:'POST',
	    path:'/user/login',
	    config:{
	    	tags:['api'],
            description:"User Login",
            notes:"You can use this api with payload emailid and password keep in your mind emailid and password must be as same in database.",
	    	validate: {
	         	payload:{
	         		emailid:Joi.string().required(),
	         		password:Joi.string().required(),
	         	}
			},
	    },
	    handler: function(request, reply){
	    	loginModal.find({'emailid': request.payload.emailid, 'password': request.payload.password, }, function(err, data){
	    		if (err){
	    			throw err
	    		}else if (data.length == 0){
	    			reply('User Dose Not Exist Please try with your correct Email and Password')
	    		}else{
	    			request.cookieAuth.set(data[0]);
	    			reply(data)
	        	}
	        })
	    }
	},
       

]
export default routes;