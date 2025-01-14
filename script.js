async function moveup(id="#box1"){
    let box = document.querySelector(id); 
    box.classList.remove("moventdown")
    box.classList.add("moventup")
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve()
        },1000) 
    })    
}
async function movedown(id="#box1"){
    let box = document.querySelector(id); 
    box.classList.remove("moventup")
    box.classList.add("moventdown")
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve()
        },700)
    }) 
}
async function consolelog(n,source,helper,target){
    await moveup(`#box${n}`);
    let box = document.querySelector(`#box${n}`);
    let div2= document.querySelector(`.${target}`);
    div2.prepend(box);
    await movedown(`#box${n}`);
    return new Promise((resolve, reject) => {
            resolve()
    })
}
async function tower_of_hanoi(n,source= "stand1",helper="stand2",target="stand3"){
    if (n==0){
    }else{
        await tower_of_hanoi(n-1,source,target,helper);
        await pausefun();
        await consolelog(n,source,helper,target);
        await tower_of_hanoi(n-1,helper,source,target);
    }

}
async function pausefun(turn){
    if (turn%2!=0){
        turn++
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve()
            },2000)
        })
    }else{
        return 
    }
}
let tapsound = document.getElementById("tapsound");
let input = document.getElementById("input");
let startbtn = document.getElementById("start");
startbtn.addEventListener("click",async ()=>{
    tapsound.play();
    startbtn.disabled = true;
    let n = input.value ;
    let div1= document.querySelector(".stand1");
    let div2= document.querySelector(".stand2");
    let div3= document.querySelector(".stand3");
    div1.innerHTML= "";
    div2.innerHTML= "";
    div3.innerHTML= "";
    for (let i =1;i<=n;i++){
    div1.innerHTML=div1.innerHTML+`<div class="box" id="box${i}" style=" width : ${i*30}px">${i} </div>`;
    }
    await tower_of_hanoi(n);
    input.value = ""
    startbtn.disabled = false;
})
let isPaused = false; 
let pausebtn = document.getElementById("pause");
pausebtn.addEventListener("click", () => {
    tapsound.play();
    isPaused = !isPaused;
    if (isPaused){
        pausebtn.style.backgroundColor= "rgb(32, 140, 202)";
    }else{
        pausebtn.style.backgroundColor= "rgb(255,255,255)";
    }
})
async function pausefun() {
    while (isPaused) {
        console.log("loop")
        await new Promise((resolve) => setTimeout(resolve, 100)); 
    }
}




