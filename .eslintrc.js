module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "semi": [2, "always"],
        "quotes": [2, "single", { "avoidEscape": true }]
    }
};
