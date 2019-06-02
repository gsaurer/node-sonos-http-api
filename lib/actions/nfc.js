'use strict';

function getNFCMetadata(uri, serviceType) {
  return `<DIDL-Lite xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:upnp="urn:schemas-upnp-org:metadata-1-0/upnp/"
        xmlns:r="urn:schemas-rinconnetworks-com:metadata-1-0/" xmlns="urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/">
        <item id="00030020${uri}" restricted="true"><upnp:class>object.item.audioItem.musicTrack</upnp:class>
        <desc id="cdudn" nameSpace="urn:schemas-rinconnetworks-com:metadata-1-0/">SA_RINCON${serviceType}_X_#Svc${serviceType}-0-Token</desc></item></DIDL-Lite>`;
}

function nfc(player, values) {
  const action = values[0];

  if(action.startsWith('playlist:')){
        // /playlist/[ID]
        return this.playlist(player, [action.replace('playlist:', '')])
    }
    else if(action.startsWith('spotify:')){
        // /spotify/now/[ID]
        this.spotify(player, ['now', action])
    }
    else if(action.startsWith('applemusic:')){
        // /applemusic/now/[ID];
        return this.applemusic(player, ['now', action.replace('applemusic:', '')])
    }
    else if (action.startsWith("amazonmusic:")){
        // /amazonmusic/now/[ID]
        return this.amazonmusic(player, ['now', action.replace('amazonmusic:', '')])
    }
    else if (action.startsWith("tunein:")){
        // /tunein/play/[ID]
        return this.amazonmusic(player, ['play', action.replace('tunein:', '')])
    }
    else if(action.startsWith("musicsearch:")){
            //" /%s" % action.replace(":", "/");
            return this.amazonmusic(musicsearch, ['play', action.replace('musicsearch:', '')])
    }
    else {
        return this.playlist(player, action);
    }
}

module.exports = function (api) {
  api.registerAction('nfc', nfc);
}