
module.exports.jsend = (obj, status = 'success', message = "") => {
    let sending = {
        status: status.toLowerCase(),
        data: obj,
    }
    if(message) sending['message'] = message;
    return sending;
}