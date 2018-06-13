//api key

//fetchAll
const Fetch = {
    fetchAllJobs() {
        fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?nyckelord=sverige&sida=1&antalrader=1000`)
            .then((response) => response.json())
            .then((jobs) => {
                console.log(jobs);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

const Model = (function(){
    return{
        //handle whats being fetched
    }
}());

const Controller = (function(){
    return{

    }
}());

const View = (function(){
    return{

    //displayAll
    }
}());

Fetch.fetchAllJobs();