/**@author XLittleLeft#7638 @since 2022/08/19 */
module = script.registerModule("ApproachWarning",MISC);
module.addIntegerProperty("set_R","Range",5,1,8,1);

var timer = timer_util.getTimer();

module.onEvent("playerPreUpdateEvent",function(event){
    var entities = world.getEntityList();
    var i;
    for(i = 0;i < entities.length;i++){
        if(player.getDistanceToEntity(entities[i]) < module.getProperty("set_R").getInteger() && entity_util.getName(entities[i]) != player.getName()){
            if (timer.delay(1000) && entities[i] != null) {
            client.print("\u00A76XLittleLeft\u00A7f]" + "\u00A7cWarning" + "\u00A7a	 " +entities[i].getName() + " \u00A7cis coming!" + " " +
            "\u00A7bdistance: " + Math.abs(player.getX() - entities[i].posX).toFixed(2) + "\u00A7f");
            timer.reset();
        }
    }
    }
});