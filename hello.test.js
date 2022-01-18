
function haiku(line) {

    function countThemSyllables(value) {
        const nonVowels = /[^aeiouy]+/;
        let words = (value || '').split(nonVowels).filter((value) => value !== '');

        return `${words.length}`
    }

    let lines = line.split('/');
    let values = [0,1,2].map((value) => countThemSyllables(lines[value]));

    return `${values.join(',')},N`;
}

test('Input contains 1 syllable - Is not a Haiku', () => {
    expect(haiku('won')).toBe('1,0,0,N');
});

test('Input contains 2 lines with won syllable - Is not a haiku', () => {
    expect(haiku('won/two')).toBe('1,1,0,N');
});

test('Input contains 3 lines with won syllable - Is not a haiku', () => {
    expect(haiku('won/two/three')).toBe('1,1,1,N');
});

test('2 syllables on line won - Is not a haiku', () => {
    expect(haiku('won won/two/three')).toBe('2,1,1,N');
});

test('Contiguous sequence of two syllables', () => {
    expect(haiku('booboo/two/three')).toBe('2,1,1,N');
});