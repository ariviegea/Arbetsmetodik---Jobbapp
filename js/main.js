//api key

//fetchAll
const Fetch = {
    fetchAllJobs() {
        fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?nyckelord=sverige&sida=1&antalrader=10`)
            .then((response) => response.json())
            .then((jobs) => {
                console.log('Alla job');
                View.displayJobs(jobs, true);
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
<<<<<<< HEAD
            View.displayJobs(jobs, false);
=======
            View.displaySearched(jobs);
>>>>>>> e21ce2520d5b069f870075dce29d70e04d3f2ab1
        })
        .catch((error) => {
            console.log(error);
        });
    },
    fetchOneJob(id){
        fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/${id}`)
        .then((response) => response.json())
        .then((job) => {
            View.displayOne(job);
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
        displayJobs: function(jobs, all) {
            let jobCard = '';
<<<<<<< HEAD
            console.log(all);
    /* We dont need anymore if an else maybe lets check tomorrow */
        if (all){
            jobs = jobs.matchningslista.matchningdata;
        }
            else {
                console.log(jobs.soklista.sokdata);
                jobs = jobs.soklista.sokdata;
            } 
                
                for(let job of jobs) {
                console.log(job);
=======

            for(let job of jobs.matchningslista.matchningdata) {
>>>>>>> e21ce2520d5b069f870075dce29d70e04d3f2ab1
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
        },
        //BUTTON NOT WORKING
        displaySearched: function(jobs) {
            let jobCard = '';

            for(let job of jobs.soklista.sokdata) {
                console.log(job);
                jobCard +=`
                    <div>
                        <h2>${job.namn}</h2>
                        <button class="readmore-button" data-id="${job.id}">Go to ads</button>
                    </div>
                `;
            }
            jobList.innerHTML = jobCard;
        },
        displayOne: function(job){
            job = job.platsannons.annons;
            let jobCard = '';

            jobCard +=`
                <div>
                    <h2>${job.annonsrubrik}</h2>
                    <p>${job.annonstext}</p>
                    <p>${job.kommunnamn}</p>
                    <p>${job.platsannonsUrl}</p>
                    <p>${job.sista_ansokningsdag}</p>
                </div>
            `;

            jobList.innerHTML = jobCard;
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