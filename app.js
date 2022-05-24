const Pc1 = ["MyCard1", "p2c1", "p3c1", "p4c1", "p5c1", "p6c1", "p7c1", "p8c1"];
const Pc1A = ["MyCard1A", "p2c1A", "p3c1A", "p4c1A", "p5c1A", "p6c1A", "p7c1A", "p8c1A"];
const Pc1v = ["MC1v1","MC1v2","p2c1v1","p2c1v2","p3c1v1","p3c1v2","p4c1v1","p4c1v2","p5c1v1","p5c1v2","p6c1v1","p6c1v2","p7c1v1","p7c1v2","p8c1v1","p8c1v2"];
const Pc1s = ["MC1s1","MC1s2","p2c1s1","p2c1s2","p3c1s1","p3c1s2","p4c1s1","p4c1s2","p5c1s1","p5c1s2","p6c1s1","p6c1s2","p7c1s1","p7c1s2","p8c1s1","p8c1s2"];
const Pc2 = ["MyCard2", "p2c2", "p3c2", "p4c2", "p5c2", "p6c2", "p7c2", "p8c2"];
const Pc2A = ["MyCard2A", "p2c2A", "p3c2A", "p4c2A", "p5c2A", "p6c2A", "p7c2A", "p8c2A"];
const Pc2v = ["MC2v1","MC2v2","p2c2v1","p2c2v2","p3c2v1","p3c2v2","p4c2v1","p4c2v2","p5c2v1","p5c2v2","p6c2v1","p6c2v2","p7c2v1","p7c2v2","p8c2v1","p8c2v2"];
const Pc2s = ["MC2s1","MC2s2","p2c2s1","p2c2s2","p3c2s1","p3c2s2","p4c2s1","p4c2s2","p5c2s1","p5c2s2","p6c2s1","p6c2s2","p7c2s1","p7c2s2","p8c2s1","p8c2s2"];
const B_n = ["f1", "f2", "f3", "t", "r"];
const B_A = ["f1A", "f2A", "f3A", "tA", "rA"];
const B_v = ["f1v1", "f1v2", "f2v1", "f2v2", "f3v1", "f3v2", "tv1", "tv2", "rv1", "rv2"];
const B_s = ["f1s1", "f1s2", "f2s1", "f2s2", "f3s1", "f3s2", "ts1", "ts2", "rs1", "rs2"];
let numberOfClicks = 0;
class Card
{
    constructor(value, symbol, used)
    {
        this.value = value;
        this.symbol = symbol;
        this.used = used;
    }
    setUsedTrue()
    {
        this.used = 1;
    }
    setUsedFalse()
    {
        this.used = 0;
    }
    get u() { return this.used; }
    get v() { return this.value; }
    get s() { return this.symbol; }
}
class Deck
{
    constructor()
    {
        this.card = [];
        for(let i = 0; i < 52; i++)
        {
            let c = new Card(Math.floor(i / 4 + 2), i % 4 + 1, 0);
            this.card.push(c);
        }
    }
    ShuffleDeck()
    {
        for(let i = 0; i < 52; i++)
            this.card[i].setUsedFalse();
    }
    get c() { return this.card; }
}
class Board
{
    constructor(d)
    {
        this.deck = d;
        this.flop1 = new Card(0,0,0);
        this.flop2 = new Card(0,0,0);
        this.flop3 = new Card(0,0,0);
        this.turn = new Card(0,0,0);
        this.river = new Card(0,0,0);
        this.AssignFlop();
        this.AssignTurn();
        this.AssignRiver();
        this.bo = [this.f1, this.f2, this.f3, this.t1, this.r1];
    }
    AssignFlop()
    {
        let rand = Math.floor(Math.random() * 52);
        while(this.deck.c[rand].u === 1)
            rand = Math.floor(Math.random() * 52);
        this.flop1 = this.deck.c[rand];
        this.deck.c[rand].setUsedTrue();
        rand = Math.floor(Math.random() * 52);
        while(this.deck.c[rand].u === 1)
            rand = Math.floor(Math.random() * 52);
        this.flop2 = this.deck.c[rand];
        this.deck.c[rand].setUsedTrue();
        rand = Math.floor(Math.random() * 52);
        while(this.deck.c[rand].u === 1)
            rand = Math.floor(Math.random() * 52);
        this.flop3 = this.deck.c[rand];
        this.deck.c[rand].setUsedTrue();
    }
    AssignTurn()
    {
        let rand = Math.floor(Math.random() * 52);
        while(this.deck.c[rand].u === 1)
            rand = Math.floor(Math.random() * 52);
        this.turn = this.deck.c[rand];
        this.deck.c[rand].setUsedTrue();
    }
    AssignRiver()
    {
        let rand = Math.floor(Math.random() * 52);
        while(this.deck.c[rand].u === 1)
            rand = Math.floor(Math.random() * 52);
        this.river = this.deck.c[rand];
        this.deck.c[rand].setUsedTrue();
    }
    get f1() { return this.flop1; }
    get f2() { return this.flop2; }
    get f3() { return this.flop3; }
    get t1() { return this.turn; }
    get r1() { return this.river; }
    get b() { return this.bo; }
}
class Players
{
    constructor(d, i)
    {
        this.folded = false;
        this.index = i;
        this.deck = d;
        this.card1 = new Card(0,0,0);
        this.card2 = new Card(0,0,0);
    }
    AssignCards()
    {
        let rand = Math.floor(Math.random() * 52);
        while(this.deck.c[rand].u === 1)
            rand = Math.floor(Math.random() * 52);
        this.card1 = this.deck.c[rand];
        this.deck.c[rand].setUsedTrue();
        rand = Math.floor(Math.random() * 52);
        while(this.deck.c[rand].u === 1)
            rand = Math.floor(Math.random() * 52);
        this.card2 = this.deck.c[rand];
        this.deck.c[rand].setUsedTrue();
    }
    fold()
    {
        this.folded = true;
    }
    get c1() { return this.card1; }
    get c2() { return this.card2; }
    get ind() { return this.index; }
}
function ValueSort(x)
{
    let i, j, current, size = x.length;
    for(i = 1; i < size; i++)
    {
        current = x[i];
        j = i - 1;
        while (j > -1 && current.v < x[j].v)
        {
            x[j + 1] = x[j];
            j--;
        }
        x[j + 1] = current;
    }
}
function WorthSort(x, hand)
{
    let aux;
    if(x.pop() === 2)
    {
        for(let i = 0; i < 4; i++)
        {
            if(x[i].v === x[i + 1].v)
            {
                aux = x[i];
                x.splice(i,1);
                x.push(aux);
                aux = x[i];
                x.splice(i,1);
                x.push(aux);
                x.push(2);
                return;
            }
        }
        x.push(2);
        return;
    }
    if(x[5] === 3)
    {
        if(x[0].v === x[1].v)
        {
            if(x[2].v === x[3].v)
            {
                aux = x[4]; x[4] = x[2]; x[2] = aux;
                aux = x[2]; x[2] = x[0]; x[0] = aux;
                return;
            }
            aux = x[2]; x[2] = x[0]; x[0] = aux;
            return;
        }
        return;
    }
    if(x[5] === 4)
    {
        if(x[0].v === x[1].v)
        {
            aux = x[4]; x[4] = x[1]; x[1] = aux;
            aux = x[3]; x[3] = x[0]; x[0] = aux;
            return;
        }
        if(x[1].v === x[2].v)
            aux = x[4]; x[4] = x[1]; x[1] = aux;
        return;
    }
    if(x[5] === 7)
    {
        if(x[1].v === x[2].v)
        {
            aux = x[4]; x[4] = x[1]; x[1] = aux;
            aux = x[3]; x[3] = x[0]; x[0] = aux;
        }
        return;
    }
    if(x[5] === 8)
    {
        if(x[0].v === x[1].v)
            aux = x[4]; x[4] = x[0]; x[0] = aux;
        return;
    }
}
function GetHandBeforeFlop(player)
{
    if(player.c1.v === player.c2.v)
        return "One pair (" + document.getElementById(Pc1v[2 * player.ind]).innerHTML + ")";
    if(player.c1.v > player.c2.v)
        return "Highcard (" + document.getElementById(Pc1v[2 * player.ind]).innerHTML + ")";
    return "Highcard (" + document.getElementById(Pc2v[2 * player.ind]).innerHTML + ")";
}
function GetHandAfterFlop(player, board)
{
    let CardArray = [player.c1, player.c2, board.f1, board.f2, board.f3];
    ValueSort(CardArray);
    let c = 0, s = 0, d = 0, h = 0;
    for(let i = 0; i < 5; i++)
    {
        if(CardArray[i].s === 1)
            s++;
        if(CardArray[i].s === 2)
            c++;
        if(CardArray[i].s === 3)
            h++;
        if(CardArray[i].s === 4)
            d++;
    }
    if(s === 5 || c === 5 || h === 5 || d === 5)
    {
        if(CardArray[4].v === CardArray[0].v + 4)
        {
            if(CardArray[4].v === 14)
            {
                CardArray.push(10);
                return CardArray; // "Royal Flush";
            }
            CardArray.push(9);
            return CardArray; // "Straight Flush";
        }
        if(CardArray[4].v === 14 && CardArray[3].v === 5)
        {
            CardArray.push(9);
            return CardArray; // "Straight Flush";
        }
        CardArray.push(6);
        return CardArray; //  "Flush";
    }
    if(CardArray[0].v === CardArray[3].v || CardArray[1].v === CardArray[4].v)
    {
        CardArray.push(8);
        return CardArray; // "Four of a kind";
    }
    if(CardArray[0].v === CardArray[1].v && CardArray[3].v === CardArray[4].v)
    {
        if(CardArray[2].v === CardArray[3].v || CardArray[2].v === CardArray[1].v)
        {
            CardArray.push(7);
            return CardArray; // "Full House";
        }
        CardArray.push(3);
        return CardArray; // "Two Pair";
    }
    if(CardArray[0].v === CardArray[1].v && CardArray[2].v === CardArray[3].v)
    {
        CardArray.push(3);
        return CardArray; // "Two Pair";
    }
    if(CardArray[1].v === CardArray[2].v && CardArray[3].v === CardArray[4].v)
    {
        CardArray.push(3);
        return CardArray; // "Two Pair";
    }
    if(CardArray[0].v === CardArray[2].v || CardArray[1].v === CardArray[3].v || CardArray[2].v === CardArray[4].v)
    {
        CardArray.push(4);
        return CardArray; // "Three of a kind";
    }
    if(CardArray[0].v === CardArray[1].v || CardArray[1].v === CardArray[2].v || CardArray[2].v === CardArray[3].v || CardArray[3].v === CardArray[4].v)
    {
        CardArray.push(2);
        return CardArray; // "One Pair";
    }
    if(CardArray[4].v === CardArray[3].v + 1 && CardArray[3].v === CardArray[2].v + 1)
    {
        if(CardArray[2].v === CardArray[1].v + 1 && CardArray[1].v === CardArray[0].v + 1)
        {
            CardArray.push(5);
            return CardArray; // "Straight";
        }
    }
    if(CardArray[4].v === 14 && CardArray[3].v === 5 && CardArray[2].v === 4 && CardArray[1].v === 3 && CardArray[0].v === 2)
    {
        CardArray.push(5);
        return CardArray; // "Straight";
    }
    CardArray.push(1);
    return CardArray; // "Highcard";
}
function GetHandAfterTurn(player, board)
{
    let CardArray = [player.c1, player.c2, board.f1, board.f2, board.f3, board.t1];
    let frecv = [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let max = 1;
    ValueSort(CardArray);
    for(let i = 0; i < 6;  i++)
        frecv[CardArray[i].v]++;
    for(let i = 2; i < 15;  i++)
        if(frecv[i] > max)
            max = frecv[i];
    let c = 0, s = 0, d = 0, h = 0;
    for(let i = 0; i < 6; i++)
    {
        if(CardArray[i].s === 1)
            s++;
        if(CardArray[i].s === 2)
            c++;
        if(CardArray[i].s === 3)
            h++;
        if(CardArray[i].s === 4)
            d++;
    }
    if(s === 5 || c === 5 || h === 5 || d === 5)
    {
        for(let i = 0; i < 6; i++)
        {
            if(s === 5 && CardArray[i].s != 1) { CardArray.splice(i,1); break; }
            if(c === 5 && CardArray[i].s != 2) { CardArray.splice(i,1); break; }
            if(h === 5 && CardArray[i].s != 3) { CardArray.splice(i,1); break; }
            if(d === 5 && CardArray[i].s != 4) { CardArray.splice(i,1); break; }
        }
        if(CardArray[4].v === CardArray[0].v + 4)
        {
            if(CardArray[4].v === 14)
            {
                CardArray.push(10);
                return CardArray; // "Royal Flush"; // 10X JX QX KX AX
            }
            CardArray.push(9);
            return CardArray; // "Straight Flush"; // A1X A2X A3X A4X A5X
        }
        if(CardArray[4].v === 14 && CardArray[3].v === 5)
        {
            CardArray.push(9);
            return CardArray; // "Straight Flush"; // 2X 3X 4X 5X AX
        }
        CardArray.push(6);
        return CardArray; // "Flush"; // AX BX CX DX EX
    }
    if(s === 6 || c === 6 || h === 6 || d === 6)
    {
        if(CardArray[5].v === CardArray[1].v + 4)
        {
            if(CardArray[5].v === 14)
            {
                CardArray.splice(0,1); // * 10X JX QX KX AX
                CardArray.push(10);
                return CardArray; // "Royal Flush";
            }
            CardArray.splice(0,1); // * A1X A2X A3X A4X A5X
            CardArray.push(9);
            return CardArray; // "Straight Flush";
        }
        if(CardArray[4].v === CardArray[0].v + 4)
        {
            CardArray.splice(5,1); // A1X A2X A3X A4X A5X *
            CardArray.push(9);
            return CardArray; // "Straight Flush";
        }
        if(CardArray[5].v === 14 && CardArray[3].v === 5)
        {
            CardArray.splice(4,1); // 2X 3X 4X 5X * AX
            CardArray.push(9);
            return CardArray; // "Straight Flush";
        }
        CardArray.splice(0,1); // * AX BX CX DX EX
        CardArray.push(6);
        return CardArray; // "Flush";
    }
    if(max === 4)
    {
        if(CardArray[0].v === CardArray[3].v) // A A A A B C
        {
            CardArray.splice(4,1); // A A A A * B
            CardArray.push(8);
            return CardArray; // "Four of a kind";
        }
        if(CardArray[1].v === CardArray[4].v || CardArray[2].v === CardArray[5].v) // A B B B B C   &&   A B C C C C
        {
            CardArray.splice(0,1); // * A A A A B   &&   * A B B B B
            CardArray.push(8);
            return CardArray; // "Four of a kind";
        }
    }
    if(max === 3)
    {
        if(CardArray[0].v === CardArray[2].v) // A A A B C D
        {
            if(CardArray[3].v === CardArray[5].v) // A A A B B B
            {
                CardArray.splice(0,1); // * A A B B B
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            if(CardArray[3].v === CardArray[4].v) // A A A B B C
            {
                CardArray.splice(5,1); // A A A B B *
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            if(CardArray[4].v === CardArray[5].v) // A A A B C C
            {
                CardArray.splice(3,1); // A A A * B B
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            CardArray.splice(3,1); // A A A * B C
            CardArray.push(4);
            return CardArray; // "Three of a kind";
        }
        if(CardArray[1].v === CardArray[3].v) // A B B B C D
        {
            if(CardArray[4].v === CardArray[5].v) // A B B B C C
            {
                CardArray.splice(0,1); // * A A A B B
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            CardArray.splice(0,1); // * A A A B C
            CardArray.push(4);
            return CardArray; // "Three of a kind";
        }
        if(CardArray[2].v === CardArray[4].v) // A B C C C D
        {
            if(CardArray[0].v === CardArray[1].v) // A A B B B C
            {
                CardArray.splice(5,1); // A A B B B *
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            CardArray.splice(0,1); // * A B B B C
            CardArray.push(4);
            return CardArray; // "Three of a kind";
        }
        if(CardArray[3].v === CardArray[5].v) // A B C D D D
        {
            if(CardArray[0].v === CardArray[1].v) // A A B C C C
            {
                CardArray.splice(2,1); // A A * B B B
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            if(CardArray[1].v === CardArray[2].v) // A B B C C C
            {
                CardArray.splice(0,1); // * A A B B B
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            CardArray.splice(0,1); // * A B C C C
            CardArray.push(4);
            return CardArray; // "Three of a kind";
        }
    }
    if(max === 2)
    {
        if(CardArray[0].v === CardArray[1].v) // A A B C D E
        {
            if(CardArray[2].v === CardArray[3].v && CardArray[4].v === CardArray[5].v) // A A B B C C
            {
                CardArray.splice(0,1); // * A B B C C
                CardArray.push(3);
                return CardArray; // "Two Pair";
            }
            if(CardArray[2].v === CardArray[3].v)
            {
                CardArray.splice(4,1); // A A B B * C
                CardArray.push(3);
                return CardArray; // "Two Pair";
            }
            if(CardArray[3].v === CardArray[4].v || CardArray[4].v === CardArray[5].v)
            {
                CardArray.splice(2,1); // A A * B B C && A A * B C C
                CardArray.push(3);
                return CardArray; // "Two Pair";
            }
            if(CardArray[5].v - CardArray[0].v === 4) // A1 A1 A2 A3 A4 A5
            {
                CardArray.splice(0,1); // * A1 A2 A3 A4 A5
                CardArray.push(5);
                return CardArray; // "Straight";
            }
            if(CardArray[5].v === 14 && CardArray[4].v === 5) // 2 2 3 4 5 A
            {
                CardArray.splice(0,1); // * 2 3 4 5 A
                CardArray.push(5);
                return CardArray; // "Straight";
            }
            CardArray.splice(2,1); // A A * B C D
            CardArray.push(2);
            return CardArray; // "One Pair";
        }
        if(CardArray[1].v === CardArray[2].v) // A B B C D E
        {
            if(CardArray[3].v === CardArray[4].v) // A B B C C D
            {
                CardArray.splice(0,1); // * A A B B C
                CardArray.push(3);
                return CardArray; // "Two Pair";
            }
            if(CardArray[4].v === CardArray[5].v) // A B B C D D
            {
                CardArray.splice(0,1); // * A A B C C
                CardArray.push(3);
                return CardArray; // "Two Pair";
            }
            if(CardArray[5].v - CardArray[0].v === 4) // A1 A2 A2 A3 A4 A5
            {
                CardArray.splice(1,1); // A1 * A2 A3 A4 A5
                CardArray.push(5);
                return CardArray; // "Straight";
            }
            if(CardArray[5].v === 14 && CardArray[4].v === 5) // 2 3 3 4 5 A
            {
                CardArray.splice(1,1); // 2 * 3 4 5 A
                CardArray.push(5);
                return CardArray; // "Straight";
            }
            CardArray.splice(0,1); // * A A B C D
            CardArray.push(2);
            return CardArray; // "One Pair";
        }
        if(CardArray[2].v === CardArray[3].v) // A B C C D E
        {
            if(CardArray[4].v === CardArray[5].v) // A B C C D D
            {
                CardArray.splice(0,1); // * A B B C C
                CardArray.push(3);
                return CardArray; // "Two Pair";
            }
            if(CardArray[5].v - CardArray[0].v === 4) // A1 A2 A3 A3 A4 A5
            {
                CardArray.splice(2,1); // A1 A2 * A3 A4 A5
                CardArray.push(5);
                return CardArray; // "Straight";
            }
            if(CardArray[5].v === 14 && CardArray[4].v === 5)  // 2 3 4 4 5 A
            {
                CardArray.splice(2,1); // 2 3 * 4 5 A
                CardArray.push(5);
                return CardArray; // "Straight";
            }
            CardArray.splice(0,1); // * A B B C D
            CardArray.push(2);
            return CardArray; // "One Pair";
        }
        if(CardArray[3].v === CardArray[4].v || CardArray[4].v === CardArray[5].v) // A B C D D E   &&   A B C D E E
        {
            if(CardArray[5].v - CardArray[0].v === 4) // A1 A2 A3 A4 A4 A5   &&   A1 A2 A3 A4 A5 A5
            {
                CardArray.splice(4,1); // A1 A2 A3 A4 * A5
                CardArray.push(5);
                return CardArray; // "Straight";
            }
            if(CardArray[5].v === 14 && CardArray[3].v === 5) // 2 3 4 5 5 A   &&   2 3 4 5 A A
            {
                CardArray.splice(4,1); // 2 3 4 5 * A
                CardArray.push(5);
                return CardArray; // "Straight";
            }
            CardArray.splice(0,1); // * A B C C D   &&   * A B C D D
            CardArray.push(2);
            return CardArray; // "One Pair";
        }
    }
    if(CardArray[5].v - CardArray[1].v === 4)  // Y A1 A2 A3 A4 A5
    {
        CardArray.splice(0,1); // * A1 A2 A3 A4 A5
        CardArray.push(5);
        return CardArray; // "Straight";
    }
    if(CardArray[4].v - CardArray[0].v === 4)  // A1 A2 A3 A4 A5 Y
    {
        CardArray.splice(5,1); // A1 A2 A3 A4 A5 *
        CardArray.push(5);
        return CardArray; // "Straight";
    }
    if(CardArray[5].v === 14 && CardArray[3].v === 5) // 2 3 4 5 Y A
    {
        CardArray.splice(4,1); // 2 3 4 5 * A
        CardArray.push(5);
        return CardArray; // "Straight";
    }
    CardArray.splice(0,1); // * A B C D E
    CardArray.push(1);
    return CardArray; // "Highcard";
}
function GetHandAfterRiver(player, board)
{
    let CardArray = [player.c1, player.c2, board.f1, board.f2, board.f3, board.t1, board.r1];
    let frecv = [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let max = 1, str = 0;
    ValueSort(CardArray);
    for(let i = 0; i < 7;  i++)
        frecv[CardArray[i].v]++;
    for(let i = 2; i < 15;  i++)
        if(frecv[i] > max)
            max = frecv[i];
    if(frecv[2] > 0 && frecv[3] > 0 && frecv[4] > 0 && frecv[5] > 0 && frecv[14] > 0)
        str = 2;
    for(let i = 2; i < 15;  i++)
    {
        if(frecv[i] > 0 && frecv[i + 1] > 0 && frecv[i + 2] > 0 && frecv[i + 3] > 0 && frecv[i + 4] > 0)
        {
            str = 1;
            break;
        }
    }
    let c = 0, s = 0, d = 0, h = 0;
    for(let i = 0; i < 7; i++)
    {
        if(CardArray[i].s === 1)
            s++;
        if(CardArray[i].s === 2)
            c++;
        if(CardArray[i].s === 3)
            h++;
        if(CardArray[i].s === 4)
            d++;
    }
    if(s === 5 || c === 5 || h === 5 || d === 5)
    {
        for(let i = 0; i < 7; i++)
        {
            if(s === 5 && CardArray[i].s != 1) { CardArray.splice(i,1); break; }
            if(c === 5 && CardArray[i].s != 2) { CardArray.splice(i,1); break; }
            if(h === 5 && CardArray[i].s != 3) { CardArray.splice(i,1); break; }
            if(d === 5 && CardArray[i].s != 4) { CardArray.splice(i,1); break; }
        }
        for(let i = 0; i < 6; i++)
        {
            if(s === 5 && CardArray[i].s != 1) { CardArray.splice(i,1); break; }
            if(c === 5 && CardArray[i].s != 2) { CardArray.splice(i,1); break; }
            if(h === 5 && CardArray[i].s != 3) { CardArray.splice(i,1); break; }
            if(d === 5 && CardArray[i].s != 4) { CardArray.splice(i,1); break; }
        }
        if(CardArray[4].v === CardArray[0].v + 4)
        {
            if(CardArray[4].v === 14)
            {
                CardArray.push(10);
                return CardArray; // "Royal Flush";
            }
            CardArray.push(9);
            return CardArray; // "Straight Flush";
        }
        if(CardArray[4].v === 14 && CardArray[3].v === 5)
        {
            CardArray.push(9);
            return CardArray; // "Straight Flush";
        }
        CardArray.push(6);
        return CardArray; // "Flush";
    }
    if(s === 6 || c === 6 || h === 6 || d === 6)
    {
        for(let i = 0; i < 7; i++)
        {
            if(s === 6 && CardArray[i].s != 1) { CardArray.splice(i,1); break; }
            if(c === 6 && CardArray[i].s != 2) { CardArray.splice(i,1); break; }
            if(h === 6 && CardArray[i].s != 3) { CardArray.splice(i,1); break; }
            if(d === 6 && CardArray[i].s != 4) { CardArray.splice(i,1); break; }
        }
        if(CardArray[5].v === CardArray[1].v + 4)
        {
            if(CardArray[5].v === 14)
            {
                CardArray.splice(0,1);
                CardArray.push(10);
                return CardArray; // "Royal Flush";
            }
            CardArray.splice(0,1);
            CardArray.push(9);
            return CardArray; // "Straight Flush";
        }
        if(CardArray[4].v === CardArray[0].v + 4)
        {
            CardArray.splice(5,1);
            CardArray.push(9);
            return CardArray; // "Straight Flush";
        }
        if(CardArray[5].v === 14 && CardArray[3].v === 5)
        {
            CardArray.splice(4,1);
            CardArray.push(9);
            return CardArray; // "Straight Flush";
        }
        CardArray.splice(0,1);
        CardArray.push(6);
        return CardArray; // "Flush";
    }
    if(s === 7 || c === 7 || h === 7 || d === 7)
    {
        if(CardArray[6].v === CardArray[2].v + 4)
        {
            if(CardArray[6].v === 14)
            {
                CardArray.splice(0,2);
                CardArray.push(10);
                return CardArray; // "Royal Flush";
            }
            CardArray.splice(0,2);
            CardArray.push(9);
            return CardArray; // "Straight Flush";
        }
        if(CardArray[5].v === CardArray[1].v + 4)
        {
            CardArray.splice(6,1);
            CardArray.splice(0,1);
            CardArray.push(9);
            return CardArray; // "Straight Flush";
        }
        if(CardArray[4].v === CardArray[0].v + 4)
        {
            CardArray.splice(5,2);
            CardArray.push(9);
            return CardArray; // "Straight Flush";
        }
        if(CardArray[6].v === 14 && CardArray[3].v == 5)
        {
            CardArray.splice(4,2);
            CardArray.push(9);
            return CardArray; // "Straight Flush";
        }
        CardArray.splice(0,2);
        CardArray.push(6);
        return CardArray; // "Flush";
    }
    if(max === 4) // Four of a kind
    {
        if(CardArray[0].v === CardArray[3].v) // A A A A B C D
        {
            CardArray.splice(4,2); // A A A A * * B
            CardArray.push(8);
            return CardArray; // "Four of a kind";
        }
        if(CardArray[1].v === CardArray[4].v) // A B B B B C D
        {
            CardArray.splice(5,1); // A B B B B * D
            CardArray.splice(0,1); // * B B B B * D
            CardArray.push(8);
            return CardArray; // "Four of a kind";
        }
        if(CardArray[2].v === CardArray[5].v || CardArray[3] === CardArray[6]) // A B C C C C D   &&   A B C D D D D
        {
            CardArray.splice(0,2); // * * A B B B B
            CardArray.push(8);
            return CardArray; // "Four of a kind";
        }
    }
    if(max === 3) // Full House / Straight / Three of a kind
    {
        if(CardArray[0].v === CardArray[2].v) // A A A B C D E
        {
            if(CardArray[3].v === CardArray[5].v) // A A A B B B C
            {
                CardArray.splice(6,1); // A A A B B B *
                CardArray.splice(0,1); // * A A B B B *
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            if(CardArray[4].v === CardArray[6].v) // A A A B C C C
            {
                CardArray.splice(2,2); // A A * * B B B
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            if(CardArray[5].v === CardArray[6].v) // A A A B C D D
            {
                CardArray.splice(3,2); // A A A * * B B
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            if(CardArray[4].v === CardArray[5].v) // A A A B C C D
            {
                CardArray.splice(6,1); // A A A B C C *
                CardArray.splice(3,1); // A A A * B B *
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            if(CardArray[3].v === CardArray[4].v) // A A A B B C D
            {
                CardArray.splice(5,2); // A A A B B * *
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            if(str > 0) // A1 A1 A1 A2 A3 A4 A5   &&   2 2 2 3 4 5 A
            {
                CardArray.splice(0,2); // * * A1 A2 A3 A4 A5   &&   * * 2 3 4 5 A
                CardArray.push(5);
                return CardArray; // "Straight";
            }
            CardArray.splice(3,2); // A A A * * B C
            CardArray.push(4);
            return CardArray; // "Three of a kind";
        }
        if(CardArray[1].v === CardArray[3].v) // A B B B C D E
        {
            if(CardArray[4].v === CardArray[6].v) // A B B B C C C
            {
                CardArray.splice(0,2); // * * B B C C C
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            if(CardArray[4].v === CardArray[5].v) // A B B B C C D
            {
                CardArray.splice(6,1); // A B B B C C *
                CardArray.splice(0,1); // * A A A B B *
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            if(CardArray[5].v === CardArray[6].v) // A B B B C D D
            {
                CardArray.splice(4,1); // A B B B * C C
                CardArray.splice(0,1); // * A A A * B B
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            if(str > 0) // A1 A2 A2 A2 A3 A4 A5   &&   2 3 3 3 4 5 A
            {
                CardArray.splice(1,2); // A1 * * A2 A3 A4 A5   &&   2 * * 3 4 5 A
                CardArray.push(5);
                return CardArray; // "Straight";
            }
            CardArray.splice(4,1); // A B B B * C D
            CardArray.splice(0,1); // * A A A * B C
            CardArray.push(4);
            return CardArray; // "Three of a kind";
        }
        if(CardArray[2].v === CardArray[4].v) // A B C C C D E
        {
            if(CardArray[5].v === CardArray[6].v) // A B C C C D D
            {
                CardArray.splice(0,2); // * * A A A B B
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            if(CardArray[0].v === CardArray[1].v) // A A B B B C D
            {
                CardArray.splice(5,2); // A A B B B * *
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            if(str > 0) // A1 A2 A3 A3 A3 A4 A5   &&   2 3 4 4 4 5 A
            {
                CardArray.splice(2,2); // A1 A2 * * A3 A4 A5   &&   2 3 * * 4 5 A
                CardArray.push(5);
                return CardArray; // "Straight";
            }
            CardArray.splice(0,2); // * * A A A B C
            CardArray.push(4);
            return CardArray; // "Three of a kind";
        }
        if(CardArray[3].v === CardArray[5].v) // A B C D D D E
        {
            if(CardArray[0].v === CardArray[1].v) // A A B C C C D
            {
                CardArray.splice(6,1); // A A B C C C *
                CardArray.splice(2,1); // A A * B B B *
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            if(CardArray[1].v === CardArray[2].v) // A B B C C C D
            {
                CardArray.splice(6,1); // A B B C C C *
                CardArray.splice(0,1); // * A A B B B *
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            if(str > 0)  // A1 A2 A3 A4 A4 A4 A5   &&   2 3 4 5 5 5 A
            {
                CardArray.splice(3,2); // A1 A2 A3 * * A4 A5   &&   2 3 4 * * 5 A
                CardArray.push(5);
                return CardArray; // "Straight";
            }
            CardArray.splice(0,2); // * * A B B B C
            CardArray.push(4);
            return CardArray; // "Three of a kind";
        }
        if(CardArray[4].v === CardArray[6].v) // A B C D E E E
        {
            if(CardArray[2].v === CardArray[3].v) // A B C C D D D
            {
                CardArray.splice(0,2); // * * A A B B B
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            if(CardArray[1].v === CardArray[2].v) // A B B C D D D
            {
                CardArray.splice(3,1); // A B B * C C C
                CardArray.splice(0,1); // * A A * B B B
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            if(CardArray[0].v === CardArray[1].v) // A A B C D D D
            {
                CardArray.splice(2,2); // A A * * B B B
                CardArray.push(7);
                return CardArray; // "Full House";
            }
            if(str > 0)  // A1 A2 A3 A4 A5 A5 A5   &&   2 3 4 5 A A A
            {
                CardArray.splice(4,2); // A1 A2 A3 A4 * * A5   &&   2 3 4 5 * * A
                CardArray.push(5);
                return CardArray; // "Straight";
            }
            CardArray.splice(0,2); // * * A B C C C
            CardArray.push(4);
            return CardArray; // "Three of a kind";
        }
    }
    if(str === 1)
    {
        if(CardArray[6].v === CardArray[0].v + 4)
        {
            for(let i = 6; i > 0; i--)
                if(CardArray[i].v === CardArray[i - 1].v)
                    CardArray.splice(i,1);
            CardArray.push(5);
            return CardArray; // "Straight";
        }
        if(CardArray[6].v === CardArray[1].v + 4)
        {
            for(let i = 6; i > 0; i--)
                if(CardArray[i].v === CardArray[i - 1].v)
                    CardArray.splice(i,1);
            CardArray.splice(0,1);
            CardArray.push(5);
            return CardArray; // "Straight";
        }
        if(CardArray[6].v === CardArray[2].v + 4)
        {
            CardArray.splice(0,2);
            CardArray.push(5);
            return CardArray; // "Straight";
        }
        if(CardArray[5].v === CardArray[0].v + 4)
        {
            CardArray.splice(6,1);
            for(let i = 5; i > 0; i--)
                if(CardArray[i].v === CardArray[i - 1].v)
                    CardArray.splice(i,1);
            CardArray.push(5);
            return CardArray; // "Straight";
        }
        if(CardArray[5].v === CardArray[1].v + 4)
        {
            CardArray.splice(6,1);
            CardArray.splice(0,1);
            CardArray.push(5);
            return CardArray; // "Straight";
        }
        if(CardArray[4].v === CardArray[0].v + 4)
        {
            CardArray.splice(5,2);
            CardArray.push(5);
            return CardArray; // "Straight";
        }
    }
    if(str === 2)
    {
        if(CardArray[3].v === 5)
        {
            CardArray.splice(4,2);
            CardArray.push(5);
            return CardArray; // "Straight";
        }
        if(CardArray[4].v === 5)
        {
            CardArray.splice(5,1);
            for(let i = 4; i > 0; i--)
                if(CardArray[i].v === CardArray[i - 1].v)
                    CardArray.splice(i,1);
            CardArray.push(5);
            return CardArray; // "Straight";
        }
        if(CardArray[5].v === 5)
        {
            for(let i = 5; i > 0; i--)
                if(CardArray[i].v === CardArray[i - 1].v)
                    CardArray.splice(i,1);
            CardArray.push(5);
            return CardArray; // "Straight";
        }
    }
    if(max === 2)
    {
        let nrOfPairs = 0;
        for(let i = 2; i < 15; i++)
            if(frecv[i] === 2)
                nrOfPairs++;
        if(nrOfPairs === 3)
        {
            CardArray.splice(0,2);
            CardArray.push(3);
            return CardArray; // "Two Pair";
        }
        if(nrOfPairs === 2)
        {
            if(CardArray[0].v === CardArray[1].v) // A A B C D E F
            {
                if(CardArray[2].v === CardArray[3].v) // A A B B C D E
                {
                    CardArray.splice(4,2); // A A B B * * C
                    CardArray.push(3);
                    return CardArray; // "Two Pair";
                }
                if(CardArray[3].v === CardArray[4].v) // A A B C C D E
                {
                    CardArray.splice(5,1); // A A B C C * D
                    CardArray.splice(2,1); // A A * B B * C
                    CardArray.push(3);
                    return CardArray; // "Two Pair";
                }
                CardArray.splice(2,2); // A A * * B B C   &&   A A * * B C C
                CardArray.push(3);
                return CardArray; // "Two Pair";
            }
            if(CardArray[1].v === CardArray[2].v) // A B B C D E F
            {
                if(CardArray[3].v === CardArray[4].v) // A B B C C D E
                {
                    CardArray.splice(5,1); // A B B C C * D
                    CardArray.splice(0,1); // * A A B B * C
                    CardArray.push(3);
                    return CardArray; // "Two Pair";
                }
                CardArray.splice(3,1); // A B B * C C D   &&   A B B * C D D
                CardArray.splice(0,1); // * A A * B B C   &&   * A A * B C C
                CardArray.push(3);
                return CardArray; // "Two Pair";
            }
            CardArray.splice(0,2); // * * A A B B C   &&   * * A A B C C   &&   * * A B B C C
            CardArray.push(3);
            return CardArray; // "Two Pair";
        }
        if(nrOfPairs === 1)
        {
            if(CardArray[0].v === CardArray[1].v) // A A B C D E F
            {
                CardArray.splice(2,2); // A A * * B C D
                CardArray.push(2);
                return CardArray; // "One Pair";
            }
            if(CardArray[1].v === CardArray[2].v) // A B B C D E F
            {
                CardArray.splice(3,1); // A B B * C D E
                CardArray.splice(0,1); // * A A * B C D
                CardArray.push(2);
                return CardArray; // "One Pair";
            }
            CardArray.splice(0,2); // * * A A B C D   &&   * * A B B C D   &&   * * A B C C D   &&   * * A B C D D
            CardArray.push(2);
            return CardArray; // "One Pair";
        }
    }
    CardArray.splice(0,2);
    CardArray.push(1);
    return CardArray; // "Highcard";
}
function GetWinner(player, board)
{
    let max = 1, nrPlayersMax = 0;
    for(let i = 0; i < 8; i++)
        if(GetHandAfterRiver(player[i],board)[5] > max)
            max = GetHandAfterRiver(player[i],board)[5];
    for(let i = 0; i < 8; i++)
        if(GetHandAfterRiver(player[i],board)[5] === max)
            nrPlayersMax++;
    if(nrPlayersMax === 1)
        for(let i = 0; i < 8; i++)
            if(GetHandAfterRiver(player[i],board)[5] === max)
                return i + 1;
    else
    {

    }

}
function DealBoard()
{
    numberOfClicks++;
    if(numberOfClicks === 1)
    {
        for(let i = 0; i < 3; i++)
        {
            document.getElementById(B_n[i]).style.animationName = B_A[i];
            document.getElementById(B_n[i]).style.animationDelay = (i / 4) + 's';
        }
    }
    if(numberOfClicks === 2)
    {
        document.getElementById(B_n[3]).style.animationName = B_A[3];
    }
    if(numberOfClicks === 3)
    {
        document.getElementById(B_n[4]).style.animationName = B_A[4];
    }
}
function DealCards(numberOfPlayers, player)
{
    for(let i = 0; i < numberOfPlayers; i++)
    {
        document.getElementById(Pc1[player[i].ind]).style.animationName = Pc1A[player[i].ind];
        document.getElementById(Pc2[player[i].ind]).style.animationName = Pc2A[player[i].ind];
        document.getElementById(Pc1[player[i].ind]).style.animationDelay = (i / 4) + 's';
        document.getElementById(Pc2[player[i].ind]).style.animationDelay = (numberOfPlayers / 4 + i / 4) + 's';
    }
    for(let i = numberOfPlayers; i < 8; i++)
    {
        document.getElementById(Pc1[player[i].ind]).style.visibility = 'hidden';
        document.getElementById(Pc2[player[i].ind]).style.visibility = 'hidden';
    }
}
function cardV(numPlayers, player)
{
    for(let i = 0; i < numPlayers ; i++)
    {
        if(player[i].c1.v < 11)
        {
            document.getElementById(Pc1v[2 * player[i].ind]).innerHTML = player[i].c1.v;
            document.getElementById(Pc1v[2 * player[i].ind + 1]).innerHTML = player[i].c1.v;
        }
        if(player[i].c1.v === 11)
        {
            document.getElementById(Pc1v[2 * player[i].ind]).innerHTML = 'J';
            document.getElementById(Pc1v[2 * player[i].ind + 1]).innerHTML = 'J';
        }
        if(player[i].c1.v === 12)
        {
            document.getElementById(Pc1v[2 * player[i].ind]).innerHTML = 'Q';
            document.getElementById(Pc1v[2 * player[i].ind + 1]).innerHTML = 'Q';
        }
        if(player[i].c1.v === 13)
        {
            document.getElementById(Pc1v[2 * player[i].ind]).innerHTML = 'K';
            document.getElementById(Pc1v[2 * player[i].ind + 1]).innerHTML = 'K';
        }
        if(player[i].c1.v === 14)
        {
            document.getElementById(Pc1v[2 * player[i].ind]).innerHTML = 'A';
            document.getElementById(Pc1v[2 * player[i].ind + 1]).innerHTML = 'A';
        }
        if(player[i].c2.v < 11)
        {
            document.getElementById(Pc2v[2 * player[i].ind]).innerHTML = player[i].c2.v;
            document.getElementById(Pc2v[2 * player[i].ind + 1]).innerHTML = player[i].c2.v;
        }
        if(player[i].c2.v === 11)
        {
            document.getElementById(Pc2v[2 * player[i].ind]).innerHTML = 'J';
            document.getElementById(Pc2v[2 * player[i].ind + 1]).innerHTML = 'J';
        }
        if(player[i].c2.v === 12)
        {
            document.getElementById(Pc2v[2 * player[i].ind]).innerHTML = 'Q';
            document.getElementById(Pc2v[2 * player[i].ind + 1]).innerHTML = 'Q';
        }
        if(player[i].c2.v === 13)
        {
            document.getElementById(Pc2v[2 * player[i].ind]).innerHTML = 'K';
            document.getElementById(Pc2v[2 * player[i].ind + 1]).innerHTML = 'K';
        }
        if(player[i].c2.v === 14)
        {
            document.getElementById(Pc2v[2 * player[i].ind]).innerHTML = 'A';
            document.getElementById(Pc2v[2 * player[i].ind + 1]).innerHTML = 'A';
        }
    }
}
function cardS(numPlayers, player)
{
    for(let i = 0; i < numPlayers ; i++)
    {
        if(player[i].c1.s === 1)
        {
            document.getElementById(Pc1s[2 * player[i].ind]).style.backgroundImage = "url(Images/Symbols/Spades.png)";
            document.getElementById(Pc1s[2 * player[i].ind + 1]).style.backgroundImage = "url(Images/Symbols/Spades.png)";
        }
        if(player[i].c1.s === 2)
        {
            document.getElementById(Pc1s[2 * player[i].ind]).style.backgroundImage = "url(Images/Symbols/Clubs.png)";
            document.getElementById(Pc1s[2 * player[i].ind + 1]).style.backgroundImage = "url(Images/Symbols/Clubs.png)";
        }
        if(player[i].c1.s === 3)
        {
            document.getElementById(Pc1s[2 * player[i].ind]).style.backgroundImage = "url(Images/Symbols/Hearts.png)";
            document.getElementById(Pc1s[2 * player[i].ind + 1]).style.backgroundImage = "url(Images/Symbols/Hearts.png)";
        }
        if(player[i].c1.s === 4)
        {
            document.getElementById(Pc1s[2 * player[i].ind]).style.backgroundImage = "url(Images/Symbols/Diamonds.png)";
            document.getElementById(Pc1s[2 * player[i].ind + 1]).style.backgroundImage = "url(Images/Symbols/Diamonds.png)";
        }
        if(player[i].c2.s === 1)
        {
            document.getElementById(Pc2s[2 * player[i].ind]).style.backgroundImage = "url(Images/Symbols/Spades.png)";
            document.getElementById(Pc2s[2 * player[i].ind + 1]).style.backgroundImage = "url(Images/Symbols/Spades.png)";
        }
        if(player[i].c2.s === 2)
        {
            document.getElementById(Pc2s[2 * player[i].ind]).style.backgroundImage = "url(Images/Symbols/Clubs.png)";
            document.getElementById(Pc2s[2 * player[i].ind + 1]).style.backgroundImage = "url(Images/Symbols/Clubs.png)";
        }
        if(player[i].c2.s === 3)
        {
            document.getElementById(Pc2s[2 * player[i].ind]).style.backgroundImage = "url(Images/Symbols/Hearts.png)";
            document.getElementById(Pc2s[2 * player[i].ind + 1]).style.backgroundImage = "url(Images/Symbols/Hearts.png)";
        }
        if(player[i].c2.s === 4)
        {
            document.getElementById(Pc2s[2 * player[i].ind]).style.backgroundImage = "url(Images/Symbols/Diamonds.png)";
            document.getElementById(Pc2s[2 * player[i].ind + 1]).style.backgroundImage = "url(Images/Symbols/Diamonds.png)";
        }
    }
}
function boardV(board)
{
    for(let i = 0; i < 5 ; i++)
    {
        if(board.b[i].v < 11)
        {
            document.getElementById(B_v[2 * i]).innerHTML = board.b[i].v;
            document.getElementById(B_v[2 * i + 1]).innerHTML = board.b[i].v;
        }
        if(board.b[i].v === 11)
        {
            document.getElementById(B_v[2 * i]).innerHTML = 'J';
            document.getElementById(B_v[2 * i + 1]).innerHTML = 'J';
        }
        if(board.b[i].v === 12)
        {
            document.getElementById(B_v[2 * i]).innerHTML = 'Q';
            document.getElementById(B_v[2 * i + 1]).innerHTML = 'Q';
        }
        if(board.b[i].v === 13)
        {
            document.getElementById(B_v[2 * i]).innerHTML = 'K';
            document.getElementById(B_v[2 * i + 1]).innerHTML = 'K';
        }
        if(board.b[i].v === 14)
        {
            document.getElementById(B_v[2 * i]).innerHTML = 'A';
            document.getElementById(B_v[2 * i + 1]).innerHTML = 'A';
        }
    }
}
function boardS(board)
{
    for(let i = 0; i < 5 ; i++)
    {
        if(board.b[i].s === 1)
        {
            document.getElementById(B_s[2 * i]).style.backgroundImage = "url(Images/Symbols/Spades.png)";
            document.getElementById(B_s[2 * i + 1]).style.backgroundImage = "url(Images/Symbols/Spades.png)";
        }
        if(board.b[i].s === 2)
        {
            document.getElementById(B_s[2 * i]).style.backgroundImage = "url(Images/Symbols/Clubs.png)";
            document.getElementById(B_s[2 * i + 1]).style.backgroundImage = "url(Images/Symbols/Clubs.png)";
        }
        if(board.b[i].s === 3)
        {
            document.getElementById(B_s[2 * i]).style.backgroundImage = "url(Images/Symbols/Hearts.png)";
            document.getElementById(B_s[2 * i + 1]).style.backgroundImage = "url(Images/Symbols/Hearts.png)";
        }
        if(board.b[i].s === 4)
        {
            document.getElementById(B_s[2 * i]).style.backgroundImage = "url(Images/Symbols/Diamonds.png)";
            document.getElementById(B_s[2 * i + 1]).style.backgroundImage = "url(Images/Symbols/Diamonds.png)";
        }
    }
}
function main(numberOfPlayers)
{
    document.getElementById('Page1').style.display = 'none';
    document.getElementById('Page2').style.display = 'block'
    let deck = new Deck();
    let player = [];
    let player1 =  new Players(deck, 0);
    let player2 =  new Players(deck, 1);
    let player3 =  new Players(deck, 2);
    let player4 =  new Players(deck, 3);
    let player5 =  new Players(deck, 4);
    let player6 =  new Players(deck, 5);
    let player7 =  new Players(deck, 6);
    let player8 =  new Players(deck, 7);
    switch (numberOfPlayers)
    {
        case 2:
            player = [player1, player5, player2, player3, player4, player6, player7, player8];
            break;
        case 3:
            player = [player1, player4, player6, player2, player3, player5, player7, player8];
            break;
        case 4:
            player = [player1, player3, player5, player7, player2, player4, player6, player8];
            break;
        case 5:
            player = [player1, player3, player4, player6, player7, player2, player5, player8];
            break;
        case 6:
            player = [player1, player3, player4, player5, player6, player7, player2, player8];
            break;
        case 7:
            player = [player1, player2, player3, player4, player6, player7, player8, player5];
            break;
        case 8:
            player = [player1, player2, player3, player4, player5, player6, player7, player8];
            break;
    }
    for(let i = 0; i < numberOfPlayers; i++)
        player[i].AssignCards();
    let board = new Board(deck);
    DealCards(numberOfPlayers, player);
    cardV(numberOfPlayers, player); cardS(numberOfPlayers, player);
    boardV(board); boardS(board);
    for(let i = 0; i < numberOfPlayers; i++)
    {
        console.log(i+1);
        console.log(GetHandAfterFlop(player[i], board));
        console.log(GetHandAfterTurn(player[i], board));
        console.log(GetHandAfterRiver(player[i], board));
    }
    //console.log(GetWinner(player, board));
    //deck.ShuffleDeck();
}

// -------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------Testing------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

/*
class TestPlayers
{
    constructor(d, i, x, y)
    {
        this.index = i;
        this.deck = d;
        this.card1 = d.c[x];
        this.card2 = d.c[y];
    }
    get c1() { return this.card1; }
    get c2() { return this.card2; }
    get ind() { return this.index; }
}
class TestBoard
{
    constructor(de, a, b, c, d, e)
    {
        this.deck = de;
        this.flop1 = de.c[a];
        this.flop2 = de.c[b];
        this.flop3 = de.c[c];
        this.turn = de.c[d];
        this.river = de.c[e];
        this.bo = [this.f1, this.f2, this.f3, this.t1, this.r1];
    }
    get f1() { return this.flop1; }
    get f2() { return this.flop2; }
    get f3() { return this.flop3; }
    get t1() { return this.turn; }
    get r1() { return this.river; }
    get b() { return this.bo; }
}
function mainTest(numberOfPlayers)
{
    document.getElementById('Page1').style.display = 'none';
    document.getElementById('Page2').style.display = 'block'
    let deck = new Deck();
    let player = [];
    let player1 = new TestPlayers(deck, 0, 2, 3);
    let player2 = new TestPlayers(deck, 1, 6, 7);
    let player3 = new TestPlayers(deck, 2, 10, 11);
    let player4 = new TestPlayers(deck, 3, 14, 15);
    let player5 = new TestPlayers(deck, 4, 18, 19);
    let player6 = new TestPlayers(deck, 5, 22, 23);
    let player7 = new TestPlayers(deck, 6, 26, 27);
    let player8 = new TestPlayers(deck, 7, 30, 31);
    player = [player1, player2, player3, player4, player5, player6, player7, player8];
    let board = new TestBoard(deck, 0, 4, 8, 17, 48);
    DealCards(8, player);
    cardV(8, player); cardS(8, player);
    boardV(board); boardS(board);
    for(let i = 0; i < 8; i++)
    {
        console.log(i+1);
        console.log(GetHandAfterFlop(player[i], board));
        console.log(GetHandAfterTurn(player[i], board));
        console.log(GetHandAfterRiver(player[i], board));
    }
}
*/