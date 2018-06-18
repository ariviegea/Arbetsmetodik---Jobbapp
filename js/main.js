//api key

const app = {
    isLoading: true
}

//fetchAll
const FetchJobs = {
    fetchAll() {
        fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?nyckelord=sverige&sida=1&antalrader=10`)
            .then((response) => response.json())
            .then((jobs) => {
                View.displayJobs(jobs);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    fetchSearched(searchQuery) {
        fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrken/${searchQuery}`)
        .then((response) => response.json())
        .then((jobs) => {
            View.displaySearched(jobs);
        })
        .catch((error) => {
            console.log(error);
        });
    },
    fetchOne(id){
        fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/${id}`)
        .then((response) => response.json())
        .then((job) => {
            View.displayOne(job);
        })
        .catch((error) => {
            console.log(error);
        });
    },
    fetchCategory(id){
        fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?yrkesid=${id}&antalrader=10`)
        .then((response) => response.json())
            .then((jobs) => {
                View.displayJobs(jobs);
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

getJobs = function() {
    var url = `http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?nyckelord=sverige&sida=1&antalrader=10`;
    if ('caches' in window) {
      caches.match(url).then(function (response) {
        if (response) {
          response.json().then(function updateFromCache(json) {
            var results = json;
            results.created = new Date();
            View.displayJobs(results);
          })
        }
      });
    }
}

getJobs();



const View = (function(){
    const jobList = document.getElementById('jobList');
    const jobCardContainer = document.getElementById('jobCardContainer');
    const spinner = document.getElementById('spinner');

    return{
        
        displayJobs: function(jobs) {
            let jobCard = '';

            for(let job of jobs.matchningslista.matchningdata) {
                jobCard +=`
                    <div>
                        <br>
                        <h2>${job.annonsrubrik}</h2>
                        <p>County: ${job.lan}</p>
                        <p>City: ${job.kommunnamn}</p>
                        <p>Published on: ${job.publiceraddatum}</p>
                        
                        <p> Last application date: ${job.sista_ansokningsdag} </p>
                        <button class="readmore-button" data-id="${job.annonsid}">Read more</button>
                        <hr>
                    </div>
                `;
            }
            
            jobList.innerHTML = jobCard;
            Controller.bindButtonsEventListeners();


            //if data is loading, show spinner to let user know its loading
            if(app.isLoading){
                spinner.classList.remove('hidden');
                jobCardContainer.classList.add('hidden');
            }
        },
        
        displaySearched: function(jobs) {
            let jobCard = '';

            for(let job of jobs.soklista.sokdata) {
                jobCard +=`
                    <div>
                        <h2>${job.namn}</h2>
                        <button class="category-button" data-id="${job.id}">Go to category</button>
                        <hr>
                    </div>
                `;
            }
            jobList.innerHTML = jobCard;
            Controller.bindButtonsEventListeners();
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
                    <p>${job.publiceraddatum}</p>
                </div>
                <button class="back-button">Back</button>
            `;

            jobList.innerHTML = jobCard;
            Controller.bindButtonsEventListeners();
        }
    }
}());

const Controller = (function(){    
    return{
        
        bindSearchEventListeners: function(){
            const searchInput = document.getElementById('searchInput');
            const searchButton = document.getElementById('searchButton');
            
            searchInput.addEventListener('keyup', function(){
                let searchQuery = searchInput.value;     
            });
            
            searchButton.addEventListener('click', function(event){
                //Prevent refreshing page while searching
                event.preventDefault();
                searchQuery = searchInput.value;
                
                FetchJobs.fetchSearched(searchQuery);
            });


        },

        bindButtonsEventListeners: function(){
            const buttons = document.querySelectorAll('button');

            for(let button of buttons){
                
                if(button.classList.contains('readmore-button')){
                    let jobId = button.dataset.id;
                    
                    button.addEventListener('click', function(){
                        FetchJobs.fetchOne(jobId);
                    });
                } 
                else if (button.classList.contains('category-button')){
                    let categoryId = button.dataset.id;
                    
                    button.addEventListener('click', function(){
                        FetchJobs.fetchCategory(categoryId);
                    });

                }else if(button.classList.contains('back-button')){
                        //let x = button.dataset.id;
                    button.addEventListener('click', function(){
                        FetchJobs.fetchAll();
                    });
                }
            }
        }
    };
}());


if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('../service-worker.js')
             .then(function() {
               console.log('Service Worker Registered');
             })
  }

FetchJobs.fetchAll();
Controller.bindSearchEventListeners();