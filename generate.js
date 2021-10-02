const sizes = [64, 128, 256, 512];

const fs = require("fs").promises;

function generate(size) {
    let filecontent = "";

    const bps = Math.floor(30000 / size);

    const bp = [];

    let curr = -size;
    while (curr < size) {
        bp.push(curr);
        curr += bps;
    }
    bp.push(size);

    for (let i = 0; i < bp.length - 1; i++) {
        filecontent += `fill ~${-size} 0 ~${bp[i]} ~${-size} 255 ~${bp[i + 1]} barrier\n`;
        filecontent += `fill ~${size} 0 ~${bp[i]} ~${size} 255 ~${bp[i + 1]} barrier\n`;
        filecontent += `fill ~${bp[i]} 0 ~${-size} ~${bp[i + 1]} 255 ~${-size} barrier\n`;
        filecontent += `fill ~${bp[i]} 0 ~${size} ~${bp[i + 1]} 255 ~${size} barrier\n`;
    }

    fs.writeFile(`./functions/barrier${size}.mcfunction`, filecontent);
}

for (const size of sizes) {
    generate(size);
}
