//api key

//fetchAll
const Fetch = {
    fetchAllJobs() {
        fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?nyckelord=sverige&sida=1&antalrader=10`)
            .then((response) => response.json())
            .then((jobs) => {
                console.log('Alla job');
                View.displayJobs(jobs);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    fetchJobSearch(searchQuery) {
        fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrken/${searchQuery}`)
        .then((response) => response.json())
        .then((jobs) => {
            console.log('search');
            View.displayJobs(jobs);
        })
        .catch((error) => {
            console.log(error);
        });
    },
    fetchOneJob(id){
        fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/${id}`)
        .then((response) => response.json())
        .then((job) => {
            console.log(job);
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



const View = (function(){
    const jobList = document.getElementById('jobList');

    return{
        displayJobs: function(jobs) {
            let jobCard = '';

            for(let job of jobs.matchningslista.matchningdata) {
                console.log(job);
                jobCard +=`
                    <div>
                        <h2>${job.annonsrubrik}</h2>
                        <p>${job.lan}</p>
                        <p>${job.kommunnamn}</p>
                        <p>${job.publiceraddatum}</p>
                        <p>${job.annonsurl}</p>
                        <p>${job.sista_ansokningsdag}</p>
                        <button class="readmore-button" data-id="${job.annonsid}">Read more</button>
                    </div>
                `;
            }
            jobList.innerHTML = jobCard;

            //bind the eventlisteners here when buttons are in DOM
            Controller.bindJobListEventListeners();
        }
    //displayAll
    }
}());

const Controller = (function(){    
    return{
        bindEventListeners: function(){
            const searchInput = document.getElementById('searchInput');
            const searchButton = document.getElementById('searchButton');
            
            searchInput.addEventListener('keyup', function(){
            let searchQuery = searchInput.value;
                
            });
            
            searchButton.addEventListener('click', function(event){
                //Prevent refreshing page while searching
                event.preventDefault();
                searchQuery = searchInput.value;
                Fetch.fetchJobSearch(searchQuery);
            });


        },

        bindJobListEventListeners: function(){
            const buttons = document.querySelectorAll('button');

            for(let button of buttons){
                if(button.classList.contains('readmore-button')){
                    let jobId = button.dataset.id;
                    
                    button.addEventListener('click', function(){
                        Fetch.fetchOneJob(jobId);
                    });
                }
            }
        }
    }
}());

Fetch.fetchAllJobs();
Controller.bindEventListeners();