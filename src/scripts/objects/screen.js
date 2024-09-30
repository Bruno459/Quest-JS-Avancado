const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML =
            `<div class= "info">
                <img src= "${user.avatarUrl}" alt= "foto de perfil">
                <div class= "data">
                    <h1>${user.name ?? 'Não possui nome cadastrado😢'}</h1>
                    <p>${user.bio ?? 'Não possui bio cadastrada😢'}</p>
                    <p>Seguidores: ${user.followers ?? 'Ninguém segue'}</p>
                    <p>Seguindo: ${user.following ?? 'Não segue ninguém'}</p>
                </div>
            </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li class = "">
                                                                    <a href= "${repo.html_url}" target = "_blank">${repo.name}
                                                                    </a>
                                                                    <div>
                                                                        <p>🍴 ${repo.forks ?? 0}</p>
                                                                        <p>⭐ ${repo.stars ?? 0}</p>
                                                                        <p>👀 ${repo.watchers ?? 0}</p>
                                                                        <p>🧑‍🏫 ${repo.language}</p>
                                                                    </div>
                                                                </li>`)

        let eventsItens = ''
        user.events.forEach(function appearEvents(event) {
            function eventType() {
                if (event.payload.description === null) {
                    return "Sem mensagem de commit"
                } else {
                    return event.payload.commits[0].message
                }
            }

            eventsItens += `<li><p>${event.repo.name}: ${eventType()}</p></li>`
        })

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class= "repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>
                                                    ${repositoriesItens}
                                                </ul>
                                            </div>`
        }

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class= "events section">
                                                <h2>Eventos</h2>
                                                <ul>
                                                    ${eventsItens}
                                                </ul>
                                            </div>`
        }
    },


    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuario não encontrado</h3>"
    }
}


export { screen }