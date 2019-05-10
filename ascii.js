const asciEngine = (() => {
  alphabet = {
    height: 6,
    0: ` ██████╗ 
██╔═████╗
██║██╔██║
████╔╝██║
╚██████╔╝
 ╚═════╝`,
    1: ` ██╗
███║
╚██║
 ██║
 ██║
  ╚═╝`,
    2: `██████╗ 
╚════██╗
 █████╔╝
██╔═══╝ 
███████╗
╚══════╝`,
    3: `██████╗ 
╚════██╗
 █████╔╝
 ╚═══██╗
██████╔╝
╚═════╝ `,
    4: `██╗  ██╗
██║  ██║
███████║
╚════██║
     ██║
     ╚═╝`,
    5: `███████╗
██╔════╝
███████╗
╚════██║
███████║
╚══════╝`,
    6: ` ██████╗ 
██╔════╝ 
███████╗ 
██╔═══██╗
╚██████╔╝
 ╚═════╝`,
    7: `███████╗
╚════██║
    ██╔╝
   ██╔╝ 
   ██║  
    ╚═╝`,
    8: ` █████╗ 
██╔══██╗
╚█████╔╝
██╔══██╗
╚█████╔╝
   ╚════╝`,
    9: ` █████╗ 
██╔══██╗
╚██████║
 ╚═══██║
 █████╔╝
  ╚════╝`,
    a: ` █████╗ 
██╔══██╗
███████║
██╔══██║
██║  ██║
╚═╝  ╚═╝`,
    b: `██████╗ 
██╔══██╗
██████╔╝
██╔══██╗
██████╔╝
╚═════╝ `,
    c: ` ██████╗
██╔════╝
██║     
██║     
╚██████╗
 ╚═════╝`,
    d: `██████╗ 
██╔══██╗
██║  ██║
██║  ██║
██████╔╝
╚═════╝`,
    e: `███████╗
██╔════╝
█████╗  
██╔══╝  
███████╗
╚══════╝`,
    f: `███████╗
██╔════╝
█████╗  
██╔══╝  
██║     
 ╚═╝    `,
    g: ` ██████╗ 
██╔════╝ 
██║  ███╗
██║   ██║
╚██████╔╝
 ╚═════╝ `,
    h: `██╗  ██╗
██║  ██║
███████║
██╔══██║
██║  ██║
 ╚═╝  ╚═╝`,
    i: `██╗
██║
██║
██║
██║
╚═╝`,
    j: `     ██╗
     ██║
     ██║
██   ██║
╚█████╔╝
 ╚════╝ `,
    k: `██╗  ██╗
██║ ██╔╝
█████╔╝ 
██╔═██╗ 
██║  ██╗
╚═╝  ╚═╝`,
    l: `██╗     
██║     
██║     
██║     
███████╗
╚══════╝
            `,
    m: `███╗   ███╗
████╗ ████║
██╔████╔██║
██║╚██╔╝██║
██║ ╚═╝ ██║
╚═╝     ╚═╝`,
    n: `███╗   ██╗
████╗  ██║
██╔██╗ ██║
██║╚██╗██║
██║ ╚████║
╚═╝  ╚═══╝`,
    o: ` ██████╗ 
██╔═══██╗
██║   ██║
██║   ██║
╚██████╔╝
 ╚═════╝ `,
    p: `██████╗ 
██╔══██╗
██████╔╝
██╔═══╝ 
██║     
╚═╝     `,
    q: ` ██████╗ 
██╔═══██╗
██║   ██║
██║▄▄ ██║
╚██████╔╝
 ╚══▀▀═╝ `,
    r: `██████╗ 
██╔══██╗
██████╔╝
██╔══██╗
██║  ██║
╚═╝  ╚═╝`,
    s: `███████╗
██╔════╝
███████╗
╚════██║
███████║
╚══════╝
            `,
    t: `████████╗
╚══██╔══╝
   ██║   
   ██║   
   ██║   
   ╚═╝   `,
    u: `██╗   ██╗
██║   ██║
██║   ██║
██║   ██║
╚██████╔╝
 ╚═════╝ `,
    v: `██╗   ██╗
██║   ██║
██║   ██║
╚██╗ ██╔╝
 ╚████╔╝ 
  ╚═══╝  `,
    w: `██╗    ██╗
██║    ██║
██║ █╗ ██║
██║███╗██║
╚███╔███╔╝
 ╚══╝╚══╝ `,
    x: ` ██╗  ██╗
 ╚██╗██╔╝
  ╚███╔╝ 
  ██╔██╗ 
 ██╔╝ ██╗
 ╚═╝  ╚═╝`,
    y: `██╗   ██╗
╚██╗ ██╔╝
 ╚████╔╝ 
  ╚██╔╝  
   ██║   
   ╚═╝   `,
    z: `███████╗
╚══███╔╝
  ███╔╝ 
 ███╔╝  
███████╗
╚══════╝`,
    _: `    
    
    
    
    
    `,
    "-": `          
          
    █████╗
    ╚════╝
          
          `
  };

  buildingText = text => {
    let res = ``;
    for (let i = 0; i < alphabet.height; i++) {
      line = "";
      for (let j = 0; j < text.length; j++) {
        const linepiece = alphabet[text[j]];
        let piece = "";
        if (linepiece) {
          piece = linepiece.split("\n")[i];
        }

        line += piece || "";
      }
      res += line + `\n`;
    }
    return res;
  };

  printText = (text, size) => {
    let result = buildingText(text);
    return `<pre style='font-size: ${size}px' >${result}</pre>`;
  };

  return {
    printText: printText
  };
})();