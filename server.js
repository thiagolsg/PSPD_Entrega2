const grpc = require('grpc');
const projectProto = grpc.load('project.proto');
const serverGrpc = new grpc.Server();

let randomValues = [];

function randomNumbers () {
    for (let index = 0; index < 10000; index++) {
        randomValues.push({ id: index, number: Number((Math.random() * (1000000 - 0) + 0).toFixed(4)) })
    };
};

serverGrpc.addService(projectProto.ElementService.service, {
    List: (_, callback) => {
        randomNumbers();
        callback(null, randomValues);
    }
});

serverGrpc.bind('127.0.0.1:5051', grpc.ServerCredentials.createInsecure());
serverGrpc.start();