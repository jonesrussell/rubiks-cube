let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = -40;
let yOffset = -25;

const cube = document.querySelector('.cube');

document.addEventListener('mousedown', startDragging);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDragging);
cube.addEventListener('touchstart', handleTouchStart);
cube.addEventListener('touchmove', handleTouchMove);
cube.addEventListener('touchend', handleTouchEnd);

function startDragging(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    
    if (e.target.closest('.cube')) {
        isDragging = true;
    }
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        
        xOffset = currentX;
        yOffset = currentY;
        
        cube.style.transform = `rotateX(${yOffset}deg) rotateY(${xOffset}deg) translate(-50%, -50%)`;
    }
}

function stopDragging() {
    isDragging = false;
}
