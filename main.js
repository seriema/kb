const data = {
    tecniques: {
        "cross": "yellow",
        "jab": "yellow"
    },
    combos: {
        yellow: [
            "jab, cross",
            "jab, cross, jab, cross",
            "jab, cross, hook",
            "jab, cross, hook, cross",
            "low hook, high hook, cross",
            "jab, cross, roundhouse",
            "front kick, roundhouse",
            "jab, cross, knee",
            "jab, cross, knee, elbow",
            "jab, uppercut, knee"
        ],
        orange: [
            "jab, rear hand hook, leading hand uppercut",
            "leading hand hook, cross, leading hand hook",
            "jab, cross, change guard, cross",
            "leading hand uppercut, leading hand hook, cross",
            "rear hand uppercut, leading hand hook, cross",
            "jab, leading hand backfist, cross",
            "jab, cross, leading foot roundhouse",
            "jab, cross, leading hand hook, back foot roundhouse",
            "jab, cross, back foot roundhouse, leading knee",
            "jab, front kick, cross, leading hand hook",
            "jab, cross, sidekick",
            "jab, cross, knee",
            "jab, cross, axe kick",
            "jab, cross, roundhouse"
        ],
        green: [
            "jab, rear body hook, leading head hook",
            "jab, cross, leading body hook, leading head hook",
            "jab, leading body hook, rear overhand punch",
            "jab, leading uppercut, cross",
            "jab, rear body hook, rear uppercut",
            "jab, rear spinning back fist, lead spinning back fist",
            "jab, left skipping side kick, right spinning back kick, left back kick",
            // "reverse on right guard" // what?
        ]
    }
};

// CONFIG
const practiceTimeNode = document.querySelector("#practice-time");
const waitForUserNode = document.querySelector(".wait-for-user");

// TEXT
const textNode = document.querySelector("#current-combo");

// SPEECH
const synth = window.speechSynthesis;
const englishVoice = synth.getVoices().filter(voice => voice.lang === "en-US" && voice.localService)[0]; // The first English voice that runs locally is enough.

// MAIN LOGIC

// Update screen and speak
const coachUser = combo => {
    // Break up into paragraphs for better readability
    textNode.innerHTML = combo
        .split(", ")
        .map(technique => `<p>${technique}</p>`)
        .join("");

    // Speak with an English voice, otherwise defaults in other languages will make it incomprehensible.
    const utterance = new SpeechSynthesisUtterance(combo);
    utterance.voice = englishVoice;
    synth.speak(utterance);
}

// Grab a random sample of 'n' elements from an array
const sample = (array, n) => {
    const sample = [];
    for(let picked = 0; picked < n; picked++) {
        const randomCombo = array.splice(Math.floor(Math.random() * array.length), 1)[0];
        sample.push(randomCombo);
    }
    return sample;
}

// Create a random set of combos
const createRandomWorkout = (numberOfCombos) => {
    const allCombos = Object.keys(data.combos);
    const beltCombos = allCombos.map(beltKey => data.combos[beltKey]);
    const flattened = beltCombos.reduce((previous, current) => previous.concat(current), []);
    const distinct = flattened.filter((combo, i, arr) => arr.indexOf(combo) === i);
    const randomCombos = sample(distinct, numberOfCombos);
    const result = randomCombos;

    return result;
}

// Pick the combination to workout to
const pickCombo = (belt) => {
    if (belt === "random") {
        return createRandomWorkout(10);
    }

    return data.combos[belt];
}

// Loop the combo moves
const nextCombo = (current, combos, practiceTime) => {
    if (current >= combos.length) {
        coachUser("WELL DONE!");
    } else {
        if (current < 0) {
            coachUser("Get ready!");
            setTimeout(nextCombo.bind(null, current + 1, combos, practiceTime), 3000);
        } else {
            const currentCombo = combos[current];
            coachUser(currentCombo);
            setTimeout(nextCombo.bind(null, current + 1, combos, practiceTime), practiceTime);
        }
    }
}

function startTraining(belt) {
    const practiceTime = parseInt(practiceTimeNode.value, 10) * 1000;
    const combos = pickCombo(belt);
    nextCombo(-1, combos, practiceTime);
    waitForUserNode.style.display = "none";
}
