const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movingWalls', { useUnifiedTopology: true });
const Schema = mongoose.Schema;

const compaignSchema = new Schema({
    userId: String,
    compaignName: String,
    begin_date: { type: Date, default: Date.now },
    end_date: { type: Date, default: Date.now },
    status: String,
    report: JSON,
});

compaignSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

compaignSchema.set('toJSON', {
    virtuals: true
});

compaignSchema.findById = function (cb) {
    return this.model('Compaigns').find({ id: this.id }, cb);
};

const Compaign = mongoose.model('Compaigns', compaignSchema);

exports.findByName = (userId, name) => {
    return Compaign.find({ userId, compaignName: name });
};

exports.findById = (userId, id) => {
    return Compaign.find({ userId: userId, id: id })
        .then((result) => {
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createCompaign = (Data) => {
    const compaign = new Compaign(Data);
    return compaign.save();
};

exports.list = (perPage, page, bDate, eDate, userId) => {
    return new Promise((resolve, reject) => {
        Compaign.find({
            userId: userId
        }).where('begin_date').lte(bDate)
            .where('end_date').gte(eDate)
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, compaigns) {
                if (err) {
                    reject(err);
                } else {
                    resolve(compaigns);
                }
            })
    });
};



exports.patchCompaign = (userId, id, CompaignData) => {
    return new Promise((resolve, reject) => {
        Compaign.findOneAndUpdate({ userId, id }, CompaignData, function (err, compaign) {
            err ? reject(err) : resolve(compaign)
        })
    });
};


exports.removeById = (userId, Id) => {
    return new Promise((resolve, reject) => {
        Compaign.deleteOne({ _id: Id, userId: userId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};
