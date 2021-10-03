// * Size of Square
let sizes = [];

// * By Test Result, above 512, the function starts to fail
for (let i = 1; i <= 9; i++) {
  sizes.push(Math.pow(2, i));
  if (i >= 2) {
    let j = i;
    let currsize = Math.pow(2, j);
    while (j > 1) {
      j--;
      currsize += Math.pow(2, j);
      sizes.push(currsize);
    }
  }
}

sizes = sizes.filter((s) => s <= 512);

console.log(sizes);

const fs = require("fs").promises;

async function generate(size, block = "barrier", maxheight = 255, suffix = "") {
  // * Convert to radius
  size /= 2;

  let filecontent = "";

  const bps = Math.floor(30000 / (maxheight + 1));

  const bp = [];

  let curr = -size;
  while (curr < size) {
    bp.push(curr);
    curr += bps;
  }
  bp.push(size);

  const commands = 4 * (bp.length - 1);

  if (commands > 10000) {
    console.log(
      `Skipped barrier${
        size * 2
      } because it has ${commands} commands which exceeds limits of 10000`
    );
    return;
  }

  for (let i = 0; i < bp.length - 1; i++) {
    filecontent += `fill ~${-size} 0 ~${bp[i]} ~${-size} ${maxheight} ~${
      bp[i + 1]
    } ${block}\n`;

    filecontent += `fill ~${size} 0 ~${bp[i]} ~${size} ${maxheight} ~${
      bp[i + 1]
    } ${block}\n`;

    filecontent += `fill ~${bp[i]} 0 ~${-size} ~${
      bp[i + 1]
    } ${maxheight} ~${-size} ${block}\n`;

    filecontent += `fill ~${bp[i]} 0 ~${size} ~${
      bp[i + 1]
    } ${maxheight} ~${size} ${block}\n`;
  }

  const filename = `./functions/${block}${suffix}${size * 2}.mcfunction`;

  console.log(`Writing ${filename} with ${commands} commands`);
  await fs.writeFile(filename, filecontent);
}

(async () => {
  for (const size of sizes) {
    await generate(size);
    await generate(size, "bedrock");
    await generate(size, "barrier", 127, "nether");
    await generate(size, "bedrock", 127, "nether");
  }
})();
