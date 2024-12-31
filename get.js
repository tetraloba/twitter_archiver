class Content {
    constructor(user_name, user_id, datetime, text, rep, ret, fav, ana) {
        this.user_name = user_name
        this.user_id = user_id
        this.datetime = datetime
        this.text = text
        this.rep = Number(rep == "" ? "0" : rep)
        this.ret = Number(ret == "" ? "0" : ret)
        this.fav = Number(fav == "" ? "0" : fav)
        this.ana = Number(ana == "" ? "0" : ana)
    }
}

function lchild(obj, l) {
    var o = obj
    try {
        for (i of l) {
            o = o.children[i]
        }
    } catch (TypeError) {
        return undefined
    }
    return o;        
}

function get_contents(){
    for (const content of contents.children) {
        try {
            const tgt = lchild(content, [0,0,0,0,0,1,1]);
    
            const top = lchild(tgt, [0,0,0,0,0])
            const name = lchild(top, [0,0,0,0,0,0,0]).textContent
            const id = lchild(top, [1,0,0,0,0,0]).textContent
            const dt = lchild(top, [1,0,2,0,0]).getAttribute('datetime')
    
            const text = lchild(tgt, [1,0,0]).textContent
    
            const bottom = lchild(tgt, [2,0,0])
            const rep = bottom.children[0].textContent
            const ret = bottom.children[1].textContent
            const fav = bottom.children[2].textContent // lchild(bottom, [2,0,0,1,0,0,0]).textContent
            const ana = bottom.children[3].textContent
    
            // console.log(name, id, dt, text)
            // console.log(rep, ret, fav, ana)
            // content_set.add(new Content(name, id, dt, text, rep, ret, fav, ana))
            content_dict[dt] = new Content(name, id, dt, text, rep, ret, fav, ana)
        } catch (TypeError) {
            continue;
        }
    }
    // console.log(content_set) // debug
    console.log('got it!')
}

let t = document.getElementById('accessible-list-0')
let contents = t.nextElementSibling.firstChild;
let content_set = new Set();
let content_dict = {};

let mutation = new MutationObserver(get_contents)
mutation.observe(contents, {childList: true})

// console.log(content_dict)

// mutation.disconnect()
