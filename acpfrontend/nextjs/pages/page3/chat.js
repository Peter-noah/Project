export function createConnection(serverUrl, roomId) {
    // A real implementation would connect to the server
    return {
        connect() {
            console.log('O connecting to' + roomId + ' room at ' + serverUrl + '...')
        },
        disconnect(){
            console.log('X disconnected from '+ roomId + ' room at ' + serverUrl);
        }
    };
}