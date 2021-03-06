<#import '../includes/app.ftlh' as app />
<#import '../includes/controls.ftlh' as controls>

<#assign styles>
    <style>
        .card-img-overlay {
            background-color: rgba(0, 0, 0, .4);
        }

        .card-img {
            background-size: cover;
            height: 100%;
            object-fit: cover;
        }
    </style>
</#assign>

<@app.page page_styles=styles>
    <section class="jumbotron text-center">
        <h1>Admin panel</h1>
    </section>
    <section class="jumbotron bg-white text-center shadow">
        <h2>Users</h2>
        <div class="users-list card-deck d-flex justify-content-center mt-4">
            <#list users as user>
                <@controls.quote
                mt=0
                mb=5
                header=user.username
                body=user.email
                footer=user.getStatus()
                />
            <#else>
                <div>В сервисе пока нет пользователей</div>
            </#list>
        </div>
    </section>
    <section class="jumbotron bg-white text-center shadow">
        <h2>Labels</h2>
        <div class="labels-list mt-4">
            <#list labels as label>
                <span style="background-color: ${label.color}" class="p-2 rounded text-white ml-1">${label}</span>
            <#else>
                <span>В сервисе пока никто не настраивал свои метки</span>
            </#list>
        </div>
    </section>
    <section class="jumbotron bg-white shadow">
        <h2 class="text-center">Dashboards</h2>
        <div class="dashboard-list mt-4 card-deck">
            <#list boards as board>
                <div class="card bg-dark text-white">
                    <img src="${board.background}" class="card-img" alt="...">
                    <div class="card-img-overlay">
                        <h5 class="card-title">${board}</h5>
                        <p class="card-text">${board.description}</p>
                        <p class="card-text">${board.author}&nbsp;&lt;${board.author.email}&gt;</p>
                    </div>
                </div>
            <#else>
                <span>В сервисе пока нет ни одного dashboard'а</span>
            </#list>
        </div>
    </section>
    <section class="jumbotron bg-white shadow">
        <h2 class="text-center">Lists</h2>
        <div class="lists-list mt-4 card-deck">
            <#list lists as list>
                <div class="card">
                    <img src="${list.dashboard.background}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${list.dashboard}/${list}</h5>
                        <p class="card-text">${list.description}</p>
                        <p class="card-text"><small class="text-muted">${list.getAuthor()}
                                &nbsp;&lt;${list.getAuthor().email}&gt;</small></p>
                    </div>
                </div>
            <#else>
                <span>В сервисе пока нет ни одного list'а</span>
            </#list>
        </div>
    </section>
    <section class="jumbotron bg-white shadow d-flex align-items-center flex-column">
        <h2 class="text-center">Cards</h2>
        <div class="cards-list mt-4 card-deck">
            <#list cards as card>
                <div class="card bg-light mb-3" style="max-width: 18rem;">
                    <div class="card-header">${card.getDashboard()}/${card.list}</div>
                    <div class="card-body">
                        <h5 class="card-title">${card.name}</h5>
                        <p class="card-text">${card.getSummary()}</p>
                        <!--Labels-->
                        <#list card.getLabels() as cardLabel>
                            <span style="background-color: ${cardLabel.color}; font-size: 12px"
                                  class="p-1 rounded text-white ml-1">${cardLabel}</span>
                        </#list>
                        <!--Comments-->
                        <#list card.getComments() as cardComment>
                            <div class="card" style="font-size: 12px">
                                <div class="card-body p-2">
                                    <div>${cardComment}</div>
                                    <div class="blockquote-footer">${cardComment.author}, ${cardComment.createdAt}</div>
                                </div>
                            </div>
                        </#list>
                        <!--Rates-->
                        <#list card.getRates() as cardRate>
                            <div>☆ ${cardRate} <span class="text-muted">(${cardRate.author})</span></div>
                        </#list>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">${card.getAuthor()}&nbsp;&lt;${card.getAuthor().email}&gt;</small>
                    </div>
                </div>
            <#else>
                <span>В сервисе пока нет ни одной карточки</span>
            </#list>
        </div>
    </section>
</@app.page>