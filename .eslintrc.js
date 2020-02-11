module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": ['airbnb-base','prettier'],    
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },    
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": ["prettier"],        
    "rules": {
        "prettier/prettier":"error",
        "class-methods-use-this": "off", //que todo o método não comece com this
        "no-param-reassign": "off", //que o valor passado por parâmetro sofra alteração
        "camelcase": "off" ,//que não use camel case
        "no-unused-vars":["error", {"argsIgnorePattern" : "next"}]
        
    }
};