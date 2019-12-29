export const getHost = () => {
    if (window.location.host === "localhost:3000") {
        return "http://localhost:8080"
    }
};

const typeMap = {
    'json': 'application/json'
};

export const getContentType = (type) => {
   return {'Content-Type': typeMap[type]};
};