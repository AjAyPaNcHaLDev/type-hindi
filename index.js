import hindiMap from "./map.hindi-map.json";
function typeHindi(event) {
  const keyPressed = event.key;
  let shiftPressed = event.shiftKey; 
  let ctrlPressed = event.ctrlKey;
  const isCapsLockOn = event.getModifierState("CapsLock");
  let output = " ";
  let skm=false;
  hindiMap.spacial_key_mapping.filter(k=>{
        if(k.key==keyPressed){
          skm=true
        }
      })

      // check if alt backspace pg up pg down end
      if(skm){ 
        return
      } 

      if(ctrlPressed){
        return
      }

    if(isCapsLockOn){
      shiftPressed=!shiftPressed;
    }
  hindiMap.key_mappings.filter((char) => {
    if (char.key == keyPressed && !shiftPressed) {
      event.preventDefault();
      output = char.output;
      event.target.value += output;
    } else if (char.key == keyPressed && shiftPressed) {
      event.preventDefault();
      output = char?.output_shift || char.output;
      event.target.value += output;
    }else{
      event.target.value 
    }
  });
}

export default typeHindi;
