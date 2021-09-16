/**
 * BGA Bulk Tournament invitation.
 *
 * Script to invite a list of players to a new tournament.
 *
 * Usage:
 *  1. Copy and paste this code to the developer console
 *     (or put it as a bookmarklet https://caiorss.github.io/bookmarklet-maker/)
 *  2. Introduce a list of players separated by newlines, commas or spaces.
 *  3. Click parse and check that the list was parsed correctly.
 *  4. Click 'Bulk Invite'.
 */

(function() {
    'use strict';

let TOURNAMENT_ID;
let INVITE_URL;

if (/.*tournament\?id=(\d+)/.exec(window.location.href)) {
  TOURNAMENT_ID = /.*tournament\?id=(\d+)/.exec(window.location.href)[1];
  INVITE_URL    = 'https://boardgamearena.com/tournament/tournament/invitePlayer.html';
}
else {
  TOURNAMENT_ID = /.*group\?id=(\d+)/.exec(window.location.href)[1];
  INVITE_URL    = 'https://boardgamearena.com/community/community/inviteGroup.html'
}
const REQUEST_INTERVAL = 1500;

/**
 TODO: Tampermonkey script
  const normalInvite = document.getElementById('invite_to_groupe_toggle');
  if (normalInvite) {
    const bulkInvite = document.createElement('a');
    bulkInvite.innerText = 'Bulk Invite';
    bulkInvite.classList = 'bgabutton bgabutton_gray';
    bulkInvite.onclick = function () { createUi() };

    normalInvite.parentNode.insertBefore(bulkInvite, normalInvite.nextSibling);
  }
*/
createUi();

/**
 * Adds text area so user can paste user's list
 */
function createUi() {
  const ui = document.createElement('div');
  const textArea = document.createElement('textArea');
  const button = document.createElement('a');

  ui.appendChild(textArea);
  ui.appendChild(button);

  ui.style.position = 'fixed';
  ui.style.left = '0';
  ui.style.top = '0';
  ui.style.margin = '1em 1em';
  ui.style.width = '600px';
  ui.style.height = '600px';
  ui.style.padding = '1.5em';
  ui.style.backgroundColor = '#eeefef';

  textArea.style.display = 'block';
  textArea.style.width  = '90%';
  textArea.style.height  = '90%';

  button.classList = 'bgabutton bgabutton_blue';
  button.innerText = 'Parse';
  button.onclick   = function() {
    const text = textArea.value;
    const commaValues = text.split(',');
    const semicolonValues = text.split(';');
    const newlineValues = text.split("\n");
    const spaceValues = text.split(" ");
    const usersFound = Math.max(commaValues.length, semicolonValues.length, newlineValues.length, spaceValues.length);

    let values;
    if (commaValues.length === usersFound) {
      values = commaValues;
    }
    else if (semicolonValues.length == usersFound) {
      values = semicolonValues;
    }
    else if (newlineValues.length == usersFound) {
      values = newlineValues;
    }
    else if (spaceValues.length == usersFound) {
      values = spaceValues;
    }

    textArea.style.display = 'none';
    const list = document.createElement('ul');
    const userNamesLi = [];
    for (const val of values) {
      if (isNaN(val)) {
        const li = document.createElement('li');
        li.innerText = val.trim();
        list.appendChild(li);
        userNamesLi.push(li);
      }
    }
    ui.appendChild(list);
    list.style.height = '550px';
    list.style.overflow = 'scroll';

    button.innerText = 'Bulk Invite';
    button.onclick = async function() {
      button.style.display = 'none';

      const invitedPlayers = Array.from(document.querySelectorAll('.tournaments-registered-players__name')).map(e => e.text);

      for (const unameLi of userNamesLi) {
        try {
          const playerName = unameLi.innerText;
          if (invitedPlayers.includes(playerName)) {
            throw 'This player is already a member of this group';
          }

          const playerId = getPlayerId(playerName);
          invite(playerId);
          unameLi.style.color = 'green';
          unameLi.innerText += ': Done';
        }
        catch (error) {
          if (error === 'This player is already a member of this group' || error === 'This player has already been invited to join this group') {
            unameLi.style.color = 'green';
            unameLi.innerText += ': Already invited';
          }
          else {
            unameLi.style.color = 'red';
            unameLi.innerText += `: ${error}`;
          }
        }

        await new Promise(done => setTimeout(() => done(), REQUEST_INTERVAL));
      }
    };
  };

  document.body.appendChild(ui);
}

/**
 * Set invitation to tournament to player.
 */
function invite(playerId) {
  const response = dojo.xhrGet({
    url: INVITE_URL,
    sync: true,
    content: { id: TOURNAMENT_ID, player: playerId },
    handleAs: 'json'
  });

  if (response.results[0].status != 1) {
    throw response.results[0].error;
  }
}

/**
 * Returns a player id given its username.
 *
 */
function getPlayerId(name) {
  try {
    const response = dojo.xhrGet({
      url: 'https://boardgamearena.com/player/player/findplayer.html',
      content: { q: name, start: 0, count: Infinity },
      sync: true,
      handleAs: 'json'
    });

    for (const currentUser of response.results[0].items) {
      if (currentUser.q.toLowerCase() === name.toLowerCase()) {
        return currentUser.id;
      }
    }
    console.log(`Couldn't find user ${name}`);
    throw "Player not found";
  }
  catch (error) {
    console.log(`Couldn't find user ${name}`);
    throw error;
  }
}

})();
