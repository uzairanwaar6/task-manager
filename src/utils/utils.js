const parseDBError = (error) => {
    return Object.values(error.errors).map(item => {
        delete item.properties.reason
        return {
            field: item.path,
            properties: item.properties
        };
    });
};