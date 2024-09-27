window.onload = function() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // Load the image
    const image = new Image();
	//image.crossorigin = 'anonymous';
    image.setAttribute('crossorigin', 'anonymous');
    image.src = 'http://localhost:3000/BugsBunny.jpg'; // Replace with the path to your image
    //image.src = 'https://plus.unsplash.com/premium_photo-1677560517139-1836389bf843?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // Replace with the path to your image
    //image.src = 'C:\\Users\\ojedb\\OneDrive\\Desktop\\BugsBunny.jpg';
    image.onload = function() {
        // Draw the image on the canvas
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Draw the text on top of the image
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText('Hello, Bebeb!', 50, 50); // Adjust position and text as needed

        // Convert canvas to image and download
        document.getElementById('downloadBtn').addEventListener('click', function() {
			console.log('download clicked');
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'superimposed-image.png';
            link.click();
        });
    };
	
	image.onerror = function() {
        console.error('Failed to load the image.');
    };
};