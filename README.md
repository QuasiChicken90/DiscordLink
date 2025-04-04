# DiscordLink
DiscordLink is a Minecraft Bedrock behavior pack that integrates your Minecraft server with Discord.

# Features
Real-time forwarding of in-game chat messages to a Discord channel using webhooks.

# Installation
- Import the Minecraft bedrock world from your server and into your minecraft bedrock client, go the world settings and enable Beta-API's
- Add the behavior pack to your world, and import it back into your server
- In your server, navigate to config/default/permissions.json and the add server-net module, or copy and paste the following below into permissions.json:
```
  {
  "allowed_modules": [
    "@minecraft/server-gametest",
    "@minecraft/server",
    "@minecraft/server-ui",
    "@minecraft/server-admin",
    "@minecraft/server-editor",
    "@minecraft/server-net"
  ]
  }
```
- Go to Discord, navigate to your Discord server, then choose a channel you want chat messages to be in
- Once chosen, go to the channel settings > Intergrations > Webhooks and create a new webhook
- Give it a name or icon (optional) then copy the webhook url
- Then go to the file in worlds/world-name/behavior_packs/DiscordLinker/Scripts/main.js
- Change const webhookUrl = "PASTE_LINK_HERE"; to your actual webhook url, for example:

```
const webhookUrl = "https://discord.com/api/webhooks/123456789/abcabcabcabc-abcabcabc";
```
- Start your server
