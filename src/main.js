class RubiksCube {
    constructor() {
        this.cube = document.querySelector('.cube');
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;
        
        // Add cube state tracking
        this.state = {
            front: Array(9).fill('red'),
            back: Array(9).fill('green'),
            top: Array(9).fill('blue'),
            bottom: Array(9).fill('orange'),
            left: Array(9).fill('white'),
            right: Array(9).fill('yellow')
        };
        
        this.initializeControls();
        this.initializeMoveControls();
    }

    initializeControls() {
        // Reset button
        document.getElementById('reset').addEventListener('click', () => {
            this.rotationX = 0;
            this.rotationY = 0;
            this.rotationZ = 0;
            this.updateCubeRotation();
        });

        // Rotation controls
        document.querySelectorAll('[data-rotation]').forEach(button => {
            button.addEventListener('click', (e) => {
                const rotation = e.target.dataset.rotation;
                switch(rotation) {
                    case 'rotateX':
                        this.rotationX += 90;
                        break;
                    case 'rotateY':
                        this.rotationY += 90;
                        break;
                    case 'rotateZ':
                        this.rotationZ += 90;
                        break;
                }
                this.updateCubeRotation();
            });
        });

        // Add drag rotation
        let isDragging = false;
        let previousX = 0;
        let previousY = 0;

        this.cube.addEventListener('mousedown', (e) => {
            isDragging = true;
            previousX = e.clientX;
            previousY = e.clientY;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - previousX;
            const deltaY = e.clientY - previousY;

            this.rotationY += deltaX * 0.5;
            this.rotationX += deltaY * 0.5;

            this.updateCubeRotation();

            previousX = e.clientX;
            previousY = e.clientY;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    initializeMoveControls() {
        // Add move buttons to HTML dynamically
        const moveControls = document.createElement('div');
        moveControls.className = 'move-controls';
        moveControls.innerHTML = `
            <button data-move="F">F</button>
            <button data-move="F'">F'</button>
            <button data-move="B">B</button>
            <button data-move="B'">B'</button>
            <button data-move="R">R</button>
            <button data-move="R'">R'</button>
            <button data-move="L">L</button>
            <button data-move="L'">L'</button>
            <button data-move="U">U</button>
            <button data-move="U'">U'</button>
            <button data-move="D">D</button>
            <button data-move="D'">D'</button>
        `;
        document.querySelector('.controls').appendChild(moveControls);

        // Add event listeners for moves
        document.querySelectorAll('[data-move]').forEach(button => {
            button.addEventListener('click', (e) => {
                const move = e.target.dataset.move;
                this.performMove(move);
            });
        });

        // Add scramble functionality
        document.getElementById('scramble').addEventListener('click', () => {
            this.scrambleCube();
        });
    }

    performMove(move) {
        const isCounterClockwise = move.includes("'");
        const face = move.charAt(0);
        
        // Rotate the face
        this.rotateFace(face, isCounterClockwise);
        
        // Update the visual representation
        this.updateCubeState();
    }

    rotateFace(face, isCounterClockwise) {
        // Create a deep copy of the current state
        const newState = JSON.parse(JSON.stringify(this.state));
        
        // Perform the rotation based on the face
        switch(face) {
            case 'F':
                this.rotateFrontFace(newState, isCounterClockwise);
                break;
            case 'B':
                this.rotateBackFace(newState, isCounterClockwise);
                break;
            // Add other cases for remaining faces
        }
        
        this.state = newState;
    }

    rotateFrontFace(newState, isCounterClockwise) {
        // Rotate the front face
        const front = [...this.state.front];
        if (isCounterClockwise) {
            newState.front = [front[6], front[3], front[0], front[7], front[4], front[1], front[8], front[5], front[2]];
        } else {
            newState.front = [front[2], front[5], front[8], front[1], front[4], front[7], front[0], front[3], front[6]];
        }

        // Update adjacent faces
        const temp = [...this.state.top.slice(6)];
        if (isCounterClockwise) {
            newState.top.splice(6, 3, ...this.state.right.slice(0, 3));
            newState.right.splice(0, 3, ...this.state.bottom.slice(6));
            newState.bottom.splice(6, 3, ...this.state.left.slice(0, 3));
            newState.left.splice(0, 3, ...temp);
        } else {
            newState.top.splice(6, 3, ...this.state.left.slice(0, 3));
            newState.left.splice(0, 3, ...this.state.bottom.slice(6));
            newState.bottom.splice(6, 3, ...this.state.right.slice(0, 3));
            newState.right.splice(0, 3, ...temp);
        }
    }

    updateCubeState() {
        // Update the visual representation of each face
        Object.entries(this.state).forEach(([face, colors]) => {
            const faceElement = document.querySelector(`.face.${face}`);
            colors.forEach((color, index) => {
                const square = faceElement.querySelector(`.square.s${index + 1}`);
                square.style.backgroundColor = color;
            });
        });
    }

    scrambleCube() {
        const moves = ['F', 'F\'', 'B', 'B\'', 'R', 'R\'', 'L', 'L\'', 'U', 'U\'', 'D', 'D\''];
        const scrambleSequence = Array(20).fill(0).map(() => moves[Math.floor(Math.random() * moves.length)]);
        
        scrambleSequence.forEach((move, index) => {
            setTimeout(() => {
                this.performMove(move);
            }, index * 500); // Delay each move by 500ms
        });
    }

    updateCubeRotation() {
        this.cube.style.transform = `rotateX(${this.rotationX}deg) rotateY(${this.rotationY}deg) rotateZ(${this.rotationZ}deg)`;
    }
}

// Initialize the cube when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RubiksCube();
});
