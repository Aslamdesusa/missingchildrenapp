const db = require('../database').db;
const Model = require('../models/models') 
const Comment = require('../models/comment')
const Joi = require('joi');
const path = require('path');
const fs = require('fs');

const routes =[

	{
    	method: 'GET',
    	path: '/getdetals/{id}',
    	handler: function(request, reply){
    		// console.log('sdfkjsjkf');
    		
    		config:{
    			validate:{
    				params:{
    					id:Joi.string().required()
    				}
    			}
    		}
    		Model.find({"_id":request.params.id}, function(err, data){
    			// console.log('dslfkjlkds');
    			if (err) {
    				reply({
    					statusCode: 503,
    					message: 'Faild to get Data',
    					data: err
    				});
    			}
    			else{
    				reply({
    					statusCode: 200,
    					message: "user details Successfully Fetched",
    					data: data
    				});
    			}
    		});
    	}
    },
	{
		method:'POST',
		path:'/user/create/missingChildren/details',
		handler: (request, reply) => {
			// console.log(request.payload);
			var newModel = new Model({
				"Name": request.payload.Name,
				"Description": request.payload.Description
			});
			console.log(newModel)
			newModel.save(function(err, data){
				if (err){
					throw err;
					console.log(err);
				} else {
					reply({
                        statusCode: 200,
                        message: 'missingChildren created Successfully',
                        data: data
                    });  
				}
			});
		}
	},
	{
	    method: 'GET',
	    path: '/user/getallmodel',
	    handler: ( request, reply ) => {
	    	console.log('slkdfjslkjfljs');
	    	Model.find(function(error, data){
	    		if(error){
	    			console.log(error);
	    		};
	    		reply({
	    			statusCode: 200,
	    			message: "successfully data Fetched",
	    			data: data
	    		});
	    	});
	    }
	},
	{
		method: 'PUT',
		path: '/update/onmissingchildren/{id}',
			config:{
				validate:{
					params:{
						id:Joi.string().required()
					},
					payload: {
						Name:Joi.string().required(),
						Description:Joi.string().required()
					}
				}
			},
			handler: (request, reply)=>{
				Model.findOneAndUpdate({_id: request.params.id}, request.payload, function (err, data){
					if (err) {
						reply({
							statusCode: 503,
              				data: err,
              				message: 'Failed to get data'
						});
					}else{
						reply({
							statusCode: 200,
							message: "user update successfully",
							data: data
						});
					}
				});
			}
	},
	{
		method: 'DELETE',
		path: '/missingChildren/deletedata/{id}',
		config:{
			validate:{
				params:{
					id:Joi.string().required()
				}
			}
		},
		handler: function(request, reply){
			// find user data from missing children id and remove data from database
			Model.findOneAndRemove({_id: request.params.id}, function(err){
				if (err) {
					reply({
						statusCode: 503,
						message: 'Error in removing user',
						data: err
					});
				}else{
					reply({
						statusCode: 200,
						message: 'MissingChildren Details Successfully Deleted'
					});
				}
			});
		}
	},
	{
    	method: 'GET',
    	path: '/getdetals/missingChildren/{Name}',
    	handler: function(request, reply){
    		// console.log('sdfkjsjkf');
    		
    		config:{
    			validate:{
    				params:{
    					Name:Joi.string().required()
    				}
    			}
    		}
    		Model.find({'Name':request.params.Name}, function(err, data){
    			console.log(data);
    			if (err) {
    				reply({
    					statusCode: 503,
    					message: 'Faild to get Data',
    					data: err
    				});
    			}else if(data.length === 0){
    				reply({
    					statusCode: 403,
    					message: 'missingChildren dose not exist',
    					data: data
    				});
    			}
    			else{
    				reply({
    					statusCode: 200,
    					message: "user details Successfully Fetched",
    					data: data
    				});
    			}
    		});
    	}
    },
    {
		method:'POST',
		path:'/user/create/missingChildren/comment/{id}',
		config:{
			validate:{
				params:{
					id:Joi.string().required()
				}
			}
		},
		handler: (request, reply) => {
			Model.find({'_id': request.params.id}, function(err, data){
				if (err) {
					reply({
						statusCode: 503,
						message: 'data dose not exist',
						data: err
					});
				}
				// return reply.continue();
			});
			// console.log(request.payload);
			var newComment = new Comment({
				"missngchildrenid": request.params.id,
				"comment": request.payload.comment,
			});
			newComment.save(function(err, data){
				if (err){
					throw err;
					console.log(err);
				} else {
					reply({
                        statusCode: 200,
                        message: 'missingChildren created comment Successfully',
                        data: data
                    });  
				}
			});
		}
	}
]
export default routes;