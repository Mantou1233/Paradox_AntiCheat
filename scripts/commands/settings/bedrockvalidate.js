import { world } from "mojang-minecraft";
import config from "../../data/config.js";
import { crypto, disabler, getPrefix } from "../../util.js";

const World = world;

function bedrockValidateHelp(player, prefix, bedrockValidateBoolean) {
    let commandStatus;
    if (!config.customcommands.bedrockvalidate) {
        commandStatus = "§6[§4DISABLED§6]§r";
    } else {
        commandStatus = "§6[§aENABLED§6]§r";
    }
    let moduleStatus;
    if (bedrockValidateBoolean === false) {
        moduleStatus = "§6[§4DISABLED§6]§r";
    } else {
        moduleStatus = "§6[§aENABLED§6]§r";
    }
    return player.runCommand(`tellraw "${disabler(player.nameTag)}" {"rawtext":[{"text":"
§4[§6Command§4]§r: bedrockvalidate
§4[§6Status§4]§r: ${commandStatus}
§4[§6Module§4]§r: ${moduleStatus}
§4[§6Usage§4]§r: bedrockvalidate [optional]
§4[§6Optional§4]§r: help
§4[§6Description§4]§r: Toggles checks for bedrock validations.
§4[§6Examples§4]§r:
    ${prefix}bedrockvalidate
    ${prefix}bedrockvalidate help
"}]}`);
}

/**
 * @name bedrockvalidate
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided (optional).
 */
export function bedrockvalidate(message, args) {
    // validate that required params are defined
    if (!message) {
        return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? (./commands/settings/bedrockValidate.js:7)");
    }

    let player = message.sender;

    message.cancel = true;

    // Check for hash/salt and validate password
    let hash = player.getDynamicProperty('hash');
    let salt = player.getDynamicProperty('salt');
    let encode;
    try {
        encode = crypto(salt, config.modules.encryption.password);
    } catch (error) {}
    // make sure the user has permissions to run the command
    if (hash === undefined || encode !== hash) {
        return player.runCommand(`tellraw "${disabler(player.nameTag)}" {"rawtext":[{"text":"§r§4[§6Paradox§4]§r "},{"text":"You need to be Paradox-Opped to use this command."}]}`);
    }

    // Get Dynamic Property Boolean
    let bedrockValidateBoolean = World.getDynamicProperty('bedrockvalidate_b');
    if (bedrockValidateBoolean === undefined) {
        bedrockValidateBoolean = config.modules.bedrockValidate.enabled;
    }

    // Check for custom prefix
    let prefix = getPrefix(player);

    // Was help requested
    let argCheck = args[0];
    if (argCheck && args[0].toLowerCase() === "help" || !config.customcommands.bedrockvalidate) {
        return bedrockValidateHelp(player, prefix, bedrockValidateBoolean);
    }

    if (config.modules.bedrockValidate.enabled === false) {
        // Allow
        World.setDynamicProperty('bedrockvalidate_b', true);
        player.runCommand(`tellraw @a[tag=paradoxOpped] {"rawtext":[{"text":"\n§r§4[§6Paradox§4]§r "},{"selector":"@s"},{"text":" has enabled §6BedrockValidate§r!"}]}`);
    } else if (config.modules.bedrockValidate.enabled === true) {
        // Deny
        World.setDynamicProperty('bedrockvalidate_b', false);
        player.runCommand(`tellraw @a[tag=paradoxOpped] {"rawtext":[{"text":"\n§r§4[§6Paradox§4]§r "},{"selector":"@s"},{"text":" has disabled §4BedrockValidate§r!"}]}`);
    }
}
