const db = require('../database').db;
const Model = require('../models/models') 
// const Comment = require('../models/comment')
const Joi = require('joi');

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
		path:'/user/createmodel',
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
	}
]
export default routes;