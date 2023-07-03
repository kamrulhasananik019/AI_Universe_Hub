// __________This is Card section APi______________

const LoadData = async(dataLimit, sorted) => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools, dataLimit, sorted);
};

let itemToDisplay = 6;
let sortedType = 'ascending';
const displayData = (Ai_s, dataLimit, sorted) => {
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerText = '';

    if (dataLimit && Ai_s.length > 6) {
        Ai_s = Ai_s.slice(0, dataLimit);
        const SeeMoreBtn = document.getElementById('see-more');
        SeeMoreBtn.classList.remove('d-none')
    } else {
        const SeeMoreBtn = document.getElementById('see-more');
        SeeMoreBtn.classList.add('d-none')
    }
    // _______________sort by date ________________________________
    if (sorted) {
        data = Ai_s.sort(function(a, b) {
            if (sorted === 'ascending') {
                return new Date(b.published_in) - new Date(a.published_in);
            } else {
                return new Date(a.published_in) - new Date(b.published_in);
            }
        })
    }
    Ai_s.forEach(Ai => {

        // --____________________Al Card List________________--//
        let features = "";
        for (const feature_1 of Ai.features) {
            features += `<li class="custom-font-4">${feature_1}</li>`;
        };
        //------_________card main body ________------//

        const div = document.createElement('div');
        let date=Ai.published_in;
        let date2=date.split('/')
        let finalData=`${date2[0].padStart(2, 0)}/${date2[1].padStart(
            2,0  )}/${date2[2]} `

        div.classList.add('col');
        div.innerHTML = `
        <div class="card shadow h-100">
        <img src="${Ai.image}" class="card-img-top p-4" alt="...">
            <div class="card-body">
                <h2 class="card-title custom-font-3">Features</h2>
                <ol>
                ${features}
                </ol>
                <hr>
                <div class="d-flex justify-content-between">
                <div>
                    <h2 class="custom-font-5">${Ai.name}</h2>
                    <p class="custom-font-6"> <img src="img/Frame.png" alt=""> ${ finalData}</p>
                </div>
                <div>   <button type="button" onclick="loadModal('${Ai.id}')" class="btn " data-bs-toggle="modal" data-bs-target="#exampleModal">
                <img src="img/Group 31.png" alt="">
            </button></div>
            </div>
        </div>
        `
        mainContainer.appendChild(div);
        LoadingSpinner(false);
    });
}
const processLoading = (dataLimit) => {
        LoadData(dataLimit);
    }
    //---------------------See-More-Btn-----------------//
const defaultLimit = processLoading(6);
document.getElementById('see-more').addEventListener('click', function() {
    LoadingSpinner(true);
    processLoading();
});
//---------------------Short-By-Date Function-----------------//
const sortByDate = () => {
    LoadData(itemToDisplay, sortedType);
    sortedType == 'ascending' ? sortedType = 'descending' : sortedType = 'ascending'
};
// -----------Spinner----------//
const LoadingSpinner = loading => {
    const Spinner = document.getElementById('loading');
    if (loading === true) {
        Spinner.classList.remove('d-none')
    } else {
        Spinner.classList.add('d-none')
    }
}

// ____________This is modal Section Api___________
const loadModal = async(id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayModal(data.data);
}

const displayModal = (Ai_s) => {
     
        const object = Ai_s.features;
        // -------------feature--------// 
        let features_name = "";
        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                const element = object[key];
                features_name += `<li>${element.feature_name}</li>`
            }
        };
        // --------------Integration-------------//
        const integrations = Ai_s?.integrations;
        let integrations_name = "";
        if (integrations) {
            for (const integration of integrations) {
                integrations_name += `<li>${integration}</li>`;
            };
        } else {
            integrations_name = `<li>No data found</li>`
        }
        // ------------Price---------------//
        const pricing = Ai_s?.pricing;
        const firstModalCard = document.getElementById('first-card');
        const firstCardDiv = document.createElement('div');
        //-------------------Question-----------//
        const questions = Ai_s?.input_output_examples;
        //----------------------------------------//

        const ModalContainer = document.getElementById('modal-container');
        ModalContainer.innerHTML = `
                                <div class="row row-cols-1 row-cols-md-2">
                                <div class="col">
                                    <div class="card border-danger-subtle pr-c p-4 m-2 shadow">
                                        <h3>${Ai_s?.description}</h3>
                                        <div class="card-body">
                                            <!-- Monthly cost -->
                                            <div class="container-fluid d-flex justify-content-around gap-4 pt-3">
                                                <div class="d-flex justify-content-evenly align-items-center gap-4">
                                                <div class="border border-0 rounded bg-white text-center text-success fs-6 text fw-semibold">${!pricing ? "Free Of Cost" : pricing[0].price === '0' ? "Free Of Cost" : pricing[0].price + ' ' + pricing[0].plan}</div>
                                                <div class="border border-0 rounded bg-white text-center text-warning fs-6 text fw-semibold">${!pricing ? "Free Of Cost" : pricing[1].price === '0' ? "Free Of Cost" : pricing[1].price + ' ' + pricing[1].plan}</div>
                                                <div class="border border-0 rounded bg-white text-center text-danger fs-6 text fw-semibold">${!pricing ? "Free Of Cost" : pricing[2].price === '0' ? "Free Of Cost" : pricing[2].price + ' ' + pricing[2].plan}</div>
                                            </div>
                                            </div>

                                            <div class="d-flex justify-content-between pt-5">
                                                <div>
                                                    <h3>Features</h3>
                                                    <ul>
                                                    ${features_name}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h3>Integrations</h3>
                                                    <ul>
                                                    ${integrations_name}
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div class="col">
                                    <div class="card border-light-subtle mx-auto text-center mt-2 shadow">
                                        <div class="m-2"><img src="${Ai_s?.image_link ? Ai_s?.image_link[0]:''}" class="img-fluid" alt="...">
                                        ${Ai_s?.accuracy?.score ? `<button class="accuracy-btn">${Ai_s?.accuracy?.score*100}% accuracy</button>` : ''}
                                        </div>
                                        <div class="card-body">
                                        <h3 class="card-text">${questions && questions[0].input?questions[0].input : 'Can you give any example?'}</h3>
                                        <p class="card-text fs-6 text fw-semibold text-muted">${questions && questions[0].output?questions[0].output : 'No! Not Yet! Take a break!!!'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>  `
}

loadModal()
LoadData(6)