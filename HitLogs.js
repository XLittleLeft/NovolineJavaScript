/**@author XLittleLeft#7638 @since 2022/08/19 */
module = script.registerModule("HitLogs",MISC);

var timer = timer_util.getTimer();

module.onEvent("packetSendEvent",function(event){

    var rv2 = Math.floor(Math.random() * 99 + 1);

    var rv = Math.floor(Math.random() * 4 + 1);

    var bw = "";

    if (rv == 1) {
        bw = "Head";
    } else if (rv == 2) {
        bw = "Stomach";
    } else if (rv == 3) {
        bw = "Body";
    } else if (rv == 4) {
        bw = "Dick";
    } else if (rv == 0) {
        bw = "Leg";
    }

    if (event.getPacket().getName() == "0x02") {
        if (timer.delay(1000)) {
        client.print("\u00A76XLittleLeft]" + "\u00A74Hit: " + client.getAuraTarget().getName() + " " + "\u00A79	Position: " + bw + " " + "\u00A7dHitRate: " + rv2
        + " " + "\u00A7bHurtResistantTime: " + client.getAuraTarget().hurtResistantTime + " " +"\u00A7eX: " + client.getAuraTarget().posX.toFixed(2) + " " 
        + "\u00A7eY: " + client.getAuraTarget().posY.toFixed(2) + " " + "\u00A7eZ: " + client.getAuraTarget().posZ.toFixed(2) + "\u00A7f");
        timer.reset();
    }
}
});