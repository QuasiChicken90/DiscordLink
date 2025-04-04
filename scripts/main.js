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
