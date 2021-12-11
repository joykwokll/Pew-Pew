const bullet = document.querySelector(".bullet");

window.addEventListener("click", (e) => {
    console.log(e);
    bullet.style.top = e.pageY + "px"
    bullet.style.left = e.pageX + "px"
});

const cursor = document.querySelector(".cursor");
window.addEventListener("mousemove", (e) => {
    cursor.style.top = e.pageY + "px";
    cursor.style.left = e.pageX + "px";
});
