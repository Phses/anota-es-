let textFild = document.getElementById('text-field')
let formControl = document.querySelector('.form-control')
let btnSubmit = document.querySelector('.btn btn-primary');
let output = document.querySelector(".output")


formControl.addEventListener('submit', (e)=> {
  
  let s = textFild.value;

  let words = s.split(/(\W+)/);

  for(let i = 0; i < words.length; i++) {
    let span = document.createElement('span');
    span.appendChild(document.createTextNode(words[i]));
    if(/\w+/.test(words[i])){
      span.addEventListener('mouseenter', ()=>{
        let r = Math.floor(Math.random() * (255 + 1));
        let g = Math.floor(Math.random() * (255 + 1));
        let b = Math.floor(Math.random() * (255 + 1));
        span.style.backgroundColor = `rgb(${r},${g},${b})`
        span.innerHTML = 'awesome';
      })
    }
    let space = document.createElement('span');
    space.appendChild(document.createTextNode(" "));
    output.appendChild(span);
    output.appendChild(space);
    
  }

  console.log(s);
  e.preventDefault();
})