class Rdom {
  constructor(str = '') {
    this.source = str;
    this.mountState = false;
    this.init(this.source)
  }

  init(str) {
    if (typeof str !== 'string') throw Error('not string');
    this.todom();
    return this
  }

  todom() {
    let a = document.createElement('div');
    a.innerHTML = this.source;
    this.dom = a.children.length===1 ? a.children[0] : a;
  }

  mount(el) {
    if(this.mountState || typeof el === 'undefined'){ return this}
    if(typeof el === 'string'){
      el = document.querySelector(el);
    }
    if(!!el && el.nodeType === 1){
      el.appendChild(this.dom);
      this.mountState = true;
    }
    return this
  }

  unmount(el) {
    // if(this.mountState){
      this.dom && this.dom.remove();
      this.mountState = false; 
    // };
  }

  get(l) {
    return typeof l === 'string' ? this.dom.querySelector(l) : this.dom;
  }

  getAll(l) {
    return typeof l === 'string' ? this.dom.querySelectorAll(l) : this.dom;
  }

  appendChild(el){
    this.dom.appendChild(el)
  }

}

export function undo(dom){
  if(!dom.nodeName) return dom;
  return dom.innerHTML
}

export function render(params) {
  return new Rdom(params)
}