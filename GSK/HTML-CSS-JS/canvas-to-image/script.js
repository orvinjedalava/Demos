window.onload = function() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // Draw something on the canvas
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 100, 100);

    ctx.fillStyle = 'blue';
    ctx.font = '30px Arial';
    ctx.fillText('Hello Canvas', 150, 50);

    // Convert canvas to image and download
    document.getElementById('downloadBtn').addEventListener('click', function() {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'canvas-image.png';
        link.click();
    });
};