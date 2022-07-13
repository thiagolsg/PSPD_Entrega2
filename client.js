const grpc = require('grpc');
const PROTO_PATH = 'project.proto';

const ElementService = grpc.load(PROTO_PATH).ElementService;

const client = new ElementService('127.0.0.1:5051', grpc.credentials.createInsecure());


const MaxAndMin = (array) => {
    const max = array.reduce(function (prev, current) {
        return (prev.number > current.number) ? prev : current;
    });
    const min = array.reduce(function (prev, current) {
        return (prev.number < current.number) ? prev : current;
    });
    return [max, min];
}

client.list({}, (error, array) => {
    if (error) throw error;
    const [max, min] = MaxAndMin(array.elements);
    console.log(`Valor Máximo: ${max.number}`);
    console.log(`Valor Mínimo: ${min.number}`);
});
