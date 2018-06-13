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
    },
    fetchJobSearch(searchQuery) {
        fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrken/${searchQuery}`)
        .then((response) => response.json())
        .then((jobs) => {
            console.log(jobs);
        })
        .catch((error) => {
            console.log(error);
        });
    },
    fetchOneJob(id){
        fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/${id}`)
        .then((response) => response.json())
        .then((jobs) => {
            console.log(jobs);
        })
        .catch((error) => {
            console.log(error);
        });
    },




}


const Model = (function(){
    return{
        //handle whats being fetched
    }
}());

const Controller = (function(){    
    return{
        bindHomePageEventListeners: function(){
            const searchInput = document.getElementById('searchInput');
            const searchButton = document.getElementById('searchButton');
            
            searchInput.addEventListener('keyUp', function(){
            let searchQuery = searchInput.value;
                
            });
            
            searchButton.addEventListener('click', function(event){
                //Prevent refreshing page while searching
                event.preventDefault();
                searchQuery = searchInput.value;
                Fetch.fetchJobSearch(searchQuery);
            });
            
    }

    }
}());

const View = (function(){
    return{

    //displayAll
    }
}());

Fetch.fetchAllJobs();