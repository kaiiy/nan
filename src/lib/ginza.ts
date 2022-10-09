type Ent = {
    start: number,
    end: number,
    label: string
}

type Sent = {
    start: number,
    end: number
}

type Token = {
    id: number,
    start: number,
    end: number,
    tag: string,
    pos: string,
    morph: string,
    lemma: string,
    dep: string,
    head: number
}

type Parsed = {
    text: string,
    ents: Ent[],
    sents: Sent[],
    tokens: Token[]
}

export { Parsed as GinzaParsed }