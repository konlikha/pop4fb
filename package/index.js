const spawn = require('child_process').spawnSync;

function checkPassword(s) {
    if (s.stderr.toString().includes("Incorrect password") || s.stdout.toString().includes("Incorrect password")) return false;
    return true;
}

exports.PDFText = (file, password) => {
    console.time("Started ");
    let s1 = spawn("./bin/pdftotext", ["-opw", password, file, "-"]);
    let s2 = spawn("./bin/pdftotext", ["-upw", password, file, "-"]);
    let pageText = '';
    if (!checkPassword(s1)) {
        console.error("POP4FB Owner Wrong");
        if (!checkPassword(s2)) {
            console.error("POP4FB Both Wrong");
            pageText = new Error("Wrong Password");
        } else {
            pageText = s2.stdout.toString();
        }
    } else {
        pageText = s1.stdout.toString();
    };
    console.timeEnd("Started ");
    return pageText;
}