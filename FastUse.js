/** @author XLittleLeft#7638 */
module = script.registerModule("FastUse",PLAYER);

module.onEvent("playerPreUpdateEvent",function(event){
    try {
        if (player.getHeldItemDisplayName() === "Apple" || player.getHeldItemDisplayName() === "Golden Apple" 
        || player.getHeldItemDisplayName() === "Bread" || player.getHeldItemDisplayName() === "Cooked Chicken" 
        && !player.getHeldItemDisplayName() === "Fishing Rod" && !player.getHeldItemDisplayName() === "Bow"
        || player.getHeldItemDisplayName() === "Carrot" || player.getHeldItemDisplayName() === "Cooked Salmon" 
        || player.getHeldItemDisplayName() === "Cooked Fish" || player.getHeldItemDisplayName() === "Cooked Porkchop" 
        || player.getHeldItemDisplayName() === "Cooked Rabbit" || player.getHeldItemDisplayName() === "Cooked Mutton" 
        || player.getHeldItemDisplayName() === "Steak") {
            for (var i = 0;i < 3; i++) {
                connection.sendPacket("0x03",false);
                connection.sendPacket("0x03",true);
            }
        }
    } catch (e) {
        //当空着手的时候会Null
}
});