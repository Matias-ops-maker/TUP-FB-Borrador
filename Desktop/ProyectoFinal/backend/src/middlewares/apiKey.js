export function checkApiKey(req, res, next) {
    const key = req.header("x-api-key");
    if (!key || key !== process.env.API_KEY) {
        return res.status(401).json({ error: "API_KEY inválida" });
    }
    next();
}