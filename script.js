const ctx = document.getElementById("chart");
const chart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [{
      data: [5, 5, 5],
      backgroundColor: ['green', 'orange', 'red']
    }]
  },
  options: { responsive: false }
});

const singleMode = document.getElementById("singleMode");
const compareMode = document.getElementById("compareMode");
const singleDashboard = document.getElementById("singleDashboard");
const compareSection = document.getElementById("compareSection");

singleMode.addEventListener("click", function() {
  singleDashboard.style.display = "block";
  compareSection.style.display = "none";
  singleMode.classList.add("active-mode");
  compareMode.classList.remove("active-mode");
});

compareMode.addEventListener("click", function() {
  singleDashboard.style.display = "none";
  compareSection.style.display = "block";
  compareMode.classList.add("active-mode");
  singleMode.classList.remove("active-mode");
});

document.getElementById("searchbutton").addEventListener("click", async function() {
  const username = document.getElementById("username").value;
  try {
    const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`);
    if (!response.ok) {
      alert("API limit reached. Wait a minute and try again.");
      return;
    }
    const data = await response.json();
    const profileResponse = await fetch(`https://alfa-leetcode-api.onrender.com/${username}`);
    const profileData = await profileResponse.json();

    document.getElementById("easycount").textContent = data.easySolved;
    document.getElementById("mediumcount").textContent = data.mediumSolved;
    document.getElementById("hardcount").textContent = data.hardSolved;
    document.getElementById("totalSolved").textContent = data.easySolved + data.mediumSolved + data.hardSolved;
    document.getElementById("ranking").textContent = profileData.ranking;
    document.getElementById("name").textContent = profileData.name;

    const avatarImg = document.getElementById("avatar");
    avatarImg.src = profileData.avatar;
    avatarImg.style.display = "block";

    chart.data.datasets[0].data = [data.easySolved, data.mediumSolved, data.hardSolved];
    chart.update();

  } catch(error) {
    alert("Something went wrong. Try again.");
    console.log(error);
  }
});

document.getElementById("compareButton").addEventListener("click", async function() {
  const u1 = document.getElementById("username1").value;
  const u2 = document.getElementById("username2").value;

try {
    const [r1, r2] = await Promise.all([  // Promise.all used for both user data together(for fast response)
      fetch(`https://alfa-leetcode-api.onrender.com/${u1}/solved`),
      fetch(`https://alfa-leetcode-api.onrender.com/${u2}/solved`)
    ]);
const [d1, d2] = await Promise.all([r1.json(), r2.json()]);  // to convert to actual data
// d1,d2->solved stats and p1,p2-> profiles

    const [p1, p2] = await Promise.all([
    fetch(`https://alfa-leetcode-api.onrender.com/${u1}`).then(r => r.json()),
    fetch(`https://alfa-leetcode-api.onrender.com/${u2}`).then(r => r.json())
]);
    
     document.getElementById("name1").textContent = p1.name;
    document.getElementById("name2").textContent = p2.name;
    document.getElementById("avatar1").src = p1.avatar;
    document.getElementById("avatar2").src = p2.avatar;
    document.getElementById("easy1").textContent = d1.easySolved;
    document.getElementById("easy2").textContent = d2.easySolved;
    document.getElementById("medium1").textContent = d1.mediumSolved;
    document.getElementById("medium2").textContent = d2.mediumSolved;
    document.getElementById("hard1").textContent = d1.hardSolved;
    document.getElementById("hard2").textContent = d2.hardSolved;
    document.getElementById("total1").textContent = d1.easySolved + d1.mediumSolved + d1.hardSolved;
    document.getElementById("total2").textContent = d2.easySolved + d2.mediumSolved + d2.hardSolved;
    document.getElementById("rank1").textContent = p1.ranking;
    document.getElementById("rank2").textContent = p2.ranking;

    document.getElementById("compareGrid").style.display = "flex";

  } catch(error) {
    alert("Something went wrong. Try again.");
  }
});