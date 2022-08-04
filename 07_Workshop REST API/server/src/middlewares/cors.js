module.exports = () => (req, res, next) => {
    res.setHeader('Access-Contol-Allow-Origin', '*'); // 'http://localhost:3000' or '*' -> to allow all
    res.setHeader('Access-Contol-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, OPTIONS');
    // res.setHeader('Access-Contol-Allow-Headers', 'X-Authorization');

    next();
}