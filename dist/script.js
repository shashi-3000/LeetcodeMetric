document.addEventListener("DOMContentLoaded",function(e){
    // e.preventDefault();
    const userInput = document.getElementById('userInput')
    const searchBtn = document.getElementById('searchBtn')
    const easyCircle = document.getElementById('easyCircle')
    const mediumCircle = document.getElementById('mediumCircle')
    const hardCircle = document.getElementById('hardCircle')
    const easyLabel = document.getElementById('easyLabel')
    const mediumLabel = document.getElementById('mediumLabel')
    const hardLabel = document.getElementById('hardLabel')
    const cards = document.getElementById('cards')             

    //function to check the validity of user -> returns true or false
    function validateUsername(username){
        if(username.trim()===""){
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid username")
        }
        return isMatching;
    }

    //function to get data using leetcode username using API
    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;

        try {
            searchBtn.textContent = "Searching...";
            searchBtn.disabled = true;

            const response = await fetch(url);
            const data = await response.json();

            if (data.status !== "success") {
                throw new Error("User not found.");
            }

            console.log("logging data: ", data);

            displayUserData(data);

        } catch (error) {
            cards.innerHTML = `
            <div class="mt-4 p-4 font-semibold text-center rounded-md flex items-center justify-center space-x-2" style="color: #ffffff !important;">
                <span class="text-2xl">❌</span>
                <span>No data found. Please check the username.</span>
            </div>
            `;
        } finally {
            searchBtn.textContent = "Search";
            searchBtn.disabled = false;
        }
    }

    //function to display data
    function displayUserData(data){
        // const {
        //     acceptanceRate,
        //     contributionPoints,
        //     easySolved,
        //     hardSolved,
        //     mediumSolved,
        //     message,
        //     ranking,
        //     reputation,
        //     status,
        //     totalEasy,
        //     totalHard,
        //     totalMedium,
        //     totalQuestions,
        //     totalSolved
        // } =data;

        //ORR
        const easySolved = data.easySolved;
        const totalEasy = data.totalEasy;
        const mediumSolved = data.mediumSolved;
        const totalMedium = data.totalMedium;
        const hardSolved = data.hardSolved;
        const totalHard = data.totalHard;
        const acceptanceRate = data.acceptanceRate;
        const contributionPoints = data.contributionPoints;
        const ranking = data.ranking;
        const reputation = data.reputation;
        const totalSolved = data.totalSolved;
        const totalQuestions = data.totalQuestions;

        //percent
        const easyPercent = totalQuestions!=0 ? (easySolved/totalEasy)*100 : 0;
        const mediumPercent = totalQuestions!=0 ? (mediumSolved/totalMedium)*100 : 0;
        const hardPercent = totalQuestions!=0 ? (hardSolved/totalHard)*100 : 0;

        //rings color
        easyCircle.style.setProperty('--progress', `${easyPercent}%`);
        mediumCircle.style.setProperty('--progress', `${mediumPercent}%`);
        hardCircle.style.setProperty('--progress', `${hardPercent}%`);

        easyCircle.style.background = `conic-gradient(#22c55e ${easyPercent}%, #1e293b ${easyPercent}%)`;
        mediumCircle.style.background = `conic-gradient(#c5b209 ${mediumPercent}%, #1e293b ${mediumPercent}%)`;
        hardCircle.style.background = `conic-gradient(#dc2626 ${hardPercent}%, #1e293b ${hardPercent}%)`;

        easyLabel.innerHTML = `<span class="hover:text-white flex flex-col"><span>Easy</span>\n${easySolved}/${totalEasy}</span>`;
        mediumLabel.innerHTML = `<span class="hover:text-white flex flex-col"><span>Medium</span>\n${mediumSolved}/${totalMedium}</span>`;
        hardLabel.innerHTML = `<span class="hover:text-white flex flex-col"><span>Hard</span>\n${hardSolved}/${totalHard}</span>`;


        cards.innerHTML = `
            <div class="text-blue-950 font-semibold text-md mt-4 space-y-2 flex flex-col items-center">
                <p><strong>Total Solved: </strong> ${totalSolved} / ${totalQuestions}</p>
                <p><strong>Acceptance Rate: </strong> ${acceptanceRate}%</p>
                <p><strong>Contribution Points: </strong> ${contributionPoints}</p>
                <p><strong>Ranking: </strong> ${ranking}</p>
                <p><strong>Reputation: </strong> ${reputation}</p>
            </div>
        `;
    }


    searchBtn.addEventListener('click',function(){
        const username = userInput.value;
        //now we need to check if the3 user is valid
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })


})