# BGA Tournament Invitation
Invite a list of players to a BoardGameArena tournament in bulk.

## Demo
![GIF Demo](https://raw.githubusercontent.com/DavidEGx/bga-tournament-invitation/master/demo.gif?token=AAIB2POYM6LBERGEGLOABBK7ALHGU)

## Setup
Create a new bookmark in your browser that points to this "address":

    javascript:(function()%7B%2F**%0A%20*%20BGA%20Bulk%20Tournament%20invitation.%0A%20*%0A%20*%20Script%20to%20invite%20a%20list%20of%20players%20to%20a%20new%20tournament.%0A%20*%20%0A%20*%20Usage%3A%0A%20*%20%201.%20Copy%20and%20paste%20this%20code%20to%20the%20developer%20console%0A%20*%20%20%20%20%20(or%20put%20it%20as%20a%20bookmarklet%20https%3A%2F%2Fcaiorss.github.io%2Fbookmarklet-maker%2F)%0A%20*%20%202.%20Introduce%20a%20list%20of%20players%20separated%20by%20newlines%2C%20commas%20or%20spaces.%0A%20*%20%203.%20Click%20parse%20and%20check%20that%20the%20list%20was%20parsed%20correctly.%0A%20*%20%204.%20Click%20'Bulk%20Invite'.%0A%20*%2F%0A%0A(function()%20%7B%0A%20%20%20%20'use%20strict'%3B%0A%0Aconst%20TOURNAMENT_ID%20%3D%20%2F.*tournament%5C%3Fid%3D(%5Cd%2B)%2F.exec(window.location.href)%5B1%5D%3B%0Aconst%20REQUEST_INTERVAL%20%3D%201500%3B%0A%0A%2F**%20%0A%20TODO%3A%20Tampermonkey%20script%0A%20%20const%20normalInvite%20%3D%20document.getElementById('invite_to_groupe_toggle')%3B%0A%20%20if%20(normalInvite)%20%7B%0A%20%20%20%20const%20bulkInvite%20%3D%20document.createElement('a')%3B%0A%20%20%20%20bulkInvite.innerText%20%3D%20'Bulk%20Invite'%3B%0A%20%20%20%20bulkInvite.classList%20%3D%20'bgabutton%20bgabutton_gray'%3B%0A%20%20%20%20bulkInvite.onclick%20%3D%20function%20()%20%7B%20createUi()%20%7D%3B%0A%0A%20%20%20%20normalInvite.parentNode.insertBefore(bulkInvite%2C%20normalInvite.nextSibling)%3B%0A%20%20%7D%0A*%2F%0AcreateUi()%3B%0A%0A%2F**%0A%20*%20Adds%20text%20area%20so%20user%20can%20paste%20user's%20list%0A%20*%2F%0Afunction%20createUi()%20%7B%0A%20%20const%20ui%20%3D%20document.createElement('div')%3B%0A%20%20const%20textArea%20%3D%20document.createElement('textArea')%3B%0A%20%20const%20button%20%3D%20document.createElement('a')%3B%0A%0A%20%20ui.appendChild(textArea)%3B%0A%20%20ui.appendChild(button)%3B%0A%0A%20%20ui.style.position%20%3D%20'fixed'%3B%0A%20%20ui.style.left%20%3D%20'0'%3B%0A%20%20ui.style.top%20%3D%20'0'%3B%0A%20%20ui.style.margin%20%3D%20'1em%201em'%3B%0A%20%20ui.style.width%20%3D%20'600px'%3B%0A%20%20ui.style.height%20%3D%20'600px'%3B%0A%20%20ui.style.padding%20%3D%20'1.5em'%3B%0A%20%20ui.style.backgroundColor%20%3D%20'%23eeefef'%3B%0A%0A%20%20textArea.style.display%20%3D%20'block'%3B%0A%20%20textArea.style.width%20%20%3D%20'90%25'%3B%0A%20%20textArea.style.height%20%20%3D%20'90%25'%3B%0A%0A%20%20button.classList%20%3D%20'bgabutton%20bgabutton_blue'%3B%0A%20%20button.innerText%20%3D%20'Parse'%3B%0A%20%20button.onclick%20%20%20%3D%20function()%20%7B%0A%20%20%20%20const%20text%20%3D%20textArea.value%3B%0A%20%20%20%20const%20commaValues%20%3D%20text.split('%2C')%3B%0A%20%20%20%20const%20semicolonValues%20%3D%20text.split('%3B')%3B%0A%20%20%20%20const%20newlineValues%20%3D%20text.split(%22%5Cn%22)%3B%0A%20%20%20%20const%20spaceValues%20%3D%20text.split(%22%20%22)%3B%0A%20%20%20%20const%20usersFound%20%3D%20Math.max(commaValues.length%2C%20semicolonValues.length%2C%20newlineValues.length%2C%20spaceValues.length)%3B%0A%0A%20%20%20%20let%20values%3B%0A%20%20%20%20if%20(commaValues.length%20%3D%3D%3D%20usersFound)%20%7B%0A%20%20%20%20%20%20values%20%3D%20commaValues%3B%0A%20%20%20%20%7D%0A%20%20%20%20else%20if%20(semicolonValues.length%20%3D%3D%20usersFound)%20%7B%0A%20%20%20%20%20%20values%20%3D%20semicolonValues%3B%0A%20%20%20%20%7D%0A%20%20%20%20else%20if%20(newlineValues.length%20%3D%3D%20usersFound)%20%7B%0A%20%20%20%20%20%20values%20%3D%20newlineValues%3B%0A%20%20%20%20%7D%0A%20%20%20%20else%20if%20(spaceValues.length%20%3D%3D%20usersFound)%20%7B%0A%20%20%20%20%20%20values%20%3D%20spaceValues%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20textArea.style.display%20%3D%20'none'%3B%0A%20%20%20%20const%20list%20%3D%20document.createElement('ul')%3B%0A%20%20%20%20const%20userNamesLi%20%3D%20%5B%5D%3B%0A%20%20%20%20for%20(const%20val%20of%20values)%20%7B%0A%20%20%20%20%20%20const%20li%20%3D%20document.createElement('li')%3B%0A%20%20%20%20%20%20li.innerText%20%3D%20val.trim()%3B%0A%20%20%20%20%20%20list.appendChild(li)%3B%0A%20%20%20%20%20%20userNamesLi.push(li)%3B%0A%20%20%20%20%7D%0A%20%20%20%20ui.appendChild(list)%3B%0A%20%20%20%20list.style.height%20%3D%20'550px'%3B%0A%20%20%20%20list.style.overflow%20%3D%20'scroll'%3B%0A%20%20%20%20%0A%0A%20%20%20%20button.innerText%20%3D%20'Bulk%20Invite'%3B%0A%20%20%20%20button.onclick%20%3D%20async%20function()%20%7B%0A%20%20%20%20%20%20button.style.display%20%3D%20'none'%3B%0A%0A%20%20%20%20%20%20for%20(const%20unameLi%20of%20userNamesLi)%20%7B%0A%20%20%20%20%20%20%20%20try%20%7B%0A%20%20%20%20%20%20%20%20%20%20const%20playerId%20%3D%20getPlayerId(unameLi.innerText)%3B%0A%20%20%20%20%20%20%20%20%20%20invite(playerId)%3B%0A%20%20%20%20%20%20%20%20%20%20unameLi.style.color%20%3D%20'green'%3B%0A%20%20%20%20%20%20%20%20%20%20unameLi.innerText%20%2B%3D%20'%3A%20Done'%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20catch%20(error)%20%7B%0A%20%20%20%20%20%20%20%20%20%20if%20(error%20%3D%3D%3D%20'This%20player%20is%20already%20a%20member%20of%20this%20group'%20%7C%7C%20error%20%3D%3D%3D%20'This%20player%20has%20already%20been%20invited%20to%20join%20this%20group')%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20unameLi.style.color%20%3D%20'green'%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20unameLi.innerText%20%2B%3D%20'%3A%20Already%20invited'%3B%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20else%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20unameLi.style.color%20%3D%20'red'%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20unameLi.innerText%20%2B%3D%20%60%3A%20%24%7Berror%7D%60%3B%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20await%20new%20Promise(done%20%3D%3E%20setTimeout(()%20%3D%3E%20done()%2C%20REQUEST_INTERVAL))%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%3B%0A%20%20%7D%3B%0A%0A%20%20document.body.appendChild(ui)%3B%0A%7D%0A%0A%2F**%0A%20*%20Set%20invitation%20to%20tournament%20to%20player.%0A%20*%2F%0Afunction%20invite(playerId)%20%7B%0A%20%20const%20response%20%3D%20dojo.xhrGet(%7B%0A%20%20%20%20url%3A%20'https%3A%2F%2Fboardgamearena.com%2Ftournament%2Ftournament%2FinvitePlayer.html'%2C%0A%20%20%20%20sync%3A%20true%2C%0A%20%20%20%20content%3A%20%7B%20id%3A%20TOURNAMENT_ID%2C%20player%3A%20playerId%20%7D%2C%0A%20%20%20%20handleAs%3A%20'json'%0A%20%20%7D)%3B%0A%0A%20%20if%20(response.results%5B0%5D.status%20!%3D%201)%20%7B%0A%20%20%20%20throw%20response.results%5B0%5D.error%3B%0A%20%20%7D%0A%7D%0A%0A%2F**%0A%20*%20Returns%20a%20player%20id%20given%20its%20username.%0A%20*%0A%20*%2F%0Afunction%20getPlayerId(name)%20%7B%0A%20%20try%20%7B%0A%20%20%20%20const%20response%20%3D%20dojo.xhrGet(%7B%0A%20%20%20%20%20%20url%3A%20'https%3A%2F%2Fboardgamearena.com%2Fplayer%2Fplayer%2Ffindplayer.html'%2C%0A%20%20%20%20%20%20content%3A%20%7B%20q%3A%20name%2C%20start%3A%200%2C%20count%3A%20Infinity%20%7D%2C%0A%20%20%20%20%20%20sync%3A%20true%2C%0A%20%20%20%20%20%20handleAs%3A%20'json'%0A%20%20%20%20%7D)%3B%0A%0A%20%20%20%20for%20(const%20currentUser%20of%20response.results%5B0%5D.items)%20%7B%0A%20%20%20%20%20%20if%20(currentUser.q.toLowerCase()%20%3D%3D%3D%20name.toLowerCase())%20%7B%0A%20%20%20%20%20%20%20%20return%20currentUser.id%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20console.log(%60Couldn't%20find%20user%20%24%7Bname%7D%60)%3B%0A%20%20%20%20throw%20%22Player%20not%20found%22%3B%0A%20%20%7D%0A%20%20catch%20(error)%20%7B%0A%20%20%20%20console.log(%60Couldn't%20find%20user%20%24%7Bname%7D%60)%3B%0A%20%20%20%20throw%20error%3B%0A%20%20%7D%0A%7D%0A%0A%7D)()%3B%7D)()%3B

## Usage
1. Go to the tournament page.
2. Click on the bookmark you created during setup.
3. Paste a list of players separated by newlines or commas.
4. Click 'Parse' and check the list is ok.
5. Click 'Bulk Invite'
