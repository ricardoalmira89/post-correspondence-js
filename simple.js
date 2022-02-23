process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.split('\n');
    main();
});

const readLine = () => inputString[currentLine++]

function readCases(){

    let line = readLine();
    let i = 0;
    let data = [];

    while(line){

        line = readLine();

        if (line.match(/^\d+$/) || line == '')
            i++;
        else {

            data[i] = data[i] || [[],[]];
            data[i][0].push(line.split(' ')[0]);
            data[i][1].push(line.split(' ')[1]);
        }
    }

    return data;
}

const isPrefx = (a, b) => a.startsWith(b) || b.startsWith(a);

const find = (set, tree = [], results = []) => {

    let indexes = Object.keys(set[0]).map(e => parseInt(e));
    let b = set[0];
    let s = set[1];

    indexes.forEach(e => {

        if ( !tree.map(i => b[i]).includes(b[e]) || !tree.map(i => s[i]).includes(s[e]) ) {

            let bb = build(b, [...tree, e]);
            let ss = build(s, [...tree, e]);

            if (results.some(e => e.length < bb.length))
                return results;
    
            if (isPrefx(bb,ss)){
    
                const match = (bb == ss) ? bb : null;
    
                if (match && results.every(e => e.length >= match.length) )
                    results.push(match);
                
                return find(set, [...tree, e], results.sort((a, b) => a > b ? 1 : -1));
    
            }
    

        }

    });

    return results;
}

const build = (data, indexes) => indexes.map(e => data[e]).join('');

function main() {

    let data = readCases();
    
    let i = 1;
    data.forEach(set => {
        
        const results = find(set);
        const best = results[0] || 'IMPOSSIBLE';
        console.log(`Case ${i}: ${best}`);

        i++;
    })
    

}