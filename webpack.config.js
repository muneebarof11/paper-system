module.exports = {
    module: {
        rules: [
            {
                test: /app\.js$/i,
                use: 'raw-loader',
                loader: 'raw-loader',
            }
        ]
    }
};
