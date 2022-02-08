// Import BeforeChat Events
import { BadPackets2 } from "./penrose/beforechatevent/spammer/badpackets_2.js";
import { SpammerA } from "./penrose/beforechatevent/spammer/spammer_a.js";
import { SpammerB } from "./penrose/beforechatevent/spammer/spammer_b.js";
import { SpammerC } from "./penrose/beforechatevent/spammer/spammer_c.js";
import { SpammerD } from "./penrose/beforechatevent/spammer/spammer_d.js";
import { PrefixCommand } from "./penrose/beforechatevent/chat/prefixcommand.js";
import { ChatFilter } from "./penrose/beforechatevent/chat/chatfilter.js";
// Import Tick Events
import { GametestCheck } from "./penrose/tickevent/gametestloaded/gametestcheck.js";
import { GlobalBanList } from "./penrose/tickevent/ban/globalbanlist.js";
import { ServerBan } from "./penrose/tickevent/ban/serverban.js";
import { CrasherA } from "./penrose/tickevent/crasher/crasher_a.js";
import { NamespoofA } from "./penrose/tickevent/namespoof/namespoof_a.js";
import { NamespoofB } from "./penrose/tickevent/namespoof/namespoof_b.js";
import { PlayerPosition } from "./penrose/tickevent/coordinates/playerposition.js";
import { BedrockValidate } from "./penrose/tickevent/bedrock/bedrockvalidate.js";
import { ReachA } from "./penrose/tickevent/reach/reach_a.js";
import { JesusB } from "./penrose/tickevent/jesus/jesus_b.js";
import { NoSlowA } from "./penrose/tickevent/noslow/noslow_a.js";
import { IllegalItemsA } from "./penrose/tickevent/illegalitems/illegalitems_a.js";
import { InvalidSprintA } from "./penrose/tickevent/invalidsprint/invalidsprint_a.js";
import { FlyA } from "./penrose/tickevent/fly/fly_a.js";
import { AntiKnockbackA } from "./penrose/tickevent/knockback/antikb_a.js";
import config from "./data/config.js";

// BeforeChat Events
BadPackets2();
SpammerA();
SpammerB();
SpammerC();
SpammerD();
PrefixCommand();
ChatFilter();

// Tick Events
GametestCheck();
GlobalBanList();
ServerBan();
PlayerPosition();

if (config.modules.crasherA.enabled) {
    CrasherA();
}

if (config.modules.namespoofA.enabled) {
    NamespoofA();
}

if (config.modules.namespoofB.enabled) {
    NamespoofB();
}

if (config.modules.bedrockValidate.enabled) {
    BedrockValidate();
}

if (config.modules.reachA.enabled) {
    ReachA();
}

if (config.modules.jesusB.enabled) {
    JesusB();
}

if (config.modules.noslowA.enabled) {
    NoSlowA();
}

if (config.modules.illegalitemsA.enabled) {
    IllegalItemsA();
}

if (config.modules.invalidsprintA.enabled) {
    InvalidSprintA();
}

if (config.modules.flyA.enabled) {
    FlyA();
}

if(config.modules.antikbA.enabled) {
    AntiKnockbackA();
}
