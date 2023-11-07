import urlModel from "./url-model.js";

export  function findByLongUrlAndUserId(longUrl,userId){
    return urlModel.findOne({longUrl, userId});
}
export  function find(userId){
    return urlModel.find({userId});
}
export  function findByShortUrl(shortUrl){
    return urlModel.findOne({shortUrl});
}

export function create(longUrl, shortUrl, userId){
    return urlModel.create({ longUrl, shortUrl, userId })
}