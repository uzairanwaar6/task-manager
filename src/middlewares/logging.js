module.exports = async (req, res, next) => {

    console.log('Req Headers', req.headers);
    console.log('Req Params', req.path);
    console.log('Req Body', req.body);

    await next();

    console.log('Res Headers', res.headers);
    console.log('Res Params', res.path);
    console.log('Res Body', res.body);
}