const CompaignModel = require('../models/compaign.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
    const data = Object.assign(req.body,{userId:req.jwt.userId});
    CompaignModel.createCompaign(data)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.list = (req, res) => {
    let bDate,eDate;
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if(req.query.date){
             bDate = new Date(req.query.date.bDate);
             eDate = new Date(req.query.date.eDate);
        }
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    let userId = req.jwt.userId;
    CompaignModel.list(limit,bDate, eDate, page, userId)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    CompaignModel.findById(req.jwt.userId,req.params.Id)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.putById = (req, res) => {

    CompaignModel.putCompaign(req.params.userId, req.body)
        .then((result)=>{
            req.status(204).send({});
        });
};

exports.patchById = (req, res) => {
    CompaignModel.patchCompaign(req.jwt.userId,req.params.userId, req.body)
        .then((result) => {
            res.status(204).send({result});
        });
};

exports.removeById = (req, res) => {
    CompaignModel.removeById(req.jwt.userId,req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
};