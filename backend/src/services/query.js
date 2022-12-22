//in mongo, if we pass in zero as the page limit, mongo will returned all of the documents in the collection
// Math.abs(query.limit) = 0 - all the documents will return in the first page
const DEFAULT_PAGE_LIMIT = 5; 
const DEFAULT_PAGE_NUMBER = 1; 

function getPagination(query) {
    const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
    const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT; // parseInt(query.limit); 
    const skip = (page - 1) * limit;

    return {
        skip,
        limit
    };
}

module.exports = { 
    getPagination 
};