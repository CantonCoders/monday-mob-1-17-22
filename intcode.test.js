
function runOpcode(coreMemory) {
    
    let programCounter = 0;
    do {
        let opCode = coreMemory[programCounter + 0]
        let leftIndex = coreMemory[programCounter + 1] 
        let rightIndex = coreMemory[programCounter + 2] 
        let resultIndex = coreMemory[programCounter + 3] 
    
        if (opCode == 99) return coreMemory;
    
        if (opCode == 1) {
            coreMemory[resultIndex] = coreMemory[leftIndex] + coreMemory[rightIndex];
        }
        else {
            coreMemory[resultIndex] = coreMemory[leftIndex] * coreMemory[rightIndex];
        }

        programCounter += 4;
    } while(programCounter <= coreMemory.size)
        
    return coreMemory;
}

test('99 becomes 99', () => {
    expect(runOpcode([99])).toEqual([99]);
})

test('1,0,0,0,99 becomes 2,0,0,0,99 (m[0] + m[0] = 2)', () => {
    let result = runOpcode([1,0,0,0,99]);
    expect(result).toEqual([2,0,0,0,99]);
});

test('1,1,0,0,99 becomes 2,1,0,0,99 (m[0] + m[1] = 2, 1 + 0 = 1)', () => {
    let result = runOpcode([1,1,0,0,99]);
    expect(result).toEqual([2,1,0,0,99]);
});

test('The third position indicates the position at which the output should be stored', () => {
    let result = runOpcode([1,0,0,2,99]);
    expect(result).toEqual([1,0,2,2,99]);
});

test('test', () => {
    let result = runOpcode([1,5,6,7,99,30,40,50]);
    expect(result).toEqual([1,5,6,7,99,30,40,70]);
});

xtest("Once you're done processing an opcode, move to the next one by stepping forward 4 positions.", () => {
    let result = runOpcode([1,9,10,3,2,3,11,0,99,30,40,50]);
    expect(result).toEqual([3500,9,10,70,2,3,11,0,99,30,40,50]);
});

test('2,0,0,0,99 becomes 4,0,0,0,99 (2 * 2 = 4)', () => {
    let result = runOpcode([2,0,0,0,99]);
    expect(result).toEqual([4,0,0,0,99]);
});

test('2,0,0,3,99 becomes 2,0,0,4,99', () => {
    let result = runOpcode([2,0,0,3,99]);
    expect(result).toEqual([2,0,0,4,99]);
});
