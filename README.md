# DiscordLink
DiscordLink is a Minecraft Bedrock behavior pack that integrates your Minecraft server with Discord.

# Features
Real-time forwarding of in-game chat messages to a Discord channel using webhooks.

# Installation
- Enable Beta-API's in your minecraft world in experimental settings
- In your server, navigate to config/default/permissions.json and the add server-net module, or copy and paste the following below into permissions.json:
  ```json
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
- Give it a name or icon (optinal) then copy the webhook url
- Add the behavior pack to your world, then go to the file in worlds/world-name/behavior_packs/DiscordLinker/Scripts/main.js
- Change const webhookUrl = "PASTE_HERE"; to your actual webhook url, for example:
```
const webhookUrl = "https://discord.com/api/webhooks/123456789/abcabcabcabc-abcabcabc";
```
- Start your server
