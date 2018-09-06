let configure={};


configure.port=3000;
configure.allowedCorsOrigin="*";
configure.env="dev";
configure.db={
    uri:"mongodb://127.0.0.1:27017/onlineMarketDB"
};
configure.apiVersion="/api/v1";

module.exports={

    port:configure.port,
    allowedCorsOrigin:configure.allowedCorsOrigin,
    db:configure.db,
    environment:configure.env,  
    apiVersion:configure.apiVersion

}
