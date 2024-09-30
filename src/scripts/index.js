import { getUser } from "./services/user.js";
import { getEvents } from "./services/events.js";
import { getRepositories } from "./services/repositories.js";

import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";

document.getElementById("btn-search").addEventListener("click" ,() => {
    let userName = document.getElementById("input-search").value
    if(validadeEmptyInput(userName)) return
    getUserData(userName)
})

document.getElementById("input-search").addEventListener("keyup" ,(e) => {
    let userName = e.target.value
    let key = e.which || e.keyCode
    let isEnterKeyPressed = key === 13 

    if (isEnterKeyPressed){
        if(validadeEmptyInput(userName)) return
        getUserData(userName)
    }
})

function validadeEmptyInput(userName) {
    if(userName.length === 0){
        alert("Preencha o campo com o nome do usuario do GitHub")
        return true
    }
}

async function getUserData(userName) {

    const userResponse = await getUser(userName)

    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)

    const eventsResponse = await getEvents(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)

    screen.renderUser(user)
}