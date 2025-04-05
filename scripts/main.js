import { http, HttpRequest, HttpRequestMethod, HttpHeader } from "@minecraft/server-net";
import { world, system } from "@minecraft/server";

// CHANGE THIS TO YOUR WEBHOOK URL:
const webhookUrl = "PASTE_LINK_HERE";

world.beforeEvents.chatSend.subscribe((event) => {
    event.cancel = false;
    const player = event.sender.name;

    let message = event.message;
    system.run(() => {
        sendDiscordMessage("> **" + player + "**: " + message);
    });
});

world.afterEvents.playerJoin.subscribe((event) => {
    const playerName = event.playerName;
    sendDiscordMessage("**" + playerName + "** joined the server.");
})

world.afterEvents.playerLeave.subscribe((event) => {
    const player = event.playerName;
    sendDiscordMessage("**" + player + "** left the server.");
})

world.afterEvents.entityDie.subscribe(({deadEntity: entity, damageSource: source}) => {
    if (entity?.typeId !== 'minecraft:player') return;
    const playerName = entity.name;
    
    let deathMessage;
    
    if (source.cause === "entityExplosion" && source.damagingEntity?.typeId === "minecraft:creeper") {
        deathMessage = `**${playerName}** was blown up by a creeper`;
    } else if (source.cause === "drowning") {
        deathMessage = `**${playerName}** drowned`;
    } else if (source.cause === "fall") {
        deathMessage = `**${playerName}** fell to their death`;
    } else if (source.cause === "firetick") {
        deathMessage = `**${playerName}** burned to death`;
    }
    else if (source.damagingEntity?.typeId) {
        const enemyType = source.damagingEntity.typeId.replace("minecraft:", "");
        deathMessage = `**${playerName}** was killed by a ${enemyType}`;
    } else {
        deathMessage = `**${playerName}** died from ${source.cause || "unknown causes"}`;
    }
    
    sendDiscordMessage(deathMessage);
});

function sendDiscordMessage(message) {
    const content = message;
    const request = new HttpRequest(webhookUrl);
    request.method = HttpRequestMethod.Post;
    request.headers = [new HttpHeader("Content-Type", "application/json")];
    request.body = JSON.stringify({ content });

    http.request(request).then((response) => {
        if (!response.status === 204) {
            console.error(`Failed to send message to Discord: ${response.status}`);
        }
    }).catch((error) => {
        console.error(`Error sending message to Discord: ${error}`);
    });
}

console.log("Discord webhook connected ✅");
