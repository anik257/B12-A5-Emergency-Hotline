/* =========================
   SERVICES DATA
========================= */

const services = [

    {
        id: 1,
        name: "জাতীয় জরুরি সেবা",
        english: "National Emergency",
        number: "999",
        category: "সার্বজনীন",
        icon: "🚨"
    },

    {
        id: 2,
        name: "পুলিশ",
        english: "Police",
        number: "999",
        category: "পুলিশ",
        icon: "👮"
    },

    {
        id: 3,
        name: "ফায়ার সার্ভিস",
        english: "Fire Service",
        number: "999",
        category: "ফায়ার",
        icon: "🚒"
    },

    {
        id: 4,
        name: "অ্যাম্বুলেন্স",
        english: "Ambulance",
        number: "1994-999999",
        category: "স্বাস্থ্য",
        icon: "🚑"
    },

    {
        id: 5,
        name: "নারী ও শিশু সহায়তা",
        english: "Women & Child Helpline",
        number: "109",
        category: "সহায়তা",
        icon: "🛟"
    },

    {
        id: 6,
        name: "দুর্নীতি",
        english: "Anti-Corruption",
        number: "106",
        category: "দুর্নীতি",
        icon: "🚨"
    },

    {
        id: 7,
        name: "বিদ্যুৎ বিভ্রাট",
        english: "Electricity Outage",
        number: "16216",
        category: "বিদ্যুৎ",
        icon: "💡"
    },

    {
        id: 8,
        name: "ব্র্যাক",
        english: "Brac",
        number: "16445",
        category: "এনজিও",
        icon: "🧰"
    },

    {
        id: 9,
        name: "বাংলাদেশ রেলওয়ে",
        english: "Bangladesh Railway",
        number: "163",
        category: "পরিবহন",
        icon: "🚆"
    }

];


/* =========================
   VARIABLES
========================= */

let heartCount = 0;
let coinCount = 100;
let copyCount = 0;

let callHistory = [];


/* =========================
   DOM
========================= */

const serviceGrid =
    document.getElementById("service-grid");

const heartCountElement =
    document.getElementById("heart-count");

const coinCountElement =
    document.getElementById("coin-count");

const copyCountElement =
    document.getElementById("copy-count");

const historyList =
    document.getElementById("history-list");

const clearHistoryButton =
    document.getElementById("clear-history");



/* =========================
   DISPLAY SERVICES
========================= */

function displayServices() {

    serviceGrid.innerHTML = "";

    for (const service of services) {

        const card = document.createElement("div");

        card.dataset.id = service.id;

        card.className =
            "bg-white border border-[#e2e8e4] rounded-[7px] p-[13px] min-h-[160px] flex flex-col shadow-sm";


        card.innerHTML = `

            <!-- Card top -->

            <div class="flex items-center justify-between mb-2">

                <!-- Icon -->

                <div
                    class="w-7 h-7 rounded-[7px] bg-[#ffe5e5] flex items-center justify-center text-[15px]">

                    ${service.icon}

                </div>


                <!-- Heart -->

                <button
                    data-action="heart"
                    class="heart-btn text-[17px] text-gray-500 cursor-pointer">

                    ♡

                </button>

            </div>


            <!-- Name -->

            <h3
                class="text-[13px] font-bold mb-[3px]">

                ${service.name}

            </h3>


            <!-- English -->

            <p
                class="text-[9px] text-gray-500 mb-2">

                ${service.english}

            </p>


            <!-- Number -->

            <p
                class="text-[16px] font-extrabold mb-1">

                ${service.number}

            </p>


            <!-- Category -->

            <span
                class="self-start bg-gray-100 text-gray-500 text-[8px] px-2 py-[3px] rounded-full">

                ${service.category}

            </span>


            <!-- Buttons -->

            <div
                class="grid grid-cols-2 gap-[5px] mt-auto pt-3">

                <!-- Copy -->

                <button
                    data-action="copy"
                    class="h-[26px] rounded-[5px] border border-gray-300 bg-white text-[8px] cursor-pointer hover:bg-gray-50">

                    📋 Copy

                </button>


                <!-- Call -->

                <button
                    data-action="call"
                    class="h-[26px] rounded-[5px] border border-[#00a63c] bg-[#00a63c] text-white text-[8px] cursor-pointer hover:bg-[#008f34]">

                    ☎ Call

                </button>

            </div>

        `;


        serviceGrid.appendChild(card);
    }
}



/* =========================
   UPDATE NAVBAR
========================= */

function updateNavbar() {

    heartCountElement.innerText =
        heartCount;

    coinCountElement.innerText =
        coinCount;

    copyCountElement.innerText =
        copyCount;
}



/* =========================
   GET SERVICE
========================= */

function getService(card) {

    const serviceId =
        Number(card.dataset.id);

    return services.find(
        service => service.id === serviceId
    );
}



/* =========================
   GET CURRENT TIME
========================= */

function getCurrentTime() {

    return new Date().toLocaleTimeString(
        [],
        {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit"
        }
    );

}



/* =========================
   RENDER HISTORY
========================= */

function renderHistory() {

    historyList.innerHTML = "";


    /* Empty */

    if (callHistory.length === 0) {

        historyList.innerHTML = `

            <div
                class="min-h-[400px] flex items-center justify-center text-gray-400 text-[12px]">

                No call history yet

            </div>

        `;

        return;
    }


    /* History */

    for (const history of callHistory) {

        const item =
            document.createElement("div");


        item.className =
            "bg-gray-50 rounded-md p-2 mb-1.5 flex items-center justify-between";


        item.innerHTML = `

            <div>

                <strong
                    class="block text-[9px] mb-[3px]">

                    ${history.name}

                </strong>


                <span
                    class="text-[8px] text-gray-500">

                    ${history.number}

                </span>

            </div>


            <span
                class="text-[8px] text-gray-500">

                ${history.time}

            </span>

        `;


        historyList.appendChild(item);
    }
}



/* =========================
   COPY NUMBER
========================= */

async function copyNumber(number) {

    try {

        await navigator.clipboard.writeText(number);

    }

    catch (error) {

        const input =
            document.createElement("input");

        input.value = number;

        document.body.appendChild(input);

        input.select();

        document.execCommand("copy");

        input.remove();

    }

}



/* =========================
   EVENT DELEGATION
========================= */

serviceGrid.addEventListener(
    "click",
    async function (event) {

        const button =
            event.target.closest("[data-action]");


        if (!button) {
            return;
        }


        const card =
            button.closest("[data-id]");


        const service =
            getService(card);


        const action =
            button.dataset.action;



        /* =====================
           HEART
        ===================== */

        if (action === "heart") {

            const active =
                button.classList.toggle("active");


            if (active) {

                button.innerText = "♥";

                button.classList.remove(
                    "text-gray-500"
                );

                button.classList.add(
                    "text-red-500"
                );

                heartCount++;

            }

            else {

                button.innerText = "♡";

                button.classList.remove(
                    "text-red-500"
                );

                button.classList.add(
                    "text-gray-500"
                );

                heartCount--;

            }


            updateNavbar();

        }



        /* =====================
           COPY
        ===================== */

        if (action === "copy") {

            await copyNumber(
                service.number
            );


            copyCount++;


            updateNavbar();


            alert(
                `${service.number} copied successfully.`
            );

        }



        /* =====================
           CALL
        ===================== */

        if (action === "call") {


            /* Check coins */

            if (coinCount < 20) {

                alert(
                    "You don't have enough coins. A call costs 20 coins."
                );

                return;
            }


            /* Deduct */

            coinCount -= 20;

            updateNavbar();


            /* Alert */

            alert(
                `Calling ${service.name} (${service.number})`
            );


            /* History */

            const newHistory = {

                name: service.name,

                number: service.number,

                time: getCurrentTime()

            };


            callHistory.unshift(
                newHistory
            );


            renderHistory();

        }

    }
);



/* =========================
   CLEAR HISTORY
========================= */

clearHistoryButton.addEventListener(
    "click",
    function () {

        callHistory = [];

        renderHistory();

    }
);



/* =========================
   INITIALIZE
========================= */

displayServices();

updateNavbar();

renderHistory();