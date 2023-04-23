window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#ff5733", "#ffbd33", "#3cff33", "#33ffeb"];
    const numParticles = 100;
    const particles = [];

    class Particle {
        constructor(x, y, size, color) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.speedX = Math.random() * 4 - 2;
            this.speedY = Math.random() * 4 - 2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.size -= 0.1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + this.size / 2);
            ctx.lineTo(this.x + this.size / 2, this.y);
            ctx.lineTo(this.x + this.size, this.y + this.size / 2);
            ctx.lineTo(this.x, this.y + this.size);
            ctx.lineTo(this.x - this.size, this.y + this.size / 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function createParticles(x, y, color) {
        for (let i = 0; i < numParticles; i++) {
            const size = Math.random() * 5 + 1;
            const particle = new Particle(x, y, size, color);
            particles.push(particle);
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].size <= 0.3) {
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animateParticles);
    }

    canvas.addEventListener("mousemove", (event) => {
        const x = event.clientX;
        const y = event.clientY;
        const color = colors[Math.floor(Math.random() * colors.length)];
        createParticles(x, y, color);
    });

    animateParticles();
});
