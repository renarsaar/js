// Create Data
const data = [
  {
    name: "Renar Saaremets",
    age: 25,
    gender: "male",
    lookingfor: "female",
    location: "Tallinn",
    image: "https://randomuser.me/api/portraits/men/82.jpg"
  },
  {
    name: "Jaan Paas",
    age: 22,
    gender: "male",
    lookingfor: "female",
    location: "Tartu",
    image: "https://randomuser.me/api/portraits/men/54.jpg"
  },
  {
    name: "Mari Kask",
    age: 19,
    gender: "female",
    lookingfor: "male",
    location: "Saku",
    image: "https://randomuser.me/api/portraits/women/13.jpg"
  },
  {
    name: "Kadi Kuusk",
    age: 29,
    gender: "female",
    lookingfor: "male",
    location: "Maardu",
    image: "https://randomuser.me/api/portraits/women/52.jpg"
  }
];

const profiles = profileIterator(data);

// Load first person manually
nextProfile();

// Next event
document.getElementById("next").addEventListener("click", nextProfile);

// Next profile Display
function nextProfile() {
  const currentProfile = profiles.next().value;

  if (currentProfile !== undefined) {
    document.getElementById("profileDisplay").innerHTML = `
  <ul class="list group">
    <li class="list-group-item">
      Name: ${currentProfile.name}
    </li>
    <li class="list-group-item">
      Age: ${currentProfile.age}
    </li>
    <li class="list-group-item">
      Gender: ${currentProfile.gender}
    </li>
    <li class="list-group-item">
      Looking for: ${currentProfile.lookingfor}
    </li>
    <li class="list-group-item">
      Location: ${currentProfile.location}
    </li>
  </ul>
  `;

    document.getElementById("imageDisplay").innerHTML = `
  <img src="${currentProfile.image}">
  `;
  } else {
    // no more profiles, reload page
    window.location.reload();
  }
}

// Create Profile Iterator

function profileIterator(profiles) {
  let nextIndex = 0;

  return {
    next: function() {
      return nextIndex < profiles.length
        ? { value: profiles[nextIndex++], done: false }
        : { done: true };
    }
  };
}
